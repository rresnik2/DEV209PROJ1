var express = require('express');
var router = express.Router();

var fs = require("fs");
let fileManager = {
  read: function () {
    var rawdata = fs.readFileSync('objectdata.json');
    let goodData = JSON.parse(rawdata);
    serverArray = goodData;
  },
  write: function () {
    let data = JSON.stringify(serverArray);
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

if (!fileManager.validData()) {
  ServerArray.push(new MovieObject("MoonstruckXXX", 1981, "Drama",
    "Nicholas Cage", "Cher", "https://www.youtube.com/watch?v=M01_2CKL6PU"));
  ServerArray.push(new MovieObject("Wild At Heart", 1982, "Drama",
    "Nicholas Cage", "Laura VanDern",
    "https://www.youtube.com/watch?v=7uRJartX79Q"));
  ServerArray.push(new MovieObject("Raising Arizona", 1983, "Comedy",
    "Nicholas Cage", "Holly Hunter",
    "https://www.youtube.com/watch?v=NoXJKArYi1g"));
  ServerArray.push(new MovieObject("USS Indianapolis: Men of Courage",
    2016, "Drama", "Nicholas Cage", "Emily Tennant", "https://youtu.be/ZDPE-NronKk"));
fileManager.write();
}
else {
  fileManager.read(); // do have prior movies so load up the array
}


  /* GET home page. */
  router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
  });

  module.exports = router;
