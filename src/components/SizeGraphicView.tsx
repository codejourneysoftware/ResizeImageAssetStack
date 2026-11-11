import React from "react";
import { AppStoreSize } from "../types/sizes";

interface SizeGraphicViewProps {
  size: AppStoreSize;
}

export const SizeGraphicView: React.FC<SizeGraphicViewProps> = ({ size }) => {
  const actualWidth = size.width;
  const actualHeight = size.height;
  const isLandscape = actualWidth > actualHeight;

  // Scale down proportionately for preview representation
  // Clamp maximum dimension so gigantic banner sizes (5244px) fit comfortably
  const scale = actualWidth > 4000 ? 55 : 35;
  const w = Math.max(30, Math.round(actualWidth / scale));
  const h = Math.max(30, Math.round(actualHeight / scale));

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "10px",
        userSelect: "none",
        flexShrink: 0,
      }}
    >
      <div
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#000000",
          border: "1.5px solid #00ff66",
          width: `${w}px`,
          height: `${h}px`,
          boxShadow: "0 0 10px rgba(0, 255, 102, 0.2)",
          transition: "all 0.2s ease-in-out",
        }}
      >
        {isLandscape ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "2px",
              fontSize: "8px",
              fontWeight: 700,
              fontFamily: "inherit",
              color: "#00ff66",
              whiteSpace: "nowrap",
            }}
          >
            <span>{actualWidth}</span>
            <span style={{ opacity: 0.6 }}>x</span>
            <span>{actualHeight}</span>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              fontSize: "8px",
              fontWeight: 700,
              fontFamily: "inherit",
              color: "#00ff66",
              whiteSpace: "nowrap",
              transform: "rotate(-90deg)",
              transformOrigin: "center",
              lineHeight: 1,
            }}
          >
            <span>{actualWidth}</span>
            <span style={{ opacity: 0.6, fontSize: "6px" }}>x</span>
            <span>{actualHeight}</span>
          </div>
        )}
      </div>

      <div
        style={{
          fontSize: "10px",
          fontFamily: "inherit",
          fontWeight: 700,
          color: "#00ff66",
          textAlign: "center",
          maxWidth: "130px",
          lineHeight: 1.2,
          opacity: isLandscape ? 0.6 : 1.0,
        }}
      >
        {size.name.toUpperCase().replace(/_/g, " ")}
      </div>
    </div>
  );
};
