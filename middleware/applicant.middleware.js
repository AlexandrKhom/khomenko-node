const HTTPError = require("../error/HTTPError");
const { getApplicantByObj } = require("../service/applicant.service");

module.exports = {
  checkUniqEmail: async (req, res, next) => {
    try {
      const { email } = req.body;

      if (!email) {
        return next();
      }

      const applicant = await getApplicantByObj({ email })

      if (applicant) {
        throw new HTTPError('Email already exist', 409);
      }

      next();
    } catch (e) {
      next(e);
    }
  }
};
