const Joi = require('joi');
const db = require('./connection');

const Schema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    topic: Joi.string().required(),
    message: Joi.string().max(500).required(),
    imageURL: Joi.string().uri({
        scheme: [
            /https?/
        ]
    })
});

const Messages = db.get('Messages');

function GetMessages(){
    return Messages.find();
}

function FindByValue({_key:_param}){
    return Messages.find({_key:_param});
}

function GetTopics(){
    return Messages.distinct('topic');
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
    FindByValue,
    GetTopics,
    InsertMsg
};