FROM node:alpine

# Specifies that we need to expose this port when running the container e.g docker run -p 3000:3000.
EXPOSE 3000

WORKDIR /usr/src/app

COPY package.json /usr/src/app
COPY package-lock.json /usr/src/app

RUN npm install

COPY / /usr/src/app/

ARG CONTENTFUL_SPACE_ID_ARG
ARG CONTENTFUL_ACCESS_TOKEN_ARG

ENV CONTENTFUL_SPACE_ID=$CONTENTFUL_SPACE_ID_ARG
ENV CONTENTFUL_ACCESS_TOKEN=$CONTENTFUL_ACCESS_TOKEN_ARG

RUN npm run build

CMD npm run start
