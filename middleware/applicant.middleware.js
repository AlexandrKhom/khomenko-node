const ErrorHandler = require("../error/ErrorHandler");
const { Applicant } = require("../dataBase");

module.exports = {
  checkUniqEmail: async (req, res, next) => {
    try {
      const { email } = req.body;

      if (!email) {
        return next();
      }

      const applicant = await Applicant.findOne({ email });

      if (applicant) {
        throw new ErrorHandler('Email already exist', 409);
      }

      next();
    } catch (e) {
      next(e);
    }
  }
};
