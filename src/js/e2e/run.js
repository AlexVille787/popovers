const fs = require("node:fs");
const path = require("node:path");

const testsDir = __dirname;

const testFiles = fs
  .readdirSync(testsDir)
  .filter((file) => file.endsWith(".test.js"))
  .sort();

async function runAll() {
  if (testFiles.length === 0) {
    console.warn(`[e2e] Тесты не найдены в ${testsDir}`);
    return;
  }

  let hasFailures = false;

  for (const file of testFiles) {
    const testName = path.basename(file, ".test.js");
    const testFn = require(path.join(testsDir, file));

    try {
      await testFn();
      console.log(`[e2e] PASS ${testName}`);
    } catch (error) {
      hasFailures = true;
      console.error(`[e2e] FAIL ${testName}`);
      console.error(error);
    }
  }

  if (hasFailures) {
    process.exitCode = 1;
  }
}

runAll();
