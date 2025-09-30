#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const componentsDir = path.resolve(__dirname, "../src/components");
const readmePath = path.resolve(__dirname, "../README.md");

function listComponentNames() {
  if (!fs.existsSync(componentsDir)) return [];
  return fs
    .readdirSync(componentsDir)
    .filter((name) => {
      const p = path.join(componentsDir, name);
      return fs.statSync(p).isDirectory();
    })
    .sort();
}

function readComponentFile(componentName) {
  const dir = path.join(componentsDir, componentName);
  const candidates = [
    path.join(dir, `${componentName}.tsx`),
    path.join(dir, "index.tsx"),
    path.join(dir, "index.ts"),
  ];
  for (const c of candidates) {
    if (fs.existsSync(c)) return fs.readFileSync(c, "utf8");
  }
  const files = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".tsx") || f.endsWith(".ts"));
  if (files.length) return fs.readFileSync(path.join(dir, files[0]), "utf8");
  return null;
}

function extractJsDocShort(jsText, componentName) {
  if (!jsText) return null;
  // Find the first JSDoc block /** ... */
  const jsDocMatch = jsText.match(/\/\*\*([\s\S]*?)\*\//);
  if (!jsDocMatch) return null;
  const body = jsDocMatch[1];
  // Prefer an explicit @description tag if present
  const descTag = body.match(/@description\s+([\s\S]*?)(?=(\n\s*@)|$)/i);
  if (descTag) {
    const txt = descTag[1].trim().replace(/\n\s*\*\s*/g, " ");
    const m = txt.match(/([\s\S]*?[.!?])\s/);
    if (m) return m[1].trim();
    return txt.split("\n")[0].trim();
  }
  // Split into lines, remove leading '*' and whitespace
  const lines = body.split("\n").map((l) => l.replace(/^\s*\*\s?/, "").trim());
  // Collect description lines until a tag like @param or @example
  const descLines = [];
  for (const line of lines) {
    if (!line) {
      if (descLines.length) break; // stop after blank line following description
      continue;
    }
    if (line.startsWith("@")) break;
    descLines.push(line);
  }
  if (!descLines.length) return null;
  // If the first line is just a title with the component name (e.g. "Button" or "ButtonProps"), skip it
  let startIdx = 0;
  if (componentName) {
    const first = descLines[0].replace(/\s+/g, "");
    const cmp = componentName.replace(/\s+/g, "");
    if (
      first.toLowerCase() === cmp.toLowerCase() ||
      first.toLowerCase() === (cmp + "props").toLowerCase()
    ) {
      startIdx = 1;
    }
  }
  const sliced = descLines.slice(startIdx);
  if (!sliced.length) return null;
  const joined = sliced.join(" ");
  // Return the first sentence from the description (or the whole string if no punctuation)
  const m = joined.match(/([\s\S]*?[.!?])\s/);
  if (m) return m[1].trim();
  return joined.trim();
}

function extractExample(jsText, componentName) {
  if (!jsText) return null;
  // Try to find @example tags in the JSDoc attached to the component first
  const patterns = [
    `export const ${componentName}`,
    `export function ${componentName}`,
    `export default ${componentName}`,
    `const ${componentName} =`,
    `function ${componentName}(`,
  ];
  let pos = -1;
  for (const p of patterns) {
    const i = jsText.indexOf(p);
    if (i !== -1 && (pos === -1 || i < pos)) pos = i;
  }
  let docBlock = null;
  if (pos !== -1) {
    const before = jsText.slice(0, pos);
    const lastStart = before.lastIndexOf("/**");
    const lastEnd = before.lastIndexOf("*/");
    if (lastStart !== -1 && lastStart > lastEnd) {
      docBlock = jsText.slice(lastStart, pos);
    }
  }
  if (!docBlock) {
    const m = jsText.match(/\/\*\*([\s\S]*?)\*\//);
    docBlock = m ? "/**" + m[1] + "*/" : null;
  }
  if (!docBlock) return null;
  // Find @example content (may be multi-line). Capture until next @tag or end of block
  const ex = docBlock.match(/@example\s*([\s\S]*?)(?=(\n\s*\*\s*@)|\*\/)\s*/i);
  if (!ex) return null;
  // Clean leading '* ' at line starts
  const content = ex[1]
    .split("\n")
    .map((l) => l.replace(/^\s*\*\s?/, ""))
    .join("\n")
    .trim();
  return content;
}

function extractJsDocForComponent(jsText, componentName) {
  if (!jsText) return null;
  // Look for common export/definition patterns and use the JSDoc block
  // immediately preceding that position.
  const patterns = [
    `export const ${componentName}`,
    `export function ${componentName}`,
    `export default ${componentName}`,
    `const ${componentName} =`,
    `function ${componentName}(`,
  ];

  let pos = -1;
  for (const p of patterns) {
    const i = jsText.indexOf(p);
    if (i !== -1 && (pos === -1 || i < pos)) pos = i;
  }

  if (pos !== -1) {
    const before = jsText.slice(0, pos);
    const lastStart = before.lastIndexOf("/**");
    const lastEnd = before.lastIndexOf("*/");
    if (lastStart !== -1 && lastStart > lastEnd) {
      const block = jsText.slice(lastStart, pos);
      return extractJsDocShort(block, componentName);
    }
  }

  // fallback to first JSDoc in the file
  return extractJsDocShort(jsText, componentName);
}

function generateMd(comps) {
  if (comps.length === 0) return "No components found.";
  return comps
    .map((c) => {
      const txt = readComponentFile(c);
      const short = extractJsDocForComponent(txt, c) || "";
      const example = extractExample(txt, c);
      const importLine = `import { ${c} } from '@ohshitman/ohs-react-components';`;
      let exampleContent = example ? example : `// Example usage of ${c}`;
      // Remove any import lines that import from the package (they may use default imports)
      exampleContent = exampleContent
        .split("\n")
        .filter(
          (ln) =>
            !ln.match(
              /import\s+.*from\s+['"]@ohshitman\/ohs-react-components['"]/
            )
        )
        .join("\n")
        .trim();
      const block = [];
      block.push(`### ${c}`);
      if (short) block.push("", short);
      block.push("", "```tsx");
      block.push(importLine, "", exampleContent);
      block.push("```");
      return block.join("\n");
    })
    .join("\n\n");
}

function inject() {
  const comps = listComponentNames();
  const md = generateMd(comps);
  const readme = fs.readFileSync(readmePath, "utf8");
  const start = "<!-- COMPONENTS:START -->";
  const end = "<!-- COMPONENTS:END -->";
  const before = readme.split(start)[0];
  const after = readme.split(end)[1] || "";
  const newReadme = before + start + "\n\n" + md + "\n\n" + end + after;
  fs.writeFileSync(readmePath, newReadme, "utf8");
  console.log(`Updated README with ${comps.length} components.`);
}

inject();
