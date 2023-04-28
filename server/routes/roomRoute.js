const express = require('express');
const roomCtrl = require('../controller/roomController');
const authCtrl = require('../controller/authController');

const router = express.Router();

// Public access
router.route('/').get(roomCtrl.getAllRooms);

// Protect routes(Required login)
router.use(authCtrl.protect);

// Roles
router.use(authCtrl.restrictTo('admin'));

// Restricted to admin
router.route('/').post(roomCtrl.createRoom);
router.route('/:id').patch(roomCtrl.updateRoom).delete(roomCtrl.deleteRoom);
router.route('/:id').get(roomCtrl.getRoom);
router.route('/:slug').get(roomCtrl.getRoomBySlug);

module.exports = router;
