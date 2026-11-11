import { AppStoreSize } from "../types/sizes";

export interface ProcessedAsset {
  targetFolder: string;
  filename: string;
  blob: Blob;
  base64Data: string; // raw base64 without prefix
  dataUrl: string;
  width: number;
  height: number;
}

export interface ProcessingProgress {
  currentFile: number;
  totalFiles: number;
  fileName: string;
  currentPercent: number;
  message: string;
}

/**
 * Loads an image file or URL into an HTMLImageElement
 */
export function loadImage(source: File | string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = (e) => reject(new Error(`Failed to load image: ${e}`));

    if (typeof source === "string") {
      img.src = source;
    } else {
      const url = URL.createObjectURL(source);
      img.onload = () => {
        URL.revokeObjectURL(url);
        resolve(img);
      };
      img.src = url;
    }
  });
}

/**
 * Replicates the exact image processing pipeline from ImageProcessor.swift:
 * 1. Fills background with solid black (#000000).
 * 2. Scales image with Aspect Fill + bleed, applies Gaussian blur (5% of min dimension) + 0.2 alpha black tint.
 * 3. Draws foreground image using Smart-Fill (Fill if aspect ratio matches within 0.005, else Fit).
 * 4. Exports opaque 24/32-bit PNG.
 */
export async function processAndResizeImage(
  image: HTMLImageElement,
  target: AppStoreSize,
  originalFilename: string
): Promise<ProcessedAsset> {
  const targetWidth = target.width;
  const targetHeight = target.height;

  // Use OffscreenCanvas if available, otherwise document.createElement('canvas')
  let canvas: HTMLCanvasElement | OffscreenCanvas;
  let ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D | null = null;

  if (typeof OffscreenCanvas !== "undefined") {
    canvas = new OffscreenCanvas(targetWidth, targetHeight);
    ctx = canvas.getContext("2d");
  } else {
    canvas = document.createElement("canvas");
    canvas.width = targetWidth;
    canvas.height = targetHeight;
    ctx = canvas.getContext("2d");
  }

  if (!ctx) {
    throw new Error("Could not initialize 2D rendering context");
  }

  // 1. Explicitly fill entire background with solid black first
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, targetWidth, targetHeight);

  const sourceWidth = image.naturalWidth || image.width;
  const sourceHeight = image.naturalHeight || image.height;
  const sourceAspectRatio = sourceWidth / sourceHeight;
  const targetAspectRatio = targetWidth / targetHeight;

  // 2. Render Blurred Background
  // Aspect Fill ratio with bleed
  const minDimension = Math.min(targetWidth, targetHeight);
  const blurRadius = Math.max(12, Math.round(minDimension * 0.05));
  const aspectFillRatio = Math.max(targetWidth / sourceWidth, targetHeight / sourceHeight);

  // Generous bleed to ensure no edge clipping from blur
  const bleed = Math.max(8, blurRadius * 2);
  const fillWidth = sourceWidth * aspectFillRatio + bleed * 2;
  const fillHeight = sourceHeight * aspectFillRatio + bleed * 2;
  const fillX = (targetWidth - fillWidth) / 2;
  const fillY = (targetHeight - fillHeight) / 2;

  ctx.save();
  // Apply gaussian blur filter
  if ("filter" in ctx) {
    ctx.filter = `blur(${blurRadius}px)`;
  }
  ctx.drawImage(image, fillX, fillY, fillWidth, fillHeight);
  ctx.restore();

  // Subtle black tint overlay for content contrast (0.2 alpha)
  ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
  ctx.fillRect(0, 0, targetWidth, targetHeight);

  // 3. Render Foreground Image with Smart-Fill
  // If aspect ratios are extremely close (within 0.005), use Fill instead of Fit to avoid slivers
  const isNearlySameAspect = Math.abs(sourceAspectRatio - targetAspectRatio) < 0.005;
  const logicRatio = isNearlySameAspect
    ? Math.max(targetWidth / sourceWidth, targetHeight / sourceHeight)
    : Math.min(targetWidth / sourceWidth, targetHeight / sourceHeight);

  const finalFitWidth = sourceWidth * logicRatio;
  const finalFitHeight = sourceHeight * logicRatio;
  const finalFitX = (targetWidth - finalFitWidth) / 2;
  const finalFitY = (targetHeight - finalFitHeight) / 2;

  // Render foreground crisp and sharp
  ctx.drawImage(image, finalFitX, finalFitY, finalFitWidth, finalFitHeight);

  // 4. Extract opaque PNG
  let blob: Blob;
  let dataUrl: string;

  if (canvas instanceof OffscreenCanvas) {
    blob = await canvas.convertToBlob({ type: "image/png" });
    const reader = new FileReader();
    dataUrl = await new Promise((resolve) => {
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(blob);
    });
  } else {
    dataUrl = canvas.toDataURL("image/png");
    const response = await fetch(dataUrl);
    blob = await response.blob();
  }

  const base64Data = dataUrl.replace(/^data:image\/png;base64,/, "");

  // Base filename without extension
  const cleanOriginalName = originalFilename.replace(/\.[^/.]+$/, "");
  const exportFilename = `${cleanOriginalName}_AppStore.png`;

  return {
    targetFolder: target.name,
    filename: exportFilename,
    blob,
    base64Data,
    dataUrl,
    width: targetWidth,
    height: targetHeight,
  };
}

