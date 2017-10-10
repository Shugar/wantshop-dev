(function() {
  'use strict';

  var globals = typeof global === 'undefined' ? self : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var aliases = {};
  var has = {}.hasOwnProperty;

  var expRe = /^\.\.?(\/|$)/;
  var expand = function(root, name) {
    var results = [], part;
    var parts = (expRe.test(name) ? root + '/' + name : name).split('/');
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function expanded(name) {
      var absolute = expand(dirname(path), name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var hot = hmr && hmr.createHot(name);
    var module = {id: name, exports: {}, hot: hot};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var expandAlias = function(name) {
    return aliases[name] ? expandAlias(aliases[name]) : name;
  };

  var _resolve = function(name, dep) {
    return expandAlias(expand(dirname(name), dep));
  };

  var require = function(name, loaderPath) {
    if (loaderPath == null) loaderPath = '/';
    var path = expandAlias(name);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    throw new Error("Cannot find module '" + name + "' from '" + loaderPath + "'");
  };

  require.alias = function(from, to) {
    aliases[to] = from;
  };

  var extRe = /\.[^.\/]+$/;
  var indexRe = /\/index(\.[^\/]+)?$/;
  var addExtensions = function(bundle) {
    if (extRe.test(bundle)) {
      var alias = bundle.replace(extRe, '');
      if (!has.call(aliases, alias) || aliases[alias].replace(extRe, '') === alias + '/index') {
        aliases[alias] = bundle;
      }
    }

    if (indexRe.test(bundle)) {
      var iAlias = bundle.replace(indexRe, '');
      if (!has.call(aliases, iAlias)) {
        aliases[iAlias] = bundle;
      }
    }
  };

  require.register = require.define = function(bundle, fn) {
    if (bundle && typeof bundle === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          require.register(key, bundle[key]);
        }
      }
    } else {
      modules[bundle] = fn;
      delete cache[bundle];
      addExtensions(bundle);
    }
  };

  require.list = function() {
    var list = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        list.push(item);
      }
    }
    return list;
  };

  var hmr = globals._hmr && new globals._hmr(_resolve, require, modules, cache);
  require._cache = cache;
  require.hmr = hmr && hmr.wrap;
  require.brunch = true;
  globals.require = require;
})();

(function() {
var global = typeof window === 'undefined' ? this : window;
var process;
var __makeRelativeRequire = function(require, mappings, pref) {
  var none = {};
  var tryReq = function(name, pref) {
    var val;
    try {
      val = require(pref + '/node_modules/' + name);
      return val;
    } catch (e) {
      if (e.toString().indexOf('Cannot find module') === -1) {
        throw e;
      }

      if (pref.indexOf('node_modules') !== -1) {
        var s = pref.split('/');
        var i = s.lastIndexOf('node_modules');
        var newPref = s.slice(0, i).join('/');
        return tryReq(name, newPref);
      }
    }
    return none;
  };
  return function(name) {
    if (name in mappings) name = mappings[name];
    if (!name) return;
    if (name[0] !== '.' && pref) {
      var val = tryReq(name, pref);
      if (val !== none) return val;
    }
    return require(name);
  }
};
require.register("7-tips-for-being-productive-with-matterlist.static.pug", function(exports, require, module) {

});

;require.register("about.static.pug", function(exports, require, module) {

});

;require.register("automatically-activated-contexts.static.pug", function(exports, require, module) {

});

;require.register("contacts.static.pug", function(exports, require, module) {

});

;require.register("features.static.pug", function(exports, require, module) {

});

;require.register("first-class-subtasks.static.pug", function(exports, require, module) {

});

;require.register("index.static.pug", function(exports, require, module) {

});

;require.register("infinite-timeline.static.pug", function(exports, require, module) {

});

;require.register("initialize.js", function(exports, require, module) {
'use strict';

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _sweetalert = require('sweetalert2');

var _sweetalert2 = _interopRequireDefault(_sweetalert);

var _swiper = require('swiper');

var _swiper2 = _interopRequireDefault(_swiper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function onCloseClick() {
  (0, _jquery2.default)('.menu-close').on('click', function (e) {
    e.stopPropagation();
    (0, _jquery2.default)('body').css('overflow', 'auto');

    (0, _jquery2.default)('.menu').css('display', 'none').show().removeClass('menu--active').delay(300).fadeOut(0);
  });
}

function onBurgerClick() {
  (0, _jquery2.default)('.menu-burger').on('click', function () {
    (0, _jquery2.default)('body').css('overflow', 'hidden');
    (0, _jquery2.default)('.menu').css('display', 'flex').hide().fadeIn(0).addClass('menu--active');
  });
}

function isSubscribed(data, onSuccess) {
  if (data.title === "Member Exists") {
    // ga('send', 'event', 'subscribe', 'alreadySubscribed');
    (0, _sweetalert2.default)({
      title: "Sorry",
      text: "The email is already in the list.",
      type: "warning"
    });
  } else if (data.status === 400) {
    (0, _sweetalert2.default)({
      title: "Error",
      text: data.detail,
      type: "warning"
    });
  } else {
    // ga('send', 'event', 'subscribe', 'success');
    // if (typeof yaCounter45756288 !== 'undefined')
    //   yaCounter45756288.reachGoal('SUBSCRIBE_SUCCESS');

    (0, _sweetalert2.default)({
      title: "Thank you!",
      text: "We've sent you a confirmation email",
      type: "success"
    });

    onSuccess();
  }
}

function checkEmptyEmail(userEmail) {
  if (userEmail === "") {
    (0, _sweetalert2.default)({
      title: "Please, enter your email address.",
      text: "",
      type: "error"
    });

    return false;
  }

  return true;
}

function subscribeEmail(userEmail, onSuccess) {
  if (checkEmptyEmail(userEmail)) {
    // ga('send', 'event', 'knopka', 'podtverdit');
    // ga('send', 'event', 'subscribe', 'buttonPress');
    // if (typeof yaCounter45756288 !== 'undefined')
    //   yaCounter45756288.reachGoal('SUBSCRIBE_CLICKED');
    _jquery2.default.post('/subscribe.php', {
      email: userEmail
    }, function (data) {
      isSubscribed(data, onSuccess);
    }).fail(function () {
      (0, _sweetalert2.default)({
        title: "Error",
        text: "Please, try again later.",
        type: "error"
      });
    });
  }
}

function isStringEmpty(element) {
  return (0, _jquery2.default)(element).val().trim() === '';
}

function contactForm() {
  if (isStringEmpty((0, _jquery2.default)('.contacts-name')) && isStringEmpty((0, _jquery2.default)('.contacts-contact')) && isStringEmpty((0, _jquery2.default)('.contacts-message'))) {
    return (0, _sweetalert2.default)({
      title: 'Error!',
      text: "Please fill in all fields",
      type: 'error'
    });
  }

  return _jquery2.default.ajax({
    type: 'POST',
    url: 'https://matterlist.com/ml-mailer.php',
    data: (0, _jquery2.default)('.contacts-form').serializeArray(),
    success: function success(data) {
      if (data.error) {
        return (0, _sweetalert2.default)({
          title: 'Error!',
          text: data.error,
          type: 'error'
        });
      }

      return (0, _sweetalert2.default)({
        title: 'Success!',
        text: "We'll contact you as soon as possible",
        type: 'success'
      });
    }
  });
}

(0, _jquery2.default)(document).on('click', '.js-email-subscribe-submit', function () {
  var userEmail = (0, _jquery2.default)('.js-email-subscribe-value').val();
  var onSuccess = function onSuccess() {
    (0, _jquery2.default)('.js-email-subscribe-value').val('');
  };
  subscribeEmail(userEmail, onSuccess);
});

(0, _jquery2.default)(document).on('click', '.contacts-submit', function (e) {
  e.preventDefault();
  contactForm();
});

(0, _jquery2.default)(document).ready(function () {
  onBurgerClick();
  onCloseClick();

  (0, _jquery2.default)('a[href^="#"]').on('click', function () {
    var el = (0, _jquery2.default)(this).attr('href');
    (0, _jquery2.default)('body').animate({ scrollTop: (0, _jquery2.default)(el).offset().top }, 500);
  });

  if ((0, _jquery2.default)('body').hasClass('home-page')) {
    var mySwiper = new _swiper2.default('.swiper-container', {
      direction: 'horizontal',
      pagination: '.swiper-pagination',
      nextButton: '.swiper-button-next',
      prevButton: '.swiper-button-prev',
      paginationClickable: true,
      loop: true
    });
  }
});

});

require.register("instant-fine-grained-postpone.static.pug", function(exports, require, module) {

});

;require.register("matterlist-as-a-wunderlist-alternative.static.pug", function(exports, require, module) {

});

;require.register("multi-line-todo-items.static.pug", function(exports, require, module) {

});

;require.register("pricing.static.pug", function(exports, require, module) {

});

;require.register("privacy-policy.static.pug", function(exports, require, module) {

});

;require.register("robust-recurring-tasks.static.pug", function(exports, require, module) {

});

;require.register("separate-hide-until-and-due-dates.static.pug", function(exports, require, module) {

});

;require.register("terms-and-conditions.static.pug", function(exports, require, module) {

});

;require.register("the-story-of-matterlist.static.pug", function(exports, require, module) {

});

;require.alias("process/browser.js", "process");process = require('process');require.register("___globals___", function(exports, require, module) {
  
});})();require('___globals___');


//# sourceMappingURL=app.js.map