FROM alpine as errorpages

WORKDIR /tmp

RUN wget -O 403.html https://www.ebi.ac.uk/errorpages/403.html && \
    wget -O 404.html https://www.ebi.ac.uk/errorpages/404.html && \
    wget -O 500.html https://www.ebi.ac.uk/errorpages/500.html

FROM node:8 as builder

RUN npm install -g bower gulp

WORKDIR /tmp

COPY . /tmp

RUN npm install --quiet && \
	bower --allow-root install --quiet && \
	npm run build

FROM nginxinc/nginx-unprivileged:1.27-alpine

COPY docker-assets/default.conf /etc/nginx/conf.d/default.conf
COPY web/index.html /usr/share/nginx/html/index.html
COPY --from=errorpages /tmp /usr/share/nginx/html/errorpages
COPY --from=builder /tmp/dist /usr/share/nginx/html/style-lab

USER 101
