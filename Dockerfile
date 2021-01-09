# stage 1 : build
FROM node:12-alpine AS build
WORKDIR /music_web
COPY package.json package-lock.json /music_web/
RUN npm install
RUN npm install -g @angular/cli
COPY . /music_web/
RUN ng build --prod

# stage 2 : run
FROM nginx
COPY --from=build /music_web/dist/music /tmp/frontend
EXPOSE 80
