# [CineHub](https://cinehub.kreosteel.dev)

**A movie and TV discovery app — trending titles, search, and rich detail pages powered by TMDB.**

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js) ![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black) ![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white) ![TanStack Query](https://img.shields.io/badge/TanStack_Query-5-FF4154?logo=reactquery&logoColor=white) ![TMDB](https://img.shields.io/badge/TMDB-API-01B4E4?logo=themoviedatabase&logoColor=white)

---

## About

[CineHub](https://cinehub.kreosteel.dev) is a movie and TV discovery app. The home page surfaces what's trending today and this week, the Movies page lets you page through popular titles, and every title gets a detail page with cast, crew, facts, and similar recommendations. TV shows also get a season and episode browser. All data comes from [TMDB](https://www.themoviedb.org/).

Pages render on the server, and a thin layer of internal API routes keeps the TMDB API key off the client for search, similar titles, and season data.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Routes](#routes)
- [How It Works](#how-it-works)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the App](#running-the-app)
- [Available Scripts](#available-scripts)
- [TMDB Integration](#tmdb-integration)

## Features

- **Discover page** — hero carousel of today's top trending titles, plus tabs for trending this week and popular TV shows
- **Movies page** — popular movies grid with URL-based pagination (`?page=N`, capped at TMDB's 500-page limit)
- **Movie & TV detail pages** — backdrop, poster, tagline, rating, genres, overview, cast, directors/creators, production companies, and a facts sidebar (dates, budget/revenue, languages, countries)
- **Season & episode browser** — TV pages list seasons in an accordion and fetch episodes only when a season is opened
- **Similar titles** — a "More like this" carousel on every detail page
- **Search** — debounced search-as-you-type suggestions across movies and TV (people excluded)
- **Server-first data fetching** — pages render on the server;
- **Validation** — env vars, TMDB responses, and route inputs are checked with Zod
- **Loading & error states** — route-level skeletons and an error boundary with retry
- **Animation** — GSAP scroll-in effects on carousels and cards

## Tech Stack

| Layer                  | Technology                                                                                                      |
| ---------------------- | --------------------------------------------------------------------------------------------------------------- |
| Framework              | [Next.js 16](https://nextjs.org/) (App Router)                                                                  |
| UI                     | [React 19](https://react.dev/), [Tailwind CSS 4](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/) |
| Language               | TypeScript (strict mode)                                                                                        |
| Data fetching (client) | [TanStack Query 5](https://tanstack.com/query)                                                                  |
| Validation             | [Zod 4](https://zod.dev/)                                                                                       |
| Carousels              | [react-slick](https://github.com/akiran/react-slick)                                                            |
| Animation              | [GSAP](https://gsap.com/)                                                                                       |
| Theming                | [next-themes](https://github.com/pacocoursey/next-themes)                                                       |
| Icons & dates          | [Lucide](https://lucide.dev/), [date-fns](https://date-fns.org/)                                                |
| Data source            | [TMDB API](https://developer.themoviedb.org/docs) (v3)                                                          |
| Tooling                | pnpm, ESLint, Prettier                                                                                          |

## Project Structure

```
cinehub/
├── app/
│   ├── (app)/
│   │   ├── (discover)/           # "/" — page + loading skeleton
│   │   ├── movies/               # "/movies"
│   │   ├── (mediaDetails)/       # "/movie/[id]" and "/tv/[id]"
│   │   ├── api/                  # search, similar, seasonDetails proxies
│   │   ├── providers/            # React Query provider + devtools
│   │   └── error.tsx             # Route error boundary
│   ├── pages/                    # Page compositions (Movies, MovieDetails, TVshowDetails)
│   ├── elements/                 # Presentational blocks: cards, tabs, skeletons, empty states
│   ├── entities/media/           # TMDB client, Zod schemas, mappers, queryOptions
│   ├── features/SearchBar/       # Search UI + API client + queryOptions
│   ├── shared/                   # ui, shadcn-ui wrappers, helpers, GSAP setup, env validation
│   ├── widgets/Header.tsx        # Sticky header: nav, search, avatar
│   └── types/                    # App and TMDB types
├── configs/components.json       # shadcn/ui config
├── lib/utils.ts                  # cn() class helper
├── public/                       # Fallback poster image
└── next.config.ts                # TMDB image allow-list
```

## Routes

| Route                                   | Description                                                                              |
| --------------------------------------- | ---------------------------------------------------------------------------------------- |
| `/`                                     | Discover — hero carousel of trending titles + tabs (trending this week, popular TV)      |
| `/movies?page=N`                        | Popular movies with URL-driven pagination                                                |
| `/movie/[id]`                           | Movie details                                                                            |
| `/tv/[id]`                              | TV show details with season and episode browser                                          |
| `/api/search?query=`                    | Search proxy — up to 8 results, people excluded                                          |
| `/api/similar/[mediaType]/[id]`         | Similar titles proxy                                                                     |
| `/api/seasonDetails/[id]?seasonNumber=` | Season episodes proxy                                                                    |

## How It Works

The `app/` directory is layered, and each layer only depends on the ones to its right:

```
routes / pages  →  features / elements / widgets  →  entities  →  shared + types
```

- **Server Components** load initial data straight from TMDB (`entities/media/api`) and map it into app types (`Media`, `Movie`, `TVShow`).
- **Client Components** handle interactivity: search, carousels, tabs, accordions, and pagination.
- **Internal API routes** proxy TMDB for client-side queries, so `API_KEY` stays on the server. Client fetching goes through React Query `queryOptions`.
- **Mapping layer** converts TMDB's `snake_case` payloads into `camelCase` app types at the boundary, so components never see raw TMDB shapes.
- **Validation** — API routes return `400` for bad input and `502` when TMDB fails or responds unexpectedly. An invalid `?page=` falls back to page 1.

## Getting Started

### Prerequisites

- **Node.js** (current LTS)
- **pnpm**
- A **TMDB API key** (v3) — create a free account at [themoviedb.org](https://www.themoviedb.org/), then go to Settings → API

### Installation

```
git clone https://github.com/KreoSteel/cinehub.git
cd cinehub
pnpm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```
NEXT_PUBLIC_API_URL=https://api.themoviedb.org/3/
NEXT_PUBLIC_IMAGES_BASE_URL=https://image.tmdb.org/t/p/
API_KEY=your-tmdb-v3-api-key
```

Both URLs must end with a trailing `/`. Env vars are validated with Zod at startup, so a missing or invalid value fails fast with a readable error. Restart the dev server after changing them.

### Running the App

```
pnpm dev
```

Open <http://localhost:3000>.

## Available Scripts

| Script           | Command             | Description                            |
| ---------------- | ------------------- | -------------------------------------- |
| `pnpm dev`       | `next dev`          | Start the local dev server             |
| `pnpm build`     | `next build`        | Create a production build              |
| `pnpm start`     | `next start`        | Run the production build               |
| `pnpm lint`      | `eslint`            | Lint the codebase                      |
| `pnpm typecheck` | `npx tsc --noEmit`  | Type-check without emitting output     |

## TMDB Integration

CineHub authenticates with a TMDB v3 API key sent as a query parameter. Images load from TMDB's CDN through `next/image` (the TMDB host is allow-listed in `next.config.ts`), with a local fallback poster when an image is missing.

| Feature         | TMDB endpoint                                  |
| --------------- | ---------------------------------------------- |
| Popular movies  | `movie/popular`                                |
| Trending        | `trending/{all,tv,movie}/{day,week}`           |
| Popular TV      | `discover/tv`                                  |
| Movie details   | `movie/{id}` + `movie/{id}/credits`            |
| TV details      | `tv/{id}` + `tv/{id}/aggregate_credits`        |
| Genres          | `genre/movie/list` + `genre/tv/list`           |
| Search          | `search/multi`                                 |
| Similar titles  | `{movie,tv}/{id}/similar`                      |
| Season episodes | `tv/{id}/season/{n}`                           |

**Caching:** server-side TMDB fetches are cached for 30 minutes (`force-cache` with `revalidate: 1800`). Genre lists are cached separately and de-duplicated per request with React's `cache()`. Client-side queries are cached by React Query.
