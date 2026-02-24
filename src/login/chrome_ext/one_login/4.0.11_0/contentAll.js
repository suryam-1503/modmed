/*! For license information please see contentAll.js.LICENSE.txt */
(() => {
  var t = {
      8075: (t, e, r) => {
        "use strict";
        var o = r(453),
          n = r(487),
          i = n(o("String.prototype.indexOf"));
        t.exports = function (t, e) {
          var r = o(t, !!e);
          return "function" == typeof r && i(t, ".prototype.") > -1 ? n(r) : r;
        };
      },
      487: (t, e, r) => {
        "use strict";
        var o = r(6743),
          n = r(453),
          i = r(6897),
          a = r(9675),
          l = n("%Function.prototype.apply%"),
          c = n("%Function.prototype.call%"),
          s = n("%Reflect.apply%", !0) || o.call(c, l),
          u = r(655),
          p = n("%Math.max%");
        t.exports = function (t) {
          if ("function" != typeof t) throw new a("a function is required");
          var e = s(o, c, arguments);
          return i(e, 1 + p(0, t.length - (arguments.length - 1)), !0);
        };
        var f = function () {
          return s(o, l, arguments);
        };
        u ? u(t.exports, "apply", { value: f }) : (t.exports.apply = f);
      },
      41: (t, e, r) => {
        "use strict";
        var o = r(655),
          n = r(8068),
          i = r(9675),
          a = r(5795);
        t.exports = function (t, e, r) {
          if (!t || ("object" != typeof t && "function" != typeof t))
            throw new i("`obj` must be an object or a function`");
          if ("string" != typeof e && "symbol" != typeof e)
            throw new i("`property` must be a string or a symbol`");
          if (
            arguments.length > 3 &&
            "boolean" != typeof arguments[3] &&
            null !== arguments[3]
          )
            throw new i(
              "`nonEnumerable`, if provided, must be a boolean or null"
            );
          if (
            arguments.length > 4 &&
            "boolean" != typeof arguments[4] &&
            null !== arguments[4]
          )
            throw new i(
              "`nonWritable`, if provided, must be a boolean or null"
            );
          if (
            arguments.length > 5 &&
            "boolean" != typeof arguments[5] &&
            null !== arguments[5]
          )
            throw new i(
              "`nonConfigurable`, if provided, must be a boolean or null"
            );
          if (arguments.length > 6 && "boolean" != typeof arguments[6])
            throw new i("`loose`, if provided, must be a boolean");
          var l = arguments.length > 3 ? arguments[3] : null,
            c = arguments.length > 4 ? arguments[4] : null,
            s = arguments.length > 5 ? arguments[5] : null,
            u = arguments.length > 6 && arguments[6],
            p = !!a && a(t, e);
          if (o)
            o(t, e, {
              configurable: null === s && p ? p.configurable : !s,
              enumerable: null === l && p ? p.enumerable : !l,
              value: r,
              writable: null === c && p ? p.writable : !c,
            });
          else {
            if (!u && (l || c || s))
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
            var i,
              a = (function (t) {
                for (var e = [], r = 1, o = 0; r < t.length; r += 1, o += 1)
                  e[o] = t[r];
                return e;
              })(arguments),
              l = r(0, n.length - a.length),
              c = [],
              s = 0;
            s < l;
            s++
          )
            c[s] = "$" + s;
          if (
            ((i = Function(
              "binder",
              "return function (" +
                (function (t) {
                  for (var e = "", r = 0; r < t.length; r += 1)
                    (e += t[r]), r + 1 < t.length && (e += ",");
                  return e;
                })(c) +
                "){ return binder.apply(this,arguments); }"
            )(function () {
              if (this instanceof i) {
                var e = n.apply(this, o(a, arguments));
                return Object(e) === e ? e : this;
              }
              return n.apply(t, o(a, arguments));
            })),
            n.prototype)
          ) {
            var u = function () {};
            (u.prototype = n.prototype),
              (i.prototype = new u()),
              (u.prototype = null);
          }
          return i;
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
          i = r(1237),
          a = r(9290),
          l = r(9538),
          c = r(8068),
          s = r(9675),
          u = r(5345),
          p = Function,
          f = function (t) {
            try {
              return p('"use strict"; return (' + t + ").constructor;")();
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
            throw new s();
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
          m = r(4039)(),
          g = r(24)(),
          v =
            Object.getPrototypeOf ||
            (g
              ? function (t) {
                  return t.__proto__;
                }
              : null),
          b = {},
          A = "undefined" != typeof Uint8Array && v ? v(Uint8Array) : o,
          w = {
            __proto__: null,
            "%AggregateError%":
              "undefined" == typeof AggregateError ? o : AggregateError,
            "%Array%": Array,
            "%ArrayBuffer%":
              "undefined" == typeof ArrayBuffer ? o : ArrayBuffer,
            "%ArrayIteratorPrototype%": m && v ? v([][Symbol.iterator]()) : o,
            "%AsyncFromSyncIteratorPrototype%": o,
            "%AsyncFunction%": b,
            "%AsyncGenerator%": b,
            "%AsyncGeneratorFunction%": b,
            "%AsyncIteratorPrototype%": b,
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
            "%EvalError%": i,
            "%Float32Array%":
              "undefined" == typeof Float32Array ? o : Float32Array,
            "%Float64Array%":
              "undefined" == typeof Float64Array ? o : Float64Array,
            "%FinalizationRegistry%":
              "undefined" == typeof FinalizationRegistry
                ? o
                : FinalizationRegistry,
            "%Function%": p,
            "%GeneratorFunction%": b,
            "%Int8Array%": "undefined" == typeof Int8Array ? o : Int8Array,
            "%Int16Array%": "undefined" == typeof Int16Array ? o : Int16Array,
            "%Int32Array%": "undefined" == typeof Int32Array ? o : Int32Array,
            "%isFinite%": isFinite,
            "%isNaN%": isNaN,
            "%IteratorPrototype%": m && v ? v(v([][Symbol.iterator]())) : o,
            "%JSON%": "object" == typeof JSON ? JSON : o,
            "%Map%": "undefined" == typeof Map ? o : Map,
            "%MapIteratorPrototype%":
              "undefined" != typeof Map && m && v
                ? v(new Map()[Symbol.iterator]())
                : o,
            "%Math%": Math,
            "%Number%": Number,
            "%Object%": Object,
            "%parseFloat%": parseFloat,
            "%parseInt%": parseInt,
            "%Promise%": "undefined" == typeof Promise ? o : Promise,
            "%Proxy%": "undefined" == typeof Proxy ? o : Proxy,
            "%RangeError%": a,
            "%ReferenceError%": l,
            "%Reflect%": "undefined" == typeof Reflect ? o : Reflect,
            "%RegExp%": RegExp,
            "%Set%": "undefined" == typeof Set ? o : Set,
            "%SetIteratorPrototype%":
              "undefined" != typeof Set && m && v
                ? v(new Set()[Symbol.iterator]())
                : o,
            "%SharedArrayBuffer%":
              "undefined" == typeof SharedArrayBuffer ? o : SharedArrayBuffer,
            "%String%": String,
            "%StringIteratorPrototype%": m && v ? v(""[Symbol.iterator]()) : o,
            "%Symbol%": m ? Symbol : o,
            "%SyntaxError%": c,
            "%ThrowTypeError%": d,
            "%TypedArray%": A,
            "%TypeError%": s,
            "%Uint8Array%": "undefined" == typeof Uint8Array ? o : Uint8Array,
            "%Uint8ClampedArray%":
              "undefined" == typeof Uint8ClampedArray ? o : Uint8ClampedArray,
            "%Uint16Array%":
              "undefined" == typeof Uint16Array ? o : Uint16Array,
            "%Uint32Array%":
              "undefined" == typeof Uint32Array ? o : Uint32Array,
            "%URIError%": u,
            "%WeakMap%": "undefined" == typeof WeakMap ? o : WeakMap,
            "%WeakRef%": "undefined" == typeof WeakRef ? o : WeakRef,
            "%WeakSet%": "undefined" == typeof WeakSet ? o : WeakSet,
          };
        if (v)
          try {
            null.error;
          } catch (t) {
            var S = v(v(t));
            w["%Error.prototype%"] = S;
          }
        var E = function t(e) {
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
              n && v && (r = v(n.prototype));
            }
            return (w[e] = r), r;
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
          j = r(6743),
          O = r(9957),
          P = j.call(Function.call, Array.prototype.concat),
          I = j.call(Function.apply, Array.prototype.splice),
          T = j.call(Function.call, String.prototype.replace),
          D = j.call(Function.call, String.prototype.slice),
          L = j.call(Function.call, RegExp.prototype.exec),
          R =
            /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g,
          k = /\\(\\)?/g,
          _ = function (t, e) {
            var r,
              o = t;
            if ((O(x, o) && (o = "%" + (r = x[o])[0] + "%"), O(w, o))) {
              var n = w[o];
              if ((n === b && (n = E(o)), void 0 === n && !e))
                throw new s(
                  "intrinsic " +
                    t +
                    "exists, but is not available. Please file an issue!"
                );
              return { alias: r, name: o, value: n };
            }
            throw new c("intrinsic " + t + "does not exist!");
          };
        t.exports = function (t, e) {
          if ("string" != typeof t || 0 === t.length)
            throw new s("intrinsic name must be a non-empty string");
          if (arguments.length > 1 && "boolean" != typeof e)
            throw new s('"allowMissing"argument must be a boolean');
          if (null === L(/^%?[^%]*%?$/, t))
            throw new c(
              "`%` may not be present anywhere but at the beginning and end of the intrinsic name"
            );
          var r = (function (t) {
              var e = D(t, 0, 1),
                r = D(t, -1);
              if ("%" === e && "%" !== r)
                throw new c("invalid intrinsic syntax, expected closing `%`");
              if ("%" === r && "%" !== e)
                throw new c("invalid intrinsic syntax, expected opening `%`");
              var o = [];
              return (
                T(t, R, function (t, e, r, n) {
                  o[o.length] = r ? T(n, k, "$1") : e || t;
                }),
                o
              );
            })(t),
            o = r.length > 0 ? r[0] : "",
            n = _("%" + o + "%", e),
            i = n.name,
            a = n.value,
            l = !1,
            u = n.alias;
          u && ((o = u[0]), I(r, P([0, 1], u)));
          for (var p = 1, f = !0; p < r.length; p += 1) {
            var h = r[p],
              d = D(h, 0, 1),
              m = D(h, -1);
            if (
              ('"' === d ||
                "'" === d ||
                "`" === d ||
                '"' === m ||
                "'" === m ||
                "`" === m) &&
              d !== m
            )
              throw new c(
                "property names with quotes must have matching quotes"
              );
            if (
              (("constructor" !== h && f) || (l = !0),
              O(w, (i = "%" + (o += "." + h) + "%")))
            )
              a = w[i];
            else if (null != a) {
              if (!(h in a)) {
                if (!e)
                  throw new s(
                    "base intrinsic for " +
                      t +
                      "exists, but the property is not available."
                  );
                return;
              }
              if (y && p + 1 >= r.length) {
                var g = y(a, h);
                a =
                  (f = !!g) && "get" in g && !("originalValue" in g.get)
                    ? g.get
                    : a[h];
              } else (f = O(a, h)), (a = a[h]);
              f && !l && (w[i] = a);
            }
          }
          return a;
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
          i = r(6743);
        t.exports = i.call(o, n);
      },
      8859: (t, e, r) => {
        var o = "function" == typeof Map && Map.prototype,
          n =
            Object.getOwnPropertyDescriptor && o
              ? Object.getOwnPropertyDescriptor(Map.prototype, "size")
              : null,
          i = o && n && "function" == typeof n.get ? n.get : null,
          a = o && Map.prototype.forEach,
          l = "function" == typeof Set && Set.prototype,
          c =
            Object.getOwnPropertyDescriptor && l
              ? Object.getOwnPropertyDescriptor(Set.prototype, "size")
              : null,
          s = l && c && "function" == typeof c.get ? c.get : null,
          u = l && Set.prototype.forEach,
          p =
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
          m = Function.prototype.toString,
          g = String.prototype.match,
          v = String.prototype.slice,
          b = String.prototype.replace,
          A = String.prototype.toUpperCase,
          w = String.prototype.toLowerCase,
          S = RegExp.prototype.test,
          E = Array.prototype.concat,
          x = Array.prototype.join,
          j = Array.prototype.slice,
          O = Math.floor,
          P = "function" == typeof BigInt ? BigInt.prototype.valueOf : null,
          I = Object.getOwnPropertySymbols,
          T =
            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
              ? Symbol.prototype.toString
              : null,
          D = "function" == typeof Symbol && "object" == typeof Symbol.iterator,
          L =
            "function" == typeof Symbol &&
            Symbol.toStringTag &&
            (Symbol.toStringTag, 1)
              ? Symbol.toStringTag
              : null,
          R = Object.prototype.propertyIsEnumerable,
          k =
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
            S.call(/e/, e)
          )
            return e;
          var r = /[0-9](?=(?:[0-9]{3})+(?![0-9]))/g;
          if ("number" == typeof t) {
            var o = t < 0 ? -O(-t) : O(t);
            if (o !== t) {
              var n = String(o),
                i = v.call(e, n.length + 1);
              return (
                b.call(n, r, "$&_") +
                "." +
                b.call(b.call(i, /([0-9]{3})/g, "$&_"), /_$/, "")
              );
            }
          }
          return b.call(e, r, "$&_");
        }
        var U = r(2634),
          C = U.custom,
          F = q(C) ? C : null;
        function M(t, e, r) {
          var o = "double" === (r.quoteStyle || e) ? '"' : "'";
          return o + t + o;
        }
        function N(t) {
          return b.call(String(t), /"/g, "&quot;");
        }
        function B(t) {
          return !(
            "[object Array]" !== V(t) ||
            (L && "object" == typeof t && L in t)
          );
        }
        function G(t) {
          return !(
            "[object RegExp]" !== V(t) ||
            (L && "object" == typeof t && L in t)
          );
        }
        function q(t) {
          if (D) return t && "object" == typeof t && t instanceof Symbol;
          if ("symbol" == typeof t) return !0;
          if (!t || "object" != typeof t || !T) return !1;
          try {
            return T.call(t), !0;
          } catch (t) {}
          return !1;
        }
        t.exports = function t(e, o, n, l) {
          var c = o || {};
          if (
            Y(c, "quoteStyle") &&
            "single" !== c.quoteStyle &&
            "double" !== c.quoteStyle
          )
            throw new TypeError(
              'option "quoteStyle"must be "single"or "double"'
            );
          if (
            Y(c, "maxStringLength") &&
            ("number" == typeof c.maxStringLength
              ? c.maxStringLength < 0 && c.maxStringLength !== 1 / 0
              : null !== c.maxStringLength)
          )
            throw new TypeError(
              'option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`'
            );
          var d = !Y(c, "customInspect") || c.customInspect;
          if ("boolean" != typeof d && "symbol" !== d)
            throw new TypeError(
              "option \"customInspect\", if provided, must be `true`, `false`, or `'symbol'`"
            );
          if (
            Y(c, "indent") &&
            null !== c.indent &&
            "\t" !== c.indent &&
            !(parseInt(c.indent, 10) === c.indent && c.indent > 0)
          )
            throw new TypeError(
              'option "indent"must be "\\t", an integer > 0, or `null`'
            );
          if (
            Y(c, "numericSeparator") &&
            "boolean" != typeof c.numericSeparator
          )
            throw new TypeError(
              'option "numericSeparator", if provided, must be `true` or `false`'
            );
          var A = c.numericSeparator;
          if (void 0 === e) return "undefined";
          if (null === e) return "null";
          if ("boolean" == typeof e) return e ? "true" : "false";
          if ("string" == typeof e) return H(e, c);
          if ("number" == typeof e) {
            if (0 === e) return 1 / 0 / e > 0 ? "0" : "-0";
            var S = String(e);
            return A ? _(e, S) : S;
          }
          if ("bigint" == typeof e) {
            var O = String(e) + "n";
            return A ? _(e, O) : O;
          }
          var I = void 0 === c.depth ? 5 : c.depth;
          if (
            (void 0 === n && (n = 0), n >= I && I > 0 && "object" == typeof e)
          )
            return B(e) ? "[Array]" : "[Object]";
          var C,
            W = (function (t, e) {
              var r;
              if ("\t" === t.indent) r = "\t";
              else {
                if (!("number" == typeof t.indent && t.indent > 0)) return null;
                r = x.call(Array(t.indent + 1), "");
              }
              return { base: r, prev: x.call(Array(e + 1), r) };
            })(c, n);
          if (void 0 === l) l = [];
          else if (z(l, e) >= 0) return "[Circular]";
          function J(e, r, o) {
            if ((r && (l = j.call(l)).push(r), o)) {
              var i = { depth: c.depth };
              return (
                Y(c, "quoteStyle") && (i.quoteStyle = c.quoteStyle),
                t(e, i, n + 1, l)
              );
            }
            return t(e, c, n + 1, l);
          }
          if ("function" == typeof e && !G(e)) {
            var tt = (function (t) {
                if (t.name) return t.name;
                var e = g.call(m.call(t), /^function\s*([\w$]+)/);
                return e ? e[1] : null;
              })(e),
              et = Z(e, J);
            return (
              "[Function" +
              (tt ? ": " + tt : "(anonymous)") +
              "]" +
              (et.length > 0 ? "{ " + x.call(et, ", ") + "}" : "")
            );
          }
          if (q(e)) {
            var rt = D
              ? b.call(String(e), /^(Symbol\(.*\))_[^)]*$/, "$1")
              : T.call(e);
            return "object" != typeof e || D ? rt : Q(rt);
          }
          if (
            (C = e) &&
            "object" == typeof C &&
            (("undefined" != typeof HTMLElement && C instanceof HTMLElement) ||
              ("string" == typeof C.nodeName &&
                "function" == typeof C.getAttribute))
          ) {
            for (
              var ot = "<" + w.call(String(e.nodeName)),
                nt = e.attributes || [],
                it = 0;
              it < nt.length;
              it++
            )
              ot += "" + nt[it].name + "=" + M(N(nt[it].value), "double", c);
            return (
              (ot += ">"),
              e.childNodes && e.childNodes.length && (ot += "..."),
              ot + "</" + w.call(String(e.nodeName)) + ">"
            );
          }
          if (B(e)) {
            if (0 === e.length) return "[]";
            var at = Z(e, J);
            return W &&
              !(function (t) {
                for (var e = 0; e < t.length; e++)
                  if (z(t[e], "\n") >= 0) return !1;
                return !0;
              })(at)
              ? "[" + $(at, W) + "]"
              : "[ " + x.call(at, ", ") + "]";
          }
          if (
            (function (t) {
              return !(
                "[object Error]" !== V(t) ||
                (L && "object" == typeof t && L in t)
              );
            })(e)
          ) {
            var lt = Z(e, J);
            return "cause" in Error.prototype ||
              !("cause" in e) ||
              R.call(e, "cause")
              ? 0 === lt.length
                ? "[" + String(e) + "]"
                : "{ [" + String(e) + "] " + x.call(lt, ", ") + "}"
              : "{ [" +
                  String(e) +
                  "] " +
                  x.call(E.call("[cause]: " + J(e.cause), lt), ", ") +
                  "}";
          }
          if ("object" == typeof e && d) {
            if (F && "function" == typeof e[F] && U)
              return U(e, { depth: I - n });
            if ("symbol" !== d && "function" == typeof e.inspect)
              return e.inspect();
          }
          if (
            (function (t) {
              if (!i || !t || "object" != typeof t) return !1;
              try {
                i.call(t);
                try {
                  s.call(t);
                } catch (t) {
                  return !0;
                }
                return t instanceof Map;
              } catch (t) {}
              return !1;
            })(e)
          ) {
            var ct = [];
            return (
              a &&
                a.call(e, function (t, r) {
                  ct.push(J(r, e, !0) + "=> " + J(t, e));
                }),
              X("Map", i.call(e), ct, W)
            );
          }
          if (
            (function (t) {
              if (!s || !t || "object" != typeof t) return !1;
              try {
                s.call(t);
                try {
                  i.call(t);
                } catch (t) {
                  return !0;
                }
                return t instanceof Set;
              } catch (t) {}
              return !1;
            })(e)
          ) {
            var st = [];
            return (
              u &&
                u.call(e, function (t) {
                  st.push(J(t, e));
                }),
              X("Set", s.call(e), st, W)
            );
          }
          if (
            (function (t) {
              if (!p || !t || "object" != typeof t) return !1;
              try {
                p.call(t, p);
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
            return K("WeakMap");
          if (
            (function (t) {
              if (!f || !t || "object" != typeof t) return !1;
              try {
                f.call(t, f);
                try {
                  p.call(t, p);
                } catch (t) {
                  return !0;
                }
                return t instanceof WeakSet;
              } catch (t) {}
              return !1;
            })(e)
          )
            return K("WeakSet");
          if (
            (function (t) {
              if (!y || !t || "object" != typeof t) return !1;
              try {
                return y.call(t), !0;
              } catch (t) {}
              return !1;
            })(e)
          )
            return K("WeakRef");
          if (
            (function (t) {
              return !(
                "[object Number]" !== V(t) ||
                (L && "object" == typeof t && L in t)
              );
            })(e)
          )
            return Q(J(Number(e)));
          if (
            (function (t) {
              if (!t || "object" != typeof t || !P) return !1;
              try {
                return P.call(t), !0;
              } catch (t) {}
              return !1;
            })(e)
          )
            return Q(J(P.call(e)));
          if (
            (function (t) {
              return !(
                "[object Boolean]" !== V(t) ||
                (L && "object" == typeof t && L in t)
              );
            })(e)
          )
            return Q(h.call(e));
          if (
            (function (t) {
              return !(
                "[object String]" !== V(t) ||
                (L && "object" == typeof t && L in t)
              );
            })(e)
          )
            return Q(J(String(e)));
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
                "[object Date]" !== V(t) ||
                (L && "object" == typeof t && L in t)
              );
            })(e) &&
            !G(e)
          ) {
            var ut = Z(e, J),
              pt = k
                ? k(e) === Object.prototype
                : e instanceof Object || e.constructor === Object,
              ft = e instanceof Object ? "" : "null prototype",
              yt =
                !pt && L && Object(e) === e && L in e
                  ? v.call(V(e), 8, -1)
                  : ft
                  ? "Object"
                  : "",
              ht =
                (pt || "function" != typeof e.constructor
                  ? ""
                  : e.constructor.name
                  ? e.constructor.name + ""
                  : "") +
                (yt || ft
                  ? "[" + x.call(E.call([], yt || [], ft || []), ": ") + "] "
                  : "");
            return 0 === ut.length
              ? ht + "{}"
              : W
              ? ht + "{" + $(ut, W) + "}"
              : ht + "{ " + x.call(ut, ", ") + "}";
          }
          return String(e);
        };
        var W =
          Object.prototype.hasOwnProperty ||
          function (t) {
            return t in this;
          };
        function Y(t, e) {
          return W.call(t, e);
        }
        function V(t) {
          return d.call(t);
        }
        function z(t, e) {
          if (t.indexOf) return t.indexOf(e);
          for (var r = 0, o = t.length; r < o; r++) if (t[r] === e) return r;
          return -1;
        }
        function H(t, e) {
          if (t.length > e.maxStringLength) {
            var r = t.length - e.maxStringLength,
              o = "... " + r + "more character" + (r > 1 ? "s" : "");
            return H(v.call(t, 0, e.maxStringLength), e) + o;
          }
          return M(
            b.call(b.call(t, /(['\\])/g, "\\$1"), /[\x00-\x1f]/g, J),
            "single",
            e
          );
        }
        function J(t) {
          var e = t.charCodeAt(0),
            r = { 8: "b", 9: "t", 10: "n", 12: "f", 13: "r" }[e];
          return r
            ? "\\" + r
            : "\\x" + (e < 16 ? "0" : "") + A.call(e.toString(16));
        }
        function Q(t) {
          return "Object(" + t + ")";
        }
        function K(t) {
          return t + "{ ? }";
        }
        function X(t, e, r, o) {
          return t + "(" + e + ") {" + (o ? $(r, o) : x.call(r, ", ")) + "}";
        }
        function $(t, e) {
          if (0 === t.length) return "";
          var r = "\n" + e.prev + e.base;
          return r + x.call(t, "," + r) + "\n" + e.prev;
        }
        function Z(t, e) {
          var r = B(t),
            o = [];
          if (r) {
            o.length = t.length;
            for (var n = 0; n < t.length; n++) o[n] = Y(t, n) ? e(t[n], t) : "";
          }
          var i,
            a = "function" == typeof I ? I(t) : [];
          if (D) {
            i = {};
            for (var l = 0; l < a.length; l++) i["$" + a[l]] = a[l];
          }
          for (var c in t)
            Y(t, c) &&
              ((r && String(Number(c)) === c && c < t.length) ||
                (D && i["$" + c] instanceof Symbol) ||
                (S.call(/[^\w$]/, c)
                  ? o.push(e(c, t) + ": " + e(t[c], t))
                  : o.push(c + ": " + e(t[c], t))));
          if ("function" == typeof I)
            for (var s = 0; s < a.length; s++)
              R.call(t, a[s]) && o.push("[" + e(a[s]) + "]: " + e(t[a[s]], t));
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
          i = r(4765);
        t.exports = { formats: i, parse: n, stringify: o };
      },
      2642: (t, e, r) => {
        "use strict";
        var o = r(7720),
          n = Object.prototype.hasOwnProperty,
          i = Array.isArray,
          a = {
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
          c = function (t, e) {
            return t && "string" == typeof t && e.comma && t.indexOf(",") > -1
              ? t.split(",")
              : t;
          },
          s = function (t, e, r, o) {
            if (t) {
              var i = r.allowDots ? t.replace(/\.([^.[]+)/g, "[$1]") : t,
                a = /(\[[^[\]]*])/g,
                l = r.depth > 0 && /(\[[^[\]]*])/.exec(i),
                s = l ? i.slice(0, l.index) : i,
                u = [];
              if (s) {
                if (
                  !r.plainObjects &&
                  n.call(Object.prototype, s) &&
                  !r.allowPrototypes
                )
                  return;
                u.push(s);
              }
              for (
                var p = 0;
                r.depth > 0 && null !== (l = a.exec(i)) && p < r.depth;

              ) {
                if (
                  ((p += 1),
                  !r.plainObjects &&
                    n.call(Object.prototype, l[1].slice(1, -1)) &&
                    !r.allowPrototypes)
                )
                  return;
                u.push(l[1]);
              }
              if (l) {
                if (!0 === r.strictDepth)
                  throw new RangeError(
                    "Input depth exceeded depth option of " +
                      r.depth +
                      "and strictDepth is true"
                  );
                u.push("[" + i.slice(l.index) + "]");
              }
              return (function (t, e, r, o) {
                for (var n = o ? e : c(e, r), i = t.length - 1; i >= 0; --i) {
                  var a,
                    l = t[i];
                  if ("[]" === l && r.parseArrays)
                    a =
                      r.allowEmptyArrays &&
                      ("" === n || (r.strictNullHandling && null === n))
                        ? []
                        : [].concat(n);
                  else {
                    a = r.plainObjects ? Object.create(null) : {};
                    var s =
                        "[" === l.charAt(0) && "]" === l.charAt(l.length - 1)
                          ? l.slice(1, -1)
                          : l,
                      u = r.decodeDotInKeys ? s.replace(/%2E/g, ".") : s,
                      p = parseInt(u, 10);
                    r.parseArrays || "" !== u
                      ? !isNaN(p) &&
                        l !== u &&
                        String(p) === u &&
                        p >= 0 &&
                        r.parseArrays &&
                        p <= r.arrayLimit
                        ? ((a = [])[p] = n)
                        : "__proto__" !== u && (a[u] = n)
                      : (a = { 0: n });
                  }
                  n = a;
                }
                return n;
              })(u, e, r, o);
            }
          };
        t.exports = function (t, e) {
          var r = (function (t) {
            if (!t) return a;
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
            var e = void 0 === t.charset ? a.charset : t.charset,
              r = void 0 === t.duplicates ? a.duplicates : t.duplicates;
            if ("combine" !== r && "first" !== r && "last" !== r)
              throw new TypeError(
                "The duplicates option must be either combine, first, or last"
              );
            return {
              allowDots:
                void 0 === t.allowDots
                  ? !0 === t.decodeDotInKeys || a.allowDots
                  : !!t.allowDots,
              allowEmptyArrays:
                "boolean" == typeof t.allowEmptyArrays
                  ? !!t.allowEmptyArrays
                  : a.allowEmptyArrays,
              allowPrototypes:
                "boolean" == typeof t.allowPrototypes
                  ? t.allowPrototypes
                  : a.allowPrototypes,
              allowSparse:
                "boolean" == typeof t.allowSparse
                  ? t.allowSparse
                  : a.allowSparse,
              arrayLimit:
                "number" == typeof t.arrayLimit ? t.arrayLimit : a.arrayLimit,
              charset: e,
              charsetSentinel:
                "boolean" == typeof t.charsetSentinel
                  ? t.charsetSentinel
                  : a.charsetSentinel,
              comma: "boolean" == typeof t.comma ? t.comma : a.comma,
              decodeDotInKeys:
                "boolean" == typeof t.decodeDotInKeys
                  ? t.decodeDotInKeys
                  : a.decodeDotInKeys,
              decoder: "function" == typeof t.decoder ? t.decoder : a.decoder,
              delimiter:
                "string" == typeof t.delimiter || o.isRegExp(t.delimiter)
                  ? t.delimiter
                  : a.delimiter,
              depth:
                "number" == typeof t.depth || !1 === t.depth
                  ? +t.depth
                  : a.depth,
              duplicates: r,
              ignoreQueryPrefix: !0 === t.ignoreQueryPrefix,
              interpretNumericEntities:
                "boolean" == typeof t.interpretNumericEntities
                  ? t.interpretNumericEntities
                  : a.interpretNumericEntities,
              parameterLimit:
                "number" == typeof t.parameterLimit
                  ? t.parameterLimit
                  : a.parameterLimit,
              parseArrays: !1 !== t.parseArrays,
              plainObjects:
                "boolean" == typeof t.plainObjects
                  ? t.plainObjects
                  : a.plainObjects,
              strictDepth:
                "boolean" == typeof t.strictDepth
                  ? !!t.strictDepth
                  : a.strictDepth,
              strictNullHandling:
                "boolean" == typeof t.strictNullHandling
                  ? t.strictNullHandling
                  : a.strictNullHandling,
            };
          })(e);
          if ("" === t || null == t)
            return r.plainObjects ? Object.create(null) : {};
          for (
            var u =
                "string" == typeof t
                  ? (function (t, e) {
                      var r = { __proto__: null },
                        s = e.ignoreQueryPrefix ? t.replace(/^\?/, "") : t;
                      s = s.replace(/%5B/gi, "[").replace(/%5D/gi, "]");
                      var u,
                        p =
                          e.parameterLimit === 1 / 0
                            ? void 0
                            : e.parameterLimit,
                        f = s.split(e.delimiter, p),
                        y = -1,
                        h = e.charset;
                      if (e.charsetSentinel)
                        for (u = 0; u < f.length; ++u)
                          0 === f[u].indexOf("utf8=") &&
                            ("utf8=%E2%9C%93" === f[u]
                              ? (h = "utf-8")
                              : "utf8=%26%2310003%3B" === f[u] &&
                                (h = "iso-8859-1"),
                            (y = u),
                            (u = f.length));
                      for (u = 0; u < f.length; ++u)
                        if (u !== y) {
                          var d,
                            m,
                            g = f[u],
                            v = g.indexOf("]="),
                            b = -1 === v ? g.indexOf("=") : v + 1;
                          -1 === b
                            ? ((d = e.decoder(g, a.decoder, h, "key")),
                              (m = e.strictNullHandling ? null : ""))
                            : ((d = e.decoder(
                                g.slice(0, b),
                                a.decoder,
                                h,
                                "key"
                              )),
                              (m = o.maybeMap(
                                c(g.slice(b + 1), e),
                                function (t) {
                                  return e.decoder(t, a.decoder, h, "value");
                                }
                              ))),
                            m &&
                              e.interpretNumericEntities &&
                              "iso-8859-1" === h &&
                              (m = l(m)),
                            g.indexOf("[]=") > -1 && (m = i(m) ? [m] : m);
                          var A = n.call(r, d);
                          A && "combine" === e.duplicates
                            ? (r[d] = o.combine(r[d], m))
                            : (A && "last" !== e.duplicates) || (r[d] = m);
                        }
                      return r;
                    })(t, r)
                  : t,
              p = r.plainObjects ? Object.create(null) : {},
              f = Object.keys(u),
              y = 0;
            y < f.length;
            ++y
          ) {
            var h = f[y],
              d = s(h, u[h], r, "string" == typeof t);
            p = o.merge(p, d, r);
          }
          return !0 === r.allowSparse ? p : o.compact(p);
        };
      },
      8636: (t, e, r) => {
        "use strict";
        var o = r(920),
          n = r(7720),
          i = r(4765),
          a = Object.prototype.hasOwnProperty,
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
          c = Array.isArray,
          s = Array.prototype.push,
          u = function (t, e) {
            s.apply(t, c(e) ? e : [e]);
          },
          p = Date.prototype.toISOString,
          f = i.default,
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
            formatter: i.formatters[f],
            indices: !1,
            serializeDate: function (t) {
              return p.call(t);
            },
            skipNulls: !1,
            strictNullHandling: !1,
          },
          h = {},
          d = function t(e, r, i, a, l, s, p, f, d, m, g, v, b, A, w, S, E, x) {
            for (
              var j, O = e, P = x, I = 0, T = !1;
              void 0 !== (P = P.get(h)) && !T;

            ) {
              var D = P.get(e);
              if (((I += 1), void 0 !== D)) {
                if (D === I) throw new RangeError("Cyclic object value");
                T = !0;
              }
              void 0 === P.get(h) && (I = 0);
            }
            if (
              ("function" == typeof m
                ? (O = m(r, O))
                : O instanceof Date
                ? (O = b(O))
                : "comma" === i &&
                  c(O) &&
                  (O = n.maybeMap(O, function (t) {
                    return t instanceof Date ? b(t) : t;
                  })),
              null === O)
            ) {
              if (s) return d && !S ? d(r, y.encoder, E, "key", A) : r;
              O = "";
            }
            if (
              "string" == typeof (j = O) ||
              "number" == typeof j ||
              "boolean" == typeof j ||
              "symbol" == typeof j ||
              "bigint" == typeof j ||
              n.isBuffer(O)
            )
              return d
                ? [
                    w(S ? r : d(r, y.encoder, E, "key", A)) +
                      "=" +
                      w(d(O, y.encoder, E, "value", A)),
                  ]
                : [w(r) + "=" + w(String(O))];
            var L,
              R = [];
            if (void 0 === O) return R;
            if ("comma" === i && c(O))
              S && d && (O = n.maybeMap(O, d)),
                (L = [{ value: O.length > 0 ? O.join(",") || null : void 0 }]);
            else if (c(m)) L = m;
            else {
              var k = Object.keys(O);
              L = g ? k.sort(g) : k;
            }
            var _ = f ? r.replace(/\./g, "%2E") : r,
              U = a && c(O) && 1 === O.length ? _ + "[]" : _;
            if (l && c(O) && 0 === O.length) return U + "[]";
            for (var C = 0; C < L.length; ++C) {
              var F = L[C],
                M = "object" == typeof F && void 0 !== F.value ? F.value : O[F];
              if (!p || null !== M) {
                var N = v && f ? F.replace(/\./g, "%2E") : F,
                  B = c(O)
                    ? "function" == typeof i
                      ? i(U, N)
                      : U
                    : U + (v ? "." + N : "[" + N + "]");
                x.set(e, I);
                var G = o();
                G.set(h, x),
                  u(
                    R,
                    t(
                      M,
                      B,
                      i,
                      a,
                      l,
                      s,
                      p,
                      f,
                      "comma" === i && S && c(O) ? null : d,
                      m,
                      g,
                      v,
                      b,
                      A,
                      w,
                      S,
                      E,
                      G
                    )
                  );
              }
            }
            return R;
          };
        t.exports = function (t, e) {
          var r,
            n = t,
            s = (function (t) {
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
              var r = i.default;
              if (void 0 !== t.format) {
                if (!a.call(i.formatters, t.format))
                  throw new TypeError("Unknown format option provided.");
                r = t.format;
              }
              var o,
                n = i.formatters[r],
                s = y.filter;
              if (
                (("function" == typeof t.filter || c(t.filter)) &&
                  (s = t.filter),
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
              var u =
                void 0 === t.allowDots
                  ? !0 === t.encodeDotInKeys || y.allowDots
                  : !!t.allowDots;
              return {
                addQueryPrefix:
                  "boolean" == typeof t.addQueryPrefix
                    ? t.addQueryPrefix
                    : y.addQueryPrefix,
                allowDots: u,
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
                filter: s,
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
          "function" == typeof s.filter
            ? (n = (0, s.filter)("", n))
            : c(s.filter) && (r = s.filter);
          var p = [];
          if ("object" != typeof n || null === n) return "";
          var f = l[s.arrayFormat],
            h = "comma" === f && s.commaRoundTrip;
          r || (r = Object.keys(n)), s.sort && r.sort(s.sort);
          for (var m = o(), g = 0; g < r.length; ++g) {
            var v = r[g];
            (s.skipNulls && null === n[v]) ||
              u(
                p,
                d(
                  n[v],
                  v,
                  f,
                  h,
                  s.allowEmptyArrays,
                  s.strictNullHandling,
                  s.skipNulls,
                  s.encodeDotInKeys,
                  s.encode ? s.encoder : null,
                  s.filter,
                  s.sort,
                  s.allowDots,
                  s.serializeDate,
                  s.format,
                  s.formatter,
                  s.encodeValuesOnly,
                  s.charset,
                  m
                )
              );
          }
          var b = p.join(s.delimiter),
            A = !0 === s.addQueryPrefix ? "?" : "";
          return (
            s.charsetSentinel &&
              ("iso-8859-1" === s.charset
                ? (A += "utf8=%26%2310003%3B&")
                : (A += "utf8=%E2%9C%93&")),
            b.length > 0 ? A + b : ""
          );
        };
      },
      7720: (t, e, r) => {
        "use strict";
        var o = r(4765),
          n = Object.prototype.hasOwnProperty,
          i = Array.isArray,
          a = (function () {
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
          c = 1024;
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
                var n = e[o], a = n.obj[n.prop], l = Object.keys(a), c = 0;
                c < l.length;
                ++c
              ) {
                var s = l[c],
                  u = a[s];
                "object" == typeof u &&
                  null !== u &&
                  -1 === r.indexOf(u) &&
                  (e.push({ obj: a, prop: s }), r.push(u));
              }
            return (
              (function (t) {
                for (; t.length > 1; ) {
                  var e = t.pop(),
                    r = e.obj[e.prop];
                  if (i(r)) {
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
          encode: function (t, e, r, n, i) {
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
            for (var s = "", u = 0; u < l.length; u += c) {
              for (
                var p = l.length >= c ? l.slice(u, u + c) : l, f = [], y = 0;
                y < p.length;
                ++y
              ) {
                var h = p.charCodeAt(y);
                45 === h ||
                46 === h ||
                95 === h ||
                126 === h ||
                (h >= 48 && h <= 57) ||
                (h >= 65 && h <= 90) ||
                (h >= 97 && h <= 122) ||
                (i === o.RFC1738 && (40 === h || 41 === h))
                  ? (f[f.length] = p.charAt(y))
                  : h < 128
                  ? (f[f.length] = a[h])
                  : h < 2048
                  ? (f[f.length] = a[192 | (h >> 6)] + a[128 | (63 & h)])
                  : h < 55296 || h >= 57344
                  ? (f[f.length] =
                      a[224 | (h >> 12)] +
                      a[128 | ((h >> 6) & 63)] +
                      a[128 | (63 & h)])
                  : ((y += 1),
                    (h =
                      65536 + (((1023 & h) << 10) | (1023 & p.charCodeAt(y)))),
                    (f[f.length] =
                      a[240 | (h >> 18)] +
                      a[128 | ((h >> 12) & 63)] +
                      a[128 | ((h >> 6) & 63)] +
                      a[128 | (63 & h)]));
              }
              s += f.join("");
            }
            return s;
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
            if (i(t)) {
              for (var r = [], o = 0; o < t.length; o += 1) r.push(e(t[o]));
              return r;
            }
            return e(t);
          },
          merge: function t(e, r, o) {
            if (!r) return e;
            if ("object" != typeof r) {
              if (i(e)) e.push(r);
              else {
                if (!e || "object" != typeof e) return [e, r];
                ((o && (o.plainObjects || o.allowPrototypes)) ||
                  !n.call(Object.prototype, r)) &&
                  (e[r] = !0);
              }
              return e;
            }
            if (!e || "object" != typeof e) return [e].concat(r);
            var a = e;
            return (
              i(e) && !i(r) && (a = l(e, o)),
              i(e) && i(r)
                ? (r.forEach(function (r, i) {
                    if (n.call(e, i)) {
                      var a = e[i];
                      a && "object" == typeof a && r && "object" == typeof r
                        ? (e[i] = t(a, r, o))
                        : e.push(r);
                    } else e[i] = r;
                  }),
                  e)
                : Object.keys(r).reduce(function (e, i) {
                    var a = r[i];
                    return (
                      n.call(e, i) ? (e[i] = t(e[i], a, o)) : (e[i] = a), e
                    );
                  }, a)
            );
          },
        };
      },
      6897: (t, e, r) => {
        "use strict";
        var o = r(453),
          n = r(41),
          i = r(592)(),
          a = r(5795),
          l = r(9675),
          c = o("%Math.floor%");
        t.exports = function (t, e) {
          if ("function" != typeof t) throw new l("`fn` is not a function");
          if ("number" != typeof e || e < 0 || e > 4294967295 || c(e) !== e)
            throw new l("`length` must be a positive 32-bit integer");
          var r = arguments.length > 2 && !!arguments[2],
            o = !0,
            s = !0;
          if ("length" in t && a) {
            var u = a(t, "length");
            u && !u.configurable && (o = !1), u && !u.writable && (s = !1);
          }
          return (
            (o || s || !r) &&
              (i ? n(t, "length", e, !0, !0) : n(t, "length", e)),
            t
          );
        };
      },
      920: (t, e, r) => {
        "use strict";
        var o = r(453),
          n = r(8075),
          i = r(8859),
          a = r(9675),
          l = o("%WeakMap%", !0),
          c = o("%Map%", !0),
          s = n("WeakMap.prototype.get", !0),
          u = n("WeakMap.prototype.set", !0),
          p = n("WeakMap.prototype.has", !0),
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
                  throw new a("Side channel does not contain " + i(t));
              },
              get: function (o) {
                if (
                  l &&
                  o &&
                  ("object" == typeof o || "function" == typeof o)
                ) {
                  if (t) return s(t, o);
                } else if (c) {
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
                  if (t) return p(t, o);
                } else if (c) {
                  if (e) return h(e, o);
                } else if (r)
                  return (function (t, e) {
                    return !!d(t, e);
                  })(r, o);
                return !1;
              },
              set: function (o, n) {
                l && o && ("object" == typeof o || "function" == typeof o)
                  ? (t || (t = new l()), u(t, o, n))
                  : c
                  ? (e || (e = new c()), y(e, o, n))
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
            var i,
              a = 2147483647,
              l = 36,
              c = /^xn--/,
              s = /[^\x20-\x7E]/,
              u = /[\x2E\u3002\uFF0E\uFF61]/g,
              p = {
                overflow: "Overflow: input needs wider integers to process",
                "not-basic": "Illegal input >= 0x80 (not a basic code point)",
                "invalid-input": "Invalid input",
              },
              f = Math.floor,
              y = String.fromCharCode;
            function h(t) {
              throw new RangeError(p[t]);
            }
            function d(t, e) {
              for (var r = t.length, o = []; r--; ) o[r] = e(t[r]);
              return o;
            }
            function m(t, e) {
              var r = t.split("@"),
                o = "";
              return (
                r.length > 1 && ((o = r[0] + "@"), (t = r[1])),
                o + d((t = t.replace(u, ".")).split("."), e).join(".")
              );
            }
            function g(t) {
              for (var e, r, o = [], n = 0, i = t.length; n < i; )
                (e = t.charCodeAt(n++)) >= 55296 && e <= 56319 && n < i
                  ? 56320 == (64512 & (r = t.charCodeAt(n++)))
                    ? o.push(((1023 & e) << 10) + (1023 & r) + 65536)
                    : (o.push(e), n--)
                  : o.push(e);
              return o;
            }
            function v(t) {
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
            function b(t, e) {
              return t + 22 + 75 * (t < 26) - ((0 != e) << 5);
            }
            function A(t, e, r) {
              var o = 0;
              for (t = r ? f(t / 700) : t >> 1, t += f(t / e); t > 455; o += l)
                t = f(t / 35);
              return f(o + (36 * t) / (t + 38));
            }
            function w(t) {
              var e,
                r,
                o,
                n,
                i,
                c,
                s,
                u,
                p,
                y,
                d,
                m = [],
                g = t.length,
                b = 0,
                w = 128,
                S = 72;
              for ((r = t.lastIndexOf("-")) < 0 && (r = 0), o = 0; o < r; ++o)
                t.charCodeAt(o) >= 128 && h("not-basic"),
                  m.push(t.charCodeAt(o));
              for (n = r > 0 ? r + 1 : 0; n < g; ) {
                for (
                  i = b, c = 1, s = l;
                  n >= g && h("invalid-input"),
                    ((u =
                      (d = t.charCodeAt(n++)) - 48 < 10
                        ? d - 22
                        : d - 65 < 26
                        ? d - 65
                        : d - 97 < 26
                        ? d - 97
                        : l) >= l ||
                      u > f((a - b) / c)) &&
                      h("overflow"),
                    (b += u * c),
                    !(u < (p = s <= S ? 1 : s >= S + 26 ? 26 : s - S));
                  s += l
                )
                  c > f(a / (y = l - p)) && h("overflow"), (c *= y);
                (S = A(b - i, (e = m.length + 1), 0 == i)),
                  f(b / e) > a - w && h("overflow"),
                  (w += f(b / e)),
                  (b %= e),
                  m.splice(b++, 0, w);
              }
              return v(m);
            }
            function S(t) {
              var e,
                r,
                o,
                n,
                i,
                c,
                s,
                u,
                p,
                d,
                m,
                v,
                w,
                S,
                E,
                x = [];
              for (
                v = (t = g(t)).length, e = 128, r = 0, i = 72, c = 0;
                c < v;
                ++c
              )
                (m = t[c]) < 128 && x.push(y(m));
              for (o = n = x.length, n && x.push("-"); o < v; ) {
                for (s = a, c = 0; c < v; ++c)
                  (m = t[c]) >= e && m < s && (s = m);
                for (
                  s - e > f((a - r) / (w = o + 1)) && h("overflow"),
                    r += (s - e) * w,
                    e = s,
                    c = 0;
                  c < v;
                  ++c
                )
                  if (((m = t[c]) < e && ++r > a && h("overflow"), m == e)) {
                    for (
                      u = r, p = l;
                      !(u < (d = p <= i ? 1 : p >= i + 26 ? 26 : p - i));
                      p += l
                    )
                      (E = u - d),
                        (S = l - d),
                        x.push(y(b(d + (E % S), 0))),
                        (u = f(E / S));
                    x.push(y(b(u, 0))), (i = A(r, w, o == n)), (r = 0), ++o;
                  }
                ++r, ++e;
              }
              return x.join("");
            }
            (i = {
              version: "1.4.1",
              ucs2: { decode: g, encode: v },
              decode: w,
              encode: S,
              toASCII: function (t) {
                return m(t, function (t) {
                  return s.test(t) ? "xn--" + S(t) : t;
                });
              },
              toUnicode: function (t) {
                return m(t, function (t) {
                  return c.test(t) ? w(t.slice(4).toLowerCase()) : t;
                });
              },
            }),
              void 0 ===
                (o = function () {
                  return i;
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
        var i = /^([a-z0-9.+-]+:)/i,
          a = /:[0-9]*$/,
          l = /^(\/\/?(?!\/)[^?\s]*)(\?[^\s]*)?$/,
          c = ["{", "}", "|", "\\", "^", "`"].concat([
            "<",
            ">",
            '"',
            "`",
            "",
            "\r",
            "\n",
            "\t",
          ]),
          s = ["'"].concat(c),
          u = ["%", "/", "?", ";", "#"].concat(s),
          p = ["/", "?", "#"],
          f = /^[+a-z0-9A-Z_-]{0,63}$/,
          y = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
          h = { javascript: !0, "javascript:": !0 },
          d = { javascript: !0, "javascript:": !0 },
          m = {
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
          g = r(5373);
        function v(t, e, r) {
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
            a = -1 !== n && n < t.indexOf("#") ? "?" : "#",
            c = t.split(a);
          c[0] = c[0].replace(/\\/g, "/");
          var v = (t = c.join(a));
          if (((v = v.trim()), !r && 1 === t.split("#").length)) {
            var b = l.exec(v);
            if (b)
              return (
                (this.path = v),
                (this.href = v),
                (this.pathname = b[1]),
                b[2]
                  ? ((this.search = b[2]),
                    (this.query = e
                      ? g.parse(this.search.substr(1))
                      : this.search.substr(1)))
                  : e && ((this.search = ""), (this.query = {})),
                this
              );
          }
          var A = i.exec(v);
          if (A) {
            var w = (A = A[0]).toLowerCase();
            (this.protocol = w), (v = v.substr(A.length));
          }
          if (r || A || v.match(/^\/\/[^@/]+@[^@/]+/)) {
            var S = "//" === v.substr(0, 2);
            !S || (A && d[A]) || ((v = v.substr(2)), (this.slashes = !0));
          }
          if (!d[A] && (S || (A && !m[A]))) {
            for (var E, x, j = -1, O = 0; O < p.length; O++)
              -1 !== (P = v.indexOf(p[O])) && (-1 === j || P < j) && (j = P);
            for (
              -1 !==
                (x = -1 === j ? v.lastIndexOf("@") : v.lastIndexOf("@", j)) &&
                ((E = v.slice(0, x)),
                (v = v.slice(x + 1)),
                (this.auth = decodeURIComponent(E))),
                j = -1,
                O = 0;
              O < u.length;
              O++
            ) {
              var P;
              -1 !== (P = v.indexOf(u[O])) && (-1 === j || P < j) && (j = P);
            }
            -1 === j && (j = v.length),
              (this.host = v.slice(0, j)),
              (v = v.slice(j)),
              this.parseHost(),
              (this.hostname = this.hostname || "");
            var I =
              "[" === this.hostname[0] &&
              "]" === this.hostname[this.hostname.length - 1];
            if (!I)
              for (
                var T = this.hostname.split(/\./), D = ((O = 0), T.length);
                O < D;
                O++
              ) {
                var L = T[O];
                if (L && !L.match(f)) {
                  for (var R = "", k = 0, _ = L.length; k < _; k++)
                    L.charCodeAt(k) > 127 ? (R += "x") : (R += L[k]);
                  if (!R.match(f)) {
                    var U = T.slice(0, O),
                      C = T.slice(O + 1),
                      F = L.match(y);
                    F && (U.push(F[1]), C.unshift(F[2])),
                      C.length && (v = "/" + C.join(".") + v),
                      (this.hostname = U.join("."));
                    break;
                  }
                }
              }
            this.hostname.length > 255
              ? (this.hostname = "")
              : (this.hostname = this.hostname.toLowerCase()),
              I || (this.hostname = o.toASCII(this.hostname));
            var M = this.port ? ":" + this.port : "",
              N = this.hostname || "";
            (this.host = N + M),
              (this.href += this.host),
              I &&
                ((this.hostname = this.hostname.substr(
                  1,
                  this.hostname.length - 2
                )),
                "/" !== v[0] && (v = "/" + v));
          }
          if (!h[w])
            for (O = 0, D = s.length; O < D; O++) {
              var B = s[O];
              if (-1 !== v.indexOf(B)) {
                var G = encodeURIComponent(B);
                G === B && (G = escape(B)), (v = v.split(B).join(G));
              }
            }
          var q = v.indexOf("#");
          -1 !== q && ((this.hash = v.substr(q)), (v = v.slice(0, q)));
          var W = v.indexOf("?");
          if (
            (-1 !== W
              ? ((this.search = v.substr(W)),
                (this.query = v.substr(W + 1)),
                e && (this.query = g.parse(this.query)),
                (v = v.slice(0, W)))
              : e && ((this.search = ""), (this.query = {})),
            v && (this.pathname = v),
            m[w] && this.hostname && !this.pathname && (this.pathname = "/"),
            this.pathname || this.search)
          ) {
            M = this.pathname || "";
            var Y = this.search || "";
            this.path = M + Y;
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
              i = "";
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
                (i = g.stringify(this.query, {
                  arrayFormat: "repeat",
                  addQueryPrefix: !1,
                }));
            var a = this.search || (i && "?" + i) || "";
            return (
              e && ":" !== e.substr(-1) && (e += ":"),
              this.slashes || ((!e || m[e]) && !1 !== n)
                ? ((n = "//" + (n || "")),
                  r && "/" !== r.charAt(0) && (r = "/" + r))
                : n || (n = ""),
              o && "#" !== o.charAt(0) && (o = "#" + o),
              a && "?" !== a.charAt(0) && (a = "?" + a),
              e +
                n +
                (r = r.replace(/[?#]/g, function (t) {
                  return encodeURIComponent(t);
                })) +
                (a = a.replace("#", "%23")) +
                o
            );
          }),
          (n.prototype.resolve = function (t) {
            return this.resolveObject(v(t, !1, !0)).format();
          }),
          (n.prototype.resolveObject = function (t) {
            if ("string" == typeof t) {
              var e = new n();
              e.parse(t, !1, !0), (t = e);
            }
            for (
              var r = new n(), o = Object.keys(this), i = 0;
              i < o.length;
              i++
            ) {
              var a = o[i];
              r[a] = this[a];
            }
            if (((r.hash = t.hash), "" === t.href))
              return (r.href = r.format()), r;
            if (t.slashes && !t.protocol) {
              for (var l = Object.keys(t), c = 0; c < l.length; c++) {
                var s = l[c];
                "protocol" !== s && (r[s] = t[s]);
              }
              return (
                m[r.protocol] &&
                  r.hostname &&
                  !r.pathname &&
                  ((r.pathname = "/"), (r.path = r.pathname)),
                (r.href = r.format()),
                r
              );
            }
            if (t.protocol && t.protocol !== r.protocol) {
              if (!m[t.protocol]) {
                for (var u = Object.keys(t), p = 0; p < u.length; p++) {
                  var f = u[p];
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
                  g = r.search || "";
                r.path = h + g;
              }
              return (
                (r.slashes = r.slashes || t.slashes), (r.href = r.format()), r
              );
            }
            var v = r.pathname && "/" === r.pathname.charAt(0),
              b = t.host || (t.pathname && "/" === t.pathname.charAt(0)),
              A = b || v || (r.host && t.pathname),
              w = A,
              S = (r.pathname && r.pathname.split("/")) || [],
              E =
                ((y = (t.pathname && t.pathname.split("/")) || []),
                r.protocol && !m[r.protocol]);
            if (
              (E &&
                ((r.hostname = ""),
                (r.port = null),
                r.host && ("" === S[0] ? (S[0] = r.host) : S.unshift(r.host)),
                (r.host = ""),
                t.protocol &&
                  ((t.hostname = null),
                  (t.port = null),
                  t.host && ("" === y[0] ? (y[0] = t.host) : y.unshift(t.host)),
                  (t.host = null)),
                (A = A && ("" === y[0] || "" === S[0]))),
              b)
            )
              (r.host = t.host || "" === t.host ? t.host : r.host),
                (r.hostname =
                  t.hostname || "" === t.hostname ? t.hostname : r.hostname),
                (r.search = t.search),
                (r.query = t.query),
                (S = y);
            else if (y.length)
              S || (S = []),
                S.pop(),
                (S = S.concat(y)),
                (r.search = t.search),
                (r.query = t.query);
            else if (null != t.search)
              return (
                E &&
                  ((r.host = S.shift()),
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
            if (!S.length)
              return (
                (r.pathname = null),
                r.search ? (r.path = "/" + r.search) : (r.path = null),
                (r.href = r.format()),
                r
              );
            for (
              var x = S.slice(-1)[0],
                j =
                  ((r.host || t.host || S.length > 1) &&
                    ("." === x || ".." === x)) ||
                  "" === x,
                O = 0,
                P = S.length;
              P >= 0;
              P--
            )
              "." === (x = S[P])
                ? S.splice(P, 1)
                : ".." === x
                ? (S.splice(P, 1), O++)
                : O && (S.splice(P, 1), O--);
            if (!A && !w) for (; O--; O) S.unshift("..");
            !A ||
              "" === S[0] ||
              (S[0] && "/" === S[0].charAt(0)) ||
              S.unshift(""),
              j && "/" !== S.join("/").substr(-1) && S.push("");
            var I,
              T = "" === S[0] || (S[0] && "/" === S[0].charAt(0));
            return (
              E &&
                ((r.hostname = T ? "" : S.length ? S.shift() : ""),
                (r.host = r.hostname),
                (I =
                  !!(r.host && r.host.indexOf("@") > 0) && r.host.split("@")) &&
                  ((r.auth = I.shift()),
                  (r.hostname = I.shift()),
                  (r.host = r.hostname))),
              (A = A || (r.host && S.length)) && !T && S.unshift(""),
              S.length > 0
                ? (r.pathname = S.join("/"))
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
              e = a.exec(t);
            e &&
              (":" !== (e = e[0]) && (this.port = e.substr(1)),
              (t = t.substr(0, t.length - e.length))),
              t && (this.hostname = t);
          }),
          (e.qg = v);
      },
      2634: () => {},
    },
    e = {};
  function r(o) {
    var n = e[o];
    if (void 0 !== n) return n.exports;
    var i = (e[o] = { id: o, loaded: !1, exports: {} });
    return t[o].call(i.exports, i, i.exports, r), (i.loaded = !0), i.exports;
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
        i = {
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
              i.matchPatterns(
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
              if (!i.isOneloginPortal(t)) return "notPortalUrl";
              for (r in i.portalUrlPatterns)
                if (i.portalUrlPatterns[r].test(o.pathname)) return r;
              return "otherPortalUrl";
            }
          },
          isProduction: function (t) {
            return /https?:\/\/.+\.onelogin\.com(:|\/|$)/.test(t);
          },
          filterAllPortalTabs: function (t) {
            return i._filterTabsByClasification(t, o);
          },
          filterPortalSiteTabs: function (t) {
            return i._filterTabsByClasification(t, n);
          },
          _filterTabsByClasification: function (t, e) {
            return t.filter(function (t) {
              var r = i.classifyPortalUrl(t.url);
              return -1 !== e.indexOf(r);
            });
          },
        };
      const a = i;
      function l(t, e) {
        return new Promise(function (r) {
          return setTimeout(r, t, e);
        });
      }
      function c(t) {
        return (
          (c =
            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
              ? function (t) {
                  return typeof t;
                }
              : function (t) {
                  return t &&
                    "function" == typeof Symbol &&
                    t.constructor === Symbol &&
                    t !== Symbol.prototype
                    ? "symbol"
                    : typeof t;
                }),
          c(t)
        );
      }
      const s = function () {
        var t,
          e,
          r,
          o = window,
          n = Date.now();
        function i() {
          "object" ===
            ("undefined" == typeof logger ? "undefined" : c(logger)) &&
            logger.log.apply(logger, arguments);
        }
        function a() {
          t = Date.now();
        }
        function l(e) {
          if (e) {
            if (e.target && "SCRIPT" === e.target.nodeName) return;
            i("modified: ", e.type, e.target);
          }
          t = Date.now();
        }
        "undefined" != typeof unsafeWindow && (o = unsafeWindow);
        var s,
          u = null;
        function p() {
          null !== u
            ? u.disconnect()
            : document.removeEventListener
            ? (document.removeEventListener("DOMNodeRemoved", l),
              document.removeEventListener("DOMNodeInserted", l))
            : document.detachEvent &&
              (document.detachEvent("DOMNodeRemoved", l),
              document.detachEvent("DOMNodeInserted", l));
        }
        function f() {
          var a = Date.now();
          if (r && Math.abs(a - r) < 13) {
            if (++e > 10)
              return i("by load ready"), (o.PTD_READY_STATE = !0), void p();
          } else e && i("fast cycles:", e), (e = 0);
          if (
            (!o.performance ||
              (o.performance.timing && o.performance.timing.loadEventEnd)) &&
            (a - n > 5e3 || a - t > 2e3)
          )
            return (
              i("sinceStartCheck:", a - n),
              i("lastDOMModifiedDiff:", a - t),
              i("idle"),
              (o.PTD_READY_STATE = !0),
              void p()
            );
          (r = a),
            setTimeout(function () {
              f();
            }, 10);
        }
        function y() {
          i("start checking ready state"),
            (o.PTD_READY_STATE = !1),
            l(),
            window.MutationObserver && "function" == typeof MutationObserver
              ? (u = new MutationObserver(a)).observe(document, {
                  childList: !0,
                  characterData: !0,
                  subtree: !0,
                })
              : document.addEventListener
              ? (document.addEventListener("DOMNodeRemoved", l),
                document.addEventListener("DOMNodeInserted", l))
              : document.attachEvent &&
                (document.attachEvent("DOMNodeRemoved", l),
                document.attachEvent("DOMNodeInserted", l)),
            f();
        }
        function h() {
          "complete" === document.readyState &&
            (document.removeEventListener
              ? document.removeEventListener("readystatechange", h)
              : document.detachEvent &&
                document.detachEvent("readystatechange", h),
            y());
        }
        return (
          (s = !1),
          "boolean" == typeof o.PTD_READY_STATE
            ? ((s = o.PTD_READY_STATE),
              o.PTD_READY_STATE && delete o.PTD_READY_STATE)
            : ((o.PTD_READY_STATE = !1),
              "complete" === document.readyState
                ? y()
                : (i("waiting for ready"),
                  document.addEventListener
                    ? document.addEventListener("readystatechange", h)
                    : document.attachEvent &&
                      document.attachEvent("readystatechange", h))),
          s
        );
      };
      function u(t) {
        return (
          (u =
            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
              ? function (t) {
                  return typeof t;
                }
              : function (t) {
                  return t &&
                    "function" == typeof Symbol &&
                    t.constructor === Symbol &&
                    t !== Symbol.prototype
                    ? "symbol"
                    : typeof t;
                }),
          u(t)
        );
      }
      function p() {
        p = function () {
          return e;
        };
        var t,
          e = {},
          r = Object.prototype,
          o = r.hasOwnProperty,
          n =
            Object.defineProperty ||
            function (t, e, r) {
              t[e] = r.value;
            },
          i = "function" == typeof Symbol ? Symbol : {},
          a = i.iterator || "@@iterator",
          l = i.asyncIterator || "@@asyncIterator",
          c = i.toStringTag || "@@toStringTag";
        function s(t, e, r) {
          return (
            Object.defineProperty(t, e, {
              value: r,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            }),
            t[e]
          );
        }
        try {
          s({}, "");
        } catch (t) {
          s = function (t, e, r) {
            return (t[e] = r);
          };
        }
        function f(t, e, r, o) {
          var i = e && e.prototype instanceof b ? e : b,
            a = Object.create(i.prototype),
            l = new R(o || []);
          return n(a, "_invoke", { value: I(t, r, l) }), a;
        }
        function y(t, e, r) {
          try {
            return { type: "normal", arg: t.call(e, r) };
          } catch (t) {
            return { type: "throw", arg: t };
          }
        }
        e.wrap = f;
        var h = "suspendedStart",
          d = "suspendedYield",
          m = "executing",
          g = "completed",
          v = {};
        function b() {}
        function A() {}
        function w() {}
        var S = {};
        s(S, a, function () {
          return this;
        });
        var E = Object.getPrototypeOf,
          x = E && E(E(k([])));
        x && x !== r && o.call(x, a) && (S = x);
        var j = (w.prototype = b.prototype = Object.create(S));
        function O(t) {
          ["next", "throw", "return"].forEach(function (e) {
            s(t, e, function (t) {
              return this._invoke(e, t);
            });
          });
        }
        function P(t, e) {
          function r(n, i, a, l) {
            var c = y(t[n], t, i);
            if ("throw" !== c.type) {
              var s = c.arg,
                p = s.value;
              return p && "object" == u(p) && o.call(p, "__await")
                ? e.resolve(p.__await).then(
                    function (t) {
                      r("next", t, a, l);
                    },
                    function (t) {
                      r("throw", t, a, l);
                    }
                  )
                : e.resolve(p).then(
                    function (t) {
                      (s.value = t), a(s);
                    },
                    function (t) {
                      return r("throw", t, a, l);
                    }
                  );
            }
            l(c.arg);
          }
          var i;
          n(this, "_invoke", {
            value: function (t, o) {
              function n() {
                return new e(function (e, n) {
                  r(t, o, e, n);
                });
              }
              return (i = i ? i.then(n, n) : n());
            },
          });
        }
        function I(e, r, o) {
          var n = h;
          return function (i, a) {
            if (n === m) throw Error("Generator is already running");
            if (n === g) {
              if ("throw" === i) throw a;
              return { value: t, done: !0 };
            }
            for (o.method = i, o.arg = a; ; ) {
              var l = o.delegate;
              if (l) {
                var c = T(l, o);
                if (c) {
                  if (c === v) continue;
                  return c;
                }
              }
              if ("next" === o.method) o.sent = o._sent = o.arg;
              else if ("throw" === o.method) {
                if (n === h) throw ((n = g), o.arg);
                o.dispatchException(o.arg);
              } else "return" === o.method && o.abrupt("return", o.arg);
              n = m;
              var s = y(e, r, o);
              if ("normal" === s.type) {
                if (((n = o.done ? g : d), s.arg === v)) continue;
                return { value: s.arg, done: o.done };
              }
              "throw" === s.type &&
                ((n = g), (o.method = "throw"), (o.arg = s.arg));
            }
          };
        }
        function T(e, r) {
          var o = r.method,
            n = e.iterator[o];
          if (n === t)
            return (
              (r.delegate = null),
              ("throw" === o &&
                e.iterator.return &&
                ((r.method = "return"),
                (r.arg = t),
                T(e, r),
                "throw" === r.method)) ||
                ("return" !== o &&
                  ((r.method = "throw"),
                  (r.arg = new TypeError(
                    "The iterator does not provide a '" + o + "' method"
                  )))),
              v
            );
          var i = y(n, e.iterator, r.arg);
          if ("throw" === i.type)
            return (
              (r.method = "throw"), (r.arg = i.arg), (r.delegate = null), v
            );
          var a = i.arg;
          return a
            ? a.done
              ? ((r[e.resultName] = a.value),
                (r.next = e.nextLoc),
                "return" !== r.method && ((r.method = "next"), (r.arg = t)),
                (r.delegate = null),
                v)
              : a
            : ((r.method = "throw"),
              (r.arg = new TypeError("iterator result is not an object")),
              (r.delegate = null),
              v);
        }
        function D(t) {
          var e = { tryLoc: t[0] };
          1 in t && (e.catchLoc = t[1]),
            2 in t && ((e.finallyLoc = t[2]), (e.afterLoc = t[3])),
            this.tryEntries.push(e);
        }
        function L(t) {
          var e = t.completion || {};
          (e.type = "normal"), delete e.arg, (t.completion = e);
        }
        function R(t) {
          (this.tryEntries = [{ tryLoc: "root" }]),
            t.forEach(D, this),
            this.reset(!0);
        }
        function k(e) {
          if (e || "" === e) {
            var r = e[a];
            if (r) return r.call(e);
            if ("function" == typeof e.next) return e;
            if (!isNaN(e.length)) {
              var n = -1,
                i = function r() {
                  for (; ++n < e.length; )
                    if (o.call(e, n)) return (r.value = e[n]), (r.done = !1), r;
                  return (r.value = t), (r.done = !0), r;
                };
              return (i.next = i);
            }
          }
          throw new TypeError(u(e) + "is not iterable");
        }
        return (
          (A.prototype = w),
          n(j, "constructor", { value: w, configurable: !0 }),
          n(w, "constructor", { value: A, configurable: !0 }),
          (A.displayName = s(w, c, "GeneratorFunction")),
          (e.isGeneratorFunction = function (t) {
            var e = "function" == typeof t && t.constructor;
            return (
              !!e &&
              (e === A || "GeneratorFunction" === (e.displayName || e.name))
            );
          }),
          (e.mark = function (t) {
            return (
              Object.setPrototypeOf
                ? Object.setPrototypeOf(t, w)
                : ((t.__proto__ = w), s(t, c, "GeneratorFunction")),
              (t.prototype = Object.create(j)),
              t
            );
          }),
          (e.awrap = function (t) {
            return { __await: t };
          }),
          O(P.prototype),
          s(P.prototype, l, function () {
            return this;
          }),
          (e.AsyncIterator = P),
          (e.async = function (t, r, o, n, i) {
            void 0 === i && (i = Promise);
            var a = new P(f(t, r, o, n), i);
            return e.isGeneratorFunction(r)
              ? a
              : a.next().then(function (t) {
                  return t.done ? t.value : a.next();
                });
          }),
          O(j),
          s(j, c, "Generator"),
          s(j, a, function () {
            return this;
          }),
          s(j, "toString", function () {
            return "[object Generator]";
          }),
          (e.keys = function (t) {
            var e = Object(t),
              r = [];
            for (var o in e) r.push(o);
            return (
              r.reverse(),
              function t() {
                for (; r.length; ) {
                  var o = r.pop();
                  if (o in e) return (t.value = o), (t.done = !1), t;
                }
                return (t.done = !0), t;
              }
            );
          }),
          (e.values = k),
          (R.prototype = {
            constructor: R,
            reset: function (e) {
              if (
                ((this.prev = 0),
                (this.next = 0),
                (this.sent = this._sent = t),
                (this.done = !1),
                (this.delegate = null),
                (this.method = "next"),
                (this.arg = t),
                this.tryEntries.forEach(L),
                !e)
              )
                for (var r in this)
                  "t" === r.charAt(0) &&
                    o.call(this, r) &&
                    !isNaN(+r.slice(1)) &&
                    (this[r] = t);
            },
            stop: function () {
              this.done = !0;
              var t = this.tryEntries[0].completion;
              if ("throw" === t.type) throw t.arg;
              return this.rval;
            },
            dispatchException: function (e) {
              if (this.done) throw e;
              var r = this;
              function n(o, n) {
                return (
                  (l.type = "throw"),
                  (l.arg = e),
                  (r.next = o),
                  n && ((r.method = "next"), (r.arg = t)),
                  !!n
                );
              }
              for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                var a = this.tryEntries[i],
                  l = a.completion;
                if ("root" === a.tryLoc) return n("end");
                if (a.tryLoc <= this.prev) {
                  var c = o.call(a, "catchLoc"),
                    s = o.call(a, "finallyLoc");
                  if (c && s) {
                    if (this.prev < a.catchLoc) return n(a.catchLoc, !0);
                    if (this.prev < a.finallyLoc) return n(a.finallyLoc);
                  } else if (c) {
                    if (this.prev < a.catchLoc) return n(a.catchLoc, !0);
                  } else {
                    if (!s)
                      throw Error("try statement without catch or finally");
                    if (this.prev < a.finallyLoc) return n(a.finallyLoc);
                  }
                }
              }
            },
            abrupt: function (t, e) {
              for (var r = this.tryEntries.length - 1; r >= 0; --r) {
                var n = this.tryEntries[r];
                if (
                  n.tryLoc <= this.prev &&
                  o.call(n, "finallyLoc") &&
                  this.prev < n.finallyLoc
                ) {
                  var i = n;
                  break;
                }
              }
              i &&
                ("break" === t || "continue" === t) &&
                i.tryLoc <= e &&
                e <= i.finallyLoc &&
                (i = null);
              var a = i ? i.completion : {};
              return (
                (a.type = t),
                (a.arg = e),
                i
                  ? ((this.method = "next"), (this.next = i.finallyLoc), v)
                  : this.complete(a)
              );
            },
            complete: function (t, e) {
              if ("throw" === t.type) throw t.arg;
              return (
                "break" === t.type || "continue" === t.type
                  ? (this.next = t.arg)
                  : "return" === t.type
                  ? ((this.rval = this.arg = t.arg),
                    (this.method = "return"),
                    (this.next = "end"))
                  : "normal" === t.type && e && (this.next = e),
                v
              );
            },
            finish: function (t) {
              for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                var r = this.tryEntries[e];
                if (r.finallyLoc === t)
                  return this.complete(r.completion, r.afterLoc), L(r), v;
              }
            },
            catch: function (t) {
              for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                var r = this.tryEntries[e];
                if (r.tryLoc === t) {
                  var o = r.completion;
                  if ("throw" === o.type) {
                    var n = o.arg;
                    L(r);
                  }
                  return n;
                }
              }
              throw Error("illegal catch attempt");
            },
            delegateYield: function (e, r, o) {
              return (
                (this.delegate = { iterator: k(e), resultName: r, nextLoc: o }),
                "next" === this.method && (this.arg = t),
                v
              );
            },
          }),
          e
        );
      }
      function f(t, e, r, o, n, i, a) {
        try {
          var l = t[i](a),
            c = l.value;
        } catch (t) {
          return void r(t);
        }
        l.done ? e(c) : Promise.resolve(c).then(o, n);
      }
      function y(t) {
        return function () {
          var e = this,
            r = arguments;
          return new Promise(function (o, n) {
            var i = t.apply(e, r);
            function a(t) {
              f(i, o, n, a, l, "next", t);
            }
            function l(t) {
              f(i, o, n, a, l, "throw", t);
            }
            a(void 0);
          });
        };
      }
      function h() {
        return (
          (h = y(
            p().mark(function t() {
              var e, r;
              return p().wrap(function (t) {
                for (;;)
                  switch ((t.prev = t.next)) {
                    case 0:
                      return (
                        (r = function () {
                          return (r = y(
                            p().mark(function t() {
                              return p().wrap(
                                function (t) {
                                  for (;;)
                                    switch ((t.prev = t.next)) {
                                      case 0:
                                        if (((t.prev = 0), !s())) {
                                          t.next = 7;
                                          break;
                                        }
                                        return (t.next = 4), l(0);
                                      case 4:
                                        return t.abrupt("return");
                                      case 7:
                                        return (t.next = 9), l(100);
                                      case 9:
                                        return (t.next = 11), e();
                                      case 11:
                                        t.next = 18;
                                        break;
                                      case 13:
                                        return (
                                          (t.prev = 13),
                                          (t.t0 = t.catch(0)),
                                          (t.next = 17),
                                          l(0)
                                        );
                                      case 17:
                                        throw t.t0;
                                      case 18:
                                      case "end":
                                        return t.stop();
                                    }
                                },
                                t,
                                null,
                                [[0, 13]]
                              );
                            })
                          )).apply(this, arguments);
                        }),
                        (e = function () {
                          return r.apply(this, arguments);
                        }),
                        (t.next = 4),
                        e()
                      );
                    case 4:
                    case "end":
                      return t.stop();
                  }
              }, t);
            })
          )),
          h.apply(this, arguments)
        );
      }
      var d = !1;
      function m(t) {
        (t = t || window.event).stopPropagation
          ? t.stopPropagation()
          : (t.cancelBubble = !0);
      }
      var g = window.location.toString();
      window.top === window &&
        (a.isOneloginPortal(g) ||
          t("onelogin.currentContext", function (e) {
            var r = e.data.extensionUrl;
            g.includes(r) ||
              t("onelogin.isLoginProcessActive", function (e) {
                e &&
                  "SUCCESS" == e.status &&
                  (function () {
                    return h.apply(this, arguments);
                  })()
                    .then(function () {
                      !(function () {
                        function t(t) {
                          var e = t.querySelectorAll("input[type=password]");
                          return e.length > 0 && (console.dir(e), !0);
                        }
                        return function (e, r) {
                          t(e)
                            ? r(!0)
                            : (function (t, e, r) {
                                var o,
                                  n = t.length,
                                  i = 0;
                                function a(t) {
                                  try {
                                    e(t) ? r(!0) : ++i === n && r(!1);
                                  } catch (t) {
                                    ++i === n && r(!1);
                                  }
                                }
                                n || r(!1);
                                for (var l = 0; l < n; l++)
                                  (o = t[l].contentDocument) &&
                                  "complete" === o.readyState
                                    ? a(o.body)
                                    : t[l].addEventListener(
                                        "load",
                                        function () {
                                          a(this.contentDocument.body);
                                        }
                                      );
                              })(
                                (function (t) {
                                  for (
                                    var e = t.getElementsByTagName("iframe"),
                                      r = [],
                                      o = 0;
                                    o < e.length;
                                    o++
                                  )
                                    try {
                                      e[o].contentDocument && r.push(e[o]);
                                    } catch (t) {}
                                  return r;
                                })(e),
                                t,
                                r
                              );
                        };
                      })()(document.body, function (e) {
                        e &&
                          t("onelogin.getUserSettings", function (e) {
                            if (e && "SUCCESS" == e.status) {
                              var r = e.data;
                              r && r.tab_enabled
                                ? t("onelogin.getServerInfo", function (r) {
                                    t(
                                      "onelogin.getTrainerDialogInfo",
                                      {
                                        currentLocation: g,
                                        serverUrl: r.data.serverUrl,
                                      },
                                      function (o) {
                                        o && "SUCCESS" == o.status
                                          ? (function (t, e, r, o) {
                                              if (!d) {
                                                d = !0;
                                                var n = window.document;
                                                if (
                                                  !n.cookie.match(
                                                    "ol_close_add_app=true"
                                                  )
                                                ) {
                                                  var i,
                                                    a =
                                                      (((i =
                                                        document.createElement(
                                                          "div"
                                                        )).style.position =
                                                        "fixed"),
                                                      (i.style.top = "0px"),
                                                      (i.style.left = "0px"),
                                                      (i.style["z-index"] =
                                                        "999999"),
                                                      (i.innerHTML =
                                                        '<div id="train_add_app_tab"title="OneLogin Actions"style="background-image:url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAAsSAAALEgHS3X78AAADwklEQVRo3u2ZUWxTVRzGf7erpYy22ViKa7NGJMwHjYtbmQLZSkfUqVH6ANl4MCHZg2/jAWmWaHwwshHiILAnY8i0hsRubJGSLBNIYChKsJJgCUQ2Y4plvR3LpJhl1JquPpBdiXJ7e7nXtTT9kr58Pfe753fP6f/+TyowFM1SAjIUegJlkDJIkatkQIx6BxoE8Dkr2eGqpG2NGYe5AgAxleHc7RQjsQVC8QUWda6Vgp7l111tYrC5hoYqU85xkWSarvAcl++k9XuAegVtc67kwtZaRQiAhioTF7bWss25srhA3NUmhjbZMVcIeV9jrhAY2mTHXa0MviwgBgEGm2tUQTwIM9hcg0H9pfqD+JyVeW0nOTVUmfA5KwsPssP18En8lEzTeFqUPt/O/qk6Q400l9+2NeaH+sm/FrmS/Kcq/Z7OqM5QI80rsvSe+Lfc1SuYaHuSF/LYdnIZywoiJ4tRYIvdTJVpeZoHzXcRUxmtEbpkaAY5dzuleRJ6ZGgGGYkt5Px+zzM2Djeuxr16xSNn5CPNVSsUXyCSTMu+S95SaEMiyTShuHYQzSuymIWu8BypjPreM5XJ0hWe06UT1qWkXL6TpvPirCqYVCZL58VZ3Tpg3Wrjyfg9Ws4miCSVJxZJpmk5m+Bk/J5et9f3PAIlcrAqpErmzF4GKTaVQYpNQt1Tz5arVjGpDFJsKoMUmzSBuJuep8ffnbdftCD169fh9Xry9v9P5Tzq9vi78Xo9zM/Pc/To55w6cx5XnQP/3t04HLVMTk5JY+V8pbyBw/uZno6zYUMTopjg4/4BYrdEevzd2GxWnE4HAMHgCKfOnJeda84VuXv3DwKBY0xOTrG/70MADh3sw2q1MDp6Ak9rizRWzlfKq69fj9frYXT0BFarhUMH+wCw2ay8/tqrXLr0I/G4yMCR/kdfEZ/vTSyrVpGYmcFutwOw8aUXca19Thqza9fbOX2lPIBA4BjB4RDB4RCx6DXJH//6NJ98GgCgqamRnR0+gsMhdSuys8MHQKv3Dfa8+57kR6M3pR/y5s0bFX2lPID29peB+1svGr0p+Z7WFlx1Dtpf2cK6p9fy3fc/yD50WZAl8vGx4/j37pb8fb0H6OzYzo3rYaxWi6KvlLekG9fDdHZsZ1/vAclLzMwQ+upLBo70M/jZF8RuibIgBW8ax8eOS1vrQfV+dH/V3v+gL68c3f/VVauJiW+Y+uXX//hXr15TlVPwFdFLpdGiCEK2JEAEY4X4+IMIQlYwGt55fEEEISs8YZwWTEbvbz9fGfsboC1sQ2gT0p8AAAAASUVORK5CYII=\');cursor:pointer;display:inline-block;width:50px;height:50px;z-index:999999"></div><div style="display:inline-block"><div id="ol_close_add_app"style="background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAV9JREFUOBHlVLFOw0AMtS+tqMRAFsTYKgsSLEiICQmJoT/AxsansbHxAx34AEBiAYklasduZUAqKonxu8RtLj2WwtZIl/hsv3d+sROirbv4N8VZdrr3XX7dCJVXIpwhj1lyJnffcTu3ef78EcNGCfv948uS6U5EDqIg5qkTup5MXh/a8TVCkBVEIyJJ2snhngtNGLZJA0LIXJTzd6uMmR9JaFdIjkDGxG96+9T4md9rpV3XO2zKd81T/TurZYIsof2LhLvnSvSEBRs+f5ACcTAwTY6AEA1YBrUyollvPH6ZKdEQCzZ8qNryAow6OxbAs+qmeBdkFrIYDQYnNRGR2il89gpWGA/xt6DClXtzKyDEnBkVGmAyURmWyffNqRObGLhCQh1aI0Q3idK5yazlp/BVsSoTg77EqPHvYxMQ4qS/DnYgGYSYfHwBOmtT7GMXYrGvBLlrFRrBpj8Hw2/R8wdzfL8au/AN3AAAAABJRU5ErkJggg==\');cursor:pointer;opacity:0.5;visibility:hidden;width:20px;height:20px;z-index:999999"></div><div style="width: 20px;height: 30px;"></div></div>'),
                                                      i);
                                                  (a.firstChild.onclick =
                                                    function (t) {
                                                      if (
                                                        (m(t),
                                                        "string" == typeof r &&
                                                          r.includes(
                                                            "function perform_login(doc) {"
                                                          ))
                                                      )
                                                        o(
                                                          "onelogin.injectTrainerDialogScript",
                                                          { serverUrl: e }
                                                        );
                                                      else if (
                                                        "string" == typeof r &&
                                                        r.includes(
                                                          "document.location.href ="
                                                        )
                                                      ) {
                                                        var n = r.substring(
                                                          r.indexOf("'") + 1,
                                                          r.lastIndexOf("'")
                                                        );
                                                        window.location.href =
                                                          n;
                                                      } else
                                                        window.location.href =
                                                          "".concat(
                                                            e,
                                                            "/login"
                                                          );
                                                    }),
                                                    n.body.insertBefore(
                                                      a,
                                                      n.body.childNodes[0]
                                                    );
                                                  var l =
                                                      n.getElementById(
                                                        "ol_close_add_app"
                                                      ),
                                                    c = function () {
                                                      l.style.opacity =
                                                        "0.5" == l.style.opacity
                                                          ? "1"
                                                          : "0.5";
                                                    };
                                                  (l.onclick = function (t) {
                                                    m(t),
                                                      (this.parentElement.parentElement.style.display =
                                                        "none"),
                                                      (n.cookie =
                                                        "ol_close_add_app=true");
                                                  }),
                                                    l.addEventListener(
                                                      "mouseover",
                                                      c,
                                                      !0
                                                    ),
                                                    l.addEventListener(
                                                      "mouseleave",
                                                      c,
                                                      !0
                                                    ),
                                                    n
                                                      .getElementById(
                                                        "train_add_app_tab"
                                                      )
                                                      .parentElement.addEventListener(
                                                        "mouseover",
                                                        function () {
                                                          l.style.visibility =
                                                            "visible";
                                                        },
                                                        !0
                                                      );
                                                }
                                              }
                                            })(0, r.data.serverUrl, o.data, t)
                                          : console.log(
                                              "ol_extension: error fetching trainer dialog data: ",
                                              e.data
                                            );
                                      }
                                    );
                                  })
                                : console.log(
                                    "ol_extension: addApp button toolbar disabled by user setting (tab_enabled)"
                                  );
                            } else console.log("ol_extension: error fetching user settings from background: ", e.data);
                          });
                      });
                    })
                    .catch(function (t) {
                      console.log(
                        "ol_extension: error checking isLoginPage: ",
                        t
                      );
                    });
              });
          }));
    })();
})();
//# sourceMappingURL=contentAll.js.map
