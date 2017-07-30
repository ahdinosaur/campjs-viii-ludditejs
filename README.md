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

## sync function

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

## sync function error

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

---

## vs: jsx

```js
const React = require('react')

export default function Table ({ rows ) {
  return <table className='table'>
    {rows.map(row => {
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

async function

---

continable

---

vs: promise

---

callback errors

---

promise errors

---

observ-able

---

vs: es observable

---

pull stream

---

vs: wg-streams

---

why am i picking on tc39?

---

top-down decision-making

---

bloat

- show code size of chrome
- fast software is less about building muscle and more about losing weight
  - refactor in less code, not more fancy code

---

snippet-driven development

- short snippets supposedly easier for beginners
  - i work at a developer bootcamp, i'm not so sure
    - too many ways to do something is confusing
    - not being able to understand the primitive is confusing

---

what is a standard?

- anything that enough people use is a "standard"

example: `feross/standard`

---

how to we do better standards?

less coupling to trendy libraries, more function signature conventions: https://twitter.com/jekrb/status/859242655011745793

---

### redux

---

### tc39

a great team advancing the state of the art in JavaScript,

but is one of _many_ possible JavaScript standards.

---

### what other standards?

---

what if i told you...

that anyone can make a JavaScript _standard_?

---

## standards in the wild

---

### Node.js core

---

#### `require`

---

#### `callback(error, result)`

???

- simple, less edge cases
  - for example, promise edge cases: https://pouchdb.com/2015/05/18/we-have-a-problem-with-promises.html
- callback hell vs promise hell

---

##### `async` ecosystem

to make callbacks sane

---

#### programmer errors

???

- promises deliberately break this paradigm: https://blog.domenic.me/youre-missing-the-point-of-promises/
- i blame promises because they capture any thrown errors, which means thrown programmer errors (syntax, bad args, ...) are now swallowed. - https://twitter.com/ahdinosaur/status/864782131666370560
- i'm curious how others deal with this. should i give up on simple intuition and embrace the new JS complexity with more complex dev tools? - https://twitter.com/ahdinosaur/status/864785376644218880
- complexity is cruise control for cool. look at how many things i can do! the technical singularity will save us from our debt, all good bro.

---

### Node.js userland


???


---

#### hyperscript

---

#### continuables

---

#### observ-ables

---

#### pull streams


???

- [history of streams](http://dominictarr.com/post/145135293917/history-of-streams)
- [pull stream examples](https://github.com/dominictarr/pull-stream-examples)
- [pull streams intro](http://dominictarr.com/post/149248845122/pull-streams-pull-streams-are-a-very-simple)
- [pull stream](https://pull-stream.github.io/)
- [pull stream workshop](https://github.com/pull-stream/pull-stream-workshop)

differences with node streams:

- something you can't do using node streams (and probably wg-streams too), return a partial stream pipeline: https://twitter.com/ahdinosaur/status/860057158934712320
- pull streams have pipeline error propagation by default, which is what `pump` does to get around node stream errors being per `.pipe()`.
- pull streams don't buffer by default, which is what `syncthrough` does to get around node stream buffers.


#### redux

#### http middleware

#### depject

## stories

### why

> When engineering is about “solving interesting problems” and never about why these are problems, you get stuff like Uber.

https://twitter.com/sanspoint/status/856185837582790655

### Node.js core

- https://developer.ibm.com/node/2017/04/20/keeping-node-js-core-small/


## references

- [The Post JavaScript Apocalypse - Douglas Crockford](https://www.youtube.com/watch?v=NPB34lDZj3E)
