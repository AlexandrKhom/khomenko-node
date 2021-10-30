const { isValidObjectId } = require('mongoose');

const HTTPError = require("../error/HTTPError");
const { getItemById } = require("../service/main.service");

module.exports = {
  checkIdMiddleware: (schema) => async (req, res, next) => {
    try {
      const { id } = req.params;

      if (!isValidObjectId(id)) {
        throw new HTTPError('Not valid ID', 400);
      }

      const findResponse = await getItemById(schema, id)

      if (!findResponse) {
        throw new HTTPError('Not found', 404);
      }

      req.byId = findResponse;
      next();
    } catch (e) {
      next(e);
    }
  },

  validateDataDynamic: (validator, dataIn = 'body') => (req, res, next) => {
    try {
      const { error, value } = validator.validate(req[dataIn]);

      if (error) {
        throw new HTTPError(error.details[0].message, 400);
      }

      req[dataIn] = value;
      next();
    } catch (e) {
      next(e)
    }
  }
};
