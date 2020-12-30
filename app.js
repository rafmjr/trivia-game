const express = require('express');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const path = require('path');

const indexRouter = require('./routes/index');

const app = express();

app.use(cors({ origin: ['http://localhost:3000'], credentials: true, exposedHeaders: ['set-cookie'] }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use('/', indexRouter);
app.use(express.static('build'));
app.use('/storage', express.static('storage'));

app.get('*', function (request, response) {
    response.sendFile(path.resolve(__dirname, 'build/index.html'));
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.send(err);
});

module.exports = app;
