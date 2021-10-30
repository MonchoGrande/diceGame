//Not route handlerFound
const routeFoundHandler = (req, res, next) => {
  res.status(404);
  res.json({
    message: 'Route not found',
  });
};

//Error handler
const errorHandler = (err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode);
  res.json({
    message,
  });
};

module.exports = { routeFoundHandler, errorHandler };
