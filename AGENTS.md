# Repository Guidelines

## Project Structure & Module Organization
- `index.html` and `about.html` are the entry pages.
- `scripts/` holds browser logic (`main.js`) plus small Go utilities (`server.go`, `generate-prayers.go`).
- `styles/` contains the two themes (`stylized.css`, `basic.css`).
- `data/` stores content assets like `prayers.json` and `background.webp`.

## Build, Test, and Development Commands
- `go run scripts/server.go`
  - Starts a simple static file server on `http://localhost:8000` with no-cache headers.
- `cd data && go run ../scripts/generate-prayers.go`
  - Regenerates `data/prayers.json` with placeholder prayers (writes to the current directory).
- There is no build step; this is a static HTML/CSS/JS project.

## Coding Style & Naming Conventions
- HTML/CSS/JS use 2-space indentation and a clean, readable structure.
- Go files are `gofmt`-formatted (tabs, standard Go conventions).
- Filenames are lowercase with hyphens where needed (e.g., `generate-prayers.go`).

## Testing Guidelines
- No automated test framework is currently used.
- Manual checks to run before PRs:
  - Load `index.html` via the local server.
  - Verify time toggle and view toggle behavior.
  - Confirm `data/prayers.json` loads and renders a prayer.

## Commit & Pull Request Guidelines
- Commit messages are short, descriptive summaries, sometimes with a scope prefix (e.g., `basic.css: make first gemma3 changes`).
- PRs should include:
  - A brief description of the user-facing change.
  - Screenshots for any UI updates.
  - Notes on how to verify the change locally.

## Configuration & Content Notes
- Prayers are data-driven via `data/prayers.json`. If you change its shape, update `scripts/main.js` accordingly.
- Keep asset paths relative to the repo root so the static server can resolve them correctly.
