const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  rooms: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Room',
      required: [true, 'Booking must belong to a room!'],
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Booking must belong to a user!'],
  },
  checkIn: {
    type: Date,
    required: [true, 'Booking must belong to a checkin date!'],
  },
  checkOut: {
    type: Date,
    required: [true, 'Booking must belong to a checkout date!'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  VAT: {
    type: Number,
  },
  payment: {
    type: Number,
  },
  deposit: {
    type: Boolean,
    default: false,
  },
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

// Display only user name, room name and room type
bookingSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name email',
  }).populate({
    path: 'rooms.room',
    select: 'roomName roomType',
  });
  next();
});

// Calculate VAT and payment based on the price of each room
bookingSchema.pre('save', async function (next) {
  const Rooms = mongoose.model('Rooms');

  const roomIds = this.rooms.map((room) => room.toString());
  const rooms = await Rooms.find({ _id: { $in: roomIds } });

  if (roomIds.length !== rooms.length) {
    return next(new Error('One or more rooms not found'));
  }

  let totalPrice = 0;
  for (let i = 0; i < rooms.length; i++) {
    const room = rooms[i];
    const duration = (this.checkOut - this.checkIn) / (1000 * 60 * 60 * 24);
    const price = duration * room.price;
    totalPrice += price;
  }

  this.VAT = totalPrice * 0.1;
  this.payment = totalPrice + this.VAT;

  next();
});

// Exporting
const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
