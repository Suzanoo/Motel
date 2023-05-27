const express = require('express');
const userCtrl = require('../controller/userController');
const authCtrl = require('../controller/authController');

const router = express.Router();

/*
NOTE:

Firt time we place signup path here to create first admin
After that we move to below(line 31) under "Admin controller"
for issues "Only existing admin allow to registed new admin"  

router.post('/signup', authCtrl.adminSignup); 
*/

router.post('/login', authCtrl.adminLogin); // Login to admin page
router.get('/logout', authCtrl.adminLogout);
router.post('/forgot-pwd', authCtrl.forgotPassword);
router.patch('/reset-pwd/:token', authCtrl.resetPassword);

// Protect routes
router.use(authCtrl.protect);
router.get('/personal', userCtrl.getMe, userCtrl.getUser);
router.patch('/updateMyPassword', authCtrl.updatePassword);
router.patch('/updateUserData', userCtrl.updateUserData);
router.delete('/deleteCurrentUser', userCtrl.deleteCurrentUser);

// Admin controllers
router.use(authCtrl.restrictTo('admin'));
router.post('/signup', authCtrl.adminSignup); // Only existing admin allow to registed new admin
router.route('/').get(userCtrl.getAllUsers).post(userCtrl.createUser);

router
  .route('/:id')
  .get(userCtrl.getUser)
  .patch(userCtrl.updateUser)
  .delete(userCtrl.deleteAccount);

module.exports = router;
