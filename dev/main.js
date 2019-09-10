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
var $pupSheHe = $section.selectAll('.shehe');
var $reason = $section.selectAll('.moveCondition');
var $dogOrigin = $section.selectAll('.dogOrigin');
var $stackBarContainer = $section.select('.intro-dog__bar'); // constants

var exampleDogs = null;
var exportedDogs = null;
var readerDog = null;
var formatCount = d3.format(',.0f');
var formatPercent = d3.format('.0%');

function updateLocation(loc) {
  readerState = loc;
  filterDogs();
}

function updateBars(dog) {
  var perOut = +dog[0].count_imported / +dog[0].total;
  var perIn = (+dog[0].total - +dog[0].count_imported) / +dog[0].total;
  $stackBarContainer.select('.bar__inState').style('flex', "".concat(perIn, " 1 0"));
  $stackBarContainer.select('.bar__outState').style('flex', "".concat(perOut, " 1 0"));
  $stackBarContainer.select('.bar__inState-label').text(formatPercent(perIn));
  $stackBarContainer.select('.bar__outState-label').text(formatPercent(perOut));
  console.log({
    perOut: perOut,
    perIn: perIn
  });
}

function filterDogs() {
  readerDog = exampleDogs.filter(function (d) {
    return d.current === readerState;
  }); // update state

  $state.text(readerState);
  $name.text(readerDog[0].name); // show appropriate text

  if (readerDog[0].imported === 'TRUE') {
    $pOut.classed('is-visible', true);
    $pIn.classed('is-visible', false);
  } else {
    $pOut.classed('is-visible', false);
    $pIn.classed('is-visible', true);
  } // update counts


  $inCount.text(formatCount(+readerDog[0].count_imported));
  $outCount.text(formatCount(+readerDog[0].count_exported));
  $total.text(formatCount(+readerDog[0].total)); // update pronouns

  var pupPronoun = readerDog[0].sex;
  $pupHerHis.text(pupPronoun === 'm' ? 'his' : 'her');
  $pupSheHe.text(pupPronoun === 'm' ? 'he' : 'she'); // update conditions

  $reason.text(readerDog[0].conditions);
  $dogOrigin.text(readerDog[0].original); // add dog image

  var fileName = readerDog[0].name.replace(' ', '');
  var fileState = readerDog[0].current.replace(' ', '');
  $img.attr('src', "assets/images/faces/".concat(fileName, "_").concat(fileState, ".png"));
  updateBars(readerDog);
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
        var $state = $sel.selectAll('.state').data(_data, function (d) {
          return d.key;
        }).join(function (enter) {
          var state = enter.append('div').attr('class', 'state');
          var $title = state.append('p').attr('class', 'state-name').text(function (d) {
            return d.key;
          });
          var $container = state.append('div').attr('class', 'container-mini');
          return state; // .enter()
          // .append('div')
          // .attr('class', 'dog')
          //
        });
        console.log({
          $state: $state
        });
        $state.select('.container-mini').selectAll('.dog').data(function (d) {
          return d.value.breedMap;
        }).join(function (enter) {
          var dog = enter.append('div').attr('class', 'dog');
          return dog;
        }).style('background-image', function (d) {
          return d.key === 'mix' ? 'url(assets/images/profiles/labrador.png)' : "url(assets/images/profiles/".concat(d.key, ".png)");
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

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

// reader parameters
var readerState = null; // updating text selections

var $section = d3.selectAll('.exported');
var $container = $section.selectAll('.figure-container');
var $moreButton = $section.select('.show-more');
var $transparency = $section.select('.transparency'); // constants

var exportedDogs = null;
var charts = null;
var dogCount = 0;

function setupExpand() {
  $moreButton.on('click', function () {
    var expanded = !$container.classed('is-clipped');
    var text = !expanded ? 'Show Fewer' : 'Show All';
    $moreButton.text(text);
    $container.classed('is-clipped', expanded);

    if (expanded) {
      var y = +$moreButton.attr('data-y');
      window.scrollTo(0, y);
    }

    $moreButton.attr('data-y', window.scrollY);
    $transparency.classed('is-visible', !expanded);
  });
}

function nestDogs(loc) {
  readerState = loc; // filter exported dogs

  var filteredExports = exportedDogs.filter(function (d) {
    return d.final_state === readerState;
  });
  dogCount = filteredExports.length;

  if (dogCount >= 60) {
    $container.classed('is-clipped', true);
    $transparency.classed('is-visible', true);
    $moreButton.property('disabled', false).classed('is-disabled', false);
  } else {
    $container.classed('is-clipped', false);
    $transparency.classed('is-visible', false);
    $moreButton.property('disabled', true).classed('is-disabled', true);
  }

  var nestedExports = d3.nest().key(function (d) {
    return d.original_state;
  }).rollup(function (leaves) {
    var _ref;

    var stateTotal = leaves.length;
    var breeds = d3.nest().key(function (d) {
      return d.file;
    }).rollup(function (buds) {
      var count = Math.floor(buds.length / 1);
      return d3.range(count).map(function () {
        return {
          key: buds[0].file
        };
      });
    }).entries(leaves).sort(function (a, b) {
      return d3.descending(a.value, b.value);
    });

    var breedMap = (_ref = []).concat.apply(_ref, _toConsumableArray(breeds.map(function (d) {
      return d.value;
    })));

    return {
      stateTotal: stateTotal,
      breedMap: breedMap
    };
  }).entries(filteredExports).sort(function (a, b) {
    return d3.descending(a.value.stateTotal, b.value.stateTotal);
  });
  return nestedExports;
}

function updateLocation(loc) {
  var nestedExports = nestDogs(loc);
  charts.data(nestedExports);
}

function filterDogs(loc) {
  var nestedExports = nestDogs(loc);
  charts = $section.select('.figure-container').datum(nestedExports).exportsByState();
} // code for determining user's location and subsequent data


function resize() {}

function init(loc) {
  _loadData.default.loadCSV('exportedDogs.csv').then(function (result) {
    readerState = loc;
    exportedDogs = result;
    filterDogs(loc); // setup interaction with show more button

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
},{}],"bcyP":[function(require,module,exports) {
/*
 USAGE (example: line chart)
 1. c+p this template to a new file (line.js)
 2. change puddingChartName to puddingChartLine
 3. in graphic file: import './pudding-chart/line'
 4a. const charts = d3.selectAll('.thing').data(data).puddingChartLine();
 4b. const chart = d3.select('.thing').datum(datum).puddingChartLine();
*/
d3.selection.prototype.northernLine = function init(options) {
  function createChart(el) {
    var $sel = d3.select(el);

    var _data = $sel.datum(); // dimension stuff


    var width = 0;
    var height = 0;
    var marginTop = 50;
    var marginBottom = 50;
    var marginLeft = 50;
    var marginRight = 50;
    var leftLine = 0;
    var rightLine = 0;
    var startPoint = 0; // scales
    // const scaleX = d3.scaleLinear();

    var scaleY = d3.scaleLinear();
    var scaleStroke = d3.scaleLinear(); // dom elements

    var $svg = null;
    var $axis = null;
    var $vis = null; // helper functions

    var Chart = {
      // called once at start
      init: function init() {
        $svg = $sel.append('svg').attr('class', 'northern-chart');
        var $g = $svg.append('g'); // offset chart for margins

        $g.attr('transform', "translate(".concat(marginLeft, ", ").concat(marginTop, ")")); // create axis

        $axis = $svg.append('g').attr('class', 'g-axis'); // setup viz group

        $vis = $g.append('g').attr('class', 'g-vis');
        Chart.resize();
        Chart.render();
      },
      // on resize, update new dimensions
      resize: function resize() {
        // defaults to grabbing dimensions from container element
        width = $sel.node().offsetWidth - marginLeft - marginRight;
        height = $sel.node().offsetHeight - marginTop - marginBottom;
        $svg.attr('width', width + marginLeft + marginRight).attr('height', height + marginTop + marginBottom);
        scaleY.range([height, 0]).domain(d3.extent(_data, function (d) {
          return d.latDiff;
        }));
        scaleStroke.range([width * 0.01, width * 0.1]).domain(d3.extent(_data, function (d) {
          return d.n;
        }));
        console.log(scaleStroke(104));
        console.log(scaleStroke(5));
        leftLine = width * 0.25;
        rightLine = width * 0.75;
        startPoint = scaleY(0);
        return Chart;
      },
      // update scales and render chart
      render: function render() {
        // add circles to each end point
        $vis.selectAll('.end-point').data(_data).join(function (enter) {
          // enter.append('circle')
          // 	.attr('class', 'end-point')
          // 	.attr('r', 5)
          // 	.attr('cx', rightLine)
          // 	.attr('cy', d => scaleY(d.latDiff))
          // enter.append('line')
          // 	.attr('class', 'move-line')
          // 	.attr('x1', leftLine)
          // 	.attr('x2', rightLine)
          // 	.attr('y1', startPoint)
          // 	.attr('y2', d => scaleY(d.latDiff))
          // 	.style('stroke-width', d => `${Math.round(scaleStroke(d.n))}px`)
          // 	.style('stroke', d => d.latDiff >= 0 ? '#E69E9E' : '#DF753C')
          enter.append('path').attr('class', 'move-path').attr('d', function (d) {
            var padding = width * 0.2;
            var starting = [leftLine, startPoint];
            var ending = [rightLine, scaleY(d.latDiff)];
            var startControl = [leftLine + (padding + scaleStroke(d.n)), startPoint];
            var endControl = [rightLine - padding, scaleY(d.latDiff)];
            var backStart = [rightLine - (padding + scaleStroke(d.n)), scaleY(d.latDiff)];
            var backEnd = [leftLine + padding, startPoint];
            var path = [// move to starting point
            'M', starting, // add cubic bezier curve
            'C', startControl, endControl, // add end point
            ending, 'C', backStart, backEnd, starting];
            var joined = path.join(' ');
            return joined;
          }).style('fill', function (d) {
            return d.latDiff >= 0 ? '#E69E9E' : '#DF753C';
          }); // .style('stroke-width', '1px')
          // .style('stroke', d => d.latDiff >= 0 ? '#E69E9E' : '#DF753C')
        }, function (update) {
          update.attr('cx', rightLine).attr('cy', function (d) {
            return scaleY(d.latDiff);
          });
        }); // add point to starting point

        $vis.append('circle').attr('class', 'starting-point').attr('r', 5).attr('cx', leftLine).attr('cy', startPoint).raise();
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
},{}],"dOkl":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("./pudding-chart/northern-template");

var _loadData = _interopRequireDefault(require("./load-data"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// selections
var $section = d3.select('.northern');
var $container = $section.select('.figure-container'); // data

var movementData = null;

function cleanData(arr) {
  return arr.map(function (d, i) {
    return _objectSpread({}, d, {
      latDiff: +d.latDiff,
      n: +d.n
    });
  });
}

function setup() {
  var filtered = movementData.filter(function (d) {
    return d.inUS === 'TRUE';
  }).sort(function (d) {
    return d3.descending(d.n);
  });
  var sorted = movementData.sort(function (d) {
    return d3.ascending(d.n);
  });
  var chart = $container.datum(filtered).northernLine();
}

function resize() {}

function init() {
  _loadData.default.loadCSV('northernMovement.csv').then(function (result) {
    movementData = cleanData(result);
    setup();
  }).catch(console.error);
}

var _default = {
  resize: resize,
  init: init
};
exports.default = _default;
},{"./pudding-chart/northern-template":"bcyP","./load-data":"xZJw"}],"uAm8":[function(require,module,exports) {
/*
 USAGE (example: line chart)
 1. c+p this template to a new file (line.js)
 2. change puddingChartName to puddingChartLine
 3. in graphic file: import './pudding-chart/line'
 4a. const charts = d3.selectAll('.thing').data(data).puddingChartLine();
 4b. const chart = d3.select('.thing').datum(datum).puddingChartLine();
*/
d3.selection.prototype.tileMap = function init(options) {
  function createChart(el) {
    var $sel = d3.select(el);

    var _data = $sel.datum(); // dimension stuff


    var width = 0;
    var textHeight = 18;
    var containerHeight = null;
    var isMobile = false; // factor to determine how many dogs should be
    // equal to one block

    var factor = isMobile === true ? 2 : 4; // helper functions

    var Chart = {
      // called once at start
      init: function init() {
        Chart.resize();
        Chart.render();
      },
      // on resize, update new dimensions
      resize: function resize() {
        // defaults to grabbing dimensions from container element
        if (_data.location === 'Maine') {
          width = $sel.node().offsetWidth;
          $sel.style('height', "".concat(width, "px"));
        } else {
          width = d3.select('.block-Maine').node().offsetWidth;
          $sel.style('height', "".concat(width, "px"));
        }

        var windowWidth = window.innerWidth;
        isMobile = windowWidth <= 600;
        factor = isMobile === true ? 10 : 2; // container height should be height - text height

        containerHeight = width - textHeight; // resize entire bounding chart once

        if (_data.location === 'Florida') {
          var $figure = d3.select('.movement-figure');
          var $bound = $figure.select('.figure-container').style('height', "".concat(width * 8, "px"));
        }

        return Chart;
      },
      // update scales and render chart
      render: function render() {
        if (_data.location != 'blank') {
          // add state name
          $sel.append('p').text(_data.abbreviation); // add div for chart

          var $container = $sel.append('div').attr('class', 'container').style('height', "".concat(containerHeight, "px")); // add containers for imports and exports

          var $imports = $container.append('div').attr('class', 'container-imports');
          var $exports = $container.append('div').attr('class', 'container-exports'); // if the data exists for that state, add dogs

          if (_data.count) {
            $imports.selectAll('.import dog').data(d3.range(_data.count.imported / factor)).join(function (enter) {
              enter.append('div').attr('class', 'import');
            });
            $exports.selectAll('.export dog').data(d3.range(_data.count.exported / factor)).join(function (enter) {
              enter.append('div').attr('class', 'export');
            });
          }
        }

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
},{}],"NDWt":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _usStateData = _interopRequireDefault(require("./us-state-data"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Return state abbrevation from name
 * @param {string} state to use to lookup abbreviation

 * @returns {string} abbreviation
 */
function lookupStateAbbr(state) {
  var match = _usStateData.default.find(function (d) {
    return d.state.toLowerCase() === state.toLowerCase();
  });

  return match ? match.abbr : null;
}

var _default = lookupStateAbbr;
exports.default = _default;
},{"./us-state-data":"osrT"}],"KRMc":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _loadData = _interopRequireDefault(require("./load-data"));

require("./pudding-chart/tile-template");

var _lookupStateAbbr = _interopRequireDefault(require("./utils/lookup-state-abbr"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// data
var importExport = null;
var tileLoc = null; // selections

var $section = d3.select('.movement');
var $container = $section.select('.figure-container');

function cleanData(arr) {
  return arr.map(function (d, i) {
    return _objectSpread({}, d, {
      imported: +d.imported,
      exported: +d.exported,
      number: i
    });
  });
}

function setup() {
  var locationMap = d3.map(importExport, function (d) {
    return d.location;
  }); // add data to tile location

  var tileData = tileLoc.map(function (d, i) {
    return {
      location: d,
      gridNumber: i + 1,
      count: locationMap.get(d),
      abbreviation: d === 'blank' ? null : (0, _lookupStateAbbr.default)(d)
    };
  });
  console.log({
    tileData: tileData
  });
  var charts = $container.selectAll('.grid-block').data(tileData).join(function (enter) {
    return enter.append('div').attr('class', function (d) {
      return "grid-block block-".concat(d.location);
    });
  }).tileMap();
}

function loadLocations() {
  _loadData.default.loadJSON('tile-locations.json').then(function (result) {
    tileLoc = result;
    setup();
  }).catch(console.error);
}

function resize() {}

function init() {
  _loadData.default.loadCSV('importExport.csv').then(function (result) {
    importExport = cleanData(result);
    loadLocations();
  }).catch(console.error);
}

var _default = {
  init: init,
  resize: resize
};
exports.default = _default;
},{"./load-data":"xZJw","./pudding-chart/tile-template":"uAm8","./utils/lookup-state-abbr":"NDWt"}],"epB2":[function(require,module,exports) {
"use strict";

var _lodash = _interopRequireDefault(require("lodash.debounce"));

var _isMobile = _interopRequireDefault(require("./utils/is-mobile"));

var _graphic = _interopRequireDefault(require("./graphic"));

var _exportedDogs = _interopRequireDefault(require("./exported-dogs"));

var _footer = _interopRequireDefault(require("./footer"));

var _usStateData = _interopRequireDefault(require("./utils/us-state-data"));

var _northernMovement = _interopRequireDefault(require("./northern-movement"));

var _tileMovement = _interopRequireDefault(require("./tile-movement"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* global d3 */
// import movement from './movement'
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

  _exportedDogs.default.init(readerState); // movement.init();
  // northern.init();


  _tileMovement.default.init(); // load footer stories


  _footer.default.init();
}

init();
},{"lodash.debounce":"or4r","./utils/is-mobile":"WEtf","./graphic":"TAPd","./exported-dogs":"sOMx","./footer":"v9Q8","./utils/us-state-data":"osrT","./northern-movement":"dOkl","./tile-movement":"KRMc"}]},{},["epB2"], null)
//# sourceMappingURL=/main.js.map