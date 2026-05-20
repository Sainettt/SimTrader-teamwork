FROM node:22-slim

WORKDIR /app

# Prisma needs OpenSSL on slim images
RUN apt-get update && apt-get install -y --no-install-recommends openssl ca-certificates \
  && rm -rf /var/lib/apt/lists/*

COPY package.json package-lock.json ./
COPY prisma ./prisma/

RUN npm ci
RUN npx prisma generate

COPY . .

RUN npm run build

ENTRYPOINT ["/bin/sh", "-c", "npx prisma migrate deploy && npm start"]
