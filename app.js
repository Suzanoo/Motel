const path = require('path');
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const AppError = require('./server/utils/appError');
const globalErrorHandler = require('./server/controller/errorController');
const routes = require('./server/routes/routes');

// Express app and enable body parser
const app = express();
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Development log
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Serve client side
app.use(express.static(path.join(__dirname, 'public')));

// ROUTES
app.use('/', routes);

// Route error
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
