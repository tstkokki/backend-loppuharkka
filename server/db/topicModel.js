const Joi = require('joi');
const db = require('./connection');

const Schema = Joi.object({
    topic: Joi.string().required(),
});

const Messages = db.get('Topics');

function GetMessages(){
    return Messages.find();
}

function FindByValue({_key:_param}){
    return Messages.find({_key:_param});
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
    InsertMsg
};