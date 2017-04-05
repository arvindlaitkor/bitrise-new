From node:6.9.5-alpine
MAINTAINER Arvind Rawat <arvindr226@gmail.com >
RUN apk update && apk add bash
WORKDIR /usr/src/app
VOLUME /usr/src/app
ADD . /usr/src/app
RUN npm install -g webpack-dev-server
RUN npm install 
RUN npm run build