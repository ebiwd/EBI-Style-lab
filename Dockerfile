FROM node:8 as builder

RUN npm install -g bower gulp 

WORKDIR /tmp

COPY . /tmp

RUN npm install --quiet && \
	bower --allow-root install --quiet && \
	npm run build

FROM nginxinc/nginx-unprivileged:1.16.0-alpine

COPY docker-assets/default.conf /etc/nginx/conf.d/default.conf
COPY web/index.html /usr/share/nginx/html/index.html
COPY --from=builder /tmp/dist /usr/share/nginx/html/style-lab

USER 101
