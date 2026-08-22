import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div style={{ alignItems: "center", background: "radial-gradient(circle at 78% 20%, #173a8f 0%, #080b12 35%, #050505 72%)", color: "#f5f7fb", display: "flex", flexDirection: "column", height: "100%", justifyContent: "center", padding: "72px", width: "100%" }}>
        <div style={{ color: "#78a7ff", fontSize: 28, letterSpacing: "0.16em", textTransform: "uppercase" }}>Worktree</div>
        <div style={{ fontSize: 68, letterSpacing: "-0.055em", marginTop: 26, maxWidth: 920, textAlign: "center" }}>Hands-on AI engineering for business operations.</div>
        <div style={{ border: "1px solid #4d73c7", borderRadius: 999, color: "#bfd2ff", fontSize: 24, marginTop: 42, padding: "12px 24px" }}>Designed. Controlled. Managed.</div>
      </div>
    ),
    size,
  );
}
