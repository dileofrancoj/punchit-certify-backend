var express = require("express");
var logger = require("morgan");
const dotenv = require("dotenv");
dotenv.config();

const certificates = require("./routes/certificates");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/certificates", certificates);

// catch 404 and forward to error handler
app.use((_, res) => {
  res.sendStatus(404);
});

app.use(function (err, req, res, next) {
  res.sendStatus(500);
});

module.exports = app;
