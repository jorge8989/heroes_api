var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var app = express();
Hero = require('./models/hero');

app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});
app.set('port', process.env.port || 3010);
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/heroes');
var db = mongoose.connection;

app.get('/', function(req, res) {
  res.send('heores API');
});

app.listen(app.get('port'), function(){
  console.log('app running on port ' + app.get('port'));
});

app.get('/api/heroes', function(req, res) {
  Hero.getHeroes(function(err, heroes) {
    if (err) throw err;
    res.json({"data": heroes });
  });
})

app.get('/api/heroes/:_id', function(req, res) {
  Hero.findHero(req.params._id, function(err, hero) {
    if (err) throw err;
    res.json({"data": hero});
  });
});

app.post('/api/heroes', function(req, res) {
  Hero.addHero(req.body, function(err, hero) {
    if (err) throw err;
    res.json({"data": hero});
  });
});

app.delete('/api/heroes/:_id', function(req, res) {
  Hero.removeHero(req.params._id, function(err, hero) {
    if (err) throw err;
    res.json(hero);
  });
});

app.put('/api/heroes/:_id', function(req, res) {
  Hero.updateHero(req.params._id, req.body, function(err, hero) {
    if (err) throw err;
    res.json({"data": hero});
  });
});
