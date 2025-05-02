// postbuild.js
const fs = require('fs')
const path = require('path')

const HEADER_FILE = 'plugin-header.txt'
const DIST_DIR = 'dist'

function getBuildDate() {
  const now = new Date()
  return now.toISOString()
}

function prependHeaderToFile(filePath) {
  // Read header content
  const header = fs.readFileSync(HEADER_FILE, 'utf-8').replace(/{{DATE}}/g, getBuildDate())

  // Read current file content
  let content = fs.readFileSync(filePath, 'utf-8')

  // Prepend header
  content = `${header}\n\n${content}`

  // Write back with header
  fs.writeFileSync(filePath, content, 'utf-8')

  console.log(`Injected plugin definition to ${filePath}`)
}

function runPostBuild() {
  // Get list of .js files in dist/
  const files = fs.readdirSync(DIST_DIR).filter((file) => file.endsWith('.js'))

  if (files.length === 0) {
    console.warn('No .js files found in dist/')
    return
  }

  for (const file of files) {
    const fullPath = path.join(DIST_DIR, file)
    prependHeaderToFile(fullPath)
  }
}

runPostBuild()