export const validateBody = (schema) => async (req, res, next) => {
  console.log(req.body);
  try {
    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (err) {
    const errors = err.details.map(detail => ({
      message: detail.message,
      path: detail.path,
      type: detail.type,
      context: detail.context || {},
    }));

    const errorResponse = {
      status: 400,
      message: "BedRequestError",
      data: {
        message: "Bed Request",
        errors,
      },
    };

    res.status(400).json(errorResponse);
  }
};

export default validateBody;
