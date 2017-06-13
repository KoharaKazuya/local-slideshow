FROM node:6
MAINTAINER KoharaKazuya <reflect.results@gmail.com>

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ARG NODE_ENV="production"
ENV NODE_ENV $NODE_ENV
COPY ./local-slideshow-server/package.json /usr/src/app/
COPY ./local-slideshow-server/yarn.lock /usr/src/app/
RUN yarn install && yarn cache clean
COPY ./local-slideshow-server /usr/src/app

COPY ./local-slideshow-client /usr/src/client-build
RUN cd /usr/src/client-build \
 && yarn install --production=false \
 && yarn run build \
 && yarn cache clean \
 && mv /usr/src/client-build/dist /usr/src/app/public \
 && rm -rf /usr/src/client-build

CMD ["yarn", "start"]
