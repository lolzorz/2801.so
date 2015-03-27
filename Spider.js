// node modules
var request = require('request')

// my modules
var Cricket = require('./Cricket')
  , Earthworm
// global variables


var pool = {
  // attributes
  urls : {},
  size : 0, 
  maxSize : 5,
  // methods
  add : function (url) {
    if (!this.full()) {
      this.urls[url] = new Target(url)
      this.size++
    } 
  },
  destroy : function () {

  },
  full : function () {
    return this.size >= this.maxSize
  }
}

function Target (url) {
  this.url = url
  this.visited = false
}

function crawl (url, callback) {
  request(url, function (err, res, body) {
    if (!err && res.statusCode == 200) {
      Cricket.analyze(body)
      callback()
    } else {

    }
  })
}

// initialize pool 
exports.init = function (earthworm) {
  Earthworm = earthworm
  while (!pool.full() && !Earthworm.empty()) {
    pool.add(Earthworm.out())
  }
  for (url in pool.urls) {
    crawl(url, function () {
      console.log('done')
    })
  }
}