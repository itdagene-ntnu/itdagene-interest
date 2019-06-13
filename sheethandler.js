const GoogleSpreadsheet = require('google-spreadsheet');
const { promisify } = require('util');

const creds = require('./client_secret.json');
const interestsheet = require('./sheet_info.json');

async function newInterest(entryObject) {
  console.log(entryObject);

  // Access and get info from the document
  const doc = new GoogleSpreadsheet(interestsheet.id);
  await promisify(doc.useServiceAccountAuth)(creds);
  const info = await promisify(doc.getInfo)();
  const sheet = info.worksheets[0];
  console.log(`Access to sheet [${sheet.title}] was granted.`);

  // Add the new row
  await promisify(sheet.addRow)(entryObject);
}
module.exports = newInterest;
