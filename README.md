# Interest form

> Built with React, Express and Google APIs

<p align="center">
<img src="https://i.imgur.com/4SxULiO.png" width="100%" />
</p>

### API Repository
This Webform has a supporting [API](https://github.com/itdagene-ntnu/itdagene-interest-api). The API image must be built and deployed as its supports the POST of the form.


### Development

Some environment variables must be set for the Webform and API to work.
- For the Webform you need to supply the `RECAPTCHA_SITEKEY` and the `YEAR` you want to display.
- For the API you need to supply the `EMAIL` that sends the confirmation email. You also need to supply the `RECAPTCHA_SECRET` part of the captcha-pair. Lastly you need to supply the `SHEET_ID` of the google-sheet that you want the API to write to.

> Google test keys can be used for reCAPTCHA, see [the google docs](https://developers.google.com/recaptcha/docs/faq)

#### Webform

*All commands under should be run from the folder itdagene-interest*

- `REACT_APP_RECAPTCHA_SITEKEY`: The site recatcha key consumed by the form component
- `REACT_APP_YEAR`: What year of itdagene should this form be

```zsh
# Install dependencies
$ yarn

# Start the dev server
$ yarn start
```

#### API

*All commands under should be run from the folder itdagene-interest-api*

- `EMAIL` : The email address confirmation emails are sent from
- `YEAR` : What year of itdagene should this form be
- `SHEET_ID`: The sheet id for the google sheet the form will edit
- `RECAPTCHA_SECRET`: The secret recatcha key used to verify a user response

> Google test keys can be used, see [reCAPTCHA Docs](https://developers.google.com/recaptcha/docs/faq)
- _RECAPTCHA_SECRET=6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe_

```zsh
# Start the nodemon server for development
$ yarn dev
```

<p align="center">
<img src="https://i.imgur.com/2Da2V7M.png" width="50%" />
</p>
