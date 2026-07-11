'use strict';

/**
 * Build step.
 *
 * Takes the library in src/ and produces a self-contained, deployable site in
 * dist/. The CI workflow uploads dist/ as an artifact, and the deploy workflow
 * publishes it to GitHub Pages (staging) and a gated "production" environment.
 *
 * Run locally with:  npm run build
 */

const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.join(__dirname, '..');
const SRC = path.join(ROOT, 'src');
const DIST = path.join(ROOT, 'dist');
const pkg = require(path.join(ROOT, 'package.json'));

// Clean and recreate dist/
fs.rmSync(DIST, { recursive: true, force: true });
fs.mkdirSync(DIST, { recursive: true });

// 1. Bundle the library into a single browser-friendly file.
const impl = fs.readFileSync(path.join(SRC, 'stringUtils.js'), 'utf8');
const browserBundle = impl
  .replace("'use strict';", "'use strict';\n// Auto-generated bundle — do not edit by hand.")
  .replace(/module\.exports\s*=\s*{[\s\S]*?};\s*$/m, 'window.StringToolkit = {\n  slugify,\n  truncate,\n  titleCase,\n  isPalindrome,\n  wordCount,\n  reverseWords,\n};\n');

fs.writeFileSync(path.join(DIST, 'string-toolkit.js'), browserBundle);

// 2. Generate a small demo page so a deployment is visibly "live".
const buildId = process.env.GITHUB_SHA ? process.env.GITHUB_SHA.slice(0, 7) : 'local';
const builtAt = new Date().toISOString();

const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${pkg.name} ${pkg.version}</title>
  <style>
    :root { --blue:#2563EB; --orange:#F59E0B; --ink:#0D1117; --muted:#57606a; --line:#d0d7de; }
    * { box-sizing: border-box; }
    body { margin:0; font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
           color:var(--ink); background:#f6f8fa; }
    header { background:var(--ink); color:#fff; padding:28px 20px; }
    .wrap { max-width:760px; margin:0 auto; padding:20px; }
    h1 { margin:0 0 4px; font-size:24px; }
    .tag { color:#9aa7b4; font-size:13px; letter-spacing:.04em; }
    .card { background:#fff; border:1px solid var(--line); border-radius:10px;
            padding:18px; margin:16px 0; }
    label { display:block; font-weight:600; font-size:13px; margin-bottom:6px; }
    input { width:100%; padding:9px 11px; border:1px solid var(--line); border-radius:7px; font-size:15px; }
    .out { margin-top:10px; font-family: ui-monospace, "Courier New", monospace;
           background:#f6f8fa; border:1px solid var(--line); border-radius:7px; padding:9px 11px; }
    .pill { display:inline-block; background:var(--blue); color:#fff; font-size:11px;
            padding:2px 8px; border-radius:999px; }
    .pill.orange { background:var(--orange); }
    footer { color:var(--muted); font-size:12px; text-align:center; padding:24px; }
    a { color:var(--blue); }
  </style>
</head>
<body>
  <header>
    <div class="wrap">
      <h1>${pkg.name} <span class="pill">v${pkg.version}</span></h1>
      <div class="tag">${pkg.description}</div>
    </div>
  </header>

  <main class="wrap">
    <div class="card">
      <span class="pill orange">build ${buildId}</span>
      <p>This page was produced by the <code>npm run build</code> step and deployed by a GitHub Actions workflow. Type below to exercise the library live.</p>
    </div>

    <div class="card">
      <label for="in">Input text</label>
      <input id="in" value="A man, a plan, a canal: Panama" />
      <div class="out" id="slug"></div>
      <div class="out" id="title"></div>
      <div class="out" id="palindrome"></div>
      <div class="out" id="count"></div>
      <div class="out" id="reverse"></div>
    </div>
  </main>

  <footer>
    Built ${builtAt} &middot; GitHub Actions training sample
  </footer>

  <script src="string-toolkit.js"></script>
  <script>
    var input = document.getElementById('in');
    function render() {
      var v = input.value;
      document.getElementById('slug').textContent        = 'slugify        -> ' + StringToolkit.slugify(v);
      document.getElementById('title').textContent       = 'titleCase      -> ' + StringToolkit.titleCase(v);
      document.getElementById('palindrome').textContent  = 'isPalindrome   -> ' + StringToolkit.isPalindrome(v);
      document.getElementById('count').textContent       = 'wordCount      -> ' + StringToolkit.wordCount(v);
      document.getElementById('reverse').textContent     = 'reverseWords   -> ' + StringToolkit.reverseWords(v);
    }
    input.addEventListener('input', render);
    render();
  </script>
</body>
</html>
`;

fs.writeFileSync(path.join(DIST, 'index.html'), html);

// 3. A tiny build manifest — handy for verifying what got deployed.
fs.writeFileSync(
  path.join(DIST, 'build-info.json'),
  JSON.stringify({ name: pkg.name, version: pkg.version, buildId, builtAt }, null, 2) + '\n'
);

console.log('Build complete. Output written to dist/:');
for (const f of fs.readdirSync(DIST)) {
  console.log('  - dist/' + f);
}
