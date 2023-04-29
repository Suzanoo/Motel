const catchAsync = require('../utils/catchAsync');
const Booking = require('../model/bookingModel');
const factory = require('./factoryFunction');
const authCtrl = require('./authController');

// @desc    Create new bookings
// @route   POST /api/v1/booking
// @access  User
const createNewBooking = (Model) =>
  catchAsync(async (req, res, next) => {
    console.log(req.body);

    // Get user ID from token in request cookies
    const userId = req.user._id;

    // Set user field in req.body
    req.body.user = userId;

    // Create a booking
    const doc = await Model.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

exports.createBooking = createNewBooking(Booking);
exports.getBooking = factory.getOne(Booking);
exports.getAllBookings = factory.getAll(Booking);
exports.updateBooking = factory.updateOne(Booking);
exports.deleteBooking = factory.deleteOne(Booking);
