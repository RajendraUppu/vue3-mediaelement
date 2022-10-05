import { defineComponent as fe, ref as ue, onMounted as ce, watch as me, openBlock as pe, createElementBlock as ge, withKeys as he } from "vue";
var oe = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, ve = { exports: {} };
function le(T) {
  throw new Error('Could not dynamically require "' + T + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var ye = {};
/*!
 * MediaElement.js
 * http://www.mediaelementjs.com/
 *
 * Wrapper that mimics native HTML5 MediaElement (audio and video)
 * using a variety of technologies (pure JavaScript, Flash, iframe)
 *
 * Copyright 2010-2017, John Dyer (http://j.hn/)
 * License: MIT
 *
 */
(function() {
  (function() {
    function T(J, x, z) {
      function O(I, C) {
        if (!x[I]) {
          if (!J[I]) {
            var N = typeof le == "function" && le;
            if (!C && N)
              return N(I, !0);
            if (B)
              return B(I, !0);
            var b = new Error("Cannot find module '" + I + "'");
            throw b.code = "MODULE_NOT_FOUND", b;
          }
          var s = x[I] = { exports: {} };
          J[I][0].call(s.exports, function(y) {
            var m = J[I][1][y];
            return O(m || y);
          }, s, s.exports, T, J, x, z);
        }
        return x[I].exports;
      }
      for (var B = typeof le == "function" && le, R = 0; R < z.length; R++)
        O(z[R]);
      return O;
    }
    return T;
  })()({ 1: [function(T, J, x) {
  }, {}], 2: [function(T, J, x) {
    (function(z) {
      var O = typeof z < "u" ? z : typeof window < "u" ? window : {}, B = T(1), R;
      typeof document < "u" ? R = document : (R = O["__GLOBAL_DOCUMENT_CACHE@4"], R || (R = O["__GLOBAL_DOCUMENT_CACHE@4"] = B)), J.exports = R;
    }).call(this, typeof oe < "u" ? oe : typeof self < "u" ? self : typeof window < "u" ? window : {});
  }, { 1: 1 }], 3: [function(T, J, x) {
    (function(z) {
      var O;
      typeof window < "u" ? O = window : typeof z < "u" ? O = z : typeof self < "u" ? O = self : O = {}, J.exports = O;
    }).call(this, typeof oe < "u" ? oe : typeof self < "u" ? self : typeof window < "u" ? window : {});
  }, {}], 4: [function(T, J, x) {
    (function(z) {
      var O = setTimeout;
      function B() {
      }
      function R(a, f) {
        return function() {
          a.apply(f, arguments);
        };
      }
      function I(a) {
        if (typeof this != "object")
          throw new TypeError("Promises must be constructed via new");
        if (typeof a != "function")
          throw new TypeError("not a function");
        this._state = 0, this._handled = !1, this._value = void 0, this._deferreds = [], m(a, this);
      }
      function C(a, f) {
        for (; a._state === 3; )
          a = a._value;
        if (a._state === 0) {
          a._deferreds.push(f);
          return;
        }
        a._handled = !0, I._immediateFn(function() {
          var c = a._state === 1 ? f.onFulfilled : f.onRejected;
          if (c === null) {
            (a._state === 1 ? N : b)(f.promise, a._value);
            return;
          }
          var n;
          try {
            n = c(a._value);
          } catch (u) {
            b(f.promise, u);
            return;
          }
          N(f.promise, n);
        });
      }
      function N(a, f) {
        try {
          if (f === a)
            throw new TypeError("A promise cannot be resolved with itself.");
          if (f && (typeof f == "object" || typeof f == "function")) {
            var c = f.then;
            if (f instanceof I) {
              a._state = 3, a._value = f, s(a);
              return;
            } else if (typeof c == "function") {
              m(R(c, f), a);
              return;
            }
          }
          a._state = 1, a._value = f, s(a);
        } catch (n) {
          b(a, n);
        }
      }
      function b(a, f) {
        a._state = 2, a._value = f, s(a);
      }
      function s(a) {
        a._state === 2 && a._deferreds.length === 0 && I._immediateFn(function() {
          a._handled || I._unhandledRejectionFn(a._value);
        });
        for (var f = 0, c = a._deferreds.length; f < c; f++)
          C(a, a._deferreds[f]);
        a._deferreds = null;
      }
      function y(a, f, c) {
        this.onFulfilled = typeof a == "function" ? a : null, this.onRejected = typeof f == "function" ? f : null, this.promise = c;
      }
      function m(a, f) {
        var c = !1;
        try {
          a(function(n) {
            c || (c = !0, N(f, n));
          }, function(n) {
            c || (c = !0, b(f, n));
          });
        } catch (n) {
          if (c)
            return;
          c = !0, b(f, n);
        }
      }
      I.prototype.catch = function(a) {
        return this.then(null, a);
      }, I.prototype.then = function(a, f) {
        var c = new this.constructor(B);
        return C(this, new y(a, f, c)), c;
      }, I.all = function(a) {
        var f = Array.prototype.slice.call(a);
        return new I(function(c, n) {
          if (f.length === 0)
            return c([]);
          var u = f.length;
          function o(r, l) {
            try {
              if (l && (typeof l == "object" || typeof l == "function")) {
                var w = l.then;
                if (typeof w == "function") {
                  w.call(l, function(g) {
                    o(r, g);
                  }, n);
                  return;
                }
              }
              f[r] = l, --u === 0 && c(f);
            } catch (g) {
              n(g);
            }
          }
          for (var i = 0; i < f.length; i++)
            o(i, f[i]);
        });
      }, I.resolve = function(a) {
        return a && typeof a == "object" && a.constructor === I ? a : new I(function(f) {
          f(a);
        });
      }, I.reject = function(a) {
        return new I(function(f, c) {
          c(a);
        });
      }, I.race = function(a) {
        return new I(function(f, c) {
          for (var n = 0, u = a.length; n < u; n++)
            a[n].then(f, c);
        });
      }, I._immediateFn = typeof setImmediate == "function" && function(a) {
        setImmediate(a);
      } || function(a) {
        O(a, 0);
      }, I._unhandledRejectionFn = function(f) {
        typeof console < "u" && console && console.warn("Possible Unhandled Promise Rejection:", f);
      }, I._setImmediateFn = function(f) {
        I._immediateFn = f;
      }, I._setUnhandledRejectionFn = function(f) {
        I._unhandledRejectionFn = f;
      }, typeof J < "u" && J.exports ? J.exports = I : z.Promise || (z.Promise = I);
    })(this);
  }, {}], 5: [function(T, J, x) {
    (function(z, O) {
      typeof J == "object" && J.exports ? J.exports = O() : z.svg4everybody = O();
    })(this, function() {
      /*! svg4everybody v2.1.9 | github.com/jonathantneal/svg4everybody */
      function z(I, C, N) {
        if (N) {
          var b = document.createDocumentFragment(), s = !C.hasAttribute("viewBox") && N.getAttribute("viewBox");
          s && C.setAttribute("viewBox", s);
          for (var y = N.cloneNode(!0); y.childNodes.length; )
            b.appendChild(y.firstChild);
          I.appendChild(b);
        }
      }
      function O(I) {
        I.onreadystatechange = function() {
          if (I.readyState === 4) {
            var C = I._cachedDocument;
            C || (C = I._cachedDocument = document.implementation.createHTMLDocument(""), C.body.innerHTML = I.responseText, I._cachedTarget = {}), I._embeds.splice(0).map(function(N) {
              var b = I._cachedTarget[N.id];
              b || (b = I._cachedTarget[N.id] = C.getElementById(N.id)), z(N.parent, N.svg, b);
            });
          }
        }, I.onreadystatechange();
      }
      function B(I) {
        function C() {
          for (var i = 0; i < u.length; ) {
            var r = u[i], l = r.parentNode, w = R(l), g = r.getAttribute("xlink:href") || r.getAttribute("href");
            if (!g && b.attributeName && (g = r.getAttribute(b.attributeName)), w && g) {
              if (N)
                if (!b.validate || b.validate(g, w, r)) {
                  l.removeChild(r);
                  var p = g.split("#"), P = p.shift(), F = p.join("#");
                  if (P.length) {
                    var D = c[P];
                    D || (D = c[P] = new XMLHttpRequest(), D.open("GET", P), D.send(), D._embeds = []), D._embeds.push({
                      parent: l,
                      svg: w,
                      id: F
                    }), O(D);
                  } else
                    z(l, w, document.getElementById(F));
                } else
                  ++i, ++o;
            } else
              ++i;
          }
          (!u.length || u.length - o > 0) && n(C, 67);
        }
        var N, b = Object(I), s = /\bTrident\/[567]\b|\bMSIE (?:9|10)\.0\b/, y = /\bAppleWebKit\/(\d+)\b/, m = /\bEdge\/12\.(\d+)\b/, a = /\bEdge\/.(\d+)\b/, f = window.top !== window.self;
        N = "polyfill" in b ? b.polyfill : s.test(navigator.userAgent) || (navigator.userAgent.match(m) || [])[1] < 10547 || (navigator.userAgent.match(y) || [])[1] < 537 || a.test(navigator.userAgent) && f;
        var c = {}, n = window.requestAnimationFrame || setTimeout, u = document.getElementsByTagName("use"), o = 0;
        N && C();
      }
      function R(I) {
        for (var C = I; C.nodeName.toLowerCase() !== "svg" && (C = C.parentNode); )
          ;
        return C;
      }
      return B;
    });
  }, {}], 6: [function(T, J, x) {
    Object.defineProperty(x, "__esModule", {
      value: !0
    });
    var z = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(b) {
      return typeof b;
    } : function(b) {
      return b && typeof Symbol == "function" && b.constructor === Symbol && b !== Symbol.prototype ? "symbol" : typeof b;
    }, O = T(8), B = C(O), R = T(16), I = T(28);
    function C(b) {
      return b && b.__esModule ? b : { default: b };
    }
    var N = { lang: "en", en: R.EN };
    N.language = function() {
      for (var b = arguments.length, s = Array(b), y = 0; y < b; y++)
        s[y] = arguments[y];
      if (s != null && s.length) {
        if (typeof s[0] != "string")
          throw new TypeError("Language code must be a string value");
        if (!/^[a-z]{2,3}((\-|_)[a-z]{2})?$/i.test(s[0]))
          throw new TypeError("Language code must have format 2-3 letters and. optionally, hyphen, underscore followed by 2 more letters");
        N.lang = s[0], N[s[0]] === void 0 ? (s[1] = s[1] !== null && s[1] !== void 0 && z(s[1]) === "object" ? s[1] : {}, N[s[0]] = (0, I.isObjectEmpty)(s[1]) ? R.EN : s[1]) : s[1] !== null && s[1] !== void 0 && z(s[1]) === "object" && (N[s[0]] = s[1]);
      }
      return N.lang;
    }, N.t = function(b) {
      var s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
      if (typeof b == "string" && b.length) {
        var y = void 0, m = void 0, a = N.language(), f = function(n, u, o) {
          if ((typeof n > "u" ? "undefined" : z(n)) !== "object" || typeof u != "number" || typeof o != "number")
            return n;
          var i = function() {
            return [function() {
              return arguments.length <= 1 ? void 0 : arguments[1];
            }, function() {
              return (arguments.length <= 0 ? void 0 : arguments[0]) === 1 ? arguments.length <= 1 ? void 0 : arguments[1] : arguments.length <= 2 ? void 0 : arguments[2];
            }, function() {
              return (arguments.length <= 0 ? void 0 : arguments[0]) === 0 || (arguments.length <= 0 ? void 0 : arguments[0]) === 1 ? arguments.length <= 1 ? void 0 : arguments[1] : arguments.length <= 2 ? void 0 : arguments[2];
            }, function() {
              return (arguments.length <= 0 ? void 0 : arguments[0]) % 10 === 1 && (arguments.length <= 0 ? void 0 : arguments[0]) % 100 !== 11 ? arguments.length <= 1 ? void 0 : arguments[1] : (arguments.length <= 0 ? void 0 : arguments[0]) !== 0 ? arguments.length <= 2 ? void 0 : arguments[2] : arguments.length <= 3 ? void 0 : arguments[3];
            }, function() {
              return (arguments.length <= 0 ? void 0 : arguments[0]) === 1 || (arguments.length <= 0 ? void 0 : arguments[0]) === 11 ? arguments.length <= 1 ? void 0 : arguments[1] : (arguments.length <= 0 ? void 0 : arguments[0]) === 2 || (arguments.length <= 0 ? void 0 : arguments[0]) === 12 ? arguments.length <= 2 ? void 0 : arguments[2] : (arguments.length <= 0 ? void 0 : arguments[0]) > 2 && (arguments.length <= 0 ? void 0 : arguments[0]) < 20 ? arguments.length <= 3 ? void 0 : arguments[3] : arguments.length <= 4 ? void 0 : arguments[4];
            }, function() {
              return (arguments.length <= 0 ? void 0 : arguments[0]) === 1 ? arguments.length <= 1 ? void 0 : arguments[1] : (arguments.length <= 0 ? void 0 : arguments[0]) === 0 || (arguments.length <= 0 ? void 0 : arguments[0]) % 100 > 0 && (arguments.length <= 0 ? void 0 : arguments[0]) % 100 < 20 ? arguments.length <= 2 ? void 0 : arguments[2] : arguments.length <= 3 ? void 0 : arguments[3];
            }, function() {
              return (arguments.length <= 0 ? void 0 : arguments[0]) % 10 === 1 && (arguments.length <= 0 ? void 0 : arguments[0]) % 100 !== 11 ? arguments.length <= 1 ? void 0 : arguments[1] : (arguments.length <= 0 ? void 0 : arguments[0]) % 10 >= 2 && ((arguments.length <= 0 ? void 0 : arguments[0]) % 100 < 10 || (arguments.length <= 0 ? void 0 : arguments[0]) % 100 >= 20) ? arguments.length <= 2 ? void 0 : arguments[2] : [3];
            }, function() {
              return (arguments.length <= 0 ? void 0 : arguments[0]) % 10 === 1 && (arguments.length <= 0 ? void 0 : arguments[0]) % 100 !== 11 ? arguments.length <= 1 ? void 0 : arguments[1] : (arguments.length <= 0 ? void 0 : arguments[0]) % 10 >= 2 && (arguments.length <= 0 ? void 0 : arguments[0]) % 10 <= 4 && ((arguments.length <= 0 ? void 0 : arguments[0]) % 100 < 10 || (arguments.length <= 0 ? void 0 : arguments[0]) % 100 >= 20) ? arguments.length <= 2 ? void 0 : arguments[2] : arguments.length <= 3 ? void 0 : arguments[3];
            }, function() {
              return (arguments.length <= 0 ? void 0 : arguments[0]) === 1 ? arguments.length <= 1 ? void 0 : arguments[1] : (arguments.length <= 0 ? void 0 : arguments[0]) >= 2 && (arguments.length <= 0 ? void 0 : arguments[0]) <= 4 ? arguments.length <= 2 ? void 0 : arguments[2] : arguments.length <= 3 ? void 0 : arguments[3];
            }, function() {
              return (arguments.length <= 0 ? void 0 : arguments[0]) === 1 ? arguments.length <= 1 ? void 0 : arguments[1] : (arguments.length <= 0 ? void 0 : arguments[0]) % 10 >= 2 && (arguments.length <= 0 ? void 0 : arguments[0]) % 10 <= 4 && ((arguments.length <= 0 ? void 0 : arguments[0]) % 100 < 10 || (arguments.length <= 0 ? void 0 : arguments[0]) % 100 >= 20) ? arguments.length <= 2 ? void 0 : arguments[2] : arguments.length <= 3 ? void 0 : arguments[3];
            }, function() {
              return (arguments.length <= 0 ? void 0 : arguments[0]) % 100 === 1 ? arguments.length <= 2 ? void 0 : arguments[2] : (arguments.length <= 0 ? void 0 : arguments[0]) % 100 === 2 ? arguments.length <= 3 ? void 0 : arguments[3] : (arguments.length <= 0 ? void 0 : arguments[0]) % 100 === 3 || (arguments.length <= 0 ? void 0 : arguments[0]) % 100 === 4 ? arguments.length <= 4 ? void 0 : arguments[4] : arguments.length <= 1 ? void 0 : arguments[1];
            }, function() {
              return (arguments.length <= 0 ? void 0 : arguments[0]) === 1 ? arguments.length <= 1 ? void 0 : arguments[1] : (arguments.length <= 0 ? void 0 : arguments[0]) === 2 ? arguments.length <= 2 ? void 0 : arguments[2] : (arguments.length <= 0 ? void 0 : arguments[0]) > 2 && (arguments.length <= 0 ? void 0 : arguments[0]) < 7 ? arguments.length <= 3 ? void 0 : arguments[3] : (arguments.length <= 0 ? void 0 : arguments[0]) > 6 && (arguments.length <= 0 ? void 0 : arguments[0]) < 11 ? arguments.length <= 4 ? void 0 : arguments[4] : arguments.length <= 5 ? void 0 : arguments[5];
            }, function() {
              return (arguments.length <= 0 ? void 0 : arguments[0]) === 0 ? arguments.length <= 1 ? void 0 : arguments[1] : (arguments.length <= 0 ? void 0 : arguments[0]) === 1 ? arguments.length <= 2 ? void 0 : arguments[2] : (arguments.length <= 0 ? void 0 : arguments[0]) === 2 ? arguments.length <= 3 ? void 0 : arguments[3] : (arguments.length <= 0 ? void 0 : arguments[0]) % 100 >= 3 && (arguments.length <= 0 ? void 0 : arguments[0]) % 100 <= 10 ? arguments.length <= 4 ? void 0 : arguments[4] : (arguments.length <= 0 ? void 0 : arguments[0]) % 100 >= 11 ? arguments.length <= 5 ? void 0 : arguments[5] : arguments.length <= 6 ? void 0 : arguments[6];
            }, function() {
              return (arguments.length <= 0 ? void 0 : arguments[0]) === 1 ? arguments.length <= 1 ? void 0 : arguments[1] : (arguments.length <= 0 ? void 0 : arguments[0]) === 0 || (arguments.length <= 0 ? void 0 : arguments[0]) % 100 > 1 && (arguments.length <= 0 ? void 0 : arguments[0]) % 100 < 11 ? arguments.length <= 2 ? void 0 : arguments[2] : (arguments.length <= 0 ? void 0 : arguments[0]) % 100 > 10 && (arguments.length <= 0 ? void 0 : arguments[0]) % 100 < 20 ? arguments.length <= 3 ? void 0 : arguments[3] : arguments.length <= 4 ? void 0 : arguments[4];
            }, function() {
              return (arguments.length <= 0 ? void 0 : arguments[0]) % 10 === 1 ? arguments.length <= 1 ? void 0 : arguments[1] : (arguments.length <= 0 ? void 0 : arguments[0]) % 10 === 2 ? arguments.length <= 2 ? void 0 : arguments[2] : arguments.length <= 3 ? void 0 : arguments[3];
            }, function() {
              return (arguments.length <= 0 ? void 0 : arguments[0]) !== 11 && (arguments.length <= 0 ? void 0 : arguments[0]) % 10 === 1 ? arguments.length <= 1 ? void 0 : arguments[1] : arguments.length <= 2 ? void 0 : arguments[2];
            }, function() {
              return (arguments.length <= 0 ? void 0 : arguments[0]) === 1 ? arguments.length <= 1 ? void 0 : arguments[1] : (arguments.length <= 0 ? void 0 : arguments[0]) % 10 >= 2 && (arguments.length <= 0 ? void 0 : arguments[0]) % 10 <= 4 && ((arguments.length <= 0 ? void 0 : arguments[0]) % 100 < 10 || (arguments.length <= 0 ? void 0 : arguments[0]) % 100 >= 20) ? arguments.length <= 2 ? void 0 : arguments[2] : arguments.length <= 3 ? void 0 : arguments[3];
            }, function() {
              return (arguments.length <= 0 ? void 0 : arguments[0]) === 1 ? arguments.length <= 1 ? void 0 : arguments[1] : (arguments.length <= 0 ? void 0 : arguments[0]) === 2 ? arguments.length <= 2 ? void 0 : arguments[2] : (arguments.length <= 0 ? void 0 : arguments[0]) !== 8 && (arguments.length <= 0 ? void 0 : arguments[0]) !== 11 ? arguments.length <= 3 ? void 0 : arguments[3] : arguments.length <= 4 ? void 0 : arguments[4];
            }, function() {
              return (arguments.length <= 0 ? void 0 : arguments[0]) === 0 ? arguments.length <= 1 ? void 0 : arguments[1] : arguments.length <= 2 ? void 0 : arguments[2];
            }, function() {
              return (arguments.length <= 0 ? void 0 : arguments[0]) === 1 ? arguments.length <= 1 ? void 0 : arguments[1] : (arguments.length <= 0 ? void 0 : arguments[0]) === 2 ? arguments.length <= 2 ? void 0 : arguments[2] : (arguments.length <= 0 ? void 0 : arguments[0]) === 3 ? arguments.length <= 3 ? void 0 : arguments[3] : arguments.length <= 4 ? void 0 : arguments[4];
            }, function() {
              return (arguments.length <= 0 ? void 0 : arguments[0]) === 0 ? arguments.length <= 1 ? void 0 : arguments[1] : (arguments.length <= 0 ? void 0 : arguments[0]) === 1 ? arguments.length <= 2 ? void 0 : arguments[2] : arguments.length <= 3 ? void 0 : arguments[3];
            }];
          }();
          return i[o].apply(null, [u].concat(n));
        };
        return N[a] !== void 0 && (y = N[a][b], s !== null && typeof s == "number" && (m = N[a]["mejs.plural-form"], y = f.apply(null, [y, s, m]))), !y && N.en && (y = N.en[b], s !== null && typeof s == "number" && (m = N.en["mejs.plural-form"], y = f.apply(null, [y, s, m]))), y = y || b, s !== null && typeof s == "number" && (y = y.replace("%1", s)), (0, I.escapeHTML)(y);
      }
      return b;
    }, B.default.i18n = N, typeof mejsL10n < "u" && B.default.i18n.language(mejsL10n.language, mejsL10n.strings), x.default = N;
  }, { 16: 16, 28: 28, 8: 8 }], 7: [function(T, J, x) {
    Object.defineProperty(x, "__esModule", {
      value: !0
    });
    var z = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(n) {
      return typeof n;
    } : function(n) {
      return n && typeof Symbol == "function" && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n;
    }, O = T(3), B = a(O), R = T(2), I = a(R), C = T(8), N = a(C), b = T(28), s = T(30), y = T(9), m = T(26);
    function a(n) {
      return n && n.__esModule ? n : { default: n };
    }
    function f(n, u) {
      if (!(n instanceof u))
        throw new TypeError("Cannot call a class as a function");
    }
    var c = function n(u, o, i) {
      var r = this;
      f(this, n);
      var l = this;
      i = Array.isArray(i) ? i : null, l.defaults = {
        renderers: [],
        fakeNodeName: "div",
        pluginPath: "build/",
        iconSprite: "mejs-controls.svg",
        shimScriptAccess: "sameDomain"
      }, o = Object.assign(l.defaults, o), l.mediaElement = I.default.createElement(o.fakeNodeName);
      var w = u, g = !1;
      if (typeof u == "string" ? l.mediaElement.originalNode = I.default.getElementById(u) : (l.mediaElement.originalNode = u, w = u.id), l.mediaElement.originalNode === void 0 || l.mediaElement.originalNode === null)
        return null;
      l.mediaElement.options = o, w = w || "mejs_" + Math.random().toString().slice(2), l.mediaElement.originalNode.setAttribute("id", w + "_from_mejs");
      var p = l.mediaElement.originalNode.tagName.toLowerCase();
      ["video", "audio"].indexOf(p) > -1 && !l.mediaElement.originalNode.getAttribute("preload") && l.mediaElement.originalNode.setAttribute("preload", "none"), l.mediaElement.originalNode.setAttribute("tabindex", -1), l.mediaElement.originalNode.parentNode.insertBefore(l.mediaElement, l.mediaElement.originalNode), l.mediaElement.appendChild(l.mediaElement.originalNode);
      var P = function(H, j) {
        if (B.default.location.protocol === "https:" && H.indexOf("http:") === 0 && m.IS_IOS && N.default.html5media.mediaTypes.indexOf(j) > -1) {
          var Q = new XMLHttpRequest();
          Q.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
              var Y = B.default.URL || B.default.webkitURL, $ = Y.createObjectURL(this.response);
              return l.mediaElement.originalNode.setAttribute("src", $), $;
            }
            return H;
          }, Q.open("GET", H), Q.responseType = "blob", Q.send();
        }
        return H;
      }, F = void 0;
      if (i !== null)
        F = i;
      else if (l.mediaElement.originalNode !== null)
        switch (F = [], l.mediaElement.originalNode.nodeName.toLowerCase()) {
          case "iframe":
            F.push({
              type: "",
              src: l.mediaElement.originalNode.getAttribute("src")
            });
            break;
          case "audio":
          case "video":
            var D = l.mediaElement.originalNode.children.length, v = l.mediaElement.originalNode.getAttribute("src");
            if (v) {
              var S = l.mediaElement.originalNode, e = (0, s.formatType)(v, S.getAttribute("type"));
              F.push({
                type: e,
                src: P(v, e)
              });
            }
            for (var d = 0; d < D; d++) {
              var t = l.mediaElement.originalNode.children[d];
              if (t.tagName.toLowerCase() === "source") {
                var h = t.getAttribute("src"), E = (0, s.formatType)(h, t.getAttribute("type"));
                F.push({ type: E, src: P(h, E) });
              }
            }
            break;
        }
      l.mediaElement.id = w, l.mediaElement.renderers = {}, l.mediaElement.events = {}, l.mediaElement.promises = [], l.mediaElement.renderer = null, l.mediaElement.rendererName = null, l.mediaElement.changeRenderer = function(G, H) {
        var j = r, Q = Object.keys(H[0]).length > 2 ? H[0] : H[0].src;
        if (j.mediaElement.renderer !== void 0 && j.mediaElement.renderer !== null && j.mediaElement.renderer.name === G)
          return j.mediaElement.renderer.pause(), j.mediaElement.renderer.stop && j.mediaElement.renderer.stop(), j.mediaElement.renderer.show(), j.mediaElement.renderer.setSrc(Q), !0;
        j.mediaElement.renderer !== void 0 && j.mediaElement.renderer !== null && (j.mediaElement.renderer.pause(), j.mediaElement.renderer.stop && j.mediaElement.renderer.stop(), j.mediaElement.renderer.hide());
        var Y = j.mediaElement.renderers[G], $ = null;
        if (Y != null)
          return Y.show(), Y.setSrc(Q), j.mediaElement.renderer = Y, j.mediaElement.rendererName = G, !0;
        for (var ee = j.mediaElement.options.renderers.length ? j.mediaElement.options.renderers : y.renderer.order, te = 0, ne = ee.length; te < ne; te++) {
          var re = ee[te];
          if (re === G) {
            var ae = y.renderer.renderers;
            $ = ae[re];
            var ie = Object.assign($.options, j.mediaElement.options);
            return Y = $.create(j.mediaElement, ie, H), Y.name = G, j.mediaElement.renderers[$.name] = Y, j.mediaElement.renderer = Y, j.mediaElement.rendererName = G, Y.show(), !0;
          }
        }
        return !1;
      }, l.mediaElement.setSize = function(G, H) {
        l.mediaElement.renderer !== void 0 && l.mediaElement.renderer !== null && l.mediaElement.renderer.setSize(G, H);
      }, l.mediaElement.generateError = function(G, H) {
        G = G || "", H = Array.isArray(H) ? H : [];
        var j = (0, b.createEvent)("error", l.mediaElement);
        j.message = G, j.urls = H, l.mediaElement.dispatchEvent(j), g = !0;
      };
      var A = N.default.html5media.properties, M = N.default.html5media.methods, k = function(H, j, Q, Y) {
        var $ = H[j], ee = function() {
          return Q.apply(H, [$]);
        }, te = function(re) {
          return $ = Y.apply(H, [re]), $;
        };
        Object.defineProperty(H, j, {
          get: ee,
          set: te
        });
      }, _ = function(H) {
        if (H !== "src") {
          var j = "" + H.substring(0, 1).toUpperCase() + H.substring(1), Q = function() {
            return l.mediaElement.renderer !== void 0 && l.mediaElement.renderer !== null && typeof l.mediaElement.renderer["get" + j] == "function" ? l.mediaElement.renderer["get" + j]() : null;
          }, Y = function(ee) {
            l.mediaElement.renderer !== void 0 && l.mediaElement.renderer !== null && typeof l.mediaElement.renderer["set" + j] == "function" && l.mediaElement.renderer["set" + j](ee);
          };
          k(l.mediaElement, H, Q, Y), l.mediaElement["get" + j] = Q, l.mediaElement["set" + j] = Y;
        }
      }, L = function() {
        return l.mediaElement.renderer !== void 0 && l.mediaElement.renderer !== null ? l.mediaElement.renderer.getSrc() : null;
      }, V = function(H) {
        var j = [];
        if (typeof H == "string")
          j.push({
            src: H,
            type: H ? (0, s.getTypeFromFile)(H) : ""
          });
        else if ((typeof H > "u" ? "undefined" : z(H)) === "object" && H.src !== void 0) {
          var Q = (0, s.absolutizeUrl)(H.src), Y = H.type, $ = Object.assign(H, {
            src: Q,
            type: (Y === "" || Y === null || Y === void 0) && Q ? (0, s.getTypeFromFile)(Q) : Y
          });
          j.push($);
        } else if (Array.isArray(H))
          for (var ee = 0, te = H.length; ee < te; ee++) {
            var ne = (0, s.absolutizeUrl)(H[ee].src), re = H[ee].type, ae = Object.assign(H[ee], {
              src: ne,
              type: (re === "" || re === null || re === void 0) && ne ? (0, s.getTypeFromFile)(ne) : re
            });
            j.push(ae);
          }
        var ie = y.renderer.select(j, l.mediaElement.options.renderers.length ? l.mediaElement.options.renderers : []), se = void 0;
        if (!l.mediaElement.paused && !(l.mediaElement.src == null || l.mediaElement.src === "") && (l.mediaElement.pause(), se = (0, b.createEvent)("pause", l.mediaElement), l.mediaElement.dispatchEvent(se)), l.mediaElement.originalNode.src = j[0].src || "", ie === null && j[0].src) {
          l.mediaElement.generateError("No renderer found", j);
          return;
        }
        var de = !(j[0].src == null || j[0].src === "");
        return de ? l.mediaElement.changeRenderer(ie.rendererName, j) : null;
      }, U = function(H, j) {
        try {
          if (H === "play" && (l.mediaElement.rendererName === "native_dash" || l.mediaElement.rendererName === "native_hls" || l.mediaElement.rendererName === "vimeo_iframe")) {
            var Q = l.mediaElement.renderer[H](j);
            return Q && typeof Q.then == "function" && Q.catch(function() {
              l.mediaElement.paused && setTimeout(function() {
                var Y = l.mediaElement.renderer.play();
                Y !== void 0 && Y.catch(function() {
                  l.mediaElement.renderer.paused || l.mediaElement.renderer.pause();
                });
              }, 150);
            }), Q;
          } else
            return l.mediaElement.renderer[H](j);
        } catch (Y) {
          throw l.mediaElement.generateError(Y, F), Y;
        }
      }, X = function(H) {
        l.mediaElement[H] = function() {
          for (var j = arguments.length, Q = Array(j), Y = 0; Y < j; Y++)
            Q[Y] = arguments[Y];
          return l.mediaElement.renderer !== void 0 && l.mediaElement.renderer !== null && typeof l.mediaElement.renderer[H] == "function" ? l.mediaElement.promises.length ? Promise.all(l.mediaElement.promises).then(function() {
            return U(H, Q);
          }).catch(function($) {
            return l.mediaElement.generateError($, F), Promise.reject($);
          }) : U(H, Q) : null;
        };
      };
      k(l.mediaElement, "src", L, V), l.mediaElement.getSrc = L, l.mediaElement.setSrc = V;
      for (var W = 0, q = A.length; W < q; W++)
        _(A[W]);
      for (var K = 0, Z = M.length; K < Z; K++)
        X(M[K]);
      return l.mediaElement.addEventListener = function(G, H) {
        l.mediaElement.events[G] = l.mediaElement.events[G] || [], l.mediaElement.events[G].push(H);
      }, l.mediaElement.removeEventListener = function(G, H) {
        if (!G)
          return l.mediaElement.events = {}, !0;
        var j = l.mediaElement.events[G];
        if (!j)
          return !0;
        if (!H)
          return l.mediaElement.events[G] = [], !0;
        for (var Q = 0; Q < j.length; Q++)
          if (j[Q] === H)
            return l.mediaElement.events[G].splice(Q, 1), !0;
        return !1;
      }, l.mediaElement.dispatchEvent = function(G) {
        var H = l.mediaElement.events[G.type];
        if (H)
          for (var j = 0; j < H.length; j++)
            H[j].apply(null, [G]);
      }, l.mediaElement.destroy = function() {
        var G = l.mediaElement.originalNode.cloneNode(!0), H = l.mediaElement.parentElement;
        G.removeAttribute("id"), G.remove(), l.mediaElement.remove(), H.appendChild(G);
      }, F.length && (l.mediaElement.src = F), l.mediaElement.promises.length ? Promise.all(l.mediaElement.promises).then(function() {
        l.mediaElement.options.success && l.mediaElement.options.success(l.mediaElement, l.mediaElement.originalNode);
      }).catch(function() {
        g && l.mediaElement.options.error && l.mediaElement.options.error(l.mediaElement, l.mediaElement.originalNode);
      }) : (l.mediaElement.options.success && l.mediaElement.options.success(l.mediaElement, l.mediaElement.originalNode), g && l.mediaElement.options.error && l.mediaElement.options.error(l.mediaElement, l.mediaElement.originalNode)), l.mediaElement;
    };
    B.default.MediaElement = c, N.default.MediaElement = c, x.default = c;
  }, { 2: 2, 26: 26, 28: 28, 3: 3, 30: 30, 8: 8, 9: 9 }], 8: [function(T, J, x) {
    Object.defineProperty(x, "__esModule", {
      value: !0
    });
    var z = T(3), O = B(z);
    function B(I) {
      return I && I.__esModule ? I : { default: I };
    }
    var R = {};
    R.version = "5.1.0", R.html5media = {
      properties: ["volume", "src", "currentTime", "muted", "duration", "paused", "ended", "buffered", "error", "networkState", "readyState", "seeking", "seekable", "currentSrc", "preload", "bufferedBytes", "bufferedTime", "initialTime", "startOffsetTime", "defaultPlaybackRate", "playbackRate", "played", "autoplay", "loop", "controls"],
      readOnlyProperties: ["duration", "paused", "ended", "buffered", "error", "networkState", "readyState", "seeking", "seekable"],
      methods: ["load", "play", "pause", "canPlayType"],
      events: ["loadstart", "durationchange", "loadedmetadata", "loadeddata", "progress", "canplay", "canplaythrough", "suspend", "abort", "error", "emptied", "stalled", "play", "playing", "pause", "waiting", "seeking", "seeked", "timeupdate", "ended", "ratechange", "volumechange"],
      mediaTypes: ["audio/mp3", "audio/ogg", "audio/oga", "audio/wav", "audio/x-wav", "audio/wave", "audio/x-pn-wav", "audio/mpeg", "audio/mp4", "video/mp4", "video/webm", "video/ogg", "video/ogv"]
    }, O.default.mejs = R, x.default = R;
  }, { 3: 3 }], 9: [function(T, J, x) {
    Object.defineProperty(x, "__esModule", {
      value: !0
    }), x.renderer = void 0;
    var z = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(s) {
      return typeof s;
    } : function(s) {
      return s && typeof Symbol == "function" && s.constructor === Symbol && s !== Symbol.prototype ? "symbol" : typeof s;
    }, O = function() {
      function s(y, m) {
        for (var a = 0; a < m.length; a++) {
          var f = m[a];
          f.enumerable = f.enumerable || !1, f.configurable = !0, "value" in f && (f.writable = !0), Object.defineProperty(y, f.key, f);
        }
      }
      return function(y, m, a) {
        return m && s(y.prototype, m), a && s(y, a), y;
      };
    }(), B = T(8), R = I(B);
    function I(s) {
      return s && s.__esModule ? s : { default: s };
    }
    function C(s, y) {
      if (!(s instanceof y))
        throw new TypeError("Cannot call a class as a function");
    }
    var N = function() {
      function s() {
        C(this, s), this.renderers = {}, this.order = [];
      }
      return O(s, [{
        key: "add",
        value: function(m) {
          if (m.name === void 0)
            throw new TypeError("renderer must contain at least `name` property");
          this.renderers[m.name] = m, this.order.push(m.name);
        }
      }, {
        key: "select",
        value: function(m) {
          var a = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [], f = a.length;
          if (a = a.length ? a : this.order, !f) {
            var c = [/^(html5|native)/i, /^flash/i, /iframe$/i], n = function(p) {
              for (var P = 0, F = c.length; P < F; P++)
                if (c[P].test(p))
                  return P;
              return c.length;
            };
            a.sort(function(g, p) {
              return n(g) - n(p);
            });
          }
          for (var u = 0, o = a.length; u < o; u++) {
            var i = a[u], r = this.renderers[i];
            if (r != null) {
              for (var l = 0, w = m.length; l < w; l++)
                if (typeof r.canPlayType == "function" && typeof m[l].type == "string" && r.canPlayType(m[l].type))
                  return {
                    rendererName: r.name,
                    src: m[l].src
                  };
            }
          }
          return null;
        }
      }, {
        key: "order",
        set: function(m) {
          if (!Array.isArray(m))
            throw new TypeError("order must be an array of strings.");
          this._order = m;
        },
        get: function() {
          return this._order;
        }
      }, {
        key: "renderers",
        set: function(m) {
          if (m !== null && (typeof m > "u" ? "undefined" : z(m)) !== "object")
            throw new TypeError("renderers must be an array of objects.");
          this._renderers = m;
        },
        get: function() {
          return this._renderers;
        }
      }]), s;
    }(), b = x.renderer = new N();
    R.default.Renderers = b;
  }, { 8: 8 }], 10: [function(T, J, x) {
    var z = T(3), O = u(z), B = T(2), R = u(B), I = T(6), C = u(I), N = T(17), b = u(N), s = T(26), y = n(s), m = T(28), a = T(27), f = T(30), c = T(29);
    function n(o) {
      if (o && o.__esModule)
        return o;
      var i = {};
      if (o != null)
        for (var r in o)
          Object.prototype.hasOwnProperty.call(o, r) && (i[r] = o[r]);
      return i.default = o, i;
    }
    function u(o) {
      return o && o.__esModule ? o : { default: o };
    }
    Object.assign(N.config, {
      usePluginFullScreen: !0,
      fullscreenText: null,
      useFakeFullscreen: !1
    }), Object.assign(b.default.prototype, {
      isFullScreen: !1,
      isNativeFullScreen: !1,
      isInIframe: !1,
      isPluginClickThroughCreated: !1,
      fullscreenMode: "",
      containerSizeTimeout: null,
      buildfullscreen: function(i) {
        if (!!i.isVideo) {
          i.isInIframe = O.default.location !== O.default.parent.location, i.detectFullscreenMode();
          var r = this, l = (0, m.isString)(r.options.fullscreenText) ? r.options.fullscreenText : C.default.t("mejs.fullscreen"), w = R.default.createElement("div");
          if (w.className = r.options.classPrefix + "button " + r.options.classPrefix + "fullscreen-button", w.innerHTML = (0, c.generateControlButton)(r.id, l, l, "" + r.media.options.iconSprite, ["icon-fullscreen", "icon-unfullscreen"], "" + r.options.classPrefix), r.addControlElement(w, "fullscreen"), w.addEventListener("click", function() {
            var p = y.HAS_TRUE_NATIVE_FULLSCREEN && y.IS_FULLSCREEN || i.isFullScreen;
            p ? i.exitFullScreen() : i.enterFullScreen();
          }), i.fullscreenBtn = w, r.options.keyActions.push({
            keys: [70],
            action: function(P, F, D, v) {
              v.ctrlKey || typeof P.enterFullScreen < "u" && (P.isFullScreen ? P.exitFullScreen() : P.enterFullScreen());
            }
          }), r.exitFullscreenCallback = function(p) {
            var P = p.which || p.keyCode || 0;
            r.options.enableKeyboard && P === 27 && (y.HAS_TRUE_NATIVE_FULLSCREEN && y.IS_FULLSCREEN || r.isFullScreen) && i.exitFullScreen();
          }, r.globalBind("keydown", r.exitFullscreenCallback), r.normalHeight = 0, r.normalWidth = 0, y.HAS_TRUE_NATIVE_FULLSCREEN) {
            var g = function() {
              i.isFullScreen && (y.isFullScreen() ? (i.isNativeFullScreen = !0, i.setControlsSize()) : (i.isNativeFullScreen = !1, i.exitFullScreen()));
            };
            i.globalBind(y.FULLSCREEN_EVENT_NAME, g);
          }
        }
      },
      cleanfullscreen: function(i) {
        i.exitFullScreen(), i.globalUnbind("keydown", i.exitFullscreenCallback);
      },
      detectFullscreenMode: function() {
        var i = this, r = i.media.rendererName !== null && /(native|html5)/i.test(i.media.rendererName), l = "";
        return y.HAS_TRUE_NATIVE_FULLSCREEN && r ? l = "native-native" : y.HAS_TRUE_NATIVE_FULLSCREEN && !r ? l = "plugin-native" : i.usePluginFullScreen && y.SUPPORT_POINTER_EVENTS && (l = "plugin-click"), i.fullscreenMode = l, l;
      },
      enterFullScreen: function() {
        var i = this, r = i.media.rendererName !== null && /(html5|native)/i.test(i.media.rendererName), l = getComputedStyle(i.getElement(i.container));
        if (!!i.isVideo) {
          if (i.options.useFakeFullscreen === !1 && (y.IS_IOS || y.IS_SAFARI) && y.HAS_IOS_FULLSCREEN && typeof i.media.originalNode.webkitEnterFullscreen == "function" && i.media.originalNode.canPlayType((0, f.getTypeFromFile)(i.media.getSrc()))) {
            i.media.originalNode.webkitEnterFullscreen();
            return;
          }
          if ((0, a.addClass)(R.default.documentElement, i.options.classPrefix + "fullscreen"), (0, a.addClass)(i.getElement(i.container), i.options.classPrefix + "container-fullscreen"), i.normalHeight = parseFloat(l.height), i.normalWidth = parseFloat(l.width), (i.fullscreenMode === "native-native" || i.fullscreenMode === "plugin-native") && (y.requestFullScreen(i.getElement(i.container)), i.isInIframe && setTimeout(function d() {
            if (i.isNativeFullScreen) {
              var t = 2e-3, h = O.default.innerWidth || R.default.documentElement.clientWidth || R.default.body.clientWidth, E = screen.width, A = Math.abs(E - h), M = E * t;
              A > M ? i.exitFullScreen() : setTimeout(d, 500);
            }
          }, 1e3)), i.getElement(i.container).style.width = "100%", i.getElement(i.container).style.height = "100%", i.containerSizeTimeout = setTimeout(function() {
            i.getElement(i.container).style.width = "100%", i.getElement(i.container).style.height = "100%", i.setControlsSize();
          }, 500), r)
            i.node.style.width = "100%", i.node.style.height = "100%";
          else
            for (var w = i.getElement(i.container).querySelectorAll("embed, object, video"), g = w.length, p = 0; p < g; p++)
              w[p].style.width = "100%", w[p].style.height = "100%";
          i.options.setDimensions && typeof i.media.setSize == "function" && i.media.setSize(screen.width, screen.height);
          for (var P = i.getElement(i.layers).children, F = P.length, D = 0; D < F; D++)
            P[D].style.width = "100%", P[D].style.height = "100%";
          i.fullscreenBtn && ((0, a.removeClass)(i.fullscreenBtn, i.options.classPrefix + "fullscreen"), (0, a.addClass)(i.fullscreenBtn, i.options.classPrefix + "unfullscreen")), i.setControlsSize(), i.isFullScreen = !0;
          var v = Math.min(screen.width / i.width, screen.height / i.height), S = i.getElement(i.container).querySelector("." + i.options.classPrefix + "captions-text");
          S && (S.style.fontSize = v * 100 + "%", S.style.lineHeight = "normal", i.getElement(i.container).querySelector("." + i.options.classPrefix + "captions-position").style.bottom = (screen.height - i.normalHeight) / 2 - i.getElement(i.controls).offsetHeight / 2 + v + 15 + "px");
          var e = (0, m.createEvent)("enteredfullscreen", i.getElement(i.container));
          i.getElement(i.container).dispatchEvent(e);
        }
      },
      exitFullScreen: function() {
        var i = this, r = i.media.rendererName !== null && /(native|html5)/i.test(i.media.rendererName);
        if (!!i.isVideo) {
          if (clearTimeout(i.containerSizeTimeout), y.HAS_TRUE_NATIVE_FULLSCREEN && (y.IS_FULLSCREEN || i.isFullScreen) && y.cancelFullScreen(), (0, a.removeClass)(R.default.documentElement, i.options.classPrefix + "fullscreen"), (0, a.removeClass)(i.getElement(i.container), i.options.classPrefix + "container-fullscreen"), i.options.setDimensions) {
            if (i.getElement(i.container).style.width = i.normalWidth + "px", i.getElement(i.container).style.height = i.normalHeight + "px", r)
              i.node.style.width = i.normalWidth + "px", i.node.style.height = i.normalHeight + "px";
            else
              for (var l = i.getElement(i.container).querySelectorAll("embed, object, video"), w = l.length, g = 0; g < w; g++)
                l[g].style.width = i.normalWidth + "px", l[g].style.height = i.normalHeight + "px";
            typeof i.media.setSize == "function" && i.media.setSize(i.normalWidth, i.normalHeight);
            for (var p = i.getElement(i.layers).children, P = p.length, F = 0; F < P; F++)
              p[F].style.width = i.normalWidth + "px", p[F].style.height = i.normalHeight + "px";
          }
          i.fullscreenBtn && ((0, a.removeClass)(i.fullscreenBtn, i.options.classPrefix + "unfullscreen"), (0, a.addClass)(i.fullscreenBtn, i.options.classPrefix + "fullscreen")), i.setControlsSize(), i.isFullScreen = !1;
          var D = i.getElement(i.container).querySelector("." + i.options.classPrefix + "captions-text");
          D && (D.style.fontSize = "", D.style.lineHeight = "", i.getElement(i.container).querySelector("." + i.options.classPrefix + "captions-position").style.bottom = "");
          var v = (0, m.createEvent)("exitedfullscreen", i.getElement(i.container));
          i.getElement(i.container).dispatchEvent(v);
        }
      }
    });
  }, { 17: 17, 2: 2, 26: 26, 27: 27, 28: 28, 29: 29, 3: 3, 30: 30, 6: 6 }], 11: [function(T, J, x) {
    var z = T(2), O = y(z), B = T(17), R = y(B), I = T(6), C = y(I), N = T(28), b = T(27), s = T(29);
    function y(m) {
      return m && m.__esModule ? m : { default: m };
    }
    Object.assign(B.config, {
      playText: null,
      pauseText: null
    }), Object.assign(R.default.prototype, {
      buildplaypause: function(a, f, c, n) {
        var u = this, o = u.options, i = (0, N.isString)(o.playText) ? o.playText : C.default.t("mejs.play"), r = (0, N.isString)(o.pauseText) ? o.pauseText : C.default.t("mejs.pause"), l = O.default.createElement("div");
        l.className = u.options.classPrefix + "button " + u.options.classPrefix + "playpause-button " + u.options.classPrefix + "play", l.innerHTML = (0, s.generateControlButton)(u.id, r, i, "" + u.media.options.iconSprite, ["icon-play", "icon-pause", "icon-replay"], "" + u.options.classPrefix), l.addEventListener("click", function() {
          u.paused ? u.play() : u.pause();
        });
        var w = l.querySelector("button");
        u.addControlElement(l, "playpause");
        function g(p) {
          (0, b.removeClass)(l, u.options.classPrefix + "play"), (0, b.removeClass)(l, u.options.classPrefix + "replay"), (0, b.removeClass)(l, u.options.classPrefix + "pause"), p === "play" ? ((0, b.addClass)(l, u.options.classPrefix + "pause"), w.setAttribute("title", r), w.setAttribute("aria-label", r)) : p === "pse" ? ((0, b.addClass)(l, u.options.classPrefix + "play"), w.setAttribute("title", i), w.setAttribute("aria-label", i)) : ((0, b.addClass)(l, u.options.classPrefix + "replay"), w.setAttribute("title", i), w.setAttribute("aria-label", i));
        }
        g("pse"), n.addEventListener("loadedmetadata", function() {
          n.rendererName.indexOf("flash") === -1 && g("pse");
        }), n.addEventListener("play", function() {
          g("play");
        }), n.addEventListener("playing", function() {
          g("play");
        }), n.addEventListener("pause", function() {
          g("pse");
        }), n.addEventListener("ended", function() {
          a.options.loop || setTimeout(function() {
            g("replay");
          }, 0);
        });
      }
    });
  }, { 17: 17, 2: 2, 27: 27, 28: 28, 29: 29, 6: 6 }], 12: [function(T, J, x) {
    var z = T(2), O = y(z), B = T(17), R = y(B), I = T(6), C = y(I), N = T(26), b = T(32), s = T(27);
    function y(m) {
      return m && m.__esModule ? m : { default: m };
    }
    Object.assign(B.config, {
      enableProgressTooltip: !0,
      useSmoothHover: !0,
      forceLive: !1
    }), Object.assign(R.default.prototype, {
      buildprogress: function(a, f, c, n) {
        var u = 0, o = !1, i = !1, r = this, l = a.options.autoRewind, w = a.options.enableProgressTooltip ? '<span class="' + r.options.classPrefix + 'time-float">' + ('<span class="' + r.options.classPrefix + 'time-float-current">00:00</span>') + ('<span class="' + r.options.classPrefix + 'time-float-corner"></span>') + "</span>" : "", g = O.default.createElement("div");
        g.className = r.options.classPrefix + "time-rail", g.innerHTML = '<span class="' + r.options.classPrefix + "time-total " + r.options.classPrefix + 'time-slider">' + ('<span class="' + r.options.classPrefix + 'time-buffering"></span>') + ('<span class="' + r.options.classPrefix + 'time-loaded"></span>') + ('<span class="' + r.options.classPrefix + 'time-current"></span>') + ('<span class="' + r.options.classPrefix + 'time-hovered no-hover"></span>') + ('<span class="' + r.options.classPrefix + 'time-handle"><span class="' + r.options.classPrefix + 'time-handle-content"></span></span>') + ("" + w) + "</span>", r.addControlElement(g, "progress"), r.options.keyActions.push({
          keys: [37, 227],
          action: function(t) {
            if (!isNaN(t.duration) && t.duration > 0) {
              t.isVideo && (t.showControls(), t.startControlsTimer());
              var h = t.getElement(t.container).querySelector("." + r.options.classPrefix + "time-total");
              h && h.focus();
              var E = Math.max(t.currentTime - t.options.defaultSeekBackwardInterval(t), 0);
              t.paused || t.pause(), setTimeout(function() {
                t.setCurrentTime(E, !0);
              }, 0), setTimeout(function() {
                t.play();
              }, 0);
            }
          }
        }, {
          keys: [39, 228],
          action: function(t) {
            if (!isNaN(t.duration) && t.duration > 0) {
              t.isVideo && (t.showControls(), t.startControlsTimer());
              var h = t.getElement(t.container).querySelector("." + r.options.classPrefix + "time-total");
              h && h.focus();
              var E = Math.min(t.currentTime + t.options.defaultSeekForwardInterval(t), t.duration);
              t.paused || t.pause(), setTimeout(function() {
                t.setCurrentTime(E, !0);
              }, 0), setTimeout(function() {
                t.play();
              }, 0);
            }
          }
        }), r.rail = f.querySelector("." + r.options.classPrefix + "time-rail"), r.total = f.querySelector("." + r.options.classPrefix + "time-total"), r.loaded = f.querySelector("." + r.options.classPrefix + "time-loaded"), r.current = f.querySelector("." + r.options.classPrefix + "time-current"), r.handle = f.querySelector("." + r.options.classPrefix + "time-handle"), r.timefloat = f.querySelector("." + r.options.classPrefix + "time-float"), r.timefloatcurrent = f.querySelector("." + r.options.classPrefix + "time-float-current"), r.slider = f.querySelector("." + r.options.classPrefix + "time-slider"), r.hovered = f.querySelector("." + r.options.classPrefix + "time-hovered"), r.buffer = f.querySelector("." + r.options.classPrefix + "time-buffering"), r.newTime = 0, r.forcedHandlePause = !1, r.setTransformStyle = function(d, t) {
          d.style.transform = t, d.style.webkitTransform = t, d.style.MozTransform = t, d.style.msTransform = t, d.style.OTransform = t;
        }, r.buffer.style.display = "none";
        var p = function(t) {
          var h = getComputedStyle(r.total), E = (0, s.offset)(r.total), A = r.total.offsetWidth, M = function() {
            return h.webkitTransform !== void 0 ? "webkitTransform" : h.mozTransform !== void 0 ? "mozTransform " : h.oTransform !== void 0 ? "oTransform" : h.msTransform !== void 0 ? "msTransform" : "transform";
          }(), k = function() {
            if ("WebKitCSSMatrix" in window)
              return "WebKitCSSMatrix";
            if ("MSCSSMatrix" in window)
              return "MSCSSMatrix";
            if ("CSSMatrix" in window)
              return "CSSMatrix";
          }(), _ = 0, L = 0, V = 0, U = void 0;
          if (t.originalEvent && t.originalEvent.changedTouches ? U = t.originalEvent.changedTouches[0].pageX : t.changedTouches ? U = t.changedTouches[0].pageX : U = t.pageX, r.getDuration()) {
            if (U < E.left ? U = E.left : U > A + E.left && (U = A + E.left), V = U - E.left, _ = V / A, r.newTime = _ * r.getDuration(), o && r.getCurrentTime() !== null && r.newTime.toFixed(4) !== r.getCurrentTime().toFixed(4) && (r.setCurrentRailHandle(r.newTime), r.updateCurrent(r.newTime)), !N.IS_IOS && !N.IS_ANDROID) {
              if (V < 0 && (V = 0), r.options.useSmoothHover && k !== null && typeof window[k] < "u") {
                var X = new window[k](getComputedStyle(r.handle)[M]), W = X.m41, q = V / parseFloat(getComputedStyle(r.total).width) - W / parseFloat(getComputedStyle(r.total).width);
                r.hovered.style.left = W + "px", r.setTransformStyle(r.hovered, "scaleX(" + q + ")"), r.hovered.setAttribute("pos", V), q >= 0 ? (0, s.removeClass)(r.hovered, "negative") : (0, s.addClass)(r.hovered, "negative");
              }
              if (r.timefloat) {
                var K = r.timefloat.offsetWidth / 2, Z = mejs.Utils.offset(r.getElement(r.container)), G = getComputedStyle(r.timefloat);
                U - Z.left < r.timefloat.offsetWidth ? L = K : U - Z.left >= r.getElement(r.container).offsetWidth - K ? L = r.total.offsetWidth - K : L = V, (0, s.hasClass)(r.getElement(r.container), r.options.classPrefix + "long-video") && (L += parseFloat(G.marginLeft) / 2 + r.timefloat.offsetWidth / 2), r.timefloat.style.left = L + "px", r.timefloatcurrent.innerHTML = (0, b.secondsToTimeCode)(r.newTime, a.options.alwaysShowHours, a.options.showTimecodeFrameCount, a.options.framesPerSecond, a.options.secondsDecimalLength, a.options.timeFormat), r.timefloat.style.display = "block";
              }
            }
          } else
            !N.IS_IOS && !N.IS_ANDROID && r.timefloat && (L = r.timefloat.offsetWidth + A >= r.getElement(r.container).offsetWidth ? r.timefloat.offsetWidth / 2 : 0, r.timefloat.style.left = L + "px", r.timefloat.style.left = L + "px", r.timefloat.style.display = "block");
        }, P = function() {
          var t = r.getCurrentTime(), h = C.default.t("mejs.time-slider"), E = (0, b.secondsToTimeCode)(t, a.options.alwaysShowHours, a.options.showTimecodeFrameCount, a.options.framesPerSecond, a.options.secondsDecimalLength, a.options.timeFormat), A = r.getDuration();
          r.slider.setAttribute("role", "slider"), r.slider.tabIndex = 0, n.paused ? (r.slider.setAttribute("aria-label", h), r.slider.setAttribute("aria-valuemin", 0), r.slider.setAttribute("aria-valuemax", isNaN(A) ? 0 : A), r.slider.setAttribute("aria-valuenow", t), r.slider.setAttribute("aria-valuetext", E)) : (r.slider.removeAttribute("aria-label"), r.slider.removeAttribute("aria-valuemin"), r.slider.removeAttribute("aria-valuemax"), r.slider.removeAttribute("aria-valuenow"), r.slider.removeAttribute("aria-valuetext"));
        }, F = function() {
          new Date() - u >= 1e3 && r.play();
        }, D = function() {
          o && r.getCurrentTime() !== null && r.newTime.toFixed(4) !== r.getCurrentTime().toFixed(4) && (r.setCurrentTime(r.newTime, !0), r.setCurrentRailHandle(r.newTime), r.updateCurrent(r.newTime)), r.forcedHandlePause && (r.slider.focus(), r.play()), r.forcedHandlePause = !1;
        };
        r.slider.addEventListener("focus", function() {
          a.options.autoRewind = !1;
        }), r.slider.addEventListener("blur", function() {
          a.options.autoRewind = l;
        }), r.slider.addEventListener("keydown", function(d) {
          if (new Date() - u >= 1e3 && (i = r.paused), r.options.enableKeyboard && r.options.keyActions.length) {
            var t = d.which || d.keyCode || 0, h = r.getDuration(), E = a.options.defaultSeekForwardInterval(n), A = a.options.defaultSeekBackwardInterval(n), M = r.getCurrentTime(), k = r.getElement(r.container).querySelector("." + r.options.classPrefix + "volume-slider");
            if (t === 38 || t === 40) {
              k && (k.style.display = "block"), r.isVideo && (r.showControls(), r.startControlsTimer());
              var _ = t === 38 ? Math.min(r.volume + 0.1, 1) : Math.max(r.volume - 0.1, 0), L = _ <= 0;
              r.setVolume(_), r.setMuted(L);
              return;
            } else
              k && (k.style.display = "none");
            switch (t) {
              case 37:
                r.getDuration() !== 1 / 0 && (M -= A);
                break;
              case 39:
                r.getDuration() !== 1 / 0 && (M += E);
                break;
              case 36:
                M = 0;
                break;
              case 35:
                M = h;
                break;
              case 13:
              case 32:
                N.IS_FIREFOX && (r.paused ? r.play() : r.pause());
                return;
              default:
                return;
            }
            M = M < 0 || isNaN(M) ? 0 : M >= h ? h : Math.floor(M), u = new Date(), i || a.pause(), setTimeout(function() {
              r.setCurrentTime(M, !0);
            }, 0), M < r.getDuration() && !i && setTimeout(F, 1100), a.showControls(), d.preventDefault(), d.stopPropagation();
          }
        });
        var v = ["mousedown", "touchstart"];
        r.slider.addEventListener("dragstart", function() {
          return !1;
        });
        for (var S = 0, e = v.length; S < e; S++)
          r.slider.addEventListener(v[S], function(d) {
            if (r.forcedHandlePause = !1, r.getDuration() !== 1 / 0 && (d.which === 1 || d.which === 0)) {
              r.paused || (r.pause(), r.forcedHandlePause = !0), o = !0, p(d);
              for (var t = ["mouseup", "touchend"], h = 0, E = t.length; h < E; h++)
                r.getElement(r.container).addEventListener(t[h], function(A) {
                  var M = A.target;
                  (M === r.slider || M.closest("." + r.options.classPrefix + "time-slider")) && p(A);
                });
              r.globalBind("mouseup.dur touchend.dur", function() {
                D(), o = !1, r.timefloat && (r.timefloat.style.display = "none");
              });
            }
          }, N.SUPPORT_PASSIVE_EVENT && v[S] === "touchstart" ? { passive: !0 } : !1);
        r.slider.addEventListener("mouseenter", function(d) {
          d.target === r.slider && r.getDuration() !== 1 / 0 && (r.getElement(r.container).addEventListener("mousemove", function(t) {
            var h = t.target;
            (h === r.slider || h.closest("." + r.options.classPrefix + "time-slider")) && p(t);
          }), r.timefloat && !N.IS_IOS && !N.IS_ANDROID && (r.timefloat.style.display = "block"), r.hovered && !N.IS_IOS && !N.IS_ANDROID && r.options.useSmoothHover && (0, s.removeClass)(r.hovered, "no-hover"));
        }), r.slider.addEventListener("mouseleave", function() {
          r.getDuration() !== 1 / 0 && (o || (r.timefloat && (r.timefloat.style.display = "none"), r.hovered && r.options.useSmoothHover && (0, s.addClass)(r.hovered, "no-hover")));
        }), r.broadcastCallback = function(d) {
          var t = f.querySelector("." + r.options.classPrefix + "broadcast");
          if (!r.options.forceLive && r.getDuration() !== 1 / 0)
            t && (r.slider.style.display = "", t.remove()), a.setProgressRail(d), r.forcedHandlePause || a.setCurrentRail(d), P();
          else if (!t && r.options.forceLive) {
            var h = O.default.createElement("span");
            h.className = r.options.classPrefix + "broadcast", h.innerText = C.default.t("mejs.live-broadcast"), r.slider.style.display = "none", r.rail.appendChild(h);
          }
        }, n.addEventListener("progress", r.broadcastCallback), n.addEventListener("timeupdate", r.broadcastCallback), n.addEventListener("play", function() {
          r.buffer.style.display = "none";
        }), n.addEventListener("playing", function() {
          r.buffer.style.display = "none";
        }), n.addEventListener("seeking", function() {
          r.buffer.style.display = "";
        }), n.addEventListener("seeked", function() {
          r.buffer.style.display = "none";
        }), n.addEventListener("pause", function() {
          r.buffer.style.display = "none";
        }), n.addEventListener("waiting", function() {
          r.buffer.style.display = "";
        }), n.addEventListener("loadeddata", function() {
          r.buffer.style.display = "";
        }), n.addEventListener("canplay", function() {
          r.buffer.style.display = "none";
        }), n.addEventListener("error", function() {
          r.buffer.style.display = "none";
        }), r.getElement(r.container).addEventListener("controlsresize", function(d) {
          r.getDuration() !== 1 / 0 && (a.setProgressRail(d), r.forcedHandlePause || a.setCurrentRail(d));
        });
      },
      cleanprogress: function(a, f, c, n) {
        n.removeEventListener("progress", a.broadcastCallback), n.removeEventListener("timeupdate", a.broadcastCallback), a.rail && a.rail.remove();
      },
      setProgressRail: function(a) {
        var f = this, c = a !== void 0 ? a.detail.target || a.target : f.media, n = null;
        c && c.buffered && c.buffered.length > 0 && c.buffered.end && f.getDuration() ? n = c.buffered.end(c.buffered.length - 1) / f.getDuration() : c && c.bytesTotal !== void 0 && c.bytesTotal > 0 && c.bufferedBytes !== void 0 ? n = c.bufferedBytes / c.bytesTotal : a && a.lengthComputable && a.total !== 0 && (n = a.loaded / a.total), n !== null && (n = Math.min(1, Math.max(0, n)), f.loaded && f.setTransformStyle(f.loaded, "scaleX(" + n + ")"));
      },
      setCurrentRailHandle: function(a) {
        var f = this;
        f.setCurrentRailMain(f, a);
      },
      setCurrentRail: function() {
        var a = this;
        a.setCurrentRailMain(a);
      },
      setCurrentRailMain: function(a, f) {
        if (a.getCurrentTime() !== void 0 && a.getDuration()) {
          var c = typeof f > "u" ? a.getCurrentTime() : f;
          if (a.total && a.handle) {
            var n = parseFloat(getComputedStyle(a.total).width), u = Math.round(n * c / a.getDuration()), o = u - Math.round(a.handle.offsetWidth / 2);
            if (o = o < 0 ? 0 : o, a.setTransformStyle(a.current, "scaleX(" + u / n + ")"), a.setTransformStyle(a.handle, "translateX(" + o + "px)"), a.options.useSmoothHover && !(0, s.hasClass)(a.hovered, "no-hover")) {
              var i = parseInt(a.hovered.getAttribute("pos"), 10);
              i = isNaN(i) ? 0 : i;
              var r = i / n - o / n;
              a.hovered.style.left = o + "px", a.setTransformStyle(a.hovered, "scaleX(" + r + ")"), r >= 0 ? (0, s.removeClass)(a.hovered, "negative") : (0, s.addClass)(a.hovered, "negative");
            }
          }
        }
      }
    });
  }, { 17: 17, 2: 2, 26: 26, 27: 27, 32: 32, 6: 6 }], 13: [function(T, J, x) {
    var z = T(2), O = N(z), B = T(17), R = N(B), I = T(32), C = T(27);
    function N(b) {
      return b && b.__esModule ? b : { default: b };
    }
    Object.assign(B.config, {
      duration: 0,
      timeAndDurationSeparator: "<span> | </span>"
    }), Object.assign(R.default.prototype, {
      buildcurrent: function(s, y, m, a) {
        var f = this, c = O.default.createElement("div");
        c.className = f.options.classPrefix + "time", c.setAttribute("role", "timer"), c.setAttribute("aria-live", "off"), c.innerHTML = '<span class="' + f.options.classPrefix + 'currenttime">' + (0, I.secondsToTimeCode)(0, s.options.alwaysShowHours, s.options.showTimecodeFrameCount, s.options.framesPerSecond, s.options.secondsDecimalLength, s.options.timeFormat) + "</span>", f.addControlElement(c, "current"), s.updateCurrent(), f.updateTimeCallback = function() {
          f.controlsAreVisible && s.updateCurrent();
        }, a.addEventListener("timeupdate", f.updateTimeCallback);
      },
      cleancurrent: function(s, y, m, a) {
        a.removeEventListener("timeupdate", s.updateTimeCallback);
      },
      buildduration: function(s, y, m, a) {
        var f = this, c = y.lastChild.querySelector("." + f.options.classPrefix + "currenttime");
        if (c)
          y.querySelector("." + f.options.classPrefix + "time").innerHTML += f.options.timeAndDurationSeparator + '<span class="' + f.options.classPrefix + 'duration">' + ((0, I.secondsToTimeCode)(f.options.duration, f.options.alwaysShowHours, f.options.showTimecodeFrameCount, f.options.framesPerSecond, f.options.secondsDecimalLength, f.options.timeFormat) + "</span>");
        else {
          y.querySelector("." + f.options.classPrefix + "currenttime") && (0, C.addClass)(y.querySelector("." + f.options.classPrefix + "currenttime").parentNode, f.options.classPrefix + "currenttime-container");
          var n = O.default.createElement("div");
          n.className = f.options.classPrefix + "time " + f.options.classPrefix + "duration-container", n.innerHTML = '<span class="' + f.options.classPrefix + 'duration">' + ((0, I.secondsToTimeCode)(f.options.duration, f.options.alwaysShowHours, f.options.showTimecodeFrameCount, f.options.framesPerSecond, f.options.secondsDecimalLength, f.options.timeFormat) + "</span>"), f.addControlElement(n, "duration");
        }
        f.updateDurationCallback = function() {
          f.controlsAreVisible && s.updateDuration();
        }, a.addEventListener("timeupdate", f.updateDurationCallback);
      },
      cleanduration: function(s, y, m, a) {
        a.removeEventListener("timeupdate", s.updateDurationCallback);
      },
      updateCurrent: function() {
        var s = this, y = s.getCurrentTime();
        isNaN(y) && (y = 0);
        var m = (0, I.secondsToTimeCode)(y, s.options.alwaysShowHours, s.options.showTimecodeFrameCount, s.options.framesPerSecond, s.options.secondsDecimalLength, s.options.timeFormat);
        m.length > 5 ? (0, C.addClass)(s.getElement(s.container), s.options.classPrefix + "long-video") : (0, C.removeClass)(s.getElement(s.container), s.options.classPrefix + "long-video"), s.getElement(s.controls).querySelector("." + s.options.classPrefix + "currenttime") && (s.getElement(s.controls).querySelector("." + s.options.classPrefix + "currenttime").innerText = m);
      },
      updateDuration: function() {
        var s = this, y = s.getDuration();
        s.media !== void 0 && (isNaN(y) || y === 1 / 0 || y < 0) && (s.media.duration = s.options.duration = y = 0), s.options.duration > 0 && (y = s.options.duration);
        var m = (0, I.secondsToTimeCode)(y, s.options.alwaysShowHours, s.options.showTimecodeFrameCount, s.options.framesPerSecond, s.options.secondsDecimalLength, s.options.timeFormat);
        m.length > 5 ? (0, C.addClass)(s.getElement(s.container), s.options.classPrefix + "long-video") : (0, C.removeClass)(s.getElement(s.container), s.options.classPrefix + "long-video"), s.getElement(s.controls).querySelector("." + s.options.classPrefix + "duration") && y > 0 && (s.getElement(s.controls).querySelector("." + s.options.classPrefix + "duration").innerHTML = m);
      }
    });
  }, { 17: 17, 2: 2, 27: 27, 32: 32 }], 14: [function(T, J, x) {
    var z = T(2), O = f(z), B = T(8), R = f(B), I = T(6), C = f(I), N = T(17), b = f(N), s = T(32), y = T(28), m = T(27), a = T(29);
    function f(c) {
      return c && c.__esModule ? c : { default: c };
    }
    Object.assign(N.config, {
      startLanguage: "",
      tracksText: null,
      chaptersText: null,
      tracksAriaLive: !1,
      hideCaptionsButtonWhenEmpty: !0,
      toggleCaptionsButtonWhenOnlyOne: !1,
      slidesSelector: ""
    }), Object.assign(b.default.prototype, {
      hasChapters: !1,
      buildtracks: function(n, u, o, i) {
        if (this.findTracks(), !(!n.tracks.length && (!n.trackFiles || !n.trackFiles.length === 0))) {
          var r = this, l = r.options.tracksAriaLive ? ' role="log" aria-live="assertive" aria-atomic="false"' : "", w = (0, y.isString)(r.options.tracksText) ? r.options.tracksText : C.default.t("mejs.captions-subtitles"), g = (0, y.isString)(r.options.chaptersText) ? r.options.chaptersText : C.default.t("mejs.captions-chapters"), p = n.trackFiles === null ? n.tracks.length : n.trackFiles.length;
          if (r.domNode.textTracks)
            for (var P = r.domNode.textTracks.length - 1; P >= 0; P--)
              r.domNode.textTracks[P].mode = "hidden";
          r.cleartracks(n), n.captions = O.default.createElement("div"), n.captions.className = r.options.classPrefix + "captions-layer " + r.options.classPrefix + "layer", n.captions.innerHTML = '<div class="' + r.options.classPrefix + "captions-position " + r.options.classPrefix + 'captions-position-hover"' + l + ">" + ('<span class="' + r.options.classPrefix + 'captions-text"></span>') + "</div>", n.captions.style.display = "none", o.insertBefore(n.captions, o.firstChild), n.captionsText = n.captions.querySelector("." + r.options.classPrefix + "captions-text"), n.captionsButton = O.default.createElement("div"), n.captionsButton.className = r.options.classPrefix + "button " + r.options.classPrefix + "captions-button", n.captionsButton.innerHTML = (0, a.generateControlButton)(r.id, w, w, "" + r.media.options.iconSprite, ["icon-captions"], "" + r.options.classPrefix) + ('<div class="' + r.options.classPrefix + "captions-selector " + r.options.classPrefix + 'offscreen">') + ('<ul class="' + r.options.classPrefix + 'captions-selector-list">') + ('<li class="' + r.options.classPrefix + 'captions-selector-list-item">') + ('<input type="radio" class="' + r.options.classPrefix + 'captions-selector-input" ') + ('name="' + n.id + '_captions" id="' + n.id + '_captions_none" ') + 'value="none" checked disabled>' + ('<label class="' + r.options.classPrefix + "captions-selector-label ") + (r.options.classPrefix + 'captions-selected" ') + ('for="' + n.id + '_captions_none">' + C.default.t("mejs.none") + "</label>") + "</li></ul></div>", r.addControlElement(n.captionsButton, "tracks"), n.captionsButton.querySelector("." + r.options.classPrefix + "captions-selector-input").disabled = !1, n.chaptersButton = O.default.createElement("div"), n.chaptersButton.className = r.options.classPrefix + "button " + r.options.classPrefix + "chapters-button", n.chaptersButton.innerHTML = (0, a.generateControlButton)(r.id, g, g, "" + r.media.options.iconSprite, ["icon-chapters"], "" + r.options.classPrefix) + ('<div class="' + r.options.classPrefix + "chapters-selector " + r.options.classPrefix + 'offscreen">') + ('<ul class="' + r.options.classPrefix + 'chapters-selector-list"></ul>') + "</div>";
          for (var F = 0, D = 0; D < p; D++) {
            var v = n.tracks[D].kind, S = n.tracks[D].src;
            S.trim() && (v === "subtitles" || v === "captions" ? F++ : v === "chapters" && !u.querySelector("." + r.options.classPrefix + "chapter-selector") && n.captionsButton.parentNode.insertBefore(n.chaptersButton, n.captionsButton));
          }
          n.trackToLoad = -1, n.selectedTrack = null, n.isLoadingTrack = !1;
          for (var e = 0; e < p; e++) {
            var d = n.tracks[e].kind;
            n.tracks[e].src.trim() && (d === "subtitles" || d === "captions") && n.addTrackButton(n.tracks[e].trackId, n.tracks[e].srclang, n.tracks[e].label);
          }
          n.loadNextTrack();
          var t = ["mouseenter", "focusin"], h = ["mouseleave", "focusout"];
          if (r.options.toggleCaptionsButtonWhenOnlyOne && F === 1)
            n.captionsButton.addEventListener("click", function(H) {
              var j = "none";
              n.selectedTrack === null && (j = n.tracks[0].trackId);
              var Q = H.keyCode || H.which;
              n.setTrack(j, typeof Q < "u");
            });
          else {
            for (var E = n.captionsButton.querySelectorAll("." + r.options.classPrefix + "captions-selector-label"), A = n.captionsButton.querySelectorAll("input[type=radio]"), M = 0, k = t.length; M < k; M++)
              n.captionsButton.addEventListener(t[M], function() {
                (0, m.removeClass)(this.querySelector("." + r.options.classPrefix + "captions-selector"), r.options.classPrefix + "offscreen");
              });
            for (var _ = 0, L = h.length; _ < L; _++)
              n.captionsButton.addEventListener(h[_], function() {
                (0, m.addClass)(this.querySelector("." + r.options.classPrefix + "captions-selector"), r.options.classPrefix + "offscreen");
              });
            for (var V = 0, U = A.length; V < U; V++)
              A[V].addEventListener("click", function(H) {
                var j = H.keyCode || H.which;
                n.setTrack(this.value, typeof j < "u");
              });
            for (var X = 0, W = E.length; X < W; X++)
              E[X].addEventListener("click", function(H) {
                var j = (0, m.siblings)(this, function(Y) {
                  return Y.tagName === "INPUT";
                })[0], Q = (0, y.createEvent)("click", j);
                j.dispatchEvent(Q), H.preventDefault();
              });
            n.captionsButton.addEventListener("keydown", function(H) {
              H.stopPropagation();
            });
          }
          for (var q = 0, K = t.length; q < K; q++)
            n.chaptersButton.addEventListener(t[q], function() {
              this.querySelector("." + r.options.classPrefix + "chapters-selector-list").children.length && (0, m.removeClass)(this.querySelector("." + r.options.classPrefix + "chapters-selector"), r.options.classPrefix + "offscreen");
            });
          for (var Z = 0, G = h.length; Z < G; Z++)
            n.chaptersButton.addEventListener(h[Z], function() {
              (0, m.addClass)(this.querySelector("." + r.options.classPrefix + "chapters-selector"), r.options.classPrefix + "offscreen");
            });
          n.chaptersButton.addEventListener("keydown", function(H) {
            H.stopPropagation();
          }), n.options.alwaysShowControls ? (0, m.addClass)(n.getElement(n.container).querySelector("." + r.options.classPrefix + "captions-position"), r.options.classPrefix + "captions-position-hover") : (n.getElement(n.container).addEventListener("controlsshown", function() {
            (0, m.addClass)(n.getElement(n.container).querySelector("." + r.options.classPrefix + "captions-position"), r.options.classPrefix + "captions-position-hover");
          }), n.getElement(n.container).addEventListener("controlshidden", function() {
            i.paused || (0, m.removeClass)(n.getElement(n.container).querySelector("." + r.options.classPrefix + "captions-position"), r.options.classPrefix + "captions-position-hover");
          })), i.addEventListener("timeupdate", function() {
            n.displayCaptions();
          }), n.options.slidesSelector !== "" && (n.slidesContainer = O.default.querySelectorAll(n.options.slidesSelector), i.addEventListener("timeupdate", function() {
            n.displaySlides();
          }));
        }
      },
      cleartracks: function(n) {
        n && (n.captions && n.captions.remove(), n.chapters && n.chapters.remove(), n.captionsText && n.captionsText.remove(), n.captionsButton && n.captionsButton.remove(), n.chaptersButton && n.chaptersButton.remove());
      },
      rebuildtracks: function() {
        var n = this;
        n.findTracks(), n.buildtracks(n, n.getElement(n.controls), n.getElement(n.layers), n.media);
      },
      findTracks: function() {
        var n = this, u = n.trackFiles === null ? n.node.querySelectorAll("track") : n.trackFiles, o = u.length;
        n.tracks = [];
        for (var i = 0; i < o; i++) {
          var r = u[i], l = r.getAttribute("srclang").toLowerCase() || "", w = n.id + "_track_" + i + "_" + r.getAttribute("kind") + "_" + l;
          n.tracks.push({
            trackId: w,
            srclang: l,
            src: r.getAttribute("src"),
            kind: r.getAttribute("kind"),
            label: r.getAttribute("label") || "",
            entries: [],
            isLoaded: !1
          });
        }
      },
      setTrack: function(n, u) {
        for (var o = this, i = o.captionsButton.querySelectorAll('input[type="radio"]'), r = o.captionsButton.querySelectorAll("." + o.options.classPrefix + "captions-selected"), l = o.captionsButton.querySelector('input[value="' + n + '"]'), w = 0, g = i.length; w < g; w++)
          i[w].checked = !1;
        for (var p = 0, P = r.length; p < P; p++)
          (0, m.removeClass)(r[p], o.options.classPrefix + "captions-selected");
        l.checked = !0;
        for (var F = (0, m.siblings)(l, function(h) {
          return (0, m.hasClass)(h, o.options.classPrefix + "captions-selector-label");
        }), D = 0, v = F.length; D < v; D++)
          (0, m.addClass)(F[D], o.options.classPrefix + "captions-selected");
        if (n === "none")
          o.selectedTrack = null, (0, m.removeClass)(o.captionsButton, o.options.classPrefix + "captions-enabled");
        else
          for (var S = 0, e = o.tracks.length; S < e; S++) {
            var d = o.tracks[S];
            if (d.trackId === n) {
              o.selectedTrack === null && (0, m.addClass)(o.captionsButton, o.options.classPrefix + "captions-enabled"), o.selectedTrack = d, o.captions.setAttribute("lang", o.selectedTrack.srclang), o.displayCaptions();
              break;
            }
          }
        var t = (0, y.createEvent)("captionschange", o.media);
        t.detail.caption = o.selectedTrack, o.media.dispatchEvent(t), u || setTimeout(function() {
          o.getElement(o.container).focus();
        }, 500);
      },
      loadNextTrack: function() {
        var n = this;
        n.trackToLoad++, n.trackToLoad < n.tracks.length ? (n.isLoadingTrack = !0, n.loadTrack(n.trackToLoad)) : (n.isLoadingTrack = !1, n.checkForTracks());
      },
      loadTrack: function(n) {
        var u = this, o = u.tracks[n];
        o !== void 0 && (o.src !== void 0 || o.src !== "") && (0, m.ajax)(o.src, "text", function(i) {
          o.entries = typeof i == "string" && /<tt\s+xml/ig.exec(i) ? R.default.TrackFormatParser.dfxp.parse(i) : R.default.TrackFormatParser.webvtt.parse(i), o.isLoaded = !0, u.enableTrackButton(o), u.loadNextTrack(), o.kind === "slides" ? u.setupSlides(o) : o.kind === "chapters" && !u.hasChapters && (u.drawChapters(o), u.hasChapters = !0);
        }, function() {
          u.removeTrackButton(o.trackId), u.loadNextTrack();
        });
      },
      enableTrackButton: function(n) {
        var u = this, o = n.srclang, i = O.default.getElementById("" + n.trackId);
        if (!!i) {
          var r = n.label;
          r === "" && (r = C.default.t(R.default.language.codes[o]) || o), i.disabled = !1;
          for (var l = (0, m.siblings)(i, function(P) {
            return (0, m.hasClass)(P, u.options.classPrefix + "captions-selector-label");
          }), w = 0, g = l.length; w < g; w++)
            l[w].innerHTML = r;
          if (u.options.startLanguage === o) {
            i.checked = !0;
            var p = (0, y.createEvent)("click", i);
            i.dispatchEvent(p);
          }
        }
      },
      removeTrackButton: function(n) {
        var u = O.default.getElementById("" + n);
        if (u) {
          var o = u.closest("li");
          o && o.remove();
        }
      },
      addTrackButton: function(n, u, o) {
        var i = this;
        o === "" && (o = C.default.t(R.default.language.codes[u]) || u), i.captionsButton.querySelector("ul").innerHTML += '<li class="' + i.options.classPrefix + 'captions-selector-list-item">' + ('<input type="radio" class="' + i.options.classPrefix + 'captions-selector-input" ') + ('name="' + i.id + '_captions" id="' + n + '" value="' + n + '" disabled>') + ('<label class="' + i.options.classPrefix + 'captions-selector-label"') + ('for="' + n + '">' + o + " (loading)</label>") + "</li>";
      },
      checkForTracks: function() {
        var n = this, u = !1;
        if (n.options.hideCaptionsButtonWhenEmpty) {
          for (var o = 0, i = n.tracks.length; o < i; o++) {
            var r = n.tracks[o].kind;
            if ((r === "subtitles" || r === "captions") && n.tracks[o].isLoaded) {
              u = !0;
              break;
            }
          }
          n.captionsButton.style.display = u ? "" : "none", n.setControlsSize();
        }
      },
      displayCaptions: function() {
        if (this.tracks !== void 0) {
          var n = this, u = n.selectedTrack, o = function(w) {
            var g = O.default.createElement("div");
            g.innerHTML = w;
            for (var p = g.getElementsByTagName("script"), P = p.length; P--; )
              p[P].remove();
            for (var F = g.getElementsByTagName("*"), D = 0, v = F.length; D < v; D++)
              for (var S = F[D].attributes, e = Array.prototype.slice.call(S), d = 0, t = e.length; d < t; d++)
                e[d].name.startsWith("on") || e[d].value.startsWith("javascript") ? F[D].remove() : e[d].name === "style" && F[D].removeAttribute(e[d].name);
            return g.innerHTML;
          };
          if (u !== null && u.isLoaded) {
            var i = n.searchTrackPosition(u.entries, n.media.currentTime);
            if (i > -1) {
              var r = u.entries[i].text;
              typeof n.options.captionTextPreprocessor == "function" && (r = n.options.captionTextPreprocessor(r)), n.captionsText.innerHTML = o(r), n.captionsText.className = n.options.classPrefix + "captions-text " + (u.entries[i].identifier || ""), n.captions.style.display = "", n.captions.style.height = "0px";
              return;
            }
            n.captions.style.display = "none";
          } else
            n.captions.style.display = "none";
        }
      },
      setupSlides: function(n) {
        var u = this;
        u.slides = n, u.slides.entries.imgs = [u.slides.entries.length], u.showSlide(0);
      },
      showSlide: function(n) {
        var u = this, o = this;
        if (!(o.tracks === void 0 || o.slidesContainer === void 0)) {
          var i = o.slides.entries[n].text, r = o.slides.entries[n].imgs;
          if (r === void 0 || r.fadeIn === void 0) {
            var l = O.default.createElement("img");
            l.src = i, l.addEventListener("load", function() {
              var P = u, F = (0, m.siblings)(P, function(S) {
                return F(S);
              });
              P.style.display = "none", o.slidesContainer.innerHTML += P.innerHTML, (0, m.fadeIn)(o.slidesContainer.querySelector(l));
              for (var D = 0, v = F.length; D < v; D++)
                (0, m.fadeOut)(F[D], 400);
            }), o.slides.entries[n].imgs = r = l;
          } else if (!(0, m.visible)(r)) {
            var w = (0, m.siblings)(self, function(P) {
              return w(P);
            });
            (0, m.fadeIn)(o.slidesContainer.querySelector(r));
            for (var g = 0, p = w.length; g < p; g++)
              (0, m.fadeOut)(w[g]);
          }
        }
      },
      displaySlides: function() {
        var n = this;
        if (this.slides !== void 0) {
          var u = n.slides, o = n.searchTrackPosition(u.entries, n.media.currentTime);
          o > -1 && n.showSlide(o);
        }
      },
      drawChapters: function(n) {
        var u = this, o = n.entries.length;
        if (!!o) {
          u.chaptersButton.querySelector("ul").innerHTML = "";
          for (var i = 0; i < o; i++)
            u.chaptersButton.querySelector("ul").innerHTML += '<li class="' + u.options.classPrefix + 'chapters-selector-list-item" role="menuitemcheckbox" aria-live="polite" aria-disabled="false" aria-checked="false">' + ('<input type="radio" class="' + u.options.classPrefix + 'captions-selector-input" ') + ('name="' + u.id + '_chapters" id="' + u.id + "_chapters_" + i + '" value="' + n.entries[i].start + '" disabled>') + ('<label class="' + u.options.classPrefix + 'chapters-selector-label"') + ('for="' + u.id + "_chapters_" + i + '">' + n.entries[i].text + "</label>") + "</li>";
          for (var r = u.chaptersButton.querySelectorAll('input[type="radio"]'), l = u.chaptersButton.querySelectorAll("." + u.options.classPrefix + "chapters-selector-label"), w = 0, g = r.length; w < g; w++)
            r[w].disabled = !1, r[w].checked = !1, r[w].addEventListener("click", function(F) {
              var D = this, v = u.chaptersButton.querySelectorAll("li"), S = (0, m.siblings)(D, function(h) {
                return (0, m.hasClass)(h, u.options.classPrefix + "chapters-selector-label");
              })[0];
              D.checked = !0, D.parentNode.setAttribute("aria-checked", !0), (0, m.addClass)(S, u.options.classPrefix + "chapters-selected"), (0, m.removeClass)(u.chaptersButton.querySelector("." + u.options.classPrefix + "chapters-selected"), u.options.classPrefix + "chapters-selected");
              for (var e = 0, d = v.length; e < d; e++)
                v[e].setAttribute("aria-checked", !1);
              var t = F.keyCode || F.which;
              typeof t > "u" && setTimeout(function() {
                u.getElement(u.container).focus();
              }, 500), u.media.setCurrentTime(parseFloat(D.value)), u.media.paused && u.media.play();
            });
          for (var p = 0, P = l.length; p < P; p++)
            l[p].addEventListener("click", function(F) {
              var D = (0, m.siblings)(this, function(S) {
                return S.tagName === "INPUT";
              })[0], v = (0, y.createEvent)("click", D);
              D.dispatchEvent(v), F.preventDefault();
            });
        }
      },
      searchTrackPosition: function(n, u) {
        for (var o = 0, i = n.length - 1, r = void 0, l = void 0, w = void 0; o <= i; ) {
          if (r = o + i >> 1, l = n[r].start, w = n[r].stop, u >= l && u < w)
            return r;
          l < u ? o = r + 1 : l > u && (i = r - 1);
        }
        return -1;
      }
    }), R.default.language = {
      codes: {
        af: "mejs.afrikaans",
        sq: "mejs.albanian",
        ar: "mejs.arabic",
        be: "mejs.belarusian",
        bg: "mejs.bulgarian",
        ca: "mejs.catalan",
        zh: "mejs.chinese",
        "zh-cn": "mejs.chinese-simplified",
        "zh-tw": "mejs.chines-traditional",
        hr: "mejs.croatian",
        cs: "mejs.czech",
        da: "mejs.danish",
        nl: "mejs.dutch",
        en: "mejs.english",
        et: "mejs.estonian",
        fl: "mejs.filipino",
        fi: "mejs.finnish",
        fr: "mejs.french",
        gl: "mejs.galician",
        de: "mejs.german",
        el: "mejs.greek",
        ht: "mejs.haitian-creole",
        iw: "mejs.hebrew",
        hi: "mejs.hindi",
        hu: "mejs.hungarian",
        is: "mejs.icelandic",
        id: "mejs.indonesian",
        ga: "mejs.irish",
        it: "mejs.italian",
        ja: "mejs.japanese",
        ko: "mejs.korean",
        lv: "mejs.latvian",
        lt: "mejs.lithuanian",
        mk: "mejs.macedonian",
        ms: "mejs.malay",
        mt: "mejs.maltese",
        no: "mejs.norwegian",
        fa: "mejs.persian",
        pl: "mejs.polish",
        pt: "mejs.portuguese",
        ro: "mejs.romanian",
        ru: "mejs.russian",
        sr: "mejs.serbian",
        sk: "mejs.slovak",
        sl: "mejs.slovenian",
        es: "mejs.spanish",
        sw: "mejs.swahili",
        sv: "mejs.swedish",
        tl: "mejs.tagalog",
        th: "mejs.thai",
        tr: "mejs.turkish",
        uk: "mejs.ukrainian",
        vi: "mejs.vietnamese",
        cy: "mejs.welsh",
        yi: "mejs.yiddish"
      }
    }, R.default.TrackFormatParser = {
      webvtt: {
        pattern: /^((?:[0-9]{1,2}:)?[0-9]{2}:[0-9]{2}([,.][0-9]{1,3})?) --\> ((?:[0-9]{1,2}:)?[0-9]{2}:[0-9]{2}([,.][0-9]{3})?)(.*)$/,
        parse: function(n) {
          for (var u = n.split(/\r?\n/), o = [], i = void 0, r = void 0, l = void 0, w = 0, g = u.length; w < g; w++) {
            if (i = this.pattern.exec(u[w]), i && w < u.length) {
              for (w - 1 >= 0 && u[w - 1] !== "" && (l = u[w - 1]), w++, r = u[w], w++; u[w] !== "" && w < u.length; )
                r = r + `
` + u[w], w++;
              r = r === null ? "" : r.trim().replace(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig, "<a href='$1' target='_blank'>$1</a>"), o.push({
                identifier: l,
                start: (0, s.convertSMPTEtoSeconds)(i[1]) === 0 ? 0.2 : (0, s.convertSMPTEtoSeconds)(i[1]),
                stop: (0, s.convertSMPTEtoSeconds)(i[3]),
                text: r,
                settings: i[5]
              });
            }
            l = "";
          }
          return o;
        }
      },
      dfxp: {
        parse: function(n) {
          var u = O.default.adoptNode(new DOMParser().parseFromString(n, "application/xml").documentElement), o = u.querySelector("div"), i = o.querySelectorAll("p"), r = O.default.getElementById(o.getAttribute("style")), l = [], w = void 0;
          if (r) {
            r.removeAttribute("id");
            var g = r.attributes;
            if (g.length) {
              w = {};
              for (var p = 0, P = g.length; p < P; p++)
                w[g[p].name.split(":")[1]] = g[p].value;
            }
          }
          for (var F = 0, D = i.length; F < D; F++) {
            var v = void 0, S = {
              start: null,
              stop: null,
              style: null,
              text: null
            };
            if (i[F].getAttribute("begin") && (S.start = (0, s.convertSMPTEtoSeconds)(i[F].getAttribute("begin"))), !S.start && i[F - 1].getAttribute("end") && (S.start = (0, s.convertSMPTEtoSeconds)(i[F - 1].getAttribute("end"))), i[F].getAttribute("end") && (S.stop = (0, s.convertSMPTEtoSeconds)(i[F].getAttribute("end"))), !S.stop && i[F + 1].getAttribute("begin") && (S.stop = (0, s.convertSMPTEtoSeconds)(i[F + 1].getAttribute("begin"))), w) {
              v = "";
              for (var e in w)
                v += e + ": " + w[e] + ";";
            }
            v && (S.style = v), S.start === 0 && (S.start = 0.2), S.text = i[F].innerHTML.trim().replace(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_| !:, .; ]*[-A-Z0-9+&@#\/%=~_|])/ig, "<a href='$1' target='_blank'>$1</a>"), l.push(S);
          }
          return l;
        }
      }
    };
  }, { 17: 17, 2: 2, 27: 27, 28: 28, 29: 29, 32: 32, 6: 6, 8: 8 }], 15: [function(T, J, x) {
    var z = T(2), O = m(z), B = T(17), R = m(B), I = T(6), C = m(I), N = T(26), b = T(28), s = T(27), y = T(29);
    function m(a) {
      return a && a.__esModule ? a : { default: a };
    }
    Object.assign(B.config, {
      muteText: null,
      unmuteText: null,
      allyVolumeControlText: null,
      hideVolumeOnTouchDevices: !0,
      audioVolume: "horizontal",
      videoVolume: "vertical",
      startVolume: 0.8
    }), Object.assign(R.default.prototype, {
      buildvolume: function(f, c, n, u) {
        if (!((N.IS_ANDROID || N.IS_IOS) && this.options.hideVolumeOnTouchDevices)) {
          var o = this, i = o.isVideo ? o.options.videoVolume : o.options.audioVolume, r = (0, b.isString)(o.options.muteText) ? o.options.muteText : C.default.t("mejs.mute"), l = (0, b.isString)(o.options.unmuteText) ? o.options.unmuteText : C.default.t("mejs.unmute"), w = (0, b.isString)(o.options.allyVolumeControlText) ? o.options.allyVolumeControlText : C.default.t("mejs.volume-help-text"), g = O.default.createElement("div");
          if (g.className = o.options.classPrefix + "button " + o.options.classPrefix + "volume-button " + o.options.classPrefix + "mute", g.innerHTML = i === "horizontal" ? (0, y.generateControlButton)(o.id, r, r, "" + o.media.options.iconSprite, ["icon-mute", "icon-unmute"], "" + o.options.classPrefix, "", o.options.classPrefix + "horizontal-volume-slider") : (0, y.generateControlButton)(o.id, r, r, "" + o.media.options.iconSprite, ["icon-mute", "icon-unmute"], "" + o.options.classPrefix, "", o.options.classPrefix + "volume-slider") + ('<a class="' + o.options.classPrefix + 'volume-slider" ') + ('aria-label="' + C.default.t("mejs.volume-slider") + '" aria-valuemin="0" aria-valuemax="100" role="slider" ') + 'aria-orientation="vertical">' + ('<span class="' + o.options.classPrefix + 'offscreen" id="' + o.options.classPrefix + 'volume-slider">' + w + "</span>") + ('<div class="' + o.options.classPrefix + 'volume-total">') + ('<div class="' + o.options.classPrefix + 'volume-current"></div>') + ('<div class="' + o.options.classPrefix + 'volume-handle"></div>') + "</div></a>", o.addControlElement(g, "volume"), o.options.keyActions.push({
            keys: [38],
            action: function(_) {
              var L = _.getElement(_.container).querySelector("." + o.options.classPrefix + "volume-slider");
              L && L.matches(":focus") && (L.style.display = "block"), _.isVideo && (_.showControls(), _.startControlsTimer());
              var V = Math.min(_.volume + 0.1, 1);
              _.setVolume(V), V > 0 && _.setMuted(!1);
            }
          }, {
            keys: [40],
            action: function(_) {
              var L = _.getElement(_.container).querySelector("." + o.options.classPrefix + "volume-slider");
              L && (L.style.display = "block"), _.isVideo && (_.showControls(), _.startControlsTimer());
              var V = Math.max(_.volume - 0.1, 0);
              _.setVolume(V), V <= 0.1 && _.setMuted(!0);
            }
          }, {
            keys: [77],
            action: function(_) {
              var L = _.getElement(_.container).querySelector("." + o.options.classPrefix + "volume-slider");
              L && (L.style.display = "block"), _.isVideo && (_.showControls(), _.startControlsTimer()), _.media.muted ? _.setMuted(!1) : _.setMuted(!0);
            }
          }), i === "horizontal") {
            var p = O.default.createElement("a");
            p.className = o.options.classPrefix + "horizontal-volume-slider", p.setAttribute("aria-label", C.default.t("mejs.volume-slider")), p.setAttribute("aria-valuemin", 0), p.setAttribute("aria-valuemax", 100), p.setAttribute("aria-valuenow", 100), p.setAttribute("role", "slider"), p.innerHTML += '<span class="' + o.options.classPrefix + 'offscreen" id="' + o.options.classPrefix + 'horizontal-volume-slider">' + w + "</span>" + ('<div class="' + o.options.classPrefix + 'horizontal-volume-total">') + ('<div class="' + o.options.classPrefix + 'horizontal-volume-current"></div>') + ('<div class="' + o.options.classPrefix + 'horizontal-volume-handle"></div>') + "</div>", g.parentNode.insertBefore(p, g.nextSibling);
          }
          var P = !1, F = !1, D = !1, v = function() {
            var _ = Math.floor(u.volume * 100);
            S.setAttribute("aria-valuenow", _), S.setAttribute("aria-valuetext", _ + "%");
          }, S = i === "vertical" ? o.getElement(o.container).querySelector("." + o.options.classPrefix + "volume-slider") : o.getElement(o.container).querySelector("." + o.options.classPrefix + "horizontal-volume-slider"), e = i === "vertical" ? o.getElement(o.container).querySelector("." + o.options.classPrefix + "volume-total") : o.getElement(o.container).querySelector("." + o.options.classPrefix + "horizontal-volume-total"), d = i === "vertical" ? o.getElement(o.container).querySelector("." + o.options.classPrefix + "volume-current") : o.getElement(o.container).querySelector("." + o.options.classPrefix + "horizontal-volume-current"), t = i === "vertical" ? o.getElement(o.container).querySelector("." + o.options.classPrefix + "volume-handle") : o.getElement(o.container).querySelector("." + o.options.classPrefix + "horizontal-volume-handle"), h = function(_) {
            if (!(_ === null || isNaN(_) || _ === void 0)) {
              if (_ = Math.max(0, _), _ = Math.min(_, 1), _ === 0) {
                (0, s.removeClass)(g, o.options.classPrefix + "mute"), (0, s.addClass)(g, o.options.classPrefix + "unmute");
                var L = g.firstElementChild;
                L.setAttribute("title", l), L.setAttribute("aria-label", l);
              } else {
                (0, s.removeClass)(g, o.options.classPrefix + "unmute"), (0, s.addClass)(g, o.options.classPrefix + "mute");
                var V = g.firstElementChild;
                V.setAttribute("title", r), V.setAttribute("aria-label", r);
              }
              var U = _ * 100 + "%", X = getComputedStyle(t);
              i === "vertical" ? (d.style.bottom = 0, d.style.height = U, t.style.bottom = U, t.style.marginBottom = -parseFloat(X.height) / 2 + "px") : (d.style.left = 0, d.style.width = U, t.style.left = U, t.style.marginLeft = -parseFloat(X.width) / 2 + "px");
            }
          }, E = function(_) {
            var L = (0, s.offset)(e), V = getComputedStyle(e);
            D = !0;
            var U = null;
            if (i === "vertical") {
              var X = parseFloat(V.height), W = _.pageY - L.top;
              if (U = (X - W) / X, L.top === 0 || L.left === 0)
                return;
            } else {
              var q = parseFloat(V.width), K = _.pageX - L.left;
              U = K / q;
            }
            U = Math.max(0, U), U = Math.min(U, 1), h(U), o.setMuted(U === 0), o.setVolume(U), _.preventDefault(), _.stopPropagation();
          }, A = function() {
            o.muted ? (h(0), (0, s.removeClass)(g, o.options.classPrefix + "mute"), (0, s.addClass)(g, o.options.classPrefix + "unmute")) : (h(u.volume), (0, s.removeClass)(g, o.options.classPrefix + "unmute"), (0, s.addClass)(g, o.options.classPrefix + "mute"));
          };
          f.getElement(f.container).addEventListener("keydown", function(k) {
            var _ = !!k.target.closest("." + o.options.classPrefix + "container");
            !_ && i === "vertical" && (S.style.display = "none");
          }), g.addEventListener("mouseenter", function(k) {
            k.target === g && (S.style.display = "block", F = !0, k.preventDefault(), k.stopPropagation());
          }), g.addEventListener("focusin", function() {
            S.style.display = "block", F = !0;
          }), g.addEventListener("focusout", function(k) {
            (!k.relatedTarget || k.relatedTarget && !k.relatedTarget.matches("." + o.options.classPrefix + "volume-slider")) && i === "vertical" && (S.style.display = "none");
          }), g.addEventListener("mouseleave", function() {
            F = !1, !P && i === "vertical" && (S.style.display = "none");
          }), g.addEventListener("focusout", function() {
            F = !1;
          }), g.addEventListener("keydown", function(k) {
            if (o.options.enableKeyboard && o.options.keyActions.length) {
              var _ = k.which || k.keyCode || 0, L = u.volume;
              switch (_) {
                case 38:
                  L = Math.min(L + 0.1, 1);
                  break;
                case 40:
                  L = Math.max(0, L - 0.1);
                  break;
                default:
                  return !0;
              }
              P = !1, h(L), u.setVolume(L), k.preventDefault(), k.stopPropagation();
            }
          }), g.querySelector("button").addEventListener("click", function() {
            u.setMuted(!u.muted);
            var k = (0, b.createEvent)("volumechange", u);
            u.dispatchEvent(k);
          }), S.addEventListener("dragstart", function() {
            return !1;
          }), S.addEventListener("mouseover", function() {
            F = !0;
          }), S.addEventListener("focusin", function() {
            S.style.display = "block", F = !0;
          }), S.addEventListener("focusout", function() {
            F = !1, !P && i === "vertical" && (S.style.display = "none");
          }), S.addEventListener("mousedown", function(k) {
            E(k), o.globalBind("mousemove.vol", function(_) {
              var L = _.target;
              P && (L === S || L.closest(i === "vertical" ? "." + o.options.classPrefix + "volume-slider" : "." + o.options.classPrefix + "horizontal-volume-slider")) && E(_);
            }), o.globalBind("mouseup.vol", function() {
              P = !1, !F && i === "vertical" && (S.style.display = "none");
            }), P = !0, k.preventDefault(), k.stopPropagation();
          }), u.addEventListener("volumechange", function(k) {
            P || A(), v();
          });
          var M = !1;
          u.addEventListener("rendererready", function() {
            D || setTimeout(function() {
              M = !0, (f.options.startVolume === 0 || u.originalNode.muted) && u.setMuted(!0), u.setVolume(f.options.startVolume), o.setControlsSize();
            }, 250);
          }), u.addEventListener("loadedmetadata", function() {
            setTimeout(function() {
              !D && !M && ((f.options.startVolume === 0 || u.originalNode.muted) && u.setMuted(!0), f.options.startVolume === 0 && (f.options.startVolume = 0), u.setVolume(f.options.startVolume), o.setControlsSize()), M = !1;
            }, 250);
          }), (f.options.startVolume === 0 || u.originalNode.muted) && (u.setMuted(!0), f.options.startVolume === 0 && (f.options.startVolume = 0), A()), o.getElement(o.container).addEventListener("controlsresize", function() {
            A();
          });
        }
      }
    });
  }, { 17: 17, 2: 2, 26: 26, 27: 27, 28: 28, 29: 29, 6: 6 }], 16: [function(T, J, x) {
    Object.defineProperty(x, "__esModule", {
      value: !0
    }), x.EN = {
      "mejs.plural-form": 1,
      "mejs.download-file": "Download File",
      "mejs.install-flash": "You are using a browser that does not have Flash player enabled or installed. Please turn on your Flash player plugin or download the latest version from https://get.adobe.com/flashplayer/",
      "mejs.fullscreen": "Fullscreen",
      "mejs.play": "Play",
      "mejs.pause": "Pause",
      "mejs.time-slider": "Time Slider",
      "mejs.time-help-text": "Use Left/Right Arrow keys to advance one second, Up/Down arrows to advance ten seconds.",
      "mejs.live-broadcast": "Live Broadcast",
      "mejs.volume-help-text": "Use Up/Down Arrow keys to increase or decrease volume.",
      "mejs.unmute": "Unmute",
      "mejs.mute": "Mute",
      "mejs.volume-slider": "Volume Slider",
      "mejs.video-player": "Video Player",
      "mejs.audio-player": "Audio Player",
      "mejs.captions-subtitles": "Captions/Subtitles",
      "mejs.captions-chapters": "Chapters",
      "mejs.none": "None",
      "mejs.afrikaans": "Afrikaans",
      "mejs.albanian": "Albanian",
      "mejs.arabic": "Arabic",
      "mejs.belarusian": "Belarusian",
      "mejs.bulgarian": "Bulgarian",
      "mejs.catalan": "Catalan",
      "mejs.chinese": "Chinese",
      "mejs.chinese-simplified": "Chinese (Simplified)",
      "mejs.chinese-traditional": "Chinese (Traditional)",
      "mejs.croatian": "Croatian",
      "mejs.czech": "Czech",
      "mejs.danish": "Danish",
      "mejs.dutch": "Dutch",
      "mejs.english": "English",
      "mejs.estonian": "Estonian",
      "mejs.filipino": "Filipino",
      "mejs.finnish": "Finnish",
      "mejs.french": "French",
      "mejs.galician": "Galician",
      "mejs.german": "German",
      "mejs.greek": "Greek",
      "mejs.haitian-creole": "Haitian Creole",
      "mejs.hebrew": "Hebrew",
      "mejs.hindi": "Hindi",
      "mejs.hungarian": "Hungarian",
      "mejs.icelandic": "Icelandic",
      "mejs.indonesian": "Indonesian",
      "mejs.irish": "Irish",
      "mejs.italian": "Italian",
      "mejs.japanese": "Japanese",
      "mejs.korean": "Korean",
      "mejs.latvian": "Latvian",
      "mejs.lithuanian": "Lithuanian",
      "mejs.macedonian": "Macedonian",
      "mejs.malay": "Malay",
      "mejs.maltese": "Maltese",
      "mejs.norwegian": "Norwegian",
      "mejs.persian": "Persian",
      "mejs.polish": "Polish",
      "mejs.portuguese": "Portuguese",
      "mejs.romanian": "Romanian",
      "mejs.russian": "Russian",
      "mejs.serbian": "Serbian",
      "mejs.slovak": "Slovak",
      "mejs.slovenian": "Slovenian",
      "mejs.spanish": "Spanish",
      "mejs.swahili": "Swahili",
      "mejs.swedish": "Swedish",
      "mejs.tagalog": "Tagalog",
      "mejs.thai": "Thai",
      "mejs.turkish": "Turkish",
      "mejs.ukrainian": "Ukrainian",
      "mejs.vietnamese": "Vietnamese",
      "mejs.welsh": "Welsh",
      "mejs.yiddish": "Yiddish"
    };
  }, {}], 17: [function(T, J, x) {
    Object.defineProperty(x, "__esModule", {
      value: !0
    }), x.config = void 0;
    var z = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(v) {
      return typeof v;
    } : function(v) {
      return v && typeof Symbol == "function" && v.constructor === Symbol && v !== Symbol.prototype ? "symbol" : typeof v;
    }, O = function() {
      function v(S, e) {
        for (var d = 0; d < e.length; d++) {
          var t = e[d];
          t.enumerable = t.enumerable || !1, t.configurable = !0, "value" in t && (t.writable = !0), Object.defineProperty(S, t.key, t);
        }
      }
      return function(S, e, d) {
        return e && v(S.prototype, e), d && v(S, d), S;
      };
    }(), B = T(3), R = p(B), I = T(2), C = p(I), N = T(8), b = p(N), s = T(7), y = p(s), m = T(18), a = p(m), f = T(6), c = p(f), n = T(26), u = T(28), o = T(32), i = T(30), r = T(27), l = g(r), w = T(29);
    function g(v) {
      if (v && v.__esModule)
        return v;
      var S = {};
      if (v != null)
        for (var e in v)
          Object.prototype.hasOwnProperty.call(v, e) && (S[e] = v[e]);
      return S.default = v, S;
    }
    function p(v) {
      return v && v.__esModule ? v : { default: v };
    }
    function P(v, S) {
      if (!(v instanceof S))
        throw new TypeError("Cannot call a class as a function");
    }
    b.default.mepIndex = 0, b.default.players = {};
    var F = x.config = {
      poster: "",
      showPosterWhenEnded: !1,
      showPosterWhenPaused: !1,
      defaultVideoWidth: 480,
      defaultVideoHeight: 270,
      videoWidth: -1,
      videoHeight: -1,
      defaultAudioWidth: 400,
      defaultAudioHeight: 40,
      defaultSeekBackwardInterval: function(S) {
        return S.getDuration() * 0.05;
      },
      defaultSeekForwardInterval: function(S) {
        return S.getDuration() * 0.05;
      },
      setDimensions: !0,
      audioWidth: -1,
      audioHeight: -1,
      loop: !1,
      autoRewind: !0,
      enableAutosize: !0,
      timeFormat: "",
      alwaysShowHours: !1,
      showTimecodeFrameCount: !1,
      framesPerSecond: 25,
      alwaysShowControls: !1,
      hideVideoControlsOnLoad: !1,
      hideVideoControlsOnPause: !1,
      clickToPlayPause: !0,
      controlsTimeoutDefault: 1500,
      controlsTimeoutMouseEnter: 2500,
      controlsTimeoutMouseLeave: 1e3,
      iPadUseNativeControls: !1,
      iPhoneUseNativeControls: !1,
      AndroidUseNativeControls: !1,
      features: ["playpause", "current", "progress", "duration", "tracks", "volume", "fullscreen"],
      useDefaultControls: !1,
      isVideo: !0,
      stretching: "auto",
      classPrefix: "mejs__",
      enableKeyboard: !0,
      pauseOtherPlayers: !0,
      secondsDecimalLength: 0,
      customError: null,
      keyActions: [],
      hideScreenReaderTitle: !1
    };
    b.default.MepDefaults = F;
    var D = function() {
      function v(S, e) {
        P(this, v);
        var d = this, t = typeof S == "string" ? C.default.getElementById(S) : S;
        if (!(d instanceof v))
          return new v(t, e);
        if (d.node = d.media = t, !!d.node) {
          if (d.media.player)
            return d.media.player;
          if (d.hasFocus = !1, d.controlsAreVisible = !0, d.controlsEnabled = !0, d.controlsTimer = null, d.currentMediaTime = 0, d.proxy = null, e === void 0) {
            var h = d.node.getAttribute("data-mejsoptions");
            e = h ? JSON.parse(h) : {};
          }
          return d.options = Object.assign({}, F, e), d.options.loop && !d.media.getAttribute("loop") ? (d.media.loop = !0, d.node.loop = !0) : d.media.loop && (d.options.loop = !0), d.options.timeFormat || (d.options.timeFormat = "mm:ss", d.options.alwaysShowHours && (d.options.timeFormat = "hh:mm:ss"), d.options.showTimecodeFrameCount && (d.options.timeFormat += ":ff")), (0, o.calculateTimeFormat)(0, d.options, d.options.framesPerSecond || 25), d.id = "mep_" + b.default.mepIndex++, b.default.players[d.id] = d, d.init(), d;
        }
      }
      return O(v, [{
        key: "getElement",
        value: function(e) {
          return e;
        }
      }, {
        key: "init",
        value: function() {
          var e = this, d = Object.assign({}, e.options, {
            success: function(V, U) {
              e._meReady(V, U);
            },
            error: function(V) {
              e._handleError(V);
            }
          }), t = e.node.tagName.toLowerCase();
          if (e.isDynamic = t !== "audio" && t !== "video" && t !== "iframe", e.isVideo = (e.isDynamic || t !== "audio") && e.options.isVideo, e.mediaFiles = null, e.trackFiles = null, n.IS_IPAD && e.options.iPadUseNativeControls || n.IS_IPHONE && e.options.iPhoneUseNativeControls)
            e.node.setAttribute("controls", !0), n.IS_IPAD && e.node.getAttribute("autoplay") && e.play();
          else if ((e.isVideo || !e.isVideo && (e.options.features.length || e.options.useDefaultControls)) && !(n.IS_ANDROID && e.options.AndroidUseNativeControls)) {
            e.node.removeAttribute("controls");
            var h = e.isVideo ? c.default.t("mejs.video-player") : c.default.t("mejs.audio-player");
            if (!e.options.hideScreenReaderTitle) {
              var E = C.default.createElement("span");
              E.className = e.options.classPrefix + "offscreen", E.innerText = h, e.media.parentNode.insertBefore(E, e.media);
            }
            if (e.container = C.default.createElement("div"), e.getElement(e.container).id = e.id, e.getElement(e.container).className = e.options.classPrefix + "container " + e.options.classPrefix + "container-keyboard-inactive " + e.media.className, e.getElement(e.container).tabIndex = 0, e.getElement(e.container).setAttribute("role", "application"), e.getElement(e.container).setAttribute("aria-label", h), e.getElement(e.container).innerHTML = '<div class="' + e.options.classPrefix + 'inner">' + ('<div class="' + e.options.classPrefix + 'mediaelement"></div>') + ('<div class="' + e.options.classPrefix + 'layers"></div>') + ('<div class="' + e.options.classPrefix + 'controls"></div>') + "</div>", e.getElement(e.container).addEventListener("focus", function(L) {
              if (!e.controlsAreVisible && !e.hasFocus && e.controlsEnabled) {
                e.showControls(!0);
                var V = (0, u.isNodeAfter)(L.relatedTarget, e.getElement(e.container)) ? "." + e.options.classPrefix + "controls ." + e.options.classPrefix + "button:last-child > button" : "." + e.options.classPrefix + "playpause-button > button", U = e.getElement(e.container).querySelector(V);
                U.focus();
              }
            }), e.node.parentNode.insertBefore(e.getElement(e.container), e.node), !e.options.features.length && !e.options.useDefaultControls && (e.getElement(e.container).style.background = "transparent", e.getElement(e.container).querySelector("." + e.options.classPrefix + "controls").style.display = "none"), e.isVideo && e.options.stretching === "fill" && !l.hasClass(e.getElement(e.container).parentNode, e.options.classPrefix + "fill-container")) {
              e.outerContainer = e.media.parentNode;
              var A = C.default.createElement("div");
              A.className = e.options.classPrefix + "fill-container", e.getElement(e.container).parentNode.insertBefore(A, e.getElement(e.container)), A.appendChild(e.getElement(e.container));
            }
            n.IS_ANDROID && l.addClass(e.getElement(e.container), e.options.classPrefix + "android"), n.IS_IOS && l.addClass(e.getElement(e.container), e.options.classPrefix + "ios"), n.IS_IPAD && l.addClass(e.getElement(e.container), e.options.classPrefix + "ipad"), n.IS_IPHONE && l.addClass(e.getElement(e.container), e.options.classPrefix + "iphone"), l.addClass(e.getElement(e.container), e.isVideo ? e.options.classPrefix + "video" : e.options.classPrefix + "audio"), e.getElement(e.container).querySelector("." + e.options.classPrefix + "mediaelement").appendChild(e.node), e.media.player = e, e.controls = e.getElement(e.container).querySelector("." + e.options.classPrefix + "controls"), e.layers = e.getElement(e.container).querySelector("." + e.options.classPrefix + "layers");
            var M = e.isVideo ? "video" : "audio", k = M.substring(0, 1).toUpperCase() + M.substring(1);
            e.options[M + "Width"] > 0 || e.options[M + "Width"].toString().indexOf("%") > -1 ? e.width = e.options[M + "Width"] : e.node.style.width !== "" && e.node.style.width !== null ? e.width = e.node.style.width : e.node.getAttribute("width") ? e.width = e.node.getAttribute("width") : e.width = e.options["default" + k + "Width"], e.options[M + "Height"] > 0 || e.options[M + "Height"].toString().indexOf("%") > -1 ? e.height = e.options[M + "Height"] : e.node.style.height !== "" && e.node.style.height !== null ? e.height = e.node.style.height : e.node.getAttribute("height") ? e.height = e.node.getAttribute("height") : e.height = e.options["default" + k + "Height"], e.initialAspectRatio = e.height >= e.width ? e.width / e.height : e.height / e.width, e.setPlayerSize(e.width, e.height);
          } else
            !e.isVideo && !e.options.features.length && !e.options.useDefaultControls && (e.node.style.display = "none");
          if (d.pluginWidth = e.width, d.pluginHeight = e.height, b.default.MepDefaults = d, new y.default(e.media, d, e.mediaFiles), e.getElement(e.container) !== void 0 && e.options.features.length && e.controlsAreVisible && !e.options.hideVideoControlsOnLoad) {
            var _ = (0, u.createEvent)("controlsshown", e.getElement(e.container));
            e.getElement(e.container).dispatchEvent(_);
          }
        }
      }, {
        key: "showControls",
        value: function(e) {
          var d = this;
          if (e = e === void 0 || e, !(d.controlsAreVisible || !d.isVideo)) {
            if (e)
              (function() {
                l.fadeIn(d.getElement(d.controls), 200, function() {
                  l.removeClass(d.getElement(d.controls), d.options.classPrefix + "offscreen");
                  var V = (0, u.createEvent)("controlsshown", d.getElement(d.container));
                  d.getElement(d.container).dispatchEvent(V);
                });
                for (var M = d.getElement(d.container).querySelectorAll("." + d.options.classPrefix + "control"), k = function(U, X) {
                  l.fadeIn(M[U], 200, function() {
                    l.removeClass(M[U], d.options.classPrefix + "offscreen");
                  });
                }, _ = 0, L = M.length; _ < L; _++)
                  k(_);
              })();
            else {
              l.removeClass(d.getElement(d.controls), d.options.classPrefix + "offscreen"), d.getElement(d.controls).style.display = "", d.getElement(d.controls).style.opacity = 1;
              for (var t = d.getElement(d.container).querySelectorAll("." + d.options.classPrefix + "control"), h = 0, E = t.length; h < E; h++)
                l.removeClass(t[h], d.options.classPrefix + "offscreen"), t[h].style.display = "";
              var A = (0, u.createEvent)("controlsshown", d.getElement(d.container));
              d.getElement(d.container).dispatchEvent(A);
            }
            d.controlsAreVisible = !0, d.setControlsSize();
          }
        }
      }, {
        key: "hideControls",
        value: function(e, d) {
          var t = this;
          if (e = e === void 0 || e, !(d !== !0 && (!t.controlsAreVisible || t.options.alwaysShowControls || t.paused && t.readyState === 4 && (!t.options.hideVideoControlsOnLoad && t.currentTime <= 0 || !t.options.hideVideoControlsOnPause && t.currentTime > 0) || t.isVideo && !t.options.hideVideoControlsOnLoad && !t.readyState || t.ended))) {
            if (e)
              (function() {
                l.fadeOut(t.getElement(t.controls), 200, function() {
                  l.addClass(t.getElement(t.controls), t.options.classPrefix + "offscreen"), t.getElement(t.controls).style.display = "";
                  var U = (0, u.createEvent)("controlshidden", t.getElement(t.container));
                  t.getElement(t.container).dispatchEvent(U);
                });
                for (var k = t.getElement(t.container).querySelectorAll("." + t.options.classPrefix + "control"), _ = function(X, W) {
                  l.fadeOut(k[X], 200, function() {
                    l.addClass(k[X], t.options.classPrefix + "offscreen"), k[X].style.display = "";
                  });
                }, L = 0, V = k.length; L < V; L++)
                  _(L);
              })();
            else {
              l.addClass(t.getElement(t.controls), t.options.classPrefix + "offscreen"), t.getElement(t.controls).style.display = "", t.getElement(t.controls).style.opacity = 0;
              for (var h = t.getElement(t.container).querySelectorAll("." + t.options.classPrefix + "control"), E = 0, A = h.length; E < A; E++)
                l.addClass(h[E], t.options.classPrefix + "offscreen"), h[E].style.display = "";
              var M = (0, u.createEvent)("controlshidden", t.getElement(t.container));
              t.getElement(t.container).dispatchEvent(M);
            }
            t.controlsAreVisible = !1;
          }
        }
      }, {
        key: "startControlsTimer",
        value: function(e) {
          var d = this;
          e = typeof e < "u" ? e : d.options.controlsTimeoutDefault, d.killControlsTimer("start"), d.controlsTimer = setTimeout(function() {
            d.hideControls(), d.killControlsTimer("hide");
          }, e);
        }
      }, {
        key: "killControlsTimer",
        value: function() {
          var e = this;
          e.controlsTimer !== null && (clearTimeout(e.controlsTimer), delete e.controlsTimer, e.controlsTimer = null);
        }
      }, {
        key: "disableControls",
        value: function() {
          var e = this;
          e.killControlsTimer(), e.controlsEnabled = !1, e.hideControls(!1, !0);
        }
      }, {
        key: "enableControls",
        value: function() {
          var e = this;
          e.controlsEnabled = !0, e.showControls(!1);
        }
      }, {
        key: "_setDefaultPlayer",
        value: function() {
          var e = this;
          e.proxy && e.proxy.pause(), e.proxy = new a.default(e), e.media.addEventListener("loadedmetadata", function() {
            e.getCurrentTime() > 0 && e.currentMediaTime > 0 && (e.setCurrentTime(e.currentMediaTime), !n.IS_IOS && !n.IS_ANDROID && e.play());
          });
        }
      }, {
        key: "_meReady",
        value: function(e, d) {
          var t = this, h = d.getAttribute("autoplay"), E = !(h == null || h === "false"), A = e.rendererName !== null && /(native|html5)/i.test(e.rendererName);
          if (t.getElement(t.controls) && t.enableControls(), t.getElement(t.container) && t.getElement(t.container).querySelector("." + t.options.classPrefix + "overlay-play") && (t.getElement(t.container).querySelector("." + t.options.classPrefix + "overlay-play").style.display = ""), !t.created) {
            if (t.created = !0, t.media = e, t.domNode = d, !(n.IS_ANDROID && t.options.AndroidUseNativeControls) && !(n.IS_IPAD && t.options.iPadUseNativeControls) && !(n.IS_IPHONE && t.options.iPhoneUseNativeControls)) {
              if (!t.isVideo && !t.options.features.length && !t.options.useDefaultControls) {
                E && A && t.play(), t.options.success && (typeof t.options.success == "string" ? R.default[t.options.success](t.media, t.domNode, t) : t.options.success(t.media, t.domNode, t));
                return;
              }
              if (t.featurePosition = {}, t._setDefaultPlayer(), t.buildposter(t, t.getElement(t.controls), t.getElement(t.layers), t.media), t.buildkeyboard(t, t.getElement(t.controls), t.getElement(t.layers), t.media), t.buildoverlays(t, t.getElement(t.controls), t.getElement(t.layers), t.media), t.options.useDefaultControls) {
                var M = ["playpause", "current", "progress", "duration", "tracks", "volume", "fullscreen"];
                t.options.features = M.concat(t.options.features.filter(function(L) {
                  return M.indexOf(L) === -1;
                }));
              }
              t.buildfeatures(t, t.getElement(t.controls), t.getElement(t.layers), t.media);
              var k = (0, u.createEvent)("controlsready", t.getElement(t.container));
              t.getElement(t.container).dispatchEvent(k), t.setPlayerSize(t.width, t.height), t.setControlsSize(), t.isVideo && (t.clickToPlayPauseCallback = function() {
                if (t.options.clickToPlayPause) {
                  var L = t.getElement(t.container).querySelector("." + t.options.classPrefix + "overlay-button"), V = L.getAttribute("aria-pressed");
                  t.paused && V ? t.pause() : t.paused ? t.play() : t.pause(), L.setAttribute("aria-pressed", !V), t.getElement(t.container).focus();
                }
              }, t.createIframeLayer(), t.media.addEventListener("click", t.clickToPlayPauseCallback), (n.IS_ANDROID || n.IS_IOS) && !t.options.alwaysShowControls ? t.node.addEventListener("touchstart", function() {
                t.controlsAreVisible ? t.hideControls(!1) : t.controlsEnabled && t.showControls(!1);
              }, n.SUPPORT_PASSIVE_EVENT ? { passive: !0 } : !1) : (t.getElement(t.container).addEventListener("mouseenter", function() {
                t.controlsEnabled && (t.options.alwaysShowControls || (t.killControlsTimer("enter"), t.showControls(), t.startControlsTimer(t.options.controlsTimeoutMouseEnter)));
              }), t.getElement(t.container).addEventListener("mousemove", function() {
                t.controlsEnabled && (t.controlsAreVisible || t.showControls(), t.options.alwaysShowControls || t.startControlsTimer(t.options.controlsTimeoutMouseEnter));
              }), t.getElement(t.container).addEventListener("mouseleave", function() {
                t.controlsEnabled && !t.paused && !t.options.alwaysShowControls && t.startControlsTimer(t.options.controlsTimeoutMouseLeave);
              })), t.options.hideVideoControlsOnLoad && t.hideControls(!1), t.options.enableAutosize && t.media.addEventListener("loadedmetadata", function(L) {
                var V = L !== void 0 ? L.detail.target || L.target : t.media;
                t.options.videoHeight <= 0 && !t.domNode.getAttribute("height") && !t.domNode.style.height && V !== null && !isNaN(V.videoHeight) && (t.setPlayerSize(V.videoWidth, V.videoHeight), t.setControlsSize(), t.media.setSize(V.videoWidth, V.videoHeight));
              })), t.media.addEventListener("play", function() {
                t.hasFocus = !0;
                for (var L in b.default.players)
                  if (b.default.players.hasOwnProperty(L)) {
                    var V = b.default.players[L];
                    V.id !== t.id && t.options.pauseOtherPlayers && !V.paused && !V.ended && V.options.ignorePauseOtherPlayersOption !== !0 && (V.pause(), V.hasFocus = !1);
                  }
                !(n.IS_ANDROID || n.IS_IOS) && !t.options.alwaysShowControls && t.isVideo && t.hideControls();
              }), t.media.addEventListener("ended", function() {
                if (t.options.autoRewind)
                  try {
                    t.setCurrentTime(0), setTimeout(function() {
                      var L = t.getElement(t.container).querySelector("." + t.options.classPrefix + "overlay-loading");
                      L && L.parentNode && (L.parentNode.style.display = "none");
                    }, 20);
                  } catch {
                  }
                typeof t.media.renderer.stop == "function" ? t.media.renderer.stop() : t.pause(), t.setProgressRail && t.setProgressRail(), t.setCurrentRail && t.setCurrentRail(), t.options.loop ? t.play() : !t.options.alwaysShowControls && t.controlsEnabled && t.showControls();
              }), t.media.addEventListener("loadedmetadata", function() {
                (0, o.calculateTimeFormat)(t.getDuration(), t.options, t.options.framesPerSecond || 25), t.updateDuration && t.updateDuration(), t.updateCurrent && t.updateCurrent(), t.isFullScreen || (t.setPlayerSize(t.width, t.height), t.setControlsSize());
              });
              var _ = null;
              t.media.addEventListener("timeupdate", function() {
                !isNaN(t.getDuration()) && _ !== t.getDuration() && (_ = t.getDuration(), (0, o.calculateTimeFormat)(_, t.options, t.options.framesPerSecond || 25), t.updateDuration && t.updateDuration(), t.updateCurrent && t.updateCurrent(), t.setControlsSize());
              }), t.getElement(t.container).addEventListener("click", function(L) {
                l.addClass(L.currentTarget, t.options.classPrefix + "container-keyboard-inactive");
              }), t.getElement(t.container).addEventListener("focusin", function(L) {
                l.removeClass(L.currentTarget, t.options.classPrefix + "container-keyboard-inactive"), t.isVideo && !n.IS_ANDROID && !n.IS_IOS && t.controlsEnabled && !t.options.alwaysShowControls && (t.killControlsTimer("enter"), t.showControls(), t.startControlsTimer(t.options.controlsTimeoutMouseEnter));
              }), t.getElement(t.container).addEventListener("focusout", function(L) {
                setTimeout(function() {
                  L.relatedTarget && t.keyboardAction && !L.relatedTarget.closest("." + t.options.classPrefix + "container") && (t.keyboardAction = !1, t.isVideo && !t.options.alwaysShowControls && !t.paused && t.startControlsTimer(t.options.controlsTimeoutMouseLeave));
                }, 0);
              }), setTimeout(function() {
                t.setPlayerSize(t.width, t.height), t.setControlsSize();
              }, 0), t.globalResizeCallback = function() {
                t.isFullScreen || n.HAS_TRUE_NATIVE_FULLSCREEN && C.default.webkitIsFullScreen || t.setPlayerSize(t.width, t.height), t.setControlsSize();
              }, t.globalBind("resize", t.globalResizeCallback);
            }
            E && A && t.play(), t.options.success && (typeof t.options.success == "string" ? R.default[t.options.success](t.media, t.domNode, t) : t.options.success(t.media, t.domNode, t));
          }
        }
      }, {
        key: "_handleError",
        value: function(e, d, t) {
          var h = this, E = h.getElement(h.layers).querySelector("." + h.options.classPrefix + "overlay-play");
          E && (E.style.display = "none"), h.options.error && h.options.error(e, d, t), h.getElement(h.container).querySelector("." + h.options.classPrefix + "cannotplay") && h.getElement(h.container).querySelector("." + h.options.classPrefix + "cannotplay").remove();
          var A = C.default.createElement("div");
          A.className = h.options.classPrefix + "cannotplay", A.style.width = "100%", A.style.height = "100%";
          var M = typeof h.options.customError == "function" ? h.options.customError(h.media, h.media.originalNode) : h.options.customError, k = "";
          if (!M) {
            var _ = h.media.originalNode.getAttribute("poster");
            if (_ && (k = '<img src="' + _ + '" alt="' + b.default.i18n.t("mejs.download-file") + '">'), e.message && (M = "<p>" + e.message + "</p>"), e.urls)
              for (var L = 0, V = e.urls.length; L < V; L++) {
                var U = e.urls[L];
                M += '<a href="' + U.src + '" data-type="' + U.type + '"><span>' + b.default.i18n.t("mejs.download-file") + ": " + U.src + "</span></a>";
              }
          }
          M && h.getElement(h.layers).querySelector("." + h.options.classPrefix + "overlay-error") && (A.innerHTML = M, h.getElement(h.layers).querySelector("." + h.options.classPrefix + "overlay-error").innerHTML = "" + k + A.outerHTML, h.getElement(h.layers).querySelector("." + h.options.classPrefix + "overlay-error").parentNode.style.display = "block"), h.controlsEnabled && h.disableControls();
        }
      }, {
        key: "setPlayerSize",
        value: function(e, d) {
          var t = this;
          if (!t.options.setDimensions)
            return !1;
          switch (typeof e < "u" && (t.width = e), typeof d < "u" && (t.height = d), t.options.stretching) {
            case "fill":
              t.isVideo ? t.setFillMode() : t.setDimensions(t.width, t.height);
              break;
            case "responsive":
              t.setResponsiveMode();
              break;
            case "none":
              t.setDimensions(t.width, t.height);
              break;
            default:
              t.hasFluidMode() === !0 ? t.setResponsiveMode() : t.setDimensions(t.width, t.height);
              break;
          }
        }
      }, {
        key: "hasFluidMode",
        value: function() {
          var e = this;
          return e.height.toString().indexOf("%") !== -1 || e.node && e.node.style.maxWidth && e.node.style.maxWidth !== "none" && e.node.style.maxWidth !== e.width || e.node && e.node.currentStyle && e.node.currentStyle.maxWidth === "100%";
        }
      }, {
        key: "setResponsiveMode",
        value: function() {
          var e = this, d = function() {
            for (var X = void 0, W = e.getElement(e.container); W; ) {
              try {
                if (n.IS_FIREFOX && W.tagName.toLowerCase() === "html" && R.default.self !== R.default.top && R.default.frameElement !== null)
                  return R.default.frameElement;
                X = W.parentElement;
              } catch {
                X = W.parentElement;
              }
              if (X && l.visible(X))
                return X;
              W = X;
            }
            return null;
          }(), t = getComputedStyle(d || C.default.body, null), h = function() {
            return e.isVideo ? e.node.videoWidth && e.node.videoWidth > 0 ? e.node.videoWidth : e.node.getAttribute("width") ? e.node.getAttribute("width") : e.options.defaultVideoWidth : e.options.defaultAudioWidth;
          }(), E = function() {
            return e.isVideo ? e.node.videoHeight && e.node.videoHeight > 0 ? e.node.videoHeight : e.node.getAttribute("height") ? e.node.getAttribute("height") : e.options.defaultVideoHeight : e.options.defaultAudioHeight;
          }(), A = function() {
            if (!e.options.enableAutosize)
              return e.initialAspectRatio;
            var X = 1;
            return e.isVideo && (e.node.videoWidth && e.node.videoWidth > 0 && e.node.videoHeight && e.node.videoHeight > 0 ? X = e.height >= e.width ? e.node.videoWidth / e.node.videoHeight : e.node.videoHeight / e.node.videoWidth : X = e.initialAspectRatio, (isNaN(X) || X < 0.01 || X > 100) && (X = 1)), X;
          }(), M = parseFloat(t.height), k = void 0, _ = parseFloat(t.width);
          if (e.isVideo ? e.height === "100%" ? k = parseFloat(_ * E / h, 10) : k = e.height >= e.width ? parseFloat(_ / A, 10) : parseFloat(_ * A, 10) : k = E, k <= e.container.querySelector("." + e.options.classPrefix + "inner").offsetHeight && (k = e.container.querySelector("." + e.options.classPrefix + "inner").offsetHeight), isNaN(k) && (k = M), e.getElement(e.container).parentNode.length > 0 && e.getElement(e.container).parentNode.tagName.toLowerCase() === "body" && (_ = R.default.innerWidth || C.default.documentElement.clientWidth || C.default.body.clientWidth, k = R.default.innerHeight || C.default.documentElement.clientHeight || C.default.body.clientHeight), k && _) {
            e.getElement(e.container).style.width = _ + "px", e.getElement(e.container).style.height = k + "px", e.node.style.width = "100%", e.node.style.height = "100%", e.isVideo && e.media.setSize && e.media.setSize(_, k), k <= e.container.querySelector("." + e.options.classPrefix + "inner").offsetHeight && (e.node.style.width = "auto", e.node.style.height = "auto");
            for (var L = e.getElement(e.layers).children, V = 0, U = L.length; V < U; V++)
              L[V].style.width = "100%", L[V].style.height = "100%";
          }
        }
      }, {
        key: "setFillMode",
        value: function() {
          var e = this, d = R.default.self !== R.default.top && R.default.frameElement !== null, t = function() {
            for (var Y = void 0, $ = e.getElement(e.container); $; ) {
              try {
                if (n.IS_FIREFOX && $.tagName.toLowerCase() === "html" && R.default.self !== R.default.top && R.default.frameElement !== null)
                  return R.default.frameElement;
                Y = $.parentElement;
              } catch {
                Y = $.parentElement;
              }
              if (Y && l.visible(Y))
                return Y;
              $ = Y;
            }
            return null;
          }(), h = getComputedStyle(t || C.default.body, null);
          e.node.style.height !== "none" && e.node.style.height !== e.height && (e.node.style.height = "auto"), e.node.style.maxWidth !== "none" && e.node.style.maxWidth !== e.width && (e.node.style.maxWidth = "none"), e.node.style.maxHeight !== "none" && e.node.style.maxHeight !== e.height && (e.node.style.maxHeight = "none"), e.node.currentStyle && (e.node.currentStyle.height === "100%" && (e.node.currentStyle.height = "auto"), e.node.currentStyle.maxWidth === "100%" && (e.node.currentStyle.maxWidth = "none"), e.node.currentStyle.maxHeight === "100%" && (e.node.currentStyle.maxHeight = "none")), !d && !parseFloat(h.width) && (t.style.width = e.media.offsetWidth + "px"), !d && !parseFloat(h.height) && (t.style.height = e.media.offsetHeight + "px"), h = getComputedStyle(t);
          var E = parseFloat(h.width), A = parseFloat(h.height);
          e.setDimensions("100%", "100%");
          var M = e.getElement(e.container).querySelector("." + e.options.classPrefix + "poster>img");
          M && (M.style.display = "");
          for (var k = e.getElement(e.container).querySelectorAll("object, embed, iframe, video"), _ = e.height, L = e.width, V = E, U = _ * E / L, X = L * A / _, W = A, q = !(X > E), K = Math.floor(q ? V : X), Z = Math.floor(q ? U : W), G = q ? E + "px" : K + "px", H = q ? Z + "px" : A + "px", j = 0, Q = k.length; j < Q; j++)
            k[j].style.height = H, k[j].style.width = G, e.media.setSize && e.media.setSize(G, H), k[j].style.marginLeft = Math.floor((E - K) / 2) + "px", k[j].style.marginTop = 0;
        }
      }, {
        key: "setDimensions",
        value: function(e, d) {
          var t = this;
          e = (0, u.isString)(e) && e.indexOf("%") > -1 ? e : parseFloat(e) + "px", d = (0, u.isString)(d) && d.indexOf("%") > -1 ? d : parseFloat(d) + "px", t.getElement(t.container).style.width = e, t.getElement(t.container).style.height = d;
          for (var h = t.getElement(t.layers).children, E = 0, A = h.length; E < A; E++)
            h[E].style.width = e, h[E].style.height = d;
        }
      }, {
        key: "setControlsSize",
        value: function() {
          var e = this;
          if (!!l.visible(e.getElement(e.container)) && !(e.rail && l.visible(e.rail))) {
            for (var d = e.getElement(e.controls).children, t = 0, h = 0, E = d.length; h < E; h++)
              t += d[h].offsetWidth;
            e.getElement(e.container).style.minWidth = t + "px";
          }
        }
      }, {
        key: "addControlElement",
        value: function(e, d) {
          var t = this;
          if (t.featurePosition[d] !== void 0) {
            var h = t.getElement(t.controls).children[t.featurePosition[d] - 1];
            h.parentNode.insertBefore(e, h.nextSibling);
          } else {
            t.getElement(t.controls).appendChild(e);
            for (var E = t.getElement(t.controls).children, A = 0, M = E.length; A < M; A++)
              if (e === E[A]) {
                t.featurePosition[d] = A;
                break;
              }
          }
        }
      }, {
        key: "createIframeLayer",
        value: function() {
          var e = this;
          if (e.isVideo && e.media.rendererName !== null && e.media.rendererName.indexOf("iframe") > -1 && !C.default.getElementById(e.media.id + "-iframe-overlay")) {
            var d = C.default.createElement("div"), t = C.default.getElementById(e.media.id + "_" + e.media.rendererName);
            d.id = e.media.id + "-iframe-overlay", d.className = e.options.classPrefix + "iframe-overlay", d.addEventListener("click", function(h) {
              e.options.clickToPlayPause && (e.paused ? e.play() : e.pause(), h.preventDefault(), h.stopPropagation());
            }), t.parentNode.insertBefore(d, t);
          }
        }
      }, {
        key: "resetSize",
        value: function() {
          var e = this;
          setTimeout(function() {
            e.setPlayerSize(e.width, e.height), e.setControlsSize();
          }, 50);
        }
      }, {
        key: "setPoster",
        value: function(e) {
          var d = this;
          if (d.getElement(d.container)) {
            var t = d.getElement(d.container).querySelector("." + d.options.classPrefix + "poster");
            t || (t = C.default.createElement("div"), t.className = d.options.classPrefix + "poster " + d.options.classPrefix + "layer", d.getElement(d.layers).appendChild(t));
            var h = t.querySelector("img");
            !h && e && (h = C.default.createElement("img"), h.alt = "", h.className = d.options.classPrefix + "poster-img", h.width = "100%", h.height = "100%", t.style.display = "", t.appendChild(h)), e ? (h.setAttribute("src", e), t.style.backgroundImage = 'url("' + e + '")', t.style.display = "") : h ? (t.style.backgroundImage = "none", t.style.display = "none", h.remove()) : t.style.display = "none";
          } else
            (n.IS_IPAD && d.options.iPadUseNativeControls || n.IS_IPHONE && d.options.iPhoneUseNativeControls || n.IS_ANDROID && d.options.AndroidUseNativeControls) && (d.media.originalNode.poster = e);
        }
      }, {
        key: "changeSkin",
        value: function(e) {
          var d = this;
          d.getElement(d.container).className = d.options.classPrefix + "container " + e, d.setPlayerSize(d.width, d.height), d.setControlsSize();
        }
      }, {
        key: "globalBind",
        value: function(e, d) {
          var t = this, h = t.node ? t.node.ownerDocument : C.default;
          if (e = (0, u.splitEvents)(e, t.id), e.d)
            for (var E = e.d.split(" "), A = 0, M = E.length; A < M; A++)
              E[A].split(".").reduce(function(V, U) {
                return h.addEventListener(U, d, !1), U;
              }, "");
          if (e.w)
            for (var k = e.w.split(" "), _ = 0, L = k.length; _ < L; _++)
              k[_].split(".").reduce(function(V, U) {
                return R.default.addEventListener(U, d, !1), U;
              }, "");
        }
      }, {
        key: "globalUnbind",
        value: function(e, d) {
          var t = this, h = t.node ? t.node.ownerDocument : C.default;
          if (e = (0, u.splitEvents)(e, t.id), e.d)
            for (var E = e.d.split(" "), A = 0, M = E.length; A < M; A++)
              E[A].split(".").reduce(function(V, U) {
                return h.removeEventListener(U, d, !1), U;
              }, "");
          if (e.w)
            for (var k = e.w.split(" "), _ = 0, L = k.length; _ < L; _++)
              k[_].split(".").reduce(function(V, U) {
                return R.default.removeEventListener(U, d, !1), U;
              }, "");
        }
      }, {
        key: "buildfeatures",
        value: function(e, d, t, h) {
          for (var E = this, A = 0, M = E.options.features.length; A < M; A++) {
            var k = E.options.features[A];
            if (E["build" + k])
              try {
                E["build" + k](e, d, t, h);
              } catch (_) {
                console.error("error building " + k, _);
              }
          }
        }
      }, {
        key: "buildposter",
        value: function(e, d, t, h) {
          var E = this, A = C.default.createElement("div");
          A.className = E.options.classPrefix + "poster " + E.options.classPrefix + "layer", t.appendChild(A);
          var M = h.originalNode.getAttribute("poster");
          e.options.poster !== "" && (M && n.IS_IOS && h.originalNode.removeAttribute("poster"), M = e.options.poster), M ? E.setPoster(M) : E.media.renderer !== null && typeof E.media.renderer.getPosterUrl == "function" ? E.setPoster(E.media.renderer.getPosterUrl()) : A.style.display = "none", h.addEventListener("play", function() {
            A.style.display = "none";
          }), h.addEventListener("playing", function() {
            A.style.display = "none";
          }), e.options.showPosterWhenEnded && e.options.autoRewind && h.addEventListener("ended", function() {
            A.style.display = "";
          }), h.addEventListener("error", function() {
            A.style.display = "none";
          }), e.options.showPosterWhenPaused && h.addEventListener("pause", function() {
            e.ended || (A.style.display = "");
          });
        }
      }, {
        key: "buildoverlays",
        value: function(e, d, t, h) {
          if (!!e.isVideo) {
            var E = this, A = C.default.createElement("div"), M = C.default.createElement("div"), k = C.default.createElement("div");
            A.style.display = "none", A.className = E.options.classPrefix + "overlay " + E.options.classPrefix + "layer", A.innerHTML = '<div class="' + E.options.classPrefix + 'overlay-loading">' + ('<div class="' + E.options.classPrefix + `overlay-loading-bg-img">
					<svg xmlns="http://www.w3.org/2000/svg">
						<use xlink:href="` + E.media.options.iconSprite + `#icon-loading-spinner"></use>
					</svg>
				</div>`) + "</div>", t.appendChild(A), M.style.display = "none", M.className = E.options.classPrefix + "overlay " + E.options.classPrefix + "layer", M.innerHTML = '<div class="' + E.options.classPrefix + 'overlay-error"></div>', t.appendChild(M), k.className = E.options.classPrefix + "overlay " + E.options.classPrefix + "layer " + E.options.classPrefix + "overlay-play", k.innerHTML = (0, w.generateControlButton)(E.id, c.default.t("mejs.play"), c.default.t("mejs.play"), "" + E.media.options.iconSprite, ["icon-overlay-play"], "" + E.options.classPrefix, E.options.classPrefix + "overlay-button", "", !1), k.addEventListener("click", function() {
              if (E.options.clickToPlayPause) {
                var L = E.getElement(E.container).querySelector("." + E.options.classPrefix + "overlay-button"), V = L.getAttribute("aria-pressed");
                E.paused ? E.play() : E.pause(), L.setAttribute("aria-pressed", !!V), E.getElement(E.container).focus();
              }
            }), k.addEventListener("keydown", function(L) {
              var V = L.keyCode || L.which || 0;
              if (V === 13 || n.IS_FIREFOX && V === 32) {
                var U = (0, u.createEvent)("click", k);
                return k.dispatchEvent(U), !1;
              }
            }), t.appendChild(k), E.media.rendererName !== null && (/(youtube|facebook)/i.test(E.media.rendererName) && !(E.media.originalNode.getAttribute("poster") || e.options.poster || typeof E.media.renderer.getPosterUrl == "function" && E.media.renderer.getPosterUrl()) || n.IS_STOCK_ANDROID || E.media.originalNode.getAttribute("autoplay")) && (k.style.display = "none");
            var _ = !1;
            h.addEventListener("play", function() {
              k.style.display = "none", A.style.display = "none", M.style.display = "none", _ = !1;
            }), h.addEventListener("playing", function() {
              k.style.display = "none", A.style.display = "none", M.style.display = "none", _ = !1;
            }), h.addEventListener("seeking", function() {
              k.style.display = "none", A.style.display = "", _ = !1;
            }), h.addEventListener("seeked", function() {
              k.style.display = E.paused && !n.IS_STOCK_ANDROID ? "" : "none", A.style.display = "none", _ = !1;
            }), h.addEventListener("pause", function() {
              A.style.display = "none", !n.IS_STOCK_ANDROID && !_ && (k.style.display = ""), _ = !1;
            }), h.addEventListener("waiting", function() {
              A.style.display = "", _ = !1;
            }), h.addEventListener("loadeddata", function() {
              A.style.display = "", n.IS_ANDROID && (h.canplayTimeout = setTimeout(function() {
                if (C.default.createEvent) {
                  var L = C.default.createEvent("HTMLEvents");
                  return L.initEvent("canplay", !0, !0), h.dispatchEvent(L);
                }
              }, 300)), _ = !1;
            }), h.addEventListener("canplay", function() {
              A.style.display = "none", clearTimeout(h.canplayTimeout), _ = !1;
            }), h.addEventListener("error", function(L) {
              E._handleError(L, E.media, E.node), A.style.display = "none", k.style.display = "none", _ = !0;
            }), h.addEventListener("loadedmetadata", function() {
              E.controlsEnabled || E.enableControls();
            }), h.addEventListener("keydown", function(L) {
              E.onkeydown(e, h, L), _ = !1;
            });
          }
        }
      }, {
        key: "buildkeyboard",
        value: function(e, d, t, h) {
          var E = this;
          E.getElement(E.container).addEventListener("keydown", function() {
            E.keyboardAction = !0;
          }), E.globalKeydownCallback = function(A) {
            if (!C.default.activeElement)
              return !0;
            var M = C.default.activeElement.closest("." + E.options.classPrefix + "container"), k = E.media.closest("." + E.options.classPrefix + "container");
            return E.hasFocus = !!(M && k && M.id === k.id), E.onkeydown(e, h, A);
          }, E.globalClickCallback = function(A) {
            E.hasFocus = !!A.target.closest("." + E.options.classPrefix + "container");
          }, E.globalBind("keydown", E.globalKeydownCallback), E.globalBind("click", E.globalClickCallback);
        }
      }, {
        key: "onkeydown",
        value: function(e, d, t) {
          if (e.hasFocus && e.options.enableKeyboard) {
            for (var h = 0, E = e.options.keyActions.length; h < E; h++)
              for (var A = e.options.keyActions[h], M = 0, k = A.keys.length; M < k; M++)
                if (t.keyCode === A.keys[M]) {
                  A.action(e, d, t.keyCode, t), t.preventDefault(), t.stopPropagation();
                  return;
                }
          }
          return !0;
        }
      }, {
        key: "play",
        value: function() {
          return this.proxy.play();
        }
      }, {
        key: "pause",
        value: function() {
          return this.proxy.pause();
        }
      }, {
        key: "load",
        value: function() {
          return this.proxy.load();
        }
      }, {
        key: "setCurrentTime",
        value: function(e) {
          var d = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
          this.seekUserInteraction = d, this.proxy.setCurrentTime(e);
        }
      }, {
        key: "getCurrentTime",
        value: function() {
          return this.proxy.currentTime;
        }
      }, {
        key: "getDuration",
        value: function() {
          return this.proxy.duration;
        }
      }, {
        key: "setVolume",
        value: function(e) {
          this.proxy.volume = e;
        }
      }, {
        key: "getVolume",
        value: function() {
          return this.proxy.getVolume();
        }
      }, {
        key: "setMuted",
        value: function(e) {
          this.proxy.setMuted(e);
        }
      }, {
        key: "setSrc",
        value: function(e) {
          this.controlsEnabled || this.enableControls(), this.proxy.setSrc(e);
        }
      }, {
        key: "getSrc",
        value: function() {
          return this.proxy.getSrc();
        }
      }, {
        key: "canPlayType",
        value: function(e) {
          return this.proxy.canPlayType(e);
        }
      }, {
        key: "remove",
        value: function() {
          var e = this, d = e.media.rendererName, t = e.media.originalNode.src;
          for (var h in e.options.features) {
            var E = e.options.features[h];
            if (e["clean" + E])
              try {
                e["clean" + E](e, e.getElement(e.layers), e.getElement(e.controls), e.media);
              } catch (_) {
                console.error("error cleaning " + E, _);
              }
          }
          var A = e.node.getAttribute("width"), M = e.node.getAttribute("height");
          if (A ? A.indexOf("%") === -1 && (A = A + "px") : A = "auto", M ? M.indexOf("%") === -1 && (M = M + "px") : M = "auto", e.node.style.width = A, e.node.style.height = M, e.setPlayerSize(0, 0), e.isDynamic ? e.getElement(e.container).parentNode.insertBefore(e.node, e.getElement(e.container)) : function() {
            e.node.setAttribute("controls", !0), e.node.setAttribute("id", e.node.getAttribute("id").replace("_" + d, "").replace("_from_mejs", ""));
            var _ = e.getElement(e.container).querySelector("." + e.options.classPrefix + "poster>img");
            if (_ && e.node.setAttribute("poster", _.src), delete e.node.autoplay, e.node.setAttribute("src", ""), e.media.canPlayType((0, i.getTypeFromFile)(t)) !== "" && e.node.setAttribute("src", t), d && d.indexOf("iframe") > -1) {
              var L = C.default.getElementById(e.media.id + "-iframe-overlay");
              L.remove();
            }
            var V = e.node.cloneNode();
            if (V.style.display = "", e.getElement(e.container).parentNode.insertBefore(V, e.getElement(e.container)), e.node.remove(), e.mediaFiles)
              for (var U = 0, X = e.mediaFiles.length; U < X; U++) {
                var W = C.default.createElement("source");
                W.setAttribute("src", e.mediaFiles[U].src), W.setAttribute("type", e.mediaFiles[U].type), V.appendChild(W);
              }
            if (e.trackFiles)
              for (var q = function(H, j) {
                var Q = e.trackFiles[H], Y = C.default.createElement("track");
                Y.kind = Q.kind, Y.label = Q.label, Y.srclang = Q.srclang, Y.src = Q.src, V.appendChild(Y), Y.addEventListener("load", function() {
                  this.mode = "showing", V.textTracks[H].mode = "showing";
                });
              }, K = 0, Z = e.trackFiles.length; K < Z; K++)
                q(K, Z);
            delete e.node, delete e.mediaFiles, delete e.trackFiles;
          }(), e.media.renderer && typeof e.media.renderer.destroy == "function" && e.media.renderer.destroy(), delete b.default.players[e.id], z(e.getElement(e.container)) === "object") {
            var k = e.getElement(e.container).parentNode.querySelector("." + e.options.classPrefix + "offscreen");
            k && k.remove(), e.getElement(e.container).remove();
          }
          e.globalUnbind("resize", e.globalResizeCallback), e.globalUnbind("keydown", e.globalKeydownCallback), e.globalUnbind("click", e.globalClickCallback), delete e.media.player;
        }
      }, {
        key: "paused",
        get: function() {
          return this.proxy.paused;
        }
      }, {
        key: "muted",
        get: function() {
          return this.proxy.muted;
        },
        set: function(e) {
          this.setMuted(e);
        }
      }, {
        key: "ended",
        get: function() {
          return this.proxy.ended;
        }
      }, {
        key: "readyState",
        get: function() {
          return this.proxy.readyState;
        }
      }, {
        key: "currentTime",
        set: function(e) {
          this.setCurrentTime(e);
        },
        get: function() {
          return this.getCurrentTime();
        }
      }, {
        key: "duration",
        get: function() {
          return this.getDuration();
        }
      }, {
        key: "volume",
        set: function(e) {
          this.setVolume(e);
        },
        get: function() {
          return this.getVolume();
        }
      }, {
        key: "src",
        set: function(e) {
          this.setSrc(e);
        },
        get: function() {
          return this.getSrc();
        }
      }]), v;
    }();
    R.default.MediaElementPlayer = D, b.default.MediaElementPlayer = D, x.default = D;
  }, { 18: 18, 2: 2, 26: 26, 27: 27, 28: 28, 29: 29, 3: 3, 30: 30, 32: 32, 6: 6, 7: 7, 8: 8 }], 18: [function(T, J, x) {
    Object.defineProperty(x, "__esModule", {
      value: !0
    });
    var z = function() {
      function N(b, s) {
        for (var y = 0; y < s.length; y++) {
          var m = s[y];
          m.enumerable = m.enumerable || !1, m.configurable = !0, "value" in m && (m.writable = !0), Object.defineProperty(b, m.key, m);
        }
      }
      return function(b, s, y) {
        return s && N(b.prototype, s), y && N(b, y), b;
      };
    }(), O = T(3), B = R(O);
    function R(N) {
      return N && N.__esModule ? N : { default: N };
    }
    function I(N, b) {
      if (!(N instanceof b))
        throw new TypeError("Cannot call a class as a function");
    }
    var C = function() {
      function N(b) {
        return I(this, N), this.media = b.media, this.isVideo = b.isVideo, this.classPrefix = b.options.classPrefix, this.createIframeLayer = function() {
          return b.createIframeLayer();
        }, this.setPoster = function(s) {
          return b.setPoster(s);
        }, this;
      }
      return z(N, [{
        key: "play",
        value: function() {
          return this.media.play();
        }
      }, {
        key: "pause",
        value: function() {
          return this.media.pause();
        }
      }, {
        key: "load",
        value: function() {
          var s = this;
          s.isLoaded || s.media.load(), s.isLoaded = !0;
        }
      }, {
        key: "setCurrentTime",
        value: function(s) {
          this.media.setCurrentTime(s);
        }
      }, {
        key: "getCurrentTime",
        value: function() {
          return this.media.currentTime;
        }
      }, {
        key: "getDuration",
        value: function() {
          var s = this.media.getDuration();
          return s === 1 / 0 && this.media.seekable && this.media.seekable.length && (s = this.media.seekable.end(0)), s;
        }
      }, {
        key: "setVolume",
        value: function(s) {
          this.media.setVolume(s);
        }
      }, {
        key: "getVolume",
        value: function() {
          return this.media.getVolume();
        }
      }, {
        key: "setMuted",
        value: function(s) {
          this.media.setMuted(s);
        }
      }, {
        key: "setSrc",
        value: function(s) {
          var y = this, m = document.getElementById(y.media.id + "-iframe-overlay");
          m && m.remove(), y.media.setSrc(s), y.createIframeLayer(), y.media.renderer !== null && typeof y.media.renderer.getPosterUrl == "function" && y.setPoster(y.media.renderer.getPosterUrl());
        }
      }, {
        key: "getSrc",
        value: function() {
          return this.media.getSrc();
        }
      }, {
        key: "canPlayType",
        value: function(s) {
          return this.media.canPlayType(s);
        }
      }, {
        key: "paused",
        get: function() {
          return this.media.paused;
        }
      }, {
        key: "muted",
        set: function(s) {
          this.setMuted(s);
        },
        get: function() {
          return this.media.muted;
        }
      }, {
        key: "ended",
        get: function() {
          return this.media.ended;
        }
      }, {
        key: "readyState",
        get: function() {
          return this.media.readyState;
        }
      }, {
        key: "currentTime",
        set: function(s) {
          this.setCurrentTime(s);
        },
        get: function() {
          return this.getCurrentTime();
        }
      }, {
        key: "duration",
        get: function() {
          return this.getDuration();
        }
      }, {
        key: "remainingTime",
        get: function() {
          return this.getDuration() - this.currentTime();
        }
      }, {
        key: "volume",
        set: function(s) {
          this.setVolume(s);
        },
        get: function() {
          return this.getVolume();
        }
      }, {
        key: "src",
        set: function(s) {
          this.setSrc(s);
        },
        get: function() {
          return this.getSrc();
        }
      }]), N;
    }();
    x.default = C, B.default.DefaultPlayer = C;
  }, { 3: 3 }], 19: [function(T, J, x) {
    var z = T(3);
    C(z);
    var O = T(8), B = C(O), R = T(17), I = C(R);
    function C(N) {
      return N && N.__esModule ? N : { default: N };
    }
    typeof jQuery < "u" ? B.default.$ = jQuery : typeof Zepto < "u" ? B.default.$ = Zepto : typeof ender < "u" && (B.default.$ = ender), function(N) {
      typeof N < "u" && (N.fn.mediaelementplayer = function(b) {
        return b === !1 ? this.each(function() {
          var s = N(this).data("mediaelementplayer");
          s && s.remove(), N(this).removeData("mediaelementplayer");
        }) : this.each(function() {
          N(this).data("mediaelementplayer", new I.default(this, b));
        }), this;
      }, N(document).ready(function() {
        N("." + B.default.MepDefaults.classPrefix + "player").mediaelementplayer();
      }));
    }(B.default.$);
  }, { 17: 17, 3: 3, 8: 8 }], 20: [function(T, J, x) {
    var z = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(c) {
      return typeof c;
    } : function(c) {
      return c && typeof Symbol == "function" && c.constructor === Symbol && c !== Symbol.prototype ? "symbol" : typeof c;
    }, O = T(3), B = m(O), R = T(8), I = m(R), C = T(9), N = T(28), b = T(30), s = T(26), y = T(27);
    function m(c) {
      return c && c.__esModule ? c : { default: c };
    }
    var a = {
      promise: null,
      load: function(n) {
        return typeof dashjs < "u" ? a.promise = new Promise(function(u) {
          u();
        }).then(function() {
          a._createPlayer(n);
        }) : (n.options.path = typeof n.options.path == "string" ? n.options.path : "https://cdn.dashjs.org/latest/dash.all.min.js", a.promise = a.promise || (0, y.loadScript)(n.options.path), a.promise.then(function() {
          a._createPlayer(n);
        })), a.promise;
      },
      _createPlayer: function(n) {
        var u = dashjs.MediaPlayer().create();
        return B.default["__ready__" + n.id](u), u;
      }
    }, f = {
      name: "native_dash",
      options: {
        prefix: "native_dash",
        dash: {
          path: "https://cdn.dashjs.org/latest/dash.all.min.js",
          debug: !1,
          drm: {},
          robustnessLevel: ""
        }
      },
      canPlayType: function(n) {
        return s.HAS_MSE && ["application/dash+xml"].indexOf(n.toLowerCase()) > -1;
      },
      create: function(n, u, o) {
        var i = n.originalNode, r = n.id + "_" + u.prefix, l = i.autoplay, w = i.children, g = null, p = null;
        i.removeAttribute("type");
        for (var P = 0, F = w.length; P < F; P++)
          w[P].removeAttribute("type");
        g = i.cloneNode(!0), u = Object.assign(u, n.options);
        for (var D = I.default.html5media.properties, v = I.default.html5media.events.concat(["click", "mouseover", "mouseout"]).filter(function(M) {
          return M !== "error";
        }), S = function(k) {
          var _ = (0, N.createEvent)(k.type, n);
          n.dispatchEvent(_);
        }, e = function(k) {
          var _ = "" + k.substring(0, 1).toUpperCase() + k.substring(1);
          g["get" + _] = function() {
            return p !== null ? g[k] : null;
          }, g["set" + _] = function(L) {
            if (I.default.html5media.readOnlyProperties.indexOf(k) === -1)
              if (k === "src") {
                var V = (typeof L > "u" ? "undefined" : z(L)) === "object" && L.src ? L.src : L;
                if (g[k] = V, p !== null) {
                  p.reset();
                  for (var U = 0, X = v.length; U < X; U++)
                    g.removeEventListener(v[U], S);
                  p = a._createPlayer({
                    options: u.dash,
                    id: r
                  }), L && (typeof L > "u" ? "undefined" : z(L)) === "object" && z(L.drm) === "object" && (p.setProtectionData(L.drm), (0, N.isString)(u.dash.robustnessLevel) && u.dash.robustnessLevel && p.getProtectionController().setRobustnessLevel(u.dash.robustnessLevel)), p.attachSource(V), l && p.play();
                }
              } else
                g[k] = L;
          };
        }, d = 0, t = D.length; d < t; d++)
          e(D[d]);
        if (B.default["__ready__" + r] = function(M) {
          n.dashPlayer = p = M;
          for (var k = dashjs.MediaPlayer.events, _ = function(q) {
            q === "loadedmetadata" && (p.initialize(), p.attachView(g), p.setAutoPlay(!1), z(u.dash.drm) === "object" && !I.default.Utils.isObjectEmpty(u.dash.drm) && (p.setProtectionData(u.dash.drm), (0, N.isString)(u.dash.robustnessLevel) && u.dash.robustnessLevel && p.getProtectionController().setRobustnessLevel(u.dash.robustnessLevel)), p.attachSource(g.getSrc())), g.addEventListener(q, S);
          }, L = 0, V = v.length; L < V; L++)
            _(v[L]);
          var U = function(q) {
            if (q.type.toLowerCase() === "error")
              n.generateError(q.message, g.src), console.error(q);
            else {
              var K = (0, N.createEvent)(q.type, n);
              K.data = q, n.dispatchEvent(K);
            }
          };
          for (var X in k)
            k.hasOwnProperty(X) && p.on(k[X], function(W) {
              return U(W);
            });
        }, o && o.length > 0) {
          for (var h = 0, E = o.length; h < E; h++)
            if (C.renderer.renderers[u.prefix].canPlayType(o[h].type)) {
              g.setAttribute("src", o[h].src), typeof o[h].drm < "u" && (u.dash.drm = o[h].drm);
              break;
            }
        }
        g.setAttribute("id", r), i.parentNode.insertBefore(g, i), i.autoplay = !1, i.style.display = "none", g.setSize = function(M, k) {
          return g.style.width = M + "px", g.style.height = k + "px", g;
        }, g.hide = function() {
          return g.pause(), g.style.display = "none", g;
        }, g.show = function() {
          return g.style.display = "", g;
        }, g.destroy = function() {
          p !== null && p.reset();
        };
        var A = (0, N.createEvent)("rendererready", g);
        return n.dispatchEvent(A), n.promises.push(a.load({
          options: u.dash,
          id: r
        })), g;
      }
    };
    b.typeChecks.push(function(c) {
      return ~c.toLowerCase().indexOf(".mpd") ? "application/dash+xml" : null;
    }), C.renderer.add(f);
  }, { 26: 26, 27: 27, 28: 28, 3: 3, 30: 30, 8: 8, 9: 9 }], 21: [function(T, J, x) {
    Object.defineProperty(x, "__esModule", {
      value: !0
    }), x.PluginDetector = void 0;
    var z = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(p) {
      return typeof p;
    } : function(p) {
      return p && typeof Symbol == "function" && p.constructor === Symbol && p !== Symbol.prototype ? "symbol" : typeof p;
    }, O = T(3), B = c(O), R = T(2), I = c(R), C = T(8), N = c(C), b = T(6), s = c(b), y = T(9), m = T(28), a = T(26), f = T(30);
    function c(p) {
      return p && p.__esModule ? p : { default: p };
    }
    var n = x.PluginDetector = {
      plugins: [],
      hasPluginVersion: function(P, F) {
        var D = n.plugins[P];
        return F[1] = F[1] || 0, F[2] = F[2] || 0, D[0] > F[0] || D[0] === F[0] && D[1] > F[1] || D[0] === F[0] && D[1] === F[1] && D[2] >= F[2];
      },
      addPlugin: function(P, F, D, v, S) {
        n.plugins[P] = n.detectPlugin(F, D, v, S);
      },
      detectPlugin: function(P, F, D, v) {
        var S = [0, 0, 0], e = void 0, d = void 0;
        if (a.NAV.plugins !== null && a.NAV.plugins !== void 0 && z(a.NAV.plugins[P]) === "object") {
          if (e = a.NAV.plugins[P].description, e && !(typeof a.NAV.mimeTypes < "u" && a.NAV.mimeTypes[F] && !a.NAV.mimeTypes[F].enabledPlugin)) {
            S = e.replace(P, "").replace(/^\s+/, "").replace(/\sr/gi, ".").split(".");
            for (var t = 0, h = S.length; t < h; t++)
              S[t] = parseInt(S[t].match(/\d+/), 10);
          }
        } else if (B.default.ActiveXObject !== void 0)
          try {
            d = new ActiveXObject(D), d && (S = v(d));
          } catch {
          }
        return S;
      }
    };
    n.addPlugin("flash", "Shockwave Flash", "application/x-shockwave-flash", "ShockwaveFlash.ShockwaveFlash", function(p) {
      var P = [], F = p.GetVariable("$version");
      return F && (F = F.split(" ")[1].split(","), P = [parseInt(F[0], 10), parseInt(F[1], 10), parseInt(F[2], 10)]), P;
    });
    var u = {
      create: function(P, F, D) {
        var v = {}, S = !1;
        v.options = F, v.id = P.id + "_" + v.options.prefix, v.mediaElement = P, v.flashState = {}, v.flashApi = null, v.flashApiStack = [];
        for (var e = N.default.html5media.properties, d = function($) {
          v.flashState[$] = null;
          var ee = "" + $.substring(0, 1).toUpperCase() + $.substring(1);
          v["get" + ee] = function() {
            if (v.flashApi !== null)
              if (typeof v.flashApi["get_" + $] == "function") {
                var te = v.flashApi["get_" + $]();
                return $ === "buffered" ? {
                  start: function() {
                    return 0;
                  },
                  end: function() {
                    return te;
                  },
                  length: 1
                } : te;
              } else
                return null;
            else
              return null;
          }, v["set" + ee] = function(te) {
            if ($ === "src" && (te = (0, f.absolutizeUrl)(te)), v.flashApi !== null && v.flashApi["set_" + $] !== void 0)
              try {
                v.flashApi["set_" + $](te);
              } catch {
              }
            else
              v.flashApiStack.push({
                type: "set",
                propName: $,
                value: te
              });
          };
        }, t = 0, h = e.length; t < h; t++)
          d(e[t]);
        var E = N.default.html5media.methods, A = function($) {
          v[$] = function() {
            if (S)
              if (v.flashApi !== null) {
                if (v.flashApi["fire_" + $])
                  try {
                    v.flashApi["fire_" + $]();
                  } catch {
                  }
              } else
                v.flashApiStack.push({
                  type: "call",
                  methodName: $
                });
          };
        };
        E.push("stop");
        for (var M = 0, k = E.length; M < k; M++)
          A(E[M]);
        for (var _ = ["rendererready"], L = 0, V = _.length; L < V; L++) {
          var U = (0, m.createEvent)(_[L], v);
          P.dispatchEvent(U);
        }
        B.default["__ready__" + v.id] = function() {
          if (v.flashReady = !0, v.flashApi = I.default.getElementById("__" + v.id), v.flashApiStack.length)
            for (var Y = 0, $ = v.flashApiStack.length; Y < $; Y++) {
              var ee = v.flashApiStack[Y];
              if (ee.type === "set") {
                var te = ee.propName, ne = "" + te.substring(0, 1).toUpperCase() + te.substring(1);
                v["set" + ne](ee.value);
              } else
                ee.type === "call" && v[ee.methodName]();
            }
        }, B.default["__event__" + v.id] = function(Y, $) {
          var ee = (0, m.createEvent)(Y, v);
          if ($)
            try {
              ee.data = JSON.parse($), ee.details.data = JSON.parse($);
            } catch {
              ee.message = $;
            }
          v.mediaElement.dispatchEvent(ee);
        }, v.flashWrapper = I.default.createElement("div"), ["always", "sameDomain"].indexOf(v.options.shimScriptAccess) === -1 && (v.options.shimScriptAccess = "sameDomain");
        var X = P.originalNode.autoplay, W = ["uid=" + v.id, "autoplay=" + X, "allowScriptAccess=" + v.options.shimScriptAccess, "preload=" + (P.originalNode.getAttribute("preload") || "")], q = P.originalNode !== null && P.originalNode.tagName.toLowerCase() === "video", K = q ? P.originalNode.height : 1, Z = q ? P.originalNode.width : 1;
        P.originalNode.getAttribute("src") && W.push("src=" + P.originalNode.getAttribute("src")), v.options.enablePseudoStreaming === !0 && (W.push("pseudostreamstart=" + v.options.pseudoStreamingStartQueryParam), W.push("pseudostreamtype=" + v.options.pseudoStreamingType)), v.options.streamDelimiter && W.push("streamdelimiter=" + encodeURIComponent(v.options.streamDelimiter)), v.options.proxyType && W.push("proxytype=" + v.options.proxyType), P.appendChild(v.flashWrapper), P.originalNode.style.display = "none";
        var G = [];
        if (a.IS_IE || a.IS_EDGE) {
          var H = I.default.createElement("div");
          v.flashWrapper.appendChild(H), a.IS_EDGE ? G = ['type="application/x-shockwave-flash"', 'data="' + v.options.pluginPath + v.options.filename + '"', 'id="__' + v.id + '"', 'width="' + Z + '"', 'height="' + K + `'"`] : G = ['classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"', 'codebase="//download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab"', 'id="__' + v.id + '"', 'width="' + Z + '"', 'height="' + K + '"'], q || G.push('style="clip: rect(0 0 0 0); position: absolute;"'), H.outerHTML = "<object " + G.join(" ") + ">" + ('<param name="movie" value="' + v.options.pluginPath + v.options.filename + "?x=" + new Date() + '" />') + ('<param name="flashvars" value="' + W.join("&amp;") + '" />') + '<param name="quality" value="high" /><param name="bgcolor" value="#000000" /><param name="wmode" value="transparent" />' + ('<param name="allowScriptAccess" value="' + v.options.shimScriptAccess + '" />') + '<param name="allowFullScreen" value="true" />' + ("<div>" + s.default.t("mejs.install-flash") + "</div>") + "</object>";
        } else
          G = ['id="__' + v.id + '"', 'name="__' + v.id + '"', 'play="true"', 'loop="false"', 'quality="high"', 'bgcolor="#000000"', 'wmode="transparent"', 'allowScriptAccess="' + v.options.shimScriptAccess + '"', 'allowFullScreen="true"', 'type="application/x-shockwave-flash"', 'pluginspage="//www.macromedia.com/go/getflashplayer"', 'src="' + v.options.pluginPath + v.options.filename + '"', 'flashvars="' + W.join("&") + '"'], q ? (G.push('width="' + Z + '"'), G.push('height="' + K + '"')) : G.push('style="position: fixed; left: -9999em; top: -9999em;"'), v.flashWrapper.innerHTML = "<embed " + G.join(" ") + ">";
        if (v.flashNode = v.flashWrapper.lastChild, v.hide = function() {
          S = !1, q && (v.flashNode.style.display = "none");
        }, v.show = function() {
          S = !0, q && (v.flashNode.style.display = "");
        }, v.setSize = function(Y, $) {
          v.flashNode.style.width = Y + "px", v.flashNode.style.height = $ + "px", v.flashApi !== null && typeof v.flashApi.fire_setSize == "function" && v.flashApi.fire_setSize(Y, $);
        }, v.destroy = function() {
          v.flashNode.remove();
        }, D && D.length > 0) {
          for (var j = 0, Q = D.length; j < Q; j++)
            if (y.renderer.renderers[F.prefix].canPlayType(D[j].type)) {
              v.setSrc(D[j].src);
              break;
            }
        }
        return v;
      }
    }, o = n.hasPluginVersion("flash", [10, 0, 0]);
    if (o) {
      f.typeChecks.push(function(p) {
        return p = p.toLowerCase(), p.startsWith("rtmp") ? ~p.indexOf(".mp3") ? "audio/rtmp" : "video/rtmp" : /\.og(a|g)/i.test(p) ? "audio/ogg" : ~p.indexOf(".m3u8") ? "application/x-mpegURL" : ~p.indexOf(".mpd") ? "application/dash+xml" : ~p.indexOf(".flv") ? "video/flv" : null;
      });
      var i = {
        name: "flash_video",
        options: {
          prefix: "flash_video",
          filename: "mediaelement-flash-video.swf",
          enablePseudoStreaming: !1,
          pseudoStreamingStartQueryParam: "start",
          pseudoStreamingType: "byte",
          proxyType: "",
          streamDelimiter: ""
        },
        canPlayType: function(P) {
          return ~["video/mp4", "video/rtmp", "audio/rtmp", "rtmp/mp4", "audio/mp4", "video/flv", "video/x-flv"].indexOf(P.toLowerCase());
        },
        create: u.create
      };
      y.renderer.add(i);
      var r = {
        name: "flash_hls",
        options: {
          prefix: "flash_hls",
          filename: "mediaelement-flash-video-hls.swf"
        },
        canPlayType: function(P) {
          return ~["application/x-mpegurl", "application/vnd.apple.mpegurl", "audio/mpegurl", "audio/hls", "video/hls"].indexOf(P.toLowerCase());
        },
        create: u.create
      };
      y.renderer.add(r);
      var l = {
        name: "flash_dash",
        options: {
          prefix: "flash_dash",
          filename: "mediaelement-flash-video-mdash.swf"
        },
        canPlayType: function(P) {
          return ~["application/dash+xml"].indexOf(P.toLowerCase());
        },
        create: u.create
      };
      y.renderer.add(l);
      var w = {
        name: "flash_audio",
        options: {
          prefix: "flash_audio",
          filename: "mediaelement-flash-audio.swf"
        },
        canPlayType: function(P) {
          return ~["audio/mp3"].indexOf(P.toLowerCase());
        },
        create: u.create
      };
      y.renderer.add(w);
      var g = {
        name: "flash_audio_ogg",
        options: {
          prefix: "flash_audio_ogg",
          filename: "mediaelement-flash-audio-ogg.swf"
        },
        canPlayType: function(P) {
          return ~["audio/ogg", "audio/oga", "audio/ogv"].indexOf(P.toLowerCase());
        },
        create: u.create
      };
      y.renderer.add(g);
    }
  }, { 2: 2, 26: 26, 28: 28, 3: 3, 30: 30, 6: 6, 8: 8, 9: 9 }], 22: [function(T, J, x) {
    var z = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(c) {
      return typeof c;
    } : function(c) {
      return c && typeof Symbol == "function" && c.constructor === Symbol && c !== Symbol.prototype ? "symbol" : typeof c;
    }, O = T(3), B = m(O), R = T(8), I = m(R), C = T(9), N = T(28), b = T(26), s = T(30), y = T(27);
    function m(c) {
      return c && c.__esModule ? c : { default: c };
    }
    var a = {
      promise: null,
      load: function(n) {
        return typeof flvjs < "u" ? a.promise = new Promise(function(u) {
          u();
        }).then(function() {
          a._createPlayer(n);
        }) : (n.options.path = typeof n.options.path == "string" ? n.options.path : "https://cdn.jsdelivr.net/npm/flv.js@latest", a.promise = a.promise || (0, y.loadScript)(n.options.path), a.promise.then(function() {
          a._createPlayer(n);
        })), a.promise;
      },
      _createPlayer: function(n) {
        flvjs.LoggingControl.enableDebug = n.options.debug, flvjs.LoggingControl.enableVerbose = n.options.debug;
        var u = flvjs.createPlayer(n.options, n.configs);
        return B.default["__ready__" + n.id](u), u;
      }
    }, f = {
      name: "native_flv",
      options: {
        prefix: "native_flv",
        flv: {
          path: "https://cdn.jsdelivr.net/npm/flv.js@latest",
          cors: !0,
          debug: !1
        }
      },
      canPlayType: function(n) {
        return b.HAS_MSE && ["video/x-flv", "video/flv"].indexOf(n.toLowerCase()) > -1;
      },
      create: function(n, u, o) {
        var i = n.originalNode, r = n.id + "_" + u.prefix, l = null, w = null;
        l = i.cloneNode(!0), u = Object.assign(u, n.options);
        for (var g = I.default.html5media.properties, p = I.default.html5media.events.concat(["click", "mouseover", "mouseout"]).filter(function(E) {
          return E !== "error";
        }), P = function(A) {
          var M = (0, N.createEvent)(A.type, n);
          n.dispatchEvent(M);
        }, F = function(A) {
          var M = "" + A.substring(0, 1).toUpperCase() + A.substring(1);
          l["get" + M] = function() {
            return w !== null ? l[A] : null;
          }, l["set" + M] = function(k) {
            if (I.default.html5media.readOnlyProperties.indexOf(A) === -1)
              if (A === "src") {
                if (l[A] = (typeof k > "u" ? "undefined" : z(k)) === "object" && k.src ? k.src : k, w !== null) {
                  var _ = {};
                  _.type = "flv", _.url = k, _.cors = u.flv.cors, _.debug = u.flv.debug, _.path = u.flv.path;
                  var L = u.flv.configs;
                  w.destroy();
                  for (var V = 0, U = p.length; V < U; V++)
                    l.removeEventListener(p[V], P);
                  w = a._createPlayer({
                    options: _,
                    configs: L,
                    id: r
                  }), w.attachMediaElement(l), w.load();
                }
              } else
                l[A] = k;
          };
        }, D = 0, v = g.length; D < v; D++)
          F(g[D]);
        if (B.default["__ready__" + r] = function(E) {
          n.flvPlayer = w = E;
          for (var A = flvjs.Events, M = function(W) {
            W === "loadedmetadata" && (w.unload(), w.detachMediaElement(), w.attachMediaElement(l), w.load()), l.addEventListener(W, P);
          }, k = 0, _ = p.length; k < _; k++)
            M(p[k]);
          var L = function(W, q) {
            if (W === "error") {
              var K = q[0] + ": " + q[1] + " " + q[2].msg;
              n.generateError(K, l.src);
            } else {
              var Z = (0, N.createEvent)(W, n);
              Z.data = q, n.dispatchEvent(Z);
            }
          }, V = function(W) {
            A.hasOwnProperty(W) && w.on(A[W], function() {
              for (var q = arguments.length, K = Array(q), Z = 0; Z < q; Z++)
                K[Z] = arguments[Z];
              return L(A[W], K);
            });
          };
          for (var U in A)
            V(U);
        }, o && o.length > 0) {
          for (var S = 0, e = o.length; S < e; S++)
            if (C.renderer.renderers[u.prefix].canPlayType(o[S].type)) {
              l.setAttribute("src", o[S].src);
              break;
            }
        }
        l.setAttribute("id", r), i.parentNode.insertBefore(l, i), i.autoplay = !1, i.style.display = "none";
        var d = {};
        d.type = "flv", d.url = l.src, d.cors = u.flv.cors, d.debug = u.flv.debug, d.path = u.flv.path;
        var t = u.flv.configs;
        l.setSize = function(E, A) {
          return l.style.width = E + "px", l.style.height = A + "px", l;
        }, l.hide = function() {
          return w !== null && w.pause(), l.style.display = "none", l;
        }, l.show = function() {
          return l.style.display = "", l;
        }, l.destroy = function() {
          w !== null && w.destroy();
        };
        var h = (0, N.createEvent)("rendererready", l);
        return n.dispatchEvent(h), n.promises.push(a.load({
          options: d,
          configs: t,
          id: r
        })), l;
      }
    };
    s.typeChecks.push(function(c) {
      return ~c.toLowerCase().indexOf(".flv") ? "video/flv" : null;
    }), C.renderer.add(f);
  }, { 26: 26, 27: 27, 28: 28, 3: 3, 30: 30, 8: 8, 9: 9 }], 23: [function(T, J, x) {
    var z = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(c) {
      return typeof c;
    } : function(c) {
      return c && typeof Symbol == "function" && c.constructor === Symbol && c !== Symbol.prototype ? "symbol" : typeof c;
    }, O = T(3), B = m(O), R = T(8), I = m(R), C = T(9), N = T(28), b = T(26), s = T(30), y = T(27);
    function m(c) {
      return c && c.__esModule ? c : { default: c };
    }
    var a = {
      promise: null,
      load: function(n) {
        return typeof Hls < "u" ? a.promise = new Promise(function(u) {
          u();
        }).then(function() {
          a._createPlayer(n);
        }) : (n.options.path = typeof n.options.path == "string" ? n.options.path : "https://cdn.jsdelivr.net/npm/hls.js@latest", a.promise = a.promise || (0, y.loadScript)(n.options.path), a.promise.then(function() {
          a._createPlayer(n);
        })), a.promise;
      },
      _createPlayer: function(n) {
        var u = new Hls(n.options);
        return B.default["__ready__" + n.id](u), u;
      }
    }, f = {
      name: "native_hls",
      options: {
        prefix: "native_hls",
        hls: {
          path: "https://cdn.jsdelivr.net/npm/hls.js@latest",
          autoStartLoad: !1,
          debug: !1
        }
      },
      canPlayType: function(n) {
        return b.HAS_MSE && ["application/x-mpegurl", "application/vnd.apple.mpegurl", "audio/mpegurl", "audio/hls", "video/hls"].indexOf(n.toLowerCase()) > -1;
      },
      create: function(n, u, o) {
        var i = n.originalNode, r = n.id + "_" + u.prefix, l = i.getAttribute("preload"), w = i.autoplay, g = null, p = null, P = 0, F = o.length;
        p = i.cloneNode(!0), u = Object.assign(u, n.options), u.hls.autoStartLoad = l && l !== "none" || w;
        for (var D = I.default.html5media.properties, v = I.default.html5media.events.concat(["click", "mouseover", "mouseout"]).filter(function(E) {
          return E !== "error";
        }), S = function(A) {
          var M = (0, N.createEvent)(A.type, n);
          n.dispatchEvent(M);
        }, e = function(A) {
          var M = "" + A.substring(0, 1).toUpperCase() + A.substring(1);
          p["get" + M] = function() {
            return g !== null ? p[A] : null;
          }, p["set" + M] = function(k) {
            if (I.default.html5media.readOnlyProperties.indexOf(A) === -1)
              if (A === "src") {
                if (p[A] = (typeof k > "u" ? "undefined" : z(k)) === "object" && k.src ? k.src : k, g !== null) {
                  g.destroy();
                  for (var _ = 0, L = v.length; _ < L; _++)
                    p.removeEventListener(v[_], S);
                  g = a._createPlayer({
                    options: u.hls,
                    id: r
                  }), g.loadSource(k), g.attachMedia(p);
                }
              } else
                p[A] = k;
          };
        }, d = 0, t = D.length; d < t; d++)
          e(D[d]);
        if (B.default["__ready__" + r] = function(E) {
          n.hlsPlayer = g = E;
          for (var A = Hls.Events, M = function(K) {
            if (K === "loadedmetadata") {
              var Z = n.originalNode.src;
              g.detachMedia(), g.loadSource(Z), g.attachMedia(p);
            }
            p.addEventListener(K, S);
          }, k = 0, _ = v.length; k < _; k++)
            M(v[k]);
          var L = void 0, V = void 0, U = function(K, Z) {
            if (K === "hlsError" && (console.warn(Z), Z = Z[1], Z.fatal)) {
              switch (Z.type) {
                case "mediaError":
                  var G = new Date().getTime();
                  if (!L || G - L > 3e3)
                    L = new Date().getTime(), g.recoverMediaError();
                  else if (!V || G - V > 3e3)
                    V = new Date().getTime(), console.warn("Attempting to swap Audio Codec and recover from media error"), g.swapAudioCodec(), g.recoverMediaError();
                  else {
                    var H = "Cannot recover, last media error recovery failed";
                    n.generateError(H, p.src), console.error(H);
                  }
                  break;
                case "networkError":
                  if (Z.details === "manifestLoadError")
                    if (P < F && o[P + 1] !== void 0)
                      p.setSrc(o[P++].src), p.load(), p.play();
                    else {
                      var j = "Network error";
                      n.generateError(j, o), console.error(j);
                    }
                  else {
                    var Q = "Network error";
                    n.generateError(Q, o), console.error(Q);
                  }
                  break;
                default:
                  g.destroy();
                  break;
              }
              return;
            }
            var Y = (0, N.createEvent)(K, n);
            Y.data = Z, n.dispatchEvent(Y);
          }, X = function(K) {
            A.hasOwnProperty(K) && g.on(A[K], function() {
              for (var Z = arguments.length, G = Array(Z), H = 0; H < Z; H++)
                G[H] = arguments[H];
              return U(A[K], G);
            });
          };
          for (var W in A)
            X(W);
        }, F > 0) {
          for (; P < F; P++)
            if (C.renderer.renderers[u.prefix].canPlayType(o[P].type)) {
              p.setAttribute("src", o[P].src);
              break;
            }
        }
        l !== "auto" && !w && (p.addEventListener("play", function() {
          g !== null && g.startLoad();
        }), p.addEventListener("pause", function() {
          g !== null && g.stopLoad();
        })), p.setAttribute("id", r), i.parentNode.insertBefore(p, i), i.autoplay = !1, i.style.display = "none", p.setSize = function(E, A) {
          return p.style.width = E + "px", p.style.height = A + "px", p;
        }, p.hide = function() {
          return p.pause(), p.style.display = "none", p;
        }, p.show = function() {
          return p.style.display = "", p;
        }, p.destroy = function() {
          g !== null && (g.stopLoad(), g.destroy());
        };
        var h = (0, N.createEvent)("rendererready", p);
        return n.dispatchEvent(h), n.promises.push(a.load({
          options: u.hls,
          id: r
        })), p;
      }
    };
    s.typeChecks.push(function(c) {
      return ~c.toLowerCase().indexOf(".m3u8") ? "application/x-mpegURL" : null;
    }), C.renderer.add(f);
  }, { 26: 26, 27: 27, 28: 28, 3: 3, 30: 30, 8: 8, 9: 9 }], 24: [function(T, J, x) {
    var z = T(3), O = y(z), B = T(2), R = y(B), I = T(8), C = y(I), N = T(9), b = T(28), s = T(26);
    function y(a) {
      return a && a.__esModule ? a : { default: a };
    }
    var m = {
      name: "html5",
      options: {
        prefix: "html5"
      },
      canPlayType: function(f) {
        var c = R.default.createElement("video");
        return s.IS_ANDROID && /\/mp(3|4)$/i.test(f) || ~["application/x-mpegurl", "vnd.apple.mpegurl", "audio/mpegurl", "audio/hls", "video/hls"].indexOf(f.toLowerCase()) && s.SUPPORTS_NATIVE_HLS ? "yes" : c.canPlayType ? c.canPlayType(f.toLowerCase()).replace(/no/, "") : "";
      },
      create: function(f, c, n) {
        var u = f.id + "_" + c.prefix, o = !1, i = null;
        f.originalNode === void 0 || f.originalNode === null ? (i = R.default.createElement("audio"), f.appendChild(i)) : i = f.originalNode, i.setAttribute("id", u);
        for (var r = C.default.html5media.properties, l = function(t) {
          var h = "" + t.substring(0, 1).toUpperCase() + t.substring(1);
          i["get" + h] = function() {
            return i[t];
          }, i["set" + h] = function(E) {
            C.default.html5media.readOnlyProperties.indexOf(t) === -1 && (i[t] = E);
          };
        }, w = 0, g = r.length; w < g; w++)
          l(r[w]);
        for (var p = C.default.html5media.events.concat(["click", "mouseover", "mouseout"]).filter(function(d) {
          return d !== "error";
        }), P = function(t) {
          i.addEventListener(t, function(h) {
            if (o) {
              var E = (0, b.createEvent)(h.type, h.target);
              f.dispatchEvent(E);
            }
          });
        }, F = 0, D = p.length; F < D; F++)
          P(p[F]);
        i.setSize = function(d, t) {
          return i.style.width = d + "px", i.style.height = t + "px", i;
        }, i.hide = function() {
          return o = !1, i.style.display = "none", i;
        }, i.show = function() {
          return o = !0, i.style.display = "", i;
        };
        var v = 0, S = n.length;
        if (S > 0) {
          for (; v < S; v++)
            if (N.renderer.renderers[c.prefix].canPlayType(n[v].type)) {
              i.setAttribute("src", n[v].src);
              break;
            }
        }
        i.addEventListener("error", function(d) {
          d && d.target && d.target.error && d.target.error.code === 4 && o && (v < S && n[v + 1] !== void 0 ? (i.src = n[v++].src, i.load(), i.play()) : f.generateError("Media error: Format(s) not supported or source(s) not found", n));
        });
        var e = (0, b.createEvent)("rendererready", i);
        return f.dispatchEvent(e), i;
      }
    };
    O.default.HtmlMediaElement = C.default.HtmlMediaElement = m, N.renderer.add(m);
  }, { 2: 2, 26: 26, 28: 28, 3: 3, 8: 8, 9: 9 }], 25: [function(T, J, x) {
    var z = T(3), O = m(z), B = T(2), R = m(B), I = T(8), C = m(I), N = T(9), b = T(28), s = T(30), y = T(27);
    function m(c) {
      return c && c.__esModule ? c : { default: c };
    }
    var a = {
      isIframeStarted: !1,
      isIframeLoaded: !1,
      iframeQueue: [],
      enqueueIframe: function(n) {
        a.isLoaded = typeof YT < "u" && YT.loaded, a.isLoaded ? a.createIframe(n) : (a.loadIframeApi(), a.iframeQueue.push(n));
      },
      loadIframeApi: function() {
        a.isIframeStarted || ((0, y.loadScript)("https://www.youtube.com/player_api"), a.isIframeStarted = !0);
      },
      iFrameReady: function() {
        for (a.isLoaded = !0, a.isIframeLoaded = !0; a.iframeQueue.length > 0; ) {
          var n = a.iframeQueue.pop();
          a.createIframe(n);
        }
      },
      createIframe: function(n) {
        return new YT.Player(n.containerId, n);
      },
      getYouTubeId: function(n) {
        var u = "";
        n.indexOf("?") > 0 ? (u = a.getYouTubeIdFromParam(n), u === "" && (u = a.getYouTubeIdFromUrl(n))) : u = a.getYouTubeIdFromUrl(n);
        var o = u.substring(u.lastIndexOf("/") + 1);
        return u = o.split("?"), u[0];
      },
      getYouTubeIdFromParam: function(n) {
        if (n == null || !n.trim().length)
          return null;
        for (var u = n.split("?"), o = u[1].split("&"), i = "", r = 0, l = o.length; r < l; r++) {
          var w = o[r].split("=");
          if (w[0] === "v") {
            i = w[1];
            break;
          }
        }
        return i;
      },
      getYouTubeIdFromUrl: function(n) {
        if (n == null || !n.trim().length)
          return null;
        var u = n.split("?");
        return n = u[0], n.substring(n.lastIndexOf("/") + 1);
      },
      getYouTubeNoCookieUrl: function(n) {
        if (n == null || !n.trim().length || n.indexOf("//www.youtube") === -1)
          return n;
        var u = n.split("/");
        return u[2] = u[2].replace(".com", "-nocookie.com"), u.join("/");
      }
    }, f = {
      name: "youtube_iframe",
      options: {
        prefix: "youtube_iframe",
        youtube: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          end: 0,
          loop: 0,
          modestbranding: 0,
          playsinline: 0,
          rel: 0,
          showinfo: 0,
          start: 0,
          iv_load_policy: 3,
          nocookie: !1,
          imageQuality: null
        }
      },
      canPlayType: function(n) {
        return ~["video/youtube", "video/x-youtube"].indexOf(n.toLowerCase());
      },
      create: function(n, u, o) {
        var i = {}, r = [], l = 4, w = null, g = !0, p = !1, P = null, F = 1;
        i.options = u, i.id = n.id + "_" + u.prefix, i.mediaElement = n;
        for (var D = C.default.html5media.properties, v = function(W) {
          var q = "" + W.substring(0, 1).toUpperCase() + W.substring(1);
          i["get" + q] = function() {
            if (w !== null) {
              var K = null;
              switch (W) {
                case "currentTime":
                  return w.getCurrentTime();
                case "duration":
                  return w.getDuration();
                case "volume":
                  return F = w.getVolume() / 100, F;
                case "playbackRate":
                  return w.getPlaybackRate();
                case "paused":
                  return g;
                case "ended":
                  return p;
                case "muted":
                  return w.isMuted();
                case "buffered":
                  var Z = w.getVideoLoadedFraction(), G = w.getDuration();
                  return {
                    start: function() {
                      return 0;
                    },
                    end: function() {
                      return Z * G;
                    },
                    length: 1
                  };
                case "src":
                  return w.getVideoUrl();
                case "readyState":
                  return l;
              }
              return K;
            } else
              return null;
          }, i["set" + q] = function(K) {
            if (w !== null)
              switch (W) {
                case "src":
                  var Z = typeof K == "string" ? K : K[0].src, G = a.getYouTubeId(Z);
                  n.originalNode.autoplay ? w.loadVideoById(G) : w.cueVideoById(G);
                  break;
                case "currentTime":
                  w.seekTo(K);
                  break;
                case "muted":
                  K ? w.mute() : w.unMute(), setTimeout(function() {
                    var j = (0, b.createEvent)("volumechange", i);
                    n.dispatchEvent(j);
                  }, 50);
                  break;
                case "volume":
                  F = K, w.setVolume(K * 100), setTimeout(function() {
                    var j = (0, b.createEvent)("volumechange", i);
                    n.dispatchEvent(j);
                  }, 50);
                  break;
                case "playbackRate":
                  w.setPlaybackRate(K), setTimeout(function() {
                    var j = (0, b.createEvent)("ratechange", i);
                    n.dispatchEvent(j);
                  }, 50);
                  break;
                case "readyState":
                  var H = (0, b.createEvent)("canplay", i);
                  n.dispatchEvent(H);
                  break;
              }
            else
              r.push({ type: "set", propName: W, value: K });
          };
        }, S = 0, e = D.length; S < e; S++)
          v(D[S]);
        for (var d = C.default.html5media.methods, t = function(W) {
          i[W] = function() {
            if (w !== null)
              switch (W) {
                case "play":
                  return g = !1, w.playVideo();
                case "pause":
                  return g = !0, w.pauseVideo();
                case "load":
                  return null;
              }
            else
              r.push({ type: "call", methodName: W });
          };
        }, h = 0, E = d.length; h < E; h++)
          t(d[h]);
        var A = function(W) {
          var q = "";
          switch (W.data) {
            case 2:
              q = "The request contains an invalid parameter value. Verify that video ID has 11 characters and that contains no invalid characters, such as exclamation points or asterisks.";
              break;
            case 5:
              q = "The requested content cannot be played in an HTML5 player or another error related to the HTML5 player has occurred.";
              break;
            case 100:
              q = "The video requested was not found. Either video has been removed or has been marked as private.";
              break;
            case 101:
            case 105:
              q = "The owner of the requested video does not allow it to be played in embedded players.";
              break;
            default:
              q = "Unknown error.";
              break;
          }
          n.generateError("Code " + W.data + ": " + q, o);
        }, M = R.default.createElement("div");
        M.id = i.id, i.options.youtube.nocookie && (n.originalNode.src = a.getYouTubeNoCookieUrl(o[0].src)), n.originalNode.parentNode.insertBefore(M, n.originalNode), n.originalNode.style.display = "none";
        var k = n.originalNode.tagName.toLowerCase() === "audio", _ = k ? "1" : n.originalNode.height, L = k ? "1" : n.originalNode.width, V = a.getYouTubeId(o[0].src), U = {
          id: i.id,
          containerId: M.id,
          videoId: V,
          height: _,
          width: L,
          host: i.options.youtube && i.options.youtube.nocookie ? "https://www.youtube-nocookie.com" : void 0,
          playerVars: Object.assign({
            controls: 0,
            rel: 0,
            disablekb: 1,
            showinfo: 0,
            modestbranding: 0,
            html5: 1,
            iv_load_policy: 3
          }, i.options.youtube),
          origin: O.default.location.host,
          events: {
            onReady: function(W) {
              if (n.youTubeApi = w = W.target, n.youTubeState = {
                paused: !0,
                ended: !1
              }, r.length)
                for (var q = 0, K = r.length; q < K; q++) {
                  var Z = r[q];
                  if (Z.type === "set") {
                    var G = Z.propName, H = "" + G.substring(0, 1).toUpperCase() + G.substring(1);
                    i["set" + H](Z.value);
                  } else
                    Z.type === "call" && i[Z.methodName]();
                }
              P = w.getIframe(), n.originalNode.muted && w.mute();
              for (var j = ["mouseover", "mouseout"], Q = function(ie) {
                var se = (0, b.createEvent)(ie.type, i);
                n.dispatchEvent(se);
              }, Y = 0, $ = j.length; Y < $; Y++)
                P.addEventListener(j[Y], Q, !1);
              for (var ee = ["rendererready", "loadedmetadata", "loadeddata", "canplay"], te = 0, ne = ee.length; te < ne; te++) {
                var re = (0, b.createEvent)(ee[te], i);
                n.dispatchEvent(re);
              }
            },
            onStateChange: function(W) {
              var q = [];
              switch (W.data) {
                case -1:
                  q = ["loadedmetadata"], g = !0, p = !1;
                  break;
                case 0:
                  q = ["ended"], g = !1, p = !i.options.youtube.loop, i.options.youtube.loop || i.stopInterval();
                  break;
                case 1:
                  q = ["play", "playing"], g = !1, p = !1, i.startInterval();
                  break;
                case 2:
                  q = ["pause"], g = !0, p = !1, i.stopInterval();
                  break;
                case 3:
                  q = ["progress"], p = !1;
                  break;
                case 5:
                  q = ["loadeddata", "loadedmetadata", "canplay"], g = !0, p = !1;
                  break;
              }
              for (var K = 0, Z = q.length; K < Z; K++) {
                var G = (0, b.createEvent)(q[K], i);
                n.dispatchEvent(G);
              }
            },
            onError: function(W) {
              return A(W);
            }
          }
        };
        return (k || n.originalNode.hasAttribute("playsinline")) && (U.playerVars.playsinline = 1), n.originalNode.controls && (U.playerVars.controls = 1), n.originalNode.autoplay && (U.playerVars.autoplay = 1), n.originalNode.loop && (U.playerVars.loop = 1), (U.playerVars.loop && parseInt(U.playerVars.loop, 10) === 1 || n.originalNode.src.indexOf("loop=") > -1) && !U.playerVars.playlist && n.originalNode.src.indexOf("playlist=") === -1 && (U.playerVars.playlist = a.getYouTubeId(n.originalNode.src)), a.enqueueIframe(U), i.onEvent = function(X, W, q) {
          q != null && (n.youTubeState = q);
        }, i.setSize = function(X, W) {
          w !== null && w.setSize(X, W);
        }, i.hide = function() {
          i.stopInterval(), i.pause(), P && (P.style.display = "none");
        }, i.show = function() {
          P && (P.style.display = "");
        }, i.destroy = function() {
          w.destroy();
        }, i.interval = null, i.startInterval = function() {
          i.interval = setInterval(function() {
            var X = (0, b.createEvent)("timeupdate", i);
            n.dispatchEvent(X);
          }, 250);
        }, i.stopInterval = function() {
          i.interval && clearInterval(i.interval);
        }, i.getPosterUrl = function() {
          var X = u.youtube.imageQuality, W = ["default", "hqdefault", "mqdefault", "sddefault", "maxresdefault"], q = a.getYouTubeId(n.originalNode.src);
          return X && W.indexOf(X) > -1 && q ? "https://img.youtube.com/vi/" + q + "/" + X + ".jpg" : "";
        }, i;
      }
    };
    O.default.onYouTubePlayerAPIReady = function() {
      a.iFrameReady();
    }, s.typeChecks.push(function(c) {
      return /\/\/(www\.youtube|youtu\.?be)/i.test(c) ? "video/x-youtube" : null;
    }), N.renderer.add(f);
  }, { 2: 2, 27: 27, 28: 28, 3: 3, 30: 30, 8: 8, 9: 9 }], 26: [function(T, J, x) {
    Object.defineProperty(x, "__esModule", {
      value: !0
    }), x.cancelFullScreen = x.requestFullScreen = x.isFullScreen = x.FULLSCREEN_EVENT_NAME = x.HAS_NATIVE_FULLSCREEN_ENABLED = x.HAS_TRUE_NATIVE_FULLSCREEN = x.HAS_IOS_FULLSCREEN = x.HAS_MS_NATIVE_FULLSCREEN = x.HAS_MOZ_NATIVE_FULLSCREEN = x.HAS_WEBKIT_NATIVE_FULLSCREEN = x.HAS_NATIVE_FULLSCREEN = x.SUPPORTS_NATIVE_HLS = x.SUPPORT_PASSIVE_EVENT = x.SUPPORT_POINTER_EVENTS = x.HAS_MSE = x.IS_STOCK_ANDROID = x.IS_SAFARI = x.IS_FIREFOX = x.IS_CHROME = x.IS_EDGE = x.IS_IE = x.IS_ANDROID = x.IS_IOS = x.IS_IPOD = x.IS_IPHONE = x.IS_IPAD = x.UA = x.NAV = void 0;
    var z = T(3), O = N(z), B = T(2), R = N(B), I = T(8), C = N(I);
    function N(H) {
      return H && H.__esModule ? H : { default: H };
    }
    var b = x.NAV = O.default.navigator, s = x.UA = b.userAgent.toLowerCase(), y = x.IS_IPAD = /ipad/i.test(s) && !O.default.MSStream, m = x.IS_IPHONE = /iphone/i.test(s) && !O.default.MSStream, a = x.IS_IPOD = /ipod/i.test(s) && !O.default.MSStream;
    x.IS_IOS = /ipad|iphone|ipod/i.test(s) && !O.default.MSStream;
    for (var f = x.IS_ANDROID = /android/i.test(s), c = x.IS_IE = /(trident|microsoft)/i.test(b.appName), n = x.IS_EDGE = ("msLaunchUri" in b) && !("documentMode" in R.default), u = x.IS_CHROME = /chrome/i.test(s), o = x.IS_FIREFOX = /firefox/i.test(s), i = x.IS_SAFARI = /safari/i.test(s) && !u, r = x.IS_STOCK_ANDROID = /^mozilla\/\d+\.\d+\s\(linux;\su;/i.test(s), l = x.HAS_MSE = ("MediaSource" in O.default), w = x.SUPPORT_POINTER_EVENTS = function() {
      var H = R.default.createElement("x"), j = R.default.documentElement, Q = O.default.getComputedStyle;
      if (!("pointerEvents" in H.style))
        return !1;
      H.style.pointerEvents = "auto", H.style.pointerEvents = "x", j.appendChild(H);
      var Y = Q && (Q(H, "") || {}).pointerEvents === "auto";
      return H.remove(), !!Y;
    }(), g = x.SUPPORT_PASSIVE_EVENT = function() {
      var H = !1;
      try {
        var j = Object.defineProperty({}, "passive", {
          get: function() {
            H = !0;
          }
        });
        O.default.addEventListener("test", null, j);
      } catch {
      }
      return H;
    }(), p = ["source", "track", "audio", "video"], P = void 0, F = 0, D = p.length; F < D; F++)
      P = R.default.createElement(p[F]);
    var v = x.SUPPORTS_NATIVE_HLS = i || c && /edge/i.test(s), S = P.webkitEnterFullscreen !== void 0, e = P.requestFullscreen !== void 0;
    S && /mac os x 10_5/i.test(s) && (e = !1, S = !1);
    var d = P.webkitRequestFullScreen !== void 0, t = P.mozRequestFullScreen !== void 0, h = P.msRequestFullscreen !== void 0, E = d || t || h, A = E, M = "", k = void 0, _ = void 0, L = void 0;
    t ? A = R.default.mozFullScreenEnabled : h && (A = R.default.msFullscreenEnabled), u && (S = !1), E && (d ? M = "webkitfullscreenchange" : t ? M = "fullscreenchange" : h && (M = "MSFullscreenChange"), x.isFullScreen = k = function() {
      if (t)
        return R.default.mozFullScreen;
      if (d)
        return R.default.webkitIsFullScreen;
      if (h)
        return R.default.msFullscreenElement !== null;
    }, x.requestFullScreen = _ = function(j) {
      d ? j.webkitRequestFullScreen() : t ? j.mozRequestFullScreen() : h && j.msRequestFullscreen();
    }, x.cancelFullScreen = L = function() {
      d ? R.default.webkitCancelFullScreen() : t ? R.default.mozCancelFullScreen() : h && R.default.msExitFullscreen();
    });
    var V = x.HAS_NATIVE_FULLSCREEN = e, U = x.HAS_WEBKIT_NATIVE_FULLSCREEN = d, X = x.HAS_MOZ_NATIVE_FULLSCREEN = t, W = x.HAS_MS_NATIVE_FULLSCREEN = h, q = x.HAS_IOS_FULLSCREEN = S, K = x.HAS_TRUE_NATIVE_FULLSCREEN = E, Z = x.HAS_NATIVE_FULLSCREEN_ENABLED = A, G = x.FULLSCREEN_EVENT_NAME = M;
    x.isFullScreen = k, x.requestFullScreen = _, x.cancelFullScreen = L, C.default.Features = C.default.Features || {}, C.default.Features.isiPad = y, C.default.Features.isiPod = a, C.default.Features.isiPhone = m, C.default.Features.isiOS = C.default.Features.isiPhone || C.default.Features.isiPad, C.default.Features.isAndroid = f, C.default.Features.isIE = c, C.default.Features.isEdge = n, C.default.Features.isChrome = u, C.default.Features.isFirefox = o, C.default.Features.isSafari = i, C.default.Features.isStockAndroid = r, C.default.Features.hasMSE = l, C.default.Features.supportsNativeHLS = v, C.default.Features.supportsPointerEvents = w, C.default.Features.supportsPassiveEvent = g, C.default.Features.hasiOSFullScreen = q, C.default.Features.hasNativeFullscreen = V, C.default.Features.hasWebkitNativeFullScreen = U, C.default.Features.hasMozNativeFullScreen = X, C.default.Features.hasMsNativeFullScreen = W, C.default.Features.hasTrueNativeFullScreen = K, C.default.Features.nativeFullScreenEnabled = Z, C.default.Features.fullScreenEventName = G, C.default.Features.isFullScreen = k, C.default.Features.requestFullScreen = _, C.default.Features.cancelFullScreen = L;
  }, { 2: 2, 3: 3, 8: 8 }], 27: [function(T, J, x) {
    Object.defineProperty(x, "__esModule", {
      value: !0
    }), x.removeClass = x.addClass = x.hasClass = void 0, x.loadScript = b, x.offset = s, x.toggleClass = u, x.fadeOut = o, x.fadeIn = i, x.siblings = r, x.visible = l, x.ajax = w;
    var z = T(3), O = N(z), B = T(2), R = N(B), I = T(8), C = N(I);
    function N(g) {
      return g && g.__esModule ? g : { default: g };
    }
    function b(g) {
      return new Promise(function(p, P) {
        var F = R.default.createElement("script");
        F.src = g, F.async = !0, F.onload = function() {
          F.remove(), p();
        }, F.onerror = function() {
          F.remove(), P();
        }, R.default.head.appendChild(F);
      });
    }
    function s(g) {
      var p = g.getBoundingClientRect(), P = O.default.pageXOffset || R.default.documentElement.scrollLeft, F = O.default.pageYOffset || R.default.documentElement.scrollTop;
      return { top: p.top + F, left: p.left + P };
    }
    var y = void 0, m = void 0, a = void 0;
    "classList" in R.default.documentElement ? (y = function(p, P) {
      return p.classList !== void 0 && p.classList.contains(P);
    }, m = function(p, P) {
      return p.classList.add(P);
    }, a = function(p, P) {
      return p.classList.remove(P);
    }) : (y = function(p, P) {
      return new RegExp("\\b" + P + "\\b").test(p.className);
    }, m = function(p, P) {
      f(p, P) || (p.className += " " + P);
    }, a = function(p, P) {
      p.className = p.className.replace(new RegExp("\\b" + P + "\\b", "g"), "");
    });
    var f = x.hasClass = y, c = x.addClass = m, n = x.removeClass = a;
    function u(g, p) {
      f(g, p) ? n(g, p) : c(g, p);
    }
    function o(g) {
      var p = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 400, P = arguments[2];
      g.style.opacity || (g.style.opacity = 1);
      var F = null;
      O.default.requestAnimationFrame(function D(v) {
        F = F || v;
        var S = v - F, e = parseFloat(1 - S / p, 2);
        g.style.opacity = e < 0 ? 0 : e, S > p ? P && typeof P == "function" && P() : O.default.requestAnimationFrame(D);
      });
    }
    function i(g) {
      var p = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 400, P = arguments[2];
      g.style.opacity || (g.style.opacity = 0);
      var F = null;
      O.default.requestAnimationFrame(function D(v) {
        F = F || v;
        var S = v - F, e = parseFloat(S / p, 2);
        g.style.opacity = e > 1 ? 1 : e, S > p ? P && typeof P == "function" && P() : O.default.requestAnimationFrame(D);
      });
    }
    function r(g, p) {
      var P = [];
      g = g.parentNode.firstChild;
      do
        (!p || p(g)) && P.push(g);
      while (g = g.nextSibling);
      return P;
    }
    function l(g) {
      return g.getClientRects !== void 0 && g.getClientRects === "function" ? !!(g.offsetWidth || g.offsetHeight || g.getClientRects().length) : !!(g.offsetWidth || g.offsetHeight);
    }
    function w(g, p, P, F) {
      var D = O.default.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP"), v = "application/x-www-form-urlencoded; charset=UTF-8", S = !1, e = "*/".concat("*");
      switch (p) {
        case "text":
          v = "text/plain";
          break;
        case "json":
          v = "application/json, text/javascript";
          break;
        case "html":
          v = "text/html";
          break;
        case "xml":
          v = "application/xml, text/xml";
          break;
      }
      v !== "application/x-www-form-urlencoded" && (e = v + ", */*; q=0.01"), D && (D.open("GET", g, !0), D.setRequestHeader("Accept", e), D.onreadystatechange = function() {
        if (!S && D.readyState === 4)
          if (D.status === 200) {
            S = !0;
            var d = void 0;
            switch (p) {
              case "json":
                d = JSON.parse(D.responseText);
                break;
              case "xml":
                d = D.responseXML;
                break;
              default:
                d = D.responseText;
                break;
            }
            P(d);
          } else
            typeof F == "function" && F(D.status);
      }, D.send());
    }
    C.default.Utils = C.default.Utils || {}, C.default.Utils.offset = s, C.default.Utils.hasClass = f, C.default.Utils.addClass = c, C.default.Utils.removeClass = n, C.default.Utils.toggleClass = u, C.default.Utils.fadeIn = i, C.default.Utils.fadeOut = o, C.default.Utils.siblings = r, C.default.Utils.visible = l, C.default.Utils.ajax = w, C.default.Utils.loadScript = b;
  }, { 2: 2, 3: 3, 8: 8 }], 28: [function(T, J, x) {
    Object.defineProperty(x, "__esModule", {
      value: !0
    }), x.escapeHTML = R, x.debounce = I, x.isObjectEmpty = C, x.splitEvents = N, x.createEvent = b, x.isNodeAfter = s, x.isString = y;
    var z = T(8), O = B(z);
    function B(m) {
      return m && m.__esModule ? m : { default: m };
    }
    function R(m) {
      if (typeof m != "string")
        throw new Error("Argument passed must be a string");
      var a = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;"
      };
      return m.replace(/[&<>"]/g, function(f) {
        return a[f];
      });
    }
    function I(m, a) {
      var f = this, c = arguments, n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
      if (typeof m != "function")
        throw new Error("First argument must be a function");
      if (typeof a != "number")
        throw new Error("Second argument must be a numeric value");
      var u = void 0;
      return function() {
        var o = f, i = c, r = function() {
          u = null, n || m.apply(o, i);
        }, l = n && !u;
        clearTimeout(u), u = setTimeout(r, a), l && m.apply(o, i);
      };
    }
    function C(m) {
      return Object.getOwnPropertyNames(m).length <= 0;
    }
    function N(m, a) {
      var f = /^((after|before)print|(before)?unload|hashchange|message|o(ff|n)line|page(hide|show)|popstate|resize|storage)\b/, c = { d: [], w: [] };
      return (m || "").split(" ").forEach(function(n) {
        var u = "" + n + (a ? "." + a : "");
        u.startsWith(".") ? (c.d.push(u), c.w.push(u)) : c[f.test(n) ? "w" : "d"].push(u);
      }), c.d = c.d.join(" "), c.w = c.w.join(" "), c;
    }
    function b(m, a) {
      if (typeof m != "string")
        throw new Error("Event name must be a string");
      var f = m.match(/([a-z]+\.([a-z]+))/i), c = {
        target: a
      };
      return f !== null && (m = f[1], c.namespace = f[2]), new window.CustomEvent(m, {
        detail: c
      });
    }
    function s(m, a) {
      return !!(m && a && m.compareDocumentPosition(a) & 2);
    }
    function y(m) {
      return typeof m == "string";
    }
    O.default.Utils = O.default.Utils || {}, O.default.Utils.escapeHTML = R, O.default.Utils.debounce = I, O.default.Utils.isObjectEmpty = C, O.default.Utils.splitEvents = N, O.default.Utils.createEvent = b, O.default.Utils.isNodeAfter = s, O.default.Utils.isString = y;
  }, { 8: 8 }], 29: [function(T, J, x) {
    Object.defineProperty(x, "__esModule", {
      value: !0
    }), x.generateControlButton = R;
    var z = T(8), O = B(z);
    function B(I) {
      return I && I.__esModule ? I : { default: I };
    }
    function R(I, C, N, b, s, y) {
      var m = arguments.length > 6 && arguments[6] !== void 0 ? arguments[6] : null, a = arguments.length > 7 && arguments[7] !== void 0 ? arguments[7] : "", f = arguments.length > 8 && arguments[8] !== void 0 ? arguments[8] : null;
      if (typeof I != "string")
        throw new Error("`ariaControls` argument must be a string");
      if (typeof C != "string")
        throw new Error("`ariaLabel` argument must be a string");
      if (typeof N != "string")
        throw new Error("`title` argument must be a string");
      if (typeof b != "string")
        throw new Error("`iconSprite` argument must be a string");
      if (typeof a != "string")
        throw new Error("`ariaDescribedby` argument must be a string");
      if (!Array.isArray(s))
        throw new Error("`icons` argument must be an array");
      if (typeof y != "string")
        throw new Error("`classPrefix` argument must be a string");
      var c = m ? 'class="' + m + '" ' : "", n = a !== "" ? 'aria-describedby="' + a + '" ' : "", u = f !== null ? 'aria-pressed="' + f + '"' : "", o = s.map(function(i) {
        return '<svg xmlns="http://www.w3.org/2000/svg" id="' + I + "-" + i + '" class="' + y + i + `" aria-hidden="true" focusable="false">
				<use xlink:href="` + b + "#" + i + `"></use>
			</svg>
`;
      });
      return "<button " + c + ' type="button" aria-controls="' + I + '" title="' + N + '" aria-label="' + C + '" ' + n + " " + u + `>
			` + o.join("") + `
		</button>`;
    }
    O.default.Utils = O.default.Utils || {}, O.default.Utils.generateControlButton = R;
  }, { 8: 8 }], 30: [function(T, J, x) {
    Object.defineProperty(x, "__esModule", {
      value: !0
    }), x.typeChecks = void 0, x.absolutizeUrl = C, x.formatType = N, x.getMimeFromType = b, x.getTypeFromFile = s, x.getExtension = y, x.normalizeExtension = m;
    var z = T(8), O = R(z), B = T(28);
    function R(a) {
      return a && a.__esModule ? a : { default: a };
    }
    var I = x.typeChecks = [];
    function C(a) {
      if (typeof a != "string")
        throw new Error("`url` argument must be a string");
      var f = document.createElement("div");
      return f.innerHTML = '<a href="' + (0, B.escapeHTML)(a) + '">x</a>', f.firstChild.href;
    }
    function N(a) {
      var f = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
      return a && !f ? s(a) : f;
    }
    function b(a) {
      if (typeof a != "string")
        throw new Error("`type` argument must be a string");
      return a && a.indexOf(";") > -1 ? a.substr(0, a.indexOf(";")) : a;
    }
    function s(a) {
      if (typeof a != "string")
        throw new Error("`url` argument must be a string");
      for (var f = 0, c = I.length; f < c; f++) {
        var n = I[f](a);
        if (n)
          return n;
      }
      var u = y(a), o = m(u), i = "video/mp4";
      return o && (~["mp4", "m4v", "ogg", "ogv", "webm", "flv", "mpeg"].indexOf(o) ? i = "video/" + o : o === "mov" ? i = "video/quicktime" : ~["mp3", "oga", "wav", "mid", "midi"].indexOf(o) && (i = "audio/" + o)), i;
    }
    function y(a) {
      if (typeof a != "string")
        throw new Error("`url` argument must be a string");
      var f = a.split("?")[0], c = f.split("\\").pop().split("/").pop();
      return ~c.indexOf(".") ? c.substring(c.lastIndexOf(".") + 1) : "";
    }
    function m(a) {
      if (typeof a != "string")
        throw new Error("`extension` argument must be a string");
      switch (a) {
        case "mp4":
        case "m4v":
          return "mp4";
        case "webm":
        case "webma":
        case "webmv":
          return "webm";
        case "ogg":
        case "oga":
        case "ogv":
          return "ogg";
        default:
          return a;
      }
    }
    O.default.Utils = O.default.Utils || {}, O.default.Utils.typeChecks = I, O.default.Utils.absolutizeUrl = C, O.default.Utils.formatType = N, O.default.Utils.getMimeFromType = b, O.default.Utils.getTypeFromFile = s, O.default.Utils.getExtension = y, O.default.Utils.normalizeExtension = m;
  }, { 28: 28, 8: 8 }], 31: [function(T, J, x) {
    var z = T(2), O = N(z), B = T(4), R = N(B), I = T(5), C = N(I);
    function N(s) {
      return s && s.__esModule ? s : { default: s };
    }
    if (function(s) {
      s.forEach(function(y) {
        y.hasOwnProperty("remove") || Object.defineProperty(y, "remove", {
          configurable: !0,
          enumerable: !0,
          writable: !0,
          value: function() {
            this.parentNode.removeChild(this);
          }
        });
      });
    }([Element.prototype, CharacterData.prototype, DocumentType.prototype]), function() {
      if (typeof window.CustomEvent == "function")
        return !1;
      function s(y, m) {
        m = m || { bubbles: !1, cancelable: !1, detail: void 0 };
        var a = O.default.createEvent("CustomEvent");
        return a.initCustomEvent(y, m.bubbles, m.cancelable, m.detail), a;
      }
      s.prototype = window.Event.prototype, window.CustomEvent = s;
    }(), typeof Object.assign != "function" && (Object.assign = function(s) {
      if (s == null)
        throw new TypeError("Cannot convert undefined or null to object");
      for (var y = Object(s), m = 1, a = arguments.length; m < a; m++) {
        var f = arguments[m];
        if (f !== null)
          for (var c in f)
            Object.prototype.hasOwnProperty.call(f, c) && (y[c] = f[c]);
      }
      return y;
    }), String.prototype.startsWith || (String.prototype.startsWith = function(s, y) {
      return y = y || 0, this.substr(y, s.length) === s;
    }), Element.prototype.matches || (Element.prototype.matches = Element.prototype.matchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.webkitMatchesSelector || function(s) {
      for (var y = (this.document || this.ownerDocument).querySelectorAll(s), m = y.length - 1; --m >= 0 && y.item(m) !== this; )
        ;
      return m > -1;
    }), window.Element && !Element.prototype.closest && (Element.prototype.closest = function(s) {
      var y = (this.document || this.ownerDocument).querySelectorAll(s), m = void 0, a = this;
      do
        for (m = y.length; --m >= 0 && y.item(m) !== a; )
          ;
      while (m < 0 && (a = a.parentElement));
      return a;
    }), function() {
      for (var s = 0, y = ["ms", "moz", "webkit", "o"], m = 0; m < y.length && !window.requestAnimationFrame; ++m)
        window.requestAnimationFrame = window[y[m] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[y[m] + "CancelAnimationFrame"] || window[y[m] + "CancelRequestAnimationFrame"];
      window.requestAnimationFrame || (window.requestAnimationFrame = function(a) {
        var f = new Date().getTime(), c = Math.max(0, 16 - (f - s)), n = window.setTimeout(function() {
          a(f + c);
        }, c);
        return s = f + c, n;
      }), window.cancelAnimationFrame || (window.cancelAnimationFrame = function(a) {
        clearTimeout(a);
      });
    }(), /firefox/i.test(navigator.userAgent)) {
      var b = window.getComputedStyle;
      window.getComputedStyle = function(s, y) {
        var m = b(s, y);
        return m === null ? { getPropertyValue: function() {
        } } : m;
      };
    }
    window.Promise || (window.Promise = R.default), (0, C.default)(), function(s) {
      s && s.prototype && s.prototype.children === null && Object.defineProperty(s.prototype, "children", {
        get: function() {
          for (var m = 0, a = void 0, f = this.childNodes, c = []; a = f[m++]; )
            a.nodeType === 1 && c.push(a);
          return c;
        }
      });
    }(window.Node || window.Element);
  }, { 2: 2, 4: 4, 5: 5 }], 32: [function(T, J, x) {
    Object.defineProperty(x, "__esModule", {
      value: !0
    }), x.isDropFrame = R, x.secondsToTimeCode = I, x.timeCodeToSeconds = C, x.calculateTimeFormat = N, x.convertSMPTEtoSeconds = b;
    var z = T(8), O = B(z);
    function B(s) {
      return s && s.__esModule ? s : { default: s };
    }
    function R() {
      var s = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 25;
      return s % 1 !== 0;
    }
    function I(s) {
      var y = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, m = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1, a = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 25, f = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : 0, c = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : "hh:mm:ss";
      s = !s || typeof s != "number" || s < 0 ? 0 : s;
      var n = Math.round(a * 0.066666), u = Math.round(a), o = Math.round(a * 3600) * 24, i = Math.round(a * 600), r = R(a) ? ";" : ":", l = void 0, w = void 0, g = void 0, p = void 0, P = Math.round(s * a);
      if (R(a)) {
        P < 0 && (P = o + P), P = P % o;
        var F = Math.floor(P / i), D = P % i;
        P = P + n * 9 * F, D > n && (P = P + n * Math.floor((D - n) / Math.round(u * 60 - n)));
        var v = Math.floor(P / u);
        l = Math.floor(Math.floor(v / 60) / 60), w = Math.floor(v / 60) % 60, m ? g = v % 60 : g = Math.floor(P / u % 60).toFixed(f);
      } else
        l = Math.floor(s / 3600) % 24, w = Math.floor(s / 60) % 60, m ? g = Math.floor(s % 60) : g = Math.floor(s % 60).toFixed(f);
      l = l <= 0 ? 0 : l, w = w <= 0 ? 0 : w, g = g <= 0 ? 0 : g, g = g === 60 ? 0 : g, w = w === 60 ? 0 : w;
      for (var S = c.split(":"), e = {}, d = 0, t = S.length; d < t; ++d) {
        for (var h = "", E = 0, A = S[d].length; E < A; E++)
          h.indexOf(S[d][E]) < 0 && (h += S[d][E]);
        ~["f", "s", "m", "h"].indexOf(h) && (e[h] = S[d].length);
      }
      var M = y || l > 0 ? (l < 10 && e.h > 1 ? "0" + l : l) + ":" : "";
      return M += (w < 10 && e.m > 1 ? "0" + w : w) + ":", M += "" + (g < 10 && e.s > 1 ? "0" + g : g), m && (p = (P % u).toFixed(0), p = p <= 0 ? 0 : p, M += p < 10 && e.f ? r + "0" + p : "" + r + p), M;
    }
    function C(s) {
      var y = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 25;
      if (typeof s != "string")
        throw new TypeError("Time must be a string");
      if (s.indexOf(";") > 0 && (s = s.replace(";", ":")), !/\d{2}(\:\d{2}){0,3}/i.test(s))
        throw new TypeError("Time code must have the format `00:00:00`");
      var m = s.split(":"), a = void 0, f = 0, c = 0, n = 0, u = 0, o = 0, i = Math.round(y * 0.066666), r = Math.round(y), l = r * 3600, w = r * 60;
      switch (m.length) {
        default:
        case 1:
          n = parseInt(m[0], 10);
          break;
        case 2:
          c = parseInt(m[0], 10), n = parseInt(m[1], 10);
          break;
        case 3:
          f = parseInt(m[0], 10), c = parseInt(m[1], 10), n = parseInt(m[2], 10);
          break;
        case 4:
          f = parseInt(m[0], 10), c = parseInt(m[1], 10), n = parseInt(m[2], 10), u = parseInt(m[3], 10);
          break;
      }
      return R(y) ? (o = 60 * f + c, a = l * f + w * c + r * n + u - i * (o - Math.floor(o / 10))) : a = (l * f + w * c + y * n + u) / y, parseFloat(a.toFixed(3));
    }
    function N(s, y) {
      var m = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 25;
      s = !s || typeof s != "number" || s < 0 ? 0 : s;
      for (var a = Math.floor(s / 3600) % 24, f = Math.floor(s / 60) % 60, c = Math.floor(s % 60), n = Math.floor((s % 1 * m).toFixed(3)), u = [[n, "f"], [c, "s"], [f, "m"], [a, "h"]], o = y.timeFormat, i = o[1] === o[0], r = i ? 2 : 1, l = o.length < r ? o[r] : ":", w = o[0], g = !1, p = 0, P = u.length; p < P; p++)
        if (~o.indexOf(u[p][1]))
          g = !0;
        else if (g) {
          for (var F = !1, D = p; D < P; D++)
            if (u[D][0] > 0) {
              F = !0;
              break;
            }
          if (!F)
            break;
          i || (o = w + o), o = u[p][1] + l + o, i && (o = u[p][1] + o), w = u[p][1];
        }
      y.timeFormat = o;
    }
    function b(s) {
      if (typeof s != "string")
        throw new TypeError("Argument must be a string value");
      s = s.replace(",", ".");
      var y = ~s.indexOf(".") ? s.split(".")[1].length : 0, m = 0, a = 1;
      s = s.split(":").reverse();
      for (var f = 0, c = s.length; f < c; f++)
        a = 1, f > 0 && (a = Math.pow(60, f)), m += Number(s[f]) * a;
      return Number(m.toFixed(y));
    }
    O.default.Utils = O.default.Utils || {}, O.default.Utils.secondsToTimeCode = I, O.default.Utils.timeCodeToSeconds = C, O.default.Utils.calculateTimeFormat = N, O.default.Utils.convertSMPTEtoSeconds = b;
  }, { 8: 8 }] }, {}, [31, 7, 6, 16, 24, 21, 20, 22, 23, 25, 17, 19, 18, 10, 11, 12, 13, 14, 15]);
})();
(function(T) {
  T.exports = ye;
})(ve);
const Ee = ["width", "height", "src", "onKeyup"], Se = /* @__PURE__ */ fe({
  __name: "mediaelement",
  props: {
    source: {
      type: String,
      required: !0,
      default: ""
    },
    width: {
      type: String,
      required: !1,
      default: "auto"
    },
    height: {
      type: String,
      required: !1,
      default: "auto"
    },
    success: {
      type: Function,
      default() {
        return !1;
      }
    },
    error: {
      type: Function,
      default() {
        return !1;
      }
    }
  },
  setup(T) {
    const J = T, x = ue(null);
    let z = ue(null);
    ce(() => {
      z.value = new MediaElementPlayer(x.value, {
        shimScriptAccess: "always",
        success: function(B, R, I) {
        },
        error: function(B) {
          J.error(B);
        }
      });
    });
    const O = () => {
    };
    return me(
      () => J.source,
      (B) => {
        z.value.setSrc(B), z.value.setPoster(""), z.value.load();
      }
    ), (B, R) => (pe(), ge("video", {
      width: T.width,
      height: T.height,
      src: T.source,
      ref_key: "video",
      ref: x,
      onKeyup: he(O, ["space"])
    }, null, 40, Ee));
  }
});
const we = {
  install: (T, J) => {
    T.component("Mediaelement", Se);
  }
};
export {
  we as default
};
