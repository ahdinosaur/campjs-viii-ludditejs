const getCatName = require('cat-names').random
const get = require('simple-get')

function Cat () {
  const name = getCatName()
  return (cb) => {
    readCatImage((err, image) => {
      cb(err, { name, image })
    })
  }
}

const cat = Cat()
cat((err, c) => console.log(c))

function readCatImage (cb) {
  get.concat('http://random.cat/meow', (err, res, data) => {
    if (err) return cb(err)
    try {
      var file = JSON.parse(data).file
    } catch (err) {
      return cb(err)
    }
    cb(null, file)
  })
}

