# stage 1
FROM node:20.9-alpine AS builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

#stage 2
FROM nginx:latest
FROM nginx:latest
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder --chown=nginx /usr/src/app/dist/exat-ewallet-fe/browser /usr/share/nginx/html
COPY --from=builder /usr/src/app/set_env.sh /tmp/

# EXPOSE 80

# CMD ["nginx", "-g", "daemon off;"]