FROM node:24-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund
FROM deps AS build
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build
FROM node:24-alpine AS web
WORKDIR /app
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 HOSTNAME=0.0.0.0 PORT=3000
RUN addgroup -S lottus && adduser -S lottus -G lottus
COPY --from=build --chown=lottus:lottus /app/.next/standalone ./
COPY --from=build --chown=lottus:lottus /app/.next/static ./.next/static
COPY --from=build --chown=lottus:lottus /app/public ./public
USER lottus
EXPOSE 3000
CMD ["node","server.js"]
FROM build AS worker
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1
USER node
CMD ["node","--import","tsx","scripts/worker.ts"]
