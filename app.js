var express = require("express");
var logger = require("morgan");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const certificates = require("./routes/certificates");
const courses = require("./routes/courses");
var app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/certificates", certificates);
app.use("/api/courses", courses);

// catch 404 and forward to error handler
app.use((_, res) => {
  res.sendStatus(404);
});

app.use(function (err, req, res, next) {
  res.sendStatus(500);
});

module.exports = app;
