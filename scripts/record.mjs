import fs from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";

const OUTPUT_NAME = "portfolio-demo.mp4";
const OUTPUT_DIR = process.cwd();
const RECORD_DIR = path.join(OUTPUT_DIR, "videos");
const URL = "https://truzzle447.github.io/portfolio/";

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const constantScrollToBottom = async (page, speedPxPerMs, maxDurationMs) => {
  await page.evaluate(
    ({ speedPxPerMs, maxDurationMs }) =>
      new Promise((resolve) => {
        let lastTime = performance.now();
        const startTime = lastTime;

        const step = (now) => {
          const delta = now - lastTime;
          lastTime = now;
          window.scrollBy(0, delta * speedPxPerMs);

          const bottomReached =
            window.scrollY + window.innerHeight >=
            document.documentElement.scrollHeight - 2;

          if (bottomReached || now - startTime >= maxDurationMs) {
            window.scrollTo(0, document.documentElement.scrollHeight);
            resolve();
            return;
          }

          requestAnimationFrame(step);
        };

        requestAnimationFrame(step);
      }),
    { speedPxPerMs, maxDurationMs }
  );
};

const scrollBottom = async (page) => {
  return page.evaluate(() => document.documentElement.scrollHeight - window.innerHeight);
};

const setDarkMode = async (page, isDark) => {
  await page.evaluate((enabled) => {
    const root = document.documentElement;
    root.classList.toggle("dark", enabled);
    window.localStorage.setItem("theme", enabled ? "dark" : "light");
  }, isDark);
};

const run = async () => {
  const TARGET_SCROLL_MS = 15000;

  await fs.mkdir(RECORD_DIR, { recursive: true });

  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    recordVideo: {
      dir: RECORD_DIR,
      size: { width: 1920, height: 1080 },
    },
  });

  const page = await context.newPage();
  await page.goto(URL, { waitUntil: "networkidle" });
  await wait(300);
  await page.evaluate(() => {
    document.documentElement.style.scrollBehavior = "auto";
    document.body.style.scrollBehavior = "auto";
  });

  // Light mode full scroll.
  await setDarkMode(page, false);
  await page.evaluate(() => window.scrollTo(0, 0));
  await wait(150);

  const bottomY = await scrollBottom(page);
  const lightSpeed = bottomY / TARGET_SCROLL_MS;
  await constantScrollToBottom(
    page,
    lightSpeed,
    Math.max(TARGET_SCROLL_MS * 1.25, 4000)
  );

  // Dark mode full scroll.
  await page.evaluate(() => window.scrollTo(0, 0));
  await wait(150);
  await setDarkMode(page, true);
  await wait(150);

  const darkBottomY = await scrollBottom(page);
  const darkSpeed = darkBottomY / TARGET_SCROLL_MS;
  await constantScrollToBottom(
    page,
    darkSpeed,
    Math.max(TARGET_SCROLL_MS * 1.25, 4000)
  );

  const video = page.video();
  await context.close();
  await browser.close();

  const videoPath = await video.path();
  const outputPath = path.join(OUTPUT_DIR, OUTPUT_NAME);
  await fs.copyFile(videoPath, outputPath);
  await fs.rm(videoPath, { force: true });

  console.log(`Saved video: ${outputPath}`);
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
