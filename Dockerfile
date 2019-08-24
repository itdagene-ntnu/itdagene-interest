FROM node:11 as builder

WORKDIR /app

COPY package.json /app
COPY yarn.lock /app

RUN yarn

COPY . /app

RUN yarn build


FROM nginx:1.17-alpine

MAINTAINER Peder Smith <smithpeder@gmail.com>

COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
