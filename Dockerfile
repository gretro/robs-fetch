FROM node:6.10.1-alpine

WORKDIR /robs-fetch
COPY . .

RUN npm install

CMD npm run build