import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} — STEM learning that feels like play`;
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
          padding: "72px",
          background: "linear-gradient(135deg, #6c4cf1 0%, #4f33d6 60%, #1b2350 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 22,
              background: "linear-gradient(135deg,#ffc23c,#ff5c8a)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 40,
            }}
          >
            🤖
          </div>
          <div style={{ fontSize: 40, fontWeight: 700 }}>{site.name}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 76, fontWeight: 800, lineHeight: 1.05, maxWidth: 980 }}>
            STEM learning that feels like play.
          </div>
          <div style={{ fontSize: 34, color: "rgba(255,255,255,0.85)", maxWidth: 920 }}>
            Gamified, curriculum-aligned, ad-free — for kids ages 7-18.
          </div>
        </div>

        <div style={{ display: "flex", gap: 16, fontSize: 26 }}>
          {["🎮 Gamified", "📚 Curriculum-aligned", "🚫 No ads", "🧩 Accessible"].map(
            (t) => (
              <div
                key={t}
                style={{
                  background: "rgba(255,255,255,0.15)",
                  padding: "12px 22px",
                  borderRadius: 999,
                }}
              >
                {t}
              </div>
            )
          )}
        </div>
      </div>
    ),
    size
  );
}
