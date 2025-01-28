FROM nginxinc/nginx-unprivileged:1.27-alpine

COPY docker-assets/default.conf /etc/nginx/conf.d/default.conf
COPY . /usr/share/nginx/html

USER 101
