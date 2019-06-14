const axios = require('axios');
const keys = require('./src/server_secret.json');

async function recaptchaHandler(response) {
  secret = keys.SECRETKEY;
  return axios
    .post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${response}`,
      {},
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
        }
      }
    )
    .then(function(res) {
      return {
        status: res.status,
        data: res.data
      };
    });
}

module.exports = recaptchaHandler;
