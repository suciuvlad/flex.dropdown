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
      trigger: "mouseover",
      autoOpen: true
    };

    Dropdown = function (elem, options) {
      var onEventIn,
        onEventOut,
        self = this;

      this.options = $.extend({}, this.defaults, options, $(elem).data());

      this.element  = elem;
      this.parent   = $(elem).parent();
      this.menu     = $(elem).parent().find(".drd--menu");
      this.isOpen = false;


      $(document).on('click', function (e) {
        if ($(e.target).is('.drd--menu') || $.contains(self.menu[0], e.target)) {
          return;
        }

        self.hide();
      });

      this._setupBindings();

      return this;
    };

    Dropdown.prototype.show = function () {
      if (this.isOpen) { return; }
      this.isOpen = true;

      this.parent.addClass('is-open');

      return this;
    };

    Dropdown.prototype.hide = function () {

      if (!this.isOpen) { return; }
      this.isOpen = false;

      this.parent.removeClass('is-open');

      return this;

    };

    Dropdown.prototype._setupBindings = function () {
      var self = this;

      $(this.element).click(function (e) {
        e.stopPropagation();
        e.preventDefault();

        self.isOpen ? self.hide() : self.show();
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

          // It's an action such as `show`
          if (typeof options === 'string') {
            data[options]();
          } else if (extOptions.autoOpen) {
            data.show();
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
