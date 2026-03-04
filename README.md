# FickleFlight

FickleFlight is a React 19 + TypeScript single-page app styled with Material UI for browsing flight and hotel options.

## Prerequisites
- Node.js 20 or newer
- npm (included with Node)

## Getting started
```bash
npm install
npm start
```
Then open http://localhost:3000 to view the app.

## Scripts
- `npm start` - Start the development server with live reload.
- `npm test -- --watch=false --passWithNoTests` - Run the test suite. The current project has no tests, so the flag exits cleanly.
- `npm run build` - Create a production build in the `build/` directory.
- `npm run eject` - Eject from Create React App (not reversible).

## Project layout
- `src/App.tsx` - App entry and routing.
- `src/components/` - Shared UI components such as `PortalPopup`.
- `public/` - Static assets and the HTML template.
