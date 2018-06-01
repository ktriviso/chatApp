const pgp = require('pg-promise')({
    query: q => console.log(q.query)
});
const dbconfig = require('./dbconfig');

module.exports = pgp(dbconfig);
