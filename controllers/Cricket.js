// node modules
var cheerio = require('cheerio')

// my modules
var Earthworm

function extract (a) {
  for (var i in a) {
    if (parseInt(i) >= 0 && a[i].attribs.href.substring(0, 4) == 'http') {
      Earthworm.enqueue(a[i].attribs.href)
    }
  }
}

exports.init = function (earthworm) {
  Earthworm = earthworm
}

exports.analyze = function (html) {
  var $ = cheerio.load(html)
  extract($('a'))
}