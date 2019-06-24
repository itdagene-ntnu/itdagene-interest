FROM node:11 as builder

WORKDIR app/

COPY package.json ./
COPY yarn.lock ./

RUN yarn

COPY . ./

# ARG defaults
ARG REACT_APP_YEAR=2020
ARG REACT_APP_RECAPTCHA_SITEKEY=6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI

ENV REACT_APP_YEAR=$REACT_APP_YEAR
ENV REACT_APP_RECAPTCHA_SITEKE=$REACT_APP_RECAPTCHA_SITEKEY

RUN yarn build

FROM node:11
MAINTAINER Peder Smith <smithpeder@gmail.com>

WORKDIR app/

COPY --from=builder /app/package.json .
COPY --from=builder /app/yarn.lock .
COPY --from=builder app/build app/

RUN yarn --prod

ENTRYPOINT ["yarn", "start"]
