FROM node:20-alpine as base

FROM base as deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json yarn.lock ./

RUN \
    if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
    else echo "Warning: Lockfile not found." && yarn install; \
    fi

FROM base as builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY public ./public
COPY src ./src
COPY next.config.mjs tsconfig.json tailwind.config.ts postcss.config.js package.json ./

# Disable telemetry for Next.js
ENV NEXT_TELEMETRY_DISABLED 1

# Environment variables must be present at build time
RUN --mount=type=secret,id=SENDGRID_API_KEY \
    --mount=type=secret,id=EMAIL_TO_EN \
    --mount=type=secret,id=EMAIL_TO_VN \
    --mount=type=secret,id=EMAIL_FROM \
    export SENDGRID_API_KEY=$(cat /run/secrets/SENDGRID_API_KEY) && \
    export EMAIL_TO_EN=$(cat /run/secrets/EMAIL_TO_EN) && \
    export EMAIL_TO_VN=$(cat /run/secrets/EMAIL_TO_VN) && \
    export EMAIL_FROM=$(cat /run/secrets/EMAIL_FROM) && \
    export API_URL=$(cat /run/secrets/API_URL) && \
    yarn run build

FROM base as runner

WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

EXPOSE 3000

ENV PORT 3000
    
CMD HOSTNAME="0.0.0.0" node server.js
