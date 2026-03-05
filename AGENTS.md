# Agents

## Cursor Cloud specific instructions

This is a **pnpm monorepo** (`pnpm@9.5.0`) for the Viv library — a WebGL toolkit for bioimaging visualization. It is a **pure frontend** project with no backend, databases, or Docker services.

### Project layout

- `packages/` — published npm packages under `@vivjs` scope (constants, types, loaders, extensions, layers, views, viewers, main)
- `sites/avivator` — Vite-based React demo app for viewing OME-TIFF/Zarr microscopy images
- `sites/docs` — API documentation site

### Key commands (see `package.json` scripts)

| Task | Command |
|------|---------|
| Install deps | `pnpm install` |
| Lint | `biome ci .` (or `pnpm fix` for auto-fix) |
| Test | `pnpm test` (runs vitest across loaders, layers, views) |
| Build all | `pnpm build` |
| Build Avivator only | `pnpm --filter=avivator build` |
| Dev server (Avivator) | `pnpm dev` (starts Vite on `localhost:5173`) |

### Non-obvious notes

- Tests use `jsdom` + `vitest-canvas-mock` to simulate browser/canvas. WebGL device creation logs `Failed to created device: Cannot read properties of null` to stderr — this is expected and does not indicate test failure.
- The `packages/extensions` package has a `prepare` lifecycle script that generates colormap code from `glsl-colormap`. This runs automatically during `pnpm install`.
- Avivator can load a sample image via URL query parameter: `http://localhost:5173/?image_url=https://viv-demo.storage.googleapis.com/LuCa-7color_Scan1.ome.tif`
- No `.nvmrc` or `.node-version` file exists; Node 22.x works fine.
