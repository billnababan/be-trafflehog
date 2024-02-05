const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  // Check if headers already sent
  if (res.headersSent) {
    return next(err);
  }

  res.status(500).json({ error: "Something went wrong!" });
};

module.exports = errorHandler;
