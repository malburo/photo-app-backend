const Result = {
  success: (res, data, status = 200) => {
    return res.status(status).json({
      status: 'success',
      data,
    });
  },
  error: (res, error, status = 400) => {
    return res.status(status).json({
      status: 'failed',
      error,
    });
  },
};
export default Result;
