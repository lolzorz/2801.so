var Spider = require('./Spider')
  , Earthworm = require('./Earthworm')

Earthworm.in('http://www.baidu.com')
Earthworm.in('http://www.hao123.com')
Earthworm.in('http://www.360.com')

Spider.init(Earthworm)