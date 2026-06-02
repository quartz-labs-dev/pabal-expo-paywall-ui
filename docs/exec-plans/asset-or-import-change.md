# Asset Or Import Change

Use this plan before moving package source files, changing internal imports, or
adding static assets loaded by package source.

## Trigger

Read this before changing:

- files under `packages/paywall-ui/src`
- internal import paths consumed by Metro
- directory names that could collide with file names
- static assets loaded with `require(...)`
- package build output expectations

## Inspect First

- `packages/paywall-ui/package.json`
- `packages/paywall-ui/src/index.ts`
- the importing source file
- the target source file or asset path
- `packages/paywall-ui/scripts/clean-dist.cjs`
- `packages/paywall-ui/scripts/copy-assets.cjs`
- `apps/playground/tsconfig.json`

## Required Work

1. Make internal imports resolve from package source, not only from TypeScript build output.
2. Avoid ambiguous Metro paths. Do not keep both a file and directory that share the same module path, such as `src/shared/icons.tsx` and `src/shared/icons/`.
3. For `require(...)` assets, verify the path relative to the file doing the `require`.
4. If package static assets are added, make sure the package build copies them into `dist`.
5. Do not bypass the package `build` script. It cleans stale `dist` output and copies assets.

## Validation

Run when possible:

```bash
yarn typecheck
yarn test
yarn build
```

After moving package source files, changing internal imports, or adding package static assets, also run:

```bash
yarn workspace playground expo export --platform ios --output-dir /tmp/pabal-playground-ios-export
```

## Common Misses

- Checking TypeScript path resolution but not Metro source resolution.
- Verifying asset paths from the package root instead of from the requiring file.
- Adding a package asset that works in source but is missing from `dist`.
- Creating file/directory ambiguity that TypeScript tolerates and Metro rejects.
- Running `tsc` directly instead of the package build script.

## Completion Checklist

- [ ] Source imports resolve in Metro.
- [ ] No file/directory module path ambiguity introduced.
- [ ] Static `require(...)` paths checked from the requiring file.
- [ ] Package build asset copying checked when assets changed.
- [ ] `yarn typecheck` run or skipped with reason.
- [ ] `yarn test` run or skipped with reason.
- [ ] `yarn build` run or skipped with reason.
- [ ] iOS Expo export run or skipped with reason.
