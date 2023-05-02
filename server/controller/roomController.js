const catchAsync = require('../utils/catchAsync');

const CRUD = require('./factoryFunction');
const Room = require('../model/roomModel');
const resizeImg = require('../utils/resizeImg');
const uploadImg = require('../utils/multerUpload');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) {
      newObj[el] = obj[el];
    }
  });
  return newObj;
};

exports.uploadRoomImg = uploadImg.single('images'); // same name in schema and input from frontend
exports.resizeRoomImg = resizeImg.resizeProductPicture;

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

// @desc    Update room data (bypass)
// @route   PATCH /api/v1/rooms/:id
// @access  Admin
// @fields allow to update: name, images

// exports.updateRoom = CRUD.updateOne(Room);

exports.updateRoom = catchAsync(async (req, res, next) => {
  console.log('Update room', req.file);

  // 1). Allow changed only room name
  const filteredBody = filterObj(req.body, 'roomName');

  // 2). Allow if there are images in request body
  if (req.body.images) filteredBody.photo = req.body.images; // allow in POSTMAN (test dev)
  if (req.file) filteredBody.images = req.file.filename; // allow from file upload

  // 3) Update room document
  const updateRoom = await Room.findByIdAndUpdate(req.params.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    // use 'data'same name as factory function because it's will effect to frontend.
    data: {
      data: updateRoom,
    },
  });
});

// @desc    Update a room (all fields)
// @route   PATCH /api/v1/rooms/update/:id
// @access  Admin
exports.updateRoomAllFields = catchAsync(async (req, res, next) => {
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
