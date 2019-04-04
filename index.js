const Popper = require('popper.js')

const UPDATE = 'update-popper'

let componentName

/**
 * @param {Capsid} capsid The capsid object
 * @param {string} [name] The name of the component. Default `popper`
 */
exports.install = (capsid, { name } = {}) => {
  componentName = name || 'popper'

  /**
   * Popper component
   *
   * @example
   *   <div class="popper" data-popper-ref="#ref-el" data-popper-placement="left-start"></div>
   *
   * @see https://popper.js.org/popper-documentation.html#Popper.placements for available placements
   */
  class PopperComponent {
    __mount__() {
      this.init()
    }

    parseJSON(json, propertyName) {
      if (!json) {
        return null
      }

      try {
        return JSON.parse(json)
      } catch (e) {
        console.warn(
          `Warning(capsid-popper): Can not parse the given json at ${propertyName}: ${json}`
        )
        return null
      }
    }

    init() {
      const { popperRef, popperPlacement, popperModifiers } = this.el.dataset

      const parent = this.el.parentElement || document
      const ref = parent.querySelector(popperRef)
      const modifiers = this.parseJSON(popperModifiers, 'data-popper-modifiers')

      if (!ref) {
        throw new Error(
          `popper reference not found: data-popper-ref="${popperRef}"`
        )
      }

      if (!popperPlacement) {
        throw new Error(
          `popper placement is not specified: data-popper-placement="${popperPlacement}"`
        )
      }

      this.popper = new Popper(ref, this.el, {
        placement: popperPlacement,
        modifiers
      })

      if (this.el.style.display === 'none') {
        this.el.style.display = ''
      }
    }

    @capsid.on(UPDATE)
    update() {
      if (this.popper) {
        this.popper.destroy()
        this.popper = null
      }
      this.init()
    }
  }

  capsid.def(componentName, PopperComponent)
}

exports.UPDATE = UPDATE

/**
 * Updates all the popper components.
 */
exports.updateAll = () => {
  Array.prototype.forEach.call(
    document.querySelectorAll(`.${componentName}`),
    el => {
      el.dispatchEvent(new CustomEvent(UPDATE))
    }
  )
}
