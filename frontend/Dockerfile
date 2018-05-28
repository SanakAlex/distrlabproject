#FROM node:8.9-alpine as angular-built
#WORKDIR /usr/src/app
#RUN npm i -g @angular/cli
#COPY package.json package.json
#RUN npm install --silent
#COPY . .
#RUN ng build --prod --build-optimizer
#
#LABEL author="Lopukhovych"
#
#EXPOSE 80 443

FROM nginx:alpine

COPY nginx.conf nginx.conf

WORKDIR /usr/share/nginx/html

COPY static/ .
