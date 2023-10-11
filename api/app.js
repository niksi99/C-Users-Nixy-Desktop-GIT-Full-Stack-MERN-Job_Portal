require('dotenv').config();
const express = require('express');
const app = express();

const morgan = require('morgan');
const body_parser = require('body-parser')

const MongoDB_Connection = require('./server/config/MongoDB');

MongoDB_Connection();

app.use(morgan("dev"));
app.use(body_parser.json());

const AuthRoute = require('./server/routes/AuthRoute')

app.use('/api/auth', AuthRoute);

const port = process.env.PORT || 3001

app.listen(port, () => {
    console.log('http://localhost:'+port)
})