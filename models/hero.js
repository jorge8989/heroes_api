var mongoose = require('mongoose');

var heroSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  create_date: {
    type: Date,
    default: Date.now
  }
});

var Hero = module.exports = mongoose.model('Hero', heroSchema);

module.exports.getHeroes = function(callback, limit) {
  Hero.find(callback).limit(limit);
}

module.exports.addHero = function(hero, callback) {
  Hero.create(hero, callback);
}

module.exports.removeHero = function(id, callback) {
  var query = {_id: id};
  Hero.remove(query, callback);
}

module.exports.findHero = function(id, callback) {
  var query = {_id: id};
  Hero.findById(query, callback);
}

module.exports.updateHero = function(id, hero, callback) {
  var query = {_id: id};
  var update = {
    name: hero.name
  };
  Hero.findOneAndUpdate(id, update, {new: true}, callback);
}

