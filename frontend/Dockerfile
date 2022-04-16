FROM node:16.14-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN yarn install
COPY ./ .
RUN yarn build

FROM nginx:1.21.6-alpine as production-stage
RUN mkdir /app
COPY --from=build-stage /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf