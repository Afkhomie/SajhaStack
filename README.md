# SajhaStack

Nepal's developer community website — connecting builders through hackathons, meetups, workshops, and open source collaboration.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion |
| Auth | NextAuth.js v5 (Auth.js) |
| Icons | Lucide React |
| Fonts | Instrument Serif + Inter |

## Getting Started

### Prerequisites

- Node.js 20+ (`node --version`)
- pnpm (`npm install -g pnpm` if you don't have it)

### Local Development

```bash
# 1. Clone the repo
git clone https://github.com/sajhastack/sajhastack.git
cd sajhastack

# 2. Install dependencies
pnpm install

# 3. Set up environment variables
cp .env.example .env
# Edit .env with your OAuth credentials (see "Auth Setup" below)

# 4. Run dev server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Using Docker (recommended for consistency)

Docker ensures everyone runs the same environment — no "works on my machine" issues.

#### Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running (Windows/Mac)
- Or Docker Engine + Docker Compose on Linux:
  ```bash
  # Ubuntu/Debian
  sudo apt update && sudo apt install docker.io docker-compose-v2
  sudo usermod -aG docker $USER  # lets you run docker without sudo (re-login required)
  ```

#### Quick Start (Development)

```bash
# 1. Clone and enter the project
git clone https://github.com/sajhastack/sajhastack.git
cd sajhastack

# 2. Set up environment variables
cp .env.example .env
# Edit .env with your OAuth credentials

# 3. Start the dev container (with hot reload)
docker compose --profile dev up
```

Open [http://localhost:3000](http://localhost:3000). Edit any file and the browser auto-refreshes.

#### Quick Start (Production Preview)

```bash
# Build and start the optimized production image
docker compose up --build

# Or run in background (detached mode)
docker compose up -d --build
```

#### Common Docker Commands

| Command | What it does |
|---------|-------------|
| `docker compose --profile dev up` | Start dev server with hot reload |
| `docker compose up --build` | Build & start production image |
| `docker compose up -d --build` | Same as above, runs in background |
| `docker compose down` | Stop and remove containers |
| `docker compose down -v` | Stop and remove containers + volumes |
| `docker compose logs -f` | Stream container logs (Ctrl+C to exit) |
| `docker compose ps` | Show running containers |
| `docker compose exec dev sh` | Open a shell inside the dev container |
| `docker compose build --no-cache` | Full rebuild (useful if dependencies break) |

#### How It Works

```
┌─── Your Machine ────────────────────────────────────┐
│                                                      │
│  docker-compose.yml                                  │
│       │                                              │
│       ├── "dev" service (Dockerfile.dev)             │
│       │     • Mounts your local code into container  │
│       │     • Changes on disk → instant hot reload   │
│       │     • node_modules live inside container     │
│       │                                              │
│       └── "web" service (Dockerfile)                 │
│             • Multi-stage build (deps → build → run) │
│             • Produces a slim ~100MB production image │
│             • Runs as non-root user for security     │
│                                                      │
└──────────────────────────────────────────────────────┘
```

#### Key Files Explained

| File | Purpose |
|------|---------|
| `Dockerfile` | Production image — 3-stage build (install deps → build Next.js → slim runner). Output is standalone, no dev dependencies. |
| `Dockerfile.dev` | Development image — installs all deps, runs `pnpm dev` with file watching. Your local files are mounted in. |
| `docker-compose.yml` | Defines both services. The `dev` service uses a profile so it doesn't start by default. |
| `.dockerignore` | Keeps `node_modules`, `.next`, `.git`, and secrets out of the Docker build context for faster builds. |

#### Troubleshooting

| Problem | Solution |
|---------|----------|
| Port 3000 already in use | Stop whatever is using it: `lsof -i :3000` then kill the PID, or change the port in `docker-compose.yml` |
| Permission denied on Linux | Run `sudo usermod -aG docker $USER` then log out and back in |
| Dependencies not updating | Rebuild the image: `docker compose build --no-cache` |
| Hot reload not working (WSL2) | Make sure your code is on the Linux filesystem, not `/mnt/c/...` |
| `env_file: .env` error | You need a `.env` file — run `cp .env.example .env` |

#### Adding New Dependencies

When you add a new package, the dev container needs a rebuild:

```bash
# Stop the container
docker compose --profile dev down

# Rebuild and restart
docker compose --profile dev up --build
```

## Auth Setup

The app uses NextAuth.js with GitHub and Google sign-in.

### GitHub OAuth

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click "New OAuth App"
3. Set Homepage URL: `http://localhost:3000`
4. Set Authorization callback URL: `http://localhost:3000/api/auth/callback/github`
5. Copy Client ID and Client Secret to `.env`

### Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Create a new OAuth 2.0 Client ID
3. Add Authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
4. Copy Client ID and Client Secret to `.env`

### Auth Secret

Generate a secret for session encryption:

```bash
openssl rand -base64 32
```

Paste the output as `AUTH_SECRET` in your `.env` file.

## Project Structure

```
sajhastack/
├── app/
│   ├── (auth)/              # Auth pages (signin, signup)
│   ├── api/auth/            # NextAuth API route
│   ├── events/              # Events page
│   ├── about/               # About page
│   ├── join/                # Join page
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Home page
│   └── globals.css          # Design tokens & global styles
├── components/
│   ├── navbar.tsx           # Navigation bar
│   ├── footer.tsx           # Site footer
│   ├── hero.tsx             # Hero section (video background)
│   ├── particle-network.tsx # 3D particles (unused, available)
│   ├── event-card.tsx       # Event card + featured events
│   ├── stats-strip.tsx      # Community stats
│   ├── about-snippet.tsx    # Home page about section
│   ├── join-cta.tsx         # Home page CTA
│   ├── providers.tsx        # Session provider wrapper
│   └── section-heading.tsx  # Reusable heading component
├── lib/
│   ├── auth.ts              # NextAuth configuration
│   ├── constants.ts         # Site data (events, team, etc.)
│   └── utils.ts             # Utility functions
├── public/images/           # Static assets
├── Dockerfile               # Production Docker image
├── Dockerfile.dev           # Development Docker image
├── docker-compose.yml       # Container orchestration
└── package.json
```

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start dev server with Turbopack |
| `pnpm build` | Create production build |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |

## Contributing
pnpm dev

1. Fork the repo
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make your changes
4. Run `pnpm lint` to check for issues
5. Commit: `git commit -m "Add your feature"`
6. Push: `git push origin feature/your-feature`
7. Open a Pull Request

### Guidelines

- Follow existing code patterns and naming conventions
- Use TypeScript strict mode — no `any` types
- Components go in `components/`, utilities in `lib/`
- Use Tailwind CSS classes, not inline styles
- Keep components small and focused
- Test your changes on mobile and desktop before submitting

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `AUTH_SECRET` | Yes | Random string for session encryption |
| `AUTH_URL` | Yes | App URL (http://localhost:3000 for local) |
| `GITHUB_CLIENT_ID` | For GitHub auth | GitHub OAuth app client ID |
| `GITHUB_CLIENT_SECRET` | For GitHub auth | GitHub OAuth app client secret |
| `GOOGLE_CLIENT_ID` | For Google auth | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | For Google auth | Google OAuth client secret |

## Deployment

The app is ready to deploy on:

- **Vercel** (recommended): Connect your GitHub repo, it auto-deploys
- **Docker**: Use the production `Dockerfile` on any container host (Railway, Fly.io, AWS ECS)
- **Node.js**: `pnpm build && pnpm start` on any server with Node.js 20+
