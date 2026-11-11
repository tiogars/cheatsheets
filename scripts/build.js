#!/usr/bin/env node

import { execSync } from 'node:child_process';
import { copyFileSync, readdirSync, mkdirSync, existsSync } from 'node:fs';
import { join, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const rootDir = join(__dirname, '..');
const srcDir = join(rootDir, 'src', 'thematiques');
const distDir = join(rootDir, 'dist');

// Ensure dist directory exists
if (!existsSync(distDir)) {
  mkdirSync(distDir, { recursive: true });
}

// Get all markdown files in thematiques directory
const files = readdirSync(srcDir).filter(f => f.endsWith('.md'));

// Build each thematique
for (const file of files) {
  const name = basename(file, '.md');
  const inputPath = join(srcDir, file);
  
  console.log(`Building: ${name}`);
  
  // Build HTML
  execSync(`marp "${inputPath}" --html --template bespoke --bespoke.progress --output "${join(distDir, name + '.html')}"`, {
    stdio: 'inherit',
    cwd: rootDir
  });
  
  // Build PDF
  execSync(`marp "${inputPath}" --html --pdf --pdf-outlines --output "${join(distDir, name + '.pdf')}"`, {
    stdio: 'inherit',
    cwd: rootDir
  });
  
  // Build PPTX
  execSync(`marp "${inputPath}" --html --pptx --output "${join(distDir, name + '.pptx')}"`, {
    stdio: 'inherit',
    cwd: rootDir
  });
  
  console.log(`  ✓ ${name}.html, ${name}.pdf, ${name}.pptx`);
}

// Copy index.html to dist
copyFileSync(join(rootDir, 'src', 'index.html'), join(distDir, 'index.html'));
console.log('\n✓ Copied index.html to dist');

console.log('\nBuild completed successfully!');
