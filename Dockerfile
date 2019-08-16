FROM ebiwd/node-bower-gulp:6 as builder

WORKDIR /tmp

COPY . /tmp

RUN npm install --quiet && \
	bower --allow-root install --quiet && \
	npm run build

FROM nginx:1.17.2-alpine

COPY docker-assets/nginx.conf /etc/nginx/nginx.conf
COPY docker-assets/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /tmp/dist /usr/share/nginx/html/style-lab
