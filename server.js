var express = require('express');
var bodyParser = require("body-parser");
var app = express();
var port = 3200;
var connection = require("./credentials");

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
});

// set the view engine to ejs
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

app.use(express.static(__dirname + "/public/"));

app.get('/', function (req, res) {
    res.render('pages/index');
});

app.listen(port, function(){
    console.log("listening on port: " + port);
  })