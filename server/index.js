const express = require('express');
//middlewares
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const Messages = require('./db/msgModel');

//create express app
const app = express();

//add morgan logger
app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res)=>{
    res.json({
        message: 'RUOSKA App!'
    });
});

app.get('/messages', (req, res)=>{
    Messages.GetMessages().then( (messages)=>{
        res.json(messages);
    });
});

app.get('/messages/:topics', (req, res)=>{
    Messages.GetTopics().then((topics)=>{
        res.json(topics);
    }).catch((err)=>{
        res.status(500);
        res.json(err);
    });
})

app.post('/messages', (req, res)=>{
    console.log(req.body);
    Messages.InsertMsg(req.body).then((message)=>{
        res.json(message);
    }).catch((err)=>{
        res.status(500);
        res.json(err);
    });
});

const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`Listening on ${port}`);
});