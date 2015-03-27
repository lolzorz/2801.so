var cheerio = require('cheerio')

exports.analyze = function (html) {
  var $ = cheerio.load(html)
  
}