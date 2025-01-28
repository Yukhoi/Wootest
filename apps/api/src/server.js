const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

const courseRouter = require("./routers/course-router");
const questionRouter = require("./routers/question-router");
const defaultRouter = require("./routers/default-router");

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Content-Type", "application/json");

  if (req.method !== 'OPTIONS') {
    console.log(`HTTP Method: ${req.method}`);
    console.log(`URL: ${req.originalUrl}`);
    if (Object.keys(req.body).length > 0) {
      console.log(`Body: ${JSON.stringify(req.body)}`);
    }
  }
  next();
});

app.use(courseRouter);
app.use(questionRouter);
app.use(defaultRouter);

mongoose
  .connect("mongodb://admin:password@127.0.0.1:27042/course-catalog", {
    authSource: "admin",
  })
  .then(async (result) => {
    console.log("MongoDB started!");

    app.listen(port, () => {
      console.log(`API running on port ${port} ...`);
    });
  })
  .catch((error) => console.log(error));
