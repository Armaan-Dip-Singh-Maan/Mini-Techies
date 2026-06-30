import confetti from "canvas-confetti";

const COLORS = ["#6c4cf1", "#ff5c8a", "#ffc23c", "#1fc7e6", "#1fbf86"];

export function fireConfetti(opts?: { small?: boolean }) {
  if (typeof window === "undefined") return;
  if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

  if (opts?.small) {
    confetti({
      particleCount: 40,
      spread: 55,
      startVelocity: 28,
      origin: { y: 0.7 },
      colors: COLORS,
      scalar: 0.8,
      disableForReducedMotion: true,
    });
    return;
  }

  const end = Date.now() + 700;
  const frame = () => {
    confetti({
      particleCount: 4,
      angle: 60,
      spread: 60,
      origin: { x: 0 },
      colors: COLORS,
      disableForReducedMotion: true,
    });
    confetti({
      particleCount: 4,
      angle: 120,
      spread: 60,
      origin: { x: 1 },
      colors: COLORS,
      disableForReducedMotion: true,
    });
    if (Date.now() < end) requestAnimationFrame(frame);
  };
  frame();
}
