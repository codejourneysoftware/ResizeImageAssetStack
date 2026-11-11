import React, { useState, useRef, useEffect } from "react";
import {
  AppStoreDevice,
  APP_STORE_DEVICES,
  APP_STORE_TARGET_SIZES,
} from "./types/sizes";
import {
  loadImage,
  processAndResizeImage,
  ProcessedAsset,
} from "./utils/imageProcessor";
import {
  selectOutputDirectory,
  openFolderInExplorer,
  exportAssets,
  isTauriEnvironment,
} from "./utils/tauriBridge";
import { SizeGraphicView } from "./components/SizeGraphicView";
import { Terminal, FolderOpen, Trash2, Upload, Loader2 } from "lucide-react";
import "./App.css";

const INITIAL_LOGS = [
  "> TERMINAL BOOT SEQUENCE INITIATED...",
  "> MEMORY CHECK: OK",
  "> MAINFRAME ONLINE.",
  "> AWAITING ASSET DROP...",
];

export function App() {
  const [selectedDevice, setSelectedDevice] = useState<AppStoreDevice>("IPHONE");
  const [terminalLogs, setTerminalLogs] = useState<string[]>(INITIAL_LOGS);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [currentFile, setCurrentFile] = useState<number>(0);
  const [totalFiles, setTotalFiles] = useState<number>(0);
  const [statusMessage, setStatusMessage] = useState<string>("Waiting for images...");
  const [lastOutputDirectory, setLastOutputDirectory] = useState<string | null>(null);
  const [isDropTargeted, setIsDropTargeted] = useState<boolean>(false);

  const logsEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll logs to bottom
  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [terminalLogs]);

  const appendLog = (message: string) => {
    setTerminalLogs((prev) => [...prev, message.startsWith(">") ? message : `> ${message}`]);
  };

  const clearLogs = () => {
    setTerminalLogs([
      "> LOGS PURGED.",
      "> MAINFRAME READY.",
      "> AWAITING ASSET DROP...",
    ]);
  };

  const handleOpenExport = async () => {
    if (lastOutputDirectory) {
      await openFolderInExplorer(lastOutputDirectory);
    }
  };

  const handleSelectFilesClick = () => {
    if (!isProcessing && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files);
      processFiles(filesArray);
      e.target.value = "";
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isProcessing) {
      setIsDropTargeted(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDropTargeted(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDropTargeted(false);

    if (isProcessing) return;

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const filesArray = Array.from(e.dataTransfer.files);
      processFiles(filesArray);
    }
  };

  const processFiles = async (files: File[]) => {
    setIsProcessing(true);
    setStatusMessage("Analyzing items...");
    appendLog("ANALYZING DROPPED ITEMS...");

    const validImageTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp", "image/bmp"];
    const imageFiles = files.filter(
      (file) =>
        validImageTypes.includes(file.type.toLowerCase()) ||
        /\.(png|jpe?g|webp|bmp)$/i.test(file.name)
    );

    if (imageFiles.length === 0) {
      setStatusMessage("No images found.");
      appendLog("ERROR: NO VALID IMAGE FORMATS DETECTED IN DROP.");
      setIsProcessing(false);
      return;
    }

    setTotalFiles(imageFiles.length);
    setCurrentFile(0);
    setStatusMessage("Select save location...");
    appendLog(`FOUND ${imageFiles.length} VALID TARGET(S).`);
    appendLog("AWAITING OUTPUT DIRECTORY SELECTION...");

    const outputDir = await selectOutputDirectory();
    if (!outputDir) {
      setIsProcessing(false);
      setStatusMessage("Cancelled");
      appendLog("OPERATION ABORTED BY USER.");
      return;
    }

    setLastOutputDirectory(outputDir);
    const dirDisplayName = outputDir.split(/[\\/]/).pop() || outputDir;
    appendLog(`DIRECTORY ACQUIRED: ${dirDisplayName}`);

    const targetSpecs = APP_STORE_TARGET_SIZES.filter(
      (spec) => spec.device === selectedDevice
    );

    const allProcessedAssets: ProcessedAsset[] = [];

    try {
      for (let i = 0; i < imageFiles.length; i++) {
        const file = imageFiles[i];
        const fileNumber = i + 1;
        setCurrentFile(fileNumber);
        setProgress(fileNumber / imageFiles.length);
        setStatusMessage(`Processing ${file.name}...`);
        appendLog(`PROCESSING [${fileNumber}/${imageFiles.length}]: ${file.name}`);

        const img = await loadImage(file);

        for (const target of targetSpecs) {
          try {
            const asset = await processAndResizeImage(img, target, file.name);
            allProcessedAssets.push(asset);
            appendLog(`    [✓] ${target.name} rendered.`);
          } catch {
            appendLog(`ERROR: Engine failed to resize ${file.name} to ${target.name}.`);
          }
        }
      }

      appendLog(`COMMITTING ASSETS TO EXPORT DESTINATION...`);
      const exportResult = await exportAssets(outputDir, allProcessedAssets);

      if (exportResult.success) {
        setStatusMessage(`Done! Processed ${imageFiles.length} image(s).`);
        appendLog(`PROCESS COMPLETE. ${allProcessedAssets.length} TARGET(S) SUCCESSFULLY EXPORTED.`);
        setProgress(1.0);
      } else {
        appendLog(`ERROR DURING EXPORT COMMIT: ${exportResult.message}`);
      }
    } catch (err: any) {
      appendLog(`FATAL ERROR: ${err?.message || "Unknown error during asset generation."}`);
    } finally {
      setIsProcessing(false);
      setTimeout(() => {
        setStatusMessage("Ready.");
        setProgress(0);
        appendLog("AWAITING NEXT ASSIGNMENT...");
      }, 3500);
    }
  };

  const activeSpecs = APP_STORE_TARGET_SIZES.filter(
    (spec) => spec.device === selectedDevice
  );

  return (
    <div className="app-container">
      {/* CRT Scanline & Glow Overlay */}
      <div className="crt-overlay" />
      <div className="crt-glow" />

      {/* Hidden File Input for Click-to-Browse Fallback */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/png,image/jpeg,image/webp"
        className="hidden-input"
        onChange={handleFileInputChange}
      />

      {/* Top App Header */}
      <header className="app-header">
        <div className="header-left">
          <Terminal size={22} color="#00ff66" />
          <h1 className="header-title">
            RESIZE IMAGE ASSET STACK // MAINFRAME V1.0
          </h1>
        </div>

        <div className="header-right">
          {isProcessing ? (
            <div className="status-indicator">
              <Loader2 size={16} className="term-spin" />
              <span>{statusMessage}</span>
              {totalFiles > 0 && (
                <span style={{ opacity: 0.8 }}>
                  [{currentFile}/{totalFiles} | {Math.round(progress * 100)}%]
                </span>
              )}
            </div>
          ) : (
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              {lastOutputDirectory && isTauriEnvironment() && (
                <button
                  onClick={handleOpenExport}
                  className="term-btn"
                  title="Open export destination folder in system file explorer"
                >
                  <FolderOpen size={15} />
                  <span>[ OPEN EXPORT ]</span>
                </button>
              )}

              <button
                onClick={clearLogs}
                className="term-btn"
                title="Purge terminal screen logs"
              >
                <Trash2 size={15} />
                <span>[ PURGE ]</span>
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Target Toggle Selector Bar */}
      <section className="target-bar">
        <div className="target-label">&gt; SET TARGET:</div>
        <div className="target-tabs">
          {APP_STORE_DEVICES.map((device) => {
            const isActive = selectedDevice === device;
            return (
              <button
                key={device}
                disabled={isProcessing}
                onClick={() => setSelectedDevice(device)}
                className={`term-tab ${isActive ? "active" : ""}`}
              >
                {isActive ? `[ ${device} ]` : `  ${device}  `}
              </button>
            );
          })}
        </div>
      </section>

      {/* Center Terminal / Drop Zone */}
      <main
        className="terminal-main"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className={`drop-zone ${isDropTargeted ? "targeted" : ""}`}>
          {/* Scrollable Logs Output */}
          <div className="logs-viewport">
            {terminalLogs.map((log, index) => (
              <div key={index} className="log-line">
                {log}
              </div>
            ))}
            <div ref={logsEndRef} />
          </div>

          {/* Terminal Bottom Status Bar & Browse Trigger */}
          <div className="terminal-bottom-bar">
            <div className="status-indicator">
              <span>[ STATUS: {isProcessing ? "PROCESSING" : "STANDBY"} ]</span>
              <span className="terminal-cursor" />
            </div>
            <button
              onClick={handleSelectFilesClick}
              disabled={isProcessing}
              className="click-upload-btn"
            >
              <Upload size={14} />
              <span>OR CLICK TO SELECT IMAGES</span>
            </button>
          </div>
        </div>
      </main>

      {/* Sub-section: Active Target Specifications View */}
      <footer className="specs-footer">
        <div className="specs-title">
          ACTIVE TARGET SPECIFICATIONS ({activeSpecs.length} RESOLUTIONS)
        </div>

        <div className="specs-scroll">
          <div className="specs-list">
            {activeSpecs.map((spec) => (
              <SizeGraphicView key={spec.id} size={spec} />
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
