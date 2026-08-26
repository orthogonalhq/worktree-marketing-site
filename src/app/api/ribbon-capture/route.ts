import { mkdir, open, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import sharp from "sharp";

const framePattern = /^(?:(?:header|twist|canopy|halo|pleat|orbit)-\d{3}[a-z]?|hero-fallback-(?:landscape|portrait))$/;

export async function POST(request: Request) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Ribbon capture is only available locally." }, { status: 403 });
  }

  const data = await request.formData();
  const frame = data.get("frame");
  const image = data.get("image");

  if (typeof frame !== "string" || !framePattern.test(frame) || !(image instanceof File)) {
    return NextResponse.json({ error: "Invalid capture payload." }, { status: 400 });
  }

  if (image.type !== "image/png" || image.size === 0 || image.size > 25_000_000) {
    return NextResponse.json({ error: "Invalid PNG capture." }, { status: 400 });
  }

  const sourceBytes = Buffer.from(await image.arrayBuffer());
  const isPng = sourceBytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));

  if (!isPng) {
    return NextResponse.json({ error: "Capture is not a PNG image." }, { status: 400 });
  }

  if (frame === "hero-fallback-landscape" || frame === "hero-fallback-portrait") {
    const fallbackDirectory = path.join(process.cwd(), "public", "vendor", "wave-prototype");
    await mkdir(fallbackDirectory, { recursive: true });
    const fallbackBytes = await sharp(sourceBytes)
      .webp({ alphaQuality: 100, effort: 6, quality: 92, smartSubsample: true })
      .toBuffer();

    if (frame === "hero-fallback-landscape") {
      await Promise.all([
        writeFile(path.join(fallbackDirectory, "wave-fallback-desktop.webp"), fallbackBytes),
        sharp(sourceBytes)
          .resize({ width: 1264, height: 900, fit: "cover", position: "center" })
          .webp({ alphaQuality: 100, effort: 6, quality: 92, smartSubsample: true })
          .toFile(path.join(fallbackDirectory, "wave-fallback-tablet.webp")),
      ]);
      return NextResponse.json({ path: "/vendor/wave-prototype/wave-fallback-desktop.webp" });
    }

    await writeFile(path.join(fallbackDirectory, "wave-fallback-mobile.webp"), fallbackBytes);
    return NextResponse.json({ path: "/vendor/wave-prototype/wave-fallback-mobile.webp" });
  }

  const bytes = await sharp(sourceBytes)
    .webp({ effort: 4, lossless: true })
    .toBuffer();

  const outputDirectory = path.join(process.cwd(), "public", "images", "workflow-ribbons");
  await mkdir(outputDirectory, { recursive: true });
  const existingFiles = await readdir(outputDirectory);
  let sequence = existingFiles.reduce((highest, filename) => {
    const match = filename.match(/^(\d+)-/);
    return match ? Math.max(highest, Number(match[1])) : highest;
  }, 0) + 1;
  let filename = "";

  while (!filename) {
    const candidate = `${String(sequence).padStart(3, "0")}-${frame}.webp`;
    try {
      const file = await open(path.join(outputDirectory, candidate), "wx");
      try {
        await file.writeFile(bytes);
      } finally {
        await file.close();
      }
      filename = candidate;
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "EEXIST") throw error;
      sequence += 1;
    }
  }

  return NextResponse.json({ path: `/images/workflow-ribbons/${filename}` });
}
