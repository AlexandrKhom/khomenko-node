const { isValidObjectId } = require('mongoose');

const ErrorHandler = require("../error/ErrorHandler");

module.exports = {
  checkIdMiddleware: (schema, typeId) => async (req, res, next) => {
    try {
      const id = req.params[typeId];

      if (!isValidObjectId(id)) {
        throw new ErrorHandler('Not valid ID', 400);
      }

      const findResponse = await schema.findById(id);

      if (!findResponse) {
        throw new ErrorHandler('Not found', 404);
      }

      req.findById = findResponse;
      next();
    } catch (e) {
      next(e);
    }
  },

  validateDataDynamic: (validator, dataIn = 'body') => (req, res, next) => {
    try {
      const { error, value } = validator.validate(req[dataIn]);

      if (error) {
        throw new ErrorHandler(error.details[0].message, 400);
      }

      req[dataIn] = value;
      next();
    } catch (e) {
      next(e)
    }
  }
};
