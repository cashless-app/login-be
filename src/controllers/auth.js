require("dotenv").config();

const User = require("../models/Users");
const Profile = require("../models/Profile");
//const nodemailer = require("nodemailer");
const misc = require("../helpers/misc");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../configs/configs");
const client = require("twilio")(
  config.database.twilio.accountSID,

  config.database.twilio.authToken
);
module.exports = {
  auth: async (request, response) => {
    const user_id = request.user.id;

    try {
      const data = await User.auth(user_id);
      misc.response(response, 200, false, "Successfull authentication", data);
    } catch (error) {
      console.error(error.message);
      misc.response(response, 500, true, "Server error");
    }
  },

  login: async (request, response) => {
    const phonenumber = request.query;

    /*   try {
      const user = await User.login(no_hp);

      if (user.length === 0) {
        return response
          .status(400)
          .json({ errors: [{ msg: "User not found in our database" }] });
      }

      const isMatch = await bcrypt.compare(no_hp, user[0].no_hp);

      if (!isMatch) {
        return response
          .status(400)
          .json({ errors: [{ msg: "No Handphone do not match" }] });
      } */
    client.verify
      .services(config.database.twilio.serviceID)
      .verifications.create({
        to: `+${request.query.phonenumber}`,
        channel: request.query.channel,
      })
      .then((data) => {
        misc.response(response, 200, false, "Successfull login", data);
      });
    /*  } catch (error) {
      console.error(error.message);
      misc.response(response, 500, true, "Server error");
    } */
  },
  register: async (request, response) => {
    const { name, email, password, no_hp, OTP } = request.body;

    try {
      const user = await User.checkUser(email);

      if (user.length === 0) {
        const salt = await bcrypt.genSalt(10);

        const passwordHash = await bcrypt.hash(password, salt);
        const data = { name, email, password: passwordHash, no_hp };

        const registered = await User.register(data);
        const dataProfile = {
          user_id: registered.insertId,
        };
        await Profile.storeProfile(email, dataProfile);

        const payload = {
          user: {
            id: registered.insertId,
          },
        };

        const token = await jwt.sign(payload, process.env.JWT_KEY, {
          expiresIn: 360000,
        });

        misc.response(response, 200, false, "Successfull register");
      } else {
        return misc.response(response, 500, true, "User already exists");
      }
    } catch (error) {
      console.error(error.message);
      misc.response(response, 500, true, "Server error");
    }
  },
};
