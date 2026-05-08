# Pet Gallery

A responsive React + TypeScript application for browsing, searching, sorting, selecting, and downloading pet images.

## Features

- Gallery view with responsive 1/2/4 column layout
- Search by title or description
- Sort by name and created date
- Pagination (12 items per page)
- Multi-select with persistent selection in localStorage
- Download selected items (single image or ZIP archive)
- Detail page for each pet
- About page with feature and stack overview
- Mock-data fallback when API endpoints are unavailable

## Tech Stack

- React 19
- TypeScript
- Vite
- styled-components
- react-router-dom
- JSZip + file-saver

## Project Structure

- `src/pages/Gallery/GalleryPage.tsx`: Listing, filtering, sorting, pagination orchestration
- `src/pages/Detail/DetailPage.tsx`: Single-pet detail view
- `src/components/Card/PetCard.tsx`: Selectable gallery card
- `src/components/Toolbar/Toolbar.tsx`: Select all/clear/download actions
- `src/context/SelectionContext.tsx`: Selection state + persistence
- `src/hooks/useData.ts`: Reusable async data loader hook
- `src/services/api.ts`: API layer with mock fallback
- `src/services/mockData.ts`: Local seed dataset

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start dev server:

   ```bash
   npm run dev
   ```

3. Build for production:

   ```bash
   npm run build
   ```

4. Preview production build:

   ```bash
   npm run preview
   ```

5. Run lint checks:

   ```bash
   npm run lint
   ```

## API Notes

The app currently requests:

- `GET /pets`
- `GET /pets/:id`

If these endpoints are unavailable, it falls back to local mock data in development.
