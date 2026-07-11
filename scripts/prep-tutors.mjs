import sharp from "sharp";

const SRC =
  "/Users/armaandipsinghmaan/.cursor/projects/Users-armaandipsinghmaan-Desktop-musap-web/assets";
const OUT = "public/characters";

const jobs = [
  {
    src: `${SRC}/d7d19eedf63c86b58ba31a0a99e31646fa2851ef-88f4beb8-5232-4c1d-933d-74f5bf762bfd.png`,
    out: `${OUT}/tammy.png`,
  },
  {
    src: `${SRC}/29e068811e7c45b4c3fd467295332445fd1d3794-6972f3b0-9ec4-46d7-948d-6627ab507656.png`,
    out: `${OUT}/egoa.png`,
  },
  {
    src: `${SRC}/f45099e4d5b71e9879341f81a836821483072e19-bf3f30cc-7465-4a7c-ba6d-ccc14551289f.png`,
    out: `${OUT}/siren.png`,
  },
];

for (const { src, out } of jobs) {
  await sharp(src)
    .trim()
    .resize({ width: 700, withoutEnlargement: true })
    .png()
    .toFile(out);
  const meta = await sharp(out).metadata();
  console.log(`✓ ${out} (${meta.width}x${meta.height})`);
}
