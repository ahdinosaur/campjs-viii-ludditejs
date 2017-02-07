const Slide = require('shazam/slide')

module.exports = Slide.md(`
# continuable

a "continuable" is a function that takes a single argument, a node-style (error-1st) callback.

\`\`\`js
const continuable = (cb) => {
  // do stuff...
  cb(err, data)
}
\`\`\`

- [\`continuable\`](https://github.com/Raynos/continuable)
- [\`cont\`](https://github.com/dominictarr/cont)
`)
