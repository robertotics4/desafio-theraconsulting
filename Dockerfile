FROM node:20-alpine

# Instalar OpenSSL e outras dependências do prisma
RUN apk add --no-cache \
  openssl \
  libc6-compat \
  bash

WORKDIR /app
COPY prisma ./prisma
COPY dist .
COPY package.json .
COPY yarn.lock .

ENV DATABASE_URL=postgres://thera_user:thera_password@postgres:5432/postgres_thera
ENV SERVER_PORT=3000
ENV JWT_HASH_MD5=5ef41c09829700e022099de37b96bff8

RUN yarn install
RUN yarn prisma generate

EXPOSE 3000
