# ── Strategaize Project Cockpit — Production Dockerfile ──────────────────
# Multi-stage build for minimal image size.
# Build context: repository root (not app/)
# Production port: 3000 (Next.js default, Coolify maps to 443)

# ── Stage 1: Dependencies ────────────────────────────────────────────────
FROM node:22-alpine AS deps
WORKDIR /app

COPY app/package.json app/package-lock.json ./
RUN npm ci --omit=dev

# ── Stage 2: Build ───────────────────────────────────────────────────────
FROM node:22-alpine AS builder
WORKDIR /app

COPY app/package.json app/package-lock.json ./
RUN npm ci

# Copy app source
COPY app/ ./

# Build Next.js
RUN npm run build

# ── Stage 3: Production ──────────────────────────────────────────────────
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Create non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy built app
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# Copy project config (can be overridden via volume mount)
COPY app/projects.config.json ./projects.config.json

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]
