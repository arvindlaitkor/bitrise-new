From node:6.9.5-alpine
MAINTAINER Arvind Rawat <arvindr226@gmail.com >
RUN apk update && apk add bash
WORKDIR /usr/src/app
VOLUME /usr/src/app