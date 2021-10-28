const applicantRouter = require('express').Router();

const { Applicant } = require("../dataBase");
const { createApplicant, getApplicant, deleteApplicantById, changeApplicantById } = require("../controller/applicant.controller");
const { checkIdMiddleware, validateDataDynamic } = require("../middleware/main.middleware");
const { checkUniqEmail } = require("../middleware/applicant.middleware");
const { createApplicantValidator, queryApplicantValidator, changeApplicantValidator } = require("../validator/applicant.validator");

applicantRouter.get(  // Create a new application
    '/',
    validateDataDynamic(queryApplicantValidator),
    getApplicant
);
applicantRouter.post(  // Create a new application
    '/',
    validateDataDynamic(createApplicantValidator),
    checkUniqEmail,
    createApplicant
);

applicantRouter.put(  // Update an application
    '/:applicant_id',
    validateDataDynamic(changeApplicantValidator),
    checkIdMiddleware(Applicant, 'applicant_id'),
    checkUniqEmail,
    changeApplicantById
);
applicantRouter.delete(  // Delete an applicant
    '/:applicant_id',
    checkIdMiddleware(Applicant, 'applicant_id'),
    deleteApplicantById
);

module.exports = applicantRouter;
