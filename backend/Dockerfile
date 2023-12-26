FROM node:lts-buster
LABEL author GyuJeong Kim <tbtbtb156@naver.com>

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 4000
CMD npm run start

