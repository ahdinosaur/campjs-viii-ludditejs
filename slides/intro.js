const Slide = require('shazam/slide')

module.exports = [
  Slide.md(`
## hi i'm [Mikey](http://dinosaur.is)

i'm going to talk about

# Luddite.js
`),
  Slide.md(`
# what?

this talk is a mashup of a few topics:

- why you only need simple functions and objects to build complex systems
- why the best modules should not have any added sugar
- how "mad science" led to the success of Node.js and thus JavaScript
- why TC39 (the committee behind ES6+) is bad for JavaScript
- why you should ignore "modern JavaScript" (promises, classes, \`async\` / \`await\`, generators, and beyond).
`)
]
