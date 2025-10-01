const fs = require('fs')
const path = require('path')

const src = path.resolve(__dirname, '..', 'node_modules', 'inter-ui', 'web-latin')
const dest = path.resolve(__dirname, '..', 'dist', 'web-latin')

if (!fs.existsSync(src)) {
  console.warn('inter-ui web-latin directory not found, skipping font copy.')
  process.exit(0)
}

fs.mkdirSync(dest, { recursive: true })

const files = fs.readdirSync(src).filter((f) => f.endsWith('.woff2'))
for (const f of files) {
  fs.copyFileSync(path.join(src, f), path.join(dest, f))
  console.log(`Copied ${f} -> dist/web-latin/${f}`)
}

console.log('Fonts copied.')
