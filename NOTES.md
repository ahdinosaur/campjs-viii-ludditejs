- function api's: (standards in userspace)
  - hyperscript
  - require
  - continuables (callbacks)
  - observ
  - pull stream
- ecosystems:
  - unobtrusive opinions: userspace modules
  - obtrusive / agressive opinions: es standards
    - promises (breaks `try catch`)
    - es modules (breaks `require`)
- you don't need the kitchen sink
  - browserify vs webpack: https://gist.github.com/substack/68f8d502be42d5cd4942
  - too much for one person to understand
  - babel all the things, really?
  - promises break debugging
  - snippet driven development
- ideology: pros and cons
  - require vs import / export


- arc?
  - what does luddite mean?
  - history of JS
    - es1-5
    - Node.js
    - es6+ tc39
  - Node.js-inspired userspace standards (vs tc39-inspired kitchen sink)
    - sync function
      - require
        - vs import / export
           - how many ways to import / export?
      - hyperscript
    - async function
      - continuable
        - debugging practices
          - how promises deliberately break these practices
      - observable
      - pull stream
    - interfaces
      - leveldown / up
      - browserify
    - stories
      - catstack
      - patchwork / bay


---

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

----
----

```

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

---

like framing

- here's luddite.js
  - we are against centralized committees and decion-making
  - gonna show some examples of the luddite way to do things
- there's a centralized committee making JavaScript standards
  - it's cool, but it's not the only way
  - here's how some people have been doing things for a while now
  - anyone can make standards
- here's the committee way to do X
  - here's the luddite way to do X
- at the end of the day, programming is supposed to be fun and anyone can play around with fun standards if they want.

- if you don't use fancy syntax (jsx, etc), you don't need fancy build steps

- add back es observables vs observ-ables
- move redux to be a quinteesential example of a function signature standard over fancy syntax or library

- acknowledge that pull streams could be its own talk
  - link to actual talks

---

- one slide has different header level text size
- work on transitions, hard to tell what each slide is saying
  - decentralized vs centralized
    - color code
    - altenate
  - section title slide for introducing concept ("eventual value", "dom elements", "reactive value", "values over time")
  - explain the pattern you are going to do in the talk ("sign post"), hey i'm going to 
  - "i might be a fanboy, but here's more dominic tarr"
  - luddite.js benefits -> why should you be a JavaScript luddite?
  - douglas englebart face on it's own slide
- catstack cringed
- ending slides weren't decisive, waffling, uncomfortable
- standards are just opinions
- could have stopped after "it's not about being right, it's about being successful"
  - add "as my Mom always says"
- shameless plug for Patchwork, get on Patchwork, with link
  - add a screenshot
- add contact details to opening and closing slides
- twitter handle in footer of every slide
