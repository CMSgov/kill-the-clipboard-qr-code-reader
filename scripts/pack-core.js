#!/usr/bin/env node
/**
 * Create a zip of dist/core/ named killtheclipboard-core-<version>.zip.
 * Run after build:core (pack:core script runs build:core first).
 */
import { readFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf-8'));
const version = pkg.version;
const distCore = join(root, 'dist', 'core');
const zipName = `killtheclipboard-core-${version}.zip`;

if (!existsSync(distCore)) {
  console.error('dist/core/ not found. Run npm run build:core first.');
  process.exit(1);
}

execSync(`cd dist && zip -rq ../${zipName} core`, { cwd: root, stdio: 'inherit' });
console.log('Created', zipName);
