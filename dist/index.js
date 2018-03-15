'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

var Popper = require('popper.js');

var UPDATE = 'update-popper';

/**
 * @param {Capsid} capsid The capsid object
 * @param {string} [name] The name of the component. Default `popper`
 */
exports.install = function (capsid) {
  var _dec, _desc, _value, _class;

  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      name = _ref.name;

  name = name || 'popper';

  /**
   * Popper component
   *
   * @example
   *   <div class="popper" data-popper-ref="#ref-el" data-popper-placement="left-start"></div>
   *
   * @see https://popper.js.org/popper-documentation.html#Popper.placements for available placements
   */
  var PopperComponent = (_dec = capsid.on(UPDATE), (_class = function () {
    function PopperComponent() {
      _classCallCheck(this, PopperComponent);
    }

    PopperComponent.prototype.__init__ = function __init__() {
      var _el$dataset = this.el.dataset,
          popperRef = _el$dataset.popperRef,
          popperPlacement = _el$dataset.popperPlacement;


      var parent = this.el.parentElement || document;

      var ref = parent.querySelector(popperRef);

      if (!ref) {
        throw new Error('popper reference not found: data-popper-ref="' + popperRef + '"');
      }

      if (!popperPlacement) {
        throw new Error('popper placement is not specified: data-popper-placement="' + popperPlacement + '"');
      }

      this.popper = new Popper(ref, this.el, {
        placement: popperPlacement
      });

      if (this.el.style.display === 'none') {
        this.el.style.display = '';
      }
    };

    PopperComponent.prototype.update = function update() {
      this.popper.scheduleUpdate();
    };

    return PopperComponent;
  }(), (_applyDecoratedDescriptor(_class.prototype, 'update', [_dec], Object.getOwnPropertyDescriptor(_class.prototype, 'update'), _class.prototype)), _class));


  capsid.def(name, PopperComponent);
};

exports.UPDATE = UPDATE;

/**
 * Updates all the popper components.
 */
exports.updateAll = function () {
  Array.prototype.forEach.call(document.querySelectorAll(''), function (el) {
    el.dispatchEvent(new CustomEvent(UPDATE));
  });
};

