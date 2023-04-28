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
      default: 'deluxe',
      enum: {
        values: ['sea view', 'deluxe', 'suit', 'middle age'],
        message: 'Room type is either: sea view, deluxe, suite, middle age',
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
    price: {
      type: Number,
      required: [true, 'Please define a price'],
    },
    priceDiscount: {
      type: Number,
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
  },
  {
    timestamps: true,
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

// Update room slug on update
roomSchema.pre('save', function (next) {
  if (this.isModified('roomNumber')) {
    // update slug only if roomNumber is modified
    this.slug = slugify(`${this.roomNumber}-${this.roomName}`, { lower: true });
  }
  next();
});

// QUERY MIDDLEWARE

// AGGREGATION MIDDLEWARE

// REGISTER
const Rooms = mongoose.model('Rooms', roomSchema);

module.exports = Rooms;
