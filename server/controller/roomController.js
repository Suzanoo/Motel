const CRUD = require('./factoryFunction');
const Room = require('../model/roomModel');

// @desc    Fetch all rooms
// @route   GET /api/rooms
// @access  Public
exports.getAllRooms = CRUD.getAll(Room);

// @desc    Create new room
// @route   POST /api/products
// @access  Admin
exports.createRoom = CRUD.createOne(Room);

// @desc    Update a rooms
// @route   PATCH /api/rooms/:id
// @access  Admin
exports.updateRoom = CRUD.updateOne(Room);

// @desc    Delete a rooms
// @route   DELETE /api/rooms/:id
// @access  Admin
exports.deleteRoom = CRUD.deleteOne(Room);

// @desc    Fetch a rooms by room ID
// @route   GET /api/rooms
// @access  Public
exports.getRoom = CRUD.getOne(Room);

// @desc    Fetch a rooms by room slug
// @route   GET /api/rooms/:slug
// @access  Admin
exports.getRoomBySlug = CRUD.getOneBySlug(Room);
