const mongoose = require('mongoose');
const slugify = require('slugify');

const roomSchema = new mongoose.Schema(
  {
    roomNumber: {
      type: String,
      required: [true, 'Please define room type'],
      unique: true,
    },
    roomType: {
      type: String,
      required: [true, 'Please define room type'],
      enum: {
        values: ['sea view', 'gemini', 'delux', 'suit', 'middle age'],
        message:
          'Room type is either: sea view, gemini, delux, suite, middle age',
      },
    },
    slug: String,
    description: {
      wifi: { type: Boolean, default: true },
      breakfast: { type: Boolean, default: true },
      bath: { type: Boolean, default: true },
      swimming: { type: Boolean, default: true },
      gym: { type: Boolean, default: true },
    },
    roomSize: {
      type: String,
      required: [true, 'Please define a room size'],
      enum: {
        values: ['1-bed', '2-beds'],
        message: 'Room type is either: 1-bed, 2-beds',
      },
      default: '2-beds',
    },
    maxPersons: {
      type: Number,
      required: [true, 'Please define a maximum persons'],
      default: 2,
    },
    price: {
      type: Number,
      required: [true, 'Please define a price'],
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (val) {
          // this only points to current doc on NEW document creation
          return val < this.price;
        },
        message: 'Discount price ({VALUE}) should be below regular price',
      },
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0'],
      set: (val) => Math.round(val * 10) / 10, // 4.666666, 46.6666, 47, 4.7
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    images: [String],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Create room indexes;
roomSchema.index({ price: 1, ratingsAverage: -1 });

// DOCUMENT MIDDLEWARE

// QUERY MIDDLEWARE

// AGGREGATION MIDDLEWARE

// REGISTER
const Rooms = mongoose.model('Rooms', roomSchema);

module.exports = Rooms;
