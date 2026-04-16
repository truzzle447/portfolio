import fs from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";

const OUTPUT_DIR = path.join(process.cwd(), "videos");
const OUTPUT_NAME = "desq-teaser-short.mp4";
const SOURCE_URL = `file://${path.join(process.cwd(), "public", "desq-teaser.html")}`;

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const run = async () => {
  await fs.mkdir(OUTPUT_DIR, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    recordVideo: {
      dir: OUTPUT_DIR,
      size: { width: 1280, height: 720 },
    },
  });

  const page = await context.newPage();
  await page.goto(SOURCE_URL, { waitUntil: "networkidle" });
  await page.evaluate(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    window.scrollTo(0, 0);
  });

  await wait(1400);
  for (let i = 1; i < 7; i += 1) {
    await page.evaluate((idx) => {
      document.querySelectorAll("section")[idx]?.scrollIntoView({ behavior: "smooth" });
    }, i);
    await wait(i === 5 ? 2800 : 2100);
  }

  await wait(1800);

  const recordedVideo = page.video();
  await context.close();
  await browser.close();

  const tempPath = await recordedVideo.path();
  const outputPath = path.join(OUTPUT_DIR, OUTPUT_NAME);
  await fs.copyFile(tempPath, outputPath);

  console.log(`Saved video: ${outputPath}`);
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
