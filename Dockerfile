FROM node:14-alpine

WORKDIR /app

COPY package*.json yarn.lock ./

RUN yarn

COPY . .

RUN npx tsc

CMD ["node", "bin/www"]

EXPOSE 5000

