export const error = (err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "An error occurred";
  
    res.status(status).json({ error: message });
  };