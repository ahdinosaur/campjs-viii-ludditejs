const Slide = require('shazam/slide')

module.exports = [
  Slide.md(`
## module

here's the CommonJS module system, as used and popularized by Node.js

\`\`\`js
// cat.js
module.exports = require('cat-names').random
\`\`\`
\`\`\`js
// cat-loop.js
const cat = require('./cat')

setInterval(() => {
  console.log(cat())
})
\`\`\`
  `),
  Slide.md(`
# [the module wrapper](https://nodejs.org/api/modules.html#modules_the_module_wrapper)

every module is actually wrapped in a closure

\`\`\`js
(function (exports, require, module, __filename, __dirname) {
  // your module code actually lives in here
})
\`\`\`
  `),
  Slide.md(`
# [how require works](https://github.com/maxogden/art-of-node#how-require-works)

> When you call \`require('some_module')\` in node here is what happens:
>
> 1. if a file called \`some_module.js\` exists in the current folder node will load that, otherwise:
> 2. node looks in the current folder for a \`node_modules\` folder with a \`some_module\` folder in it
> 3. if it doesn't find it, it will go up one folder and repeat step 2
>
> This cycle repeats until node reaches the root folder of the filesystem, at which point it will then check any global module folders (e.g. \`/usr/local/node_modules\` on Mac OS) and if it still doesn't find \`some_module\` it will throw an exception.
  `),
  Slide.md(`
# [the Node aesthetic](http://substack.net/node_aesthetic)

> - Callback austerity: Simplicity, asyncronous nature and nice additions that are included like the event system.
> - Limited surface area: Using modules instead of extending them, NPM, re-usable interfaces and simple, consistent function calls.
> - Batteries not included: Only few modules in the core distribution – reduces clutter, version dependencies and bureaucracy.
> - Radical reusability: Breaking up a problem in small pieces, NPM module locations, great versioning approach
  `),
  Slide.img('https://i.imgur.com/JaL9kyo.png')
]
