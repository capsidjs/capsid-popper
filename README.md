# capsid-popper v1.0.1

[![CircleCI](https://circleci.com/gh/capsidjs/capsid-popper.svg?style=svg)](https://circleci.com/gh/capsidjs/capsid-popper)
[![codecov](https://codecov.io/gh/capsidjs/capsid-popper/branch/master/graph/badge.svg)](https://codecov.io/gh/capsidjs/capsid-popper)

> [capsid][] component for [popper][]

peer dependency: capsid >= 0.20.2, popper.js ^1.12.9

# Install

    npm install --save capsid-popper capsid popper.js

# Usage

Install the module to capsid:

```js
capsid.install(require('capsid-popper'))
```

Then place `popper` component:

```html
<div class="popper" data-popper-placement="left" data-popper-ref="#target">...</div>
```

This element works as a popper to the reference element with the given placement.

See [popper document][popper] for available placements.

# Options

Some install options are available.

```js
capsid.install(require('capsid-popper'), { name: 'name-of-popper-component' })
```

`name` property specifies the name of the component. Default `popper`. For example, if you pass `{ name: 'my-popper' }`, your popper component should be `<div class="my-popper" ...></div>`.

# License

MIT

[capsid]: https://capsid.js.org
[popper]: https://popper.js.org
