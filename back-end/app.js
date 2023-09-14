
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const http = require('http');
const cors = require('cors');
var Router = require("./routes/index");

require('dotenv').config();

const PORT = process.env.PORT;
const DBNAME = process.env.DBNAME;
const DBUSERNAME = process.env.DBUSERNAME;
const DBPASSWORD = process.env.DBPASSWORD;
const DBCOLLECTION = process.env.DBCOLLECTION;

const mongoURI = "mongodb://"+DBUSERNAME+":"+DBPASSWORD+"@localhost:27017/"+DBNAME;
console.log(mongoURI);

const app = express();

mongoose
    .connect(
        mongoURI, {
            useNewUrlParser: true, 
            useUnifiedTopology: true 
        },
    )
    .then(() => {
        console.log('MongoDB Connectedd');
    })
    .catch((err) => console.log(err,"app.js not connected"));

app.use(cors());

app.use('/public', express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use("/", Router);


http.createServer({}, app).listen(PORT, function() {
      console.log('App listening on port ' + PORT + '! Go to https://localhost:' + PORT + '/');
});
