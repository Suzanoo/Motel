const multer = require('multer');
const AppError = require('./appError');

/*
Note: response from multer
{
  fieldname: 'photo',
  originalname: 'avatar.png',
  encoding: '7bit',
  mimetype: 'image/png',
  destination: 'frontend/src/public/img/users-profile',
  filename: 'f51e6587c4034536d75f00da88695596',
  path: 'backend/public/img/users/f51e6587c4034536d75f00da88695596',
  size: 145992
}
 */

// 1). store local
// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'backend/public/img/users'); // TODO why use this path
//   },
//   filename: (req, file, cb) => {
//     const ext = file.mimetype.split('/')[1];
//     cb(null, `user-${req.user.id}-${Date.now()}.${ext}`);
//   },
// });

// 2). store in buffer then use sharp read buffer too resize later
const multerStorage = multer.memoryStorage();

// 3). filter file type of upload file
const multerFilter = (req, file, cb) => {
  // console.log('Upload file', file);
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false);
  }
};

// 4). User profile image
const uploadImage = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

// in case store locally
// const uploadImage = multer({ dest: 'backend/public/img/users' }); // absolute path

module.exports = uploadImage;
