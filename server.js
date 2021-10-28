const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const applicantRouter = require("./router/applicant.router");
const positionsRouter = require("./router/position.router");
const { PORT, MONGO_CONNECT_URL } = require("./config/variables");

const app = express();
mongoose.connect(MONGO_CONNECT_URL);

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(function logMethodAndUrl(request, response, next) {
    console.log(`${request.method} ${request.url}`);
    next();
})

app.get('/', (req, res) => {
    res.end('This is a simple request');
});

app.get('/health-check', (req, res) => {
    res.json({
        date: new Date,
        message: 'Server is running'
    });
});

app.use('/applicants', applicantRouter);
app.use('/positions', positionsRouter);

app.use('*', (err, req, res, next) => {
    res
        .status(err.status || 500)
        .json({ message: err.message });
});

app.listen(PORT, (err) => {
    if (err) return console.log(err);

    console.log(`App listen ${PORT}`);
});
