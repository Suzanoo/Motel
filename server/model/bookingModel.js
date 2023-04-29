const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  room: {
    type: mongoose.Schema.ObjectId,
    ref: 'Rooms',
    required: [true, 'Booking must belong to a Room!'],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Booking must belong to a User!'],
  },
  checkIn: {
    type: Date,
  },
  checkOut: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  price: {
    type: Number,
  },
  deposit: {
    type: Boolean,
    default: false,
  },
});

// Display user name, room name and room type
bookingSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name email',
  }).populate({
    path: 'room',
    select: 'roomName roomType',
  });
  next();
});

// When created new booking, define price depend on Room
bookingSchema.pre('save', async function (next) {
  const room = await mongoose.model('Rooms').findById(this.room);

  if (!room) {
    return next(new Error('Room not found'));
  }

  this.price = room.price;

  next();
});

// Exporting
const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
