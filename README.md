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

apologies in advance if i disguise any opinions as facts.

---

# what?

luddite.js is a JavaScript framework to make building apps fun again

---

## who are the Luddites?

[Luddites](https://en.wikipedia.org/wiki/Luddite) are people against _centralized technology_ which decreases quality of life.

---


## what is luddite.js?

a movement against _centralized standards_ which decreases developer experience

---

## what centralized standards?

---

### tc39

a great team advancing the state of the art in JavaScript,

but is one of _many_ possible opinions about JavaScript.

---

### what other opinions?

---

what if i told you...

that you only needed plain functions and objects?

---

### modules

```js
// randomCat.js
const { random: randomCat } = require('cat-names')

module.exports = randomCat
```

???

we first create a `const` variable from a sync `require` function.

we assign the result of this to a global variable `module.exports`

not the hundred million special syntaxes to import and export es modules


## functions

```js
// randomCatAsync.js
const randomCat = require('./randomCat')

module.exports = function randomCatAsync (cb) {
  try {
    cb(null, randomCat())
  } catch (err) {
    cb(err)
  }
}
---

## sync functions


```
function fn () {
  try {
    return value()
  } catch (err) {}
}
```

## async functions

### `cb(err, value())

## aids

- [eating your own dog food](https://en.wikipedia.org/wiki/Eating_your_own_dog_food)
- [mad science method](https://github.com/ahdinosaur/mad-science-handbook/blob/master/collaboration.md#the-mad-science-cycle)
- [do-ocracy](https://communitywiki.org/wiki/DoOcracy)
- marathon: keep a slow & steady pace one step at a time
- if you see a job that needs doing, it's your job to do (do-ocrarcy)
- too much sugar is bad for your health (simple interfaces)

## blocks

- cave method: try to design or implement the _perfect_ system before sharing it
- [design by committee](https://en.wikipedia.org/wiki/Design_by_committee)
- sprint: hype, mania, and burn-out
- [waterfall design](https://en.wikipedia.org/wiki/Waterfall_model)

---

# 2009

## nobody cares about JavaScript

> it's a toy language

---

## Ryan Dahl (@ry) creates Node.js

[watch the original presentation](https://www.youtube.com/watch?v=ztspvPYybIY)

> To provide a *purely evented*, *non-blocking* infrastructure to script *highly concurrent* programs.

(original website [here](https://web.archive.org/web/20091003131634/http://nodejs.org/))


???

// core-less node? https://github.com/nodejs/node/issues/7098
// https://github.com/nucleus-js/design

---

## function

```js
function (...args) {
  return value
}
```

---

## module

here's the CommonJS module system, as used and popularized by Node.js

```js
// cat.js
require('cat-names').random
```
```js
// cat-loop.js
const cat = require('./cat')

setInterval(() => {
  console.log(cat())
})
```

---

# [the module wrapper](https://nodejs.org/api/modules.html#modules_the_module_wrapper)

every module is actually wrapped in a closure

```js
(function (exports, require, module, __filename, __dirname) {
  // your module code actually lives in here
})
```

---

# [how require works](https://github.com/maxogden/art-of-node#how-require-works)

> When you call `require('some_module')` in node here is what happens:
>
> 1. if a file called `some_module.js` exists in the current folder node will load that, otherwise:
> 2. node looks in the current folder for a `node_modules` folder with a `some_module` folder in it
> 3. if it doesn't find it, it will go up one folder and repeat step 2
>
> This cycle repeats until node reaches the root folder of the filesystem, at which point it will then check any global module folders (e.g. `/usr/local/node_modules` on Mac OS) and if it still doesn't find `some_module` it will throw an exception.

---

# [the Node aesthetic](http://substack.net/node_aesthetic)

> - Callback austerity: Simplicity, asyncronous nature and nice additions that are included like the event system.
> - Limited surface area: Using modules instead of extending them, NPM, re-usable interfaces and simple, consistent function calls.
> - Batteries not included: Only few modules in the core distribution – reduces clutter, version dependencies and bureaucracy.
> - Radical reusability: Breaking up a problem in small pieces, NPM module locations, great versioning approach


---

# factory

> “The problem with object-oriented languages is they’ve got all this implicit environment that they carry around with them. You wanted a banana but what you got was a gorilla holding the banana and the entire jungle.” ~ Joe Armstrong

- [The Two Pillars of JavaScript Part 1: How to Escape the 7th Circle of Hell](https://medium.com/javascript-scene/the-two-pillars-of-javascript-ee6f3281e7f3)
- [`stampit`](https://github.com/stampit-org/stampit)

???

TODO two ways of handling errors: throw err and cb(err)
how it's important to throw 'programmer errors'

---

# callback

- [`run-series`](https://github.com/feross/run-series)
- [`run-parallel`](https://github.com/feross/run-parallel)
- [`run-auto`](https://github.com/feross/run-auto)
- [`run-waterfall`](https://github.com/feross/run-waterfall)

---

# continuable

a "continuable" is a function that takes a single argument, a node-style (error-1st) callback.

```js
const continuable = (cb) => {
  // do stuff...
  cb(err, data)
}
```

- [`continuable`](https://github.com/Raynos/continuable)
- [`cont`](https://github.com/dominictarr/cont)

---

# observable

> - `thing()` gets the value
> - `thing.set(...)` sets the value
> - `thing(function (value) { ... })` listens to the value.

- [`observ`](https://github.com/Raynos/observ)
- [`observable`](https://github.com/dominictarr/observable)
- [`push-stream`](https://github.com/ahdinosaur/push-stream)
- [`mutant`](https://github.com/mmckegg/mutant)

---

# stream

- [`pull-stream`](https://pull-stream.github.io)
- [pull streams](http://dominictarr.com/post/149248845122/pull-streams-pull-streams-are-a-very-simple)
- [pull-stream-examples](https://github.com/dominictarr/pull-stream-examples)

---

# references

- [es2040](https://github.com/ahdinosaur/es2040)
- [Art of Node](https://github.com/maxogden/art-of-node)
- [Art of I/O](http://ioschool.is/art-of-io/sessions/0/?notes=true)
- [Tiny Guide to Non Fancy Node](https://github.com/yoshuawuyts/tiny-guide-to-non-fancy-node)

???

TODO luddite.js apps:

- https://webtorrent.io/
- http://standardjs.com/
- https://peermaps.github.io/
- http://loopjs.com/
- https://scuttlebot.io/
- https://choo.io/
