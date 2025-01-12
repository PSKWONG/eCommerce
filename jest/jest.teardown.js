const {pool} = require('../model/db'); 

module.exports = async () => {
  await pool.end();
};