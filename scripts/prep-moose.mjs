import sharp from "sharp";

const SRC =
  "/Users/armaandipsinghmaan/.cursor/projects/Users-armaandipsinghmaan-Desktop-musap-web/assets/image-99706666-ae1d-459f-b35d-7437c384bb01.png";

await sharp(SRC)
  .extract({ left: 24, top: 110, width: 720, height: 720 })
  .resize(600, 600, { fit: "cover" })
  .png()
  .toFile("public/team/moose.png");

const m = await sharp("public/team/moose.png").metadata();
console.log(`✓ public/team/moose.png (${m.width}x${m.height})`);
