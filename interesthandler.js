const GoogleSpreadsheet = require('google-spreadsheet');
const { promisify } = require('util');

const creds = require('./client_secret.json');
const interestsheet = require('./sheet_info.json');

async function interestHandler(entryObject) {
  // Access and get info from the document
  const doc = new GoogleSpreadsheet(interestsheet.id);
  await promisify(doc.useServiceAccountAuth)(creds);
  const info = await promisify(doc.getInfo)();
  const sheet = info.worksheets[0];
  console.log(`Access to sheet [${sheet.title}] was granted.`);

  // Add the new row
  console.log(entryObject);
  const parsedRow = {
    dato: new Date().toLocaleString('no', { hour12: false }),
    bedriftsnavn: entryObject.companyName,
    Kontaktperson: entryObject.contactPerson,
    epost: entryObject.contactEmail,
    telefon: entryObject.contactTlf,
    dag: entryObject.day,
    marathon: entryObject.marathon,
    melding: entryObject.message
  };
  await promisify(sheet.addRow)(parsedRow);
}
module.exports = interestHandler;
