const Popper = require('popper.js')

/**
 * @param {Capsid} capsid The capsid object
 * @param {string} [name] The name of the component. Default `popper`
 */
exports.install = (capsid, { name } = {}) => {
  name = name || 'popper'

  /**
   * Popper component
   *
   * @example
   *   <div class="popper" data-popper-ref="#ref-el" data-popper-placement="left-start"></div>
   *
   * @see https://popper.js.org/popper-documentation.html#Popper.placements for available placements
   */
  class PopperComponent {
    __init__ () {
      const { popperRef, popperPlacement } = this.el.dataset

      const parent = this.el.parentElement || document

      const ref = parent.querySelector(popperRef)

      if (!ref) {
        throw new Error(`popper reference not found: data-popper-ref="${popperRef}"`)
      }

      if (!popperPlacement) {
        throw new Error(`popper placement is not specified: data-popper-placement="${popperPlacement}"`)
      }

      this.popper = new Popper(ref, this.el, {
        placement: popperPlacement
      })

      if (this.el.style.display === 'none') {
        this.el.style.display = ''
      }
    }

    @capsid.on('popper-update')
    update () {
      this.popper.scheduleUpdate()
    }
  }

  capsid.def(name, PopperComponent)
}
