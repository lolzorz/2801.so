var body = []

exports.instance = body

exports.in = function (url) {
  body.push(url)
}

exports.out = function () {
  return body.splice(0, 1)[0]
}

exports.empty = function () {
  return body.length <= 0
}