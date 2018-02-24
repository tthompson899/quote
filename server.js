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
    connection.query('Select * from quotes', function(err, results){
      if (err) throw err; 

      // pick a random quote
      var randomQuote = Math.floor(Math.random() * results.length) + 1; 

      quote = results[randomQuote];

      console.log("Quote: ", quote);

      connection.query('select * from backgrounds',  function(err, bkgnd){
        if (err) throw err; 

        // pick a random background
        var randomBackground = Math.floor(Math.random() * bkgnd.length) + 6; 
        console.log("Random background " + randomBackground);
        background = bkgnd[randomBackground]; 
        console.log("Img: ", background);
        if (background === undefined){
          background = 'images/db_imgs/brick.png';
        } 

        // pass the quote and background to the index page
        res.render('pages/index', {
            'quote': quote,
            'background': background
        });

      });

    });

});

app.listen(port, function(){
    console.log("listening on port: " + port);
  })