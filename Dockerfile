FROM node:8

WORKDIR /app

ADD . /app
RUN npm install

ENTRYPOINT ["node", "url-wait.js"]