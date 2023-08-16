const dayjs = require("dayjs");

const compare = (leftValue, operator, rightValue, options) => {
  switch (operator) {
    case '==':
      return leftValue == rightValue ? options.fn(this) : options.inverse(this);
    case '===':
      return leftValue === rightValue ? options.fn(this) : options.inverse(this);
    case '!=':
      return leftValue != rightValue ? options.fn(this) : options.inverse(this);
    case '!==':
      return leftValue !== rightValue ? options.fn(this) : options.inverse(this);
    case '<':
      return leftValue < rightValue ? options.fn(this) : options.inverse(this);
    case '<=':
      return leftValue <= rightValue ? options.fn(this) : options.inverse(this);
    case '>':
      return leftValue > rightValue ? options.fn(this) : options.inverse(this);
    case '>=':
      return leftValue >= rightValue ? options.fn(this) : options.inverse(this);
    default:
      return options.inverse(this);
  }
};

const format_date = (date) => {
  return dayjs(date).format("MM/DD/YYYY");
};



module.exports = { compare, format_date };
