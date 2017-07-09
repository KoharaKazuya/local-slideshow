FROM node:8.1.3-alpine AS client-build
LABEL maintainer="KoharaKazuya <reflect.results@gmail.com>"

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY ./local-slideshow-client/package.json ./local-slideshow-client/yarn.lock /usr/src/app/
RUN yarn install --production=false
COPY ./local-slideshow-client /usr/src/app
RUN yarn run build


FROM node:8.1.3-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ARG NODE_ENV="production"
ENV NODE_ENV $NODE_ENV
COPY ./local-slideshow-server/package.json ./local-slideshow-server/yarn.lock /usr/src/app/
RUN yarn install && yarn cache clean
COPY ./local-slideshow-server /usr/src/app
COPY --from=client-build /usr/src/app/dist /usr/src/app/public

CMD ["yarn", "start"]
