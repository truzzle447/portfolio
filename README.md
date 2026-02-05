# Signal Portfolio

Minimal React + Vite portfolio focused on calm, usable interfaces.

## Local Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## GitHub Pages Deployment

This repo includes a GitHub Actions workflow that builds and deploys the site
to the `gh-pages` branch whenever you push to `main`. The workflow sets
`BASE_PATH` automatically based on whether the repo is a project site
(`/<repo>/`) or a user/organization site (`/`).

1. **Enable GitHub Pages** in your repo settings:
   - Settings → Pages → Build and deployment → Source: **Deploy from a branch**.
   - Branch: `gh-pages` and folder `/ (root)`.
2. Push to `main` (or run the workflow manually). GitHub Pages will publish the
   `gh-pages` branch after the workflow completes.

If you prefer manual deployment:

```bash
npm run build
```

If you build locally for manual deployment, set `BASE_PATH` to match your repo:

```bash
BASE_PATH=/portfolio/ npm run build
```

Deploy the `dist` folder to GitHub Pages by pushing it to the `gh-pages` branch,
and set Pages to deploy from that branch.
