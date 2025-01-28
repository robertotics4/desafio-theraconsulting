FROM node:20

ENV DATABASE_URL=postgres://thera_user:thera_password@postgres:5432/postgres_thera
ENV SERVER_PORT=3000
ENV JWT_HASH_MD5=5ef41c09829700e022099de37b96bff8

WORKDIR /app
COPY prisma ./prisma
COPY package.json .
COPY . .

RUN yarn install
RUN yarn build
RUN yarn prisma generate

EXPOSE 3000
