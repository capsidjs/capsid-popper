# capsid-popper v2.0.0

[![CircleCI](https://circleci.com/gh/capsidjs/capsid-popper.svg?style=svg)](https://circleci.com/gh/capsidjs/capsid-popper)
[![codecov](https://codecov.io/gh/capsidjs/capsid-popper/branch/master/graph/badge.svg)](https://codecov.io/gh/capsidjs/capsid-popper)
[![Greenkeeper badge](https://badges.greenkeeper.io/capsidjs/capsid-popper.svg)](https://greenkeeper.io/)

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

# Events

## `popper-update`

Dispatching `popper-update` event on `popper` components causes the update of the position calculation:

```
document.querySelectorAll('.popper').forEach(el => {
  el.dispatchEvent(new CustomEvent('popper-update'))
})
```

The above example updates all the popper components' layouts.

This is useful when you want to change the ref, the placement, or any other configuration of the component.

# History

- 2019-04-04 v2.0.0 Add `data-popper-modifiers`. Remove `data-popper-prevent-overflow` and `data-popper-flip`.
- 2019-04-04 v1.6.0 Add `data-popper-flip`.
- 2019-04-04 v1.5.0 Add `data-popper-prevent-overflow`.

# License

MIT

[capsid]: https://capsid.js.org
[popper]: https://popper.js.org
