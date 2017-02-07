const test = require('tape')

const ludditejs = require('../')

test('ludditejs', function (t) {
  t.ok(ludditejs, 'module is require-able')
  t.end()
})
