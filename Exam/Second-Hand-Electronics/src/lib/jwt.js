const util = require("util");
const jsonwebtoken = require("jsonwebtoken");

const jswt = {
  sign: util.promisify(jsonwebtoken.sign),
  verify: util.promisify(jsonwebtoken.verify),
};

module.exports = jswt;
