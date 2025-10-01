const fs = require('fs')
const path = require('path')

const srcDir = path.resolve(__dirname, '..', 'types')
const outDir = path.resolve(__dirname, '..', 'dist', 'types')

if (!fs.existsSync(srcDir)) {
  console.warn('No types directory found, skipping copy.')
  process.exit(0)
}

fs.mkdirSync(outDir, { recursive: true })

const files = fs.readdirSync(srcDir).filter((f) => f.endsWith('.d.ts'))
for (const file of files) {
  const src = path.join(srcDir, file)
  const dest = path.join(outDir, file)
  fs.copyFileSync(src, dest)
  console.log(`Copied ${file} -> dist/types/${file}`)
}

console.log('Type definitions copied.')
