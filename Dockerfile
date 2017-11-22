FROM node:8.6.0-alpine

ENV APP_SRC /usr/src/app

RUN mkdir -p $APP_SRC
WORKDIR $APP_SRC

COPY package.json yarn.lock ./
RUN yarn

ARG APP_TAG
ENV APP_TAG=$APP_TAG

COPY . .
RUN yarn link

CMD [ "docker-helper" ]
