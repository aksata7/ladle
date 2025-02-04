import { copyFile, access, mkdir } from "fs/promises";
import { join } from "path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

/**
 *
 * @param {string} path
 */
async function ensureDirectoryExists(path) {
  try {
    await access(path);
  } catch {
    try {
      await mkdir(path);
    } catch (err) {
      console.error("Error:", err);
    }
  }
}

/**
 *
 * @param {string} publicDir
 */
const copyMswWorker = async (publicDir) => {
  await ensureDirectoryExists(publicDir);
  const mswWorkerPath = join(publicDir, "mockServiceWorker.js");
  const mswPath = require.resolve("msw");
  const mswWorkerPathOrigin = mswPath.replace(
    "index.js",
    "mockServiceWorker.js",
  );
  console.log(mswWorkerPathOrigin);
  await copyFile(mswWorkerPathOrigin, mswWorkerPath);
};

export default copyMswWorker;
