/**
 * Copyright (c) Tiny Technologies, Inc. All rights reserved.
 * Licensed under the LGPL or a commercial license.
 * For LGPL see License.txt in the project root for license information.
 * For commercial licenses see https://www.tiny.cloud/
 *
 * Version: 5.2.2 (2020-04-23)
 */
(function (domGlobals) {
    'use strict';

    var noop = function () {
    };
    var compose = function (fa, fb) {
      return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        return fa(fb.apply(null, args));
      };
    };
    var constant = function (value) {
      return function () {
        return value;
      };
    };
    var identity = function (x) {
      return x;
    };
    function curry(fn) {
      var initialArgs = [];
      for (var _i = 1; _i < arguments.length; _i++) {
        initialArgs[_i - 1] = arguments[_i];
      }
      return function () {
        var restArgs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          restArgs[_i] = arguments[_i];
        }
        var all = initialArgs.concat(restArgs);
        return fn.apply(null, all);
      };
    }
    var not = function (f) {
      return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        return !f.apply(null, args);
      };
    };
    var die = function (msg) {
      return function () {
        throw new Error(msg);
      };
    };
    var never = constant(false);
    var always = constant(true);

    var none = function () {
      return NONE;
    };
    var NONE = function () {
      var eq = function (o) {
        return o.isNone();
      };
      var call = function (thunk) {
        return thunk();
      };
      var id = function (n) {
        return n;
      };
      var me = {
        fold: function (n, s) {
          return n();
        },
        is: never,
        isSome: never,
        isNone: always,
        getOr: id,
        getOrThunk: call,
        getOrDie: function (msg) {
          throw new Error(msg || 'error: getOrDie called on none.');
        },
        getOrNull: constant(null),
        getOrUndefined: constant(undefined),
        or: id,
        orThunk: call,
        map: none,
        each: noop,
        bind: none,
        exists: never,
        forall: always,
        filter: none,
        equals: eq,
        equals_: eq,
        toArray: function () {
          return [];
        },
        toString: constant('none()')
      };
      if (Object.freeze) {
        Object.freeze(me);
      }
      return me;
    }();
    var some = function (a) {
      var constant_a = constant(a);
      var self = function () {
        return me;
      };
      var bind = function (f) {
        return f(a);
      };
      var me = {
        fold: function (n, s) {
          return s(a);
        },
        is: function (v) {
          return a === v;
        },
        isSome: always,
        isNone: never,
        getOr: constant_a,
        getOrThunk: constant_a,
        getOrDie: constant_a,
        getOrNull: constant_a,
        getOrUndefined: constant_a,
        or: self,
        orThunk: self,
        map: function (f) {
          return some(f(a));
        },
        each: function (f) {
          f(a);
        },
        bind: bind,
        exists: bind,
        forall: bind,
        filter: function (f) {
          return f(a) ? me : NONE;
        },
        toArray: function () {
          return [a];
        },
        toString: function () {
          return 'some(' + a + ')';
        },
        equals: function (o) {
          return o.is(a);
        },
        equals_: function (o, elementEq) {
          return o.fold(never, function (b) {
            return elementEq(a, b);
          });
        }
      };
      return me;
    };
    var from = function (value) {
      return value === null || value === undefined ? NONE : some(value);
    };
    var Option = {
      some: some,
      none: none,
      from: from
    };

    var typeOf = function (x) {
      if (x === null) {
        return 'null';
      }
      var t = typeof x;
      if (t === 'object' && (Array.prototype.isPrototypeOf(x) || x.constructor && x.constructor.name === 'Array')) {
        return 'array';
      }
      if (t === 'object' && (String.prototype.isPrototypeOf(x) || x.constructor && x.constructor.name === 'String')) {
        return 'string';
      }
      return t;
    };
    var isType = function (type) {
      return function (value) {
        return typeOf(value) === type;
      };
    };
    var isString = isType('string');
    var isObject = isType('object');
    var isArray = isType('array');
    var isNull = isType('null');
    var isBoolean = isType('boolean');
    var isFunction = isType('function');
    var isNumber = isType('number');

    var nativeSlice = Array.prototype.slice;
    var nativeIndexOf = Array.prototype.indexOf;
    var nativePush = Array.prototype.push;
    var rawIndexOf = function (ts, t) {
      return nativeIndexOf.call(ts, t);
    };
    var indexOf = function (xs, x) {
      var r = rawIndexOf(xs, x);
      return r === -1 ? Option.none() : Option.some(r);
    };
    var contains = function (xs, x) {
      return rawIndexOf(xs, x) > -1;
    };
    var exists = function (xs, pred) {
      for (var i = 0, len = xs.length; i < len; i++) {
        var x = xs[i];
        if (pred(x, i)) {
          return true;
        }
      }
      return false;
    };
    var map = function (xs, f) {
      var len = xs.length;
      var r = new Array(len);
      for (var i = 0; i < len; i++) {
        var x = xs[i];
        r[i] = f(x, i);
      }
      return r;
    };
    var each = function (xs, f) {
      for (var i = 0, len = xs.length; i < len; i++) {
        var x = xs[i];
        f(x, i);
      }
    };
    var eachr = function (xs, f) {
      for (var i = xs.length - 1; i >= 0; i--) {
        var x = xs[i];
        f(x, i);
      }
    };
    var partition = function (xs, pred) {
      var pass = [];
      var fail = [];
      for (var i = 0, len = xs.length; i < len; i++) {
        var x = xs[i];
        var arr = pred(x, i) ? pass : fail;
        arr.push(x);
      }
      return {
        pass: pass,
        fail: fail
      };
    };
    var filter = function (xs, pred) {
      var r = [];
      for (var i = 0, len = xs.length; i < len; i++) {
        var x = xs[i];
        if (pred(x, i)) {
          r.push(x);
        }
      }
      return r;
    };
    var foldr = function (xs, f, acc) {
      eachr(xs, function (x) {
        acc = f(acc, x);
      });
      return acc;
    };
    var foldl = function (xs, f, acc) {
      each(xs, function (x) {
        acc = f(acc, x);
      });
      return acc;
    };
    var find = function (xs, pred) {
      for (var i = 0, len = xs.length; i < len; i++) {
        var x = xs[i];
        if (pred(x, i)) {
          return Option.some(x);
        }
      }
      return Option.none();
    };
    var findIndex = function (xs, pred) {
      for (var i = 0, len = xs.length; i < len; i++) {
        var x = xs[i];
        if (pred(x, i)) {
          return Option.some(i);
        }
      }
      return Option.none();
    };
    var flatten = function (xs) {
      var r = [];
      for (var i = 0, len = xs.length; i < len; ++i) {
        if (!isArray(xs[i])) {
          throw new Error('Arr.flatten item ' + i + ' was not an array, input: ' + xs);
        }
        nativePush.apply(r, xs[i]);
      }
      return r;
    };
    var bind = function (xs, f) {
      return flatten(map(xs, f));
    };
    var forall = function (xs, pred) {
      for (var i = 0, len = xs.length; i < len; ++i) {
        var x = xs[i];
        if (pred(x, i) !== true) {
          return false;
        }
      }
      return true;
    };
    var reverse = function (xs) {
      var r = nativeSlice.call(xs, 0);
      r.reverse();
      return r;
    };
    var difference = function (a1, a2) {
      return filter(a1, function (x) {
        return !contains(a2, x);
      });
    };
    var mapToObject = function (xs, f) {
      var r = {};
      for (var i = 0, len = xs.length; i < len; i++) {
        var x = xs[i];
        r[String(x)] = f(x, i);
      }
      return r;
    };
    var sort = function (xs, comparator) {
      var copy = nativeSlice.call(xs, 0);
      copy.sort(comparator);
      return copy;
    };
    var head = function (xs) {
      return xs.length === 0 ? Option.none() : Option.some(xs[0]);
    };
    var last = function (xs) {
      return xs.length === 0 ? Option.none() : Option.some(xs[xs.length - 1]);
    };
    var from$1 = isFunction(Array.from) ? Array.from : function (x) {
      return nativeSlice.call(x);
    };

    var keys = Object.keys;
    var hasOwnProperty = Object.hasOwnProperty;
    var each$1 = function (obj, f) {
      var props = keys(obj);
      for (var k = 0, len = props.length; k < len; k++) {
        var i = props[k];
        var x = obj[i];
        f(x, i);
      }
    };
    var map$1 = function (obj, f) {
      return tupleMap(obj, function (x, i) {
        return {
          k: i,
          v: f(x, i)
        };
      });
    };
    var tupleMap = function (obj, f) {
      var r = {};
      each$1(obj, function (x, i) {
        var tuple = f(x, i);
        r[tuple.k] = tuple.v;
      });
      return r;
    };
    var objAcc = function (r) {
      return function (x, i) {
        r[i] = x;
      };
    };
    var internalFilter = function (obj, pred, onTrue, onFalse) {
      var r = {};
      each$1(obj, function (x, i) {
        (pred(x, i) ? onTrue : onFalse)(x, i);
      });
      return r;
    };
    var bifilter = function (obj, pred) {
      var t = {};
      var f = {};
      internalFilter(obj, pred, objAcc(t), objAcc(f));
      return {
        t: t,
        f: f
      };
    };
    var filter$1 = function (obj, pred) {
      var t = {};
      internalFilter(obj, pred, objAcc(t), noop);
      return t;
    };
    var get = function (obj, key) {
      return has(obj, key) ? Option.from(obj[key]) : Option.none();
    };
    var has = function (obj, key) {
      return hasOwnProperty.call(obj, key);
    };

    var __assign = function () {
      __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p))
              t[p] = s[p];
        }
        return t;
      };
      return __assign.apply(this, arguments);
    };
    function __rest(s, e) {
      var t = {};
      for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
          t[p] = s[p];
      if (s != null && typeof Object.getOwnPropertySymbols === 'function')
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
          if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
            t[p[i]] = s[p[i]];
        }
      return t;
    }
    function __spreadArrays() {
      for (var s = 0, i = 0, il = arguments.length; i < il; i++)
        s += arguments[i].length;
      for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
          r[k] = a[j];
      return r;
    }

    var fromHtml = function (html, scope) {
      var doc = scope || domGlobals.document;
      var div = doc.createElement('div');
      div.innerHTML = html;
      if (!div.hasChildNodes() || div.childNodes.length > 1) {
        domGlobals.console.error('HTML does not have a single root node', html);
        throw new Error('HTML must have a single root node');
      }
      return fromDom(div.childNodes[0]);
    };
    var fromTag = function (tag, scope) {
      var doc = scope || domGlobals.document;
      var node = doc.createElement(tag);
      return fromDom(node);
    };
    var fromText = function (text, scope) {
      var doc = scope || domGlobals.document;
      var node = doc.createTextNode(text);
      return fromDom(node);
    };
    var fromDom = function (node) {
      if (node === null || node === undefined) {
        throw new Error('Node cannot be null or undefined');
      }
      return { dom: constant(node) };
    };
    var fromPoint = function (docElm, x, y) {
      var doc = docElm.dom();
      return Option.from(doc.elementFromPoint(x, y)).map(fromDom);
    };
    var Element = {
      fromHtml: fromHtml,
      fromTag: fromTag,
      fromText: fromText,
      fromDom: fromDom,
      fromPoint: fromPoint
    };

    var Cell = function (initial) {
      var value = initial;
      var get = function () {
        return value;
      };
      var set = function (v) {
        value = v;
      };
      var clone = function () {
        return Cell(get());
      };
      return {
        get: get,
        set: set,
        clone: clone
      };
    };

    var firstMatch = function (regexes, s) {
      for (var i = 0; i < regexes.length; i++) {
        var x = regexes[i];
        if (x.test(s)) {
          return x;
        }
      }
      return undefined;
    };
    var find$1 = function (regexes, agent) {
      var r = firstMatch(regexes, agent);
      if (!r) {
        return {
          major: 0,
          minor: 0
        };
      }
      var group = function (i) {
        return Number(agent.replace(r, '$' + i));
      };
      return nu(group(1), group(2));
    };
    var detect = function (versionRegexes, agent) {
      var cleanedAgent = String(agent).toLowerCase();
      if (versionRegexes.length === 0) {
        return unknown();
      }
      return find$1(versionRegexes, cleanedAgent);
    };
    var unknown = function () {
      return nu(0, 0);
    };
    var nu = function (major, minor) {
      return {
        major: major,
        minor: minor
      };
    };
    var Version = {
      nu: nu,
      detect: detect,
      unknown: unknown
    };

    var edge = 'Edge';
    var chrome = 'Chrome';
    var ie = 'IE';
    var opera = 'Opera';
    var firefox = 'Firefox';
    var safari = 'Safari';
    var isBrowser = function (name, current) {
      return function () {
        return current === name;
      };
    };
    var unknown$1 = function () {
      return nu$1({
        current: undefined,
        version: Version.unknown()
      });
    };
    var nu$1 = function (info) {
      var current = info.current;
      var version = info.version;
      return {
        current: current,
        version: version,
        isEdge: isBrowser(edge, current),
        isChrome: isBrowser(chrome, current),
        isIE: isBrowser(ie, current),
        isOpera: isBrowser(opera, current),
        isFirefox: isBrowser(firefox, current),
        isSafari: isBrowser(safari, current)
      };
    };
    var Browser = {
      unknown: unknown$1,
      nu: nu$1,
      edge: constant(edge),
      chrome: constant(chrome),
      ie: constant(ie),
      opera: constant(opera),
      firefox: constant(firefox),
      safari: constant(safari)
    };

    var windows = 'Windows';
    var ios = 'iOS';
    var android = 'Android';
    var linux = 'Linux';
    var osx = 'OSX';
    var solaris = 'Solaris';
    var freebsd = 'FreeBSD';
    var chromeos = 'ChromeOS';
    var isOS = function (name, current) {
      return function () {
        return current === name;
      };
    };
    var unknown$2 = function () {
      return nu$2({
        current: undefined,
        version: Version.unknown()
      });
    };
    var nu$2 = function (info) {
      var current = info.current;
      var version = info.version;
      return {
        current: current,
        version: version,
        isWindows: isOS(windows, current),
        isiOS: isOS(ios, current),
        isAndroid: isOS(android, current),
        isOSX: isOS(osx, current),
        isLinux: isOS(linux, current),
        isSolaris: isOS(solaris, current),
        isFreeBSD: isOS(freebsd, current),
        isChromeOS: isOS(chromeos, current)
      };
    };
    var OperatingSystem = {
      unknown: unknown$2,
      nu: nu$2,
      windows: constant(windows),
      ios: constant(ios),
      android: constant(android),
      linux: constant(linux),
      osx: constant(osx),
      solaris: constant(solaris),
      freebsd: constant(freebsd),
      chromeos: constant(chromeos)
    };

    var DeviceType = function (os, browser, userAgent, mediaMatch) {
      var isiPad = os.isiOS() && /ipad/i.test(userAgent) === true;
      var isiPhone = os.isiOS() && !isiPad;
      var isMobile = os.isiOS() || os.isAndroid();
      var isTouch = isMobile || mediaMatch('(pointer:coarse)');
      var isTablet = isiPad || !isiPhone && isMobile && mediaMatch('(min-device-width:768px)');
      var isPhone = isiPhone || isMobile && !isTablet;
      var iOSwebview = browser.isSafari() && os.isiOS() && /safari/i.test(userAgent) === false;
      var isDesktop = !isPhone && !isTablet && !iOSwebview;
      return {
        isiPad: constant(isiPad),
        isiPhone: constant(isiPhone),
        isTablet: constant(isTablet),
        isPhone: constant(isPhone),
        isTouch: constant(isTouch),
        isAndroid: os.isAndroid,
        isiOS: os.isiOS,
        isWebView: constant(iOSwebview),
        isDesktop: constant(isDesktop)
      };
    };

    var detect$1 = function (candidates, userAgent) {
      var agent = String(userAgent).toLowerCase();
      return find(candidates, function (candidate) {
        return candidate.search(agent);
      });
    };
    var detectBrowser = function (browsers, userAgent) {
      return detect$1(browsers, userAgent).map(function (browser) {
        var version = Version.detect(browser.versionRegexes, userAgent);
        return {
          current: browser.name,
          version: version
        };
      });
    };
    var detectOs = function (oses, userAgent) {
      return detect$1(oses, userAgent).map(function (os) {
        var version = Version.detect(os.versionRegexes, userAgent);
        return {
          current: os.name,
          version: version
        };
      });
    };
    var UaString = {
      detectBrowser: detectBrowser,
      detectOs: detectOs
    };

    var checkRange = function (str, substr, start) {
      if (substr === '') {
        return true;
      }
      if (str.length < substr.length) {
        return false;
      }
      var x = str.substr(start, start + substr.length);
      return x === substr;
    };
    var contains$1 = function (str, substr) {
      return str.indexOf(substr) !== -1;
    };
    var startsWith = function (str, prefix) {
      return checkRange(str, prefix, 0);
    };
    var trim = function (str) {
      return str.replace(/^\s+|\s+$/g, '');
    };
    var lTrim = function (str) {
      return str.replace(/^\s+/g, '');
    };
    var rTrim = function (str) {
      return str.replace(/\s+$/g, '');
    };

    var normalVersionRegex = /.*?version\/\ ?([0-9]+)\.([0-9]+).*/;
    var checkContains = function (target) {
      return function (uastring) {
        return contains$1(uastring, target);
      };
    };
    var browsers = [
      {
        name: 'Edge',
        versionRegexes: [/.*?edge\/ ?([0-9]+)\.([0-9]+)$/],
        search: function (uastring) {
          return contains$1(uastring, 'edge/') && contains$1(uastring, 'chrome') && contains$1(uastring, 'safari') && contains$1(uastring, 'applewebkit');
        }
      },
      {
        name: 'Chrome',
        versionRegexes: [
          /.*?chrome\/([0-9]+)\.([0-9]+).*/,
          normalVersionRegex
        ],
        search: function (uastring) {
          return contains$1(uastring, 'chrome') && !contains$1(uastring, 'chromeframe');
        }
      },
      {
        name: 'IE',
        versionRegexes: [
          /.*?msie\ ?([0-9]+)\.([0-9]+).*/,
          /.*?rv:([0-9]+)\.([0-9]+).*/
        ],
        search: function (uastring) {
          return contains$1(uastring, 'msie') || contains$1(uastring, 'trident');
        }
      },
      {
        name: 'Opera',
        versionRegexes: [
          normalVersionRegex,
          /.*?opera\/([0-9]+)\.([0-9]+).*/
        ],
        search: checkContains('opera')
      },
      {
        name: 'Firefox',
        versionRegexes: [/.*?firefox\/\ ?([0-9]+)\.([0-9]+).*/],
        search: checkContains('firefox')
      },
      {
        name: 'Safari',
        versionRegexes: [
          normalVersionRegex,
          /.*?cpu os ([0-9]+)_([0-9]+).*/
        ],
        search: function (uastring) {
          return (contains$1(uastring, 'safari') || contains$1(uastring, 'mobile/')) && contains$1(uastring, 'applewebkit');
        }
      }
    ];
    var oses = [
      {
        name: 'Windows',
        search: checkContains('win'),
        versionRegexes: [/.*?windows\ nt\ ?([0-9]+)\.([0-9]+).*/]
      },
      {
        name: 'iOS',
        search: function (uastring) {
          return contains$1(uastring, 'iphone') || contains$1(uastring, 'ipad');
        },
        versionRegexes: [
          /.*?version\/\ ?([0-9]+)\.([0-9]+).*/,
          /.*cpu os ([0-9]+)_([0-9]+).*/,
          /.*cpu iphone os ([0-9]+)_([0-9]+).*/
        ]
      },
      {
        name: 'Android',
        search: checkContains('android'),
        versionRegexes: [/.*?android\ ?([0-9]+)\.([0-9]+).*/]
      },
      {
        name: 'OSX',
        search: checkContains('mac os x'),
        versionRegexes: [/.*?mac\ os\ x\ ?([0-9]+)_([0-9]+).*/]
      },
      {
        name: 'Linux',
        search: checkContains('linux'),
        versionRegexes: []
      },
      {
        name: 'Solaris',
        search: checkContains('sunos'),
        versionRegexes: []
      },
      {
        name: 'FreeBSD',
        search: checkContains('freebsd'),
        versionRegexes: []
      },
      {
        name: 'ChromeOS',
        search: checkContains('cros'),
        versionRegexes: [/.*?chrome\/([0-9]+)\.([0-9]+).*/]
      }
    ];
    var PlatformInfo = {
      browsers: constant(browsers),
      oses: constant(oses)
    };

    var detect$2 = function (userAgent, mediaMatch) {
      var browsers = PlatformInfo.browsers();
      var oses = PlatformInfo.oses();
      var browser = UaString.detectBrowser(browsers, userAgent).fold(Browser.unknown, Browser.nu);
      var os = UaString.detectOs(oses, userAgent).fold(OperatingSystem.unknown, OperatingSystem.nu);
      var deviceType = DeviceType(os, browser, userAgent, mediaMatch);
      return {
        browser: browser,
        os: os,
        deviceType: deviceType
      };
    };
    var PlatformDetection = { detect: detect$2 };

    var mediaMatch = function (query) {
      return domGlobals.window.matchMedia(query).matches;
    };
    var platform = Cell(PlatformDetection.detect(domGlobals.navigator.userAgent, mediaMatch));
    var detect$3 = function () {
      return platform.get();
    };

    var Immutable = function () {
      var fields = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        fields[_i] = arguments[_i];
      }
      return function () {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          values[_i] = arguments[_i];
        }
        if (fields.length !== values.length) {
          throw new Error('Wrong number of arguments to struct. Expected "[' + fields.length + ']", got ' + values.length + ' arguments');
        }
        var struct = {};
        each(fields, function (name, i) {
          struct[name] = constant(values[i]);
        });
        return struct;
      };
    };

    var toArray = function (target, f) {
      var r = [];
      var recurse = function (e) {
        r.push(e);
        return f(e);
      };
      var cur = f(target);
      do {
        cur = cur.bind(recurse);
      } while (cur.isSome());
      return r;
    };
    var Recurse = { toArray: toArray };

    var compareDocumentPosition = function (a, b, match) {
      return (a.compareDocumentPosition(b) & match) !== 0;
    };
    var documentPositionPreceding = function (a, b) {
      return compareDocumentPosition(a, b, domGlobals.Node.DOCUMENT_POSITION_PRECEDING);
    };
    var documentPositionContainedBy = function (a, b) {
      return compareDocumentPosition(a, b, domGlobals.Node.DOCUMENT_POSITION_CONTAINED_BY);
    };
    var Node = {
      documentPositionPreceding: documentPositionPreceding,
      documentPositionContainedBy: documentPositionContainedBy
    };

    var ATTRIBUTE = domGlobals.Node.ATTRIBUTE_NODE;
    var CDATA_SECTION = domGlobals.Node.CDATA_SECTION_NODE;
    var COMMENT = domGlobals.Node.COMMENT_NODE;
    var DOCUMENT = domGlobals.Node.DOCUMENT_NODE;
    var DOCUMENT_TYPE = domGlobals.Node.DOCUMENT_TYPE_NODE;
    var DOCUMENT_FRAGMENT = domGlobals.Node.DOCUMENT_FRAGMENT_NODE;
    var ELEMENT = domGlobals.Node.ELEMENT_NODE;
    var TEXT = domGlobals.Node.TEXT_NODE;
    var PROCESSING_INSTRUCTION = domGlobals.Node.PROCESSING_INSTRUCTION_NODE;
    var ENTITY_REFERENCE = domGlobals.Node.ENTITY_REFERENCE_NODE;
    var ENTITY = domGlobals.Node.ENTITY_NODE;
    var NOTATION = domGlobals.Node.NOTATION_NODE;

    var ELEMENT$1 = ELEMENT;
    var DOCUMENT$1 = DOCUMENT;
    var is = function (element, selector) {
      var dom = element.dom();
      if (dom.nodeType !== ELEMENT$1) {
        return false;
      } else {
        var elem = dom;
        if (elem.matches !== undefined) {
          return elem.matches(selector);
        } else if (elem.msMatchesSelector !== undefined) {
          return elem.msMatchesSelector(selector);
        } else if (elem.webkitMatchesSelector !== undefined) {
          return elem.webkitMatchesSelector(selector);
        } else if (elem.mozMatchesSelector !== undefined) {
          return elem.mozMatchesSelector(selector);
        } else {
          throw new Error('Browser lacks native selectors');
        }
      }
    };
    var bypassSelector = function (dom) {
      return dom.nodeType !== ELEMENT$1 && dom.nodeType !== DOCUMENT$1 || dom.childElementCount === 0;
    };
    var all = function (selector, scope) {
      var base = scope === undefined ? domGlobals.document : scope.dom();
      return bypassSelector(base) ? [] : map(base.querySelectorAll(selector), Element.fromDom);
    };
    var one = function (selector, scope) {
      var base = scope === undefined ? domGlobals.document : scope.dom();
      return bypassSelector(base) ? Option.none() : Option.from(base.querySelector(selector)).map(Element.fromDom);
    };

    var eq = function (e1, e2) {
      return e1.dom() === e2.dom();
    };
    var regularContains = function (e1, e2) {
      var d1 = e1.dom();
      var d2 = e2.dom();
      return d1 === d2 ? false : d1.contains(d2);
    };
    var ieContains = function (e1, e2) {
      return Node.documentPositionContainedBy(e1.dom(), e2.dom());
    };
    var browser = detect$3().browser;
    var contains$2 = browser.isIE() ? ieContains : regularContains;

    var owner = function (element) {
      return Element.fromDom(element.dom().ownerDocument);
    };
    var documentElement = function (element) {
      return Element.fromDom(element.dom().ownerDocument.documentElement);
    };
    var defaultView = function (element) {
      return Element.fromDom(element.dom().ownerDocument.defaultView);
    };
    var parent = function (element) {
      return Option.from(element.dom().parentNode).map(Element.fromDom);
    };
    var parents = function (element, isRoot) {
      var stop = isFunction(isRoot) ? isRoot : never;
      var dom = element.dom();
      var ret = [];
      while (dom.parentNode !== null && dom.parentNode !== undefined) {
        var rawParent = dom.parentNode;
        var p = Element.fromDom(rawParent);
        ret.push(p);
        if (stop(p) === true) {
          break;
        } else {
          dom = rawParent;
        }
      }
      return ret;
    };
    var prevSibling = function (element) {
      return Option.from(element.dom().previousSibling).map(Element.fromDom);
    };
    var nextSibling = function (element) {
      return Option.from(element.dom().nextSibling).map(Element.fromDom);
    };
    var prevSiblings = function (element) {
      return reverse(Recurse.toArray(element, prevSibling));
    };
    var nextSiblings = function (element) {
      return Recurse.toArray(element, nextSibling);
    };
    var children = function (element) {
      return map(element.dom().childNodes, Element.fromDom);
    };
    var child = function (element, index) {
      var cs = element.dom().childNodes;
      return Option.from(cs[index]).map(Element.fromDom);
    };
    var firstChild = function (element) {
      return child(element, 0);
    };
    var lastChild = function (element) {
      return child(element, element.dom().childNodes.length - 1);
    };
    var childNodesCount = function (element) {
      return element.dom().childNodes.length;
    };
    var spot = Immutable('element', 'offset');

    var before = function (marker, element) {
      var parent$1 = parent(marker);
      parent$1.each(function (v) {
        v.dom().insertBefore(element.dom(), marker.dom());
      });
    };
    var after = function (marker, element) {
      var sibling = nextSibling(marker);
      sibling.fold(function () {
        var parent$1 = parent(marker);
        parent$1.each(function (v) {
          append(v, element);
        });
      }, function (v) {
        before(v, element);
      });
    };
    var prepend = function (parent, element) {
      var firstChild$1 = firstChild(parent);
      firstChild$1.fold(function () {
        append(parent, element);
      }, function (v) {
        parent.dom().insertBefore(element.dom(), v.dom());
      });
    };
    var append = function (parent, element) {
      parent.dom().appendChild(element.dom());
    };
    var wrap = function (element, wrapper) {
      before(element, wrapper);
      append(wrapper, element);
    };

    var before$1 = function (marker, elements) {
      each(elements, function (x) {
        before(marker, x);
      });
    };
    var append$1 = function (parent, elements) {
      each(elements, function (x) {
        append(parent, x);
      });
    };

    var empty = function (element) {
      element.dom().textContent = '';
      each(children(element), function (rogue) {
        remove(rogue);
      });
    };
    var remove = function (element) {
      var dom = element.dom();
      if (dom.parentNode !== null) {
        dom.parentNode.removeChild(dom);
      }
    };
    var unwrap = function (wrapper) {
      var children$1 = children(wrapper);
      if (children$1.length > 0) {
        before$1(wrapper, children$1);
      }
      remove(wrapper);
    };

    var Global = typeof domGlobals.window !== 'undefined' ? domGlobals.window : Function('return this;')();

    var name = function (element) {
      var r = element.dom().nodeName;
      return r.toLowerCase();
    };
    var type = function (element) {
      return element.dom().nodeType;
    };
    var isType$1 = function (t) {
      return function (element) {
        return type(element) === t;
      };
    };
    var isElement = isType$1(ELEMENT);
    var isText = isType$1(TEXT);

    var inBody = function (element) {
      var dom = isText(element) ? element.dom().parentNode : element.dom();
      return dom !== undefined && dom !== null && dom.ownerDocument.body.contains(dom);
    };

    var r = function (left, top) {
      var translate = function (x, y) {
        return r(left + x, top + y);
      };
      return {
        left: constant(left),
        top: constant(top),
        translate: translate
      };
    };
    var Position = r;

    var boxPosition = function (dom) {
      var box = dom.getBoundingClientRect();
      return Position(box.left, box.top);
    };
    var firstDefinedOrZero = function (a, b) {
      return a !== undefined ? a : b !== undefined ? b : 0;
    };
    var absolute = function (element) {
      var doc = element.dom().ownerDocument;
      var body = doc.body;
      var win = doc.defaultView;
      var html = doc.documentElement;
      if (body === element.dom()) {
        return Position(body.offsetLeft, body.offsetTop);
      }
      var scrollTop = firstDefinedOrZero(win.pageYOffset, html.scrollTop);
      var scrollLeft = firstDefinedOrZero(win.pageXOffset, html.scrollLeft);
      var clientTop = firstDefinedOrZero(html.clientTop, body.clientTop);
      var clientLeft = firstDefinedOrZero(html.clientLeft, body.clientLeft);
      return viewport(element).translate(scrollLeft - clientLeft, scrollTop - clientTop);
    };
    var viewport = function (element) {
      var dom = element.dom();
      var doc = dom.ownerDocument;
      var body = doc.body;
      if (body === dom) {
        return Position(body.offsetLeft, body.offsetTop);
      }
      if (!inBody(element)) {
        return Position(0, 0);
      }
      return boxPosition(dom);
    };

    var isSafari = detect$3().browser.isSafari();
    var get$1 = function (_DOC) {
      var doc = _DOC !== undefined ? _DOC.dom() : domGlobals.document;
      var x = doc.body.scrollLeft || doc.documentElement.scrollLeft;
      var y = doc.body.scrollTop || doc.documentElement.scrollTop;
      return Position(x, y);
    };
    var to = function (x, y, _DOC) {
      var doc = _DOC !== undefined ? _DOC.dom() : domGlobals.document;
      var win = doc.defaultView;
      win.scrollTo(x, y);
    };
    var intoView = function (element, alignToTop) {
      if (isSafari && isFunction(element.dom().scrollIntoViewIfNeeded)) {
        element.dom().scrollIntoViewIfNeeded(false);
      } else {
        element.dom().scrollIntoView(alignToTop);
      }
    };

    var get$2 = function (_win) {
      var win = _win === undefined ? domGlobals.window : _win;
      return Option.from(win['visualViewport']);
    };
    var bounds = function (x, y, width, height) {
      return {
        x: constant(x),
        y: constant(y),
        width: constant(width),
        height: constant(height),
        right: constant(x + width),
        bottom: constant(y + height)
      };
    };
    var getBounds = function (_win) {
      var win = _win === undefined ? domGlobals.window : _win;
      var doc = win.document;
      var scroll = get$1(Element.fromDom(doc));
      return get$2(win).fold(function () {
        var html = win.document.documentElement;
        var width = html.clientWidth;
        var height = html.clientHeight;
        return bounds(scroll.left(), scroll.top(), width, height);
      }, function (visualViewport) {
        return bounds(Math.max(visualViewport.pageLeft, scroll.left()), Math.max(visualViewport.pageTop, scroll.top()), visualViewport.width, visualViewport.height);
      });
    };

    var isNodeType = function (type) {
      return function (node) {
        return !!node && node.nodeType === type;
      };
    };
    var isRestrictedNode = function (node) {
      return !!node && !Object.getPrototypeOf(node);
    };
    var isElement$1 = isNodeType(1);
    var matchNodeNames = function (names) {
      var lowercasedNames = names.map(function (s) {
        return s.toLowerCase();
      });
      return function (node) {
        if (node && node.nodeName) {
          var nodeName = node.nodeName.toLowerCase();
          return contains(lowercasedNames, nodeName);
        }
        return false;
      };
    };
    var matchStyleValues = function (name, values) {
      var items = values.toLowerCase().split(' ');
      return function (node) {
        var i, cssValue;
        if (isElement$1(node)) {
          for (i = 0; i < items.length; i++) {
            var computed = node.ownerDocument.defaultView.getComputedStyle(node, null);
            cssValue = computed ? computed.getPropertyValue(name) : null;
            if (cssValue === items[i]) {
              return true;
            }
          }
        }
        return false;
      };
    };
    var hasPropValue = function (propName, propValue) {
      return function (node) {
        return isElement$1(node) && node[propName] === propValue;
      };
    };
    var hasAttribute = function (attrName, attrValue) {
      return function (node) {
        return isElement$1(node) && node.hasAttribute(attrName);
      };
    };
    var hasAttributeValue = function (attrName, attrValue) {
      return function (node) {
        return isElement$1(node) && node.getAttribute(attrName) === attrValue;
      };
    };
    var isBogus = function (node) {
      return isElement$1(node) && node.hasAttribute('data-mce-bogus');
    };
    var isBogusAll = function (node) {
      return isElement$1(node) && node.getAttribute('data-mce-bogus') === 'all';
    };
    var isTable = function (node) {
      return isElement$1(node) && node.tagName === 'TABLE';
    };
    var hasContentEditableState = function (value) {
      return function (node) {
        if (isElement$1(node)) {
          if (node.contentEditable === value) {
            return true;
          }
          if (node.getAttribute('data-mce-contenteditable') === value) {
            return true;
          }
        }
        return false;
      };
    };
    var isTextareaOrInput = matchNodeNames([
      'textarea',
      'input'
    ]);
    var isText$1 = isNodeType(3);
    var isComment = isNodeType(8);
    var isDocument = isNodeType(9);
    var isDocumentFragment = isNodeType(11);
    var isBr = matchNodeNames(['br']);
    var isContentEditableTrue = hasContentEditableState('true');
    var isContentEditableFalse = hasContentEditableState('false');
    var NodeType = {
      isText: isText$1,
      isElement: isElement$1,
      isComment: isComment,
      isDocument: isDocument,
      isDocumentFragment: isDocumentFragment,
      isBr: isBr,
      isContentEditableTrue: isContentEditableTrue,
      isContentEditableFalse: isContentEditableFalse,
      isRestrictedNode: isRestrictedNode,
      matchNodeNames: matchNodeNames,
      hasPropValue: hasPropValue,
      hasAttribute: hasAttribute,
      hasAttributeValue: hasAttributeValue,
      matchStyleValues: matchStyleValues,
      isBogus: isBogus,
      isBogusAll: isBogusAll,
      isTable: isTable,
      isTextareaOrInput: isTextareaOrInput
    };

    var isSupported = function (dom) {
      return dom.style !== undefined && isFunction(dom.style.getPropertyValue);
    };

    var rawSet = function (dom, key, value) {
      if (isString(value) || isBoolean(value) || isNumber(value)) {
        dom.setAttribute(key, value + '');
      } else {
        domGlobals.console.error('Invalid call to Attr.set. Key ', key, ':: Value ', value, ':: Element ', dom);
        throw new Error('Attribute value was not simple');
      }
    };
    var set = function (element, key, value) {
      rawSet(element.dom(), key, value);
    };
    var setAll = function (element, attrs) {
      var dom = element.dom();
      each$1(attrs, function (v, k) {
        rawSet(dom, k, v);
      });
    };
    var get$3 = function (element, key) {
      var v = element.dom().getAttribute(key);
      return v === null ? undefined : v;
    };
    var getOpt = function (element, key) {
      return Option.from(get$3(element, key));
    };
    var has$1 = function (element, key) {
      var dom = element.dom();
      return dom && dom.hasAttribute ? dom.hasAttribute(key) : false;
    };
    var remove$1 = function (element, key) {
      element.dom().removeAttribute(key);
    };

    var get$4 = function (element, property) {
      var dom = element.dom();
      var styles = domGlobals.window.getComputedStyle(dom);
      var r = styles.getPropertyValue(property);
      var v = r === '' && !inBody(element) ? getUnsafeProperty(dom, property) : r;
      return v === null ? undefined : v;
    };
    var getUnsafeProperty = function (dom, property) {
      return isSupported(dom) ? dom.style.getPropertyValue(property) : '';
    };
    var getRaw = function (element, property) {
      var dom = element.dom();
      var raw = getUnsafeProperty(dom, property);
      return Option.from(raw).filter(function (r) {
        return r.length > 0;
      });
    };
    var getAllRaw = function (element) {
      var css = {};
      var dom = element.dom();
      if (isSupported(dom)) {
        for (var i = 0; i < dom.style.length; i++) {
          var ruleName = dom.style.item(i);
          css[ruleName] = dom.style[ruleName];
        }
      }
      return css;
    };
    var reflow = function (e) {
      return e.dom().offsetWidth;
    };

    var browser$1 = detect$3().browser;
    var firstElement = function (nodes) {
      return find(nodes, isElement);
    };
    var getTableCaptionDeltaY = function (elm) {
      if (browser$1.isFirefox() && name(elm) === 'table') {
        return firstElement(children(elm)).filter(function (elm) {
          return name(elm) === 'caption';
        }).bind(function (caption) {
          return firstElement(nextSiblings(caption)).map(function (body) {
            var bodyTop = body.dom().offsetTop;
            var captionTop = caption.dom().offsetTop;
            var captionHeight = caption.dom().offsetHeight;
            return bodyTop <= captionTop ? -captionHeight : 0;
          });
        }).getOr(0);
      } else {
        return 0;
      }
    };
    var hasChild = function (elm, child) {
      return elm.children && contains(elm.children, child);
    };
    var getPos = function (body, elm, rootElm) {
      var x = 0, y = 0, offsetParent;
      var doc = body.ownerDocument;
      var pos;
      rootElm = rootElm ? rootElm : body;
      if (elm) {
        if (rootElm === body && elm.getBoundingClientRect && get$4(Element.fromDom(body), 'position') === 'static') {
          pos = elm.getBoundingClientRect();
          x = pos.left + (doc.documentElement.scrollLeft || body.scrollLeft) - doc.documentElement.clientLeft;
          y = pos.top + (doc.documentElement.scrollTop || body.scrollTop) - doc.documentElement.clientTop;
          return {
            x: x,
            y: y
          };
        }
        offsetParent = elm;
        while (offsetParent && offsetParent !== rootElm && offsetParent.nodeType && !hasChild(offsetParent, rootElm)) {
          x += offsetParent.offsetLeft || 0;
          y += offsetParent.offsetTop || 0;
          offsetParent = offsetParent.offsetParent;
        }
        offsetParent = elm.parentNode;
        while (offsetParent && offsetParent !== rootElm && offsetParent.nodeType && !hasChild(offsetParent, rootElm)) {
          x -= offsetParent.scrollLeft || 0;
          y -= offsetParent.scrollTop || 0;
          offsetParent = offsetParent.parentNode;
        }
        y += getTableCaptionDeltaY(Element.fromDom(elm));
      }
      return {
        x: x,
        y: y
      };
    };
    var Position$1 = { getPos: getPos };

    var exports$1 = {}, module$1 = { exports: exports$1 };
    (function (define, exports, module, require) {
      (function (f) {
        if (typeof exports === 'object' && typeof module !== 'undefined') {
          module.exports = f();
        } else if (typeof define === 'function' && define.amd) {
          define([], f);
        } else {
          var g;
          if (typeof window !== 'undefined') {
            g = window;
          } else if (typeof global !== 'undefined') {
            g = global;
          } else if (typeof self !== 'undefined') {
            g = self;
          } else {
            g = this;
          }
          g.EphoxContactWrapper = f();
        }
      }(function () {
        return function () {
          function r(e, n, t) {
            function o(i, f) {
              if (!n[i]) {
                if (!e[i]) {
                  var c = 'function' == typeof require && require;
                  if (!f && c)
                    return c(i, !0);
                  if (u)
                    return u(i, !0);
                  var a = new Error('Cannot find module \'' + i + '\'');
                  throw a.code = 'MODULE_NOT_FOUND', a;
                }
                var p = n[i] = { exports: {} };
                e[i][0].call(p.exports, function (r) {
                  var n = e[i][1][r];
                  return o(n || r);
                }, p, p.exports, r, e, n, t);
              }
              return n[i].exports;
            }
            for (var u = 'function' == typeof require && require, i = 0; i < t.length; i++)
              o(t[i]);
            return o;
          }
          return r;
        }()({
          1: [
            function (require, module, exports) {
              var process = module.exports = {};
              var cachedSetTimeout;
              var cachedClearTimeout;
              function defaultSetTimout() {
                throw new Error('setTimeout has not been defined');
              }
              function defaultClearTimeout() {
                throw new Error('clearTimeout has not been defined');
              }
              (function () {
                try {
                  if (typeof setTimeout === 'function') {
                    cachedSetTimeout = setTimeout;
                  } else {
                    cachedSetTimeout = defaultSetTimout;
                  }
                } catch (e) {
                  cachedSetTimeout = defaultSetTimout;
                }
                try {
                  if (typeof clearTimeout === 'function') {
                    cachedClearTimeout = clearTimeout;
                  } else {
                    cachedClearTimeout = defaultClearTimeout;
                  }
                } catch (e) {
                  cachedClearTimeout = defaultClearTimeout;
                }
              }());
              function runTimeout(fun) {
                if (cachedSetTimeout === setTimeout) {
                  return setTimeout(fun, 0);
                }
                if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
                  cachedSetTimeout = setTimeout;
                  return setTimeout(fun, 0);
                }
                try {
                  return cachedSetTimeout(fun, 0);
                } catch (e) {
                  try {
                    return cachedSetTimeout.call(null, fun, 0);
                  } catch (e) {
                    return cachedSetTimeout.call(this, fun, 0);
                  }
                }
              }
              function runClearTimeout(marker) {
                if (cachedClearTimeout === clearTimeout) {
                  return clearTimeout(marker);
                }
                if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
                  cachedClearTimeout = clearTimeout;
                  return clearTimeout(marker);
                }
                try {
                  return cachedClearTimeout(marker);
                } catch (e) {
                  try {
                    return cachedClearTimeout.call(null, marker);
                  } catch (e) {
                    return cachedClearTimeout.call(this, marker);
                  }
                }
              }
              var queue = [];
              var draining = false;
              var currentQueue;
              var queueIndex = -1;
              function cleanUpNextTick() {
                if (!draining || !currentQueue) {
                  return;
                }
                draining = false;
                if (currentQueue.length) {
                  queue = currentQueue.concat(queue);
                } else {
                  queueIndex = -1;
                }
                if (queue.length) {
                  drainQueue();
                }
              }
              function drainQueue() {
                if (draining) {
                  return;
                }
                var timeout = runTimeout(cleanUpNextTick);
                draining = true;
                var len = queue.length;
                while (len) {
                  currentQueue = queue;
                  queue = [];
                  while (++queueIndex < len) {
                    if (currentQueue) {
                      currentQueue[queueIndex].run();
                    }
                  }
                  queueIndex = -1;
                  len = queue.length;
                }
                currentQueue = null;
                draining = false;
                runClearTimeout(timeout);
              }
              process.nextTick = function (fun) {
                var args = new Array(arguments.length - 1);
                if (arguments.length > 1) {
                  for (var i = 1; i < arguments.length; i++) {
                    args[i - 1] = arguments[i];
                  }
                }
                queue.push(new Item(fun, args));
                if (queue.length === 1 && !draining) {
                  runTimeout(drainQueue);
                }
              };
              function Item(fun, array) {
                this.fun = fun;
                this.array = array;
              }
              Item.prototype.run = function () {
                this.fun.apply(null, this.array);
              };
              process.title = 'browser';
              process.browser = true;
              process.env = {};
              process.argv = [];
              process.version = '';
              process.versions = {};
              function noop() {
              }
              process.on = noop;
              process.addListener = noop;
              process.once = noop;
              process.off = noop;
              process.removeListener = noop;
              process.removeAllListeners = noop;
              process.emit = noop;
              process.prependListener = noop;
              process.prependOnceListener = noop;
              process.listeners = function (name) {
                return [];
              };
              process.binding = function (name) {
                throw new Error('process.binding is not supported');
              };
              process.cwd = function () {
                return '/';
              };
              process.chdir = function (dir) {
                throw new Error('process.chdir is not supported');
              };
              process.umask = function () {
                return 0;
              };
            },
            {}
          ],
          2: [
            function (require, module, exports) {
              (function (setImmediate) {
                (function (root) {
                  var setTimeoutFunc = setTimeout;
                  function noop() {
                  }
                  function bind(fn, thisArg) {
                    return function () {
                      fn.apply(thisArg, arguments);
                    };
                  }
                  function Promise(fn) {
                    if (typeof this !== 'object')
                      throw new TypeError('Promises must be constructed via new');
                    if (typeof fn !== 'function')
                      throw new TypeError('not a function');
                    this._state = 0;
                    this._handled = false;
                    this._value = undefined;
                    this._deferreds = [];
                    doResolve(fn, this);
                  }
                  function handle(self, deferred) {
                    while (self._state === 3) {
                      self = self._value;
                    }
                    if (self._state === 0) {
                      self._deferreds.push(deferred);
                      return;
                    }
                    self._handled = true;
                    Promise._immediateFn(function () {
                      var cb = self._state === 1 ? deferred.onFulfilled : deferred.onRejected;
                      if (cb === null) {
                        (self._state === 1 ? resolve : reject)(deferred.promise, self._value);
                        return;
                      }
                      var ret;
                      try {
                        ret = cb(self._value);
                      } catch (e) {
                        reject(deferred.promise, e);
                        return;
                      }
                      resolve(deferred.promise, ret);
                    });
                  }
                  function resolve(self, newValue) {
                    try {
                      if (newValue === self)
                        throw new TypeError('A promise cannot be resolved with itself.');
                      if (newValue && (typeof newValue === 'object' || typeof newValue === 'function')) {
                        var then = newValue.then;
                        if (newValue instanceof Promise) {
                          self._state = 3;
                          self._value = newValue;
                          finale(self);
                          return;
                        } else if (typeof then === 'function') {
                          doResolve(bind(then, newValue), self);
                          return;
                        }
                      }
                      self._state = 1;
                      self._value = newValue;
                      finale(self);
                    } catch (e) {
                      reject(self, e);
                    }
                  }
                  function reject(self, newValue) {
                    self._state = 2;
                    self._value = newValue;
                    finale(self);
                  }
                  function finale(self) {
                    if (self._state === 2 && self._deferreds.length === 0) {
                      Promise._immediateFn(function () {
                        if (!self._handled) {
                          Promise._unhandledRejectionFn(self._value);
                        }
                      });
                    }
                    for (var i = 0, len = self._deferreds.length; i < len; i++) {
                      handle(self, self._deferreds[i]);
                    }
                    self._deferreds = null;
                  }
                  function Handler(onFulfilled, onRejected, promise) {
                    this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
                    this.onRejected = typeof onRejected === 'function' ? onRejected : null;
                    this.promise = promise;
                  }
                  function doResolve(fn, self) {
                    var done = false;
                    try {
                      fn(function (value) {
                        if (done)
                          return;
                        done = true;
                        resolve(self, value);
                      }, function (reason) {
                        if (done)
                          return;
                        done = true;
                        reject(self, reason);
                      });
                    } catch (ex) {
                      if (done)
                        return;
                      done = true;
                      reject(self, ex);
                    }
                  }
                  Promise.prototype['catch'] = function (onRejected) {
                    return this.then(null, onRejected);
                  };
                  Promise.prototype.then = function (onFulfilled, onRejected) {
                    var prom = new this.constructor(noop);
                    handle(this, new Handler(onFulfilled, onRejected, prom));
                    return prom;
                  };
                  Promise.all = function (arr) {
                    var args = Array.prototype.slice.call(arr);
                    return new Promise(function (resolve, reject) {
                      if (args.length === 0)
                        return resolve([]);
                      var remaining = args.length;
                      function res(i, val) {
                        try {
                          if (val && (typeof val === 'object' || typeof val === 'function')) {
                            var then = val.then;
                            if (typeof then === 'function') {
                              then.call(val, function (val) {
                                res(i, val);
                              }, reject);
                              return;
                            }
                          }
                          args[i] = val;
                          if (--remaining === 0) {
                            resolve(args);
                          }
                        } catch (ex) {
                          reject(ex);
                        }
                      }
                      for (var i = 0; i < args.length; i++) {
                        res(i, args[i]);
                      }
                    });
                  };
                  Promise.resolve = function (value) {
                    if (value && typeof value === 'object' && value.constructor === Promise) {
                      return value;
                    }
                    return new Promise(function (resolve) {
                      resolve(value);
                    });
                  };
                  Promise.reject = function (value) {
                    return new Promise(function (resolve, reject) {
                      reject(value);
                    });
                  };
                  Promise.race = function (values) {
                    return new Promise(function (resolve, reject) {
                      for (var i = 0, len = values.length; i < len; i++) {
                        values[i].then(resolve, reject);
                      }
                    });
                  };
                  Promise._immediateFn = typeof setImmediate === 'function' ? function (fn) {
                    setImmediate(fn);
                  } : function (fn) {
                    setTimeoutFunc(fn, 0);
                  };
                  Promise._unhandledRejectionFn = function _unhandledRejectionFn(err) {
                    if (typeof console !== 'undefined' && console) {
                      console.warn('Possible Unhandled Promise Rejection:', err);
                    }
                  };
                  Promise._setImmediateFn = function _setImmediateFn(fn) {
                    Promise._immediateFn = fn;
                  };
                  Promise._setUnhandledRejectionFn = function _setUnhandledRejectionFn(fn) {
                    Promise._unhandledRejectionFn = fn;
                  };
                  if (typeof module !== 'undefined' && module.exports) {
                    module.exports = Promise;
                  } else if (!root.Promise) {
                    root.Promise = Promise;
                  }
                }(this));
              }.call(this, require('timers').setImmediate));
            },
            { 'timers': 3 }
          ],
          3: [
            function (require, module, exports) {
              (function (setImmediate, clearImmediate) {
                var nextTick = require('process/browser.js').nextTick;
                var apply = Function.prototype.apply;
                var slice = Array.prototype.slice;
                var immediateIds = {};
                var nextImmediateId = 0;
                exports.setTimeout = function () {
                  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
                };
                exports.setInterval = function () {
                  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
                };
                exports.clearTimeout = exports.clearInterval = function (timeout) {
                  timeout.close();
                };
                function Timeout(id, clearFn) {
                  this._id = id;
                  this._clearFn = clearFn;
                }
                Timeout.prototype.unref = Timeout.prototype.ref = function () {
                };
                Timeout.prototype.close = function () {
                  this._clearFn.call(window, this._id);
                };
                exports.enroll = function (item, msecs) {
                  clearTimeout(item._idleTimeoutId);
                  item._idleTimeout = msecs;
                };
                exports.unenroll = function (item) {
                  clearTimeout(item._idleTimeoutId);
                  item._idleTimeout = -1;
                };
                exports._unrefActive = exports.active = function (item) {
                  clearTimeout(item._idleTimeoutId);
                  var msecs = item._idleTimeout;
                  if (msecs >= 0) {
                    item._idleTimeoutId = setTimeout(function onTimeout() {
                      if (item._onTimeout)
                        item._onTimeout();
                    }, msecs);
                  }
                };
                exports.setImmediate = typeof setImmediate === 'function' ? setImmediate : function (fn) {
                  var id = nextImmediateId++;
                  var args = arguments.length < 2 ? false : slice.call(arguments, 1);
                  immediateIds[id] = true;
                  nextTick(function onNextTick() {
                    if (immediateIds[id]) {
                      if (args) {
                        fn.apply(null, args);
                      } else {
                        fn.call(null);
                      }
                      exports.clearImmediate(id);
                    }
                  });
                  return id;
                };
                exports.clearImmediate = typeof clearImmediate === 'function' ? clearImmediate : function (id) {
                  delete immediateIds[id];
                };
              }.call(this, require('timers').setImmediate, require('timers').clearImmediate));
            },
            {
              'process/browser.js': 1,
              'timers': 3
            }
          ],
          4: [
            function (require, module, exports) {
              var promisePolyfill = require('promise-polyfill');
              var Global = function () {
                if (typeof window !== 'undefined') {
                  return window;
                } else {
                  return Function('return this;')();
                }
              }();
              module.exports = { boltExport: Global.Promise || promisePolyfill };
            },
            { 'promise-polyfill': 2 }
          ]
        }, {}, [4])(4);
      }));
    }(undefined, exports$1, module$1, undefined));
    var Promise = module$1.exports.boltExport;

    var nu$3 = function (baseFn) {
      var data = Option.none();
      var callbacks = [];
      var map = function (f) {
        return nu$3(function (nCallback) {
          get(function (data) {
            nCallback(f(data));
          });
        });
      };
      var get = function (nCallback) {
        if (isReady()) {
          call(nCallback);
        } else {
          callbacks.push(nCallback);
        }
      };
      var set = function (x) {
        data = Option.some(x);
        run(callbacks);
        callbacks = [];
      };
      var isReady = function () {
        return data.isSome();
      };
      var run = function (cbs) {
        each(cbs, call);
      };
      var call = function (cb) {
        data.each(function (x) {
          domGlobals.setTimeout(function () {
            cb(x);
          }, 0);
        });
      };
      baseFn(set);
      return {
        get: get,
        map: map,
        isReady: isReady
      };
    };
    var pure = function (a) {
      return nu$3(function (callback) {
        callback(a);
      });
    };
    var LazyValue = {
      nu: nu$3,
      pure: pure
    };

    var errorReporter = function (err) {
      domGlobals.setTimeout(function () {
        throw err;
      }, 0);
    };
    var make = function (run) {
      var get = function (callback) {
        run().then(callback, errorReporter);
      };
      var map = function (fab) {
        return make(function () {
          return run().then(fab);
        });
      };
      var bind = function (aFutureB) {
        return make(function () {
          return run().then(function (v) {
            return aFutureB(v).toPromise();
          });
        });
      };
      var anonBind = function (futureB) {
        return make(function () {
          return run().then(function () {
            return futureB.toPromise();
          });
        });
      };
      var toLazy = function () {
        return LazyValue.nu(get);
      };
      var toCached = function () {
        var cache = null;
        return make(function () {
          if (cache === null) {
            cache = run();
          }
          return cache;
        });
      };
      var toPromise = run;
      return {
        map: map,
        bind: bind,
        anonBind: anonBind,
        toLazy: toLazy,
        toCached: toCached,
        toPromise: toPromise,
        get: get
      };
    };
    var nu$4 = function (baseFn) {
      return make(function () {
        return new Promise(baseFn);
      });
    };
    var pure$1 = function (a) {
      return make(function () {
        return Promise.resolve(a);
      });
    };
    var Future = {
      nu: nu$4,
      pure: pure$1
    };

    var par = function (asyncValues, nu) {
      return nu(function (callback) {
        var r = [];
        var count = 0;
        var cb = function (i) {
          return function (value) {
            r[i] = value;
            count++;
            if (count >= asyncValues.length) {
              callback(r);
            }
          };
        };
        if (asyncValues.length === 0) {
          callback([]);
        } else {
          each(asyncValues, function (asyncValue, i) {
            asyncValue.get(cb(i));
          });
        }
      });
    };

    var par$1 = function (futures) {
      return par(futures, Future.nu);
    };

    var value = function (o) {
      var is = function (v) {
        return o === v;
      };
      var or = function (opt) {
        return value(o);
      };
      var orThunk = function (f) {
        return value(o);
      };
      var map = function (f) {
        return value(f(o));
      };
      var mapError = function (f) {
        return value(o);
      };
      var each = function (f) {
        f(o);
      };
      var bind = function (f) {
        return f(o);
      };
      var fold = function (_, onValue) {
        return onValue(o);
      };
      var exists = function (f) {
        return f(o);
      };
      var forall = function (f) {
        return f(o);
      };
      var toOption = function () {
        return Option.some(o);
      };
      return {
        is: is,
        isValue: always,
        isError: never,
        getOr: constant(o),
        getOrThunk: constant(o),
        getOrDie: constant(o),
        or: or,
        orThunk: orThunk,
        fold: fold,
        map: map,
        mapError: mapError,
        each: each,
        bind: bind,
        exists: exists,
        forall: forall,
        toOption: toOption
      };
    };
    var error = function (message) {
      var getOrThunk = function (f) {
        return f();
      };
      var getOrDie = function () {
        return die(String(message))();
      };
      var or = function (opt) {
        return opt;
      };
      var orThunk = function (f) {
        return f();
      };
      var map = function (f) {
        return error(message);
      };
      var mapError = function (f) {
        return error(f(message));
      };
      var bind = function (f) {
        return error(message);
      };
      var fold = function (onError, _) {
        return onError(message);
      };
      return {
        is: never,
        isValue: never,
        isError: always,
        getOr: identity,
        getOrThunk: getOrThunk,
        getOrDie: getOrDie,
        or: or,
        orThunk: orThunk,
        fold: fold,
        map: map,
        mapError: mapError,
        each: noop,
        bind: bind,
        exists: never,
        forall: always,
        toOption: Option.none
      };
    };
    var fromOption = function (opt, err) {
      return opt.fold(function () {
        return error(err);
      }, value);
    };
    var Result = {
      value: value,
      error: error,
      fromOption: fromOption
    };

    var promise = function () {
      function bind(fn, thisArg) {
        return function () {
          fn.apply(thisArg, arguments);
        };
      }
      var isArray = Array.isArray || function (value) {
        return Object.prototype.toString.call(value) === '[object Array]';
      };
      var Promise = function (fn) {
        if (typeof this !== 'object') {
          throw new TypeError('Promises must be constructed via new');
        }
        if (typeof fn !== 'function') {
          throw new TypeError('not a function');
        }
        this._state = null;
        this._value = null;
        this._deferreds = [];
        doResolve(fn, bind(resolve, this), bind(reject, this));
      };
      var asap = Promise.immediateFn || typeof domGlobals.setImmediate === 'function' && domGlobals.setImmediate || function (fn) {
        domGlobals.setTimeout(fn, 1);
      };
      function handle(deferred) {
        var me = this;
        if (this._state === null) {
          this._deferreds.push(deferred);
          return;
        }
        asap(function () {
          var cb = me._state ? deferred.onFulfilled : deferred.onRejected;
          if (cb === null) {
            (me._state ? deferred.resolve : deferred.reject)(me._value);
            return;
          }
          var ret;
          try {
            ret = cb(me._value);
          } catch (e) {
            deferred.reject(e);
            return;
          }
          deferred.resolve(ret);
        });
      }
      function resolve(newValue) {
        try {
          if (newValue === this) {
            throw new TypeError('A promise cannot be resolved with itself.');
          }
          if (newValue && (typeof newValue === 'object' || typeof newValue === 'function')) {
            var then = newValue.then;
            if (typeof then === 'function') {
              doResolve(bind(then, newValue), bind(resolve, this), bind(reject, this));
              return;
            }
          }
          this._state = true;
          this._value = newValue;
          finale.call(this);
        } catch (e) {
          reject.call(this, e);
        }
      }
      function reject(newValue) {
        this._state = false;
        this._value = newValue;
        finale.call(this);
      }
      function finale() {
        for (var i = 0, len = this._deferreds.length; i < len; i++) {
          handle.call(this, this._deferreds[i]);
        }
        this._deferreds = null;
      }
      function Handler(onFulfilled, onRejected, resolve, reject) {
        this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
        this.onRejected = typeof onRejected === 'function' ? onRejected : null;
        this.resolve = resolve;
        this.reject = reject;
      }
      function doResolve(fn, onFulfilled, onRejected) {
        var done = false;
        try {
          fn(function (value) {
            if (done) {
              return;
            }
            done = true;
            onFulfilled(value);
          }, function (reason) {
            if (done) {
              return;
            }
            done = true;
            onRejected(reason);
          });
        } catch (ex) {
          if (done) {
            return;
          }
          done = true;
          onRejected(ex);
        }
      }
      Promise.prototype.catch = function (onRejected) {
        return this.then(null, onRejected);
      };
      Promise.prototype.then = function (onFulfilled, onRejected) {
        var me = this;
        return new Promise(function (resolve, reject) {
          handle.call(me, new Handler(onFulfilled, onRejected, resolve, reject));
        });
      };
      Promise.all = function () {
        var args = Array.prototype.slice.call(arguments.length === 1 && isArray(arguments[0]) ? arguments[0] : arguments);
        return new Promise(function (resolve, reject) {
          if (args.length === 0) {
            return resolve([]);
          }
          var remaining = args.length;
          function res(i, val) {
            try {
              if (val && (typeof val === 'object' || typeof val === 'function')) {
                var then = val.then;
                if (typeof then === 'function') {
                  then.call(val, function (val) {
                    res(i, val);
                  }, reject);
                  return;
                }
              }
              args[i] = val;
              if (--remaining === 0) {
                resolve(args);
              }
            } catch (ex) {
              reject(ex);
            }
          }
          for (var i = 0; i < args.length; i++) {
            res(i, args[i]);
          }
        });
      };
      Promise.resolve = function (value) {
        if (value && typeof value === 'object' && value.constructor === Promise) {
          return value;
        }
        return new Promise(function (resolve) {
          resolve(value);
        });
      };
      Promise.reject = function (value) {
        return new Promise(function (resolve, reject) {
          reject(value);
        });
      };
      Promise.race = function (values) {
        return new Promise(function (resolve, reject) {
          for (var i = 0, len = values.length; i < len; i++) {
            values[i].then(resolve, reject);
          }
        });
      };
      return Promise;
    };
    var promiseObj = window.Promise ? window.Promise : promise();

    var requestAnimationFramePromise;
    var requestAnimationFrame = function (callback, element) {
      var i, requestAnimationFrameFunc = domGlobals.window.requestAnimationFrame;
      var vendors = [
        'ms',
        'moz',
        'webkit'
      ];
      var featurefill = function (callback) {
        domGlobals.window.setTimeout(callback, 0);
      };
      for (i = 0; i < vendors.length && !requestAnimationFrameFunc; i++) {
        requestAnimationFrameFunc = domGlobals.window[vendors[i] + 'RequestAnimationFrame'];
      }
      if (!requestAnimationFrameFunc) {
        requestAnimationFrameFunc = featurefill;
      }
      requestAnimationFrameFunc(callback, element);
    };
    var wrappedSetTimeout = function (callback, time) {
      if (typeof time !== 'number') {
        time = 0;
      }
      return domGlobals.setTimeout(callback, time);
    };
    var wrappedSetInterval = function (callback, time) {
      if (typeof time !== 'number') {
        time = 1;
      }
      return domGlobals.setInterval(callback, time);
    };
    var wrappedClearTimeout = function (id) {
      return domGlobals.clearTimeout(id);
    };
    var wrappedClearInterval = function (id) {
      return domGlobals.clearInterval(id);
    };
    var debounce = function (callback, time) {
      var timer, func;
      func = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        domGlobals.clearTimeout(timer);
        timer = wrappedSetTimeout(function () {
          callback.apply(this, args);
        }, time);
      };
      func.stop = function () {
        domGlobals.clearTimeout(timer);
      };
      return func;
    };
    var Delay = {
      requestAnimationFrame: function (callback, element) {
        if (requestAnimationFramePromise) {
          requestAnimationFramePromise.then(callback);
          return;
        }
        requestAnimationFramePromise = new promiseObj(function (resolve) {
          if (!element) {
            element = domGlobals.document.body;
          }
          requestAnimationFrame(resolve, element);
        }).then(callback);
      },
      setTimeout: wrappedSetTimeout,
      setInterval: wrappedSetInterval,
      setEditorTimeout: function (editor, callback, time) {
        return wrappedSetTimeout(function () {
          if (!editor.removed) {
            callback();
          }
        }, time);
      },
      setEditorInterval: function (editor, callback, time) {
        var timer;
        timer = wrappedSetInterval(function () {
          if (!editor.removed) {
            callback();
          } else {
            domGlobals.clearInterval(timer);
          }
        }, time);
        return timer;
      },
      debounce: debounce,
      throttle: debounce,
      clearInterval: wrappedClearInterval,
      clearTimeout: wrappedClearTimeout
    };

    var userAgent = domGlobals.navigator.userAgent;
    var platform$1 = detect$3();
    var browser$2 = platform$1.browser;
    var os = platform$1.os;
    var deviceType = platform$1.deviceType;
    var webkit = /WebKit/.test(userAgent) && !browser$2.isEdge();
    var fileApi = 'FormData' in domGlobals.window && 'FileReader' in domGlobals.window && 'URL' in domGlobals.window && !!domGlobals.URL.createObjectURL;
    var windowsPhone = userAgent.indexOf('Windows Phone') !== -1;
    var Env = {
      opera: browser$2.isOpera(),
      webkit: webkit,
      ie: browser$2.isIE() || browser$2.isEdge() ? browser$2.version.major : false,
      gecko: browser$2.isFirefox(),
      mac: os.isOSX() || os.isiOS(),
      iOS: deviceType.isiPad() || deviceType.isiPhone(),
      android: os.isAndroid(),
      contentEditable: true,
      transparentSrc: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
      caretAfter: true,
      range: domGlobals.window.getSelection && 'Range' in domGlobals.window,
      documentMode: browser$2.isIE() ? domGlobals.document.documentMode || 7 : 10,
      fileApi: fileApi,
      ceFalse: true,
      cacheSuffix: null,
      container: null,
      experimentalShadowDom: false,
      canHaveCSP: !browser$2.isIE(),
      desktop: deviceType.isDesktop(),
      windowsPhone: windowsPhone,
      browser: {
        current: browser$2.current,
        version: browser$2.version,
        isChrome: browser$2.isChrome,
        isEdge: browser$2.isEdge,
        isFirefox: browser$2.isFirefox,
        isIE: browser$2.isIE,
        isOpera: browser$2.isOpera,
        isSafari: browser$2.isSafari
      },
      os: {
        current: os.current,
        version: os.version,
        isAndroid: os.isAndroid,
        isChromeOS: os.isChromeOS,
        isFreeBSD: os.isFreeBSD,
        isiOS: os.isiOS,
        isLinux: os.isLinux,
        isOSX: os.isOSX,
        isSolaris: os.isSolaris,
        isWindows: os.isWindows
      },
      deviceType: {
        isDesktop: deviceType.isDesktop,
        isiPad: deviceType.isiPad,
        isiPhone: deviceType.isiPhone,
        isPhone: deviceType.isPhone,
        isTablet: deviceType.isTablet,
        isTouch: deviceType.isTouch,
        isWebView: deviceType.isWebView
      }
    };

    var isArray$1 = Array.isArray;
    var toArray$1 = function (obj) {
      var array = obj, i, l;
      if (!isArray$1(obj)) {
        array = [];
        for (i = 0, l = obj.length; i < l; i++) {
          array[i] = obj[i];
        }
      }
      return array;
    };
    var each$2 = function (o, cb, s) {
      var n, l;
      if (!o) {
        return 0;
      }
      s = s || o;
      if (o.length !== undefined) {
        for (n = 0, l = o.length; n < l; n++) {
          if (cb.call(s, o[n], n, o) === false) {
            return 0;
          }
        }
      } else {
        for (n in o) {
          if (o.hasOwnProperty(n)) {
            if (cb.call(s, o[n], n, o) === false) {
              return 0;
            }
          }
        }
      }
      return 1;
    };
    var map$2 = function (array, callback) {
      var out = [];
      each$2(array, function (item, index) {
        out.push(callback(item, index, array));
      });
      return out;
    };
    var filter$2 = function (a, f) {
      var o = [];
      each$2(a, function (v, index) {
        if (!f || f(v, index, a)) {
          o.push(v);
        }
      });
      return o;
    };
    var indexOf$1 = function (a, v) {
      var i, l;
      if (a) {
        for (i = 0, l = a.length; i < l; i++) {
          if (a[i] === v) {
            return i;
          }
        }
      }
      return -1;
    };
    var reduce = function (collection, iteratee, accumulator, thisArg) {
      var i = 0;
      if (arguments.length < 3) {
        accumulator = collection[0];
      }
      for (; i < collection.length; i++) {
        accumulator = iteratee.call(thisArg, accumulator, collection[i], i);
      }
      return accumulator;
    };
    var findIndex$1 = function (array, predicate, thisArg) {
      var i, l;
      for (i = 0, l = array.length; i < l; i++) {
        if (predicate.call(thisArg, array[i], i, array)) {
          return i;
        }
      }
      return -1;
    };
    var find$2 = function (array, predicate, thisArg) {
      var idx = findIndex$1(array, predicate, thisArg);
      if (idx !== -1) {
        return array[idx];
      }
      return undefined;
    };
    var last$1 = function (collection) {
      return collection[collection.length - 1];
    };
    var ArrUtils = {
      isArray: isArray$1,
      toArray: toArray$1,
      each: each$2,
      map: map$2,
      filter: filter$2,
      indexOf: indexOf$1,
      reduce: reduce,
      findIndex: findIndex$1,
      find: find$2,
      last: last$1
    };

    var whiteSpaceRegExp = /^\s*|\s*$/g;
    var trim$1 = function (str) {
      return str === null || str === undefined ? '' : ('' + str).replace(whiteSpaceRegExp, '');
    };
    var is$1 = function (obj, type) {
      if (!type) {
        return obj !== undefined;
      }
      if (type === 'array' && ArrUtils.isArray(obj)) {
        return true;
      }
      return typeof obj === type;
    };
    var makeMap = function (items, delim, map) {
      var i;
      items = items || [];
      delim = delim || ',';
      if (typeof items === 'string') {
        items = items.split(delim);
      }
      map = map || {};
      i = items.length;
      while (i--) {
        map[items[i]] = {};
      }
      return map;
    };
    var hasOwnProperty$1 = function (obj, prop) {
      return Object.prototype.hasOwnProperty.call(obj, prop);
    };
    var create = function (s, p, root) {
      var self = this;
      var sp, ns, cn, scn, c, de = 0;
      s = /^((static) )?([\w.]+)(:([\w.]+))?/.exec(s);
      cn = s[3].match(/(^|\.)(\w+)$/i)[2];
      ns = self.createNS(s[3].replace(/\.\w+$/, ''), root);
      if (ns[cn]) {
        return;
      }
      if (s[2] === 'static') {
        ns[cn] = p;
        if (this.onCreate) {
          this.onCreate(s[2], s[3], ns[cn]);
        }
        return;
      }
      if (!p[cn]) {
        p[cn] = function () {
        };
        de = 1;
      }
      ns[cn] = p[cn];
      self.extend(ns[cn].prototype, p);
      if (s[5]) {
        sp = self.resolve(s[5]).prototype;
        scn = s[5].match(/\.(\w+)$/i)[1];
        c = ns[cn];
        if (de) {
          ns[cn] = function () {
            return sp[scn].apply(this, arguments);
          };
        } else {
          ns[cn] = function () {
            this.parent = sp[scn];
            return c.apply(this, arguments);
          };
        }
        ns[cn].prototype[cn] = ns[cn];
        self.each(sp, function (f, n) {
          ns[cn].prototype[n] = sp[n];
        });
        self.each(p, function (f, n) {
          if (sp[n]) {
            ns[cn].prototype[n] = function () {
              this.parent = sp[n];
              return f.apply(this, arguments);
            };
          } else {
            if (n !== cn) {
              ns[cn].prototype[n] = f;
            }
          }
        });
      }
      self.each(p.static, function (f, n) {
        ns[cn][n] = f;
      });
    };
    var extend = function (obj, ext) {
      var x = [];
      for (var _i = 2; _i < arguments.length; _i++) {
        x[_i - 2] = arguments[_i];
      }
      var i, l, name;
      var args = arguments;
      var value;
      for (i = 1, l = args.length; i < l; i++) {
        ext = args[i];
        for (name in ext) {
          if (ext.hasOwnProperty(name)) {
            value = ext[name];
            if (value !== undefined) {
              obj[name] = value;
            }
          }
        }
      }
      return obj;
    };
    var walk = function (o, f, n, s) {
      s = s || this;
      if (o) {
        if (n) {
          o = o[n];
        }
        ArrUtils.each(o, function (o, i) {
          if (f.call(s, o, i, n) === false) {
            return false;
          }
          walk(o, f, n, s);
        });
      }
    };
    var createNS = function (n, o) {
      var i, v;
      o = o || domGlobals.window;
      n = n.split('.');
      for (i = 0; i < n.length; i++) {
        v = n[i];
        if (!o[v]) {
          o[v] = {};
        }
        o = o[v];
      }
      return o;
    };
    var resolve = function (n, o) {
      var i, l;
      o = o || domGlobals.window;
      n = n.split('.');
      for (i = 0, l = n.length; i < l; i++) {
        o = o[n[i]];
        if (!o) {
          break;
        }
      }
      return o;
    };
    var explode = function (s, d) {
      if (!s || is$1(s, 'array')) {
        return s;
      }
      return ArrUtils.map(s.split(d || ','), trim$1);
    };
    var _addCacheSuffix = function (url) {
      var cacheSuffix = Env.cacheSuffix;
      if (cacheSuffix) {
        url += (url.indexOf('?') === -1 ? '?' : '&') + cacheSuffix;
      }
      return url;
    };
    var Tools = {
      trim: trim$1,
      isArray: ArrUtils.isArray,
      is: is$1,
      toArray: ArrUtils.toArray,
      makeMap: makeMap,
      each: ArrUtils.each,
      map: ArrUtils.map,
      grep: ArrUtils.filter,
      inArray: ArrUtils.indexOf,
      hasOwn: hasOwnProperty$1,
      extend: extend,
      create: create,
      walk: walk,
      createNS: createNS,
      resolve: resolve,
      explode: explode,
      _addCacheSuffix: _addCacheSuffix
    };

    function StyleSheetLoader(document, settings) {
      if (settings === void 0) {
        settings = {};
      }
      var idCount = 0;
      var loadedStates = {};
      var maxLoadTime;
      maxLoadTime = settings.maxLoadTime || 5000;
      var _setReferrerPolicy = function (referrerPolicy) {
        settings.referrerPolicy = referrerPolicy;
      };
      var appendToHead = function (node) {
        document.getElementsByTagName('head')[0].appendChild(node);
      };
      var load = function (url, loadedCallback, errorCallback) {
        var link, style, startTime, state;
        var resolve = function (status) {
          state.status = status;
          state.passed = [];
          state.failed = [];
          if (link) {
            link.onload = null;
            link.onerror = null;
            link = null;
          }
        };
        var passed = function () {
          var callbacks = state.passed;
          var i = callbacks.length;
          while (i--) {
            callbacks[i]();
          }
          resolve(2);
        };
        var failed = function () {
          var callbacks = state.failed;
          var i = callbacks.length;
          while (i--) {
            callbacks[i]();
          }
          resolve(3);
        };
        var isOldWebKit = function () {
          var webKitChunks = domGlobals.navigator.userAgent.match(/WebKit\/(\d*)/);
          return !!(webKitChunks && parseInt(webKitChunks[1], 10) < 536);
        };
        var wait = function (testCallback, waitCallback) {
          if (!testCallback()) {
            if (new Date().getTime() - startTime < maxLoadTime) {
              Delay.setTimeout(waitCallback);
            } else {
              failed();
            }
          }
        };
        var waitForWebKitLinkLoaded = function () {
          wait(function () {
            var styleSheets = document.styleSheets;
            var styleSheet, i = styleSheets.length, owner;
            while (i--) {
              styleSheet = styleSheets[i];
              owner = styleSheet.ownerNode ? styleSheet.ownerNode : styleSheet.owningElement;
              if (owner && owner.id === link.id) {
                passed();
                return true;
              }
            }
          }, waitForWebKitLinkLoaded);
        };
        var waitForGeckoLinkLoaded = function () {
          wait(function () {
            try {
              var cssRules = style.sheet.cssRules;
              passed();
              return !!cssRules;
            } catch (ex) {
            }
          }, waitForGeckoLinkLoaded);
        };
        url = Tools._addCacheSuffix(url);
        if (!loadedStates[url]) {
          state = {
            passed: [],
            failed: []
          };
          loadedStates[url] = state;
        } else {
          state = loadedStates[url];
        }
        if (loadedCallback) {
          state.passed.push(loadedCallback);
        }
        if (errorCallback) {
          state.failed.push(errorCallback);
        }
        if (state.status === 1) {
          return;
        }
        if (state.status === 2) {
          passed();
          return;
        }
        if (state.status === 3) {
          failed();
          return;
        }
        state.status = 1;
        link = document.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.id = 'u' + idCount++;
        link.async = false;
        link.defer = false;
        startTime = new Date().getTime();
        if (settings.contentCssCors) {
          link.crossOrigin = 'anonymous';
        }
        if (settings.referrerPolicy) {
          set(Element.fromDom(link), 'referrerpolicy', settings.referrerPolicy);
        }
        if ('onload' in link && !isOldWebKit()) {
          link.onload = waitForWebKitLinkLoaded;
          link.onerror = failed;
        } else {
          if (domGlobals.navigator.userAgent.indexOf('Firefox') > 0) {
            style = document.createElement('style');
            style.textContent = '@import "' + url + '"';
            waitForGeckoLinkLoaded();
            appendToHead(style);
            return;
          }
          waitForWebKitLinkLoaded();
        }
        appendToHead(link);
        link.href = url;
      };
      var loadF = function (url) {
        return Future.nu(function (resolve) {
          load(url, compose(resolve, constant(Result.value(url))), compose(resolve, constant(Result.error(url))));
        });
      };
      var unbox = function (result) {
        return result.fold(identity, identity);
      };
      var loadAll = function (urls, success, failure) {
        par$1(map(urls, loadF)).get(function (result) {
          var parts = partition(result, function (r) {
            return r.isValue();
          });
          if (parts.fail.length > 0) {
            failure(parts.fail.map(unbox));
          } else {
            success(parts.pass.map(unbox));
          }
        });
      };
      return {
        load: load,
        loadAll: loadAll,
        _setReferrerPolicy: _setReferrerPolicy
      };
    }

    var blocks = [
      'article',
      'aside',
      'details',
      'div',
      'dt',
      'figcaption',
      'footer',
      'form',
      'fieldset',
      'header',
      'hgroup',
      'html',
      'main',
      'nav',
      'section',
      'summary',
      'body',
      'p',
      'dl',
      'multicol',
      'dd',
      'figure',
      'address',
      'center',
      'blockquote',
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'listing',
      'xmp',
      'pre',
      'plaintext',
      'menu',
      'dir',
      'ul',
      'ol',
      'li',
      'hr',
      'table',
      'tbody',
      'thead',
      'tfoot',
      'th',
      'tr',
      'td',
      'caption'
    ];
    var voids = [
      'area',
      'base',
      'basefont',
      'br',
      'col',
      'frame',
      'hr',
      'img',
      'input',
      'isindex',
      'link',
      'meta',
      'param',
      'embed',
      'source',
      'wbr',
      'track'
    ];
    var tableCells = [
      'td',
      'th'
    ];
    var tableSections = [
      'thead',
      'tbody',
      'tfoot'
    ];
    var textBlocks = [
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'p',
      'div',
      'address',
      'pre',
      'form',
      'blockquote',
      'center',
      'dir',
      'fieldset',
      'header',
      'footer',
      'article',
      'section',
      'hgroup',
      'aside',
      'nav',
      'figure'
    ];
    var headings = [
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6'
    ];
    var listItems = [
      'li',
      'dd',
      'dt'
    ];
    var lists = [
      'ul',
      'ol',
      'dl'
    ];
    var wsElements = [
      'pre',
      'script',
      'textarea',
      'style'
    ];
    var lazyLookup = function (items) {
      var lookup;
      return function (node) {
        lookup = lookup ? lookup : mapToObject(items, constant(true));
        return lookup.hasOwnProperty(name(node));
      };
    };
    var isHeading = lazyLookup(headings);
    var isBlock = lazyLookup(blocks);
    var isTable$1 = function (node) {
      return name(node) === 'table';
    };
    var isInline = function (node) {
      return isElement(node) && !isBlock(node);
    };
    var isBr$1 = function (node) {
      return isElement(node) && name(node) === 'br';
    };
    var isTextBlock = lazyLookup(textBlocks);
    var isList = lazyLookup(lists);
    var isListItem = lazyLookup(listItems);
    var isVoid = lazyLookup(voids);
    var isTableSection = lazyLookup(tableSections);
    var isTableCell = lazyLookup(tableCells);
    var isWsPreserveElement = lazyLookup(wsElements);

    var surroundedBySpans = function (node) {
      var previousIsSpan = node.previousSibling && node.previousSibling.nodeName === 'SPAN';
      var nextIsSpan = node.nextSibling && node.nextSibling.nodeName === 'SPAN';
      return previousIsSpan && nextIsSpan;
    };
    var isBookmarkNode = function (node) {
      return node && node.tagName === 'SPAN' && node.getAttribute('data-mce-type') === 'bookmark';
    };
    var trimNode = function (dom, node) {
      var i, children = node.childNodes;
      if (NodeType.isElement(node) && isBookmarkNode(node)) {
        return;
      }
      for (i = children.length - 1; i >= 0; i--) {
        trimNode(dom, children[i]);
      }
      if (NodeType.isDocument(node) === false) {
        if (NodeType.isText(node) && node.nodeValue.length > 0) {
          var trimmedLength = Tools.trim(node.nodeValue).length;
          if (dom.isBlock(node.parentNode) || trimmedLength > 0) {
            return;
          }
          if (trimmedLength === 0 && surroundedBySpans(node)) {
            return;
          }
        } else if (NodeType.isElement(node)) {
          children = node.childNodes;
          if (children.length === 1 && isBookmarkNode(children[0])) {
            node.parentNode.insertBefore(children[0], node);
          }
          if (children.length || isVoid(Element.fromDom(node))) {
            return;
          }
        }
        dom.remove(node);
      }
      return node;
    };
    var TrimNode = { trimNode: trimNode };

    var makeMap$1 = Tools.makeMap;
    var namedEntities, baseEntities, reverseEntities;
    var attrsCharsRegExp = /[&<>\"\u0060\u007E-\uD7FF\uE000-\uFFEF]|[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
    var textCharsRegExp = /[<>&\u007E-\uD7FF\uE000-\uFFEF]|[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
    var rawCharsRegExp = /[<>&\"\']/g;
    var entityRegExp = /&#([a-z0-9]+);?|&([a-z0-9]+);/gi;
    var asciiMap = {
      128: '\u20AC',
      130: '\u201A',
      131: '\u0192',
      132: '\u201E',
      133: '\u2026',
      134: '\u2020',
      135: '\u2021',
      136: '\u02c6',
      137: '\u2030',
      138: '\u0160',
      139: '\u2039',
      140: '\u0152',
      142: '\u017d',
      145: '\u2018',
      146: '\u2019',
      147: '\u201C',
      148: '\u201D',
      149: '\u2022',
      150: '\u2013',
      151: '\u2014',
      152: '\u02DC',
      153: '\u2122',
      154: '\u0161',
      155: '\u203A',
      156: '\u0153',
      158: '\u017e',
      159: '\u0178'
    };
    baseEntities = {
      '"': '&quot;',
      '\'': '&#39;',
      '<': '&lt;',
      '>': '&gt;',
      '&': '&amp;',
      '`': '&#96;'
    };
    reverseEntities = {
      '&lt;': '<',
      '&gt;': '>',
      '&amp;': '&',
      '&quot;': '"',
      '&apos;': '\''
    };
    var nativeDecode = function (text) {
      var elm;
      elm = Element.fromTag('div').dom();
      elm.innerHTML = text;
      return elm.textContent || elm.innerText || text;
    };
    var buildEntitiesLookup = function (items, radix) {
      var i, chr, entity;
      var lookup = {};
      if (items) {
        items = items.split(',');
        radix = radix || 10;
        for (i = 0; i < items.length; i += 2) {
          chr = String.fromCharCode(parseInt(items[i], radix));
          if (!baseEntities[chr]) {
            entity = '&' + items[i + 1] + ';';
            lookup[chr] = entity;
            lookup[entity] = chr;
          }
        }
        return lookup;
      }
    };
    namedEntities = buildEntitiesLookup('50,nbsp,51,iexcl,52,cent,53,pound,54,curren,55,yen,56,brvbar,57,sect,58,uml,59,copy,' + '5a,ordf,5b,laquo,5c,not,5d,shy,5e,reg,5f,macr,5g,deg,5h,plusmn,5i,sup2,5j,sup3,5k,acute,' + '5l,micro,5m,para,5n,middot,5o,cedil,5p,sup1,5q,ordm,5r,raquo,5s,frac14,5t,frac12,5u,frac34,' + '5v,iquest,60,Agrave,61,Aacute,62,Acirc,63,Atilde,64,Auml,65,Aring,66,AElig,67,Ccedil,' + '68,Egrave,69,Eacute,6a,Ecirc,6b,Euml,6c,Igrave,6d,Iacute,6e,Icirc,6f,Iuml,6g,ETH,6h,Ntilde,' + '6i,Ograve,6j,Oacute,6k,Ocirc,6l,Otilde,6m,Ouml,6n,times,6o,Oslash,6p,Ugrave,6q,Uacute,' + '6r,Ucirc,6s,Uuml,6t,Yacute,6u,THORN,6v,szlig,70,agrave,71,aacute,72,acirc,73,atilde,74,auml,' + '75,aring,76,aelig,77,ccedil,78,egrave,79,eacute,7a,ecirc,7b,euml,7c,igrave,7d,iacute,7e,icirc,' + '7f,iuml,7g,eth,7h,ntilde,7i,ograve,7j,oacute,7k,ocirc,7l,otilde,7m,ouml,7n,divide,7o,oslash,' + '7p,ugrave,7q,uacute,7r,ucirc,7s,uuml,7t,yacute,7u,thorn,7v,yuml,ci,fnof,sh,Alpha,si,Beta,' + 'sj,Gamma,sk,Delta,sl,Epsilon,sm,Zeta,sn,Eta,so,Theta,sp,Iota,sq,Kappa,sr,Lambda,ss,Mu,' + 'st,Nu,su,Xi,sv,Omicron,t0,Pi,t1,Rho,t3,Sigma,t4,Tau,t5,Upsilon,t6,Phi,t7,Chi,t8,Psi,' + 't9,Omega,th,alpha,ti,beta,tj,gamma,tk,delta,tl,epsilon,tm,zeta,tn,eta,to,theta,tp,iota,' + 'tq,kappa,tr,lambda,ts,mu,tt,nu,tu,xi,tv,omicron,u0,pi,u1,rho,u2,sigmaf,u3,sigma,u4,tau,' + 'u5,upsilon,u6,phi,u7,chi,u8,psi,u9,omega,uh,thetasym,ui,upsih,um,piv,812,bull,816,hellip,' + '81i,prime,81j,Prime,81u,oline,824,frasl,88o,weierp,88h,image,88s,real,892,trade,89l,alefsym,' + '8cg,larr,8ch,uarr,8ci,rarr,8cj,darr,8ck,harr,8dl,crarr,8eg,lArr,8eh,uArr,8ei,rArr,8ej,dArr,' + '8ek,hArr,8g0,forall,8g2,part,8g3,exist,8g5,empty,8g7,nabla,8g8,isin,8g9,notin,8gb,ni,8gf,prod,' + '8gh,sum,8gi,minus,8gn,lowast,8gq,radic,8gt,prop,8gu,infin,8h0,ang,8h7,and,8h8,or,8h9,cap,8ha,cup,' + '8hb,int,8hk,there4,8hs,sim,8i5,cong,8i8,asymp,8j0,ne,8j1,equiv,8j4,le,8j5,ge,8k2,sub,8k3,sup,8k4,' + 'nsub,8k6,sube,8k7,supe,8kl,oplus,8kn,otimes,8l5,perp,8m5,sdot,8o8,lceil,8o9,rceil,8oa,lfloor,8ob,' + 'rfloor,8p9,lang,8pa,rang,9ea,loz,9j0,spades,9j3,clubs,9j5,hearts,9j6,diams,ai,OElig,aj,oelig,b0,' + 'Scaron,b1,scaron,bo,Yuml,m6,circ,ms,tilde,802,ensp,803,emsp,809,thinsp,80c,zwnj,80d,zwj,80e,lrm,' + '80f,rlm,80j,ndash,80k,mdash,80o,lsquo,80p,rsquo,80q,sbquo,80s,ldquo,80t,rdquo,80u,bdquo,810,dagger,' + '811,Dagger,81g,permil,81p,lsaquo,81q,rsaquo,85c,euro', 32);
    var encodeRaw = function (text, attr) {
      return text.replace(attr ? attrsCharsRegExp : textCharsRegExp, function (chr) {
        return baseEntities[chr] || chr;
      });
    };
    var encodeAllRaw = function (text) {
      return ('' + text).replace(rawCharsRegExp, function (chr) {
        return baseEntities[chr] || chr;
      });
    };
    var encodeNumeric = function (text, attr) {
      return text.replace(attr ? attrsCharsRegExp : textCharsRegExp, function (chr) {
        if (chr.length > 1) {
          return '&#' + ((chr.charCodeAt(0) - 55296) * 1024 + (chr.charCodeAt(1) - 56320) + 65536) + ';';
        }
        return baseEntities[chr] || '&#' + chr.charCodeAt(0) + ';';
      });
    };
    var encodeNamed = function (text, attr, entities) {
      entities = entities || namedEntities;
      return text.replace(attr ? attrsCharsRegExp : textCharsRegExp, function (chr) {
        return baseEntities[chr] || entities[chr] || chr;
      });
    };
    var getEncodeFunc = function (name, entities) {
      var entitiesMap = buildEntitiesLookup(entities) || namedEntities;
      var encodeNamedAndNumeric = function (text, attr) {
        return text.replace(attr ? attrsCharsRegExp : textCharsRegExp, function (chr) {
          if (baseEntities[chr] !== undefined) {
            return baseEntities[chr];
          }
          if (entitiesMap[chr] !== undefined) {
            return entitiesMap[chr];
          }
          if (chr.length > 1) {
            return '&#' + ((chr.charCodeAt(0) - 55296) * 1024 + (chr.charCodeAt(1) - 56320) + 65536) + ';';
          }
          return '&#' + chr.charCodeAt(0) + ';';
        });
      };
      var encodeCustomNamed = function (text, attr) {
        return encodeNamed(text, attr, entitiesMap);
      };
      var nameMap = makeMap$1(name.replace(/\+/g, ','));
      if (nameMap.named && nameMap.numeric) {
        return encodeNamedAndNumeric;
      }
      if (nameMap.named) {
        if (entities) {
          return encodeCustomNamed;
        }
        return encodeNamed;
      }
      if (nameMap.numeric) {
        return encodeNumeric;
      }
      return encodeRaw;
    };
    var decode = function (text) {
      return text.replace(entityRegExp, function (all, numeric) {
        if (numeric) {
          if (numeric.charAt(0).toLowerCase() === 'x') {
            numeric = parseInt(numeric.substr(1), 16);
          } else {
            numeric = parseInt(numeric, 10);
          }
          if (numeric > 65535) {
            numeric -= 65536;
            return String.fromCharCode(55296 + (numeric >> 10), 56320 + (numeric & 1023));
          }
          return asciiMap[numeric] || String.fromCharCode(numeric);
        }
        return reverseEntities[all] || namedEntities[all] || nativeDecode(all);
      });
    };
    var Entities = {
      encodeRaw: encodeRaw,
      encodeAllRaw: encodeAllRaw,
      encodeNumeric: encodeNumeric,
      encodeNamed: encodeNamed,
      getEncodeFunc: getEncodeFunc,
      decode: decode
    };

    var mapCache = {}, dummyObj = {};
    var makeMap$2 = Tools.makeMap, each$3 = Tools.each, extend$1 = Tools.extend, explode$1 = Tools.explode, inArray = Tools.inArray;
    var split = function (items, delim) {
      items = Tools.trim(items);
      return items ? items.split(delim || ' ') : [];
    };
    var compileSchema = function (type) {
      var schema = {};
      var globalAttributes, blockContent;
      var phrasingContent, flowContent, html4BlockContent, html4PhrasingContent;
      var add = function (name, attributes, children) {
        var ni, attributesOrder, element;
        var arrayToMap = function (array, obj) {
          var map = {};
          var i, l;
          for (i = 0, l = array.length; i < l; i++) {
            map[array[i]] = obj || {};
          }
          return map;
        };
        children = children || [];
        attributes = attributes || '';
        if (typeof children === 'string') {
          children = split(children);
        }
        name = split(name);
        ni = name.length;
        while (ni--) {
          attributesOrder = split([
            globalAttributes,
            attributes
          ].join(' '));
          element = {
            attributes: arrayToMap(attributesOrder),
            attributesOrder: attributesOrder,
            children: arrayToMap(children, dummyObj)
          };
          schema[name[ni]] = element;
        }
      };
      var addAttrs = function (name, attributes) {
        var ni, schemaItem, i, l;
        name = split(name);
        ni = name.length;
        attributes = split(attributes);
        while (ni--) {
          schemaItem = schema[name[ni]];
          for (i = 0, l = attributes.length; i < l; i++) {
            schemaItem.attributes[attributes[i]] = {};
            schemaItem.attributesOrder.push(attributes[i]);
          }
        }
      };
      if (mapCache[type]) {
        return mapCache[type];
      }
      globalAttributes = 'id accesskey class dir lang style tabindex title role';
      blockContent = 'address blockquote div dl fieldset form h1 h2 h3 h4 h5 h6 hr menu ol p pre table ul';
      phrasingContent = 'a abbr b bdo br button cite code del dfn em embed i iframe img input ins kbd ' + 'label map noscript object q s samp script select small span strong sub sup ' + 'textarea u var #text #comment';
      if (type !== 'html4') {
        globalAttributes += ' contenteditable contextmenu draggable dropzone ' + 'hidden spellcheck translate';
        blockContent += ' article aside details dialog figure main header footer hgroup section nav';
        phrasingContent += ' audio canvas command datalist mark meter output picture ' + 'progress time wbr video ruby bdi keygen';
      }
      if (type !== 'html5-strict') {
        globalAttributes += ' xml:lang';
        html4PhrasingContent = 'acronym applet basefont big font strike tt';
        phrasingContent = [
          phrasingContent,
          html4PhrasingContent
        ].join(' ');
        each$3(split(html4PhrasingContent), function (name) {
          add(name, '', phrasingContent);
        });
        html4BlockContent = 'center dir isindex noframes';
        blockContent = [
          blockContent,
          html4BlockContent
        ].join(' ');
        flowContent = [
          blockContent,
          phrasingContent
        ].join(' ');
        each$3(split(html4BlockContent), function (name) {
          add(name, '', flowContent);
        });
      }
      flowContent = flowContent || [
        blockContent,
        phrasingContent
      ].join(' ');
      add('html', 'manifest', 'head body');
      add('head', '', 'base command link meta noscript script style title');
      add('title hr noscript br');
      add('base', 'href target');
      add('link', 'href rel media hreflang type sizes hreflang');
      add('meta', 'name http-equiv content charset');
      add('style', 'media type scoped');
      add('script', 'src async defer type charset');
      add('body', 'onafterprint onbeforeprint onbeforeunload onblur onerror onfocus ' + 'onhashchange onload onmessage onoffline ononline onpagehide onpageshow ' + 'onpopstate onresize onscroll onstorage onunload', flowContent);
      add('address dt dd div caption', '', flowContent);
      add('h1 h2 h3 h4 h5 h6 pre p abbr code var samp kbd sub sup i b u bdo span legend em strong small s cite dfn', '', phrasingContent);
      add('blockquote', 'cite', flowContent);
      add('ol', 'reversed start type', 'li');
      add('ul', '', 'li');
      add('li', 'value', flowContent);
      add('dl', '', 'dt dd');
      add('a', 'href target rel media hreflang type', phrasingContent);
      add('q', 'cite', phrasingContent);
      add('ins del', 'cite datetime', flowContent);
      add('img', 'src sizes srcset alt usemap ismap width height');
      add('iframe', 'src name width height', flowContent);
      add('embed', 'src type width height');
      add('object', 'data type typemustmatch name usemap form width height', [
        flowContent,
        'param'
      ].join(' '));
      add('param', 'name value');
      add('map', 'name', [
        flowContent,
        'area'
      ].join(' '));
      add('area', 'alt coords shape href target rel media hreflang type');
      add('table', 'border', 'caption colgroup thead tfoot tbody tr' + (type === 'html4' ? ' col' : ''));
      add('colgroup', 'span', 'col');
      add('col', 'span');
      add('tbody thead tfoot', '', 'tr');
      add('tr', '', 'td th');
      add('td', 'colspan rowspan headers', flowContent);
      add('th', 'colspan rowspan headers scope abbr', flowContent);
      add('form', 'accept-charset action autocomplete enctype method name novalidate target', flowContent);
      add('fieldset', 'disabled form name', [
        flowContent,
        'legend'
      ].join(' '));
      add('label', 'form for', phrasingContent);
      add('input', 'accept alt autocomplete checked dirname disabled form formaction formenctype formmethod formnovalidate ' + 'formtarget height list max maxlength min multiple name pattern readonly required size src step type value width');
      add('button', 'disabled form formaction formenctype formmethod formnovalidate formtarget name type value', type === 'html4' ? flowContent : phrasingContent);
      add('select', 'disabled form multiple name required size', 'option optgroup');
      add('optgroup', 'disabled label', 'option');
      add('option', 'disabled label selected value');
      add('textarea', 'cols dirname disabled form maxlength name readonly required rows wrap');
      add('menu', 'type label', [
        flowContent,
        'li'
      ].join(' '));
      add('noscript', '', flowContent);
      if (type !== 'html4') {
        add('wbr');
        add('ruby', '', [
          phrasingContent,
          'rt rp'
        ].join(' '));
        add('figcaption', '', flowContent);
        add('mark rt rp summary bdi', '', phrasingContent);
        add('canvas', 'width height', flowContent);
        add('video', 'src crossorigin poster preload autoplay mediagroup loop ' + 'muted controls width height buffered', [
          flowContent,
          'track source'
        ].join(' '));
        add('audio', 'src crossorigin preload autoplay mediagroup loop muted controls ' + 'buffered volume', [
          flowContent,
          'track source'
        ].join(' '));
        add('picture', '', 'img source');
        add('source', 'src srcset type media sizes');
        add('track', 'kind src srclang label default');
        add('datalist', '', [
          phrasingContent,
          'option'
        ].join(' '));
        add('article section nav aside main header footer', '', flowContent);
        add('hgroup', '', 'h1 h2 h3 h4 h5 h6');
        add('figure', '', [
          flowContent,
          'figcaption'
        ].join(' '));
        add('time', 'datetime', phrasingContent);
        add('dialog', 'open', flowContent);
        add('command', 'type label icon disabled checked radiogroup command');
        add('output', 'for form name', phrasingContent);
        add('progress', 'value max', phrasingContent);
        add('meter', 'value min max low high optimum', phrasingContent);
        add('details', 'open', [
          flowContent,
          'summary'
        ].join(' '));
        add('keygen', 'autofocus challenge disabled form keytype name');
      }
      if (type !== 'html5-strict') {
        addAttrs('script', 'language xml:space');
        addAttrs('style', 'xml:space');
        addAttrs('object', 'declare classid code codebase codetype archive standby align border hspace vspace');
        addAttrs('embed', 'align name hspace vspace');
        addAttrs('param', 'valuetype type');
        addAttrs('a', 'charset name rev shape coords');
        addAttrs('br', 'clear');
        addAttrs('applet', 'codebase archive code object alt name width height align hspace vspace');
        addAttrs('img', 'name longdesc align border hspace vspace');
        addAttrs('iframe', 'longdesc frameborder marginwidth marginheight scrolling align');
        addAttrs('font basefont', 'size color face');
        addAttrs('input', 'usemap align');
        addAttrs('select');
        addAttrs('textarea');
        addAttrs('h1 h2 h3 h4 h5 h6 div p legend caption', 'align');
        addAttrs('ul', 'type compact');
        addAttrs('li', 'type');
        addAttrs('ol dl menu dir', 'compact');
        addAttrs('pre', 'width xml:space');
        addAttrs('hr', 'align noshade size width');
        addAttrs('isindex', 'prompt');
        addAttrs('table', 'summary width frame rules cellspacing cellpadding align bgcolor');
        addAttrs('col', 'width align char charoff valign');
        addAttrs('colgroup', 'width align char charoff valign');
        addAttrs('thead', 'align char charoff valign');
        addAttrs('tr', 'align char charoff valign bgcolor');
        addAttrs('th', 'axis align char charoff valign nowrap bgcolor width height');
        addAttrs('form', 'accept');
        addAttrs('td', 'abbr axis scope align char charoff valign nowrap bgcolor width height');
        addAttrs('tfoot', 'align char charoff valign');
        addAttrs('tbody', 'align char charoff valign');
        addAttrs('area', 'nohref');
        addAttrs('body', 'background bgcolor text link vlink alink');
      }
      if (type !== 'html4') {
        addAttrs('input button select textarea', 'autofocus');
        addAttrs('input textarea', 'placeholder');
        addAttrs('a', 'download');
        addAttrs('link script img', 'crossorigin');
        addAttrs('img', 'loading');
        addAttrs('iframe', 'sandbox seamless allowfullscreen loading');
      }
      each$3(split('a form meter progress dfn'), function (name) {
        if (schema[name]) {
          delete schema[name].children[name];
        }
      });
      delete schema.caption.children.table;
      delete schema.script;
      mapCache[type] = schema;
      return schema;
    };
    var compileElementMap = function (value, mode) {
      var styles;
      if (value) {
        styles = {};
        if (typeof value === 'string') {
          value = { '*': value };
        }
        each$3(value, function (value, key) {
          styles[key] = styles[key.toUpperCase()] = mode === 'map' ? makeMap$2(value, /[, ]/) : explode$1(value, /[, ]/);
        });
      }
      return styles;
    };
    function Schema(settings) {
      var elements = {};
      var children = {};
      var patternElements = [];
      var validStyles;
      var invalidStyles;
      var schemaItems;
      var whiteSpaceElementsMap, selfClosingElementsMap, shortEndedElementsMap, boolAttrMap, validClasses;
      var blockElementsMap, nonEmptyElementsMap, moveCaretBeforeOnEnterElementsMap, textBlockElementsMap, textInlineElementsMap;
      var customElementsMap = {}, specialElements = {};
      var createLookupTable = function (option, defaultValue, extendWith) {
        var value = settings[option];
        if (!value) {
          value = mapCache[option];
          if (!value) {
            value = makeMap$2(defaultValue, ' ', makeMap$2(defaultValue.toUpperCase(), ' '));
            value = extend$1(value, extendWith);
            mapCache[option] = value;
          }
        } else {
          value = makeMap$2(value, /[, ]/, makeMap$2(value.toUpperCase(), /[, ]/));
        }
        return value;
      };
      settings = settings || {};
      schemaItems = compileSchema(settings.schema);
      if (settings.verify_html === false) {
        settings.valid_elements = '*[*]';
      }
      validStyles = compileElementMap(settings.valid_styles);
      invalidStyles = compileElementMap(settings.invalid_styles, 'map');
      validClasses = compileElementMap(settings.valid_classes, 'map');
      whiteSpaceElementsMap = createLookupTable('whitespace_elements', 'pre script noscript style textarea video audio iframe object code');
      selfClosingElementsMap = createLookupTable('self_closing_elements', 'colgroup dd dt li option p td tfoot th thead tr');
      shortEndedElementsMap = createLookupTable('short_ended_elements', 'area base basefont br col frame hr img input isindex link ' + 'meta param embed source wbr track');
      boolAttrMap = createLookupTable('boolean_attributes', 'checked compact declare defer disabled ismap multiple nohref noresize ' + 'noshade nowrap readonly selected autoplay loop controls');
      nonEmptyElementsMap = createLookupTable('non_empty_elements', 'td th iframe video audio object ' + 'script pre code', shortEndedElementsMap);
      moveCaretBeforeOnEnterElementsMap = createLookupTable('move_caret_before_on_enter_elements', 'table', nonEmptyElementsMap);
      textBlockElementsMap = createLookupTable('text_block_elements', 'h1 h2 h3 h4 h5 h6 p div address pre form ' + 'blockquote center dir fieldset header footer article section hgroup aside main nav figure');
      blockElementsMap = createLookupTable('block_elements', 'hr table tbody thead tfoot ' + 'th tr td li ol ul caption dl dt dd noscript menu isindex option ' + 'datalist select optgroup figcaption details summary', textBlockElementsMap);
      textInlineElementsMap = createLookupTable('text_inline_elements', 'span strong b em i font strike u var cite ' + 'dfn code mark q sup sub samp');
      each$3((settings.special || 'script noscript noframes noembed title style textarea xmp').split(' '), function (name) {
        specialElements[name] = new RegExp('</' + name + '[^>]*>', 'gi');
      });
      var patternToRegExp = function (str) {
        return new RegExp('^' + str.replace(/([?+*])/g, '.$1') + '$');
      };
      var addValidElements = function (validElements) {
        var ei, el, ai, al, matches, element, attr, attrData, elementName, attrName, attrType, attributes, attributesOrder, prefix, outputName, globalAttributes, globalAttributesOrder, key, value;
        var elementRuleRegExp = /^([#+\-])?([^\[!\/]+)(?:\/([^\[!]+))?(?:(!?)\[([^\]]+)\])?$/, attrRuleRegExp = /^([!\-])?(\w+[\\:]:\w+|[^=:<]+)?(?:([=:<])(.*))?$/, hasPatternsRegExp = /[*?+]/;
        if (validElements) {
          validElements = split(validElements, ',');
          if (elements['@']) {
            globalAttributes = elements['@'].attributes;
            globalAttributesOrder = elements['@'].attributesOrder;
          }
          for (ei = 0, el = validElements.length; ei < el; ei++) {
            matches = elementRuleRegExp.exec(validElements[ei]);
            if (matches) {
              prefix = matches[1];
              elementName = matches[2];
              outputName = matches[3];
              attrData = matches[5];
              attributes = {};
              attributesOrder = [];
              element = {
                attributes: attributes,
                attributesOrder: attributesOrder
              };
              if (prefix === '#') {
                element.paddEmpty = true;
              }
              if (prefix === '-') {
                element.removeEmpty = true;
              }
              if (matches[4] === '!') {
                element.removeEmptyAttrs = true;
              }
              if (globalAttributes) {
                for (key in globalAttributes) {
                  attributes[key] = globalAttributes[key];
                }
                attributesOrder.push.apply(attributesOrder, globalAttributesOrder);
              }
              if (attrData) {
                attrData = split(attrData, '|');
                for (ai = 0, al = attrData.length; ai < al; ai++) {
                  matches = attrRuleRegExp.exec(attrData[ai]);
                  if (matches) {
                    attr = {};
                    attrType = matches[1];
                    attrName = matches[2].replace(/[\\:]:/g, ':');
                    prefix = matches[3];
                    value = matches[4];
                    if (attrType === '!') {
                      element.attributesRequired = element.attributesRequired || [];
                      element.attributesRequired.push(attrName);
                      attr.required = true;
                    }
                    if (attrType === '-') {
                      delete attributes[attrName];
                      attributesOrder.splice(inArray(attributesOrder, attrName), 1);
                      continue;
                    }
                    if (prefix) {
                      if (prefix === '=') {
                        element.attributesDefault = element.attributesDefault || [];
                        element.attributesDefault.push({
                          name: attrName,
                          value: value
                        });
                        attr.defaultValue = value;
                      }
                      if (prefix === ':') {
                        element.attributesForced = element.attributesForced || [];
                        element.attributesForced.push({
                          name: attrName,
                          value: value
                        });
                        attr.forcedValue = value;
                      }
                      if (prefix === '<') {
                        attr.validValues = makeMap$2(value, '?');
                      }
                    }
                    if (hasPatternsRegExp.test(attrName)) {
                      element.attributePatterns = element.attributePatterns || [];
                      attr.pattern = patternToRegExp(attrName);
                      element.attributePatterns.push(attr);
                    } else {
                      if (!attributes[attrName]) {
                        attributesOrder.push(attrName);
                      }
                      attributes[attrName] = attr;
                    }
                  }
                }
              }
              if (!globalAttributes && elementName === '@') {
                globalAttributes = attributes;
                globalAttributesOrder = attributesOrder;
              }
              if (outputName) {
                element.outputName = elementName;
                elements[outputName] = element;
              }
              if (hasPatternsRegExp.test(elementName)) {
                element.pattern = patternToRegExp(elementName);
                patternElements.push(element);
              } else {
                elements[elementName] = element;
              }
            }
          }
        }
      };
      var setValidElements = function (validElements) {
        elements = {};
        patternElements = [];
        addValidElements(validElements);
        each$3(schemaItems, function (element, name) {
          children[name] = element.children;
        });
      };
      var addCustomElements = function (customElements) {
        var customElementRegExp = /^(~)?(.+)$/;
        if (customElements) {
          mapCache.text_block_elements = mapCache.block_elements = null;
          each$3(split(customElements, ','), function (rule) {
            var matches = customElementRegExp.exec(rule), inline = matches[1] === '~', cloneName = inline ? 'span' : 'div', name = matches[2];
            children[name] = children[cloneName];
            customElementsMap[name] = cloneName;
            if (!inline) {
              blockElementsMap[name.toUpperCase()] = {};
              blockElementsMap[name] = {};
            }
            if (!elements[name]) {
              var customRule = elements[cloneName];
              customRule = extend$1({}, customRule);
              delete customRule.removeEmptyAttrs;
              delete customRule.removeEmpty;
              elements[name] = customRule;
            }
            each$3(children, function (element, elmName) {
              if (element[cloneName]) {
                children[elmName] = element = extend$1({}, children[elmName]);
                element[name] = element[cloneName];
              }
            });
          });
        }
      };
      var addValidChildren = function (validChildren) {
        var childRuleRegExp = /^([+\-]?)(\w+)\[([^\]]+)\]$/;
        mapCache[settings.schema] = null;
        if (validChildren) {
          each$3(split(validChildren, ','), function (rule) {
            var matches = childRuleRegExp.exec(rule);
            var parent, prefix;
            if (matches) {
              prefix = matches[1];
              if (prefix) {
                parent = children[matches[2]];
              } else {
                parent = children[matches[2]] = { '#comment': {} };
              }
              parent = children[matches[2]];
              each$3(split(matches[3], '|'), function (child) {
                if (prefix === '-') {
                  delete parent[child];
                } else {
                  parent[child] = {};
                }
              });
            }
          });
        }
      };
      var getElementRule = function (name) {
        var element = elements[name], i;
        if (element) {
          return element;
        }
        i = patternElements.length;
        while (i--) {
          element = patternElements[i];
          if (element.pattern.test(name)) {
            return element;
          }
        }
      };
      if (!settings.valid_elements) {
        each$3(schemaItems, function (element, name) {
          elements[name] = {
            attributes: element.attributes,
            attributesOrder: element.attributesOrder
          };
          children[name] = element.children;
        });
        if (settings.schema !== 'html5') {
          each$3(split('strong/b em/i'), function (item) {
            item = split(item, '/');
            elements[item[1]].outputName = item[0];
          });
        }
        each$3(split('ol ul sub sup blockquote span font a table tbody tr strong em b i'), function (name) {
          if (elements[name]) {
            elements[name].removeEmpty = true;
          }
        });
        each$3(split('p h1 h2 h3 h4 h5 h6 th td pre div address caption li'), function (name) {
          elements[name].paddEmpty = true;
        });
        each$3(split('span'), function (name) {
          elements[name].removeEmptyAttrs = true;
        });
      } else {
        setValidElements(settings.valid_elements);
      }
      addCustomElements(settings.custom_elements);
      addValidChildren(settings.valid_children);
      addValidElements(settings.extended_valid_elements);
      addValidChildren('+ol[ul|ol],+ul[ul|ol]');
      each$3({
        dd: 'dl',
        dt: 'dl',
        li: 'ul ol',
        td: 'tr',
        th: 'tr',
        tr: 'tbody thead tfoot',
        tbody: 'table',
        thead: 'table',
        tfoot: 'table',
        legend: 'fieldset',
        area: 'map',
        param: 'video audio object'
      }, function (parents, item) {
        if (elements[item]) {
          elements[item].parentsRequired = split(parents);
        }
      });
      if (settings.invalid_elements) {
        each$3(explode$1(settings.invalid_elements), function (item) {
          if (elements[item]) {
            delete elements[item];
          }
        });
      }
      if (!getElementRule('span')) {
        addValidElements('span[!data-mce-type|*]');
      }
      var getValidStyles = function () {
        return validStyles;
      };
      var getInvalidStyles = function () {
        return invalidStyles;
      };
      var getValidClasses = function () {
        return validClasses;
      };
      var getBoolAttrs = function () {
        return boolAttrMap;
      };
      var getBlockElements = function () {
        return blockElementsMap;
      };
      var getTextBlockElements = function () {
        return textBlockElementsMap;
      };
      var getTextInlineElements = function () {
        return textInlineElementsMap;
      };
      var getShortEndedElements = function () {
        return shortEndedElementsMap;
      };
      var getSelfClosingElements = function () {
        return selfClosingElementsMap;
      };
      var getNonEmptyElements = function () {
        return nonEmptyElementsMap;
      };
      var getMoveCaretBeforeOnEnterElements = function () {
        return moveCaretBeforeOnEnterElementsMap;
      };
      var getWhiteSpaceElements = function () {
        return whiteSpaceElementsMap;
      };
      var getSpecialElements = function () {
        return specialElements;
      };
      var isValidChild = function (name, child) {
        var parent = children[name.toLowerCase()];
        return !!(parent && parent[child.toLowerCase()]);
      };
      var isValid = function (name, attr) {
        var attrPatterns, i;
        var rule = getElementRule(name);
        if (rule) {
          if (attr) {
            if (rule.attributes[attr]) {
              return true;
            }
            attrPatterns = rule.attributePatterns;
            if (attrPatterns) {
              i = attrPatterns.length;
              while (i--) {
                if (attrPatterns[i].pattern.test(name)) {
                  return true;
                }
              }
            }
          } else {
            return true;
          }
        }
        return false;
      };
      var getCustomElements = function () {
        return customElementsMap;
      };
      return {
        children: children,
        elements: elements,
        getValidStyles: getValidStyles,
        getValidClasses: getValidClasses,
        getBlockElements: getBlockElements,
        getInvalidStyles: getInvalidStyles,
        getShortEndedElements: getShortEndedElements,
        getTextBlockElements: getTextBlockElements,
        getTextInlineElements: getTextInlineElements,
        getBoolAttrs: getBoolAttrs,
        getElementRule: getElementRule,
        getSelfClosingElements: getSelfClosingElements,
        getNonEmptyElements: getNonEmptyElements,
        getMoveCaretBeforeOnEnterElements: getMoveCaretBeforeOnEnterElements,
        getWhiteSpaceElements: getWhiteSpaceElements,
        getSpecialElements: getSpecialElements,
        isValidChild: isValidChild,
        isValid: isValid,
        getCustomElements: getCustomElements,
        addValidElements: addValidElements,
        setValidElements: setValidElements,
        addCustomElements: addCustomElements,
        addValidChildren: addValidChildren
      };
    }

    var zeroWidth = '\uFEFF';
    var nbsp = '\xA0';

    var toHex = function (match, r, g, b) {
      var hex = function (val) {
        val = parseInt(val, 10).toString(16);
        return val.length > 1 ? val : '0' + val;
      };
      return '#' + hex(r) + hex(g) + hex(b);
    };
    var Styles = function (settings, schema) {
      var rgbRegExp = /rgb\s*\(\s*([0-9]+)\s*,\s*([0-9]+)\s*,\s*([0-9]+)\s*\)/gi;
      var urlOrStrRegExp = /(?:url(?:(?:\(\s*\"([^\"]+)\"\s*\))|(?:\(\s*\'([^