# string-toolkit — GitHub Actions Training Sample

A small, **dependency-free** string utility library. Its only job is to give you
real code to **commit, branch, review, test, build, and deploy** while you learn
Git, GitHub and GitHub Actions.

> Works immediately after cloning — there is nothing to `npm install`.

---

## Quickstart

```bash
# 1. Get the code
git clone <your-fork-url>
cd string-toolkit

# 2. Try the library
npm start          # prints the exported functions
npm test           # runs the test suite (Node's built-in runner)
npm run lint       # runs the lightweight linter
npm run build      # produces a deployable site in dist/

# 3. Open dist/index.html in a browser to see the live demo
```

Requires **Node.js 18.13+** (Node 20 or 22 recommended).

---

## What's inside

| Path | What it is |
|------|------------|
| `src/stringUtils.js` | The six helper functions (`slugify`, `truncate`, `titleCase`, `isPalindrome`, `wordCount`, `reverseWords`) |
| `src/index.js` | Public entry point |
| `tests/stringUtils.test.js` | Tests using `node:test` (no Jest needed) |
| `scripts/lint.js` | Tiny no-dependency linter |
| `scripts/build.js` | Builds `dist/` (bundle + live demo page) |
| `.github/workflows/` | Four workflows — see below |
| `.github/CODEOWNERS` | Automatic review assignment |
| `.github/pull_request_template.md` | Auto-filled PR description |
| `.github/ISSUE_TEMPLATE/` | Bug & feature templates |

---

## The workflows (and the module each one teaches)

| Workflow | Triggers | Teaches |
|----------|----------|---------|
| **`ci.yml`** | push & PR to `main` | Module 4 — jobs, steps, **matrix** builds, `needs`, caching, artifacts |
| **`pr-validation.yml`** | `pull_request` events | Module 3 — PR gatekeeping · Module 6 — `GITHUB_TOKEN` + write permission |
| **`scheduled.yml`** | **cron** + manual | Module 5 — scheduled triggers & `workflow_dispatch` inputs |
| **`deploy.yml`** | push to `main` + manual | Module 6 — secrets · Module 7 — **environments & deployment gates** |

The deploy workflow runs `build → deploy-staging (GitHub Pages) → deploy-production (gated)`.
The production job pauses for approval once you add a required reviewer to the
`production` environment (Lab 7).

---

## Suggested first change (for the lab)

Add a `kebabCase` (or any) helper to `src/stringUtils.js`, write a test for it,
then take it all the way through a branch → PR → review → merge → deploy. The
**Lab Guide** walks you through every step.

---

## Going further

- Replace `scripts/lint.js` with real [ESLint](https://eslint.org/) (add it to
  `devDependencies`; `npm ci` will install and cache it in CI).
- Add code-coverage reporting and upload it as an artifact.
- Swap the simulated production deploy for a real target (Azure, AWS, a server)
  using an environment-scoped secret and, ideally, OIDC instead of a stored token.

---

_Part of the "Git, GitHub & GitHub Actions" training kit by Gennoor Tech ·
TRAIN · INNOVATE · BUILD_
