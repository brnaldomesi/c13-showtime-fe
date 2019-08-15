# Build environment
FROM node:12-alpine as base
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/package.json
RUN npm install

# Dev environment
FROM base as dev
CMD ["npm", "start"]

# Deployment builder
FROM base as builder
ARG BUILD_ENV=prod
COPY . /app
COPY config/env.$BUILD_ENV /app/.env
RUN npm run build

# Nginx server
FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY config/nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
