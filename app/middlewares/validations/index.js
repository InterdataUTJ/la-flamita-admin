import { ValidationError } from "#middlewares/error.middleware.js";
import { validationResult } from "express-validator";

export default (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return next(new ValidationError(errors.errors[0]["msg"]));

  next();
};
