const AUTH_MODEL = require("../model/auth.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
// Your AccountSID and Auth Token from console.twilio.com
const accountSid = process.env.ACCOUNTSID;
const authToken = process.env.AUTH_TOKEN;
const twilioNumber = process.env.TWILIO_NUMBER;

const client = require("twilio")(accountSid, authToken);

const registration = async (req, res, next) => {
  try {
    const data = req.body;
    const isExists = await AUTH_MODEL.findOne({ email: data.email });

    if (isExists) {
      res.status(400).send({
        success: false,
        message: "Account already exist with this email",
      });
    } else {
      const hash = await bcrypt.hash(
        data.password,
        parseInt(process.env.SALT_ROUND)
      );
      data.hash = hash;

      const otp = Math.floor(100000 + Math.random() * 900000);
      data.otp = otp;

      const createAccount = await AUTH_MODEL.create(data);
      if (createAccount) {
        const sendOtp = client.messages.create({
          body: `Your otp is ${createAccount.otp}`,
          from: twilioNumber,
          to: data.mobile,
        });
        res.status(200).send({
          success: true,
          message: "For account verification otp send on your register mobile",
          data: createAccount,
        });
      } else {
        res.status(400).send({
          success: false,
          message: "Account not created",
        });
      }
    }
  } catch (error) {
    console.log("error", error);
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { registration };
