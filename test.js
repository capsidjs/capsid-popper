const assert = require('assert')
const { describe, it, afterEach } = require('kocha')
const genel = require('genel')
const capsid = require('capsid')

describe('capsid-popper', () => {
  afterEach(() => {
    window.document.body.innerHTML = ''
  })

  it('can install', () => {
    capsid.install(require('./index'))
  })

  describe('popper component', () => {
    it('throws when data-popper-ref is not defined', () => {
      const el = genel.div``

      assert.throws(() => {
        capsid.make('popper', el)
      })
    })

    it('throws when data-popper-ref is defined but not found', () => {
      const el = genel.div``

      el.dataset.popperRef = 'section'

      assert.throws(() => {
        capsid.make('popper', el)
      })
    })

    it('throws when data-popper-placement is not defined', () => {
      document.body.appendChild(genel.p``)

      const el = genel.div``

      document.body.appendChild(el)

      el.dataset.popperRef = 'p'

      assert.throws(() => {
        capsid.make('popper', el)
      })
    })

    it('initializes the element with the given popper options', () => {
      const p = genel.p``

      document.body.appendChild(p)

      const el = genel.div``

      document.body.appendChild(el)

      el.dataset.popperRef = 'p'
      el.dataset.popperPlacement = 'bottom'

      capsid.make('popper', el)

      assert.strictEqual(el.getAttribute('x-placement'), 'bottom') // popper put this attribute
    })

    it('removes display none property if set', () => {
      const p = genel.p``

      document.body.appendChild(p)

      const el = genel.div``

      document.body.appendChild(el)

      el.dataset.popperRef = 'p'
      el.dataset.popperPlacement = 'bottom'
      el.style.display = 'none'

      capsid.make('popper', el)

      assert.strictEqual(el.style.display, '')
    })
  })
})
