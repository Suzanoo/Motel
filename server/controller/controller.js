const hello = (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Hello welcome',
  });
};
module.exports = { hello };
