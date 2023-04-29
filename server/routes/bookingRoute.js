const express = require('express');
const bookingCtrl = require('../controller/bookingController');
const authCtrl = require('../controller/authController');

const router = express.Router();

// Login required
router.use(authCtrl.protect);

// Restrick to user
router.post('/', authCtrl.restrictTo('user'), bookingCtrl.createBooking);

// Restrick to admin
router.use(authCtrl.restrictTo('admin'));
router.get('/', bookingCtrl.getAllBookings);
router
  .route('/:id')
  .get(bookingCtrl.getBooking)
  .patch(bookingCtrl.updateBooking)
  .delete(bookingCtrl.deleteBooking);

module.exports = router;
