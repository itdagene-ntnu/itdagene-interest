FROM node:16 as builder

WORKDIR /app

COPY package.json /app
COPY yarn.lock /app

RUN yarn

COPY . /app

RUN yarn build


FROM nginx:1.17-alpine

LABEL org.opencontianers.image.authors="web@itdagene.no"

COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
