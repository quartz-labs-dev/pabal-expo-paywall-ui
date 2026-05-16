const { cpSync, existsSync } = require("node:fs");
const { join } = require("node:path");

const sourceAssetsDir = join(__dirname, "..", "src", "assets");
const distAssetsDir = join(__dirname, "..", "dist", "assets");

if (existsSync(sourceAssetsDir)) {
  cpSync(sourceAssetsDir, distAssetsDir, { recursive: true });
}
