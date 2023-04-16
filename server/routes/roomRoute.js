const express = require('express');
const roomCtrl = require('../controller/roomController');

const router = express.Router();

router.route('/').get(roomCtrl.getAllRooms).post(roomCtrl.createRoom);

router
  .route('/:id')
  .get(roomCtrl.getRoom)
  .patch(roomCtrl.updateRoom)
  .delete(roomCtrl.deleteRoom);

module.exports = router;
