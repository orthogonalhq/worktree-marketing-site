import { mkdir, readdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const projectRoot = process.cwd();
const sourceDirectory = path.join(projectRoot, ".codex-tmp", "ribbon-bakes", "png");
const outputDirectory = path.join(projectRoot, "public", "images", "workflow-ribbons");
const contactSheetPath = path.join(projectRoot, ".codex-tmp", "ribbon-bakes", "workflow-ribbons-contact-sheet.webp");
const width = 960;
const height = 1200;

await mkdir(outputDirectory, { recursive: true });

const sourceFiles = (await readdir(sourceDirectory))
  .filter((file) => file.endsWith(".png"))
  .sort();

if (sourceFiles.length !== 16) {
  throw new Error(`Expected 16 ribbon masters in ${sourceDirectory}; found ${sourceFiles.length}.`);
}

const toolbarCover = Buffer.from(`
  <svg width="82" height="82" xmlns="http://www.w3.org/2000/svg">
    <rect width="82" height="82" fill="#060609" />
  </svg>
`);

for (const sourceFile of sourceFiles) {
  const sourcePath = path.join(sourceDirectory, sourceFile);
  const outputPath = path.join(outputDirectory, sourceFile.replace(/\.png$/, ".webp"));

  await sharp(sourcePath)
    .resize(width, height, { fit: "cover" })
    .composite([{ input: toolbarCover, left: 0, top: height - 82 }])
    .webp({ alphaQuality: 90, quality: 88, smartSubsample: true })
    .toFile(outputPath);
}

const columns = 4;
const rows = 4;
const cellWidth = 300;
const cellHeight = 390;
const thumbnailWidth = 276;
const thumbnailHeight = 345;
const contactWidth = columns * cellWidth;
const contactHeight = rows * cellHeight;
const contactComposites = [];

for (const [index, sourceFile] of sourceFiles.entries()) {
  const column = index % columns;
  const row = Math.floor(index / columns);
  const left = column * cellWidth + 12;
  const top = row * cellHeight + 12;
  const imagePath = path.join(outputDirectory, sourceFile.replace(/\.png$/, ".webp"));
  const thumbnail = await sharp(imagePath)
    .resize(thumbnailWidth, thumbnailHeight, { fit: "cover" })
    .toBuffer();
  const label = Buffer.from(`
    <svg width="${thumbnailWidth}" height="24" xmlns="http://www.w3.org/2000/svg">
      <text x="2" y="16" fill="#a7a8b3" font-family="monospace" font-size="12" letter-spacing="0.6">${sourceFile.replace(/\.png$/, "")}</text>
    </svg>
  `);

  contactComposites.push({ input: thumbnail, left, top });
  contactComposites.push({ input: label, left, top: top + thumbnailHeight + 8 });
}

await sharp({
  create: {
    width: contactWidth,
    height: contactHeight,
    channels: 3,
    background: "#050507",
  },
})
  .composite(contactComposites)
  .webp({ quality: 90, smartSubsample: true })
  .toFile(contactSheetPath);

console.log(`Created ${sourceFiles.length} WebP ribbon assets in ${outputDirectory}`);
console.log(`Created contact sheet at ${contactSheetPath}`);
