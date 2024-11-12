export const errorHandler = (error, req, res, next) => {
  const status = error.status || 500;
  const message = error.name ? error.name : "Error";
  const detailedMessage = error.message || 'Server error';

  res.status(status).json({
    status,
    message,
    data: {
      message: detailedMessage,
    },
  });
};
