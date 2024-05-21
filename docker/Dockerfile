FROM node:22.2-alpine3.19 AS builder

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./
COPY tsconfig.json ./

RUN npm install

COPY public public
COPY src src
COPY nginx nginx
COPY .env .env

RUN npm run build

FROM nginx:stable-alpine
# Copying built assets from builder
COPY --from=builder /app/build /usr/share/nginx/html
# Copying our nginx.conf
COPY --from=builder /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
