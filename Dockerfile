FROM node:8.5
MAINTAINER Chad Miller <chadtmiller15@gmail.com>

RUN mkdir /app
WORKDIR /app
COPY package.json /app
RUN npm install --production
COPY . /app

ENV PORT 9000
EXPOSE $PORT

CMD ["npm", "run", "start:prod"]