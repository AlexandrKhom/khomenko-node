const { Applicant, Position } = require("../dataBase");

module.exports = {
  getAllPosition: (query = {}) => {
    const keys = Object.keys(query);

    const filterObject = {};

    keys.forEach((key) => {
      switch (key) {
        case 'tag':
          filterObject.description = { $regex: query.tag, $options: 'i' };
          break;
        default:
          filterObject[key] = query[key];
      }
    });

    return Position.find(filterObject);
  },

  findApplicantForPosition: (position) => {
    const { level, category, japaneseRequired } = position;

    return Applicant
        .find({
          categories: { $in: category },
          level,
          $or: [{ japaneseKnowledge: true }, { japaneseKnowledge: japaneseRequired }]
        });
  }
}
