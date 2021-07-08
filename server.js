//Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env
require("dotenv").config();

//Mongoose is an Object Document Mapper (ODM) that makes using MongoDB easier by translating documents in a MongoDB database to objects in the program.
const mongoose = require("mongoose");
console.log(process.env.NODE_ENV);

//gives access to the app.js file
const app = require("./app");
//port variable
const port = 8080;

//uses mongoose data structure to process and connect to mongoDB
mongoose
  .connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`Server connected on ${port}`);
      console.log("MongoDB Connected");
    });
  })
  .catch((e) => {
    console.log(e);
  });
