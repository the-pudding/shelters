// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"or4r":[function(require,module,exports) {
var global = arguments[3];
/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function() {
  return root.Date.now();
};

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        result = wait - timeSinceLastCall;

    return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
}

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

module.exports = debounce;

},{}],"WEtf":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// device sniffing for mobile
var isMobile = {
  android: function android() {
    return navigator.userAgent.match(/Android/i);
  },
  blackberry: function blackberry() {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  ios: function ios() {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  opera: function opera() {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  windows: function windows() {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function any() {
    return isMobile.android() || isMobile.blackberry() || isMobile.ios() || isMobile.opera() || isMobile.windows();
  }
};
var _default = isMobile;
exports.default = _default;
},{}],"xZJw":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/* global d3 */

/* usage
	import loadData from './load-data'
	loadData().then(result => {

	}).catch(console.error)
*/
function loadJSON(file) {
  return new Promise(function (resolve, reject) {
    d3.json("assets/data/".concat(file)).then(function (result) {
      // clean here
      resolve(result);
    }).catch(reject);
  });
}

function loadCSV(file) {
  return new Promise(function (resolve, reject) {
    d3.csv("assets/data/".concat(file)).then(function (result) {
      resolve(result);
    }).catch(reject);
  });
}

function loadExamples() {
  loadJSON('exampleDogs.json');
}

function loadExported() {
  loadCSV('exportedDogs.csv');
}

function loadMap() {
  var loads = [loadCSV('loc_centers.csv'), loadCSV('movement_paths.csv'), loadJSON('topo.json')];
  return Promise.all(loads);
}

var _default = {
  loadCSV: loadCSV,
  loadJSON: loadJSON,
  loadMap: loadMap // export default function loadData() {
  //   const loads = [loadJSON('exampleDogs.json'), loadCSV('exportedDogs.csv')];
  //   return Promise.all(loads);
  // }

};
exports.default = _default;
},{}],"TAPd":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _loadData = _interopRequireDefault(require("./load-data"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* global d3 */
// reader parameters
var readerState = null; // updating text selections

var $section = d3.selectAll('.intro');
var $state = d3.selectAll('.userState');
var $name = $section.selectAll('.exampleDog');
var $pOut = $section.selectAll('.intro-dog_out');
var $pIn = $section.selectAll('.intro-dog_in');
var $img = $section.selectAll('.intro-dog_image');
var $inCount = $section.selectAll('.inTotal');
var $outCount = $section.selectAll('.outTotal');
var $total = $section.selectAll('.stateTotal');
var $pupHerHis = $section.selectAll('.herhis');
var $pupSheHe = $section.selectAll('.shehe'); // constants

var exampleDogs = null;
var exportedDogs = null;
var readerDog = null;

function updateLocation(loc) {
  readerState = loc;
  filterDogs();
}

function filterDogs() {
  readerDog = exampleDogs.filter(function (d) {
    return d.current === readerState;
  }); // update state

  $state.text(readerState);
  $name.text(readerDog[0].name); // show appropriate text

  if (readerDog[0].imported === "TRUE") {
    $pOut.classed('is-visible', true);
    $pIn.classed('is-visible', false);
  } else {
    $pOut.classed('is-visible', false);
    $pIn.classed('is-visible', true);
  } // update counts


  $inCount.text(readerDog[0].count_imported);
  $outCount.text(readerDog[0].count_exported);
  $total.text(readerDog[0].total); // update pronouns

  var pupPronoun = readerDog[0].sex;
  $pupHerHis.text(pupPronoun === 'm' ? 'his' : 'her');
  $pupSheHe.text(pupPronoun === 'm' ? 'he' : 'she'); // add dog image

  $img.attr('src', readerDog[0].image);
} // code for determining user's location and subsequent data


function resize() {}

function init(loc) {
  _loadData.default.loadJSON('exampleDogs.json').then(function (result) {
    console.log({
      loc: loc
    });
    readerState = loc;
    exampleDogs = result;
    filterDogs();
  }).catch(console.error);
}

var _default = {
  init: init,
  resize: resize,
  updateLocation: updateLocation
};
exports.default = _default;
},{"./load-data":"xZJw"}],"HYmN":[function(require,module,exports) {
/*
 USAGE (example: line chart)
 1. c+p this template to a new file (line.js)
 2. change puddingChartName to puddingChartLine
 3. in graphic file: import './pudding-chart/line'
 4a. const charts = d3.selectAll('.thing').data(data).puddingChartLine();
 4b. const chart = d3.select('.thing').datum(datum).puddingChartLine();
*/
d3.selection.prototype.exportsByState = function init(options) {
  function createChart(el) {
    var $sel = d3.select(el);

    var _data = $sel.datum(); // dimension stuff


    var width = 0;
    var height = 0;
    var marginTop = 0;
    var marginBottom = 0;
    var marginLeft = 0;
    var marginRight = 0; // scales

    var scaleX = null;
    var scaleY = null; // dom elements

    var $svg = null;
    var $axis = null;
    var $vis = null;
    var $containerMini = null; // helper functions

    var Chart = {
      // called once at start
      init: function init() {
        Chart.resize();
        Chart.render();
      },
      // on resize, update new dimensions
      resize: function resize() {
        // defaults to grabbing dimensions from container element
        // width = $sel.node().offsetWidth - marginLeft - marginRight;
        // height = $sel.node().offsetHeight - marginTop - marginBottom;
        // $svg
        // 	.attr('width', width + marginLeft + marginRight)
        // 	.attr('height', height + marginTop + marginBottom);
        return Chart;
      },
      // update scales and render chart
      render: function render() {
        var $state = $sel.selectAll('.state').data(_data).join(function (enter) {
          var state = enter.append('div').attr('class', 'state');
          var $title = state.append('p').attr('class', 'state-name').text(function (d) {
            return d.key;
          });
          var $container = state.append('div').attr('class', 'container-mini');
          $container.selectAll('.dog').data(function (d) {
            return d.values;
          }).enter().append('div').attr('class', 'dog').style('background-image', function (d) {
            return "url(assets/images/profiles/".concat(d.file, ".png)");
          });
        }, function (exit) {
          exit.remove();
        }); //
        // const sorted = data.values
        // 	.sort((a, b) => d3.ascending(a.size, b.size))
        // 	.sort((a,b) => {
        // 		return d3.ascending(a.file, b.file)
        // 	})
        // $containerMini.selectAll('.dog')
        // 	.data(sorted)
        // 	.join(
        // 		enter => {
        // 			enter.append('div')
        // 				.attr('class', 'dog')
        // 				.style('background-image', d => `url(assets/images/profiles/${d.file}.png)`)
        // 		},
        // 		exit => {
        // 			exit.remove()
        // 		}
        // 	)

        return Chart;
      },
      // get / set data
      data: function data(val) {
        if (!arguments.length) return _data;
        _data = val;
        $sel.datum(_data);
        Chart.render();
        return Chart;
      }
    };
    Chart.init();
    return Chart;
  } // create charts


  var charts = this.nodes().map(createChart);
  return charts.length > 1 ? charts : charts.pop();
};
},{}],"sOMx":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _loadData = _interopRequireDefault(require("./load-data"));

require("./pudding-chart/exports-template");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* global d3 */
// reader parameters
var readerState = null; // updating text selections

var $section = d3.selectAll('.exported');
var $container = $section.selectAll('.figure-container');
var $moreButton = $section.select('.show-more');
var $transparency = $section.select('.transparency'); // constants

var exportedDogs = null;
var charts = null;

function setupExpand() {
  $moreButton.on('click', function () {
    var truncated = !$container.classed('is-expanded');
    var text = truncated ? 'Show Fewer' : 'Show All';
    $moreButton.text(text);
    $container.classed('is-expanded', truncated);

    if (!truncated) {
      var y = +$moreButton.attr('data-y');
      window.scrollTo(0, y);
    }

    $moreButton.attr('data-y', window.scrollY);
    $transparency.classed('is-visible', !truncated);
  });
}

function updateLocation(loc) {
  readerState = loc;
  var filteredExports = exportedDogs.filter(function (d) {
    return d.final_state === readerState;
  });
  var nestedExports = d3.nest().key(function (d) {
    return d.original_state;
  }).entries(filteredExports).sort(function (a, b) {
    return d3.descending(a.values.length, b.values.length);
  });
  charts.data(nestedExports); //filterDogs()
}

function filterDogs() {
  // filter exported dogs
  var filteredExports = exportedDogs.filter(function (d) {
    return d.final_state === readerState;
  });
  var nestedExports = d3.nest().key(function (d) {
    return d.original_state;
  }).entries(filteredExports).sort(function (a, b) {
    return d3.descending(a.values.length, b.values.length);
  });
  charts = $section.select('.figure-container').datum(nestedExports).exportsByState();
} // code for determining user's location and subsequent data


function resize() {}

function init(loc) {
  _loadData.default.loadCSV('exportedDogs.csv').then(function (result) {
    readerState = loc;
    exportedDogs = result;
    filterDogs(); // setup interaction with show more button

    setupExpand();
  }).catch(console.error);
}

var _default = {
  init: init,
  resize: resize,
  updateLocation: updateLocation
};
exports.default = _default;
},{"./load-data":"xZJw","./pudding-chart/exports-template":"HYmN"}],"v9Q8":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var fallbackData = [{
  image: '2018_02_stand-up',
  url: '2018/02/stand-up',
  hed: 'The Structure of Stand-Up Comedy'
}, {
  image: '2018_04_birthday-paradox',
  url: '2018/04/birthday-paradox',
  hed: 'The Birthday Paradox Experiment'
}, {
  image: '2018_11_boy-bands',
  url: '2018/11/boy-bands',
  hed: 'Internet Boy Band Database'
}, {
  image: '2018_08_pockets',
  url: '2018/08/pockets',
  hed: 'Women’s Pockets are Inferior'
}];
var storyData = null;

function loadJS(src, cb) {
  var ref = document.getElementsByTagName('script')[0];
  var script = document.createElement('script');
  script.src = src;
  script.async = true;
  ref.parentNode.insertBefore(script, ref);

  if (cb && typeof cb === 'function') {
    script.onload = cb;
  }

  return script;
}

function loadStories(cb) {
  var request = new XMLHttpRequest();
  var v = Date.now();
  var url = "https://pudding.cool/assets/data/stories.json?v=".concat(v);
  request.open('GET', url, true);

  request.onload = function () {
    if (request.status >= 200 && request.status < 400) {
      var data = JSON.parse(request.responseText);
      cb(data);
    } else cb(fallbackData);
  };

  request.onerror = function () {
    return cb(fallbackData);
  };

  request.send();
}

function createLink(d) {
  return "\n\t<a class='footer-recirc__article' href='https://pudding.cool/".concat(d.url, "' target='_blank'>\n\t\t<img class='article__img' src='https://pudding.cool/common/assets/thumbnails/640/").concat(d.image, ".jpg' alt='").concat(d.hed, "'>\n\t\t<p class='article__headline'>").concat(d.hed, "</p>\n\t</a>\n\t");
}

function recircHTML() {
  var url = window.location.href;
  var html = storyData.filter(function (d) {
    return !url.includes(d.url);
  }).slice(0, 4).map(createLink).join('');
  d3.select('.pudding-footer .footer-recirc__articles').html(html);
}

function setupSocialJS() {
  // facebook
  (function (d, s, id) {
    var js;
    var fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.src = '//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.7';
    fjs.parentNode.insertBefore(js, fjs);
  })(document, 'script', 'facebook-jssdk');

  loadJS('https://platform.twitter.com/widgets.js');
}

function init() {
  loadStories(function (data) {
    storyData = data;
    recircHTML();
    setupSocialJS();
  });
}

var _default = {
  init: init
};
exports.default = _default;
},{}],"osrT":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = [{
  state: 'Alabama',
  abbr: 'AL'
}, {
  state: 'Alaska',
  abbr: 'AK'
}, {
  state: 'Arizona',
  abbr: 'AZ'
}, {
  state: 'Arkansas',
  abbr: 'AR'
}, {
  state: 'California',
  abbr: 'CA'
}, {
  state: 'Colorado',
  abbr: 'CO'
}, {
  state: 'Connecticut',
  abbr: 'CT'
}, {
  state: 'Delaware',
  abbr: 'DE'
}, {
  state: 'District of Columbia',
  abbr: 'DC'
}, {
  state: 'Florida',
  abbr: 'FL'
}, {
  state: 'Georgia',
  abbr: 'GA'
}, {
  state: 'Hawaii',
  abbr: 'HI'
}, {
  state: 'Idaho',
  abbr: 'ID'
}, {
  state: 'Illinois',
  abbr: 'IL'
}, {
  state: 'Indiana',
  abbr: 'IN'
}, {
  state: 'Iowa',
  abbr: 'IA'
}, {
  state: 'Kansas',
  abbr: 'KS'
}, {
  state: 'Kentucky',
  abbr: 'KY'
}, {
  state: 'Louisiana',
  abbr: 'LA'
}, {
  state: 'Maine',
  abbr: 'ME'
}, {
  state: 'Montana',
  abbr: 'MT'
}, {
  state: 'Nebraska',
  abbr: 'NE'
}, {
  state: 'Nevada',
  abbr: 'NV'
}, {
  state: 'New Hampshire',
  abbr: 'NH'
}, {
  state: 'New Jersey',
  abbr: 'NJ'
}, {
  state: 'New Mexico',
  abbr: 'NM'
}, {
  state: 'New York',
  abbr: 'NY'
}, {
  state: 'North Carolina',
  abbr: 'NC'
}, {
  state: 'North Dakota',
  abbr: 'ND'
}, {
  state: 'Ohio',
  abbr: 'OH'
}, {
  state: 'Oklahoma',
  abbr: 'OK'
}, {
  state: 'Oregon',
  abbr: 'OR'
}, {
  state: 'Maryland',
  abbr: 'MD'
}, {
  state: 'Massachusetts',
  abbr: 'MA'
}, {
  state: 'Michigan',
  abbr: 'MI'
}, {
  state: 'Minnesota',
  abbr: 'MN'
}, {
  state: 'Mississippi',
  abbr: 'MS'
}, {
  state: 'Missouri',
  abbr: 'MO'
}, {
  state: 'Pennsylvania',
  abbr: 'PA'
}, {
  state: 'Rhode Island',
  abbr: 'RI'
}, {
  state: 'South Carolina',
  abbr: 'SC'
}, {
  state: 'South Dakota',
  abbr: 'SD'
}, {
  state: 'Tennessee',
  abbr: 'TN'
}, {
  state: 'Texas',
  abbr: 'TX'
}, {
  state: 'Utah',
  abbr: 'UT'
}, {
  state: 'Vermont',
  abbr: 'VT'
}, {
  state: 'Virginia',
  abbr: 'VA'
}, {
  state: 'Washington',
  abbr: 'WA'
}, {
  state: 'West Virginia',
  abbr: 'WV'
}, {
  state: 'Wisconsin',
  abbr: 'WI'
}, {
  state: 'Wyoming',
  abbr: 'WY'
}, {
  state: 'Washington DC',
  abbr: 'DC'
}];
exports.default = _default;
},{}],"tqbV":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default(x) {
  return x;
}
},{}],"KT2P":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _identity = _interopRequireDefault(require("./identity"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(transform) {
  if (transform == null) return _identity.default;
  var x0,
      y0,
      kx = transform.scale[0],
      ky = transform.scale[1],
      dx = transform.translate[0],
      dy = transform.translate[1];
  return function (input, i) {
    if (!i) x0 = y0 = 0;
    var j = 2,
        n = input.length,
        output = new Array(n);
    output[0] = (x0 += input[0]) * kx + dx;
    output[1] = (y0 += input[1]) * ky + dy;

    while (j < n) output[j] = input[j], ++j;

    return output;
  };
}
},{"./identity":"tqbV"}],"ZgyP":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _transform = _interopRequireDefault(require("./transform"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(topology) {
  var t = (0, _transform.default)(topology.transform),
      key,
      x0 = Infinity,
      y0 = x0,
      x1 = -x0,
      y1 = -x0;

  function bboxPoint(p) {
    p = t(p);
    if (p[0] < x0) x0 = p[0];
    if (p[0] > x1) x1 = p[0];
    if (p[1] < y0) y0 = p[1];
    if (p[1] > y1) y1 = p[1];
  }

  function bboxGeometry(o) {
    switch (o.type) {
      case "GeometryCollection":
        o.geometries.forEach(bboxGeometry);
        break;

      case "Point":
        bboxPoint(o.coordinates);
        break;

      case "MultiPoint":
        o.coordinates.forEach(bboxPoint);
        break;
    }
  }

  topology.arcs.forEach(function (arc) {
    var i = -1,
        n = arc.length,
        p;

    while (++i < n) {
      p = t(arc[i], i);
      if (p[0] < x0) x0 = p[0];
      if (p[0] > x1) x1 = p[0];
      if (p[1] < y0) y0 = p[1];
      if (p[1] > y1) y1 = p[1];
    }
  });

  for (key in topology.objects) {
    bboxGeometry(topology.objects[key]);
  }

  return [x0, y0, x1, y1];
}
},{"./transform":"KT2P"}],"bHWq":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default(array, n) {
  var t,
      j = array.length,
      i = j - n;

  while (i < --j) t = array[i], array[i++] = array[j], array[j] = t;
}
},{}],"OAzg":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
exports.feature = feature;
exports.object = object;

var _reverse = _interopRequireDefault(require("./reverse"));

var _transform = _interopRequireDefault(require("./transform"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(topology, o) {
  return o.type === "GeometryCollection" ? {
    type: "FeatureCollection",
    features: o.geometries.map(function (o) {
      return feature(topology, o);
    })
  } : feature(topology, o);
}

function feature(topology, o) {
  var id = o.id,
      bbox = o.bbox,
      properties = o.properties == null ? {} : o.properties,
      geometry = object(topology, o);
  return id == null && bbox == null ? {
    type: "Feature",
    properties: properties,
    geometry: geometry
  } : bbox == null ? {
    type: "Feature",
    id: id,
    properties: properties,
    geometry: geometry
  } : {
    type: "Feature",
    id: id,
    bbox: bbox,
    properties: properties,
    geometry: geometry
  };
}

function object(topology, o) {
  var transformPoint = (0, _transform.default)(topology.transform),
      arcs = topology.arcs;

  function arc(i, points) {
    if (points.length) points.pop();

    for (var a = arcs[i < 0 ? ~i : i], k = 0, n = a.length; k < n; ++k) {
      points.push(transformPoint(a[k], k));
    }

    if (i < 0) (0, _reverse.default)(points, n);
  }

  function point(p) {
    return transformPoint(p);
  }

  function line(arcs) {
    var points = [];

    for (var i = 0, n = arcs.length; i < n; ++i) arc(arcs[i], points);

    if (points.length < 2) points.push(points[0]); // This should never happen per the specification.

    return points;
  }

  function ring(arcs) {
    var points = line(arcs);

    while (points.length < 4) points.push(points[0]); // This may happen if an arc has only two points.


    return points;
  }

  function polygon(arcs) {
    return arcs.map(ring);
  }

  function geometry(o) {
    var type = o.type,
        coordinates;

    switch (type) {
      case "GeometryCollection":
        return {
          type: type,
          geometries: o.geometries.map(geometry)
        };

      case "Point":
        coordinates = point(o.coordinates);
        break;

      case "MultiPoint":
        coordinates = o.coordinates.map(point);
        break;

      case "LineString":
        coordinates = line(o.arcs);
        break;

      case "MultiLineString":
        coordinates = o.arcs.map(line);
        break;

      case "Polygon":
        coordinates = polygon(o.arcs);
        break;

      case "MultiPolygon":
        coordinates = o.arcs.map(polygon);
        break;

      default:
        return null;
    }

    return {
      type: type,
      coordinates: coordinates
    };
  }

  return geometry(o);
}
},{"./reverse":"bHWq","./transform":"KT2P"}],"40Q7":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default(topology, arcs) {
  var stitchedArcs = {},
      fragmentByStart = {},
      fragmentByEnd = {},
      fragments = [],
      emptyIndex = -1; // Stitch empty arcs first, since they may be subsumed by other arcs.

  arcs.forEach(function (i, j) {
    var arc = topology.arcs[i < 0 ? ~i : i],
        t;

    if (arc.length < 3 && !arc[1][0] && !arc[1][1]) {
      t = arcs[++emptyIndex], arcs[emptyIndex] = i, arcs[j] = t;
    }
  });
  arcs.forEach(function (i) {
    var e = ends(i),
        start = e[0],
        end = e[1],
        f,
        g;

    if (f = fragmentByEnd[start]) {
      delete fragmentByEnd[f.end];
      f.push(i);
      f.end = end;

      if (g = fragmentByStart[end]) {
        delete fragmentByStart[g.start];
        var fg = g === f ? f : f.concat(g);
        fragmentByStart[fg.start = f.start] = fragmentByEnd[fg.end = g.end] = fg;
      } else {
        fragmentByStart[f.start] = fragmentByEnd[f.end] = f;
      }
    } else if (f = fragmentByStart[end]) {
      delete fragmentByStart[f.start];
      f.unshift(i);
      f.start = start;

      if (g = fragmentByEnd[start]) {
        delete fragmentByEnd[g.end];
        var gf = g === f ? f : g.concat(f);
        fragmentByStart[gf.start = g.start] = fragmentByEnd[gf.end = f.end] = gf;
      } else {
        fragmentByStart[f.start] = fragmentByEnd[f.end] = f;
      }
    } else {
      f = [i];
      fragmentByStart[f.start = start] = fragmentByEnd[f.end = end] = f;
    }
  });

  function ends(i) {
    var arc = topology.arcs[i < 0 ? ~i : i],
        p0 = arc[0],
        p1;
    if (topology.transform) p1 = [0, 0], arc.forEach(function (dp) {
      p1[0] += dp[0], p1[1] += dp[1];
    });else p1 = arc[arc.length - 1];
    return i < 0 ? [p1, p0] : [p0, p1];
  }

  function flush(fragmentByEnd, fragmentByStart) {
    for (var k in fragmentByEnd) {
      var f = fragmentByEnd[k];
      delete fragmentByStart[f.start];
      delete f.start;
      delete f.end;
      f.forEach(function (i) {
        stitchedArcs[i < 0 ? ~i : i] = 1;
      });
      fragments.push(f);
    }
  }

  flush(fragmentByEnd, fragmentByStart);
  flush(fragmentByStart, fragmentByEnd);
  arcs.forEach(function (i) {
    if (!stitchedArcs[i < 0 ? ~i : i]) fragments.push([i]);
  });
  return fragments;
}
},{}],"P+Xw":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
exports.meshArcs = meshArcs;

var _feature = require("./feature");

var _stitch = _interopRequireDefault(require("./stitch"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(topology) {
  return (0, _feature.object)(topology, meshArcs.apply(this, arguments));
}

function meshArcs(topology, object, filter) {
  var arcs, i, n;
  if (arguments.length > 1) arcs = extractArcs(topology, object, filter);else for (i = 0, arcs = new Array(n = topology.arcs.length); i < n; ++i) arcs[i] = i;
  return {
    type: "MultiLineString",
    arcs: (0, _stitch.default)(topology, arcs)
  };
}

function extractArcs(topology, object, filter) {
  var arcs = [],
      geomsByArc = [],
      geom;

  function extract0(i) {
    var j = i < 0 ? ~i : i;
    (geomsByArc[j] || (geomsByArc[j] = [])).push({
      i: i,
      g: geom
    });
  }

  function extract1(arcs) {
    arcs.forEach(extract0);
  }

  function extract2(arcs) {
    arcs.forEach(extract1);
  }

  function extract3(arcs) {
    arcs.forEach(extract2);
  }

  function geometry(o) {
    switch (geom = o, o.type) {
      case "GeometryCollection":
        o.geometries.forEach(geometry);
        break;

      case "LineString":
        extract1(o.arcs);
        break;

      case "MultiLineString":
      case "Polygon":
        extract2(o.arcs);
        break;

      case "MultiPolygon":
        extract3(o.arcs);
        break;
    }
  }

  geometry(object);
  geomsByArc.forEach(filter == null ? function (geoms) {
    arcs.push(geoms[0].i);
  } : function (geoms) {
    if (filter(geoms[0].g, geoms[geoms.length - 1].g)) arcs.push(geoms[0].i);
  });
  return arcs;
}
},{"./feature":"OAzg","./stitch":"40Q7"}],"GEqj":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
exports.mergeArcs = mergeArcs;

var _feature = require("./feature");

var _stitch = _interopRequireDefault(require("./stitch"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function planarRingArea(ring) {
  var i = -1,
      n = ring.length,
      a,
      b = ring[n - 1],
      area = 0;

  while (++i < n) a = b, b = ring[i], area += a[0] * b[1] - a[1] * b[0];

  return Math.abs(area); // Note: doubled area!
}

function _default(topology) {
  return (0, _feature.object)(topology, mergeArcs.apply(this, arguments));
}

function mergeArcs(topology, objects) {
  var polygonsByArc = {},
      polygons = [],
      groups = [];
  objects.forEach(geometry);

  function geometry(o) {
    switch (o.type) {
      case "GeometryCollection":
        o.geometries.forEach(geometry);
        break;

      case "Polygon":
        extract(o.arcs);
        break;

      case "MultiPolygon":
        o.arcs.forEach(extract);
        break;
    }
  }

  function extract(polygon) {
    polygon.forEach(function (ring) {
      ring.forEach(function (arc) {
        (polygonsByArc[arc = arc < 0 ? ~arc : arc] || (polygonsByArc[arc] = [])).push(polygon);
      });
    });
    polygons.push(polygon);
  }

  function area(ring) {
    return planarRingArea((0, _feature.object)(topology, {
      type: "Polygon",
      arcs: [ring]
    }).coordinates[0]);
  }

  polygons.forEach(function (polygon) {
    if (!polygon._) {
      var group = [],
          neighbors = [polygon];
      polygon._ = 1;
      groups.push(group);

      while (polygon = neighbors.pop()) {
        group.push(polygon);
        polygon.forEach(function (ring) {
          ring.forEach(function (arc) {
            polygonsByArc[arc < 0 ? ~arc : arc].forEach(function (polygon) {
              if (!polygon._) {
                polygon._ = 1;
                neighbors.push(polygon);
              }
            });
          });
        });
      }
    }
  });
  polygons.forEach(function (polygon) {
    delete polygon._;
  });
  return {
    type: "MultiPolygon",
    arcs: groups.map(function (polygons) {
      var arcs = [],
          n; // Extract the exterior (unique) arcs.

      polygons.forEach(function (polygon) {
        polygon.forEach(function (ring) {
          ring.forEach(function (arc) {
            if (polygonsByArc[arc < 0 ? ~arc : arc].length < 2) {
              arcs.push(arc);
            }
          });
        });
      }); // Stitch the arcs into one or more rings.

      arcs = (0, _stitch.default)(topology, arcs); // If more than one ring is returned,
      // at most one of these rings can be the exterior;
      // choose the one with the greatest absolute area.

      if ((n = arcs.length) > 1) {
        for (var i = 1, k = area(arcs[0]), ki, t; i < n; ++i) {
          if ((ki = area(arcs[i])) > k) {
            t = arcs[0], arcs[0] = arcs[i], arcs[i] = t, k = ki;
          }
        }
      }

      return arcs;
    })
  };
}
},{"./feature":"OAzg","./stitch":"40Q7"}],"ogBt":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default(a, x) {
  var lo = 0,
      hi = a.length;

  while (lo < hi) {
    var mid = lo + hi >>> 1;
    if (a[mid] < x) lo = mid + 1;else hi = mid;
  }

  return lo;
}
},{}],"IE0s":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _bisect = _interopRequireDefault(require("./bisect"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(objects) {
  var indexesByArc = {},
      // arc index -> array of object indexes
  neighbors = objects.map(function () {
    return [];
  });

  function line(arcs, i) {
    arcs.forEach(function (a) {
      if (a < 0) a = ~a;
      var o = indexesByArc[a];
      if (o) o.push(i);else indexesByArc[a] = [i];
    });
  }

  function polygon(arcs, i) {
    arcs.forEach(function (arc) {
      line(arc, i);
    });
  }

  function geometry(o, i) {
    if (o.type === "GeometryCollection") o.geometries.forEach(function (o) {
      geometry(o, i);
    });else if (o.type in geometryType) geometryType[o.type](o.arcs, i);
  }

  var geometryType = {
    LineString: line,
    MultiLineString: polygon,
    Polygon: polygon,
    MultiPolygon: function (arcs, i) {
      arcs.forEach(function (arc) {
        polygon(arc, i);
      });
    }
  };
  objects.forEach(geometry);

  for (var i in indexesByArc) {
    for (var indexes = indexesByArc[i], m = indexes.length, j = 0; j < m; ++j) {
      for (var k = j + 1; k < m; ++k) {
        var ij = indexes[j],
            ik = indexes[k],
            n;
        if ((n = neighbors[ij])[i = (0, _bisect.default)(n, ik)] !== ik) n.splice(i, 0, ik);
        if ((n = neighbors[ik])[i = (0, _bisect.default)(n, ij)] !== ij) n.splice(i, 0, ij);
      }
    }
  }

  return neighbors;
}
},{"./bisect":"ogBt"}],"7UcE":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _identity = _interopRequireDefault(require("./identity"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(transform) {
  if (transform == null) return _identity.default;
  var x0,
      y0,
      kx = transform.scale[0],
      ky = transform.scale[1],
      dx = transform.translate[0],
      dy = transform.translate[1];
  return function (input, i) {
    if (!i) x0 = y0 = 0;
    var j = 2,
        n = input.length,
        output = new Array(n),
        x1 = Math.round((input[0] - dx) / kx),
        y1 = Math.round((input[1] - dy) / ky);
    output[0] = x1 - x0, x0 = x1;
    output[1] = y1 - y0, y0 = y1;

    while (j < n) output[j] = input[j], ++j;

    return output;
  };
}
},{"./identity":"tqbV"}],"hBDS":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _bbox = _interopRequireDefault(require("./bbox"));

var _untransform = _interopRequireDefault(require("./untransform"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(topology, transform) {
  if (topology.transform) throw new Error("already quantized");

  if (!transform || !transform.scale) {
    if (!((n = Math.floor(transform)) >= 2)) throw new Error("n must be ≥2");
    box = topology.bbox || (0, _bbox.default)(topology);
    var x0 = box[0],
        y0 = box[1],
        x1 = box[2],
        y1 = box[3],
        n;
    transform = {
      scale: [x1 - x0 ? (x1 - x0) / (n - 1) : 1, y1 - y0 ? (y1 - y0) / (n - 1) : 1],
      translate: [x0, y0]
    };
  } else {
    box = topology.bbox;
  }

  var t = (0, _untransform.default)(transform),
      box,
      key,
      inputs = topology.objects,
      outputs = {};

  function quantizePoint(point) {
    return t(point);
  }

  function quantizeGeometry(input) {
    var output;

    switch (input.type) {
      case "GeometryCollection":
        output = {
          type: "GeometryCollection",
          geometries: input.geometries.map(quantizeGeometry)
        };
        break;

      case "Point":
        output = {
          type: "Point",
          coordinates: quantizePoint(input.coordinates)
        };
        break;

      case "MultiPoint":
        output = {
          type: "MultiPoint",
          coordinates: input.coordinates.map(quantizePoint)
        };
        break;

      default:
        return input;
    }

    if (input.id != null) output.id = input.id;
    if (input.bbox != null) output.bbox = input.bbox;
    if (input.properties != null) output.properties = input.properties;
    return output;
  }

  function quantizeArc(input) {
    var i = 0,
        j = 1,
        n = input.length,
        p,
        output = new Array(n); // pessimistic

    output[0] = t(input[0], 0);

    while (++i < n) if ((p = t(input[i], i))[0] || p[1]) output[j++] = p; // non-coincident points


    if (j === 1) output[j++] = [0, 0]; // an arc must have at least two points

    output.length = j;
    return output;
  }

  for (key in inputs) outputs[key] = quantizeGeometry(inputs[key]);

  return {
    type: "Topology",
    bbox: box,
    transform: transform,
    objects: outputs,
    arcs: topology.arcs.map(quantizeArc)
  };
}
},{"./bbox":"ZgyP","./untransform":"7UcE"}],"ZeSf":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "bbox", {
  enumerable: true,
  get: function () {
    return _bbox.default;
  }
});
Object.defineProperty(exports, "feature", {
  enumerable: true,
  get: function () {
    return _feature.default;
  }
});
Object.defineProperty(exports, "mesh", {
  enumerable: true,
  get: function () {
    return _mesh.default;
  }
});
Object.defineProperty(exports, "meshArcs", {
  enumerable: true,
  get: function () {
    return _mesh.meshArcs;
  }
});
Object.defineProperty(exports, "merge", {
  enumerable: true,
  get: function () {
    return _merge.default;
  }
});
Object.defineProperty(exports, "mergeArcs", {
  enumerable: true,
  get: function () {
    return _merge.mergeArcs;
  }
});
Object.defineProperty(exports, "neighbors", {
  enumerable: true,
  get: function () {
    return _neighbors.default;
  }
});
Object.defineProperty(exports, "quantize", {
  enumerable: true,
  get: function () {
    return _quantize.default;
  }
});
Object.defineProperty(exports, "transform", {
  enumerable: true,
  get: function () {
    return _transform.default;
  }
});
Object.defineProperty(exports, "untransform", {
  enumerable: true,
  get: function () {
    return _untransform.default;
  }
});

var _bbox = _interopRequireDefault(require("./src/bbox"));

var _feature = _interopRequireDefault(require("./src/feature"));

var _mesh = _interopRequireWildcard(require("./src/mesh"));

var _merge = _interopRequireWildcard(require("./src/merge"));

var _neighbors = _interopRequireDefault(require("./src/neighbors"));

var _quantize = _interopRequireDefault(require("./src/quantize"));

var _transform = _interopRequireDefault(require("./src/transform"));

var _untransform = _interopRequireDefault(require("./src/untransform"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
},{"./src/bbox":"ZgyP","./src/feature":"OAzg","./src/mesh":"P+Xw","./src/merge":"GEqj","./src/neighbors":"IE0s","./src/quantize":"hBDS","./src/transform":"KT2P","./src/untransform":"7UcE"}],"wOZf":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

// Computes the bounding box of the specified hash of GeoJSON objects.
function _default(objects) {
  var x0 = Infinity,
      y0 = Infinity,
      x1 = -Infinity,
      y1 = -Infinity;

  function boundGeometry(geometry) {
    if (geometry != null && boundGeometryType.hasOwnProperty(geometry.type)) boundGeometryType[geometry.type](geometry);
  }

  var boundGeometryType = {
    GeometryCollection: function (o) {
      o.geometries.forEach(boundGeometry);
    },
    Point: function (o) {
      boundPoint(o.coordinates);
    },
    MultiPoint: function (o) {
      o.coordinates.forEach(boundPoint);
    },
    LineString: function (o) {
      boundLine(o.arcs);
    },
    MultiLineString: function (o) {
      o.arcs.forEach(boundLine);
    },
    Polygon: function (o) {
      o.arcs.forEach(boundLine);
    },
    MultiPolygon: function (o) {
      o.arcs.forEach(boundMultiLine);
    }
  };

  function boundPoint(coordinates) {
    var x = coordinates[0],
        y = coordinates[1];
    if (x < x0) x0 = x;
    if (x > x1) x1 = x;
    if (y < y0) y0 = y;
    if (y > y1) y1 = y;
  }

  function boundLine(coordinates) {
    coordinates.forEach(boundPoint);
  }

  function boundMultiLine(coordinates) {
    coordinates.forEach(boundLine);
  }

  for (var key in objects) {
    boundGeometry(objects[key]);
  }

  return x1 >= x0 && y1 >= y0 ? [x0, y0, x1, y1] : undefined;
}
},{}],"LEHr":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default(size, hash, equal, type, empty) {
  if (arguments.length === 3) {
    type = Array;
    empty = null;
  }

  var store = new type(size = 1 << Math.max(4, Math.ceil(Math.log(size) / Math.LN2))),
      mask = size - 1;

  for (var i = 0; i < size; ++i) {
    store[i] = empty;
  }

  function add(value) {
    var index = hash(value) & mask,
        match = store[index],
        collisions = 0;

    while (match != empty) {
      if (equal(match, value)) return true;
      if (++collisions >= size) throw new Error("full hashset");
      match = store[index = index + 1 & mask];
    }

    store[index] = value;
    return true;
  }

  function has(value) {
    var index = hash(value) & mask,
        match = store[index],
        collisions = 0;

    while (match != empty) {
      if (equal(match, value)) return true;
      if (++collisions >= size) break;
      match = store[index = index + 1 & mask];
    }

    return false;
  }

  function values() {
    var values = [];

    for (var i = 0, n = store.length; i < n; ++i) {
      var match = store[i];
      if (match != empty) values.push(match);
    }

    return values;
  }

  return {
    add: add,
    has: has,
    values: values
  };
}
},{}],"9NZr":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default(size, hash, equal, keyType, keyEmpty, valueType) {
  if (arguments.length === 3) {
    keyType = valueType = Array;
    keyEmpty = null;
  }

  var keystore = new keyType(size = 1 << Math.max(4, Math.ceil(Math.log(size) / Math.LN2))),
      valstore = new valueType(size),
      mask = size - 1;

  for (var i = 0; i < size; ++i) {
    keystore[i] = keyEmpty;
  }

  function set(key, value) {
    var index = hash(key) & mask,
        matchKey = keystore[index],
        collisions = 0;

    while (matchKey != keyEmpty) {
      if (equal(matchKey, key)) return valstore[index] = value;
      if (++collisions >= size) throw new Error("full hashmap");
      matchKey = keystore[index = index + 1 & mask];
    }

    keystore[index] = key;
    valstore[index] = value;
    return value;
  }

  function maybeSet(key, value) {
    var index = hash(key) & mask,
        matchKey = keystore[index],
        collisions = 0;

    while (matchKey != keyEmpty) {
      if (equal(matchKey, key)) return valstore[index];
      if (++collisions >= size) throw new Error("full hashmap");
      matchKey = keystore[index = index + 1 & mask];
    }

    keystore[index] = key;
    valstore[index] = value;
    return value;
  }

  function get(key, missingValue) {
    var index = hash(key) & mask,
        matchKey = keystore[index],
        collisions = 0;

    while (matchKey != keyEmpty) {
      if (equal(matchKey, key)) return valstore[index];
      if (++collisions >= size) break;
      matchKey = keystore[index = index + 1 & mask];
    }

    return missingValue;
  }

  function keys() {
    var keys = [];

    for (var i = 0, n = keystore.length; i < n; ++i) {
      var matchKey = keystore[i];
      if (matchKey != keyEmpty) keys.push(matchKey);
    }

    return keys;
  }

  return {
    set: set,
    maybeSet: maybeSet,
    // set if unset
    get: get,
    keys: keys
  };
}
},{}],"8/02":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default(pointA, pointB) {
  return pointA[0] === pointB[0] && pointA[1] === pointB[1];
}
},{}],"A6ov":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
// TODO if quantized, use simpler Int32 hashing?
var buffer = new ArrayBuffer(16),
    floats = new Float64Array(buffer),
    uints = new Uint32Array(buffer);

function _default(point) {
  floats[0] = point[0];
  floats[1] = point[1];
  var hash = uints[0] ^ uints[1];
  hash = hash << 5 ^ hash >> 7 ^ uints[2] ^ uints[3];
  return hash & 0x7fffffff;
}
},{}],"dSAC":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _hashset = _interopRequireDefault(require("./hash/hashset"));

var _hashmap = _interopRequireDefault(require("./hash/hashmap"));

var _pointEqual = _interopRequireDefault(require("./hash/point-equal"));

var _pointHash = _interopRequireDefault(require("./hash/point-hash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Given an extracted (pre-)topology, identifies all of the junctions. These are
// the points at which arcs (lines or rings) will need to be cut so that each
// arc is represented uniquely.
//
// A junction is a point where at least one arc deviates from another arc going
// through the same point. For example, consider the point B. If there is a arc
// through ABC and another arc through CBA, then B is not a junction because in
// both cases the adjacent point pairs are {A,C}. However, if there is an
// additional arc ABD, then {A,D} != {A,C}, and thus B becomes a junction.
//
// For a closed ring ABCA, the first point A’s adjacent points are the second
// and last point {B,C}. For a line, the first and last point are always
// considered junctions, even if the line is closed; this ensures that a closed
// line is never rotated.
function _default(topology) {
  var coordinates = topology.coordinates,
      lines = topology.lines,
      rings = topology.rings,
      indexes = index(),
      visitedByIndex = new Int32Array(coordinates.length),
      leftByIndex = new Int32Array(coordinates.length),
      rightByIndex = new Int32Array(coordinates.length),
      junctionByIndex = new Int8Array(coordinates.length),
      junctionCount = 0,
      // upper bound on number of junctions
  i,
      n,
      previousIndex,
      currentIndex,
      nextIndex;

  for (i = 0, n = coordinates.length; i < n; ++i) {
    visitedByIndex[i] = leftByIndex[i] = rightByIndex[i] = -1;
  }

  for (i = 0, n = lines.length; i < n; ++i) {
    var line = lines[i],
        lineStart = line[0],
        lineEnd = line[1];
    currentIndex = indexes[lineStart];
    nextIndex = indexes[++lineStart];
    ++junctionCount, junctionByIndex[currentIndex] = 1; // start

    while (++lineStart <= lineEnd) {
      sequence(i, previousIndex = currentIndex, currentIndex = nextIndex, nextIndex = indexes[lineStart]);
    }

    ++junctionCount, junctionByIndex[nextIndex] = 1; // end
  }

  for (i = 0, n = coordinates.length; i < n; ++i) {
    visitedByIndex[i] = -1;
  }

  for (i = 0, n = rings.length; i < n; ++i) {
    var ring = rings[i],
        ringStart = ring[0] + 1,
        ringEnd = ring[1];
    previousIndex = indexes[ringEnd - 1];
    currentIndex = indexes[ringStart - 1];
    nextIndex = indexes[ringStart];
    sequence(i, previousIndex, currentIndex, nextIndex);

    while (++ringStart <= ringEnd) {
      sequence(i, previousIndex = currentIndex, currentIndex = nextIndex, nextIndex = indexes[ringStart]);
    }
  }

  function sequence(i, previousIndex, currentIndex, nextIndex) {
    if (visitedByIndex[currentIndex] === i) return; // ignore self-intersection

    visitedByIndex[currentIndex] = i;
    var leftIndex = leftByIndex[currentIndex];

    if (leftIndex >= 0) {
      var rightIndex = rightByIndex[currentIndex];

      if ((leftIndex !== previousIndex || rightIndex !== nextIndex) && (leftIndex !== nextIndex || rightIndex !== previousIndex)) {
        ++junctionCount, junctionByIndex[currentIndex] = 1;
      }
    } else {
      leftByIndex[currentIndex] = previousIndex;
      rightByIndex[currentIndex] = nextIndex;
    }
  }

  function index() {
    var indexByPoint = (0, _hashmap.default)(coordinates.length * 1.4, hashIndex, equalIndex, Int32Array, -1, Int32Array),
        indexes = new Int32Array(coordinates.length);

    for (var i = 0, n = coordinates.length; i < n; ++i) {
      indexes[i] = indexByPoint.maybeSet(i, i);
    }

    return indexes;
  }

  function hashIndex(i) {
    return (0, _pointHash.default)(coordinates[i]);
  }

  function equalIndex(i, j) {
    return (0, _pointEqual.default)(coordinates[i], coordinates[j]);
  }

  visitedByIndex = leftByIndex = rightByIndex = null;
  var junctionByPoint = (0, _hashset.default)(junctionCount * 1.4, _pointHash.default, _pointEqual.default),
      j; // Convert back to a standard hashset by point for caller convenience.

  for (i = 0, n = coordinates.length; i < n; ++i) {
    if (junctionByIndex[j = indexes[i]]) {
      junctionByPoint.add(coordinates[j]);
    }
  }

  return junctionByPoint;
}
},{"./hash/hashset":"LEHr","./hash/hashmap":"9NZr","./hash/point-equal":"8/02","./hash/point-hash":"A6ov"}],"ubT2":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _join = _interopRequireDefault(require("./join"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Given an extracted (pre-)topology, cuts (or rotates) arcs so that all shared
// point sequences are identified. The topology can then be subsequently deduped
// to remove exact duplicate arcs.
function _default(topology) {
  var junctions = (0, _join.default)(topology),
      coordinates = topology.coordinates,
      lines = topology.lines,
      rings = topology.rings,
      next,
      i,
      n;

  for (i = 0, n = lines.length; i < n; ++i) {
    var line = lines[i],
        lineMid = line[0],
        lineEnd = line[1];

    while (++lineMid < lineEnd) {
      if (junctions.has(coordinates[lineMid])) {
        next = {
          0: lineMid,
          1: line[1]
        };
        line[1] = lineMid;
        line = line.next = next;
      }
    }
  }

  for (i = 0, n = rings.length; i < n; ++i) {
    var ring = rings[i],
        ringStart = ring[0],
        ringMid = ringStart,
        ringEnd = ring[1],
        ringFixed = junctions.has(coordinates[ringStart]);

    while (++ringMid < ringEnd) {
      if (junctions.has(coordinates[ringMid])) {
        if (ringFixed) {
          next = {
            0: ringMid,
            1: ring[1]
          };
          ring[1] = ringMid;
          ring = ring.next = next;
        } else {
          // For the first junction, we can rotate rather than cut.
          rotateArray(coordinates, ringStart, ringEnd, ringEnd - ringMid);
          coordinates[ringEnd] = coordinates[ringStart];
          ringFixed = true;
          ringMid = ringStart; // restart; we may have skipped junctions
        }
      }
    }
  }

  return topology;
}

function rotateArray(array, start, end, offset) {
  reverse(array, start, end);
  reverse(array, start, start + offset);
  reverse(array, start + offset, end);
}

function reverse(array, start, end) {
  for (var mid = start + (end-- - start >> 1), t; start < mid; ++start, --end) {
    t = array[start], array[start] = array[end], array[end] = t;
  }
}
},{"./join":"dSAC"}],"5gQu":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _hashmap = _interopRequireDefault(require("./hash/hashmap"));

var _pointEqual = _interopRequireDefault(require("./hash/point-equal"));

var _pointHash = _interopRequireDefault(require("./hash/point-hash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Given a cut topology, combines duplicate arcs.
function _default(topology) {
  var coordinates = topology.coordinates,
      lines = topology.lines,
      line,
      rings = topology.rings,
      ring,
      arcCount = lines.length + rings.length,
      i,
      n;
  delete topology.lines;
  delete topology.rings; // Count the number of (non-unique) arcs to initialize the hashmap safely.

  for (i = 0, n = lines.length; i < n; ++i) {
    line = lines[i];

    while (line = line.next) ++arcCount;
  }

  for (i = 0, n = rings.length; i < n; ++i) {
    ring = rings[i];

    while (ring = ring.next) ++arcCount;
  }

  var arcsByEnd = (0, _hashmap.default)(arcCount * 2 * 1.4, _pointHash.default, _pointEqual.default),
      arcs = topology.arcs = [];

  for (i = 0, n = lines.length; i < n; ++i) {
    line = lines[i];

    do {
      dedupLine(line);
    } while (line = line.next);
  }

  for (i = 0, n = rings.length; i < n; ++i) {
    ring = rings[i];

    if (ring.next) {
      // arc is no longer closed
      do {
        dedupLine(ring);
      } while (ring = ring.next);
    } else {
      dedupRing(ring);
    }
  }

  function dedupLine(arc) {
    var startPoint, endPoint, startArcs, startArc, endArcs, endArc, i, n; // Does this arc match an existing arc in order?

    if (startArcs = arcsByEnd.get(startPoint = coordinates[arc[0]])) {
      for (i = 0, n = startArcs.length; i < n; ++i) {
        startArc = startArcs[i];

        if (equalLine(startArc, arc)) {
          arc[0] = startArc[0];
          arc[1] = startArc[1];
          return;
        }
      }
    } // Does this arc match an existing arc in reverse order?


    if (endArcs = arcsByEnd.get(endPoint = coordinates[arc[1]])) {
      for (i = 0, n = endArcs.length; i < n; ++i) {
        endArc = endArcs[i];

        if (reverseEqualLine(endArc, arc)) {
          arc[1] = endArc[0];
          arc[0] = endArc[1];
          return;
        }
      }
    }

    if (startArcs) startArcs.push(arc);else arcsByEnd.set(startPoint, [arc]);
    if (endArcs) endArcs.push(arc);else arcsByEnd.set(endPoint, [arc]);
    arcs.push(arc);
  }

  function dedupRing(arc) {
    var endPoint, endArcs, endArc, i, n; // Does this arc match an existing line in order, or reverse order?
    // Rings are closed, so their start point and end point is the same.

    if (endArcs = arcsByEnd.get(endPoint = coordinates[arc[0]])) {
      for (i = 0, n = endArcs.length; i < n; ++i) {
        endArc = endArcs[i];

        if (equalRing(endArc, arc)) {
          arc[0] = endArc[0];
          arc[1] = endArc[1];
          return;
        }

        if (reverseEqualRing(endArc, arc)) {
          arc[0] = endArc[1];
          arc[1] = endArc[0];
          return;
        }
      }
    } // Otherwise, does this arc match an existing ring in order, or reverse order?


    if (endArcs = arcsByEnd.get(endPoint = coordinates[arc[0] + findMinimumOffset(arc)])) {
      for (i = 0, n = endArcs.length; i < n; ++i) {
        endArc = endArcs[i];

        if (equalRing(endArc, arc)) {
          arc[0] = endArc[0];
          arc[1] = endArc[1];
          return;
        }

        if (reverseEqualRing(endArc, arc)) {
          arc[0] = endArc[1];
          arc[1] = endArc[0];
          return;
        }
      }
    }

    if (endArcs) endArcs.push(arc);else arcsByEnd.set(endPoint, [arc]);
    arcs.push(arc);
  }

  function equalLine(arcA, arcB) {
    var ia = arcA[0],
        ib = arcB[0],
        ja = arcA[1],
        jb = arcB[1];
    if (ia - ja !== ib - jb) return false;

    for (; ia <= ja; ++ia, ++ib) if (!(0, _pointEqual.default)(coordinates[ia], coordinates[ib])) return false;

    return true;
  }

  function reverseEqualLine(arcA, arcB) {
    var ia = arcA[0],
        ib = arcB[0],
        ja = arcA[1],
        jb = arcB[1];
    if (ia - ja !== ib - jb) return false;

    for (; ia <= ja; ++ia, --jb) if (!(0, _pointEqual.default)(coordinates[ia], coordinates[jb])) return false;

    return true;
  }

  function equalRing(arcA, arcB) {
    var ia = arcA[0],
        ib = arcB[0],
        ja = arcA[1],
        jb = arcB[1],
        n = ja - ia;
    if (n !== jb - ib) return false;
    var ka = findMinimumOffset(arcA),
        kb = findMinimumOffset(arcB);

    for (var i = 0; i < n; ++i) {
      if (!(0, _pointEqual.default)(coordinates[ia + (i + ka) % n], coordinates[ib + (i + kb) % n])) return false;
    }

    return true;
  }

  function reverseEqualRing(arcA, arcB) {
    var ia = arcA[0],
        ib = arcB[0],
        ja = arcA[1],
        jb = arcB[1],
        n = ja - ia;
    if (n !== jb - ib) return false;
    var ka = findMinimumOffset(arcA),
        kb = n - findMinimumOffset(arcB);

    for (var i = 0; i < n; ++i) {
      if (!(0, _pointEqual.default)(coordinates[ia + (i + ka) % n], coordinates[jb - (i + kb) % n])) return false;
    }

    return true;
  } // Rings are rotated to a consistent, but arbitrary, start point.
  // This is necessary to detect when a ring and a rotated copy are dupes.


  function findMinimumOffset(arc) {
    var start = arc[0],
        end = arc[1],
        mid = start,
        minimum = mid,
        minimumPoint = coordinates[mid];

    while (++mid < end) {
      var point = coordinates[mid];

      if (point[0] < minimumPoint[0] || point[0] === minimumPoint[0] && point[1] < minimumPoint[1]) {
        minimum = mid;
        minimumPoint = point;
      }
    }

    return minimum - start;
  }

  return topology;
}
},{"./hash/hashmap":"9NZr","./hash/point-equal":"8/02","./hash/point-hash":"A6ov"}],"vdug":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

// Given an array of arcs in absolute (but already quantized!) coordinates,
// converts to fixed-point delta encoding.
// This is a destructive operation that modifies the given arcs!
function _default(arcs) {
  var i = -1,
      n = arcs.length;

  while (++i < n) {
    var arc = arcs[i],
        j = 0,
        k = 1,
        m = arc.length,
        point = arc[0],
        x0 = point[0],
        y0 = point[1],
        x1,
        y1;

    while (++j < m) {
      point = arc[j], x1 = point[0], y1 = point[1];
      if (x1 !== x0 || y1 !== y0) arc[k++] = [x1 - x0, y1 - y0], x0 = x1, y0 = y1;
    }

    if (k === 1) arc[k++] = [0, 0]; // Each arc must be an array of two or more positions.

    arc.length = k;
  }

  return arcs;
}
},{}],"B+s3":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

// Extracts the lines and rings from the specified hash of geometry objects.
//
// Returns an object with three properties:
//
// * coordinates - shared buffer of [x, y] coordinates
// * lines - lines extracted from the hash, of the form [start, end]
// * rings - rings extracted from the hash, of the form [start, end]
//
// For each ring or line, start and end represent inclusive indexes into the
// coordinates buffer. For rings (and closed lines), coordinates[start] equals
// coordinates[end].
//
// For each line or polygon geometry in the input hash, including nested
// geometries as in geometry collections, the `coordinates` array is replaced
// with an equivalent `arcs` array that, for each line (for line string
// geometries) or ring (for polygon geometries), points to one of the above
// lines or rings.
function _default(objects) {
  var index = -1,
      lines = [],
      rings = [],
      coordinates = [];

  function extractGeometry(geometry) {
    if (geometry && extractGeometryType.hasOwnProperty(geometry.type)) extractGeometryType[geometry.type](geometry);
  }

  var extractGeometryType = {
    GeometryCollection: function (o) {
      o.geometries.forEach(extractGeometry);
    },
    LineString: function (o) {
      o.arcs = extractLine(o.arcs);
    },
    MultiLineString: function (o) {
      o.arcs = o.arcs.map(extractLine);
    },
    Polygon: function (o) {
      o.arcs = o.arcs.map(extractRing);
    },
    MultiPolygon: function (o) {
      o.arcs = o.arcs.map(extractMultiRing);
    }
  };

  function extractLine(line) {
    for (var i = 0, n = line.length; i < n; ++i) coordinates[++index] = line[i];

    var arc = {
      0: index - n + 1,
      1: index
    };
    lines.push(arc);
    return arc;
  }

  function extractRing(ring) {
    for (var i = 0, n = ring.length; i < n; ++i) coordinates[++index] = ring[i];

    var arc = {
      0: index - n + 1,
      1: index
    };
    rings.push(arc);
    return arc;
  }

  function extractMultiRing(rings) {
    return rings.map(extractRing);
  }

  for (var key in objects) {
    extractGeometry(objects[key]);
  }

  return {
    type: "Topology",
    coordinates: coordinates,
    lines: lines,
    rings: rings,
    objects: objects
  };
}
},{}],"k2Ou":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

// Given a hash of GeoJSON objects, returns a hash of GeoJSON geometry objects.
// Any null input geometry objects are represented as {type: null} in the output.
// Any feature.{id,properties,bbox} are transferred to the output geometry object.
// Each output geometry object is a shallow copy of the input (e.g., properties, coordinates)!
function _default(inputs) {
  var outputs = {},
      key;

  for (key in inputs) outputs[key] = geomifyObject(inputs[key]);

  return outputs;
}

function geomifyObject(input) {
  return input == null ? {
    type: null
  } : (input.type === "FeatureCollection" ? geomifyFeatureCollection : input.type === "Feature" ? geomifyFeature : geomifyGeometry)(input);
}

function geomifyFeatureCollection(input) {
  var output = {
    type: "GeometryCollection",
    geometries: input.features.map(geomifyFeature)
  };
  if (input.bbox != null) output.bbox = input.bbox;
  return output;
}

function geomifyFeature(input) {
  var output = geomifyGeometry(input.geometry),
      key; // eslint-disable-line no-unused-vars

  if (input.id != null) output.id = input.id;
  if (input.bbox != null) output.bbox = input.bbox;

  for (key in input.properties) {
    output.properties = input.properties;
    break;
  }

  return output;
}

function geomifyGeometry(input) {
  if (input == null) return {
    type: null
  };
  var output = input.type === "GeometryCollection" ? {
    type: "GeometryCollection",
    geometries: input.geometries.map(geomifyGeometry)
  } : input.type === "Point" || input.type === "MultiPoint" ? {
    type: input.type,
    coordinates: input.coordinates
  } : {
    type: input.type,
    arcs: input.coordinates
  }; // TODO Check for unknown types?

  if (input.bbox != null) output.bbox = input.bbox;
  return output;
}
},{}],"31b3":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default(objects, bbox, n) {
  var x0 = bbox[0],
      y0 = bbox[1],
      x1 = bbox[2],
      y1 = bbox[3],
      kx = x1 - x0 ? (n - 1) / (x1 - x0) : 1,
      ky = y1 - y0 ? (n - 1) / (y1 - y0) : 1;

  function quantizePoint(input) {
    return [Math.round((input[0] - x0) * kx), Math.round((input[1] - y0) * ky)];
  }

  function quantizePoints(input, m) {
    var i = -1,
        j = 0,
        n = input.length,
        output = new Array(n),
        // pessimistic
    pi,
        px,
        py,
        x,
        y;

    while (++i < n) {
      pi = input[i];
      x = Math.round((pi[0] - x0) * kx);
      y = Math.round((pi[1] - y0) * ky);
      if (x !== px || y !== py) output[j++] = [px = x, py = y]; // non-coincident points
    }

    output.length = j;

    while (j < m) j = output.push([output[0][0], output[0][1]]);

    return output;
  }

  function quantizeLine(input) {
    return quantizePoints(input, 2);
  }

  function quantizeRing(input) {
    return quantizePoints(input, 4);
  }

  function quantizePolygon(input) {
    return input.map(quantizeRing);
  }

  function quantizeGeometry(o) {
    if (o != null && quantizeGeometryType.hasOwnProperty(o.type)) quantizeGeometryType[o.type](o);
  }

  var quantizeGeometryType = {
    GeometryCollection: function (o) {
      o.geometries.forEach(quantizeGeometry);
    },
    Point: function (o) {
      o.coordinates = quantizePoint(o.coordinates);
    },
    MultiPoint: function (o) {
      o.coordinates = o.coordinates.map(quantizePoint);
    },
    LineString: function (o) {
      o.arcs = quantizeLine(o.arcs);
    },
    MultiLineString: function (o) {
      o.arcs = o.arcs.map(quantizeLine);
    },
    Polygon: function (o) {
      o.arcs = quantizePolygon(o.arcs);
    },
    MultiPolygon: function (o) {
      o.arcs = o.arcs.map(quantizePolygon);
    }
  };

  for (var key in objects) {
    quantizeGeometry(objects[key]);
  }

  return {
    scale: [1 / kx, 1 / ky],
    translate: [x0, y0]
  };
}
},{}],"vbkJ":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _bounds = _interopRequireDefault(require("./bounds"));

var _cut = _interopRequireDefault(require("./cut"));

var _dedup = _interopRequireDefault(require("./dedup"));

var _delta = _interopRequireDefault(require("./delta"));

var _extract = _interopRequireDefault(require("./extract"));

var _geometry = _interopRequireDefault(require("./geometry"));

var _hashmap = _interopRequireDefault(require("./hash/hashmap"));

var _prequantize = _interopRequireDefault(require("./prequantize"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Constructs the TopoJSON Topology for the specified hash of features.
// Each object in the specified hash must be a GeoJSON object,
// meaning FeatureCollection, a Feature or a geometry object.
function _default(objects, quantization) {
  var bbox = (0, _bounds.default)(objects = (0, _geometry.default)(objects)),
      transform = quantization > 0 && bbox && (0, _prequantize.default)(objects, bbox, quantization),
      topology = (0, _dedup.default)((0, _cut.default)((0, _extract.default)(objects))),
      coordinates = topology.coordinates,
      indexByArc = (0, _hashmap.default)(topology.arcs.length * 1.4, hashArc, equalArc);
  objects = topology.objects; // for garbage collection

  topology.bbox = bbox;
  topology.arcs = topology.arcs.map(function (arc, i) {
    indexByArc.set(arc, i);
    return coordinates.slice(arc[0], arc[1] + 1);
  });
  delete topology.coordinates;
  coordinates = null;

  function indexGeometry(geometry) {
    if (geometry && indexGeometryType.hasOwnProperty(geometry.type)) indexGeometryType[geometry.type](geometry);
  }

  var indexGeometryType = {
    GeometryCollection: function (o) {
      o.geometries.forEach(indexGeometry);
    },
    LineString: function (o) {
      o.arcs = indexArcs(o.arcs);
    },
    MultiLineString: function (o) {
      o.arcs = o.arcs.map(indexArcs);
    },
    Polygon: function (o) {
      o.arcs = o.arcs.map(indexArcs);
    },
    MultiPolygon: function (o) {
      o.arcs = o.arcs.map(indexMultiArcs);
    }
  };

  function indexArcs(arc) {
    var indexes = [];

    do {
      var index = indexByArc.get(arc);
      indexes.push(arc[0] < arc[1] ? index : ~index);
    } while (arc = arc.next);

    return indexes;
  }

  function indexMultiArcs(arcs) {
    return arcs.map(indexArcs);
  }

  for (var key in objects) {
    indexGeometry(objects[key]);
  }

  if (transform) {
    topology.transform = transform;
    topology.arcs = (0, _delta.default)(topology.arcs);
  }

  return topology;
}

function hashArc(arc) {
  var i = arc[0],
      j = arc[1],
      t;
  if (j < i) t = i, i = j, j = t;
  return i + 31 * j;
}

function equalArc(arcA, arcB) {
  var ia = arcA[0],
      ja = arcA[1],
      ib = arcB[0],
      jb = arcB[1],
      t;
  if (ja < ia) t = ia, ia = ja, ja = t;
  if (jb < ib) t = ib, ib = jb, jb = t;
  return ia === ib && ja === jb;
}
},{"./bounds":"wOZf","./cut":"ubT2","./dedup":"5gQu","./delta":"vdug","./extract":"B+s3","./geometry":"k2Ou","./hash/hashmap":"9NZr","./prequantize":"31b3"}],"FQII":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "topology", {
  enumerable: true,
  get: function () {
    return _topology.default;
  }
});

var _topology = _interopRequireDefault(require("./src/topology"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
},{"./src/topology":"vbkJ"}],"Pnm9":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default(topology) {
  var oldObjects = topology.objects,
      newObjects = {},
      oldArcs = topology.arcs,
      oldArcsLength = oldArcs.length,
      oldIndex = -1,
      newIndexByOldIndex = new Array(oldArcsLength),
      newArcsLength = 0,
      newArcs,
      newIndex = -1,
      key;

  function scanGeometry(input) {
    switch (input.type) {
      case "GeometryCollection":
        input.geometries.forEach(scanGeometry);
        break;

      case "LineString":
        scanArcs(input.arcs);
        break;

      case "MultiLineString":
        input.arcs.forEach(scanArcs);
        break;

      case "Polygon":
        input.arcs.forEach(scanArcs);
        break;

      case "MultiPolygon":
        input.arcs.forEach(scanMultiArcs);
        break;
    }
  }

  function scanArc(index) {
    if (index < 0) index = ~index;
    if (!newIndexByOldIndex[index]) newIndexByOldIndex[index] = 1, ++newArcsLength;
  }

  function scanArcs(arcs) {
    arcs.forEach(scanArc);
  }

  function scanMultiArcs(arcs) {
    arcs.forEach(scanArcs);
  }

  function reindexGeometry(input) {
    var output;

    switch (input.type) {
      case "GeometryCollection":
        output = {
          type: "GeometryCollection",
          geometries: input.geometries.map(reindexGeometry)
        };
        break;

      case "LineString":
        output = {
          type: "LineString",
          arcs: reindexArcs(input.arcs)
        };
        break;

      case "MultiLineString":
        output = {
          type: "MultiLineString",
          arcs: input.arcs.map(reindexArcs)
        };
        break;

      case "Polygon":
        output = {
          type: "Polygon",
          arcs: input.arcs.map(reindexArcs)
        };
        break;

      case "MultiPolygon":
        output = {
          type: "MultiPolygon",
          arcs: input.arcs.map(reindexMultiArcs)
        };
        break;

      default:
        return input;
    }

    if (input.id != null) output.id = input.id;
    if (input.bbox != null) output.bbox = input.bbox;
    if (input.properties != null) output.properties = input.properties;
    return output;
  }

  function reindexArc(oldIndex) {
    return oldIndex < 0 ? ~newIndexByOldIndex[~oldIndex] : newIndexByOldIndex[oldIndex];
  }

  function reindexArcs(arcs) {
    return arcs.map(reindexArc);
  }

  function reindexMultiArcs(arcs) {
    return arcs.map(reindexArcs);
  }

  for (key in oldObjects) {
    scanGeometry(oldObjects[key]);
  }

  newArcs = new Array(newArcsLength);

  while (++oldIndex < oldArcsLength) {
    if (newIndexByOldIndex[oldIndex]) {
      newIndexByOldIndex[oldIndex] = ++newIndex;
      newArcs[newIndex] = oldArcs[oldIndex];
    }
  }

  for (key in oldObjects) {
    newObjects[key] = reindexGeometry(oldObjects[key]);
  }

  return {
    type: "Topology",
    bbox: topology.bbox,
    transform: topology.transform,
    objects: newObjects,
    arcs: newArcs
  };
}
},{}],"6RGA":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _prune = _interopRequireDefault(require("./prune"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(topology, filter) {
  var oldObjects = topology.objects,
      newObjects = {},
      key;
  if (filter == null) filter = filterTrue;

  function filterGeometry(input) {
    var output, arcs;

    switch (input.type) {
      case "Polygon":
        {
          arcs = filterRings(input.arcs);
          output = arcs ? {
            type: "Polygon",
            arcs: arcs
          } : {
            type: null
          };
          break;
        }

      case "MultiPolygon":
        {
          arcs = input.arcs.map(filterRings).filter(filterIdentity);
          output = arcs.length ? {
            type: "MultiPolygon",
            arcs: arcs
          } : {
            type: null
          };
          break;
        }

      case "GeometryCollection":
        {
          arcs = input.geometries.map(filterGeometry).filter(filterNotNull);
          output = arcs.length ? {
            type: "GeometryCollection",
            geometries: arcs
          } : {
            type: null
          };
          break;
        }

      default:
        return input;
    }

    if (input.id != null) output.id = input.id;
    if (input.bbox != null) output.bbox = input.bbox;
    if (input.properties != null) output.properties = input.properties;
    return output;
  }

  function filterRings(arcs) {
    return arcs.length && filterExteriorRing(arcs[0]) // if the exterior is small, ignore any holes
    ? [arcs[0]].concat(arcs.slice(1).filter(filterInteriorRing)) : null;
  }

  function filterExteriorRing(ring) {
    return filter(ring, false);
  }

  function filterInteriorRing(ring) {
    return filter(ring, true);
  }

  for (key in oldObjects) {
    newObjects[key] = filterGeometry(oldObjects[key]);
  }

  return (0, _prune.default)({
    type: "Topology",
    bbox: topology.bbox,
    transform: topology.transform,
    objects: newObjects,
    arcs: topology.arcs
  });
}

function filterTrue() {
  return true;
}

function filterIdentity(x) {
  return x;
}

function filterNotNull(geometry) {
  return geometry.type != null;
}
},{"./prune":"Pnm9"}],"mNXB":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default(topology) {
  var ownerByArc = new Array(topology.arcs.length),
      // arc index -> index of unique associated ring, or -1 if used by multiple rings
  ownerIndex = 0,
      key;

  function testGeometry(o) {
    switch (o.type) {
      case "GeometryCollection":
        o.geometries.forEach(testGeometry);
        break;

      case "Polygon":
        testArcs(o.arcs);
        break;

      case "MultiPolygon":
        o.arcs.forEach(testArcs);
        break;
    }
  }

  function testArcs(arcs) {
    for (var i = 0, n = arcs.length; i < n; ++i, ++ownerIndex) {
      for (var ring = arcs[i], j = 0, m = ring.length; j < m; ++j) {
        var arc = ring[j];
        if (arc < 0) arc = ~arc;
        var owner = ownerByArc[arc];
        if (owner == null) ownerByArc[arc] = ownerIndex;else if (owner !== ownerIndex) ownerByArc[arc] = -1;
      }
    }
  }

  for (key in topology.objects) {
    testGeometry(topology.objects[key]);
  }

  return function (ring) {
    for (var j = 0, m = ring.length, arc; j < m; ++j) {
      if (ownerByArc[(arc = ring[j]) < 0 ? ~arc : arc] === -1) {
        return true;
      }
    }

    return false;
  };
}
},{}],"vYdJ":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.planarTriangleArea = planarTriangleArea;
exports.planarRingArea = planarRingArea;

function planarTriangleArea(triangle) {
  var a = triangle[0],
      b = triangle[1],
      c = triangle[2];
  return Math.abs((a[0] - c[0]) * (b[1] - a[1]) - (a[0] - b[0]) * (c[1] - a[1])) / 2;
}

function planarRingArea(ring) {
  var i = -1,
      n = ring.length,
      a,
      b = ring[n - 1],
      area = 0;

  while (++i < n) a = b, b = ring[i], area += a[0] * b[1] - a[1] * b[0];

  return Math.abs(area) / 2;
}
},{}],"ukPC":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _topojsonClient = require("topojson-client");

var _planar = require("./planar");

function _default(topology, minWeight, weight) {
  minWeight = minWeight == null ? Number.MIN_VALUE : +minWeight;
  if (weight == null) weight = _planar.planarRingArea;
  return function (ring, interior) {
    return weight((0, _topojsonClient.feature)(topology, {
      type: "Polygon",
      arcs: [ring]
    }).geometry.coordinates[0], interior) >= minWeight;
  };
}
},{"topojson-client":"ZeSf","./planar":"vYdJ"}],"5siU":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _filterAttached = _interopRequireDefault(require("./filterAttached"));

var _filterWeight = _interopRequireDefault(require("./filterWeight"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(topology, minWeight, weight) {
  var a = (0, _filterAttached.default)(topology),
      w = (0, _filterWeight.default)(topology, minWeight, weight);
  return function (ring, interior) {
    return a(ring, interior) || w(ring, interior);
  };
}
},{"./filterAttached":"mNXB","./filterWeight":"ukPC"}],"3qQB":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function compare(a, b) {
  return a[1][2] - b[1][2];
}

function _default() {
  var heap = {},
      array = [],
      size = 0;

  heap.push = function (object) {
    up(array[object._ = size] = object, size++);
    return size;
  };

  heap.pop = function () {
    if (size <= 0) return;
    var removed = array[0],
        object;
    if (--size > 0) object = array[size], down(array[object._ = 0] = object, 0);
    return removed;
  };

  heap.remove = function (removed) {
    var i = removed._,
        object;
    if (array[i] !== removed) return; // invalid request

    if (i !== --size) object = array[size], (compare(object, removed) < 0 ? up : down)(array[object._ = i] = object, i);
    return i;
  };

  function up(object, i) {
    while (i > 0) {
      var j = (i + 1 >> 1) - 1,
          parent = array[j];
      if (compare(object, parent) >= 0) break;
      array[parent._ = i] = parent;
      array[object._ = i = j] = object;
    }
  }

  function down(object, i) {
    while (true) {
      var r = i + 1 << 1,
          l = r - 1,
          j = i,
          child = array[j];
      if (l < size && compare(array[l], child) < 0) child = array[j = l];
      if (r < size && compare(array[r], child) < 0) child = array[j = r];
      if (j === i) break;
      array[child._ = i] = child;
      array[object._ = i = j] = object;
    }
  }

  return heap;
}
},{}],"uPVu":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _topojsonClient = require("topojson-client");

var _heap = _interopRequireDefault(require("./heap"));

var _planar = require("./planar");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function copy(point) {
  return [point[0], point[1], 0];
}

function _default(topology, weight) {
  var point = topology.transform ? (0, _topojsonClient.transform)(topology.transform) : copy,
      heap = (0, _heap.default)();
  if (weight == null) weight = _planar.planarTriangleArea;
  var arcs = topology.arcs.map(function (arc) {
    var triangles = [],
        maxWeight = 0,
        triangle,
        i,
        n;
    arc = arc.map(point);

    for (i = 1, n = arc.length - 1; i < n; ++i) {
      triangle = [arc[i - 1], arc[i], arc[i + 1]];
      triangle[1][2] = weight(triangle);
      triangles.push(triangle);
      heap.push(triangle);
    } // Always keep the arc endpoints!


    arc[0][2] = arc[n][2] = Infinity;

    for (i = 0, n = triangles.length; i < n; ++i) {
      triangle = triangles[i];
      triangle.previous = triangles[i - 1];
      triangle.next = triangles[i + 1];
    }

    while (triangle = heap.pop()) {
      var previous = triangle.previous,
          next = triangle.next; // If the weight of the current point is less than that of the previous
      // point to be eliminated, use the latter’s weight instead. This ensures
      // that the current point cannot be eliminated without eliminating
      // previously- eliminated points.

      if (triangle[1][2] < maxWeight) triangle[1][2] = maxWeight;else maxWeight = triangle[1][2];

      if (previous) {
        previous.next = next;
        previous[2] = triangle[2];
        update(previous);
      }

      if (next) {
        next.previous = previous;
        next[0] = triangle[0];
        update(next);
      }
    }

    return arc;
  });

  function update(triangle) {
    heap.remove(triangle);
    triangle[1][2] = weight(triangle);
    heap.push(triangle);
  }

  return {
    type: "Topology",
    bbox: topology.bbox,
    objects: topology.objects,
    arcs: arcs
  };
}
},{"topojson-client":"ZeSf","./heap":"3qQB","./planar":"vYdJ"}],"CgN+":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default(topology, p) {
  var array = [];
  topology.arcs.forEach(function (arc) {
    arc.forEach(function (point) {
      if (isFinite(point[2])) {
        // Ignore endpoints, whose weight is Infinity.
        array.push(point[2]);
      }
    });
  });
  return array.length && quantile(array.sort(descending), p);
}

function quantile(array, p) {
  if (!(n = array.length)) return;
  if ((p = +p) <= 0 || n < 2) return array[0];
  if (p >= 1) return array[n - 1];
  var n,
      h = (n - 1) * p,
      i = Math.floor(h),
      a = array[i],
      b = array[i + 1];
  return a + (b - a) * (h - i);
}

function descending(a, b) {
  return b - a;
}
},{}],"quIN":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default(topology, minWeight) {
  minWeight = minWeight == null ? Number.MIN_VALUE : +minWeight; // Remove points whose weight is less than the minimum weight.

  var arcs = topology.arcs.map(function (input) {
    var i = -1,
        j = 0,
        n = input.length,
        output = new Array(n),
        // pessimistic
    point;

    while (++i < n) {
      if ((point = input[i])[2] >= minWeight) {
        output[j++] = [point[0], point[1]];
      }
    }

    output.length = j;
    return output;
  });
  return {
    type: "Topology",
    transform: topology.transform,
    bbox: topology.bbox,
    objects: topology.objects,
    arcs: arcs
  };
}
},{}],"rG3/":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sphericalRingArea = sphericalRingArea;
exports.sphericalTriangleArea = sphericalTriangleArea;
var pi = Math.PI,
    tau = 2 * pi,
    quarterPi = pi / 4,
    radians = pi / 180,
    abs = Math.abs,
    atan2 = Math.atan2,
    cos = Math.cos,
    sin = Math.sin;

function halfArea(ring, closed) {
  var i = 0,
      n = ring.length,
      sum = 0,
      point = ring[closed ? i++ : n - 1],
      lambda0,
      lambda1 = point[0] * radians,
      phi1 = point[1] * radians / 2 + quarterPi,
      cosPhi0,
      cosPhi1 = cos(phi1),
      sinPhi0,
      sinPhi1 = sin(phi1);

  for (; i < n; ++i) {
    point = ring[i];
    lambda0 = lambda1, lambda1 = point[0] * radians;
    phi1 = point[1] * radians / 2 + quarterPi;
    cosPhi0 = cosPhi1, cosPhi1 = cos(phi1);
    sinPhi0 = sinPhi1, sinPhi1 = sin(phi1); // Spherical excess E for a spherical triangle with vertices: south pole,
    // previous point, current point.  Uses a formula derived from Cagnoli’s
    // theorem.  See Todhunter, Spherical Trig. (1871), Sec. 103, Eq. (2).
    // See https://github.com/d3/d3-geo/blob/master/README.md#geoArea

    var dLambda = lambda1 - lambda0,
        sdLambda = dLambda >= 0 ? 1 : -1,
        adLambda = sdLambda * dLambda,
        k = sinPhi0 * sinPhi1,
        u = cosPhi0 * cosPhi1 + k * cos(adLambda),
        v = k * sdLambda * sin(adLambda);
    sum += atan2(v, u);
  }

  return sum;
}

function sphericalRingArea(ring, interior) {
  var sum = halfArea(ring, true);
  if (interior) sum *= -1;
  return (sum < 0 ? tau + sum : sum) * 2;
}

function sphericalTriangleArea(t) {
  return abs(halfArea(t, false)) * 2;
}
},{}],"QPnS":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "filter", {
  enumerable: true,
  get: function () {
    return _filter.default;
  }
});
Object.defineProperty(exports, "filterAttached", {
  enumerable: true,
  get: function () {
    return _filterAttached.default;
  }
});
Object.defineProperty(exports, "filterAttachedWeight", {
  enumerable: true,
  get: function () {
    return _filterAttachedWeight.default;
  }
});
Object.defineProperty(exports, "filterWeight", {
  enumerable: true,
  get: function () {
    return _filterWeight.default;
  }
});
Object.defineProperty(exports, "planarRingArea", {
  enumerable: true,
  get: function () {
    return _planar.planarRingArea;
  }
});
Object.defineProperty(exports, "planarTriangleArea", {
  enumerable: true,
  get: function () {
    return _planar.planarTriangleArea;
  }
});
Object.defineProperty(exports, "presimplify", {
  enumerable: true,
  get: function () {
    return _presimplify.default;
  }
});
Object.defineProperty(exports, "quantile", {
  enumerable: true,
  get: function () {
    return _quantile.default;
  }
});
Object.defineProperty(exports, "simplify", {
  enumerable: true,
  get: function () {
    return _simplify.default;
  }
});
Object.defineProperty(exports, "sphericalRingArea", {
  enumerable: true,
  get: function () {
    return _spherical.sphericalRingArea;
  }
});
Object.defineProperty(exports, "sphericalTriangleArea", {
  enumerable: true,
  get: function () {
    return _spherical.sphericalTriangleArea;
  }
});

var _filter = _interopRequireDefault(require("./src/filter"));

var _filterAttached = _interopRequireDefault(require("./src/filterAttached"));

var _filterAttachedWeight = _interopRequireDefault(require("./src/filterAttachedWeight"));

var _filterWeight = _interopRequireDefault(require("./src/filterWeight"));

var _planar = require("./src/planar");

var _presimplify = _interopRequireDefault(require("./src/presimplify"));

var _quantile = _interopRequireDefault(require("./src/quantile"));

var _simplify = _interopRequireDefault(require("./src/simplify"));

var _spherical = require("./src/spherical");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
},{"./src/filter":"6RGA","./src/filterAttached":"mNXB","./src/filterAttachedWeight":"5siU","./src/filterWeight":"ukPC","./src/planar":"vYdJ","./src/presimplify":"uPVu","./src/quantile":"CgN+","./src/simplify":"quIN","./src/spherical":"rG3/"}],"hGzo":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _topojsonClient = require("topojson-client");

Object.keys(_topojsonClient).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _topojsonClient[key];
    }
  });
});

var _topojsonServer = require("topojson-server");

Object.keys(_topojsonServer).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _topojsonServer[key];
    }
  });
});

var _topojsonSimplify = require("topojson-simplify");

Object.keys(_topojsonSimplify).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _topojsonSimplify[key];
    }
  });
});
},{"topojson-client":"ZeSf","topojson-server":"FQII","topojson-simplify":"QPnS"}],"oL2S":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _loadData = _interopRequireDefault(require("./load-data"));

var topojson = _interopRequireWildcard(require("topojson"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// data
var centers = null;
var movement = null;
var us = null; // selections

var $section = d3.selectAll('.movement');
var $figure = $section.selectAll('.movement-figure');
var $svg = $figure.selectAll('.figure-container_svg'); // dimensions

var width = 900;
var height = 600;
var marginTop = 20;
var marginBottom = 20;
var marginLeft = 20;
var marginRight = 20;
var hypotenuse = Math.sqrt(width * width + height * height); // map constants

var projection = d3.geoAlbers();
var radius = d3.scaleSqrt();
var path = d3.geoPath();

function setupDOM() {
  $svg.append("path").datum(topojson.feature(us, us.objects.land)).attr("class", "land").attr("d", path);
  $svg.append("path").datum(topojson.mesh(us, us.objects.states, function (a, b) {
    return a !== b;
  })).attr("class", "state-borders").attr("d", path);
  $svg.append("path").datum({
    type: "MultiPoint",
    coordinates: centers
  }).attr("class", "state-dots").attr("d", path);
  var state = $svg.selectAll(".state-center").data(centers).enter().append("g").attr("class", "state-center");
  state.append("path").attr("class", "movement-arc").attr("d", function (d) {
    return path(d.arcs);
  });
}

function setup() {
  findCoordinates();
  setupDOM();
  resize();
}

function resize() {
  width = $figure.node().offsetWidth - marginLeft - marginRight;
  height = $figure.node().offsetHeight - marginTop - marginBottom;
  $svg.attr('width', width + marginLeft + marginRight).attr('height', height + marginTop + marginBottom);
  projection.translate([width / 2, height / 2]).scale(1280);
  radius.domain([0, 100]).range([0, 14]);
  path.projection(projection).pointRadius(2.5);
}

function setupLocations(d) {
  d[0] = +d.longitude;
  d[1] = +d.latitude;
  d.arcs = {
    type: "MultiLineString",
    coordinates: []
  };
  return d;
}

function findCoordinates() {
  var locationByName = d3.map(centers, function (d) {
    return d.location;
  });
  var test = locationByName.get('Alabama');
  movement.forEach(function (dog) {
    var source = locationByName.get(dog.from);
    var target = locationByName.get(dog.to);
    source.arcs.coordinates.push([source, target]);
    target.arcs.coordinates.push([target, source]);
  });
  centers = centers.filter(function (d) {
    return d.arcs.coordinates.length;
  });
}

function init() {
  _loadData.default.loadMap().then(function (result) {
    centers = result[0].map(function (d) {
      return setupLocations(d);
    });
    movement = result[1];
    us = result[2];
    setup();
  }).catch(console.error);
}

var _default = {
  init: init,
  resize: resize
};
exports.default = _default;
},{"./load-data":"xZJw","topojson":"hGzo"}],"epB2":[function(require,module,exports) {
"use strict";

var _lodash = _interopRequireDefault(require("lodash.debounce"));

var _isMobile = _interopRequireDefault(require("./utils/is-mobile"));

var _graphic = _interopRequireDefault(require("./graphic"));

var _exportedDogs = _interopRequireDefault(require("./exported-dogs"));

var _footer = _interopRequireDefault(require("./footer"));

var _usStateData = _interopRequireDefault(require("./utils/us-state-data"));

var _movement = _interopRequireDefault(require("./movement"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* global d3 */
var $body = d3.select('body');
var previousWidth = 0;
var $dropdown = d3.selectAll('.stateSelect');
var readerState = 'Washington';

function resize() {
  // only do resize on width changes, not height
  // (remove the conditional if you want to trigger on height change)
  var width = $body.node().offsetWidth;

  if (previousWidth !== width) {
    previousWidth = width;

    _graphic.default.resize();
  }
}

function setupStateDropdown() {
  var justStates = _usStateData.default.map(function (d) {
    return d.state;
  });

  $dropdown.selectAll('option').data(justStates).enter().append('option').attr('value', function (d) {
    return d;
  }).text(function (d) {
    return d;
  }).property('selected', function (d) {
    return d === readerState;
  });
  $dropdown.on('change', function (d) {
    readerState = this.value;
    updateLocation();
  });
}

function updateLocation() {
  _graphic.default.updateLocation(readerState);

  _exportedDogs.default.updateLocation(readerState);
}

function setupStickyHeader() {
  var $header = $body.select('header');

  if ($header.classed('is-sticky')) {
    var $menu = $body.select('.header__menu');
    var $toggle = $body.select('.header__toggle');
    $toggle.on('click', function () {
      var visible = $menu.classed('is-visible');
      $menu.classed('is-visible', !visible);
      $toggle.classed('is-visible', !visible);
    });
  }
}

function init() {
  // add mobile class to body tag
  $body.classed('is-mobile', _isMobile.default.any()); // setup resize event

  window.addEventListener('resize', (0, _lodash.default)(resize, 150)); // setup sticky header menu

  setupStickyHeader(); // kick off graphic code

  setupStateDropdown();

  _graphic.default.init(readerState);

  _exportedDogs.default.init(readerState);

  _movement.default.init(); // load footer stories


  _footer.default.init();
}

init();
},{"lodash.debounce":"or4r","./utils/is-mobile":"WEtf","./graphic":"TAPd","./exported-dogs":"sOMx","./footer":"v9Q8","./utils/us-state-data":"osrT","./movement":"oL2S"}]},{},["epB2"], null)
//# sourceMappingURL=/main.js.map