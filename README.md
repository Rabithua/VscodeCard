# VscodeCard

A React/TypeScript application that renders customizable VS Code–style cards with a live GitHub contributions heatmap.  
Built with Vite, Tailwind CSS, Jotai for state, SWR for data fetching, and Lucide icons.

## Features

- Frontend and backend card designs mimicking VS Code UI
- Editable file name, code snippets and status via inline inputs
- GitHub contributions heatmap (default 105 days) using GraphQL & SWR
- Customizable username, date range & appearance via props and global state
- Responsive layout and smooth loading animation (pulsing blocks)

## Demo

![Backend Card](./screenshot/CardBackend.svg) | ![Frontend Card](./screenshot/CardFrontend.svg)
--- | ---

## Getting Started

### Prerequisites

- Node.js v16+
- GitHub Personal Access Token with `read:user` and `repo` scope (for private data if needed)

### Installation

```bash
git clone https://github.com/rabithua/VscodeCard.git
cd VscodeCard
npm install
```

### Environment Variables

Create a `.env` or configure Vite env in your shell:

```bash
# .env
VITE_PUBLIC_GITHUB_TOKEN=your_token_here
```

### Available Scripts

```bash
npm run dev      # start development server
npm run build    # build for production
npm run preview  # preview production build
```

Open http://localhost:3000 in your browser.

## Usage

- Edit card properties in the sidebar or directly on the card (file name, code keys/values, motto).
- The heatmap fetches contributions for the given username (default “rabithua”).
- Override defaults by passing props to `<RenderHeatMap username="user" days={90} toDate={new Date()} />`.

## Project Structure

- `app/components/Card.tsx` — combines frontend & backend card
- `app/components/HeatMap.tsx` — heatmap component using SWR & GitHub GraphQL
- `app/components/NoStyleInput.tsx` — unstyled input for inline editing
- `atom/card.ts` — Jotai atoms for props and UI state
- `README.md` — this file

## Customization

- **Theme & styles**: Tailwind CSS config in `tailwind.config.js`
- **Icons**: swap Lucide components in `Card.tsx`
- **State management**: add new atoms for extra settings

## License

MIT © rabithua
