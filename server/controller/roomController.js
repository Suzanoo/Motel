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
exports.getAllRooms = CRUD.getAll(Room);
exports.createRoom = CRUD.createOne(Room);
exports.deleteRoom = CRUD.deleteOne(Room);
exports.getRoom = CRUD.getOne(Room);
exports.getRoomBySlug = CRUD.getOneBySlug(Room);

// exports.updateRoom = CRUD.updateOne(Room);

exports.updateRoom = catchAsync(async (req, res, next) => {
  // 1). Allow fields to changed
  const filteredBody = filterObj(
    req.body,
    'roomName',
    'price',
    'priceDiscount',
    'images'
  );

  // console.log(req.body);
  // console.log(req.file);

  // 2). Allow if there are images in request body
  if (req.body.images) filteredBody.images = req.body.images; // allow in POSTMAN (test dev)
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
