FROM node:16.14-alpine
WORKDIR /usr/app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build
EXPOSE 8888
CMD ["npm", "start"]