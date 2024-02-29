const express = require('express');
const app = express();

const morgan = require('morgan')
const cors = require('cors');

app.disable('x-powered-by');

app.use(morgan('dev'))
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const registerRouter = require('./routers/registration.js');
const loginRouter = require('./routers/login.js');

app.use('/register', registerRouter);
app.use('/login', loginRouter);

module.exports = app