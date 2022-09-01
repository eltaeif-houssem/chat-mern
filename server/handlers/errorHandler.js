const errorHandler = (err, req, res, next) => {
  const message = err.message || "Server Error";
  const status = err.status || 500;
  res.status(status).send({ error: message });
};

export default errorHandler;
