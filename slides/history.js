const Slide = require('shazam/slide')

module.exports = [
  'first, some simplified history...',
  Slide.md(`
# 2009

## nobody cares about JavaScript

> it's a toy language

## Ryan Dahl (@ry) creates Node.js

[watch the original presentation](https://www.youtube.com/watch?v=ztspvPYybIY)

> To provide a *purely evented*, *non-blocking* infrastructure to script *highly concurrent* programs.

(original website [here](https://web.archive.org/web/20091003131634/http://nodejs.org/))
`),
  Slide.img('https://i.imgur.com/9JVtPV2.png')
]

// core-less node? https://github.com/nodejs/node/issues/7098
// https://github.com/nucleus-js/design
