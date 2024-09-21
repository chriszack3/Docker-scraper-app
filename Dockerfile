# syntax=docker/dockerfile:1
FROM czack3/playwright:latest
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --production
COPY . .
CMD ["node", "dist/index.js"]