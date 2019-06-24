# Interest form

> Built with React, Express and Google APIs

<p align="center">
<img src="https://i.imgur.com/4SxULiO.png" width="100%" />
</p>

### Environment variables
- `EMAIL` : The sender email
- `SHEET_ID`: The sheet id for the google sheet the form will edit
- `RECAPTCHA_SECRET`: The secret recatcha key used to verify a user response
- `REACT_APP_RECAPTCHA_SITEKEY`: The site recatcha key consumed by the form component
- `REACT_APP_YEAR`: What year of itdagene should this form be

> Google test keys can be used, see [reCAPTCHA Docs](https://developers.google.com/recaptcha/docs/faq)
- _RECAPTCHA_SECRET=6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe_
- _REACT_APP_RECAPTCHA_SITEKEY=6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI_

### Development
```zsh
# Install dependencies
$ yarn

# Concurrently run the FORM and the API
$ yarn start
```

### Build and run image
```zsh
$ docker build -t <TAG> .
$ docker run -p 3000:3000 -p 8000:8000 -it <TAG>
```

### Using docker-compose
```zsh
$ docker-compose up -d
```

<p align="center">
<img src="https://i.imgur.com/2Da2V7M.png" width="50%" />
</p>
