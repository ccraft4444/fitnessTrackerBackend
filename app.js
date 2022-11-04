const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser")
const { authRequired } = require ("./routes/index")
const { COOKIE_SECRET } = process.env;

const app = express();

require("dotenv").config();

app.use(morgan("dev"));
app.use(cookieParser(COOKIE_SECRET));
app.use(express.json());

app.use("/api", require("./api"));

app.get("/test", authRequired, (req, res, next) => {
  res.send("You are authorized");
});

app.get("*", (req, res, next) => {
  res.status(404).send("Uh oh, what r u looking for?");
});

app.use((error, req, res, next) => {
  res.status(500).send(error);
});

module.exports = app;

