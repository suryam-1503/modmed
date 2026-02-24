/*! For license information please see contentPortal.js.LICENSE.txt */
(() => {
  var t = {
      8075: (t, e, r) => {
        "use strict";
        var o = r(453),
          n = r(487),
          a = n(o("String.prototype.indexOf"));
        t.exports = function (t, e) {
          var r = o(t, !!e);
          return "function" == typeof r && a(t, ".prototype.") > -1 ? n(r) : r;
        };
      },
      487: (t, e, r) => {
        "use strict";
        var o = r(6743),
          n = r(453),
          a = r(6897),
          i = r(9675),
          l = n("%Function.prototype.apply%"),
          s = n("%Function.prototype.call%"),
          p = n("%Reflect.apply%", !0) || o.call(s, l),
          c = r(655),
          u = n("%Math.max%");
        t.exports = function (t) {
          if ("function" != typeof t) throw new i("a function is required");
          var e = p(o, s, arguments);
          return a(e, 1 + u(0, t.length - (arguments.length - 1)), !0);
        };
        var f = function () {
          return p(o, l, arguments);
        };
        c ? c(t.exports, "apply", { value: f }) : (t.exports.apply = f);
      },
      41: (t, e, r) => {
        "use strict";
        var o = r(655),
          n = r(8068),
          a = r(9675),
          i = r(5795);
        t.exports = function (t, e, r) {
          if (!t || ("object" != typeof t && "function" != typeof t))
            throw new a("`obj` must be an object or a function`");
          if ("string" != typeof e && "symbol" != typeof e)
            throw new a("`property` must be a string or a symbol`");
          if (
            arguments.length > 3 &&
            "boolean" != typeof arguments[3] &&
            null !== arguments[3]
          )
            throw new a(
              "`nonEnumerable`, if provided, must be a boolean or null"
            );
          if (
            arguments.length > 4 &&
            "boolean" != typeof arguments[4] &&
            null !== arguments[4]
          )
            throw new a(
              "`nonWritable`, if provided, must be a boolean or null"
            );
          if (
            arguments.length > 5 &&
            "boolean" != typeof arguments[5] &&
            null !== arguments[5]
          )
            throw new a(
              "`nonConfigurable`, if provided, must be a boolean or null"
            );
          if (arguments.length > 6 && "boolean" != typeof arguments[6])
            throw new a("`loose`, if provided, must be a boolean");
          var l = arguments.length > 3 ? arguments[3] : null,
            s = arguments.length > 4 ? arguments[4] : null,
            p = arguments.length > 5 ? arguments[5] : null,
            c = arguments.length > 6 && arguments[6],
            u = !!i && i(t, e);
          if (o)
            o(t, e, {
              configurable: null === p && u ? u.configurable : !p,
              enumerable: null === l && u ? u.enumerable : !l,
              value: r,
              writable: null === s && u ? u.writable : !s,
            });
          else {
            if (!c && (l || s || p))
              throw new n(
                "This environment does not support defining a property as non-configurable, non-writable, or non-enumerable."
              );
            t[e] = r;
          }
        };
      },
      655: (t, e, r) => {
        "use strict";
        var o = r(453)("%Object.defineProperty%", !0) || !1;
        if (o)
          try {
            o({}, "a", { value: 1 });
          } catch (t) {
            o = !1;
          }
        t.exports = o;
      },
      1237: (t) => {
        "use strict";
        t.exports = EvalError;
      },
      9383: (t) => {
        "use strict";
        t.exports = Error;
      },
      9290: (t) => {
        "use strict";
        t.exports = RangeError;
      },
      9538: (t) => {
        "use strict";
        t.exports = ReferenceError;
      },
      8068: (t) => {
        "use strict";
        t.exports = SyntaxError;
      },
      9675: (t) => {
        "use strict";
        t.exports = TypeError;
      },
      5345: (t) => {
        "use strict";
        t.exports = URIError;
      },
      9353: (t) => {
        "use strict";
        var e = Object.prototype.toString,
          r = Math.max,
          o = function (t, e) {
            for (var r = [], o = 0; o < t.length; o += 1) r[o] = t[o];
            for (var n = 0; n < e.length; n += 1) r[n + t.length] = e[n];
            return r;
          };
        t.exports = function (t) {
          var n = this;
          if ("function" != typeof n || "[object Function]" !== e.apply(n))
            throw new TypeError(
              "Function.prototype.bind called on incompatible " + n
            );
          for (
            var a,
              i = (function (t) {
                for (var e = [], r = 1, o = 0; r < t.length; r += 1, o += 1)
                  e[o] = t[r];
                return e;
              })(arguments),
              l = r(0, n.length - i.length),
              s = [],
              p = 0;
            p < l;
            p++
          )
            s[p] = "$" + p;
          if (
            ((a = Function(
              "binder",
              "return function (" +
                (function (t) {
                  for (var e = "", r = 0; r < t.length; r += 1)
                    (e += t[r]), r + 1 < t.length && (e += ",");
                  return e;
                })(s) +
                "){ return binder.apply(this,arguments); }"
            )(function () {
              if (this instanceof a) {
                var e = n.apply(this, o(i, arguments));
                return Object(e) === e ? e : this;
              }
              return n.apply(t, o(i, arguments));
            })),
            n.prototype)
          ) {
            var c = function () {};
            (c.prototype = n.prototype),
              (a.prototype = new c()),
              (c.prototype = null);
          }
          return a;
        };
      },
      6743: (t, e, r) => {
        "use strict";
        var o = r(9353);
        t.exports = Function.prototype.bind || o;
      },
      453: (t, e, r) => {
        "use strict";
        var o,
          n = r(9383),
          a = r(1237),
          i = r(9290),
          l = r(9538),
          s = r(8068),
          p = r(9675),
          c = r(5345),
          u = Function,
          f = function (t) {
            try {
              return u('"use strict"; return (' + t + ").constructor;")();
            } catch (t) {}
          },
          y = Object.getOwnPropertyDescriptor;
        if (y)
          try {
            y({}, "");
          } catch (t) {
            y = null;
          }
        var h = function () {
            throw new p();
          },
          d = y
            ? (function () {
                try {
                  return h;
                } catch (t) {
                  try {
                    return y(arguments, "callee").get;
                  } catch (t) {
                    return h;
                  }
                }
              })()
            : h,
          g = r(4039)(),
          m = r(24)(),
          b =
            Object.getPrototypeOf ||
            (m
              ? function (t) {
                  return t.__proto__;
                }
              : null),
          v = {},
          w = "undefined" != typeof Uint8Array && b ? b(Uint8Array) : o,
          S = {
            __proto__: null,
            "%AggregateError%":
              "undefined" == typeof AggregateError ? o : AggregateError,
            "%Array%": Array,
            "%ArrayBuffer%":
              "undefined" == typeof ArrayBuffer ? o : ArrayBuffer,
            "%ArrayIteratorPrototype%": g && b ? b([][Symbol.iterator]()) : o,
            "%AsyncFromSyncIteratorPrototype%": o,
            "%AsyncFunction%": v,
            "%AsyncGenerator%": v,
            "%AsyncGeneratorFunction%": v,
            "%AsyncIteratorPrototype%": v,
            "%Atomics%": "undefined" == typeof Atomics ? o : Atomics,
            "%BigInt%": "undefined" == typeof BigInt ? o : BigInt,
            "%BigInt64Array%":
              "undefined" == typeof BigInt64Array ? o : BigInt64Array,
            "%BigUint64Array%":
              "undefined" == typeof BigUint64Array ? o : BigUint64Array,
            "%Boolean%": Boolean,
            "%DataView%": "undefined" == typeof DataView ? o : DataView,
            "%Date%": Date,
            "%decodeURI%": decodeURI,
            "%decodeURIComponent%": decodeURIComponent,
            "%encodeURI%": encodeURI,
            "%encodeURIComponent%": encodeURIComponent,
            "%Error%": n,
            "%eval%": eval,
            "%EvalError%": a,
            "%Float32Array%":
              "undefined" == typeof Float32Array ? o : Float32Array,
            "%Float64Array%":
              "undefined" == typeof Float64Array ? o : Float64Array,
            "%FinalizationRegistry%":
              "undefined" == typeof FinalizationRegistry
                ? o
                : FinalizationRegistry,
            "%Function%": u,
            "%GeneratorFunction%": v,
            "%Int8Array%": "undefined" == typeof Int8Array ? o : Int8Array,
            "%Int16Array%": "undefined" == typeof Int16Array ? o : Int16Array,
            "%Int32Array%": "undefined" == typeof Int32Array ? o : Int32Array,
            "%isFinite%": isFinite,
            "%isNaN%": isNaN,
            "%IteratorPrototype%": g && b ? b(b([][Symbol.iterator]())) : o,
            "%JSON%": "object" == typeof JSON ? JSON : o,
            "%Map%": "undefined" == typeof Map ? o : Map,
            "%MapIteratorPrototype%":
              "undefined" != typeof Map && g && b
                ? b(new Map()[Symbol.iterator]())
                : o,
            "%Math%": Math,
            "%Number%": Number,
            "%Object%": Object,
            "%parseFloat%": parseFloat,
            "%parseInt%": parseInt,
            "%Promise%": "undefined" == typeof Promise ? o : Promise,
            "%Proxy%": "undefined" == typeof Proxy ? o : Proxy,
            "%RangeError%": i,
            "%ReferenceError%": l,
            "%Reflect%": "undefined" == typeof Reflect ? o : Reflect,
            "%RegExp%": RegExp,
            "%Set%": "undefined" == typeof Set ? o : Set,
            "%SetIteratorPrototype%":
              "undefined" != typeof Set && g && b
                ? b(new Set()[Symbol.iterator]())
                : o,
            "%SharedArrayBuffer%":
              "undefined" == typeof SharedArrayBuffer ? o : SharedArrayBuffer,
            "%String%": String,
            "%StringIteratorPrototype%": g && b ? b(""[Symbol.iterator]()) : o,
            "%Symbol%": g ? Symbol : o,
            "%SyntaxError%": s,
            "%ThrowTypeError%": d,
            "%TypedArray%": w,
            "%TypeError%": p,
            "%Uint8Array%": "undefined" == typeof Uint8Array ? o : Uint8Array,
            "%Uint8ClampedArray%":
              "undefined" == typeof Uint8ClampedArray ? o : Uint8ClampedArray,
            "%Uint16Array%":
              "undefined" == typeof Uint16Array ? o : Uint16Array,
            "%Uint32Array%":
              "undefined" == typeof Uint32Array ? o : Uint32Array,
            "%URIError%": c,
            "%WeakMap%": "undefined" == typeof WeakMap ? o : WeakMap,
            "%WeakRef%": "undefined" == typeof WeakRef ? o : WeakRef,
            "%WeakSet%": "undefined" == typeof WeakSet ? o : WeakSet,
          };
        if (b)
          try {
            null.error;
          } catch (t) {
            var A = b(b(t));
            S["%Error.prototype%"] = A;
          }
        var j = function t(e) {
            var r;
            if ("%AsyncFunction%" === e) r = f("async function () {}");
            else if ("%GeneratorFunction%" === e) r = f("function* () {}");
            else if ("%AsyncGeneratorFunction%" === e)
              r = f("async function* () {}");
            else if ("%AsyncGenerator%" === e) {
              var o = t("%AsyncGeneratorFunction%");
              o && (r = o.prototype);
            } else if ("%AsyncIteratorPrototype%" === e) {
              var n = t("%AsyncGenerator%");
              n && b && (r = b(n.prototype));
            }
            return (S[e] = r), r;
          },
          x = {
            __proto__: null,
            "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"],
            "%ArrayPrototype%": ["Array", "prototype"],
            "%ArrayProto_entries%": ["Array", "prototype", "entries"],
            "%ArrayProto_forEach%": ["Array", "prototype", "forEach"],
            "%ArrayProto_keys%": ["Array", "prototype", "keys"],
            "%ArrayProto_values%": ["Array", "prototype", "values"],
            "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"],
            "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"],
            "%AsyncGeneratorPrototype%": [
              "AsyncGeneratorFunction",
              "prototype",
              "prototype",
            ],
            "%BooleanPrototype%": ["Boolean", "prototype"],
            "%DataViewPrototype%": ["DataView", "prototype"],
            "%DatePrototype%": ["Date", "prototype"],
            "%ErrorPrototype%": ["Error", "prototype"],
            "%EvalErrorPrototype%": ["EvalError", "prototype"],
            "%Float32ArrayPrototype%": ["Float32Array", "prototype"],
            "%Float64ArrayPrototype%": ["Float64Array", "prototype"],
            "%FunctionPrototype%": ["Function", "prototype"],
            "%Generator%": ["GeneratorFunction", "prototype"],
            "%GeneratorPrototype%": [
              "GeneratorFunction",
              "prototype",
              "prototype",
            ],
            "%Int8ArrayPrototype%": ["Int8Array", "prototype"],
            "%Int16ArrayPrototype%": ["Int16Array", "prototype"],
            "%Int32ArrayPrototype%": ["Int32Array", "prototype"],
            "%JSONParse%": ["JSON", "parse"],
            "%JSONStringify%": ["JSON", "stringify"],
            "%MapPrototype%": ["Map", "prototype"],
            "%NumberPrototype%": ["Number", "prototype"],
            "%ObjectPrototype%": ["Object", "prototype"],
            "%ObjProto_toString%": ["Object", "prototype", "toString"],
            "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"],
            "%PromisePrototype%": ["Promise", "prototype"],
            "%PromiseProto_then%": ["Promise", "prototype", "then"],
            "%Promise_all%": ["Promise", "all"],
            "%Promise_reject%": ["Promise", "reject"],
            "%Promise_resolve%": ["Promise", "resolve"],
            "%RangeErrorPrototype%": ["RangeError", "prototype"],
            "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"],
            "%RegExpPrototype%": ["RegExp", "prototype"],
            "%SetPrototype%": ["Set", "prototype"],
            "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"],
            "%StringPrototype%": ["String", "prototype"],
            "%SymbolPrototype%": ["Symbol", "prototype"],
            "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"],
            "%TypedArrayPrototype%": ["TypedArray", "prototype"],
            "%TypeErrorPrototype%": ["TypeError", "prototype"],
            "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"],
            "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"],
            "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"],
            "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"],
            "%URIErrorPrototype%": ["URIError", "prototype"],
            "%WeakMapPrototype%": ["WeakMap", "prototype"],
            "%WeakSetPrototype%": ["WeakSet", "prototype"],
          },
          O = r(6743),
          P = r(9957),
          E = O.call(Function.call, Array.prototype.concat),
          I = O.call(Function.apply, Array.prototype.splice),
          U = O.call(Function.call, String.prototype.replace),
          k = O.call(Function.call, String.prototype.slice),
          R = O.call(Function.call, RegExp.prototype.exec),
          D =
            /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g,
          F = /\\(\\)?/g,
          _ = function (t, e) {
            var r,
              o = t;
            if ((P(x, o) && (o = "%" + (r = x[o])[0] + "%"), P(S, o))) {
              var n = S[o];
              if ((n === v && (n = j(o)), void 0 === n && !e))
                throw new p(
                  "intrinsic " +
                    t +
                    "exists, but is not available. Please file an issue!"
                );
              return { alias: r, name: o, value: n };
            }
            throw new s("intrinsic " + t + "does not exist!");
          };
        t.exports = function (t, e) {
          if ("string" != typeof t || 0 === t.length)
            throw new p("intrinsic name must be a non-empty string");
          if (arguments.length > 1 && "boolean" != typeof e)
            throw new p('"allowMissing"argument must be a boolean');
          if (null === R(/^%?[^%]*%?$/, t))
            throw new s(
              "`%` may not be present anywhere but at the beginning and end of the intrinsic name"
            );
          var r = (function (t) {
              var e = k(t, 0, 1),
                r = k(t, -1);
              if ("%" === e && "%" !== r)
                throw new s("invalid intrinsic syntax, expected closing `%`");
              if ("%" === r && "%" !== e)
                throw new s("invalid intrinsic syntax, expected opening `%`");
              var o = [];
              return (
                U(t, D, function (t, e, r, n) {
                  o[o.length] = r ? U(n, F, "$1") : e || t;
                }),
                o
              );
            })(t),
            o = r.length > 0 ? r[0] : "",
            n = _("%" + o + "%", e),
            a = n.name,
            i = n.value,
            l = !1,
            c = n.alias;
          c && ((o = c[0]), I(r, E([0, 1], c)));
          for (var u = 1, f = !0; u < r.length; u += 1) {
            var h = r[u],
              d = k(h, 0, 1),
              g = k(h, -1);
            if (
              ('"' === d ||
                "'" === d ||
                "`" === d ||
                '"' === g ||
                "'" === g ||
                "`" === g) &&
              d !== g
            )
              throw new s(
                "property names with quotes must have matching quotes"
              );
            if (
              (("constructor" !== h && f) || (l = !0),
              P(S, (a = "%" + (o += "." + h) + "%")))
            )
              i = S[a];
            else if (null != i) {
              if (!(h in i)) {
                if (!e)
                  throw new p(
                    "base intrinsic for " +
                      t +
                      "exists, but the property is not available."
                  );
                return;
              }
              if (y && u + 1 >= r.length) {
                var m = y(i, h);
                i =
                  (f = !!m) && "get" in m && !("originalValue" in m.get)
                    ? m.get
                    : i[h];
              } else (f = P(i, h)), (i = i[h]);
              f && !l && (S[a] = i);
            }
          }
          return i;
        };
      },
      5795: (t, e, r) => {
        "use strict";
        var o = r(453)("%Object.getOwnPropertyDescriptor%", !0);
        if (o)
          try {
            o([], "length");
          } catch (t) {
            o = null;
          }
        t.exports = o;
      },
      592: (t, e, r) => {
        "use strict";
        var o = r(655),
          n = function () {
            return !!o;
          };
        (n.hasArrayLengthDefineBug = function () {
          if (!o) return null;
          try {
            return 1 !== o([], "length", { value: 1 }).length;
          } catch (t) {
            return !0;
          }
        }),
          (t.exports = n);
      },
      24: (t) => {
        "use strict";
        var e = { __proto__: null, foo: {} },
          r = Object;
        t.exports = function () {
          return { __proto__: e }.foo === e.foo && !(e instanceof r);
        };
      },
      4039: (t, e, r) => {
        "use strict";
        var o = "undefined" != typeof Symbol && Symbol,
          n = r(1333);
        t.exports = function () {
          return (
            "function" == typeof o &&
            "function" == typeof Symbol &&
            "symbol" == typeof o("foo") &&
            "symbol" == typeof Symbol("bar") &&
            n()
          );
        };
      },
      1333: (t) => {
        "use strict";
        t.exports = function () {
          if (
            "function" != typeof Symbol ||
            "function" != typeof Object.getOwnPropertySymbols
          )
            return !1;
          if ("symbol" == typeof Symbol.iterator) return !0;
          var t = {},
            e = Symbol("test"),
            r = Object(e);
          if ("string" == typeof e) return !1;
          if ("[object Symbol]" !== Object.prototype.toString.call(e))
            return !1;
          if ("[object Symbol]" !== Object.prototype.toString.call(r))
            return !1;
          for (e in ((t[e] = 42), t)) return !1;
          if ("function" == typeof Object.keys && 0 !== Object.keys(t).length)
            return !1;
          if (
            "function" == typeof Object.getOwnPropertyNames &&
            0 !== Object.getOwnPropertyNames(t).length
          )
            return !1;
          var o = Object.getOwnPropertySymbols(t);
          if (1 !== o.length || o[0] !== e) return !1;
          if (!Object.prototype.propertyIsEnumerable.call(t, e)) return !1;
          if ("function" == typeof Object.getOwnPropertyDescriptor) {
            var n = Object.getOwnPropertyDescriptor(t, e);
            if (42 !== n.value || !0 !== n.enumerable) return !1;
          }
          return !0;
        };
      },
      9957: (t, e, r) => {
        "use strict";
        var o = Function.prototype.call,
          n = Object.prototype.hasOwnProperty,
          a = r(6743);
        t.exports = a.call(o, n);
      },
      8859: (t, e, r) => {
        var o = "function" == typeof Map && Map.prototype,
          n =
            Object.getOwnPropertyDescriptor && o
              ? Object.getOwnPropertyDescriptor(Map.prototype, "size")
              : null,
          a = o && n && "function" == typeof n.get ? n.get : null,
          i = o && Map.prototype.forEach,
          l = "function" == typeof Set && Set.prototype,
          s =
            Object.getOwnPropertyDescriptor && l
              ? Object.getOwnPropertyDescriptor(Set.prototype, "size")
              : null,
          p = l && s && "function" == typeof s.get ? s.get : null,
          c = l && Set.prototype.forEach,
          u =
            "function" == typeof WeakMap && WeakMap.prototype
              ? WeakMap.prototype.has
              : null,
          f =
            "function" == typeof WeakSet && WeakSet.prototype
              ? WeakSet.prototype.has
              : null,
          y =
            "function" == typeof WeakRef && WeakRef.prototype
              ? WeakRef.prototype.deref
              : null,
          h = Boolean.prototype.valueOf,
          d = Object.prototype.toString,
          g = Function.prototype.toString,
          m = String.prototype.match,
          b = String.prototype.slice,
          v = String.prototype.replace,
          w = String.prototype.toUpperCase,
          S = String.prototype.toLowerCase,
          A = RegExp.prototype.test,
          j = Array.prototype.concat,
          x = Array.prototype.join,
          O = Array.prototype.slice,
          P = Math.floor,
          E = "function" == typeof BigInt ? BigInt.prototype.valueOf : null,
          I = Object.getOwnPropertySymbols,
          U =
            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
              ? Symbol.prototype.toString
              : null,
          k = "function" == typeof Symbol && "object" == typeof Symbol.iterator,
          R =
            "function" == typeof Symbol &&
            Symbol.toStringTag &&
            (Symbol.toStringTag, 1)
              ? Symbol.toStringTag
              : null,
          D = Object.prototype.propertyIsEnumerable,
          F =
            ("function" == typeof Reflect
              ? Reflect.getPrototypeOf
              : Object.getPrototypeOf) ||
            ([].__proto__ === Array.prototype
              ? function (t) {
                  return t.__proto__;
                }
              : null);
        function _(t, e) {
          if (
            t === 1 / 0 ||
            t === -1 / 0 ||
            t != t ||
            (t && t > -1e3 && t < 1e3) ||
            A.call(/e/, e)
          )
            return e;
          var r = /[0-9](?=(?:[0-9]{3})+(?![0-9]))/g;
          if ("number" == typeof t) {
            var o = t < 0 ? -P(-t) : P(t);
            if (o !== t) {
              var n = String(o),
                a = b.call(e, n.length + 1);
              return (
                v.call(n, r, "$&_") +
                "." +
                v.call(v.call(a, /([0-9]{3})/g, "$&_"), /_$/, "")
              );
            }
          }
          return v.call(e, r, "$&_");
        }
        var T = r(2634),
          C = T.custom,
          N = q(C) ? C : null;
        function L(t, e, r) {
          var o = "double" === (r.quoteStyle || e) ? '"' : "'";
          return o + t + o;
        }
        function M(t) {
          return v.call(String(t), /"/g, "&quot;");
        }
        function B(t) {
          return !(
            "[object Array]" !== H(t) ||
            (R && "object" == typeof t && R in t)
          );
        }
        function W(t) {
          return !(
            "[object RegExp]" !== H(t) ||
            (R && "object" == typeof t && R in t)
          );
        }
        function q(t) {
          if (k) return t && "object" == typeof t && t instanceof Symbol;
          if ("symbol" == typeof t) return !0;
          if (!t || "object" != typeof t || !U) return !1;
          try {
            return U.call(t), !0;
          } catch (t) {}
          return !1;
        }
        t.exports = function t(e, o, n, l) {
          var s = o || {};
          if (
            z(s, "quoteStyle") &&
            "single" !== s.quoteStyle &&
            "double" !== s.quoteStyle
          )
            throw new TypeError(
              'option "quoteStyle"must be "single"or "double"'
            );
          if (
            z(s, "maxStringLength") &&
            ("number" == typeof s.maxStringLength
              ? s.maxStringLength < 0 && s.maxStringLength !== 1 / 0
              : null !== s.maxStringLength)
          )
            throw new TypeError(
              'option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`'
            );
          var d = !z(s, "customInspect") || s.customInspect;
          if ("boolean" != typeof d && "symbol" !== d)
            throw new TypeError(
              "option \"customInspect\", if provided, must be `true`, `false`, or `'symbol'`"
            );
          if (
            z(s, "indent") &&
            null !== s.indent &&
            "\t" !== s.indent &&
            !(parseInt(s.indent, 10) === s.indent && s.indent > 0)
          )
            throw new TypeError(
              'option "indent"must be "\\t", an integer > 0, or `null`'
            );
          if (
            z(s, "numericSeparator") &&
            "boolean" != typeof s.numericSeparator
          )
            throw new TypeError(
              'option "numericSeparator", if provided, must be `true` or `false`'
            );
          var w = s.numericSeparator;
          if (void 0 === e) return "undefined";
          if (null === e) return "null";
          if ("boolean" == typeof e) return e ? "true" : "false";
          if ("string" == typeof e) return G(e, s);
          if ("number" == typeof e) {
            if (0 === e) return 1 / 0 / e > 0 ? "0" : "-0";
            var A = String(e);
            return w ? _(e, A) : A;
          }
          if ("bigint" == typeof e) {
            var P = String(e) + "n";
            return w ? _(e, P) : P;
          }
          var I = void 0 === s.depth ? 5 : s.depth;
          if (
            (void 0 === n && (n = 0), n >= I && I > 0 && "object" == typeof e)
          )
            return B(e) ? "[Array]" : "[Object]";
          var C,
            $ = (function (t, e) {
              var r;
              if ("\t" === t.indent) r = "\t";
              else {
                if (!("number" == typeof t.indent && t.indent > 0)) return null;
                r = x.call(Array(t.indent + 1), "");
              }
              return { base: r, prev: x.call(Array(e + 1), r) };
            })(s, n);
          if (void 0 === l) l = [];
          else if (K(l, e) >= 0) return "[Circular]";
          function V(e, r, o) {
            if ((r && (l = O.call(l)).push(r), o)) {
              var a = { depth: s.depth };
              return (
                z(s, "quoteStyle") && (a.quoteStyle = s.quoteStyle),
                t(e, a, n + 1, l)
              );
            }
            return t(e, s, n + 1, l);
          }
          if ("function" == typeof e && !W(e)) {
            var tt = (function (t) {
                if (t.name) return t.name;
                var e = m.call(g.call(t), /^function\s*([\w$]+)/);
                return e ? e[1] : null;
              })(e),
              et = X(e, V);
            return (
              "[Function" +
              (tt ? ": " + tt : "(anonymous)") +
              "]" +
              (et.length > 0 ? "{ " + x.call(et, ", ") + "}" : "")
            );
          }
          if (q(e)) {
            var rt = k
              ? v.call(String(e), /^(Symbol\(.*\))_[^)]*$/, "$1")
              : U.call(e);
            return "object" != typeof e || k ? rt : Q(rt);
          }
          if (
            (C = e) &&
            "object" == typeof C &&
            (("undefined" != typeof HTMLElement && C instanceof HTMLElement) ||
              ("string" == typeof C.nodeName &&
                "function" == typeof C.getAttribute))
          ) {
            for (
              var ot = "<" + S.call(String(e.nodeName)),
                nt = e.attributes || [],
                at = 0;
              at < nt.length;
              at++
            )
              ot += "" + nt[at].name + "=" + L(M(nt[at].value), "double", s);
            return (
              (ot += ">"),
              e.childNodes && e.childNodes.length && (ot += "..."),
              ot + "</" + S.call(String(e.nodeName)) + ">"
            );
          }
          if (B(e)) {
            if (0 === e.length) return "[]";
            var it = X(e, V);
            return $ &&
              !(function (t) {
                for (var e = 0; e < t.length; e++)
                  if (K(t[e], "\n") >= 0) return !1;
                return !0;
              })(it)
              ? "[" + Y(it, $) + "]"
              : "[ " + x.call(it, ", ") + "]";
          }
          if (
            (function (t) {
              return !(
                "[object Error]" !== H(t) ||
                (R && "object" == typeof t && R in t)
              );
            })(e)
          ) {
            var lt = X(e, V);
            return "cause" in Error.prototype ||
              !("cause" in e) ||
              D.call(e, "cause")
              ? 0 === lt.length
                ? "[" + String(e) + "]"
                : "{ [" + String(e) + "] " + x.call(lt, ", ") + "}"
              : "{ [" +
                  String(e) +
                  "] " +
                  x.call(j.call("[cause]: " + V(e.cause), lt), ", ") +
                  "}";
          }
          if ("object" == typeof e && d) {
            if (N && "function" == typeof e[N] && T)
              return T(e, { depth: I - n });
            if ("symbol" !== d && "function" == typeof e.inspect)
              return e.inspect();
          }
          if (
            (function (t) {
              if (!a || !t || "object" != typeof t) return !1;
              try {
                a.call(t);
                try {
                  p.call(t);
                } catch (t) {
                  return !0;
                }
                return t instanceof Map;
              } catch (t) {}
              return !1;
            })(e)
          ) {
            var st = [];
            return (
              i &&
                i.call(e, function (t, r) {
                  st.push(V(r, e, !0) + "=> " + V(t, e));
                }),
              Z("Map", a.call(e), st, $)
            );
          }
          if (
            (function (t) {
              if (!p || !t || "object" != typeof t) return !1;
              try {
                p.call(t);
                try {
                  a.call(t);
                } catch (t) {
                  return !0;
                }
                return t instanceof Set;
              } catch (t) {}
              return !1;
            })(e)
          ) {
            var pt = [];
            return (
              c &&
                c.call(e, function (t) {
                  pt.push(V(t, e));
                }),
              Z("Set", p.call(e), pt, $)
            );
          }
          if (
            (function (t) {
              if (!u || !t || "object" != typeof t) return !1;
              try {
                u.call(t, u);
                try {
                  f.call(t, f);
                } catch (t) {
                  return !0;
                }
                return t instanceof WeakMap;
              } catch (t) {}
              return !1;
            })(e)
          )
            return J("WeakMap");
          if (
            (function (t) {
              if (!f || !t || "object" != typeof t) return !1;
              try {
                f.call(t, f);
                try {
                  u.call(t, u);
                } catch (t) {
                  return !0;
                }
                return t instanceof WeakSet;
              } catch (t) {}
              return !1;
            })(e)
          )
            return J("WeakSet");
          if (
            (function (t) {
              if (!y || !t || "object" != typeof t) return !1;
              try {
                return y.call(t), !0;
              } catch (t) {}
              return !1;
            })(e)
          )
            return J("WeakRef");
          if (
            (function (t) {
              return !(
                "[object Number]" !== H(t) ||
                (R && "object" == typeof t && R in t)
              );
            })(e)
          )
            return Q(V(Number(e)));
          if (
            (function (t) {
              if (!t || "object" != typeof t || !E) return !1;
              try {
                return E.call(t), !0;
              } catch (t) {}
              return !1;
            })(e)
          )
            return Q(V(E.call(e)));
          if (
            (function (t) {
              return !(
                "[object Boolean]" !== H(t) ||
                (R && "object" == typeof t && R in t)
              );
            })(e)
          )
            return Q(h.call(e));
          if (
            (function (t) {
              return !(
                "[object String]" !== H(t) ||
                (R && "object" == typeof t && R in t)
              );
            })(e)
          )
            return Q(V(String(e)));
          if ("undefined" != typeof window && e === window)
            return "{ [object Window] }";
          if (
            ("undefined" != typeof globalThis && e === globalThis) ||
            (void 0 !== r.g && e === r.g)
          )
            return "{ [object globalThis] }";
          if (
            !(function (t) {
              return !(
                "[object Date]" !== H(t) ||
                (R && "object" == typeof t && R in t)
              );
            })(e) &&
            !W(e)
          ) {
            var ct = X(e, V),
              ut = F
                ? F(e) === Object.prototype
                : e instanceof Object || e.constructor === Object,
              ft = e instanceof Object ? "" : "null prototype",
              yt =
                !ut && R && Object(e) === e && R in e
                  ? b.call(H(e), 8, -1)
                  : ft
                  ? "Object"
                  : "",
              ht =
                (ut || "function" != typeof e.constructor
                  ? ""
                  : e.constructor.name
                  ? e.constructor.name + ""
                  : "") +
                (yt || ft
                  ? "[" + x.call(j.call([], yt || [], ft || []), ": ") + "] "
                  : "");
            return 0 === ct.length
              ? ht + "{}"
              : $
              ? ht + "{" + Y(ct, $) + "}"
              : ht + "{ " + x.call(ct, ", ") + "}";
          }
          return String(e);
        };
        var $ =
          Object.prototype.hasOwnProperty ||
          function (t) {
            return t in this;
          };
        function z(t, e) {
          return $.call(t, e);
        }
        function H(t) {
          return d.call(t);
        }
        function K(t, e) {
          if (t.indexOf) return t.indexOf(e);
          for (var r = 0, o = t.length; r < o; r++) if (t[r] === e) return r;
          return -1;
        }
        function G(t, e) {
          if (t.length > e.maxStringLength) {
            var r = t.length - e.maxStringLength,
              o = "... " + r + "more character" + (r > 1 ? "s" : "");
            return G(b.call(t, 0, e.maxStringLength), e) + o;
          }
          return L(
            v.call(v.call(t, /(['\\])/g, "\\$1"), /[\x00-\x1f]/g, V),
            "single",
            e
          );
        }
        function V(t) {
          var e = t.charCodeAt(0),
            r = { 8: "b", 9: "t", 10: "n", 12: "f", 13: "r" }[e];
          return r
            ? "\\" + r
            : "\\x" + (e < 16 ? "0" : "") + w.call(e.toString(16));
        }
        function Q(t) {
          return "Object(" + t + ")";
        }
        function J(t) {
          return t + "{ ? }";
        }
        function Z(t, e, r, o) {
          return t + "(" + e + ") {" + (o ? Y(r, o) : x.call(r, ", ")) + "}";
        }
        function Y(t, e) {
          if (0 === t.length) return "";
          var r = "\n" + e.prev + e.base;
          return r + x.call(t, "," + r) + "\n" + e.prev;
        }
        function X(t, e) {
          var r = B(t),
            o = [];
          if (r) {
            o.length = t.length;
            for (var n = 0; n < t.length; n++) o[n] = z(t, n) ? e(t[n], t) : "";
          }
          var a,
            i = "function" == typeof I ? I(t) : [];
          if (k) {
            a = {};
            for (var l = 0; l < i.length; l++) a["$" + i[l]] = i[l];
          }
          for (var s in t)
            z(t, s) &&
              ((r && String(Number(s)) === s && s < t.length) ||
                (k && a["$" + s] instanceof Symbol) ||
                (A.call(/[^\w$]/, s)
                  ? o.push(e(s, t) + ": " + e(t[s], t))
                  : o.push(s + ": " + e(t[s], t))));
          if ("function" == typeof I)
            for (var p = 0; p < i.length; p++)
              D.call(t, i[p]) && o.push("[" + e(i[p]) + "]: " + e(t[i[p]], t));
          return o;
        }
      },
      4765: (t) => {
        "use strict";
        var e = String.prototype.replace,
          r = /%20/g,
          o = "RFC3986";
        t.exports = {
          default: o,
          formatters: {
            RFC1738: function (t) {
              return e.call(t, r, "+");
            },
            RFC3986: function (t) {
              return String(t);
            },
          },
          RFC1738: "RFC1738",
          RFC3986: o,
        };
      },
      5373: (t, e, r) => {
        "use strict";
        var o = r(8636),
          n = r(2642),
          a = r(4765);
        t.exports = { formats: a, parse: n, stringify: o };
      },
      2642: (t, e, r) => {
        "use strict";
        var o = r(7720),
          n = Object.prototype.hasOwnProperty,
          a = Array.isArray,
          i = {
            allowDots: !1,
            allowEmptyArrays: !1,
            allowPrototypes: !1,
            allowSparse: !1,
            arrayLimit: 20,
            charset: "utf-8",
            charsetSentinel: !1,
            comma: !1,
            decodeDotInKeys: !1,
            decoder: o.decode,
            delimiter: "&",
            depth: 5,
            duplicates: "combine",
            ignoreQueryPrefix: !1,
            interpretNumericEntities: !1,
            parameterLimit: 1e3,
            parseArrays: !0,
            plainObjects: !1,
            strictDepth: !1,
            strictNullHandling: !1,
          },
          l = function (t) {
            return t.replace(/&#(\d+);/g, function (t, e) {
              return String.fromCharCode(parseInt(e, 10));
            });
          },
          s = function (t, e) {
            return t && "string" == typeof t && e.comma && t.indexOf(",") > -1
              ? t.split(",")
              : t;
          },
          p = function (t, e, r, o) {
            if (t) {
              var a = r.allowDots ? t.replace(/\.([^.[]+)/g, "[$1]") : t,
                i = /(\[[^[\]]*])/g,
                l = r.depth > 0 && /(\[[^[\]]*])/.exec(a),
                p = l ? a.slice(0, l.index) : a,
                c = [];
              if (p) {
                if (
                  !r.plainObjects &&
                  n.call(Object.prototype, p) &&
                  !r.allowPrototypes
                )
                  return;
                c.push(p);
              }
              for (
                var u = 0;
                r.depth > 0 && null !== (l = i.exec(a)) && u < r.depth;

              ) {
                if (
                  ((u += 1),
                  !r.plainObjects &&
                    n.call(Object.prototype, l[1].slice(1, -1)) &&
                    !r.allowPrototypes)
                )
                  return;
                c.push(l[1]);
              }
              if (l) {
                if (!0 === r.strictDepth)
                  throw new RangeError(
                    "Input depth exceeded depth option of " +
                      r.depth +
                      "and strictDepth is true"
                  );
                c.push("[" + a.slice(l.index) + "]");
              }
              return (function (t, e, r, o) {
                for (var n = o ? e : s(e, r), a = t.length - 1; a >= 0; --a) {
                  var i,
                    l = t[a];
                  if ("[]" === l && r.parseArrays)
                    i =
                      r.allowEmptyArrays &&
                      ("" === n || (r.strictNullHandling && null === n))
                        ? []
                        : [].concat(n);
                  else {
                    i = r.plainObjects ? Object.create(null) : {};
                    var p =
                        "[" === l.charAt(0) && "]" === l.charAt(l.length - 1)
                          ? l.slice(1, -1)
                          : l,
                      c = r.decodeDotInKeys ? p.replace(/%2E/g, ".") : p,
                      u = parseInt(c, 10);
                    r.parseArrays || "" !== c
                      ? !isNaN(u) &&
                        l !== c &&
                        String(u) === c &&
                        u >= 0 &&
                        r.parseArrays &&
                        u <= r.arrayLimit
                        ? ((i = [])[u] = n)
                        : "__proto__" !== c && (i[c] = n)
                      : (i = { 0: n });
                  }
                  n = i;
                }
                return n;
              })(c, e, r, o);
            }
          };
        t.exports = function (t, e) {
          var r = (function (t) {
            if (!t) return i;
            if (
              void 0 !== t.allowEmptyArrays &&
              "boolean" != typeof t.allowEmptyArrays
            )
              throw new TypeError(
                "`allowEmptyArrays` option can only be `true` or `false`, when provided"
              );
            if (
              void 0 !== t.decodeDotInKeys &&
              "boolean" != typeof t.decodeDotInKeys
            )
              throw new TypeError(
                "`decodeDotInKeys` option can only be `true` or `false`, when provided"
              );
            if (
              null !== t.decoder &&
              void 0 !== t.decoder &&
              "function" != typeof t.decoder
            )
              throw new TypeError("Decoder has to be a function.");
            if (
              void 0 !== t.charset &&
              "utf-8" !== t.charset &&
              "iso-8859-1" !== t.charset
            )
              throw new TypeError(
                "The charset option must be either utf-8, iso-8859-1, or undefined"
              );
            var e = void 0 === t.charset ? i.charset : t.charset,
              r = void 0 === t.duplicates ? i.duplicates : t.duplicates;
            if ("combine" !== r && "first" !== r && "last" !== r)
              throw new TypeError(
                "The duplicates option must be either combine, first, or last"
              );
            return {
              allowDots:
                void 0 === t.allowDots
                  ? !0 === t.decodeDotInKeys || i.allowDots
                  : !!t.allowDots,
              allowEmptyArrays:
                "boolean" == typeof t.allowEmptyArrays
                  ? !!t.allowEmptyArrays
                  : i.allowEmptyArrays,
              allowPrototypes:
                "boolean" == typeof t.allowPrototypes
                  ? t.allowPrototypes
                  : i.allowPrototypes,
              allowSparse:
                "boolean" == typeof t.allowSparse
                  ? t.allowSparse
                  : i.allowSparse,
              arrayLimit:
                "number" == typeof t.arrayLimit ? t.arrayLimit : i.arrayLimit,
              charset: e,
              charsetSentinel:
                "boolean" == typeof t.charsetSentinel
                  ? t.charsetSentinel
                  : i.charsetSentinel,
              comma: "boolean" == typeof t.comma ? t.comma : i.comma,
              decodeDotInKeys:
                "boolean" == typeof t.decodeDotInKeys
                  ? t.decodeDotInKeys
                  : i.decodeDotInKeys,
              decoder: "function" == typeof t.decoder ? t.decoder : i.decoder,
              delimiter:
                "string" == typeof t.delimiter || o.isRegExp(t.delimiter)
                  ? t.delimiter
                  : i.delimiter,
              depth:
                "number" == typeof t.depth || !1 === t.depth
                  ? +t.depth
                  : i.depth,
              duplicates: r,
              ignoreQueryPrefix: !0 === t.ignoreQueryPrefix,
              interpretNumericEntities:
                "boolean" == typeof t.interpretNumericEntities
                  ? t.interpretNumericEntities
                  : i.interpretNumericEntities,
              parameterLimit:
                "number" == typeof t.parameterLimit
                  ? t.parameterLimit
                  : i.parameterLimit,
              parseArrays: !1 !== t.parseArrays,
              plainObjects:
                "boolean" == typeof t.plainObjects
                  ? t.plainObjects
                  : i.plainObjects,
              strictDepth:
                "boolean" == typeof t.strictDepth
                  ? !!t.strictDepth
                  : i.strictDepth,
              strictNullHandling:
                "boolean" == typeof t.strictNullHandling
                  ? t.strictNullHandling
                  : i.strictNullHandling,
            };
          })(e);
          if ("" === t || null == t)
            return r.plainObjects ? Object.create(null) : {};
          for (
            var c =
                "string" == typeof t
                  ? (function (t, e) {
                      var r = { __proto__: null },
                        p = e.ignoreQueryPrefix ? t.replace(/^\?/, "") : t;
                      p = p.replace(/%5B/gi, "[").replace(/%5D/gi, "]");
                      var c,
                        u =
                          e.parameterLimit === 1 / 0
                            ? void 0
                            : e.parameterLimit,
                        f = p.split(e.delimiter, u),
                        y = -1,
                        h = e.charset;
                      if (e.charsetSentinel)
                        for (c = 0; c < f.length; ++c)
                          0 === f[c].indexOf("utf8=") &&
                            ("utf8=%E2%9C%93" === f[c]
                              ? (h = "utf-8")
                              : "utf8=%26%2310003%3B" === f[c] &&
                                (h = "iso-8859-1"),
                            (y = c),
                            (c = f.length));
                      for (c = 0; c < f.length; ++c)
                        if (c !== y) {
                          var d,
                            g,
                            m = f[c],
                            b = m.indexOf("]="),
                            v = -1 === b ? m.indexOf("=") : b + 1;
                          -1 === v
                            ? ((d = e.decoder(m, i.decoder, h, "key")),
                              (g = e.strictNullHandling ? null : ""))
                            : ((d = e.decoder(
                                m.slice(0, v),
                                i.decoder,
                                h,
                                "key"
                              )),
                              (g = o.maybeMap(
                                s(m.slice(v + 1), e),
                                function (t) {
                                  return e.decoder(t, i.decoder, h, "value");
                                }
                              ))),
                            g &&
                              e.interpretNumericEntities &&
                              "iso-8859-1" === h &&
                              (g = l(g)),
                            m.indexOf("[]=") > -1 && (g = a(g) ? [g] : g);
                          var w = n.call(r, d);
                          w && "combine" === e.duplicates
                            ? (r[d] = o.combine(r[d], g))
                            : (w && "last" !== e.duplicates) || (r[d] = g);
                        }
                      return r;
                    })(t, r)
                  : t,
              u = r.plainObjects ? Object.create(null) : {},
              f = Object.keys(c),
              y = 0;
            y < f.length;
            ++y
          ) {
            var h = f[y],
              d = p(h, c[h], r, "string" == typeof t);
            u = o.merge(u, d, r);
          }
          return !0 === r.allowSparse ? u : o.compact(u);
        };
      },
      8636: (t, e, r) => {
        "use strict";
        var o = r(920),
          n = r(7720),
          a = r(4765),
          i = Object.prototype.hasOwnProperty,
          l = {
            brackets: function (t) {
              return t + "[]";
            },
            comma: "comma",
            indices: function (t, e) {
              return t + "[" + e + "]";
            },
            repeat: function (t) {
              return t;
            },
          },
          s = Array.isArray,
          p = Array.prototype.push,
          c = function (t, e) {
            p.apply(t, s(e) ? e : [e]);
          },
          u = Date.prototype.toISOString,
          f = a.default,
          y = {
            addQueryPrefix: !1,
            allowDots: !1,
            allowEmptyArrays: !1,
            arrayFormat: "indices",
            charset: "utf-8",
            charsetSentinel: !1,
            delimiter: "&",
            encode: !0,
            encodeDotInKeys: !1,
            encoder: n.encode,
            encodeValuesOnly: !1,
            format: f,
            formatter: a.formatters[f],
            indices: !1,
            serializeDate: function (t) {
              return u.call(t);
            },
            skipNulls: !1,
            strictNullHandling: !1,
          },
          h = {},
          d = function t(e, r, a, i, l, p, u, f, d, g, m, b, v, w, S, A, j, x) {
            for (
              var O, P = e, E = x, I = 0, U = !1;
              void 0 !== (E = E.get(h)) && !U;

            ) {
              var k = E.get(e);
              if (((I += 1), void 0 !== k)) {
                if (k === I) throw new RangeError("Cyclic object value");
                U = !0;
              }
              void 0 === E.get(h) && (I = 0);
            }
            if (
              ("function" == typeof g
                ? (P = g(r, P))
                : P instanceof Date
                ? (P = v(P))
                : "comma" === a &&
                  s(P) &&
                  (P = n.maybeMap(P, function (t) {
                    return t instanceof Date ? v(t) : t;
                  })),
              null === P)
            ) {
              if (p) return d && !A ? d(r, y.encoder, j, "key", w) : r;
              P = "";
            }
            if (
              "string" == typeof (O = P) ||
              "number" == typeof O ||
              "boolean" == typeof O ||
              "symbol" == typeof O ||
              "bigint" == typeof O ||
              n.isBuffer(P)
            )
              return d
                ? [
                    S(A ? r : d(r, y.encoder, j, "key", w)) +
                      "=" +
                      S(d(P, y.encoder, j, "value", w)),
                  ]
                : [S(r) + "=" + S(String(P))];
            var R,
              D = [];
            if (void 0 === P) return D;
            if ("comma" === a && s(P))
              A && d && (P = n.maybeMap(P, d)),
                (R = [{ value: P.length > 0 ? P.join(",") || null : void 0 }]);
            else if (s(g)) R = g;
            else {
              var F = Object.keys(P);
              R = m ? F.sort(m) : F;
            }
            var _ = f ? r.replace(/\./g, "%2E") : r,
              T = i && s(P) && 1 === P.length ? _ + "[]" : _;
            if (l && s(P) && 0 === P.length) return T + "[]";
            for (var C = 0; C < R.length; ++C) {
              var N = R[C],
                L = "object" == typeof N && void 0 !== N.value ? N.value : P[N];
              if (!u || null !== L) {
                var M = b && f ? N.replace(/\./g, "%2E") : N,
                  B = s(P)
                    ? "function" == typeof a
                      ? a(T, M)
                      : T
                    : T + (b ? "." + M : "[" + M + "]");
                x.set(e, I);
                var W = o();
                W.set(h, x),
                  c(
                    D,
                    t(
                      L,
                      B,
                      a,
                      i,
                      l,
                      p,
                      u,
                      f,
                      "comma" === a && A && s(P) ? null : d,
                      g,
                      m,
                      b,
                      v,
                      w,
                      S,
                      A,
                      j,
                      W
                    )
                  );
              }
            }
            return D;
          };
        t.exports = function (t, e) {
          var r,
            n = t,
            p = (function (t) {
              if (!t) return y;
              if (
                void 0 !== t.allowEmptyArrays &&
                "boolean" != typeof t.allowEmptyArrays
              )
                throw new TypeError(
                  "`allowEmptyArrays` option can only be `true` or `false`, when provided"
                );
              if (
                void 0 !== t.encodeDotInKeys &&
                "boolean" != typeof t.encodeDotInKeys
              )
                throw new TypeError(
                  "`encodeDotInKeys` option can only be `true` or `false`, when provided"
                );
              if (
                null !== t.encoder &&
                void 0 !== t.encoder &&
                "function" != typeof t.encoder
              )
                throw new TypeError("Encoder has to be a function.");
              var e = t.charset || y.charset;
              if (
                void 0 !== t.charset &&
                "utf-8" !== t.charset &&
                "iso-8859-1" !== t.charset
              )
                throw new TypeError(
                  "The charset option must be either utf-8, iso-8859-1, or undefined"
                );
              var r = a.default;
              if (void 0 !== t.format) {
                if (!i.call(a.formatters, t.format))
                  throw new TypeError("Unknown format option provided.");
                r = t.format;
              }
              var o,
                n = a.formatters[r],
                p = y.filter;
              if (
                (("function" == typeof t.filter || s(t.filter)) &&
                  (p = t.filter),
                (o =
                  t.arrayFormat in l
                    ? t.arrayFormat
                    : "indices" in t
                    ? t.indices
                      ? "indices"
                      : "repeat"
                    : y.arrayFormat),
                "commaRoundTrip" in t && "boolean" != typeof t.commaRoundTrip)
              )
                throw new TypeError(
                  "`commaRoundTrip` must be a boolean, or absent"
                );
              var c =
                void 0 === t.allowDots
                  ? !0 === t.encodeDotInKeys || y.allowDots
                  : !!t.allowDots;
              return {
                addQueryPrefix:
                  "boolean" == typeof t.addQueryPrefix
                    ? t.addQueryPrefix
                    : y.addQueryPrefix,
                allowDots: c,
                allowEmptyArrays:
                  "boolean" == typeof t.allowEmptyArrays
                    ? !!t.allowEmptyArrays
                    : y.allowEmptyArrays,
                arrayFormat: o,
                charset: e,
                charsetSentinel:
                  "boolean" == typeof t.charsetSentinel
                    ? t.charsetSentinel
                    : y.charsetSentinel,
                commaRoundTrip: t.commaRoundTrip,
                delimiter: void 0 === t.delimiter ? y.delimiter : t.delimiter,
                encode: "boolean" == typeof t.encode ? t.encode : y.encode,
                encodeDotInKeys:
                  "boolean" == typeof t.encodeDotInKeys
                    ? t.encodeDotInKeys
                    : y.encodeDotInKeys,
                encoder: "function" == typeof t.encoder ? t.encoder : y.encoder,
                encodeValuesOnly:
                  "boolean" == typeof t.encodeValuesOnly
                    ? t.encodeValuesOnly
                    : y.encodeValuesOnly,
                filter: p,
                format: r,
                formatter: n,
                serializeDate:
                  "function" == typeof t.serializeDate
                    ? t.serializeDate
                    : y.serializeDate,
                skipNulls:
                  "boolean" == typeof t.skipNulls ? t.skipNulls : y.skipNulls,
                sort: "function" == typeof t.sort ? t.sort : null,
                strictNullHandling:
                  "boolean" == typeof t.strictNullHandling
                    ? t.strictNullHandling
                    : y.strictNullHandling,
              };
            })(e);
          "function" == typeof p.filter
            ? (n = (0, p.filter)("", n))
            : s(p.filter) && (r = p.filter);
          var u = [];
          if ("object" != typeof n || null === n) return "";
          var f = l[p.arrayFormat],
            h = "comma" === f && p.commaRoundTrip;
          r || (r = Object.keys(n)), p.sort && r.sort(p.sort);
          for (var g = o(), m = 0; m < r.length; ++m) {
            var b = r[m];
            (p.skipNulls && null === n[b]) ||
              c(
                u,
                d(
                  n[b],
                  b,
                  f,
                  h,
                  p.allowEmptyArrays,
                  p.strictNullHandling,
                  p.skipNulls,
                  p.encodeDotInKeys,
                  p.encode ? p.encoder : null,
                  p.filter,
                  p.sort,
                  p.allowDots,
                  p.serializeDate,
                  p.format,
                  p.formatter,
                  p.encodeValuesOnly,
                  p.charset,
                  g
                )
              );
          }
          var v = u.join(p.delimiter),
            w = !0 === p.addQueryPrefix ? "?" : "";
          return (
            p.charsetSentinel &&
              ("iso-8859-1" === p.charset
                ? (w += "utf8=%26%2310003%3B&")
                : (w += "utf8=%E2%9C%93&")),
            v.length > 0 ? w + v : ""
          );
        };
      },
      7720: (t, e, r) => {
        "use strict";
        var o = r(4765),
          n = Object.prototype.hasOwnProperty,
          a = Array.isArray,
          i = (function () {
            for (var t = [], e = 0; e < 256; ++e)
              t.push(
                "%" + ((e < 16 ? "0" : "") + e.toString(16)).toUpperCase()
              );
            return t;
          })(),
          l = function (t, e) {
            for (
              var r = e && e.plainObjects ? Object.create(null) : {}, o = 0;
              o < t.length;
              ++o
            )
              void 0 !== t[o] && (r[o] = t[o]);
            return r;
          },
          s = 1024;
        t.exports = {
          arrayToObject: l,
          assign: function (t, e) {
            return Object.keys(e).reduce(function (t, r) {
              return (t[r] = e[r]), t;
            }, t);
          },
          combine: function (t, e) {
            return [].concat(t, e);
          },
          compact: function (t) {
            for (
              var e = [{ obj: { o: t }, prop: "o" }], r = [], o = 0;
              o < e.length;
              ++o
            )
              for (
                var n = e[o], i = n.obj[n.prop], l = Object.keys(i), s = 0;
                s < l.length;
                ++s
              ) {
                var p = l[s],
                  c = i[p];
                "object" == typeof c &&
                  null !== c &&
                  -1 === r.indexOf(c) &&
                  (e.push({ obj: i, prop: p }), r.push(c));
              }
            return (
              (function (t) {
                for (; t.length > 1; ) {
                  var e = t.pop(),
                    r = e.obj[e.prop];
                  if (a(r)) {
                    for (var o = [], n = 0; n < r.length; ++n)
                      void 0 !== r[n] && o.push(r[n]);
                    e.obj[e.prop] = o;
                  }
                }
              })(e),
              t
            );
          },
          decode: function (t, e, r) {
            var o = t.replace(/\+/g, "");
            if ("iso-8859-1" === r)
              return o.replace(/%[0-9a-f]{2}/gi, unescape);
            try {
              return decodeURIComponent(o);
            } catch (t) {
              return o;
            }
          },
          encode: function (t, e, r, n, a) {
            if (0 === t.length) return t;
            var l = t;
            if (
              ("symbol" == typeof t
                ? (l = Symbol.prototype.toString.call(t))
                : "string" != typeof t && (l = String(t)),
              "iso-8859-1" === r)
            )
              return escape(l).replace(/%u[0-9a-f]{4}/gi, function (t) {
                return "%26%23" + parseInt(t.slice(2), 16) + "%3B";
              });
            for (var p = "", c = 0; c < l.length; c += s) {
              for (
                var u = l.length >= s ? l.slice(c, c + s) : l, f = [], y = 0;
                y < u.length;
                ++y
              ) {
                var h = u.charCodeAt(y);
                45 === h ||
                46 === h ||
                95 === h ||
                126 === h ||
                (h >= 48 && h <= 57) ||
                (h >= 65 && h <= 90) ||
                (h >= 97 && h <= 122) ||
                (a === o.RFC1738 && (40 === h || 41 === h))
                  ? (f[f.length] = u.charAt(y))
                  : h < 128
                  ? (f[f.length] = i[h])
                  : h < 2048
                  ? (f[f.length] = i[192 | (h >> 6)] + i[128 | (63 & h)])
                  : h < 55296 || h >= 57344
                  ? (f[f.length] =
                      i[224 | (h >> 12)] +
                      i[128 | ((h >> 6) & 63)] +
                      i[128 | (63 & h)])
                  : ((y += 1),
                    (h =
                      65536 + (((1023 & h) << 10) | (1023 & u.charCodeAt(y)))),
                    (f[f.length] =
                      i[240 | (h >> 18)] +
                      i[128 | ((h >> 12) & 63)] +
                      i[128 | ((h >> 6) & 63)] +
                      i[128 | (63 & h)]));
              }
              p += f.join("");
            }
            return p;
          },
          isBuffer: function (t) {
            return !(
              !t ||
              "object" != typeof t ||
              !(
                t.constructor &&
                t.constructor.isBuffer &&
                t.constructor.isBuffer(t)
              )
            );
          },
          isRegExp: function (t) {
            return "[object RegExp]" === Object.prototype.toString.call(t);
          },
          maybeMap: function (t, e) {
            if (a(t)) {
              for (var r = [], o = 0; o < t.length; o += 1) r.push(e(t[o]));
              return r;
            }
            return e(t);
          },
          merge: function t(e, r, o) {
            if (!r) return e;
            if ("object" != typeof r) {
              if (a(e)) e.push(r);
              else {
                if (!e || "object" != typeof e) return [e, r];
                ((o && (o.plainObjects || o.allowPrototypes)) ||
                  !n.call(Object.prototype, r)) &&
                  (e[r] = !0);
              }
              return e;
            }
            if (!e || "object" != typeof e) return [e].concat(r);
            var i = e;
            return (
              a(e) && !a(r) && (i = l(e, o)),
              a(e) && a(r)
                ? (r.forEach(function (r, a) {
                    if (n.call(e, a)) {
                      var i = e[a];
                      i && "object" == typeof i && r && "object" == typeof r
                        ? (e[a] = t(i, r, o))
                        : e.push(r);
                    } else e[a] = r;
                  }),
                  e)
                : Object.keys(r).reduce(function (e, a) {
                    var i = r[a];
                    return (
                      n.call(e, a) ? (e[a] = t(e[a], i, o)) : (e[a] = i), e
                    );
                  }, i)
            );
          },
        };
      },
      6897: (t, e, r) => {
        "use strict";
        var o = r(453),
          n = r(41),
          a = r(592)(),
          i = r(5795),
          l = r(9675),
          s = o("%Math.floor%");
        t.exports = function (t, e) {
          if ("function" != typeof t) throw new l("`fn` is not a function");
          if ("number" != typeof e || e < 0 || e > 4294967295 || s(e) !== e)
            throw new l("`length` must be a positive 32-bit integer");
          var r = arguments.length > 2 && !!arguments[2],
            o = !0,
            p = !0;
          if ("length" in t && i) {
            var c = i(t, "length");
            c && !c.configurable && (o = !1), c && !c.writable && (p = !1);
          }
          return (
            (o || p || !r) &&
              (a ? n(t, "length", e, !0, !0) : n(t, "length", e)),
            t
          );
        };
      },
      920: (t, e, r) => {
        "use strict";
        var o = r(453),
          n = r(8075),
          a = r(8859),
          i = r(9675),
          l = o("%WeakMap%", !0),
          s = o("%Map%", !0),
          p = n("WeakMap.prototype.get", !0),
          c = n("WeakMap.prototype.set", !0),
          u = n("WeakMap.prototype.has", !0),
          f = n("Map.prototype.get", !0),
          y = n("Map.prototype.set", !0),
          h = n("Map.prototype.has", !0),
          d = function (t, e) {
            for (var r, o = t; null !== (r = o.next); o = r)
              if (r.key === e)
                return (o.next = r.next), (r.next = t.next), (t.next = r), r;
          };
        t.exports = function () {
          var t,
            e,
            r,
            o = {
              assert: function (t) {
                if (!o.has(t))
                  throw new i("Side channel does not contain " + a(t));
              },
              get: function (o) {
                if (
                  l &&
                  o &&
                  ("object" == typeof o || "function" == typeof o)
                ) {
                  if (t) return p(t, o);
                } else if (s) {
                  if (e) return f(e, o);
                } else if (r)
                  return (function (t, e) {
                    var r = d(t, e);
                    return r && r.value;
                  })(r, o);
              },
              has: function (o) {
                if (
                  l &&
                  o &&
                  ("object" == typeof o || "function" == typeof o)
                ) {
                  if (t) return u(t, o);
                } else if (s) {
                  if (e) return h(e, o);
                } else if (r)
                  return (function (t, e) {
                    return !!d(t, e);
                  })(r, o);
                return !1;
              },
              set: function (o, n) {
                l && o && ("object" == typeof o || "function" == typeof o)
                  ? (t || (t = new l()), c(t, o, n))
                  : s
                  ? (e || (e = new s()), y(e, o, n))
                  : (r || (r = { key: {}, next: null }),
                    (function (t, e, r) {
                      var o = d(t, e);
                      o
                        ? (o.value = r)
                        : (t.next = { key: e, next: t.next, value: r });
                    })(r, o, n));
              },
            };
          return o;
        };
      },
      1270: function (t, e, r) {
        var o;
        (t = r.nmd(t)),
          (function () {
            e && e.nodeType, t && t.nodeType;
            var n = "object" == typeof r.g && r.g;
            n.global !== n && n.window !== n && n.self;
            var a,
              i = 2147483647,
              l = 36,
              s = /^xn--/,
              p = /[^\x20-\x7E]/,
              c = /[\x2E\u3002\uFF0E\uFF61]/g,
              u = {
                overflow: "Overflow: input needs wider integers to process",
                "not-basic": "Illegal input >= 0x80 (not a basic code point)",
                "invalid-input": "Invalid input",
              },
              f = Math.floor,
              y = String.fromCharCode;
            function h(t) {
              throw new RangeError(u[t]);
            }
            function d(t, e) {
              for (var r = t.length, o = []; r--; ) o[r] = e(t[r]);
              return o;
            }
            function g(t, e) {
              var r = t.split("@"),
                o = "";
              return (
                r.length > 1 && ((o = r[0] + "@"), (t = r[1])),
                o + d((t = t.replace(c, ".")).split("."), e).join(".")
              );
            }
            function m(t) {
              for (var e, r, o = [], n = 0, a = t.length; n < a; )
                (e = t.charCodeAt(n++)) >= 55296 && e <= 56319 && n < a
                  ? 56320 == (64512 & (r = t.charCodeAt(n++)))
                    ? o.push(((1023 & e) << 10) + (1023 & r) + 65536)
                    : (o.push(e), n--)
                  : o.push(e);
              return o;
            }
            function b(t) {
              return d(t, function (t) {
                var e = "";
                return (
                  t > 65535 &&
                    ((e += y((((t -= 65536) >>> 10) & 1023) | 55296)),
                    (t = 56320 | (1023 & t))),
                  e + y(t)
                );
              }).join("");
            }
            function v(t, e) {
              return t + 22 + 75 * (t < 26) - ((0 != e) << 5);
            }
            function w(t, e, r) {
              var o = 0;
              for (t = r ? f(t / 700) : t >> 1, t += f(t / e); t > 455; o += l)
                t = f(t / 35);
              return f(o + (36 * t) / (t + 38));
            }
            function S(t) {
              var e,
                r,
                o,
                n,
                a,
                s,
                p,
                c,
                u,
                y,
                d,
                g = [],
                m = t.length,
                v = 0,
                S = 128,
                A = 72;
              for ((r = t.lastIndexOf("-")) < 0 && (r = 0), o = 0; o < r; ++o)
                t.charCodeAt(o) >= 128 && h("not-basic"),
                  g.push(t.charCodeAt(o));
              for (n = r > 0 ? r + 1 : 0; n < m; ) {
                for (
                  a = v, s = 1, p = l;
                  n >= m && h("invalid-input"),
                    ((c =
                      (d = t.charCodeAt(n++)) - 48 < 10
                        ? d - 22
                        : d - 65 < 26
                        ? d - 65
                        : d - 97 < 26
                        ? d - 97
                        : l) >= l ||
                      c > f((i - v) / s)) &&
                      h("overflow"),
                    (v += c * s),
                    !(c < (u = p <= A ? 1 : p >= A + 26 ? 26 : p - A));
                  p += l
                )
                  s > f(i / (y = l - u)) && h("overflow"), (s *= y);
                (A = w(v - a, (e = g.length + 1), 0 == a)),
                  f(v / e) > i - S && h("overflow"),
                  (S += f(v / e)),
                  (v %= e),
                  g.splice(v++, 0, S);
              }
              return b(g);
            }
            function A(t) {
              var e,
                r,
                o,
                n,
                a,
                s,
                p,
                c,
                u,
                d,
                g,
                b,
                S,
                A,
                j,
                x = [];
              for (
                b = (t = m(t)).length, e = 128, r = 0, a = 72, s = 0;
                s < b;
                ++s
              )
                (g = t[s]) < 128 && x.push(y(g));
              for (o = n = x.length, n && x.push("-"); o < b; ) {
                for (p = i, s = 0; s < b; ++s)
                  (g = t[s]) >= e && g < p && (p = g);
                for (
                  p - e > f((i - r) / (S = o + 1)) && h("overflow"),
                    r += (p - e) * S,
                    e = p,
                    s = 0;
                  s < b;
                  ++s
                )
                  if (((g = t[s]) < e && ++r > i && h("overflow"), g == e)) {
                    for (
                      c = r, u = l;
                      !(c < (d = u <= a ? 1 : u >= a + 26 ? 26 : u - a));
                      u += l
                    )
                      (j = c - d),
                        (A = l - d),
                        x.push(y(v(d + (j % A), 0))),
                        (c = f(j / A));
                    x.push(y(v(c, 0))), (a = w(r, S, o == n)), (r = 0), ++o;
                  }
                ++r, ++e;
              }
              return x.join("");
            }
            (a = {
              version: "1.4.1",
              ucs2: { decode: m, encode: b },
              decode: S,
              encode: A,
              toASCII: function (t) {
                return g(t, function (t) {
                  return p.test(t) ? "xn--" + A(t) : t;
                });
              },
              toUnicode: function (t) {
                return g(t, function (t) {
                  return s.test(t) ? S(t.slice(4).toLowerCase()) : t;
                });
              },
            }),
              void 0 ===
                (o = function () {
                  return a;
                }.call(e, r, e, t)) || (t.exports = o);
          })();
      },
      8835: (t, e, r) => {
        "use strict";
        var o = r(1270);
        function n() {
          (this.protocol = null),
            (this.slashes = null),
            (this.auth = null),
            (this.host = null),
            (this.port = null),
            (this.hostname = null),
            (this.hash = null),
            (this.search = null),
            (this.query = null),
            (this.pathname = null),
            (this.path = null),
            (this.href = null);
        }
        var a = /^([a-z0-9.+-]+:)/i,
          i = /:[0-9]*$/,
          l = /^(\/\/?(?!\/)[^?\s]*)(\?[^\s]*)?$/,
          s = ["{", "}", "|", "\\", "^", "`"].concat([
            "<",
            ">",
            '"',
            "`",
            "",
            "\r",
            "\n",
            "\t",
          ]),
          p = ["'"].concat(s),
          c = ["%", "/", "?", ";", "#"].concat(p),
          u = ["/", "?", "#"],
          f = /^[+a-z0-9A-Z_-]{0,63}$/,
          y = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
          h = { javascript: !0, "javascript:": !0 },
          d = { javascript: !0, "javascript:": !0 },
          g = {
            http: !0,
            https: !0,
            ftp: !0,
            gopher: !0,
            file: !0,
            "http:": !0,
            "https:": !0,
            "ftp:": !0,
            "gopher:": !0,
            "file:": !0,
          },
          m = r(5373);
        function b(t, e, r) {
          if (t && "object" == typeof t && t instanceof n) return t;
          var o = new n();
          return o.parse(t, e, r), o;
        }
        (n.prototype.parse = function (t, e, r) {
          if ("string" != typeof t)
            throw new TypeError(
              "Parameter 'url' must be a string, not " + typeof t
            );
          var n = t.indexOf("?"),
            i = -1 !== n && n < t.indexOf("#") ? "?" : "#",
            s = t.split(i);
          s[0] = s[0].replace(/\\/g, "/");
          var b = (t = s.join(i));
          if (((b = b.trim()), !r && 1 === t.split("#").length)) {
            var v = l.exec(b);
            if (v)
              return (
                (this.path = b),
                (this.href = b),
                (this.pathname = v[1]),
                v[2]
                  ? ((this.search = v[2]),
                    (this.query = e
                      ? m.parse(this.search.substr(1))
                      : this.search.substr(1)))
                  : e && ((this.search = ""), (this.query = {})),
                this
              );
          }
          var w = a.exec(b);
          if (w) {
            var S = (w = w[0]).toLowerCase();
            (this.protocol = S), (b = b.substr(w.length));
          }
          if (r || w || b.match(/^\/\/[^@/]+@[^@/]+/)) {
            var A = "//" === b.substr(0, 2);
            !A || (w && d[w]) || ((b = b.substr(2)), (this.slashes = !0));
          }
          if (!d[w] && (A || (w && !g[w]))) {
            for (var j, x, O = -1, P = 0; P < u.length; P++)
              -1 !== (E = b.indexOf(u[P])) && (-1 === O || E < O) && (O = E);
            for (
              -1 !==
                (x = -1 === O ? b.lastIndexOf("@") : b.lastIndexOf("@", O)) &&
                ((j = b.slice(0, x)),
                (b = b.slice(x + 1)),
                (this.auth = decodeURIComponent(j))),
                O = -1,
                P = 0;
              P < c.length;
              P++
            ) {
              var E;
              -1 !== (E = b.indexOf(c[P])) && (-1 === O || E < O) && (O = E);
            }
            -1 === O && (O = b.length),
              (this.host = b.slice(0, O)),
              (b = b.slice(O)),
              this.parseHost(),
              (this.hostname = this.hostname || "");
            var I =
              "[" === this.hostname[0] &&
              "]" === this.hostname[this.hostname.length - 1];
            if (!I)
              for (
                var U = this.hostname.split(/\./), k = ((P = 0), U.length);
                P < k;
                P++
              ) {
                var R = U[P];
                if (R && !R.match(f)) {
                  for (var D = "", F = 0, _ = R.length; F < _; F++)
                    R.charCodeAt(F) > 127 ? (D += "x") : (D += R[F]);
                  if (!D.match(f)) {
                    var T = U.slice(0, P),
                      C = U.slice(P + 1),
                      N = R.match(y);
                    N && (T.push(N[1]), C.unshift(N[2])),
                      C.length && (b = "/" + C.join(".") + b),
                      (this.hostname = T.join("."));
                    break;
                  }
                }
              }
            this.hostname.length > 255
              ? (this.hostname = "")
              : (this.hostname = this.hostname.toLowerCase()),
              I || (this.hostname = o.toASCII(this.hostname));
            var L = this.port ? ":" + this.port : "",
              M = this.hostname || "";
            (this.host = M + L),
              (this.href += this.host),
              I &&
                ((this.hostname = this.hostname.substr(
                  1,
                  this.hostname.length - 2
                )),
                "/" !== b[0] && (b = "/" + b));
          }
          if (!h[S])
            for (P = 0, k = p.length; P < k; P++) {
              var B = p[P];
              if (-1 !== b.indexOf(B)) {
                var W = encodeURIComponent(B);
                W === B && (W = escape(B)), (b = b.split(B).join(W));
              }
            }
          var q = b.indexOf("#");
          -1 !== q && ((this.hash = b.substr(q)), (b = b.slice(0, q)));
          var $ = b.indexOf("?");
          if (
            (-1 !== $
              ? ((this.search = b.substr($)),
                (this.query = b.substr($ + 1)),
                e && (this.query = m.parse(this.query)),
                (b = b.slice(0, $)))
              : e && ((this.search = ""), (this.query = {})),
            b && (this.pathname = b),
            g[S] && this.hostname && !this.pathname && (this.pathname = "/"),
            this.pathname || this.search)
          ) {
            L = this.pathname || "";
            var z = this.search || "";
            this.path = L + z;
          }
          return (this.href = this.format()), this;
        }),
          (n.prototype.format = function () {
            var t = this.auth || "";
            t &&
              ((t = (t = encodeURIComponent(t)).replace(/%3A/i, ":")),
              (t += "@"));
            var e = this.protocol || "",
              r = this.pathname || "",
              o = this.hash || "",
              n = !1,
              a = "";
            this.host
              ? (n = t + this.host)
              : this.hostname &&
                ((n =
                  t +
                  (-1 === this.hostname.indexOf(":")
                    ? this.hostname
                    : "[" + this.hostname + "]")),
                this.port && (n += ":" + this.port)),
              this.query &&
                "object" == typeof this.query &&
                Object.keys(this.query).length &&
                (a = m.stringify(this.query, {
                  arrayFormat: "repeat",
                  addQueryPrefix: !1,
                }));
            var i = this.search || (a && "?" + a) || "";
            return (
              e && ":" !== e.substr(-1) && (e += ":"),
              this.slashes || ((!e || g[e]) && !1 !== n)
                ? ((n = "//" + (n || "")),
                  r && "/" !== r.charAt(0) && (r = "/" + r))
                : n || (n = ""),
              o && "#" !== o.charAt(0) && (o = "#" + o),
              i && "?" !== i.charAt(0) && (i = "?" + i),
              e +
                n +
                (r = r.replace(/[?#]/g, function (t) {
                  return encodeURIComponent(t);
                })) +
                (i = i.replace("#", "%23")) +
                o
            );
          }),
          (n.prototype.resolve = function (t) {
            return this.resolveObject(b(t, !1, !0)).format();
          }),
          (n.prototype.resolveObject = function (t) {
            if ("string" == typeof t) {
              var e = new n();
              e.parse(t, !1, !0), (t = e);
            }
            for (
              var r = new n(), o = Object.keys(this), a = 0;
              a < o.length;
              a++
            ) {
              var i = o[a];
              r[i] = this[i];
            }
            if (((r.hash = t.hash), "" === t.href))
              return (r.href = r.format()), r;
            if (t.slashes && !t.protocol) {
              for (var l = Object.keys(t), s = 0; s < l.length; s++) {
                var p = l[s];
                "protocol" !== p && (r[p] = t[p]);
              }
              return (
                g[r.protocol] &&
                  r.hostname &&
                  !r.pathname &&
                  ((r.pathname = "/"), (r.path = r.pathname)),
                (r.href = r.format()),
                r
              );
            }
            if (t.protocol && t.protocol !== r.protocol) {
              if (!g[t.protocol]) {
                for (var c = Object.keys(t), u = 0; u < c.length; u++) {
                  var f = c[u];
                  r[f] = t[f];
                }
                return (r.href = r.format()), r;
              }
              if (((r.protocol = t.protocol), t.host || d[t.protocol]))
                r.pathname = t.pathname;
              else {
                for (
                  var y = (t.pathname || "").split("/");
                  y.length && !(t.host = y.shift());

                );
                t.host || (t.host = ""),
                  t.hostname || (t.hostname = ""),
                  "" !== y[0] && y.unshift(""),
                  y.length < 2 && y.unshift(""),
                  (r.pathname = y.join("/"));
              }
              if (
                ((r.search = t.search),
                (r.query = t.query),
                (r.host = t.host || ""),
                (r.auth = t.auth),
                (r.hostname = t.hostname || t.host),
                (r.port = t.port),
                r.pathname || r.search)
              ) {
                var h = r.pathname || "",
                  m = r.search || "";
                r.path = h + m;
              }
              return (
                (r.slashes = r.slashes || t.slashes), (r.href = r.format()), r
              );
            }
            var b = r.pathname && "/" === r.pathname.charAt(0),
              v = t.host || (t.pathname && "/" === t.pathname.charAt(0)),
              w = v || b || (r.host && t.pathname),
              S = w,
              A = (r.pathname && r.pathname.split("/")) || [],
              j =
                ((y = (t.pathname && t.pathname.split("/")) || []),
                r.protocol && !g[r.protocol]);
            if (
              (j &&
                ((r.hostname = ""),
                (r.port = null),
                r.host && ("" === A[0] ? (A[0] = r.host) : A.unshift(r.host)),
                (r.host = ""),
                t.protocol &&
                  ((t.hostname = null),
                  (t.port = null),
                  t.host && ("" === y[0] ? (y[0] = t.host) : y.unshift(t.host)),
                  (t.host = null)),
                (w = w && ("" === y[0] || "" === A[0]))),
              v)
            )
              (r.host = t.host || "" === t.host ? t.host : r.host),
                (r.hostname =
                  t.hostname || "" === t.hostname ? t.hostname : r.hostname),
                (r.search = t.search),
                (r.query = t.query),
                (A = y);
            else if (y.length)
              A || (A = []),
                A.pop(),
                (A = A.concat(y)),
                (r.search = t.search),
                (r.query = t.query);
            else if (null != t.search)
              return (
                j &&
                  ((r.host = A.shift()),
                  (r.hostname = r.host),
                  (I =
                    !!(r.host && r.host.indexOf("@") > 0) &&
                    r.host.split("@")) &&
                    ((r.auth = I.shift()),
                    (r.hostname = I.shift()),
                    (r.host = r.hostname))),
                (r.search = t.search),
                (r.query = t.query),
                (null === r.pathname && null === r.search) ||
                  (r.path =
                    (r.pathname ? r.pathname : "") +
                    (r.search ? r.search : "")),
                (r.href = r.format()),
                r
              );
            if (!A.length)
              return (
                (r.pathname = null),
                r.search ? (r.path = "/" + r.search) : (r.path = null),
                (r.href = r.format()),
                r
              );
            for (
              var x = A.slice(-1)[0],
                O =
                  ((r.host || t.host || A.length > 1) &&
                    ("." === x || ".." === x)) ||
                  "" === x,
                P = 0,
                E = A.length;
              E >= 0;
              E--
            )
              "." === (x = A[E])
                ? A.splice(E, 1)
                : ".." === x
                ? (A.splice(E, 1), P++)
                : P && (A.splice(E, 1), P--);
            if (!w && !S) for (; P--; P) A.unshift("..");
            !w ||
              "" === A[0] ||
              (A[0] && "/" === A[0].charAt(0)) ||
              A.unshift(""),
              O && "/" !== A.join("/").substr(-1) && A.push("");
            var I,
              U = "" === A[0] || (A[0] && "/" === A[0].charAt(0));
            return (
              j &&
                ((r.hostname = U ? "" : A.length ? A.shift() : ""),
                (r.host = r.hostname),
                (I =
                  !!(r.host && r.host.indexOf("@") > 0) && r.host.split("@")) &&
                  ((r.auth = I.shift()),
                  (r.hostname = I.shift()),
                  (r.host = r.hostname))),
              (w = w || (r.host && A.length)) && !U && A.unshift(""),
              A.length > 0
                ? (r.pathname = A.join("/"))
                : ((r.pathname = null), (r.path = null)),
              (null === r.pathname && null === r.search) ||
                (r.path =
                  (r.pathname ? r.pathname : "") + (r.search ? r.search : "")),
              (r.auth = t.auth || r.auth),
              (r.slashes = r.slashes || t.slashes),
              (r.href = r.format()),
              r
            );
          }),
          (n.prototype.parseHost = function () {
            var t = this.host,
              e = i.exec(t);
            e &&
              (":" !== (e = e[0]) && (this.port = e.substr(1)),
              (t = t.substr(0, t.length - e.length))),
              t && (this.hostname = t);
          }),
          (e.qg = b);
      },
      2634: () => {},
    },
    e = {};
  function r(o) {
    var n = e[o];
    if (void 0 !== n) return n.exports;
    var a = (e[o] = { id: o, loaded: !1, exports: {} });
    return t[o].call(a.exports, a, a.exports, r), (a.loaded = !0), a.exports;
  }
  (r.g = (function () {
    if ("object" == typeof globalThis) return globalThis;
    try {
      return this || new Function("return this")();
    } catch (t) {
      if ("object" == typeof window) return window;
    }
  })()),
    (r.nmd = (t) => ((t.paths = []), t.children || (t.children = []), t)),
    (() => {
      "use strict";
      function t(t, e, r) {
        "function" == typeof e && ((r = e), (e = void 0)),
          "function" != typeof r && (r = function () {}),
          chrome.runtime.sendMessage({ type: t, params: e || {} }, r);
      }
      var e = r(8835),
        o = [
          "portalLoginUrl",
          "legacyPortalSiteListUrl",
          "portalSiteListUrl",
          "portalSettingsUrl",
        ],
        n = ["portalSiteListUrl", "legacyPortalSiteListUrl"],
        a = {
          portalUrlPatterns: {
            formServiceStartLoginUrl:
              /\/form-service\/(internal\/testApps\/)?start\//i,
            formServiceLoginApiUrl:
              /\/form-service\/(internal\/testApps\/)?login\//i,
            portalStartLoginUrl: /\/(start|launch|client\/apps\/select)\/.*/i,
            portalLoginUrl: /^\/login2?\/?$/i,
            portalLogoutUrl: /^\/logout\/?$/i,
            legacyPortalSiteListUrl: /\/client\/apps\/?$/i,
            portalSiteListUrl: /\/portal\/?$/i,
            portalSettingsUrl: /\/(client\/settings|profile)($|\/.*)/i,
            portalSessionUrl: /\/sessions\/?$/i,
          },
          matchPatterns: function (t, e) {
            var r = null;
            try {
              r = new URL(e).origin;
            } catch (t) {
              return !1;
            }
            for (var o = 0; o < t.length; o++) if (t[o].test(r)) return !0;
            return !1;
          },
          isOneloginPortal: function (t) {
            return (
              !!t &&
              a.matchPatterns(
                [
                  /^https:\/\/(?!(www|api)\.)[a-z0-9.-]+\.onelogin\.com(:|#|\/|$|\?)/,
                  /^https?:\/\/(?!(www|api)\.)[a-z0-9.-]+\.onelogin\.local(:|#|\/|$|\?)/,
                  /^https:\/\/(?!(www|api)\.)[a-z0-9.-]+\.onelogin-shadow\d\d\.com(:|#|\/|$|\?)/,
                ],
                t.toLowerCase()
              )
            );
          },
          classifyPortalUrl: function (t) {
            var r,
              o = t ? e.qg(t) : void 0;
            if (t && o) {
              if (!a.isOneloginPortal(t)) return "notPortalUrl";
              for (r in a.portalUrlPatterns)
                if (a.portalUrlPatterns[r].test(o.pathname)) return r;
              return "otherPortalUrl";
            }
          },
          isProduction: function (t) {
            return /https?:\/\/.+\.onelogin\.com(:|\/|$)/.test(t);
          },
          filterAllPortalTabs: function (t) {
            return a._filterTabsByClasification(t, o);
          },
          filterPortalSiteTabs: function (t) {
            return a._filterTabsByClasification(t, n);
          },
          _filterTabsByClasification: function (t, e) {
            return t.filter(function (t) {
              var r = a.classifyPortalUrl(t.url);
              return -1 !== e.indexOf(r);
            });
          },
        };
      const i = a;
      function l(t, e) {
        var r = document.createElement("div");
        r.style = { innerHeight: "100%", innerWidth: "100%" };
        var o =
          '<div class="container">\n    <h1>Error Occurred</h1>\n    <div class="error-message">'
            .concat(t, '</div>\n    <div class="error-stack">\n      Name :  ')
            .concat(e.name, "\n\n      Status : ")
            .concat(e.status, "\n      \n      Message: ")
            .concat(
              e.serverMessage,
              "\n    </div>\n</div>\n\n<style>\n        body {\n            font-family: Arial, sans-serif;\n            background-color: #f8d7da;\n            color: #721c24;\n            margin: 0;\n            padding: 20px;\n        }\n        .container {\n            max-width: 600px;\n            margin: auto;\n            padding: 20px;\n            border: 1px solid #f5c6cb;\n            border-radius: 5px;\n            background-color: #fff;\n            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);\n        }\n        h1 {\n            font-size: 24px;\n            margin-bottom: 10px;\n        }\n        .error-message {\n            font-size: 18px;\n            margin-bottom: 20px;\n        }\n        .error-stack {\n            background-color: #f1f1f1;\n            border-left: 4px solid #dc3545;\n            padding: 10px;\n            white-space: pre-wrap; /* Preserves whitespace */\n            overflow-x: auto; /* Allows horizontal scrolling */\n        }\n    </style>"
            );
        (r.innerHTML = o), document.body.appendChild(r);
      }
      function s() {
        t("onelogin.initLogin", { startUrl: location.href }, function (t) {
          if (t && "ERROR" === t.status && t.data) {
            var e;
            switch (((document.body.innerHTML = ""), t.data.status)) {
              case 404:
                e = "The app does not exists";
                break;
              case 403:
                e = "Forbidden. You are not authorized to access the app";
                break;
              default:
                e = t.data.serverMessage || "Internal server error";
            }
            l(e, t.data);
            var r = t.data.details && t.data.details.loginTaskId;
            r &&
              l(
                "For communication with OneLogin support team, please reference this loginTaskId: ".concat(
                  r
                )
              );
          }
        });
      }
      var p = chrome.runtime.getManifest().version,
        c = "plugin_version";
      if (i.isOneloginPortal(window.location.toString()))
        switch (
          (console.log("ol_extension: portal detected"),
          i.classifyPortalUrl(window.location.toString()))
        ) {
          case "portalSiteListUrl":
          case "otherPortalUrl":
            console.log("ol_extension: portalSiteListUrl or otherPortalUrl"),
              window.addEventListener(
                "onelogin.portalEvent",
                function (e) {
                  console.log(
                    "ol_extension: event received from portal",
                    null == e ? void 0 : e.detail
                  ),
                    t("onelogin.portalMessage", e.detail, function (t) {
                      var r;
                      console.log(
                        "ol_extension: result for onelogin.portalMessage for event",
                        null == e || null === (r = e.detail) || void 0 === r
                          ? void 0
                          : r.type,
                        t
                      ),
                        t &&
                        "SUCCESS" == t.status &&
                        e.detail &&
                        e.detail.callbackName
                          ? window.dispatchEvent(
                              new CustomEvent(e.detail.callbackName, {
                                detail: JSON.stringify(t.data),
                              })
                            )
                          : window.dispatchEvent(
                              new CustomEvent(e.detail.callbackName, {
                                detail: JSON.stringify({}),
                              })
                            );
                    });
                },
                !0
              );
            break;
          case "formServiceStartLoginUrl":
            console.log("ol_extension: formServiceStartLoginUrl"),
              window.top === window &&
                ("loading" === document.readyState
                  ? document.addEventListener("DOMContentLoaded", s)
                  : s());
            break;
          case "portalStartLoginUrl":
            if (
              (console.log("ol_extension: portalStartLoginUrl"),
              window.top === window)
            ) {
              var u = window.location.href;
              (function (t, e) {
                return ~t.indexOf(e + "=");
              })(u, c) ||
                t("onelogin.getExtensionVersion", function (t) {
                  if (t && "SUCCESS" == !t.status) {
                    var e = (function (t, e, r) {
                      var o = new URL(t);
                      return o.searchParams.set(e, r), o.toString();
                    })(u, c, p);
                    window.location.href = e;
                  } else console.error("Error fetching onelogin.getExtensionVersion : ", t.data);
                });
            }
            break;
          default:
            console.log("ol_extension: portal not classified");
        }
    })();
})();
//# sourceMappingURL=contentPortal.js.map
