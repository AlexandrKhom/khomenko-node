const {Schema, model} = require('mongoose');

const categoriesEnum = require('../constant/categories.enum');
const levelsEnum = require('../constant/levels.enum');

const applicantSchema = new Schema({
    email: {
        type: String,
        required: true,
        trim: true
    },
    categories: {
        type: [String],
        required: true,
        enum: [...categoriesEnum],
        trim: true
    },
    japaneseKnowledge: {
        type: Boolean,
        required: true,
        trim: true
    },
    level: {
        type: String,
        required: true,
        enum: [...levelsEnum],
        trim: true
    }
}, {timestamps: true});

module.exports = model('applicant', applicantSchema);
