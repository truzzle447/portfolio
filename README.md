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

1. Update `base` in `vite.config.js` to match your repo name.
2. Push to `main` — GitHub Actions will build and deploy automatically.

If you prefer manual deployment:

```bash
npm run build
```

3. Deploy the `dist` folder to GitHub Pages.
   - Option A: Push `dist` to a `gh-pages` branch.
   - Option B: Use a GitHub Actions workflow that uploads `dist`.

GitHub Pages should be configured to serve from the `gh-pages` branch (or the
workflow output) once deployment is complete.
