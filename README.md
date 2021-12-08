# Interest form

> Built with React, Express and Google APIs

<p align="center">
  <img src="https://i.imgur.com/4SxULiO.png" width="100%" />
</p>

## Motivation

This Webform was created as a custom way for companies to show their interest in the itDAGENE tech fair. In essence it exists to reduce the _TO_ and _FROM_ mail sequence which used to take place each year, eating time from both the board members and the companies.

The Webform supports both Norwegian and English submissions, and records the preference for further communications with the company. It also allows the tech fair to get a overview of what companies are interested this year, and with the different fields they can also get an understanding of what each company want.

The initial intent is for the form to launch each year after the fair is ended, and stay open for as long as the next board wants it too. The intent is also _NOT_ to use the list as a _first-come-first-serve_ as this is something we want to move away from.

Another initial intent was for the form to act as a _waiting-list_ after the tech fair is full. This will allow companies to continue to note their interest even after the fair is full.

### API Repository

This Webform has a supporting [API](https://github.com/itdagene-ntnu/itdagene-interest-api). The API image must be built and deployed as its supports the POST of the form.

### Development

Some environment variables must be set for the Webform and API to work.

- For the Webform you need to supply the `RECAPTCHA_SITEKEY` and the `YEAR` you want to display.
- For the API you need to supply the `EMAIL` that sends the confirmation email. You also need to supply the `RECAPTCHA_SECRET` part of the captcha-pair. Lastly you need to supply the `SHEET_ID` of the google-sheet that you want the API to write to.

> Google test keys can be used for reCAPTCHA, see [the google docs](https://developers.google.com/recaptcha/docs/faq)

#### Webform

_All commands under should be run from the folder itdagene-interest_

- `REACT_APP_RECAPTCHA_SITEKEY`: The site recatcha key consumed by the form component
- `REACT_APP_YEAR`: What year of itdagene should this form be

```zsh
# Install dependencies
$ yarn

# Start the dev server
$ yarn start
```

#### API

_All commands under should be run from the folder itdagene-interest-api_

- `EMAIL` : The email address confirmation emails are sent from
- `YEAR` : What year of itdagene should this form be
- `SHEET_ID`: The sheet id for the google sheet the form will edit
- `RECAPTCHA_SECRET`: The secret recatcha key used to verify a user response

```zsh
# Start the nodemon server for development
$ yarn dev
```

<p align="center">
<img src="https://i.imgur.com/KQL1yjc.gif" width="50%" />
</p>
