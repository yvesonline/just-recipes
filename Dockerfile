FROM node:14-stretch AS builder

WORKDIR /app

RUN npm install -g gatsby-cli

COPY . ./

ENV NODE_OPTIONS=--max_old_space_size=4096

RUN npm install

RUN gatsby build

FROM nginx:1.18-alpine

COPY --from=builder /app/public /usr/share/nginx/html