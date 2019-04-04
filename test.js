const assert = require('assert')
const { describe, it, afterEach } = require('kocha')
const genel = require('genel')
const capsid = require('capsid')
const capsidPopper = require('./index')

describe('capsid-popper', () => {
  afterEach(() => {
    window.document.body.innerHTML = ''
  })

  it('can install', () => {
    capsid.install(capsidPopper)
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
      el.dataset.popperPlacement = 'top'

      capsid.make('popper', el)

      assert.strictEqual(el.getAttribute('x-placement'), 'top') // popper put this attribute
    })

    it('removes display none property if set', () => {
      const p = genel.p``

      document.body.appendChild(p)

      const el = genel.div``

      document.body.appendChild(el)

      el.dataset.popperRef = 'p'
      el.dataset.popperPlacement = 'top'
      el.style.display = 'none'

      capsid.make('popper', el)

      assert.strictEqual(el.style.display, '')
    })

    it('sets modifiers based on data-popper-modifiers', () => {
      const p = genel.p``

      document.body.appendChild(p)

      const el = genel.div``

      document.body.appendChild(el)

      el.dataset.popperRef = 'p'
      el.dataset.popperPlacement = 'top'
      el.dataset.popperModifiers = '{"preventOverflow":{"enabled": false}}'

      const popper = capsid.make('popper', el)

      const preventOverflow = popper.popper.modifiers.find(
        m => m.name === 'preventOverflow'
      )

      assert.strictEqual(preventOverflow.enabled, false)
    })

    describe('update', () => {
      it('updates the popper layout', () => {
        const p = genel.p``

        document.body.appendChild(p)

        const el = genel.div``

        document.body.appendChild(el)

        el.dataset.popperRef = 'p'
        el.dataset.popperPlacement = 'top'
        el.style.display = 'none'

        const popper = capsid.make('popper', el)

        popper.update()
        // TODO: assert something
      })
    })
  })

  describe('updateAll', () => {
    it('dispatches UPDATE event on .popper component', done => {
      const el = genel.div``
      el.classList.add('popper')
      el.addEventListener(capsidPopper.UPDATE, () => {
        done()
      })

      document.body.appendChild(el)

      capsidPopper.updateAll()
    })
  })
})
