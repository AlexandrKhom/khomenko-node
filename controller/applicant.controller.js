const { Applicant } = require("../dataBase");

module.exports = {
  getApplicants: async (req, res, next) => {
    try {
      const allApplicants = await Applicant.find(req.query);

      res.json(allApplicants);
    } catch (e) {
      next(e);
    }
  },

  createApplicant: async (req, res, next) => {
    try {
      const applicant = await Applicant.create(req.body);

      res.status(201).json(applicant._id);
    } catch (e) {
      next(e);
    }
  },

  changeApplicantById: async (req, res, next) => {
    try {
      const { _id } = req.byId;

      const applicant = await Applicant.findByIdAndUpdate(_id, { $set: { ...req.body } }, { new: true });

      res.json(applicant);
    } catch (e) {
      next(e);
    }
  },

  deleteApplicantById: async (req, res, next) => {
    try {
      const { _id } = req.byId;

      await Applicant.deleteOne({ _id });

      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }
};
