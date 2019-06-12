FROM node:11
MAINTAINER Peder Smith <smithpeder@gmail.com>

WORKDIR /app

EXPOSE 3000 8000

COPY . /app
RUN yarn install

CMD ["yarn", "start"]
