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
})({"epB2":[function(require,module,exports) {
var m = {
  data: {
    isPainting: false,
    last: null,
    isTouchDevice: 'ontouchstart' in window,
    curColor: ''
  },
  getPos: function getPos(ev) {
    //获取鼠标位置封装成函数
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    var scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
    return {
      x: ev.pageX + scrollLeft - 20,
      y: ev.pageY + scrollTop - 70
    }; //JSON形式返回
  }
};
var v = {
  canvas: document.getElementById('canvas'),
  colorChoseDiv: document.querySelector('#penColorChose'),
  sizeBtn: document.querySelector('#penSize'),
  sizeChoseDiv: document.querySelector('#penSizeChose'),
  ctx: null,
  init: function init() {
    this.canvas.width = document.documentElement.clientWidth;
    this.canvas.height = document.documentElement.clientHeight;
    this.ctx = v.canvas.getContext('2d');
    this.ctx.fillStyle = 'black';
    this.ctx.strokeStyle = '#000';
    this.ctx.lineWidth = 12;
    this.ctx.lineCap = "round";
  },
  draw: function draw(x1, y1, x2, y2) {
    this.ctx.beginPath();
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.stroke();
  }
};
var c = {
  mousedown: function mousedown(e) {
    var _m$getPos = m.getPos(e),
        x = _m$getPos.x,
        y = _m$getPos.y;

    m.data.isPainting = true;
    m.data.last = [x, y];
  },
  mousemove: function mousemove(e) {
    var _m$getPos2 = m.getPos(e),
        x = _m$getPos2.x,
        y = _m$getPos2.y;

    if (m.data.isPainting) {
      v.draw(m.data.last[0], m.data.last[1], x, y);
      m.data.last = [x, y];
    }
  },
  mouseup: function mouseup() {
    m.data.isPainting = false;
  },
  touchstart: function touchstart(e) {
    var _e$touches$ = e.touches[0],
        clientX = _e$touches$.clientX,
        clientY = _e$touches$.clientY;
    m.data.last = [clientX - 20, clientY - 70];
  },
  touchmove: function touchmove(e) {
    e.preventDefault();
    var _e$touches$2 = e.touches[0],
        clientX = _e$touches$2.clientX,
        clientY = _e$touches$2.clientY;
    v.draw(m.data.last[0], m.data.last[1], clientX - 20, clientY - 70);
    m.data.last = [clientX - 20, clientY - 70];
  },
  events: {
    "body": 'closePad',
    "#penColor": 'openColorPad',
    "#penSize": 'openSizePad',
    "#penEraser": 'openEraser',
    "#penClear": 'clearPalette',
    ".colorRed": 'setColor',
    ".colorGreen": 'setColor',
    ".colorBlue": 'setColor',
    ".colorBlack": 'setColor',
    ".sSize": 'setWidth',
    ".mSize": 'setWidth',
    ".lSize": 'setWidth'
  },
  bindEvents: function bindEvents() {
    for (var key in c.events) {
      if (c.events.hasOwnProperty(key)) {
        var value = c.events[key];
        document.querySelector(key).onclick = c[value];
      }
    }
  },
  closePad: function closePad() {
    v.colorChoseDiv.classList.remove('planActive');
    v.sizeChoseDiv.classList.remove('planActive');
  },
  openColorPad: function openColorPad(e) {
    v.colorChoseDiv.classList.add('planActive');
    e.cancelBubble = true;
  },
  openSizePad: function openSizePad(e) {
    v.ctx.strokeStyle = m.curColor;
    v.sizeBtn.classList.add('itemActive');
    penEraser.classList.remove('itemActive');
    v.sizeChoseDiv.classList.add('planActive');
    e.cancelBubble = true;
  },
  openEraser: function openEraser() {
    penEraser.classList.add('itemActive');
    v.sizeBtn.classList.remove('itemActive');
    v.ctx.strokeStyle = '#fff';
  },
  clearPalette: function clearPalette() {
    v.ctx.clearRect(0, 0, v.canvas.width, v.canvas.height);
  },
  setColor: function setColor(e) {
    var backgroundColor = e.target.style.backgroundColor;
    v.ctx.strokeStyle = backgroundColor;
    m.curColor = backgroundColor;
  },
  setWidth: function setWidth(e) {
    var width = e.target.style.width;
    var widthNum = parseInt(width.slice(0, 2));
    v.ctx.lineWidth = widthNum;
  },
  init: function init() {
    v.init();
    m.curColor = v.ctx.strokeStyle;

    if (m.data.isTouchDevice) {
      //触摸设备
      v.canvas.addEventListener('touchstart', c.touchstart);
      v.canvas.addEventListener('touchmove', c.touchmove);
    } else {
      //鼠标
      v.canvas.addEventListener('mousedown', c.mousedown);
      v.canvas.addEventListener('mousemove', c.mousemove);
      v.canvas.addEventListener('mouseup', c.mouseup);
    }

    c.bindEvents();
  }
};
c.init();
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.3de56314.js.map