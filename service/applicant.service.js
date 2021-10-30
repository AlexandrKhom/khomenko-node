const { Applicant } = require("../dataBase");

module.exports = {
  getApplicantByObj: (obj) => Applicant.findOne(obj)
}
