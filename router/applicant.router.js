const applicantRouter = require('express').Router();

const { Applicant } = require("../dataBase");
const { createApplicant, getApplicants, deleteApplicantById, changeApplicantById } = require("../controller/applicant.controller");
const { checkIdMiddleware, validateDataDynamic } = require("../middleware/main.middleware");
const { checkUniqEmail } = require("../middleware/applicant.middleware");
const { createApplicantValidator, queryApplicantValidator, changeApplicantValidator } = require("../validator/applicant.validator");

applicantRouter.get(  // Create a new application
    '/',
    validateDataDynamic(queryApplicantValidator),  // Middleware is dynamic and reused. Set validator
    getApplicants
);
applicantRouter.post(  // Create a new application
    '/',
    validateDataDynamic(createApplicantValidator),  // Middleware is dynamic and reused. Set validator
    checkUniqEmail,
    createApplicant
);

applicantRouter.put(  // Update an application
    '/:id',
    validateDataDynamic(changeApplicantValidator),  // Middleware is dynamic and reused. Set validator
    checkIdMiddleware(Applicant),                   // Middleware is dynamic and reused. Set DB schema
    checkUniqEmail,
    changeApplicantById
);
applicantRouter.delete(  // Delete an applicant
    '/:id',
    checkIdMiddleware(Applicant),                   // Middleware is dynamic and reused. Set DB schema
    deleteApplicantById
);

module.exports = applicantRouter;
