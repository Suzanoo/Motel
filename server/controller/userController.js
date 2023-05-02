const User = require('../model/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const CRUD = require('./factoryFunction');

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

// -----------------------------------
// ##
// -----------------------------------
exports.uploadProfilePicture = uploadImg.single('photo'); // same name in schema and input from ProfilePicture.jsx
exports.resizeProfilePicture = resizeImg.resizeProfilePicture;

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.updateUser = CRUD.updateOne(User);
exports.deleteAccount = CRUD.deleteOne(User);
exports.getUser = CRUD.getOne(User);
exports.getAllUsers = CRUD.getAll(User);

exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!, please use /signup instead.',
  });
};

// @desc    Update user data (bypass)
// @route   PATCH /api/v1/users/update-user-data
// @access  User
// @fields allow to update: name, email, profile picture
exports.updateUserData = catchAsync(async (req, res, next) => {
  console.log('Update user data', req.file);

  // 1) Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError('Wrong route!. Please use /updateMyPassword.', 400)
    );
  }

  // 2) Filtered out unwanted fields names that are not allowed to be updated
  const filteredBody = filterObj(req.body, 'name', 'email'); // now only allow name and email

  // if update user profile picture
  if (req.body.photo) filteredBody.photo = req.body.photo; // allow profile picture from POSTMAN (test dev)
  if (req.file) filteredBody.photo = req.file.filename; // allow profile picture from file upload

  // 3) Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});

exports.deleteCurrentUser = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
