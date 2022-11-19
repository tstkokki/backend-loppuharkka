const monk = require('monk');
const url = 'localhost/ruoska';
const db = monk(url);


module.exports = db;