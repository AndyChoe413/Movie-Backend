//brings in all middleware
const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

//gives app variable name to run express
const app = express();

//maps out all files to be used for their functionality to be used in this app.js file
const ErrorMessageHandlerClass = require("./routes/utils/ErrorMessageHandlerClass");
const errorController = require("./routes/utils/errorController");
const userRouter = require("./routes/user/userRouter");
const twilioRouter = require("./routes/twilio/twilioRouter");

//gets rid of cors error.  which happens when the server thinks someone other than the user is trying to get access
app.use(cors());

//checks if node is running in development or production mode and uses the logger if it is development mode
if (process.env.NODE_ENV === "development") {
  app.use(logger("dev"));
}
//give a max number of times a user can try to access our server per day 
const limiter = rateLimit({
  max: 20,
  windowMs: 1 * 60 * 1000, //this is in millie second
  message:
    "Too many requests from this IP, please try again or contact support",
});
//runs express rate limiter
app.use("/api", limiter);
//runs express json to parse data
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

//gives pre determined api route naming convention for user and twilio
app.use("/api/user", userRouter);
app.use("/api/twilio", twilioRouter);

//a catch all for any errors 
app.all("*", function (req, res, next) {
  next(
    new ErrorMessageHandlerClass(
      `Cannot find ${req.originalUrl} on this server! Check your URL`,
      404
    )
  );
});
//uses express to run the errorController function in the file
app.use(errorController);

module.exports = app;
