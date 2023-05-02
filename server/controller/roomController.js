const catchAsync = require('../utils/catchAsync');

const CRUD = require('./factoryFunction');
const Room = require('../model/roomModel');

// @desc    Fetch all rooms
// @route   GET /api/v1/rooms
// @access  Public
exports.getAllRooms = CRUD.getAll(Room);

// @desc    Create new room
// @route   POST /api/v1/rooms
// @access  Admin
exports.createRoom = CRUD.createOne(Room);

// @desc    Delete a rooms
// @route   DELETE /api/v1/rooms/:id
// @access  Admin
exports.deleteRoom = CRUD.deleteOne(Room);

// @desc    Fetch a rooms by room ID
// @route   GET /api/v1/rooms
// @access  Public
exports.getRoom = CRUD.getOne(Room);

// @desc    Fetch a rooms by room slug
// @route   GET /api/v1/rooms/:slug
// @access  Admin
exports.getRoomBySlug = CRUD.getOneBySlug(Room);

// @desc    Update a room (Bypass)
// @route   PATCH /api/v1/rooms/:id
// @access  Admin
exports.bypassUpdateRoom = CRUD.updateOne(Room);

// @desc    Update a room (save() method)
// @route   PATCH /api/v1/rooms/update/:id
// @access  Admin
exports.updateRoom = catchAsync(async (req, res, next) => {
  const { roomName, roomNumber, roomType, price, ratingAverage, images } =
    req.body;

  const room = await Room.findById(req.params.id);

  if (room) {
    room.roomName = roomName;
    room.roomNumber = roomNumber;
    room.roomType = roomType;
    room.price = price;
    room.ratingAverage = ratingAverage;
    room.images = images;

    const doc = await room.save();

    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  } else {
    res.status(404);
    throw new Error('Room not found');
  }
});
