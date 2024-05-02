# stage 1
FROM node:20.9-alpine AS builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

#stage 2
FROM nginx:latest
ARG GIT_SHORTHASH=N/A
ENV GIT_SHORTHASH=$GIT_SHORTHASH

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder --chown=nginx /usr/src/app/dist/exat-ewallet-fe/browser /usr/share/nginx/html
COPY --from=builder --chown=nginx --chmod=740 /usr/src/app/set_env.sh /tmp/
CMD ["/bin/sh",  "-c", "/tmp/set_env.sh"]

# EXPOSE 80

# CMD ["nginx", "-g", "daemon off;"]