FROM node:14-alpine

WORKDIR /app/server

COPY ./package*.json ./

RUN npm install

COPY . . 

EXPOSE 8088

CMD ["node","server.js"]