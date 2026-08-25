const headless = process.env.E2E_HEADLESS === "true";

const slowMo = headless ? 0 : Number(process.env.E2E_SLOWMO || 100);

const closeDelayMs = headless ? 0 : Number(process.env.E2E_CLOSE_DELAY || 1000);

module.exports = {
  headless,
  slowMo,
  closeDelayMs,
};
