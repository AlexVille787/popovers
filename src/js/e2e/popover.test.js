const assert = require("node:assert/strict");
const path = require("node:path");
const puppeteer = require("puppeteer");
const launchOptions = require("./launchOptions");

const distIndexUrl = `file://${path.resolve(__dirname, "../../../dist/index.html")}`;

async function run() {
  const browser = await puppeteer.launch(launchOptions);

  try {
    const page = await browser.newPage();
    await page.goto(distIndexUrl);

    // Изначально попапа ещё нет в DOM
    let popover = await page.$(".popover");
    assert.equal(
      popover,
      null,
      "Попап не должен существовать в DOM до первого клика",
    );

    // Клик по кнопке показывает попап
    await page.click(".popover-btn");
    await page.waitForSelector(".popover", { visible: true });

    const title = await page.$eval(".popover-title", (el) => el.textContent);
    const text = await page.$eval(".popover-content", (el) => el.textContent);
    assert.equal(
      title,
      "Custom Popover Title",
      "Заголовок попапа должен соответствовать переданному в Popover",
    );
    assert.equal(
      text,
      "This is amazing content from data attributes!",
      "Текст попапа должен соответствовать переданному в Popover",
    );

    const displayAfterShow = await page.$eval(
      ".popover",
      (el) => el.style.display,
    );
    assert.equal(
      displayAfterShow,
      "block",
      "После клика попап должен быть видимым (display: block)",
    );

    // Повторный клик скрывает попап
    await page.click(".popover-btn");
    await page.waitForFunction(
      () => document.querySelector(".popover").style.display === "none",
    );

    if (launchOptions.closeDelayMs > 0) {
      await new Promise((resolve) =>
        setTimeout(resolve, launchOptions.closeDelayMs),
      );
    }
  } finally {
    await browser.close();
  }
}

module.exports = run;
