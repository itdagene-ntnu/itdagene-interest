FROM node:11
MAINTAINER Peder Smith <smithpeder@gmail.com>

WORKDIR /app

# No defaults
ARG SHEET_ID
ARG REACT_APP_YEAR

# Test defaults
ARG EMAIL=admin@itdagene.no
ARG RECAPTCHA_SECRET=6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe
ARG REACT_APP_RECAPTCHA_SITEKEY=6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI

ENV SHEET_ID=$SHEET_ID
ENV REACT_APP_YEAR=$REACT_APP_YEAR
ENV EMAIL=$EMAIL
ENV RECAPTCHA_SECRET=$RECAPTCHA_SECRET
ENV REACT_APP_RECAPTCHA_SITEKE=$REACT_APP_RECAPTCHA_SITEKEY

# Ports
EXPOSE 3000 8000

COPY . /app
RUN yarn install

CMD ["yarn", "start"]
