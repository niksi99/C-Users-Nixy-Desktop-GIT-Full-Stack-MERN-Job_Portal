require('dotenv').config();
const express = require('express');
const app = express();

const morgan = require('morgan');
const MongoDB_Connection = require('./server/config/MongoDB');

MongoDB_Connection();

app.use(morgan("dev"));
const port = process.env.PORT || 3001

app.get('/', (req, res) => {
    res.send("radi");
})

app.listen(port, () => {
    console.log('http://localhost:'+port)
})