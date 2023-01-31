const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const handlebars = require('express-handlebars')

const indexRouter = require('./routes/index');
const { generalErrorHandller, error404 } = require('./middleware');

const app = express();

// view engine setup
app.engine('hbs', handlebars.engine({ extname: '.hbs', }));
app.set('view engine', 'hbs');
app.set('views', __dirname+'/views');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(error404);

// error handler
app.use(generalErrorHandller);

module.exports = app;
