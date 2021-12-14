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
})({"K6Ki":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

// 完美运动框架 利用json进行多物体多属性同时运动
// 演变过程：
// startMove(iTarget)                  运动框架
// startMove(obj,iTarget)              多物体
// startMove(obj,attr,iTarget)         任意值
// startMove(obj,attr,iTarget,fnEnd)   前一次运动结束后触发函数
// startMove(obj,json,fnEnd)           完美运动框架
function getStyle(obj, name) {
  if (obj.currentStyle) {
    return obj.currentStyle[name];
  } else {
    return getComputedStyle(obj, false)[name];
  }
} //startMove(oDiv, {width: 400, height: 400})


var startMove = function startMove(obj, json, fnEnd) {
  clearInterval(obj.timer);
  obj.timer = setInterval(function () {
    var bStop = true; //假设：所有值都已经到了

    for (var attr in json) {
      var cur = 0; //解决offset的bug

      if (attr == 'opacity') {
        cur = Math.round(parseFloat(getStyle(obj, attr)) * 100);
      } else {
        cur = parseInt(getStyle(obj, attr));
      }

      var speed = (json[attr] - cur) / 6;
      speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
      if (cur != json[attr]) bStop = false; //有某一属性未到达目标值

      if (attr == 'opacity') {
        obj.style.filter = 'alpha(opacity:' + (cur + speed) + ')';
        obj.style.opacity = (cur + speed) / 100;
      } else {
        obj.style[attr] = cur + speed + 'px';
      }
    }

    if (bStop) {
      clearInterval(obj.timer);
      if (fnEnd) fnEnd();
    }
  }, 30);
};

var _default = startMove;
exports.default = _default;
},{}]},{},["K6Ki"], null)
//# sourceMappingURL=move.dd230015.js.map