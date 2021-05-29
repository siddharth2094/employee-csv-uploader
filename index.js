const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const employeeRouter = require("./routes/employee-routes");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
// app.use(multer.array());

app.use(express.static(path.resolve(__dirname, "public")));

app.use(
  cors({
    allowedHeaders: [
      "Content-Type",
      "token",
      "authorization",
      "x-www-form-urlencoded",
    ],
    exposedHeaders: ["token", "authorization"],
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
  })
);

const port = process.env.PORT || 5000;

app.use("/v0/employee", employeeRouter);

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res
    .status(error.code || 500)
    .json({ message: error.message || "An unknown error occurred!" });
});

console.log(CsvUploader, siddharth20);

mongoose
  .connect(
    `mongodb+srv://CsvUploader:siddharth20@cluster0.e8fl4.mongodb.net/employee-data`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      // reconnectTries: 60,
      retryWrites: false,
      //Wait 1 second before retrying
      // reconnectInterval: 1000,
    }
  )
  .then(() => {
    console.log("Connection established");
  })
  .catch((e) => console.log(e));

if ((process.env.NODE_ENV = "production")) {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(port, () => {
  console.log(`server is running at port ${port}`);
});
