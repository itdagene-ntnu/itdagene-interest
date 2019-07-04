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

ARG REACT_APP_YEAR
ARG REACT_APP_RECAPTCHA_SITEKEY

ENV REACT_APP_YEAR=$YEAR
ENV REACT_APP_RECAPTCHA_SITEKEY=$RECAPTCHA_SITEKEY

EXPOSE 80
EXPOSE 443

CMD ["nginx", "-g", "daemon off;"]
