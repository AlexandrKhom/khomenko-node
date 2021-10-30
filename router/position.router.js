const positionsRouter = require('express').Router();

const { Position } = require("../dataBase");
const { createPosition, getPositions, deletePositionById, getPositionsById, updatePositionById } = require("../controller/position.controller");
const { checkIdMiddleware, validateDataDynamic } = require("../middleware/main.middleware");
const { queryPositionValidator, updatePositionValidator, createPositionValidator } = require("../validator/position.validator");

positionsRouter.get(  // Get list of all available positions in Japan
    '/',
    validateDataDynamic(queryPositionValidator),  // Middleware is dynamic and reused. Set validator
    getPositions
);
positionsRouter.post(  // Create a new opened position
    '/',
    validateDataDynamic(createPositionValidator),  // Middleware is dynamic and reused. Set validator
    createPosition
);

positionsRouter.get(  // Get position details by id
    '/:id',
    checkIdMiddleware(Position),                   // Middleware is dynamic and reused. Set DB schema
    getPositionsById
);
positionsRouter.patch(  // Update a position (OPTIONAL)
    '/:id',
    validateDataDynamic(updatePositionValidator),  // Middleware is dynamic and reused. Set validator
    checkIdMiddleware(Position),                   // Middleware is dynamic and reused. Set DB schema
    updatePositionById
);
positionsRouter.delete(  // Close position and delete
    '/:id',
    checkIdMiddleware(Position),                   // Middleware is dynamic and reused. Set DB schema
    deletePositionById
);

module.exports = positionsRouter;
