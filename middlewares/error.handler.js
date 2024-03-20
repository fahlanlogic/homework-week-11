const errorHandler = (err, req, res, next) => {
  console.log(err);
  if (err.code === 400) {
    res.status(400).json({
      message: 'Bad Request, check your request body!',
    });
  } else if (err.code === 409) {
    res.status(409).json({ message: 'Already exists' });
  } else if (err.code === 404) {
    res.status(404).json({ message: 'Todo Not Found!' });
  } else {
    res.status(500).json({ message: 'Internal Server Error!' });
  }
};

module.exports = errorHandler;
