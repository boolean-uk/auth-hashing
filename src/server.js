const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

app.disable("x-powered-by");
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const loginRouter = require("./routers/login");
app.use("/login", loginRouter);

const registrationRouter = require("./routers/registration");
app.use("/register", registrationRouter);

module.exports = app;
