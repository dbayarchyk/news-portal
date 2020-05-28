FROM node:alpine

# Specifies that we need to expose this port when running the container e.g docker run -p 3000:3000.
EXPOSE 3000

WORKDIR /usr/src/app

COPY package.json /usr/src/app
COPY package-lock.json /usr/src/app

RUN npm install

COPY / /usr/src/app/

CMD npm run build && npm run start
