# syntax=docker/dockerfile:1
FROM node:18-alpine
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --production
RUN yarn run build
COPY . .
RUN yarn run start
CMD ["node", "dist/index.js"]