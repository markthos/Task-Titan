const dayjs = require("dayjs");

const compare = (ticket) => {
  console.log("this", ticket)
  return ticket
}

const format_date = (date) => {
  return dayjs(date).format("MM/DD/YYYY");
};



module.exports = { compare, format_date };
