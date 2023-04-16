const CRUD = require('./factoryFunction');
const Room = require('../model/roomModel');

exports.createRoom = CRUD.createOne(Room);
exports.getRoom = CRUD.getOne(Room);
exports.getAllRooms = CRUD.getAll(Room);
exports.updateRoom = CRUD.updateOne(Room);
exports.deleteRoom = CRUD.deleteOne(Room);
