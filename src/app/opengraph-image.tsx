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
          background: "#f3f3ee",
          color: "#17271d",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div style={{ width: 72, height: 72, background: "#d5ec7c", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="40" height="40" viewBox="0 0 32 32">
              <path d="M7 25 24 8M9 7h16v16" fill="none" stroke="#17271d" strokeWidth="3.4" />
            </svg>
          </div>
          <div style={{ fontSize: 26, letterSpacing: 5, fontWeight: 700, display: "flex", flexDirection: "column" }}>
            <span>FRACTIONAL</span>
            <span>GROWTH PARTNER</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 92, fontWeight: 800, letterSpacing: -4, lineHeight: 1 }}>
          <span>Win better work.</span>
          <span>Run a better business.</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "#5b665e" }}>
          <span>A hands-on partner for trade business owners</span>
          <span style={{ color: "#17271d", fontWeight: 700 }}>choosevestis.com</span>
        </div>
      </div>
    ),
    size,
  );
}
