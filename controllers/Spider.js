// node modules
var request = require('request')
  , fs = require('fs')

// my modules
var Cricket = require('./Cricket')
  , Target = require('../models/Target')
  , Earthworm


// global variables
var count = 0
var pool = {
  // attributes
  urls : {},
  size : 0, 
  maxSize : 5,
  status : 'free',
  // methods
  add : function (url) {
    if (!this.full()) {
      this.urls[url] = new Target(url)
      this.size++
    } 
  },
  destroy : function (url) {
    delete this.urls[url]
  },
  full : function () {
    return this.size >= this.maxSize
  }
}

function crawl (url) {
  console.log('#' + (++count) + ': ' + url)
  fs.appendFile('urls', url + '\n')
  request(url, function (err, res, body) {
    if (!err && res.statusCode == 200) {
      Cricket.analyze(body)
      pool.destroy(url)
      if (!Earthworm.empty()) {
        crawl(Earthworm.dequeue())
      } else {
        pool.status = 'free'
      }
    } else {

    }
  })
}

// initialize pool 
exports.init = function (earthworm) {
  Earthworm = earthworm
  Cricket.init(Earthworm)
  while (!pool.full() && !Earthworm.empty()) {
    pool.add(Earthworm.dequeue())
  }
  for (url in pool.urls) {
    pool.status = 'busy'
    crawl(url)
  }
}