FROM node:alpine AS base
WORKDIR /base
COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY . .

FROM base AS quality
RUN npm run lint
ENV CI=true
RUN npm run test

FROM base AS build
ENV NODE_ENV=production
WORKDIR /build
COPY --from=base /base ./
ARG CONTENTFUL_SPACE_ID_ARG
ARG CONTENTFUL_ACCESS_TOKEN_ARG
ARG NEXT_PUBLIC_API_URL_ARG
ENV CONTENTFUL_SPACE_ID=$CONTENTFUL_SPACE_ID_ARG
ENV CONTENTFUL_ACCESS_TOKEN=$CONTENTFUL_ACCESS_TOKEN_ARG
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL_ARG
RUN npm run build

FROM node:alpine AS production
ENV NODE_ENV=production
WORKDIR /app
COPY --from=build /build/package.json ./
COPY --from=build /build/package-lock.json ./
COPY --from=build /build/.next ./.next
COPY --from=build /build/public ./public
RUN npm install next

EXPOSE 3000
CMD npm run start
