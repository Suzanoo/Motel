const express = require('express');
const roomCtrl = require('../controller/roomController');
const authCtrl = require('../controller/authController');

const router = express.Router();

// Public access
router.route('/').get(roomCtrl.getAllRooms);

// Required login
router.use(authCtrl.protect);

// Restricted to admin
router.use(authCtrl.restrictTo('admin'));
router.route('/').post(roomCtrl.createRoom);
router
  .route('/:id')
  .patch(roomCtrl.uploadRoomImg, roomCtrl.resizeRoomImg, roomCtrl.updateRoom)
  .delete(roomCtrl.deleteRoom);

router.route('/update/:id').patch(roomCtrl.updateRoomAllFields); // Update save() method

router.route('/:id').get(roomCtrl.getRoom);
router.route('/:slug').get(roomCtrl.getRoomBySlug);

module.exports = router;
