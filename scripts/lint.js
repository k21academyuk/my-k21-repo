'use strict';

/**
 * A tiny, dependency-free "linter".
 *
 * Real projects use ESLint / Prettier. We keep a hand-rolled checker here so the
 * training repo runs with zero `npm install`, while still giving the CI workflow
 * a lint step that can pass *or fail* a pull request. Swap this out for ESLint
 * once you are comfortable adding dependencies (see README → "Going further").
 */

const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.join(__dirname, '..');
const SCAN_DIRS = ['src', 'tests', 'scripts'];
const problems = [];

/** Recursively collect .js files under a directory. */
function collect(dir) {
  const out = [];
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...collect(full));
    } else if (entry.isFile() && entry.name.endsWith('.js')) {
      out.push(full);
    }
  }
  return out;
}

const files = SCAN_DIRS.flatMap((d) => collect(path.join(ROOT, d)));

for (const file of files) {
  const rel = path.relative(ROOT, file);
  const text = fs.readFileSync(file, 'utf8');
  const lines = text.split('\n');

  // Rule 1: no stray console.log in source (tests/scripts may log on purpose).
  if (rel.startsWith('src' + path.sep)) {
    lines.forEach((line, i) => {
      if (/\bconsole\.log\s*\(/.test(line)) {
        problems.push(`${rel}:${i + 1}  unexpected console.log in source`);
      }
    });
  }

  // Rule 2: no trailing whitespace.
  lines.forEach((line, i) => {
    if (/[ \t]+$/.test(line)) {
      problems.push(`${rel}:${i + 1}  trailing whitespace`);
    }
  });

  // Rule 3: file must end with exactly one newline.
  if (!text.endsWith('\n') || text.endsWith('\n\n')) {
    problems.push(`${rel}  file should end with a single trailing newline`);
  }
}

if (problems.length > 0) {
  console.error(`Lint failed with ${problems.length} problem(s):`);
  for (const p of problems) console.error('  - ' + p);
  // A non-zero exit code is what turns a workflow step (and its check) red.
  process.exit(1);
}

console.log(`Lint passed — ${files.length} file(s) checked, no problems found.`);
