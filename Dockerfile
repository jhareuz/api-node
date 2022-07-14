FROM node:11.10.0
ENV MONGODB_URI 'mongodb://127.0.0.1:27017'
ENV REDISCLOUD_URL 'redis://127.0.0.1:6379'
ENV REDIS_RATELIMIT_URL 'redis://127.0.0.1:6379'
ENV PATH_LOGGER './logs'
ENV FILE_LOGGER 'application.log'
ENV EXCLUDE_LOGGER 'ping'
ENV LOG_LEVEL 'info'
ENV NODE_ENV 'production'
ENV PORT_AUTH 4010
ENV MS_NAME 'api-node'
ARG NPM_TOKEN

WORKDIR /ms-auth

ADD . /ms-auth

RUN npm install
RUN npm run clean
RUN npm run build

EXPOSE 4010

CMD ["npm","start"]