FROM node:16.16.0

WORKDIR /usr/src/app

COPY . ./

RUN yarn

EXPOSE 1234

CMD ["yarn", "dev"]