/*!
 * Magic Scroll: liquid-glass.js
 * Vanilla port of rdev/liquid-glass-react (MIT, (c) 2025 rdev). See vendor/liquid-glass-react.
 * Same optics: an SVG displacement map + RGB-split feDisplacementMap chain applied as
 * `filter: url(#id)` to a span that also carries `backdrop-filter`, so whatever sits
 * behind the pane (a Magic Scroll canvas, a video, a photo) is bent at the rim.
 *
 *   LiquidGlass.apply(el, { displacementScale: 70, blurAmount: 0.0625, saturation: 140,
 *                           aberrationIntensity: 2, elasticity: 0.15, mode: "standard",
 *                           cornerRadius: null, tint: "rgba(255,255,255,0.04)", overLight: false,
 *                           refractOnTouch: false })   touch devices get blur-only glass unless true
 *   LiquidGlass.init()          applies to every [data-liquid-glass] (options from data-lg-*)
 *   handle.set({...}) / handle.destroy()
 *
 * Refraction runs on Chromium only (backdrop + SVG filter is unsupported in Safari/Firefox);
 * elsewhere the pane is blur + saturate + rim light, which still reads as glass.
 */
(function () {
  "use strict";
  var MAPS = window.LIQUID_GLASS_MAPS || {};
  var SVGNS = "http://www.w3.org/2000/svg";
  var uid = 0;
  var mq = function (q) { return window.matchMedia && window.matchMedia(q).matches; };
  // NOTE: UA-data sniff = Chromium. Swap for a feature test if WebKit ever ships backdrop url().
  var REFRACTS = !!navigator.userAgentData && !/firefox/i.test(navigator.userAgent);

  var DEFAULTS = {
    displacementScale: 70, blurAmount: 0.0625, saturation: 140, aberrationIntensity: 2,
    elasticity: 0.15, mode: "standard", cornerRadius: null, tint: "rgba(255,255,255,0.04)",
    overLight: false, refractOnTouch: false
  };

  /* ---- shader-mode map, ported from shader-utils.ts (itself from shuding/liquid-glass) ---- */
  function smoothStep(a, b, t) { t = Math.max(0, Math.min(1, (t - a) / (b - a))); return t * t * (3 - 2 * t); }
  function rrSDF(x, y, w, h, r) {
    var qx = Math.abs(x) - w + r, qy = Math.abs(y) - h + r;
    return Math.min(Math.max(qx, qy), 0) + Math.hypot(Math.max(qx, 0), Math.max(qy, 0)) - r;
  }
  function shaderMap(w, h) {
    w = Math.max(2, Math.round(w)); h = Math.max(2, Math.round(h));
    var c = document.createElement("canvas"); c.width = w; c.height = h;
    // CPU canvas: a GPU one makes toDataURL wait for page raster, 2.4 to 2.7 s per render in headless Chrome.
    var ctx = c.getContext("2d", { willReadFrequently: true }), raw = new Float32Array(w * h * 2), max = 0, i = 0, x, y;
    for (y = 0; y < h; y++) for (x = 0; x < w; x++) {
      var ix = x / w - 0.5, iy = y / h - 0.5;
      var s = smoothStep(0, 1, smoothStep(0.8, 0, rrSDF(ix, iy, 0.3, 0.2, 0.6) - 0.15));
      var dx = (ix * s + 0.5) * w - x, dy = (iy * s + 0.5) * h - y;
      max = Math.max(max, Math.abs(dx), Math.abs(dy)); raw[i++] = dx; raw[i++] = dy;
    }
    max = Math.max(max, 1);
    var img = ctx.createImageData(w, h), d = img.data; i = 0;
    for (y = 0; y < h; y++) for (x = 0; x < w; x++) {
      var edge = Math.min(1, Math.min(x, y, w - x - 1, h - y - 1) / 2);
      var r = (raw[i++] * edge) / max + 0.5, g = (raw[i++] * edge) / max + 0.5, p = (y * w + x) * 4;
      d[p] = r * 255; d[p + 1] = g * 255; d[p + 2] = g * 255; d[p + 3] = 255;
    }
    ctx.putImageData(img, 0, 0);
    return c.toDataURL();
  }

  /* ---- the filter chain, verbatim from GlassFilter in src/index.tsx ---- */
  function filterMarkup(id, o, href) {
    var sign = o.mode === "shader" ? 1 : -1, ab = o.aberrationIntensity, sc = o.overLight ? o.displacementScale * 0.5 : o.displacementScale;
    var chan = function (n, k) {
      var m = ["0 0 0 0 0", "0 0 0 0 0", "0 0 0 0 0", "0 0 0 1 0"]; m[k] = ["1 0 0 0 0", "0 1 0 0 0", "0 0 1 0 0"][k];
      return '<feColorMatrix in="' + n + '_DISPLACED" type="matrix" values="' + m.join(" ") + '" result="' + n + '_CHANNEL"/>';
    };
    var disp = function (n, s) {
      return '<feDisplacementMap in="SourceGraphic" in2="DISPLACEMENT_MAP" scale="' + s + '" xChannelSelector="R" yChannelSelector="B" result="' + n + '_DISPLACED"/>';
    };
    return '<defs><filter id="' + id + '" x="-35%" y="-35%" width="170%" height="170%" color-interpolation-filters="sRGB">' +
      '<feImage x="0" y="0" width="100%" height="100%" result="DISPLACEMENT_MAP" href="' + href + '" preserveAspectRatio="xMidYMid slice"/>' +
      '<feColorMatrix in="DISPLACEMENT_MAP" type="matrix" values="0.3 0.3 0.3 0 0 0.3 0.3 0.3 0 0 0.3 0.3 0.3 0 0 0 0 0 1 0" result="EDGE_INTENSITY"/>' +
      '<feComponentTransfer in="EDGE_INTENSITY" result="EDGE_MASK"><feFuncA type="discrete" tableValues="0 ' + ab * 0.05 + ' 1"/></feComponentTransfer>' +
      '<feOffset in="SourceGraphic" dx="0" dy="0" result="CENTER_ORIGINAL"/>' +
      disp("RED", sc * sign) + chan("RED", 0) +
      disp("GREEN", sc * (sign - ab * 0.05)) + chan("GREEN", 1) +
      disp("BLUE", sc * (sign - ab * 0.1)) + chan("BLUE", 2) +
      '<feBlend in="GREEN_CHANNEL" in2="BLUE_CHANNEL" mode="screen" result="GB_COMBINED"/>' +
      '<feBlend in="RED_CHANNEL" in2="GB_COMBINED" mode="screen" result="RGB_COMBINED"/>' +
      '<feGaussianBlur in="RGB_COMBINED" stdDeviation="' + Math.max(0.1, 0.5 - ab * 0.1) + '" result="ABERRATED_BLURRED"/>' +
      '<feComposite in="ABERRATED_BLURRED" in2="EDGE_MASK" operator="in" result="EDGE_ABERRATION"/>' +
      '<feComponentTransfer in="EDGE_MASK" result="INVERTED_MASK"><feFuncA type="table" tableValues="1 0"/></feComponentTransfer>' +
      '<feComposite in="CENTER_ORIGINAL" in2="INVERTED_MASK" operator="in" result="CENTER_CLEAN"/>' +
      '<feComposite in="EDGE_ABERRATION" in2="CENTER_CLEAN" operator="over"/></filter></defs>';
  }

  function apply(el, opts) {
    if (el.__liquidGlass) return el.__liquidGlass.set(opts || {});
    var o = Object.assign({}, DEFAULTS, opts || {});
    var id = "lg-filter-" + (++uid);
    el.classList.add("lg");
    if (getComputedStyle(el).position === "static") el.style.position = "relative"; // layers need a containing block

    var svg = document.createElementNS(SVGNS, "svg");
    svg.setAttribute("class", "lg-layer lg-svg"); svg.setAttribute("aria-hidden", "true");
    var warp = document.createElement("span"); warp.className = "lg-layer lg-warp";
    var edgeA = document.createElement("span"); edgeA.className = "lg-layer lg-edge lg-edge--screen";
    var edgeB = document.createElement("span"); edgeB.className = "lg-layer lg-edge lg-edge--overlay";
    el.prepend(svg, warp); el.append(edgeA, edgeB);

    var shaderUrl = "", sizeKey = "";
    function render() {
      var r = el.getBoundingClientRect();
      if (o.mode === "shader") {
        var k = Math.round(r.width) + "x" + Math.round(r.height);
        if (k !== sizeKey && r.width > 1) { sizeKey = k; shaderUrl = shaderMap(r.width, r.height); }
      }
      var href = o.mode === "shader" ? (shaderUrl || MAPS.standard) : (MAPS[o.mode] || MAPS.standard);
      svg.innerHTML = href ? filterMarkup(id, o, href) : "";
      if (o.cornerRadius != null) el.style.setProperty("--lg-radius", o.cornerRadius + "px");
      // the displacement filter paints past the rounded corners as a grey box; clip the warp to the pane's shape after it
      warp.style.clipPath = "inset(0 round " + (getComputedStyle(el).borderRadius || "0") + ")";
      el.style.setProperty("--lg-blur", ((o.overLight ? 12 : 4) + o.blurAmount * 32) + "px");
      el.style.setProperty("--lg-sat", o.saturation + "%");
      el.style.setProperty("--lg-tint", o.tint);
      el.classList.toggle("lg--over-light", !!o.overLight);
      var touchOnly = !mq("(hover: hover)") && !o.refractOnTouch; // phones: blur-only unless asked, it costs a full filter pass per frame
      warp.style.filter = REFRACTS && href && !touchOnly && !mq("(prefers-reduced-transparency: reduce)") ? "url(#" + id + ")" : "";
    }
    render();

    /* elastic pull + rim-light angle, from LiquidGlass in src/index.tsx */
    var raf = 0, mouse = null, zone = 200;
    function pointer() {
      raf = 0;
      if (!mouse || o.elasticity <= 0) return;
      var r = el.getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top + r.height / 2;
      var dx = mouse.x - cx, dy = mouse.y - cy;
      el.style.setProperty("--lg-angle", (135 + (dx / r.width) * 120) + "deg");
      el.style.setProperty("--lg-mx", Math.abs(dx / r.width));
      var ex = Math.max(0, Math.abs(dx) - r.width / 2), ey = Math.max(0, Math.abs(dy) - r.height / 2);
      var fade = Math.max(0, 1 - Math.hypot(ex, ey) / zone), dist = Math.hypot(dx, dy) || 1;
      var s = Math.min(dist / 300, 1) * o.elasticity * fade, nx = Math.abs(dx / dist), ny = Math.abs(dy / dist);
      el.style.setProperty("--lg-tx", dx * o.elasticity * 0.1 * fade + "px");
      el.style.setProperty("--lg-ty", dy * o.elasticity * 0.1 * fade + "px");
      el.style.setProperty("--lg-sx", Math.max(0.8, 1 + nx * s * 0.3 - ny * s * 0.15));
      el.style.setProperty("--lg-sy", Math.max(0.8, 1 + ny * s * 0.3 - nx * s * 0.15));
    }
    function onMove(e) { mouse = { x: e.clientX, y: e.clientY }; if (!raf) raf = requestAnimationFrame(pointer); }
    var interactive = !mq("(prefers-reduced-motion: reduce)") && mq("(hover: hover)");
    if (interactive) window.addEventListener("pointermove", onMove, { passive: true });

    var ro = o.mode === "shader" && window.ResizeObserver ? new ResizeObserver(render) : null;
    if (ro) ro.observe(el);

    var handle = {
      el: el, options: o, refracts: REFRACTS,
      set: function (next) { Object.assign(o, next || {}); render(); return handle; },
      destroy: function () {
        window.removeEventListener("pointermove", onMove); if (ro) ro.disconnect();
        svg.remove(); warp.remove(); edgeA.remove(); edgeB.remove();
        el.classList.remove("lg", "lg--over-light"); delete el.__liquidGlass;
      }
    };
    el.__liquidGlass = handle;
    return handle;
  }

  function num(v) { return v != null && v !== "" && !isNaN(v) ? parseFloat(v) : undefined; }
  function init(root) {
    return Array.prototype.map.call((root || document).querySelectorAll("[data-liquid-glass]"), function (el) {
      var d = el.dataset, o = {};
      [["displacementScale", "lgScale"], ["blurAmount", "lgBlur"], ["saturation", "lgSaturation"],
       ["aberrationIntensity", "lgAberration"], ["elasticity", "lgElasticity"], ["cornerRadius", "lgRadius"]]
        .forEach(function (p) { var v = num(d[p[1]]); if (v !== undefined) o[p[0]] = v; });
      if (d.lgMode) o.mode = d.lgMode;
      if (d.lgTint) o.tint = d.lgTint;
      if (d.lgRefractOnTouch != null) o.refractOnTouch = d.lgRefractOnTouch !== "false";
      if (d.lgOverLight != null) o.overLight = d.lgOverLight !== "false";
      return apply(el, o);
    });
  }

  window.LiquidGlass = { apply: apply, init: init, refracts: REFRACTS, shaderMap: shaderMap };
})();
