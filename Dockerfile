# syntax=docker/dockerfile:1
FROM mcr.microsoft.com/playwright:v1.47.2-noble
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --production
COPY . .
CMD ["node", "dist/index.js"]