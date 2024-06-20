var express = require('express');
var router = express.Router();

var serverList = [];
console.log(serverList);
var exercise = function (date, move, reps, confid) {
  this.date = date;
  this.move = move;
  this.reps = reps;
  this.confid = confid;
  this.ID = Math.random().toString(16).slice(5);
}

var fs = require("fs");
let fileManager = {
  read: function () {
    var rawdata = fs.readFileSync('objectdata.json');
    let goodData = JSON.parse(rawdata);
    serverList = goodData;
  },
  write: function () {
    let data = JSON.stringify(serverList);
    fs.writeFileSync('objectdata.json', data);
  },
  validData: function () {
    var rawdata = fs.readFileSync('objectdata.json');
    console.log(rawdata.length);
    if (rawdata.length < 1) {
      return false;
    }
    else {
      return true;
    }
  }
};

router.get('/', function (req, res, next) {
  res.render('index', {title : 'Exercise Tracker'});
});

router.get('/getData', function(req, res){
  fileManager.read();
  res.status(200).json(serverList);
});

router.post('/addExercise', function(req, res){
  const newExercise = req.body;
  serverList.push(newExercise);
  fileManager.write();
  res.status(200).json(newExercise);
});




module.exports = router;
