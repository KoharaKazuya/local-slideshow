FROM node:4.5
MAINTAINER KoharaKazuya <reflect.results@gmail.com>

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ARG NODE_ENV="production"
ENV NODE_ENV $NODE_ENV
COPY ./local-slideshow-server/package.json /usr/src/app/
RUN npm install
COPY ./local-slideshow-server /usr/src/app
COPY ./local-slideshow-client/dist /usr/src/app/public

CMD ["npm", "start"]
