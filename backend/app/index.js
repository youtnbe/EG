var express     = require("express");
var app         = express();
var bodyParser  = require("body-parser");
var cors        = require('cors');

var config = require('./config');

require('./dbinit');

app.use(require('cookie-parser')());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(require('./controllers'));

app.use(require('./errorHandler'));

app.listen(config.port, (err) => {
    if (err)
        throw err;
    else
        console.log('Running server at port 3000!');
});
