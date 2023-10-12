FROM node:12-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 9000

ENV dburl=mongodb://mymongo:27017/meeting_app

CMD [ "npm", "start" ]