(function () {
  var Dropdown;

  (function(factory) {
      'use strict';
      if (typeof define === 'function' && define.amd) {
          define(['jquery'], factory);
      } else if (typeof exports !== 'undefined') {
          module.exports = factory(require('jquery'));
      } else {
          factory(jQuery);
      }
  }(function($) {

    var defaults = {
      trigger: "mouseover"
    };

    function clear() {
      $('.drd--toggle').parent().removeClass('is-open');
    };

    Dropdown = function (elem, options) {
      var onEventIn,
        onEventOut,
        self = this;

      this.options = $.extend({}, this.defaults, options, $(elem).data());

      this.element  = elem;
      this.parent   = $(elem).parent();
      this.menu     = $(elem).parent().find(".drd--menu");


      $(document).on('click', function (e) {
        if ($(e.target).is('.drd--menu') || $.contains(self.menu[0], e.target)) {
          return;
        }

        clear();
      });

      this._onTrigger();

      return this;
    };

    Dropdown.prototype._onTrigger = function () {
      var self = this,
        isActive;

      $(this.element).click(function (e) {
        e.stopPropagation();
        e.preventDefault();
        var isActive  = self.parent.hasClass('is-open');


        clear();
        !isActive && self.parent.toggleClass('is-open');
      });
    };

    Dropdown.prototype.defaults = defaults;

    $.plugin = function (name, Klass) {
      $.fn[name] = function (options) {
        return this.each(function () {
          var data = $.data(this, 'plugin_' + name),
            initOptions = $.extend({}, typeof options === 'object' && options),
            dataOptions = $(this).data(),
            extOptions = $.extend({}, Dropdown.prototype.defaults, initOptions, dataOptions);
          if (!data) {
            $.data(this, 'plugin_' + name, (data = new Klass(this, extOptions)));
          }
        });
      };
    };

    $.plugin('dropdown', Dropdown);
    $('[data-trigger=dropdown]').dropdown();

    return Dropdown;
  }));

  window.Flex = window.Flex || {};
  window.Flex.Dropdown = Dropdown;

}());
