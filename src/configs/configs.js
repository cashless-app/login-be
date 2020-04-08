require("dotenv/config");

module.exports = {
  database: {
    mysql: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
    twilio: {
      serviceID: "VA1cab591c692b653661b9df087edfacfa",
      accountSID: "AC5739355d6cd925801c5cedbd4f18bc19",
      authToken: "eb052c0cc29d647ca4397c5f5aab8c14",
    },
  },
  port: process.env.PORT,
  jwtSecret: process.env.JWT_KEY,
};
