FROM node:alpine AS base
WORKDIR /base
COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY . .

FROM base AS build
ENV NODE_ENV=production
WORKDIR /build
COPY --from=base /base ./
RUN npm run build

FROM node:alpine AS production
ENV NODE_ENV=production
WORKDIR /app
COPY --from=build /build/package.json ./
COPY --from=build /build/package-lock.json ./
COPY --from=build /build/build ./build
RUN npm install --only=production

EXPOSE 8000
CMD npm run start
