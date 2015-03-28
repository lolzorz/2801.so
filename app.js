var Spider = require('./controllers/Spider')
  , Earthworm = require('./controllers/Earthworm')

// Earthworm.enqueue('http://www.baidu.com')
Earthworm.enqueue('http://www.hao123.com')
// Earthworm.enqueue('http://www.360.com')

Spider.init(Earthworm)