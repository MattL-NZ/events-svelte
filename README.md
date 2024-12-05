# SvelteKit Full-Stack Playground

A modern full-stack playground project built with SvelteKit, exploring the latest features of Svelte 5 and cutting-edge web technologies.

## Tech Stack

### Frontend
- **Svelte 5** - Latest version with runes ($state, $derived)
- **SvelteKit** - Application framework with server-side rendering
- **Tailwind CSS** - Utility-first styling
- **shadcn-svelte** - Accessible component system
- **Lucide Icons** - Beautiful icon system

### Backend & Database
- **Drizzle ORM** - Type-safe SQL toolkit
- **SQLite** - File-based database
- **SvelteKit API Routes** - Backend API implementation

### Development
- **TypeScript** - Type safety across the stack
- **Vite** - Build tool and dev server
- **Vitest** - Unit testing framework
- **Playwright** - End-to-end testing

## Getting Started

1. Clone the repository
```
git clone <repository-url>
```
2. Install dependencies
```
npm install
```
3. Set up your environment variables
```
cp .env.example .env
```
4. Initialize the database
```
npm run db:push
```
5. Start the development server
```
npm run dev
```

## Development Commands
- To open the Drizzle studio `bun run drizzle-kit studio`
- To run vitest tests `bun run test` or `bun run test:ui`
- Playwright tests coming soon...
