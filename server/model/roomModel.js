const mongoose = require('mongoose');
const slugify = require('slugify');

const roomSchema = new mongoose.Schema(
  {
    roomName: {
      type: 'string',
      required: [true, 'Please define room type'],
    },
    roomNumber: {
      type: 'string',
      required: [true, 'Please define room type'],
      unique: true,
    },
    roomType: {
      type: 'string',
      required: [true, 'Please define room type'],
      enum: {
        values: ['sea view', 'delux', 'suit', 'middle age'],
        message: 'Room type is either: sea view, delux, suite, middle age',
      },
    },
    slug: 'string',
    description: {
      type: 'string',
      default:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
    accessories: {
      wifi: { type: Boolean, default: true },
      breakfast: { type: Boolean, default: true },
      bath: { type: Boolean, default: true },
      swimming: { type: Boolean, default: true },
      gym: { type: Boolean, default: true },
    },
    roomSize: {
      type: Number,
      default: 75,
    },
    maxPersons: {
      type: Number,
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
    ratingAverage: {
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
// Slug name
roomSchema.pre('save', function (next) {
  this.slug = slugify(`${this.roomNumber}-${this.roomName}`, { lower: true });
  next();
});
// QUERY MIDDLEWARE

// AGGREGATION MIDDLEWARE

// REGISTER
const Rooms = mongoose.model('Rooms', roomSchema);

module.exports = Rooms;
