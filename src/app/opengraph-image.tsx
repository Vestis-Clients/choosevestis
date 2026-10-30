import { ImageResponse } from "next/og";

export const alt = "Vestis Solutions: Win better work. Run a better business.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#ffffff",
          color: "#15191e",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div style={{ width: 72, height: 72, background: "#1d3a5c", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="40" height="40" viewBox="0 0 32 32">
              <path d="M7 25 24 8M9 7h16v16" fill="none" stroke="#ffffff" strokeWidth="3.4" />
            </svg>
          </div>
          <div style={{ fontSize: 34, fontWeight: 600, display: "flex", flexDirection: "column" }}>
            <span>Vestis Solutions</span>
            
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 88, fontWeight: 700, letterSpacing: -3, lineHeight: 1 }}>
          <span>Win better work.</span>
          <span>Run a better business.</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "#5a6472" }}>
          <span>A hands-on partner for trade business owners</span>
          <span style={{ color: "#15191e", fontWeight: 700 }}>choosevestis.com</span>
        </div>
      </div>
    ),
    size,
  );
}
