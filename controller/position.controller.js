const { getAllPosition, findApplicantForPosition } = require("../service/position.service");
const { sendMail } = require("../service/email.service");
const { Position } = require("../dataBase");

module.exports = {
  getPositions: async (req, res, next) => {
    try {
      const AllPositions = await getAllPosition(req.query);

      res.json(AllPositions);
    } catch (e) {
      next(e);
    }
  },

  createPosition: async (req, res, next) => {
    try {
      const position = await Position.create(req.body);

      const applicantsForSendMail = await findApplicantForPosition(position);

      const { company, description, _id } = position;

      await Promise.allSettled(applicantsForSendMail.map(async ({ email }) => {
        await sendMail(
            email,
            `new job from ${company}`,
            `Hi. Visit our site, we have a new job for you! <p>${description}</p>`
        );
      }));

      res.status(201).json(`Created with id ${_id}`);
    } catch (e) {
      next(e);
    }
  },

  getPositionsById: async (req, res, next) => {
    try {
      const position = req.findById;

      res.json(position);
    } catch (e) {
      next(e);
    }
  },

  updatePositionById: async (req, res, next) => {
    try {
      const { _id } = req.findById;

      const position = await Position.findByIdAndUpdate(_id, { $set: { ...req.body } }, { new: true });

      res.json(position);
    } catch (e) {
      next(e);
    }
  },

  deletePositionById: async (req, res, next) => {
    try {
      const { _id } = req.findById;

      const position = await Position.findOneAndDelete({ _id });

      const applicantsForSendMail = await findApplicantForPosition(position);

      await Promise.allSettled(applicantsForSendMail.map(async ({ email }) => {
        await sendMail(
            email,
            `good luck from ${position.company}`,
            `Hi. Sorry, vacation was closed <p>${position.description}</p>`
        );
      }));

      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }
};
