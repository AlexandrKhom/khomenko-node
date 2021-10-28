const positionsRouter = require('express').Router();

const { Position } = require("../dataBase");
const { createPosition, getPositions, deletePositionById, getPositionsById, updatePositionById } = require("../controller/position.controller");
const { checkIdMiddleware } = require("../middleware/main.middleware");
const { validateDataDynamic } = require("../middleware/main.middleware");
const { queryPositionValidator, updatePositionValidator, createPositionValidator } = require("../validator/position.validator");

positionsRouter.get(  // Get list of all available positions in Japan
    '/',
    validateDataDynamic(queryPositionValidator),
    getPositions
);
positionsRouter.post(  // Create a new opened position
    '/',
    validateDataDynamic(createPositionValidator),
    createPosition
);

positionsRouter.get(  // Get position details by id
    '/:position_id',
    checkIdMiddleware(Position, 'position_id'),
    getPositionsById
);
positionsRouter.patch(  // Update a position (OPTIONAL)
    '/:position_id',
    validateDataDynamic(updatePositionValidator),
    checkIdMiddleware(Position, 'position_id'),
    updatePositionById
);
positionsRouter.delete(  // Close position and delete
    '/:position_id',
    checkIdMiddleware(Position, 'position_id'),
    deletePositionById
);

module.exports = positionsRouter;
