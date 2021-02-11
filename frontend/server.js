const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");

const userRouter = require("./resources/user/user.router");
const connect = require("./utils/connect");
const auth = require("./utils/auth");

const HTTP_PORT = process.env.PORT || 1234;

var app = express();

app.use(cors());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(morgan());

app.post("/signup", auth.signup);
app.post("/login", auth.login);

// Next 2 lines necessary for basic signup/login functionality?
app.use("/api", auth.protect);
app.use("/api/user", userRouter);

const start = async () => {
  try {
    await connect("mongodb://localhost:27017/testDB");
    app.listen(HTTP_PORT, () => {
      console.log(`REST API on http://localhost:${HTTP_PORT}/api`);
    });
  } catch (e) {
    console.error(e);
  }
};

start();
