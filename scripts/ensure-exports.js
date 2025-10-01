const fs = require("fs");
const path = require("path");

const pkgPath = path.join(__dirname, "..", "package.json");
const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));

// Desired exports entries to ensure
const desired = {
  ".": "./dist/index.mjs",
  "./package.json": "./package.json",
  "./dist/index.css": "./dist/index.css",
  "./styles.css": "./dist/index.css",
  "./dist/*": "./dist/*",
};

pkg.exports = {
  ...(pkg.exports || {}),
  ...desired,
};

fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n", "utf8");
console.log("Updated package.json exports.");
