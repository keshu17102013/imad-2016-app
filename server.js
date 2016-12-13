var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var bodyparser = require('body-parser');
var config = {
  user: 'keshu17102013',
  database: 'keshu17102013',
  host:'db.imad.hasura-app.io',
  port:'5432',
  password:process.env.DB_PASSWORD
};


var app = express();
app.use(morgan('combined'));



app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});
app.get('/signup', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', '/signup.html'));
});
app.get('/login', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', '/login.html'));
});

var pool = new Pool(config);

app.get('/testdb', function (req, res){
    //make a select request
    //return a response
    pool.query('SELECT*FROM test',function(err,result){
        if(err){
            res.status(500).send(err.toString());
        }
        else{
            res.send(JSON.stringify(result.rows));
            
        }
    });
    
});
app.post('/signup',function(req,res){
    
    res.send('hai');
    
}
);

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
