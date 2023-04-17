const express = require('express');
const roomCtrl = require('../controller/roomController');

const router = express.Router();

router.route('/').get(roomCtrl.getAllRooms).post(roomCtrl.createRoom);

router.route('/:id').patch(roomCtrl.updateRoom).delete(roomCtrl.deleteRoom);

router.route('/:slug').get(roomCtrl.getRoomBySlug);

module.exports = router;
