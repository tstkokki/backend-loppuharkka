const Joi = require('joi');
const db = require('./connection');

const Schema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    topic: Joi.string().required(),
    message: Joi.string().max(500).required(),
    imageUrl: Joi.string().uri({
        scheme: [/https?/]
    })
});

const Messages = db.get('Messages');

function GetMessages(){
    return Messages.find();
}

function InsertMsg(msg){
    var result = Schema.validate(msg);
    if(result.error == null){
        msg.created = new Date();
        return Messages.insert(msg);
    }
    else {
        return Promise.reject(result.error);
    }
}

module.exports = {
    GetMessages,
    InsertMsg
};