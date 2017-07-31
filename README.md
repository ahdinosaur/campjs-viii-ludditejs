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

- second time presenting at a conference.
- i might say negative things about some JavaScript patterns, but i use those patterns too
  - yes i'm bitter about some things, i'll try to be honest
- everyone in the JavaScript community is doing a wonderful job
- apologies in advance if i disguise any opinions as facts

---

## what?

luddite.js

???

so...

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
- they used fictious characters to make their story ring

---

## luddite.js?

**luddite.js** is a (made-up) meme for _simple decentralized JavaScript_.

- decentralized userland ecosystems
  - not centralized core committees
- simple patterns based on function signatures
  - not trendy libraries that lock you in

???

- gonna lead you on a journey through the luddite way to do things
- a study of functional JavaScript patterns that have evolved in userland

---

## decent userland

what if i told you...

that anyone can create a _standard_?

???

- no corporate sponsorship necessary

---

## what is a standard?

anything that enough people use is a "standard"

example: ["standard style"](https://github.com/feross/standard)

```
npm install --global standard
```

???

- tc39 is a great team advancing the state of the art in JavaScript,
  - but the standards produced by tc39 are only one of _many_ possible JavaScript standards.
- what other standards can you think of?
  - JS syntax: babel plugins
  - front-end: react
  - back-end: express
  - anything "best practice"

---

## what is a _luddite.js_ standard?

a standard based on a function signature

example: [Redux](https://redux.js.org) reducers

```js
const reducer = (state, action) => nextState
```

???

- standard function signature
- what other standards based on function signatures can you think of?
  - express / connect: (req, res, next)

---

## why is this important?

- easy to use and test
- accessible for anyone to participate
- no module lock-in

???

- you can test the functions directly without using the module
- you don't need anyone's approval to write a "function specification"
- you can swap libraries that are compatible with the "function specification"

---

## simple functional

what if i told you...

that you only needed _plain functions and objects_?

???

- no fancy syntax necessary
  - less language clutter
- how can we apply this pattern to the full stack?

---

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

## es module

also known as `import` and `export`

```js
import thing from 'module'

export default thing
```

```js
import { thing as thingy } from 'module'

export const thing = thingy
```

???

- why new syntax?
  - there's myths that es modules do something new
    - something about "tree shaking" 
  - anything possible with es modules is possible without
    - common shake
  - who knew developers were so superstitious
- what is happening here?
  - confusing to beginners who don't understand the special syntax and complex implementation details
- breaks CommonJS code with default
  - yes, i'm bitter about this, i've lost many hours debugging broken code, only to realize the module author published a patch version that broke the CommonJS exports

---

## vs. node modules

also known as `require` and `module.exports =`

```js
const thing = require('module')

module.exports = thing
```

```js
const { thing: thingy } = require('module')

module.exports = { thing: thingy }
```

???

- it's just a function!
- implementation details are simple:
  - `fs.readFileSync` the module file
  - wrap in closure to provide global variables like `require`, `module`, `exports`, `global`
  - run code in JavaScript interpreter
  - capture result of `module.exports` variable
- when i started using Node.js from Python, `require`-as-a-function is what excited me the most
  - so yes, i'm somewhat bitter that now JavaScript is adopting the same syntax as Python

---

## jsx

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

???

- made by Facebook to make React easier to use
- looks friendly on the surface, but underneath has non-obvious edge cases
  - hides that React is actually `React.createElement` function calls
  - "why can't i use `if () { first } else { second }`?
  - can only use expressions, not statements

---

## vs: hyperscript

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

???

- similar to JSX, but uses existing language features: tagged template string

---

## promise

a "promise" is an eventual value

```js
const promise = new Promise((resolve, reject) => {
  // do stuff...
  resolve(value)
  // oh no!
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

a "continuable" is a function that takes a single argument, a node-style error-first callback.

```js
const continuable = (cb) => {
  // do stuff...
  cb(null, data)
  // oh no!
  cb(error)
}
```

???

a continuable is the callback version of a promise

can be passed around as an "eventual value", same as promises. but without the resolved, pending, rejected state machine complexity.

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

with a node-style error-first callback, there are three possible signals:

1. value: `cb(null, value)`
2. user error: `cb(error)`
3. programmer error: `throw error`

???

- promise errors smush the user and programmer errors together
- promises wrap all your handlers in a `try` / `catch`, so even if you have a different opinion about error handling, promises will force it's opinion on you
  - yes, i'm bitter about this, i've lost many hours trying to figure out where my errors went

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

example:

```js
function values (array) {
  var i = 0
  return (abort, callback) => {
    if (abort || i === array.length) {
      callback(true)
    }
    else {
      cb(null, array[i++]
    }
  }
}
```

usage:

```js
const source = values([0, 1, 2, 3])

source(null, (err, value) {
  console.log('first value:', value)
})
// first value: 0
```

???

- look ma, just functions!
- yes, we are using callbacks even for synchronous results
  - much faster this way, no reason to delay til next tick

---

### sink

example:

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

usage:

```js
const source = values([0, 1, 2, 3])

log(source)
// 0
// 1
// 2
// 3
```

???

with continuables:

```js
function log (read) {
  return (cb) => {
    read(null, function next (err, data) {
      if (err) return cb(err)
      console.log(data)
      // recursively call read again!
      read(null, next)
    })
  }
}
```

---

### through

example:

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

usage:

```js
const source = values([0, 1, 2, 3])
const double = map(x => x * 2)

log(double(source))
```

---

### real pull streams

```
const pull = require('pull-stream')

pull(
  pull.values([0, 1, 2, 3]),
  pull.map(x => x * 2),
  pull.log()
)
```

???

- check out the ecosystem of modules at [pull-stream.github.io](https://pull-stream.github.io)

---

### pull stream errors

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

### story: catstack

build a framework alone from scratch

TODO catstack picture

???

reinvent all the wheels!

---

### reinventing wheels

for fun and learning

???

pros

- no better way to learn how systems work than by building them from scratch
- own your dependencies, don't consume them for granted
- provide consistent flavoring across subsystems

cons

- easy to become isolated
  - if you aren't enough to become popular, you're alone
- spreads you thin
  - hard to work on what you want, because you have to fix something else
- easy to rabbit hole
- probably miss the long tail: i18n, accessibility, tests
- always doing maintenance

---

### patch ecosystem

TODO patchwork logo

build an app with others, bring-your-own framework modules

???

learnings:

- do what you think #SomebodyShould do
- collaborate with active listening and empathy

---

### somebody should...

> if you see something that needs doing, it's your job to do

???

- mad science: find something worth doing, do it, publish, repeat

---

## conclusion

---

### so what

everyone has opinions.

this one is mine. :3

???

takaways

- izs pants post: https://groups.google.com/forum/#!msg/nodejs/MWaivVTirPY/0pnRjKsggkIJ
  - everyone has opinions, be aware of yours' and others'
  - when you come over to someone's house, be polite and respect their opinions
- don't force your opinions on others
  - share what you're passionate about
  - avoid persuading anyone that your way is better
- the luddite.js way is just another opinion, not better or worse than yours

### all the "standards"

make up your own "standards"!

you have just as much a right to make the next JavaScript standard as anyone else.

---

## thanks!

<3

https://dinosaur.is
