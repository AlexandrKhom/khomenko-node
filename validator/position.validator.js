const Joi = require('joi');

const categoriesEnum = require('../constant/categories.enum');
const levelsEnum = require('../constant/levels.enum');

module.exports = {
  createPositionValidator: Joi.object({
    category: Joi
        .string()
        .alphanum()
        .min(2)
        .max(30)
        .required()
        .valid(...categoriesEnum)
        .trim(),
    level: Joi
        .string()
        .alphanum()
        .required()
        .valid(...levelsEnum)
        .trim(),
    company: Joi
        .string()
        .alphanum()
        .min(2)
        .max(30)
        .required()
        .trim(),
    description: Joi
        .string()
        .trim(),
    japaneseRequired: Joi
        .boolean()
        .required()
  }),

  updatePositionValidator: Joi.object({
    japaneseRequired: Joi
        .boolean()
        .required()
  }),

  queryPositionValidator: Joi.object({
    level: Joi
        .string()
        .valid(...levelsEnum),
    category: Joi
        .string()
        .valid(...categoriesEnum),
    tag: Joi
        .string()
  })
};
