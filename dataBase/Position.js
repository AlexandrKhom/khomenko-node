const {Schema, model} = require('mongoose');

const levelsEnum = require('../constant/levels.enum');
const categoriesEnum = require('../constant/categories.enum');

const positionSchema = new Schema({
    category: {
        type: String,
        required: true,
        enum: categoriesEnum,
        trim: true
    },
    level: {
        type: String,
        required: true,
        enum: levelsEnum,
        trim: true
    },
    company: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    japaneseRequired: {
        type: Boolean,
        required: true,
        trim: true
    },
}, {timestamps: true});

module.exports = model('position', positionSchema);
