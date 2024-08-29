const { Parser } = require('json2csv');

exports.exportUsersToCSV = (users) => {
  const fields = ['_id', 'email', 'firstName', 'lastName'];
  const opts = { fields };

  try {
    const parser = new Parser(opts);
    const csv = parser.parse(users);
    return csv;
  } catch (err) {
    console.error(err);
    return '';
  }
};
