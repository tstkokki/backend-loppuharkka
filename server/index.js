const express = require('express');
//middlewares
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const cookieParser = require('cookie-parser');

const Messages = require('./db/msgModel');
const Topics = require('./db/topicModel');
const UserLogin = require('./db/userlogin');
const User = require('./db/userModel');
const session = require('express-session');
const passport = require('passport');
const { body } = require('express-validator');
//create express app
const app = express();
//add morgan logger
app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({secret: 'super secret'}));

app.get('/', (req, res)=>{
    res.json({
        message: 'RUOSKA App!'
    });
});

app.get('/messages', (req, res)=>{
    Messages.GetMessages().then( (messages)=>{
        if(req.session.page_views){
            req.session.page_views++;
            console.log('Frequent user', req.session.page_views);
        } else {
            req.session.page_views = 1;
            console.log("Welcome");
        }
        res.json(messages);
    });
});

app.get('/messages/:topics', (req, res)=>{
    Topics.FindByValue({topic:"Maan yleisin alkuaine"}).then((topics)=>{
        res.json(topics);
    }).catch((err)=>{
        res.status(500);
        res.json(err);
    });
});

app.post('/messages/:topics', (req, res)=>{
    console.log(req.body);
    Topics.InsertMsg(req.body).then((message)=>{
        res.json(message);
    }).catch((err)=>{
        res.status(500);
        res.json(err);
    });
});

app.post('/messages/:newtopic', (req, res)=>{
    let topicobj = {topic:req.body.topic};
    Topics.InsertMsg(topicobj).then((message)=>{
        console.log(message);
    }).catch((err)=>{
        res.status(500);
        res.json(err);
    });
});

app.post('/messages', (req, res)=>{
    console.log(req.body);
    console.log(req.body.topic);
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