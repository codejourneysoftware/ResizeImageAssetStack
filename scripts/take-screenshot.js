import puppeteer from 'puppeteer-core';
import { existsSync } from 'fs';

const chromePaths = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
];

const executablePath = chromePaths.find(p => existsSync(p)) || 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

(async () => {
  console.log(`Using browser at: ${executablePath}`);
  const browser = await puppeteer.launch({
    executablePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1060, height: 760, deviceScaleFactor: 2 });
  await page.goto('http://localhost:1420', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1200));

  await page.screenshot({ path: 'docs/screenshot.png' });
  await page.screenshot({ path: 'public/screenshot.png' });
  await browser.close();
  console.log('Successfully captured screenshot to docs/screenshot.png');
})();

