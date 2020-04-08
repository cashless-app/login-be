const mysql = require("mysql");
const config = require("./configs");
const connection = mysql.createConnection(config.database.mysql);
const client = require("twilio")(
  config.database.twilio.accountSID,
  config.database.twilio.serviceID,
  config.database.twilio.authToken
);
connection.connect((err) => {
  if (err) {
    console.log(`Error Database Connection: \n ${err}`);
  } else {
    console.log("Success Connect to Database");
  }
});

module.exports = connection;
