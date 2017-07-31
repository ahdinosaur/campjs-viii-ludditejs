# luddite.js

---

## hey [CampJS](http://campjs.com)

i'm [Mikey (@ahdinosaur)](http://dinosaur.is) from [Enspiral](http://enspiral.com)

<div class="row">
  <a href="http://dinosaur.is.com">
    <img alt="Mikey's avatar" src="./avatar.png" width="200" />
  </a>
  <a href="http://enspiral.com">
    <img alt="Enspiral logo" src="./enspiral.png" width="200" />
  </a>
</div>

slides are available at <http://dinosaur.is/campjs-viii-ludditejs>.

???

second time presenting at a conference.

i might say negative things about some JavaScript patterns, but i use those patterns too.

everyone in the JavaScript community is doing a wonderful job.

apologies in advance if i disguise any opinions as facts.

---

## what?

**luddite.js** is _simple decentralized JavaScript_.

???

but really a study of functional JavaScript patterns that have evolved in userland

---

## Luddite?

the [Luddites](https://en.wikipedia.org/wiki/Luddite) was a political movement against _automated centralized technology_.

<div style='display: flex; justify-content: center'>
  <img src="./luddite.jpg" height='400' />
</div>

???

- many Luddites were skilled machine operators in the textile industry
- they attacked centralized factories who used automated machines operated by unskilled labor
- they wanted machines to make high-quality goods, run by workers who had gone through an apprenticeship and got paid decent wages

---

## but JavaScript?

i'm going to talk about

- simple functional patterns
- decentralized userland ecosystems

???

- less coupling to trendy libraries, more function signature conventions: https://twitter.com/jekrb/status/859242655011745793
- top-down standards process
  - vs emergent (mad science) bottom-up module ecosystems
    - izs pants post

---

## simple functional patterns

what if i told you...

that you only needed plain functions and objects?

???

- no fancy syntax necessary
- less language clutter

----

## sync function syntax

```js
function fn (...args) { return value }
```

```js
const fn = (...args) => value
```

---

## sync function signals

with a sync function, there are two possible signals:

1. value: `return value`
2. error: `throw error`

???

```js
function fn (...args) { throw error }
```

```js
try {
  fn(...args)
} catch (const err) {
  // handle error
}
```

---

## require / module.exports =

```js
const thing = require('module')
module.exports = thing
```

```js
const { thing: thingy } = require('module')
module.exports = { thing: thingy }
```

---

## vs: import / export

```js
import thing from 'module'
import { thing as thingy } from 'module'
```

---

## hyperscript

```js
const h = require('react-hyperscript')

module.exports = Table

function Table ({ rows ) {
  return h('table.table', rows.map(row => {
    h('tr.row', row.map(item => {
      h('td.item', item)
    })
  })
}
```

???

- `React.createElement` is basically a strict hyperscript without the class/id sugar

---

## vs: hyperx

```js
const hyperx = require('hyperx')
const React = require('react')
const html = hyperx(React.createElement)
```

```js
module.exports = Table

function Table ({ rows ) {
  return html`<table class='table'>
    ${rows.map(row => {
      html`<tr class='row'>
        ${row.map(item => {
          html`<td class='item'>${item}</td>`
        })}
      </tr>`
    })}
  </table>`
}
```

---

## vs: jsx

```js
const React = require('react')

export default function Table ({ table }) {
  return <table className='table'>
    {table.map(row => {
      <tr className='row'>
        {row.map(item => {
          <td className='item'>{item}</td>
        })}
      </tr>
    })
  </table>
}
```

---

## redux

reducer:

```js
(state, action) => nextState
```

---

???

- actions
- reducers
- global state tree

---

## async function

```js
const request = require('request')
const parallel = require('run-parallel')

module.exports = fetchCats

function fetchCats ({ cats }, cb) {
  return parallel(cats.map(cat => {
    return request(cat, cb)
  }))
})
```

---

## promise

a "promise" is an eventual value

```js
const promise = new Promise((resolve, reject) => {
  // do stuff...
  resolve(value)
  // or
  reject(error)
}

???

```js
module.exports = fetchCats

function fetchCats ({ cats }) {
  return Promise.all(cats.map(cat => {
    return fetch(cat)
  }))
})
```

---

## continuable

a "continuable" is a function that takes a single argument, a node-style (error-1st) callback.

```js
const continuable = (cb) => {
  // do stuff...
  cb(null, data)
  // or
  cb(error)
}
```

???

a continuable is the callback version of a promise

- [`continuable`](https://github.com/Raynos/continuable)
- [`cont`](https://github.com/dominictarr/cont)


```js
const request = require('request')
const parallel = require('run-parallel')

module.exports = fetchCats

function fetchCats ({ cats }) {
  return cb => parallel(cats.map(cat => {
    return request(cat, cb)
  }))
})
```

---

## async errors

with a error-first callback, there are three possible signals:

1. value: `cb(null, value)`
2. user error: `cb(error)`
3. programmer error: `throw error`

???

promise errors smush the user and programmer errors together

---

## pull stream

???

- [history of streams](http://dominictarr.com/post/145135293917/history-of-streams)
- [pull stream examples](https://github.com/dominictarr/pull-stream-examples)
- [pull streams intro](http://dominictarr.com/post/149248845122/pull-streams-pull-streams-are-a-very-simple)
- [pull stream](https://pull-stream.github.io/)
- [pull stream workshop](https://github.com/pull-stream/pull-stream-workshop)

---

### source

```js
function values (array) {
  var i = 0
  function read (abort, callback) {
    if (abort || i === array.length) cb(true)
    else cb(null, array[i++]
  }
}
```

???

- look ma, just functions!

---

### sink

```js
function log (read) {
  read(null, function next (err, data) {
    if (err) return console.log(err)
    console.log(data)
    // recursively call read again!
    read(null, next)
  })
}
```

---

### through

```js
function map (mapper) {
  // a sink function: accept a source
  return function (read) {
    // but return another source!
    return function (abort, cb) {
      read(abort, function (err, data) {
        // if the stream has ended, pass that on.
        if (err) cb(err)
        // apply a mapping to that data
        else cb(null, mapper(data))
      })
    }
  }
}
```

---

## pull stream errors

with a pull stream source callback, there are four possible signals:

1. value: `cb(null, value)`
2. user error: `cb(error)`
3. programmer error: `throw error`
4. complete: `cb(true)`

???

- both the source and sink can signal back-pressure ("hey i'm busy") by not calling the respective callback

---

## stories

---

### catstack

build a framework alone from scratch

learnings:

- choose your battles
- one person team is anti-pattern

???

reinvent all the wheels!

---

### patch ecosystem

build an app with others, bring-your-own framework modules

learnings:

- do what you think #SomebodyShould do
- collaborate with active listening and empathy
