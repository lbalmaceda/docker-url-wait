FROM node:8-alpine

WORKDIR /app

ADD . /app
RUN npm install

ENTRYPOINT ["node", "url-wait.js"]