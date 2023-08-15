const dayjs = require("dayjs");

const compare = (variableOne, comparator, variableTwo) => {
  if (eval(one + comparator + two)) {
    return true;
  } else {
    return false;
  }
};

const format_date = (date) => {
  return dayjs(date).format("MM/DD/YYYY");
};

module.exports = { compare, format_date };
