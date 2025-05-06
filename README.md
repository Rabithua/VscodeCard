# VscodeCard

A React/TypeScript application that renders customizable VS Code–style cards with a live GitHub contributions heatmap.  
Built with Vite, Tailwind CSS, Jotai for state, SWR for data fetching, and Lucide icons.

## Features

- Frontend and backend card designs mimicking VS Code UI
- Editable file name, code snippets and status via inline inputs
- GitHub contributions heatmap (default 182 days) using GraphQL & SWR
- Customizable username, date range & appearance via props and global state
- Responsive layout and smooth loading animation (pulsing blocks)
- Auto fetch Github heatMap when fileName is change

## Demo

| ![Backend Card](./screenshot/CardBackend.svg) | ![Frontend Card](./screenshot/CardFrontend.svg) |
| --------------------------------------------- | ----------------------------------------------- |

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

```
VITE_PUBLIC_GITHUB_TOKEN=your_token_here
```

![About Github personal Access Token](https://docs.github.com/zh/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens)

> **Warning**: If you set `VITE_PUBLIC_GITHUB_TOKEN`, anyone who can access your web application can view your token. Ensure you handle it securely.

### Available Scripts

```bash
npm run dev      # Start the development server
npm run build    # Build the application for production
npm run start    # Preview the production build
npm run check    # Perform code checks
```

```bash
npm run dev      # start development server
npm run build    # build for production
npm run start    # preview production build
npm run check    # code check
```

Open http://localhost:3000 in your browser.

## Project Structure

- `app/components/Card.tsx` — combines frontend & backend card
- `app/components/HeatMap.tsx` — heatmap component using SWR & GitHub GraphQL
- `app/components/NoStyleInput.tsx` — unstyled input for inline editing
- `atom/card.ts` — Jotai atoms for props and UI state
- `README.md` — this file

## License

MIT © rabithua
