const mongoose = require('mongoose');

//Define schema
var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        required: true
        
    }
}, {
        timestamps: true
    }
);

module.exports = mongoose.model('User', userSchema);