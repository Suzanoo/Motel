const path = require('path');
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const AppError = require('./server/utils/appError');
const globalErrorHandler = require('./server/controller/errorController');
const roomRoute = require('./server/routes/roomRoute');
const adminRoute = require('./server/routes/adminRoute');
const userRoute = require('./server/routes/userRoute');
const bookingRoute = require('./server/routes/bookingRoute');

// Define express app and enable body parser
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
app.use('/api/v1/rooms', roomRoute);
app.use('/api/v1/admin', adminRoute);
app.use('/api/v1/users', userRoute);
app.use('/api/v1/booking', bookingRoute);

// Route error
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
