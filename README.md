# luddite.js

---

## hey [CampJS VIII](http://viii.campjs.com)

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

i'm going to attack some JavaScript patterns, but i use those patterns too.

everyone in the JavaScript community is doing a wonderful job.

apologies in advance if i disguise any opinions as facts.

---

## what?

**luddite.js** is _simple decentralized JavaScript_.

???

a study of JavaScript evolution

also totally made up

JavaScript was good

now it's popular

here's the beef

---

## Luddite?

the [Luddites](https://en.wikipedia.org/wiki/Luddite) was a political movement against _automated centralized technology_.

<img src="./luddite.jpeg" />

???

- many Luddites were skilled machine operators in the textile industry
- they attacked centralized factories who used automated machines operated by unskilled labor
- they wanted machines to make high-quality goods, run by workers who had gone through an apprenticeship and got paid decent wages

---

## but JavaScript?

at the

- simple primitives
- decentralized userland

???

- top-down standards process
  - vs emergent (mad science) bottom-up module ecosystems
    - izs pants post

## simple primitives

what if i told you...

that you only needed plain functions and objects?

???

- no fancy syntax
- less language clutter

----

## sync function syntax

```js
function fn (...args) { return value }
```

```js
const fn = (...args) => { return value }
```

```js
const fn = (...args) => value
```

```js
const fn = (...args) => ({ value })
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

## import / export

```js
import thing from 'module'
import { thing as thingy } from 'module'
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

a "promise" is an eventual values


a "continuable" is a function that takes a single argument, a node-style (error-1st) callback.

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

1. programmer error: `throw error`
2. value: `cb(null, value)`
3. user error: `cb(error)`

???

promise errors smush the user and programmer errors together

---

## redux

???

- actions
- reducers
- global state tree

---

## pull stream

---

### source

```js

```

---

## pull stream errors

with a pull stream callback, there are four possible signals:

1. programmer error: `throw error`
2. value: `cb(null, value)`
3. user error: `cb(error)`
4. complete: `cb(true)`


---

## stories

---

### catstack

---

### patch\*
