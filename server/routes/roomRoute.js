const express = require('express');
const roomCtrl = require('../controller/roomController');
const authCtrl = require('../controller/authController');

const router = express.Router();

// Protect routes
router.use(authCtrl.protect);

// Roles
router.use(authCtrl.restrictTo('admin'));

//
router.route('/').get(roomCtrl.getAllRooms).post(roomCtrl.createRoom);

router.route('/:id').patch(roomCtrl.updateRoom).delete(roomCtrl.deleteRoom);

router.route('/:slug').get(roomCtrl.getRoomBySlug);

module.exports = router;
