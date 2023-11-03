const mongoose = require('mongoose');
var connection = null;

/**
 *  Return a connection to MongoDB database.
 * @returns {mongoose.Connection}
 */
function getConnection() {
   if (connection == null) {
      connection = mongoose.createConnection('mongodb://127.0.0.1:27017/duolingo');
   }
   return connection;
}
module.exports = { getConnection };