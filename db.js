const mongoose = require("mongoose");
const dotenv = require("dotenv")
dotenv.config()
mongoose
  .connect(process.env.URL)
  .then(() => {
    console.log("database connection success");
  })
  .catch((error) => {
    console.log("database connection fail", error);
  });
