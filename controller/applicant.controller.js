const { Applicant } = require("../dataBase");

module.exports = {
  getApplicant: async (req, res, next) => {
    try {
      const AllApplicant = await Applicant.find(req.query);

      res.json(AllApplicant);
    } catch (e) {
      next(e);
    }
  },

  createApplicant: async (req, res, next) => {
    try {
      const applicant = await Applicant.create(req.body);

      res.status(201).json(`Created with id ${applicant._id}`);
    } catch (e) {
      next(e);
    }
  },

  changeApplicantById: async (req, res, next) => {
    try {
      const { _id } = req.findById;

      const applicant = await Applicant.findByIdAndUpdate(_id, { $set: { ...req.body } }, { new: true });

      res.json(applicant);
    } catch (e) {
      next(e);
    }
  },

  deleteApplicantById: async (req, res, next) => {
    try {
      const { _id } = req.findById;

      await Applicant.deleteOne({ _id });

      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }
};
