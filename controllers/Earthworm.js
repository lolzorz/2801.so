var body = []

exports.instance = body

exports.enqueue = function (url) {
  body.push(url)
}

exports.dequeue = function () {
  return body.splice(0, 1)[0]
}

exports.empty = function () {
  return body.length <= 0
}