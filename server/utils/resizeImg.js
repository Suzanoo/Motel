// https://github.com/lovell/sharp
const sharp = require('sharp');

exports.resizeProfilePicture = async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `user-${req.user.id}-${Date.now()}.png`;

  await sharp(req.file.buffer)
    .resize(118, 118)
    .toFormat('png')
    .toFile(`app/src/public/assets/user-profile/${req.file.filename}`);
  next();
};

exports.resizeProductPicture = async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `room-${req.params.id}-${Date.now()}.png`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('png')
    .toFile(`app/src/public/assets/detail-img/${req.file.filename}`);
  next();
};
