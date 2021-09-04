FROM docker.io/library/node:12.22.1-alpine3.12 as builder
WORKDIR /usr/src/app
COPY . .
RUN npm install
RUN npm run build

FROM docker.io/nginxinc/nginx-unprivileged:1.20-alpine
ADD conf/nginx-default.conf /etc/nginx/conf.d/default.conf
WORKDIR /usr/share/nginx/html
COPY --from=builder /usr/src/app/dist .
EXPOSE 8080
USER 65535:65535
