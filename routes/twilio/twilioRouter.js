const express = require("express");
const router = express.Router();
const jwtMiddleware = require("../utils/jwtMiddleware");
//brings in token and twilio account sid from .env file
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
//creates a client variable to use twilio with sid and token
const client = require("twilio")(accountSid, authToken);
//sets up route for text message and catches errors
router.post("/send-sms", jwtMiddleware, function (req, res) {
  client.messages
    .create({
      body: req.body.message,
      from: "+12402215541", //if you paid for the api service it will be your real number
      to: `+1${req.body.to}`, //and you can send real text message to your friends, family, and strangers... but dont do that
    })
    .then((message) => res.json(message))
    .catch((error) => {
      console.log(error.message);

      res.status(error.status).json({ message: error.message, error });
    });
});

module.exports = router;
