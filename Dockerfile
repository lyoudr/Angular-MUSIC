# stage 1 : build
FROM node:12-alpine AS build
WORKDIR /music_web
COPY package.json package-lock.json /music_web/
RUN npm install
COPY . /music_web/
RUN npm run build --prod

# stage 2 : run
FROM nginx
COPY --from=build /music_web/dist/music /tmp/frontend
EXPOSE 80
