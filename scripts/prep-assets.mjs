import sharp from "sharp";
import path from "node:path";

const SRC =
  "/Users/armaandipsinghmaan/.cursor/projects/Users-armaandipsinghmaan-Desktop-musap-web/assets";
const OUT = path.resolve(process.cwd(), "public");

const files = {
  avatar: `${SRC}/e042585e2d3af1571e5c77d7d35f9378c7d910ea-49010cd1-ffcb-42a3-8cbc-962b91d1fddd.png`,
  dandre: `${SRC}/image-fcb18bcc-d502-445f-a010-dc98674dfd64.png`,
  kamini: `${SRC}/image-d97d056f-dd9e-43ad-8852-191a24fac12a.png`,
  logo: `${SRC}/image-91437446-484f-44c3-a1ad-98655847e210.png`,
};

// ---- 1. Mini avatar: trim transparent margins, cap size ----
async function prepAvatar() {
  await sharp(files.avatar)
    .trim()
    .resize({ width: 700, withoutEnlargement: true })
    .png()
    .toFile(`${OUT}/characters/mini.png`);
  console.log("✓ mini avatar");
}

// ---- 2. Team headshots: crop the rounded photo region ----
async function prepHeadshot(src, out, box) {
  await sharp(src)
    .extract(box)
    .resize(600, 600, { fit: "cover", position: "top" })
    .png()
    .toFile(out);
  console.log("✓", out);
}

// ---- 3. Logo: knock out the solid blue background -> transparent ----
async function prepLogo() {
  const img = sharp(files.logo).ensureAlpha();
  const { data, info } = await img
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;

  const corners = [
    [2, 2],
    [width - 3, 2],
    [2, height - 3],
    [width - 3, height - 3],
  ].map(([x, y]) => {
    const i = (y * width + x) * channels;
    return [data[i], data[i + 1], data[i + 2]];
  });

  const t0 = 55; // fully transparent below this distance
  const t1 = 110; // fully opaque above this distance

  for (let i = 0; i < data.length; i += channels) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    let min = Infinity;
    for (const [cr, cg, cb] of corners) {
      const d = Math.sqrt(
        (r - cr) ** 2 + (g - cg) ** 2 + (b - cb) ** 2
      );
      if (d < min) min = d;
    }
    let alpha;
    if (min <= t0) alpha = 0;
    else if (min >= t1) alpha = 255;
    else alpha = Math.round((255 * (min - t0)) / (t1 - t0));
    data[i + 3] = Math.min(data[i + 3], alpha);
  }

  await sharp(data, { raw: { width, height, channels } })
    .png()
    .trim()
    .resize({ width: 700, withoutEnlargement: true })
    .toFile(`${OUT}/logo.png`);
  console.log("✓ logo (bg removed)");
}

await prepAvatar();
await prepHeadshot(files.dandre, `${OUT}/team/dandre.png`, {
  left: 205,
  top: 245,
  width: 410,
  height: 420,
});
await prepHeadshot(files.kamini, `${OUT}/team/kamini.png`, {
  left: 205,
  top: 245,
  width: 410,
  height: 420,
});
await prepLogo();
console.log("Done.");
