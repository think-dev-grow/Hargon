const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const authRoute = require("./routes/user");

const app = express();
dotenv.config();

app.use(express.json());

const connectDB = () => {
  mongoose
    .connect(process.env.MONGO)
    .then(() => {
      console.log("DB connected.");
    })
    .catch((err) => {
      console.log(err);
    });
};

app.use("/Hargon/api", authRoute);

const PORT = 8800;

app.listen(PORT, () => {
  connectDB();
  console.log("Server connected.");
});
