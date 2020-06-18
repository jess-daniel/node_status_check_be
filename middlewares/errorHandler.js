const errorHandler = () => {
  return (err, req, res, next) => {
    console.log(err);
    res
      .status(500)
      .json({ message: 'A server error occurred', error: err.message });
  };
};

module.exports = errorHandler;
