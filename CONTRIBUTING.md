# Contributing

This repository is a teaching sample, but it follows a real contribution flow so
you can practise it during the lab.

## The flow

1. **Create a branch** off `main`:
   ```bash
   git switch -c feat/my-change
   ```
2. **Make your change** and keep commits small and focused.
3. **Run checks locally** before pushing:
   ```bash
   npm run lint
   npm test
   npm run build
   ```
4. **Commit** using [Conventional Commits](https://www.conventionalcommits.org/):
   ```bash
   git commit -m "feat: add kebabCase helper"
   ```
   Allowed types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`,
   `build`, `ci`, `chore`, `revert`.
5. **Push and open a Pull Request** against `main`. CI and PR validation will run
   automatically; a bot will comment on whether your title is valid.
6. **Address review feedback**, then squash-and-merge once checks are green.

## Commit message format

```
<type>(optional scope): <short summary>

[optional body explaining what and why]
```

Example:

```
fix(truncate): handle suffix longer than maxLength
```
