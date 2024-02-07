import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
const app = express();
mongoose
  .connect(process.env.MONGOURL)
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.log(err);
  });
app.listen(3000, () => {
  console.log("Server is running on port 3000!");
});
