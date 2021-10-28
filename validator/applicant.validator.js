const Joi = require('joi');

const categoriesEnum = require('../constant/categories.enum');
const levelsEnum = require('../constant/levels.enum');
const regexpEnum = require('../constant/regexp.enum');

module.exports = {
  createApplicantValidator: Joi.object({
    categories: Joi
      .array()
      .min(1)
      .required()
      .items(...categoriesEnum),
    level: Joi
      .string()
      .alphanum()
      .required()
      .valid(...levelsEnum)
      .trim(),
    email: Joi
      .string()
      .regex(regexpEnum.EMAIL_REGEXP)
      .required()
      .trim(),
    japaneseKnowledge: Joi
      .boolean()
      .required()
  }),

  changeApplicantValidator: Joi.object({
    categories: Joi
        .array()
        .min(1)
        .items(...categoriesEnum),
    level: Joi
      .string()
      .alphanum()
      .valid(...levelsEnum)
      .trim(),
    email: Joi
      .string()
      .regex(regexpEnum.EMAIL_REGEXP)
      .trim(),
    japaneseKnowledge: Joi
      .boolean()
  }),

  queryApplicantValidator: Joi.object({
    level: Joi
      .string()
      .valid(...levelsEnum),
    categories: Joi
      .string()
      .valid(...categoriesEnum),
    email: Joi
      .string()
      .trim(),
    japaneseKnowledge: Joi
      .boolean()
  })
};
