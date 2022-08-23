var Flourish = function() {
  "use strict";
  function t(t) {
    return parseInt(t).toString() === "" + t && t >= 0
  }
  function e(t, e, r) {
    return t.map((function(t) {
      var i = {};
      return Object.keys(e).forEach((function(r) {
        i[r] = t[e[r]]
      }
      )),
      Object.keys(r).forEach((function(e) {
        var a = r[e];
        Array.isArray(a) || (a = [a]),
        i[e] = a.map((function(e) {
          return t[e]
        }
        ))
      }
      )),
      i
    }
    ))
  }
  function r(t, r, i) {
    var a = e(t, r = r || {}, i = i || {});
    return a.column_names = {},
    Object.keys(r).forEach((function(t) {
      a.column_names[t] = r[t]
    }
    )),
    Object.keys(i).forEach((function(t) {
      var e = i[t];
      a.column_names[t] = Array.isArray(e) ? e : [e]
    }
    )),
    a
  }
  function i(r, i, a) {
    !function(e, r) {
      var i;
      if (!Object.keys(e).every((function(r) {
        return t(e[r])
      }
      )))
        throw i = "All column_bindings values should be non-negative integers",
        new TypeError(i);
      if (!Object.keys(r).every((function(e) {
        var i = r[e];
        return Array.isArray(i) ? i.every(t) : t(i)
      }
      )))
        throw i = "All columns_bindings values should be non-negative integers or arrays thereof",
        new TypeError(i)
    }(i = i || {}, a = a || {});
    var n = r[0]
      , o = e(r.slice(1), i, a);
    return o.column_names = {},
    Object.keys(i).forEach((function(t) {
      o.column_names[t] = n[i[t]]
    }
    )),
    Object.keys(a).forEach((function(t) {
      var e = a[t];
      o.column_names[t] = (Array.isArray(e) ? e : [e]).map((function(t) {
        return n[t]
      }
      ))
    }
    )),
    o
  }
  var a = {
    de: {
      credits: {
        default: "Erstellt mit Flourish"
      }
    },
    en: {
      credits: {
        default: "A Flourish data visualization",
        chart: "A Flourish chart",
        map: {
          text: "A Flourish map",
          url: "https://flourish.studio/visualisations/maps/"
        },
        survey: {
          text: "A Flourish survey visualization",
          url: "https://flourish.studio/visualisations/survey-data/"
        },
        network: {
          text: "A Flourish network chart",
          url: "https://flourish.studio/visualisations/network-charts/"
        },
        scatter: {
          text: "A Flourish scatter chart",
          url: "https://flourish.studio/visualisations/scatter-charts/"
        },
        sankey: {
          text: "A Flourish sankey chart",
          url: "https://flourish.studio/visualisations/sankey-charts/"
        },
        quiz: "A Flourish quiz",
        bar_race: {
          text: "A Flourish bar chart race",
          url: "https://flourish.studio/visualisations/bar-chart-race/"
        },
        "bar-chart-race": {
          text: "A Flourish bar chart race",
          url: "https://flourish.studio/visualisations/bar-chart-race/"
        },
        cards: "Interactive content by Flourish",
        chord: "A Flourish chord diagram",
        election: "A Flourish election chart",
        globe: {
          text: "A Flourish connections globe",
          url: "https://flourish.studio/visualisations/maps/"
        },
        hierarchy: {
          text: "A Flourish hierarchy chart",
          url: "https://flourish.studio/visualisations/treemaps/"
        },
        "line-chart-race": "A Flourish line chart race",
        parliament: "A Flourish election chart",
        "photo-slider": "Interactive content by Flourish",
        slope: {
          text: "A Flourish slope chart",
          url: "https://flourish.studio/visualisations/slope-charts/"
        },
        sports: "A Flourish sports visualization",
        explore: "A Flourish data visualization",
        "word-cloud": "A Flourish data visualization"
      }
    },
    es: {
      credits: {
        default: "Creado con Flourish",
        bar_race: {
          text: "Créé avec Flourish",
          url: "https://flourish.studio/visualisations/bar-chart-race/"
        },
        "bar-chart-race": {
          text: "Créé avec Flourish",
          url: "https://flourish.studio/visualisations/bar-chart-race/"
        }
      }
    },
    fr: {
      credits: {
        default: "Créé avec Flourish",
        bar_race: {
          text: "Créé avec Flourish",
          url: "https://flourish.studio/visualisations/bar-chart-race/"
        },
        "bar-chart-race": {
          text: "Créé avec Flourish",
          url: "https://flourish.studio/visualisations/bar-chart-race/"
        }
      }
    },
    it: {
      credits: {
        default: "Creato con Flourish",
        bar_race: {
          text: "Creato con Flourish",
          url: "https://flourish.studio/visualisations/bar-chart-race/"
        },
        "bar-chart-race": {
          text: "Creato con Flourish",
          url: "https://flourish.studio/visualisations/bar-chart-race/"
        }
      }
    },
    mi: {
      credits: {
        default: "Hangaia ki te Flourish",
        bar_race: {
          text: "Hangaia ki te Flourish",
          url: "https://flourish.studio/visualisations/bar-chart-race/"
        },
        "bar-chart-race": {
          text: "Hangaia ki te Flourish",
          url: "https://flourish.studio/visualisations/bar-chart-race/"
        }
      }
    },
    nl: {
      credits: {
        default: "Gemaakt met Flourish",
        bar_race: {
          text: "Gemaakt met Flourish",
          url: "https://flourish.studio/visualisations/bar-chart-race/"
        },
        "bar-chart-race": {
          text: "Gemaakt met Flourish",
          url: "https://flourish.studio/visualisations/bar-chart-race/"
        }
      }
    },
    pt: {
      default: "Feito com Flourish",
      bar_race: {
        text: "Feito com Flourish",
        url: "https://flourish.studio/visualisations/bar-chart-race/"
      },
      "bar-chart-race": {
        text: "Feito com Flourish",
        url: "https://flourish.studio/visualisations/bar-chart-race/"
      }
    }
  };
  var n, o, s = !1;
  function l(t) {
    if (s && window.top !== window.self) {
      var e = window;
      "srcdoc" === e.location.pathname && (e = e.parent);
      var r, i = (r = {},
      window._Flourish_template_id && (r.template_id = window._Flourish_template_id),
      window.Flourish && window.Flourish.app && window.Flourish.app.loaded_template_id && (r.template_id = window.Flourish.app.loaded_template_id),
      window._Flourish_visualisation_id && (r.visualisation_id = window._Flourish_visualisation_id),
      window.Flourish && window.Flourish.app && window.Flourish.app.loaded_visualisation && (r.visualisation_id = window.Flourish.app.loaded_visualisation.id),
      window.Flourish && window.Flourish.app && window.Flourish.app.story && (r.story_id = window.Flourish.app.story.id,
      r.slide_count = window.Flourish.app.story.slides.length),
      window.Flourish && window.Flourish.app && window.Flourish.app.current_slide && (r.slide_index = window.Flourish.app.current_slide.index + 1),
      r), a = {
        sender: "Flourish",
        method: "customerAnalytics"
      };
      for (var n in i)
        i.hasOwnProperty(n) && (a[n] = i[n]);
      for (var n in t)
        t.hasOwnProperty(n) && (a[n] = t[n]);
      e.parent.postMessage(JSON.stringify(a), "*")
    }
  }
  function u(t) {
    if ("function" != typeof t)
      throw new Error("Analytics callback is not a function");
    window.Flourish._analytics_listeners.push(t)
  }
  function d() {
    s = !0;
    [{
      event_name: "click",
      action_name: "click",
      use_capture: !0
    }, {
      event_name: "keydown",
      action_name: "key_down",
      use_capture: !0
    }, {
      event_name: "mouseenter",
      action_name: "mouse_enter",
      use_capture: !1
    }, {
      event_name: "mouseleave",
      action_name: "mouse_leave",
      use_capture: !1
    }].forEach((function(t) {
      document.body.addEventListener(t.event_name, (function() {
        l({
          action: t.action_name
        })
      }
      ), t.use_capture)
    }
    ))
  }
  function h() {
    if (null == n) {
      var t = function() {
        var t = window.location;
        "about:srcdoc" == t.href && (t = window.parent.location);
        var e = {};
        return function(t, r, i) {
          for (; i = r.exec(t); )
            e[decodeURIComponent(i[1])] = decodeURIComponent(i[2])
        }(t.search.substring(1).replace(/\+/g, "%20"), /([^&=]+)=?([^&]*)/g),
        e
      }();
      n = "referrer"in t ? /^https:\/\/medium.com\//.test(t.referrer) : !("auto"in t)
    }
    return n
  }
  function c(t) {
    var e = t || window.innerWidth;
    return e > 999 ? 650 : e > 599 ? 575 : 400
  }
  function p(t, e) {
    if (window.top !== window.self) {
      var r = window;
      if ("srcdoc" == r.location.pathname && (r = r.parent),
      o)
        return t = parseInt(t, 10),
        void r.parent.postMessage({
          sentinel: "amp",
          type: "embed-size",
          height: t
        }, "*");
      var i = {
        sender: "Flourish",
        context: "iframe.resize",
        method: "resize",
        height: t,
        src: r.location.toString()
      };
      if (e)
        for (var a in e)
          i[a] = e[a];
      r.parent.postMessage(JSON.stringify(i), "*")
    }
  }
  function f() {
    return (-1 !== navigator.userAgent.indexOf("Safari") || -1 !== navigator.userAgent.indexOf("iPhone")) && -1 == navigator.userAgent.indexOf("Chrome")
  }
  function m(t) {
    window.addEventListener("message", (function(e) {
      if (null != e.source && (e.origin === document.location.origin || e.origin.match(/\/\/localhost:\d+$|\/\/flourish-api\.com$|\.flourish\.(?:local(:\d+)?|net|rocks|studio)$|\.uri\.sh$/))) {
        var r;
        try {
          r = JSON.parse(e.data)
        } catch (t) {
          return void console.warn("Unexpected non-JSON message: " + JSON.stringify(e.data))
        }
        if ("Flourish" === r.sender) {
          for (var i = document.querySelectorAll("iframe"), a = 0; a < i.length; a++)
            if (i[a].contentWindow == e.source || i[a].contentWindow == e.source.parent)
              return void t(r, i[a]);
          console.warn("could not find frame", r)
        }
      }
    }
    )),
    f() && (window.addEventListener("resize", _),
    _())
  }
  function _() {
    for (var t = document.querySelectorAll(".flourish-embed"), e = 0; e < t.length; e++) {
      var r = t[e];
      if (!r.getAttribute("data-width")) {
        var i = r.querySelector("iframe");
        if (i) {
          var a = window.getComputedStyle(r)
            , n = r.offsetWidth - parseFloat(a.paddingLeft) - parseFloat(a.paddingRight);
          i.style.width = n + "px"
        }
      }
    }
  }
  function v(t, e, r, i, a) {
    var n = document.createElement("iframe");
    if (n.setAttribute("scrolling", "no"),
    n.setAttribute("frameborder", "0"),
    n.setAttribute("title", "Interactive or visual content"),
    n.setAttribute("sandbox", "allow-same-origin allow-forms allow-scripts allow-downloads allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation"),
    e.appendChild(n),
    n.offsetParent || "fixed" === getComputedStyle(n).position)
      y(t, e, n, r, i, a);
    else {
      var o = {
        embed_url: t,
        container: e,
        iframe: n,
        width: r,
        height: i,
        play_on_load: a
      };
      if (window._flourish_poll_items ? window._flourish_poll_items.push(o) : window._flourish_poll_items = [o],
      window._flourish_poll_items.length > 1)
        return n;
      var s = setInterval((function() {
        window._flourish_poll_items = window._flourish_poll_items.filter((function(t) {
          return !t.iframe.offsetParent || (y(t.embed_url, t.container, t.iframe, t.width, t.height, t.play_on_load),
          !1)
        }
        )),
        window._flourish_poll_items.length || clearInterval(s)
      }
      ), 500)
    }
    return n
  }
  function y(t, e, r, i, a, n) {
    var o;
    return i && "number" == typeof i ? (o = i,
    i += "px") : i && i.match(/^[ \t\r\n\f]*([+-]?\d+|\d*\.\d+(?:[eE][+-]?\d+)?)(?:\\?[Pp]|\\0{0,4}[57]0(?:\r\n|[ \t\r\n\f])?)(?:\\?[Xx]|\\0{0,4}[57]8(?:\r\n|[ \t\r\n\f])?)[ \t\r\n\f]*$/) && (o = parseFloat(i)),
    a && "number" == typeof a && (a += "px"),
    i ? r.style.width = i : f() ? r.style.width = e.offsetWidth + "px" : r.style.width = "100%",
    !!a || (t.match(/\?/) ? t += "&auto=1" : t += "?auto=1",
    a = c(o || r.offsetWidth) + "px"),
    a && ("%" === a.charAt(a.length - 1) && (a = parseFloat(a) / 100 * e.parentNode.offsetHeight + "px"),
    r.style.height = a),
    r.setAttribute("src", t + (n ? "#play-on-load" : "")),
    r
  }
  var w = {
    api_url: "https://flourish-api.com/api/v1/live",
    public_bucket_prefix: "https://public.flourish.studio/"
  }
    , g = ["api_key", "template", "version", "container", "base_visualisation_id"];
  function b(t) {
    if (t || 0 === t) {
      if ("object" == typeof t) {
        for (var e in t)
          t[e] = b(t[e]);
        return t
      }
      return "" + t
    }
    return ""
  }
  function F(t) {
    var e = {};
    for (var r in t)
      e[r] = t[r];
    return e
  }
  function k(t) {
    if (null == t)
      return t;
    var e, r = {};
    for (var i in t)
      Array.isArray(t[i]) ? r[i] = t[i].slice() : (e = t[i],
      Array.isArray(e) || "object" != typeof e || null == e ? r[i] = t[i] : r[i] = k(t[i]));
    return r
  }
  var x = null;
  function A(t) {
    for (var e in this._validateOpts(t),
    this.template_loaded = !1,
    this.metadata_loaded = !1,
    this.company_state = null,
    this.template_settings = null,
    this._queued_methods = [],
    w)
      t.hasOwnProperty(e) || (t[e] = w[e]);
    if (t.base_visualisation_id) {
      var r = this;
      this._loadBaseVisualisation(t, (function(e, i) {
        e ? console.error(e.message) : (t = O(i, t),
        r._loadFleet(t))
      }
      ))
    } else
      this._loadFleet(t)
  }
  function E(t) {
    return t instanceof Object && !Array.isArray(t) && null !== t
  }
  function O(t, e) {
    var r, i, a = JSON.parse(JSON.stringify(t));
    for (r in e)
      i = e[r],
      E(a[r]) && E(i) ? a[r] = O(a[r], i) : a[r] = i;
    return a
  }
  function S(t, e) {
    return t[e] || (t[e] = [],
    t[e].column_names = {}),
    t[e]
  }
  function C(t, e, r) {
    var i = {
      column_bindings: {},
      columns_bindings: {}
    };
    for (var a in e) {
      var n = e[a];
      if (r.columns_keys.indexOf(a) >= 0)
        i.columns_bindings[a] = n;
      else {
        if (!(r.mandatory_keys.indexOf(a) >= 0 || r.optional_keys.indexOf(a) >= 0))
          throw new Error("Flourish: unknown binding “" + a + "” found for dataset “" + t + "”");
        i.column_bindings[a] = n
      }
    }
    return i
  }
  function q(t, e, r) {
    for (var i = t.column_names, a = e.mandatory_keys.reduce((function(t, e) {
      return t[e] = !0,
      t
    }
    ), {}), n = 0; n < r.length; n++) {
      var o = r[n]
        , s = o.key;
      void 0 === i[s] && ("columns" === o.type ? i[s] = [] : a[s] && (i[s] = o.name))
    }
  }
  function N(t, e, r, i) {
    for (var a in e.default_values)
      a in t || (t[a] = e.default_values[a]);
    for (var n = 0; n < e.mandatory_keys.length; n++) {
      var o = e.mandatory_keys[n];
      if (!(o in t))
        throw new Error("required key “" + o + "” is missing")
    }
    for (n = 0; n < e.optional_keys.length; n++) {
      var s = e.optional_keys[n];
      if (s in r) {
        if (r[s] != s in t)
          throw new Error("the optional key “" + s + "” is used in some rows but not in others")
      } else
        r[s] = s in t
    }
    for (n = 0; n < e.columns_keys.length; n++) {
      var l = e.columns_keys[n];
      if ("object" != typeof t[l] && (t[l] = [t[l]]),
      l in i) {
        if (i[l] != t[l].length)
          throw new Error("the columns key “" + l + "” has an inconsistent number of entries")
      } else
        i[l] = t[l].length
    }
  }
  function j(t) {
    return function() {
      for (var e = [t], r = 0; r < arguments.length; r++)
        e.push(arguments[r]);
      this._queue.apply(this, e)
    }
  }
  return A.prototype._loadBaseVisualisation = function(t, e) {
    var r = new XMLHttpRequest;
    r.addEventListener("load", (function() {
      if (200 != this.status) {
        var t = new Error("Fetching the base visualisation failed");
        return e(t)
      }
      var r = JSON.parse(this.responseText);
      return e(null, r)
    }
    )),
    r.open("GET", t.public_bucket_prefix + "visualisation/" + t.base_visualisation_id + "/visualisation.json"),
    r.send()
  }
  ,
  A.prototype._loadFleet = function(t) {
    this.original_properties = {};
    for (var e = 0; e < g.length; e++) {
      var r = g[e];
      this.original_properties[r] = t[r]
    }
    x || (o = "#amp=1" == window.location.hash,
    x = {
      createEmbedIframe: v,
      isFixedHeight: h,
      getHeightForBreakpoint: c,
      startEventListeners: m,
      notifyParentWindow: p,
      isSafari: f,
      initCustomerAnalytics: d,
      addAnalyticsListener: u,
      sendCustomerAnalyticsMessage: l
    });
    var i = t.api_url + "/template?api_key=" + t.api_key + "&template=" + encodeURIComponent(t.template) + "&version=" + t.version
      , n = "string" == typeof t.container ? document.querySelector(t.container) : t.container;
    this.iframe = x.createEmbedIframe(i, n, t.width, t.height, !1);
    var s = this;
    this.iframe.addEventListener("load", (function() {
      s.template_loaded = !0,
      s.metadata_loaded && s._init(t.state, s._data, t.callback)
    }
    )),
    x.startEventListeners((function(t, e) {
      "resize" == t.method && ("number" == typeof t.height && (t.height += "px"),
      t.height && (e.style.height = t.height))
    }
    ));
    var _ = new XMLHttpRequest;
    _.addEventListener("load", (function() {
      if (500 !== this.status)
        if (200 == this.status) {
          var e, r, i, o, l = JSON.parse(this.responseText);
          if (s._prepareDataBindings(l.data_bindings),
          s.template_settings = l.settings || {},
          s.company_state = s._getCompanyState(l.company_custom),
          s.metadata_loaded = !0,
          s._prepareData(t),
          s.template_loaded && s._init(t.state, s._data, t.callback),
          !l.hide_credit) {
            var u = t.template.replace(/^@?flourish\//, "")
              , d = (e = t.lang,
            r = (r = u) || "",
            "object" == typeof (i = a[e = e || "en"].credits[r] || a.en.credits[r] || a.en.credits.default) && (i.url && (o = i.url),
            i = i.text),
            {
              credit_text: i,
              credit_url: o
            })
              , h = function(t, e, r, i) {
              t = t || "https://flourish.studio",
              e = e || "?utm_source=api&utm_campaign=" + window.location.href,
              r = r || "https://public.flourish.studio/",
              i = i || "A Flourish data visualisation";
              var a = document.createElement("div");
              a.setAttribute("class", "flourish-credit"),
              a.setAttribute("style", "width:100%!important;margin:0 0 4px!important;text-align:right!important;font-family:Helvetica,sans-serif!important;color:#888!important;font-size:11px!important;font-weight:bold!important;font-style:normal!important;-webkit-font-smoothing:antialiased!important;box-shadow:none!important;");
              var n = document.createElement("a");
              n.setAttribute("href", t + e),
              n.setAttribute("target", "_top"),
              n.setAttribute("style", "display:inline-block!important;text-decoration:none!important;font:inherit!important;color:inherit!important;border:none!important;margin:0 5px!important;box-shadow:none!important;"),
              a.appendChild(n);
              var o = document.createElement("img");
              o.setAttribute("alt", "Flourish logo"),
              o.setAttribute("src", r + "resources/bosh.svg"),
              o.setAttribute("style", "font:inherit!important;width:auto!important;height:12px!important;border:none!important;margin:0 2px 0!important;vertical-align:middle!important;display:inline-block!important;box-shadow:none!important;"),
              n.appendChild(o);
              var s = document.createElement("span");
              return s.setAttribute("style", "font:inherit!important;color:#888!important;vertical-align:middle!important;display:inline-block!important;box-shadow:none!important;"),
              s.appendChild(document.createTextNode(i)),
              n.appendChild(s),
              a
            }(d.credit_url, null, null, d.credit_text);
            n.appendChild(h)
          }
        } else
          console.error("Fetching the template and data bindings from the server failed");
      else
        console.error(JSON.parse(this.responseText))
    }
    )),
    _.open("GET", t.api_url + "/metadata?api_key=" + t.api_key + "&template=" + encodeURIComponent(t.template) + "&version=" + t.version),
    _.send()
  }
  ,
  A.prototype._getCompanyState = function(t) {
    return t && t.settings || {}
  }
  ,
  A.prototype._mergeState = function(t) {
    return O(this.company_state, t)
  }
  ,
  A.prototype._prepareDataBindings = function(t) {
    for (var e = {}, r = 0; r < t.length; r++) {
      var i = t[r];
      "string" != typeof i && (i.dataset in e || (e[i.dataset] = []),
      e[i.dataset].push(i))
    }
    for (var a in this._data_bindings = e,
    this._parsed_bindings = {},
    e)
      this._parseDataset(a)
  }
  ,
  A.prototype._parseDataset = function(t) {
    if (!this._parsed_bindings[t]) {
      var e = this._parsed_bindings[t] = {
        dataset: t,
        mandatory_keys: [],
        optional_keys: [],
        columns_keys: [],
        default_values: {},
        has_mandatory_key: !1
      }
        , r = this._data_bindings;
      for (var i in r[t]) {
        var a = r[t][i];
        switch (a.type) {
        case "column":
          a.optional ? e.optional_keys.push(a.key) : (e.mandatory_keys.push(a.key),
          e.has_mandatory_key = !0);
          break;
        case "columns":
          e.default_values[a.key] = [],
          e.columns_keys.push(a.key)
        }
      }
    }
  }
  ,
  A.prototype._getColumnNames = function(t, e, r, i) {
    for (var a, n = {}, o = t.dataset, s = 0; s < t.mandatory_keys.length; s++) {
      var l = t.mandatory_keys[s];
      a = e && e[o] && e[o][l] || l,
      n[l] = a
    }
    for (s = 0; s < t.optional_keys.length; s++) {
      var u = t.optional_keys[s];
      r[u] && (a = e && e[o] && e[o][u] || u,
      n[u] = a)
    }
    for (s = 0; s < t.columns_keys.length; s++) {
      var d = t.columns_keys[s];
      if (e && e[o] && e[o][d]) {
        if ("string" == typeof (a = e[o][d]) && (a = [a]),
        !Array.isArray(a) || a.length != i[d])
          throw new Error("Flourish: number of column names (" + a.length + ") does not match the number of columns (" + i[d] + ") for dataset “" + o + "” and key “" + d + "”")
      } else {
        a = [];
        for (var h = 0; h < i[d]; h++)
          a.push(d + " " + (h + 1))
      }
      n[d] = a
    }
    return n
  }
  ,
  A.prototype._prepareData = function(t) {
    "column_names"in t && (this.column_names = k(t.column_names)),
    t.bindings ? this._prepareDataFromExternalFormat(t.data, t.bindings) : this._prepareDataFlourishShape(t.data, this.column_names)
  }
  ,
  A.prototype._prepareDataFromExternalFormat = function(t, e) {
    for (var a in this._data = {},
    e) {
      for (var n = this._parsed_bindings[a], o = C(a, e[a], n), s = (h = t[a] || [],
      c = o.column_bindings,
      p = o.columns_bindings,
      (Array.isArray(h[0]) ? i : r)(h, c, p)), l = {}, u = {}, d = 0; d < s.length; d++)
        try {
          N(s[d], n, u, l)
        } catch (t) {
          throw new Error("Flourish: in dataset “" + a + "”, " + t.message)
        }
      this._data[a] = s
    }
    var h, c, p;
    for (var a in this._data_bindings) {
      q(S(this._data, a), this._parsed_bindings[a], this._data_bindings[a])
    }
  }
  ,
  A.prototype._prepareDataFlourishShape = function(t, e) {
    var r = this._data_bindings;
    for (var i in t)
      if (!(i in r))
        throw new Error("Flourish: the dataset “" + i + "” is not supported by this template");
    for (var i in this._data = {},
    r) {
      var a = this._parsed_bindings[i];
      if (a.has_mandatory_key && !(i in t))
        throw new Error("Flourish: the dataset “" + i + "” must be specified");
      var n = {}
        , o = {};
      this._data[i] = [];
      for (var s = 0; s < t[i].length; s++) {
        var l = F(t[i][s]);
        this._data[i].push(l);
        try {
          N(l, a, o, n)
        } catch (t) {
          throw new Error("Flourish: in dataset “" + i + "”, " + t.message)
        }
      }
      this._data[i].column_names = this._getColumnNames(a, e, o, n)
    }
  }
  ,
  A.prototype._init = function(t, e, r) {
    var i = this;
    i._send("setFixedHeight", null, (function() {
      i._draw(t, e, (function() {
        r && r(i);
        for (var t = 0; t < i._queued_methods.length; t++) {
          var e = i._queued_methods[t];
          e[0].apply(i, e.slice(1))
        }
        i._queued_methods = null
      }
      ))
    }
    ))
  }
  ,
  A.prototype._queue = function() {
    for (var t = [], e = 0; e < arguments.length; e++)
      t.push(arguments[e]);
    this._queued_methods ? this._queued_methods.push(t) : t[0].apply(this, t.slice(1))
  }
  ,
  A.prototype._send = function(t, e, r) {
    var i = new MessageChannel;
    i.port1.onmessage = r,
    this.iframe.contentWindow.postMessage({
      sender: "Flourish",
      method: t,
      argument: e
    }, "*", [i.port2])
  }
  ,
  A.prototype._draw = function(t, e, r) {
    return this._send("sync", {
      draw: !0,
      state: this._mergeState(t),
      data: b(e)
    }, r)
  }
  ,
  A.prototype._update = function(t, e, r) {
    var i = {
      update: !0,
      state: this._mergeState(t)
    };
    return e && (i.data = b(e)),
    this._send("sync", i, r)
  }
  ,
  A.prototype._validateOpts = function(t, e) {
    if (e)
      for (var r = 0; r < g.length; r++) {
        var i = g[r];
        if (i in t && t[i] != this.original_properties[i])
          throw new Error("Flourish: changing the '" + i + "' is not yet supported")
      }
    if (t.bindings && t.column_names)
      throw new Error("Flourish: you must supply exactly one of opts.bindings and opts.column_names - these correspond to different ways that your data might be shaped")
  }
  ,
  A.prototype.getState = j((function(t) {
    return this._send("getState", null, (function(e) {
      return "data"in e && "result"in e.data ? t(null, e.data.result) : t(new Error("Template state not found"))
    }
    ))
  }
  )),
  A.prototype.update = j((function(t, e) {
    return this._validateOpts(t, !0),
    "data"in t ? (this._prepareData(t),
    this._update(t.state, this._data, e)) : this._update(t.state, void 0, e)
  }
  )),
  {
    VERSION: "4.5.0",
    Live: A
  }
}();
