/*!
 * Magic Scroll: magic-scroll.js
 * Scroll-scrubbed image sequence on a sticky canvas. Scroll is the timeline:
 * down advances, up reverses, stopping freezes. No dependencies.
 *
 * Markup (one per sequence; the section's height is the scroll distance):
 *   <section class="ms-sequence" data-magic-scroll
 *            data-frames="/sequences/product/" data-count="120">
 *     <div class="ms-stage">
 *       <img class="ms-poster" src="/sequences/product/frame_0001.webp" alt="...">
 *       <canvas class="ms-canvas" aria-hidden="true"></canvas>
 *       <div class="ms-overlay" data-ms-range="0,0.25">Headline</div>
 *     </div>
 *   </section>
 *
 * JS:  MagicScroll.init()                       every [data-magic-scroll], options from data-*
 *      MagicScroll.sequence(section, options)   returns { progress, frame, destroy, state }
 *
 * Options (data-* attribute in brackets):
 *   framesPath [frames] frameCount [count] filePrefix [prefix]="frame_" fileExtension [ext]="webp"
 *   pad [pad]=4 fitMode [fit]="contain"|"cover" startFrame [start]=1 endFrame [end]=frameCount
 *   posterFrame [poster-frame]=startFrame (the reduced-motion still)
 *   scrollHeight [height]="400vh" mobileScrollHeight [mobile-height]
 *   mobileFramesPath [mobile-frames] mobileFrameCount [mobile-count] mobileBreakpoint [breakpoint]=768
 *   preloadStrategy [preload]="progressive"|"all"|"nearby"  maxDpr [max-dpr]=2
 *   focusX/focusY [focus-x/focus-y]=0.5 (cover crop anchor)  onProgress(p, frame)
 */
(function () {
  "use strict";
  var instances = [];
  var mm = function (q) { return window.matchMedia ? window.matchMedia(q) : { matches: false, addEventListener: function () {} }; };
  var clamp = function (v, a, b) { return v < a ? a : v > b ? b : v; };

  function frameUrl(set, n) {
    var s = String(n); while (s.length < set.pad) s = "0" + s;
    return set.path + set.prefix + s + "." + set.ext;
  }

  function sequence(section, options) {
    if (section.__magicScroll) return section.__magicScroll;
    var o = Object.assign({
      filePrefix: "frame_", fileExtension: "webp", pad: 4, fitMode: "contain", startFrame: 1,
      scrollHeight: "400vh", mobileBreakpoint: 768, preloadStrategy: "progressive", maxDpr: 2,
      focusX: 0.5, focusY: 0.5
    }, options || {});
    if (!o.framesPath || !o.frameCount) throw new Error("MagicScroll: framesPath and frameCount are required");

    var stage = section.querySelector(".ms-stage");
    var canvas = section.querySelector("canvas") || stage.appendChild(document.createElement("canvas"));
    var ctx = canvas.getContext("2d");
    var poster = section.querySelector(".ms-poster");
    var overlays = [].slice.call(section.querySelectorAll("[data-ms-range]")).map(function (el) {
      var r = el.getAttribute("data-ms-range").split(",").map(parseFloat);
      return { el: el, a: r[0], b: r[1] };
    });
    var mqMobile = mm("(max-width: " + (o.mobileBreakpoint - 1) + "px)");
    var mqReduced = mm("(prefers-reduced-motion: reduce)");

    var set, imgs, ready, inflight, queue, errors, drawn = -1, want = 0, lastWant = 0, dir = 1;
    var progress = 0, raf = 0, inView = false, size = "", alive = true, stats = { draws: 0, blanks: 0, ticks: 0, tickMs: 0, tickMax: 0 };

    function pickSet() {
      var mobile = mqMobile.matches && o.mobileFramesPath;
      var count = mobile ? (o.mobileFrameCount || o.frameCount) : o.frameCount;
      var ratio = count / o.frameCount; // frame ranges scale when the mobile set is shorter
      set = {
        mobile: !!mobile, path: mobile ? o.mobileFramesPath : o.framesPath, count: count,
        prefix: o.filePrefix, ext: o.fileExtension, pad: o.pad,
        start: Math.max(1, Math.round(o.startFrame * ratio)),
        end: Math.min(count, Math.round((o.endFrame || o.frameCount) * ratio)),
        poster: Math.round((o.posterFrame || o.startFrame) * ratio) || 1
      };
      imgs = new Array(count + 1); ready = new Uint8Array(count + 1); inflight = 0; errors = 0; drawn = -1;
      // Coarse-to-fine order: every 16th frame, then 8th, 4th, 2nd, 1st. A fast scroll early on
      // always has a near neighbour to show instead of a blank.
      queue = []; var seen = {};
      [16, 8, 4, 2, 1].forEach(function (step) {
        for (var n = set.start; n <= set.end; n += step) if (!seen[n]) { seen[n] = 1; queue.push(n); }
      });
      if (!seen[set.end]) queue.splice(1, 0, set.end);
      section.style.height = mqReduced.matches ? "" : (set.mobile && o.mobileScrollHeight) || o.scrollHeight;
      section.classList.toggle("ms-mobile", set.mobile);
    }

    function load(n) {
      if (imgs[n]) return;
      var img = new Image(); img.decoding = "async"; imgs[n] = img; inflight++;
      img.onload = function () {
        (img.decode ? img.decode() : Promise.resolve()).catch(function () {}).then(function () {
          if (imgs[n] !== img) return; // set swapped mid-load
          ready[n] = 1; inflight--;
          if (poster && poster.getAttribute("src") === null && n === set.start) poster.src = img.src;
          schedule(); pump();
        });
      };
      img.onerror = function () {
        if (imgs[n] !== img) return;
        inflight--; errors++;
        if (errors > set.count * 0.2 || n === set.start) section.classList.add("ms-failed"); // poster stays up
        pump();
      };
      img.src = frameUrl(set, n);
    }

    function pump() {
      if (!alive || mqReduced.matches) return;
      var strategy = o.preloadStrategy, cap = 6;
      // Look-ahead window in the scroll direction first, so the next frames are already decoded.
      for (var k = 0; k <= 12 && inflight < cap; k++) {
        var n = clamp(want + dir * k, set.start, set.end);
        if (!imgs[n]) load(n);
      }
      if (strategy === "nearby") return; // look-ahead only
      if (strategy === "progressive" && !inView && drawn > 0) return;
      while (inflight < cap && queue.length) { var q = queue.shift(); if (!imgs[q]) load(q); }
    }

    function nearestReady(n) {
      if (ready[n]) return n;
      for (var d = 1; d <= set.count; d++) {
        var a = n - d * dir, b = n + d * dir; // prefer the frame we just came from
        if (a >= set.start && a <= set.end && ready[a]) return a;
        if (b >= set.start && b <= set.end && ready[b]) return b;
        if (a < set.start && b > set.end) break;
      }
      return -1;
    }

    function resize() {
      var dpr = Math.min(window.devicePixelRatio || 1, o.maxDpr);
      var w = Math.round(canvas.clientWidth * dpr), h = Math.round(canvas.clientHeight * dpr);
      if (w + "x" + h === size) return false;
      size = w + "x" + h; canvas.width = w; canvas.height = h; drawn = -1;
      return true;
    }

    function draw(n) {
      var img = imgs[n], cw = canvas.width, ch = canvas.height;
      var iw = img.naturalWidth, ih = img.naturalHeight;
      var s = o.fitMode === "cover" ? Math.max(cw / iw, ch / ih) : Math.min(cw / iw, ch / ih);
      var dw = iw * s, dh = ih * s;
      var dx = (cw - dw) * (o.fitMode === "cover" ? o.focusX : 0.5), dy = (ch - dh) * (o.fitMode === "cover" ? o.focusY : 0.5);
      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, dx, dy, dw, dh);
      drawn = n; stats.draws++;
      if (!section.classList.contains("ms-ready")) section.classList.add("ms-ready");
    }

    function measure() {
      if (mqReduced.matches) { progress = 1; return; }
      var r = section.getBoundingClientRect(), total = section.offsetHeight - window.innerHeight;
      progress = total > 0 ? clamp(-r.top / total, 0, 1) : 0;
    }

    function tick() {
      raf = 0;
      if (!alive) return;
      var t0 = performance.now();
      measure();
      want = mqReduced.matches ? set.poster : Math.round(set.start + progress * (set.end - set.start));
      if (want !== lastWant) { dir = want > lastWant ? 1 : -1; lastWant = want; }
      var resized = resize();
      var n = nearestReady(want);
      if (n > 0 && (n !== drawn || resized)) draw(n); else if (n < 0) stats.blanks++;
      if (n !== want) pump();
      section.style.setProperty("--ms-progress", progress.toFixed(4));
      for (var i = 0; i < overlays.length; i++) {
        var ov = overlays[i], span = ov.b - ov.a, local = clamp((progress - ov.a) / span, 0, 1), vis;
        if (mqReduced.matches) vis = 1;
        else if (progress < ov.a || progress > ov.b) vis = (progress > ov.b && ov.b >= 1) ? 1 : 0;
        else {
          var fin = ov.a <= 0 ? 1 : clamp(local / 0.2, 0, 1), fout = ov.b >= 1 ? 1 : clamp((1 - local) / 0.2, 0, 1);
          vis = Math.min(fin, fout);
        }
        ov.el.style.setProperty("--ms-local", local.toFixed(4));
        ov.el.style.setProperty("--ms-vis", vis.toFixed(4));
        ov.el.classList.toggle("ms-on", vis > 0.01);
      }
      if (o.onProgress) o.onProgress(progress, drawn);
      var dt = performance.now() - t0; stats.ticks++; stats.tickMs += dt; if (dt > stats.tickMax) stats.tickMax = dt;
    }

    function schedule() { if (!raf && alive) raf = requestAnimationFrame(tick); }

    var io = new IntersectionObserver(function (es) {
      inView = es[0].isIntersecting; if (inView) { pump(); schedule(); }
    }, { rootMargin: "100% 0px" });

    function reset() { section.classList.remove("ms-ready", "ms-failed"); pickSet(); size = ""; load(mqReduced.matches ? set.poster : set.start); if (!mqReduced.matches && o.preloadStrategy === "all") pump(); schedule(); }
    function onMedia() { section.classList.toggle("ms-reduced", mqReduced.matches); reset(); }

    section.classList.toggle("ms-reduced", mqReduced.matches);
    pickSet();
    load(mqReduced.matches ? set.poster : set.start); // first paint as early as possible
    if (!mqReduced.matches && o.preloadStrategy === "all") pump();
    io.observe(section);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    mqMobile.addEventListener && mqMobile.addEventListener("change", reset);
    mqReduced.addEventListener && mqReduced.addEventListener("change", onMedia);
    schedule();

    var api = {
      section: section, options: o,
      get progress() { return progress; }, get frame() { return drawn; },
      state: function () {
        var loaded = 0; for (var i = 1; i < ready.length; i++) loaded += ready[i];
        return { progress: progress, want: want, drawn: drawn, loaded: loaded, count: set.count, start: set.start,
          end: set.end, mobile: set.mobile, errors: errors, draws: stats.draws, blanks: stats.blanks,
          tickAvgMs: stats.ticks ? +(stats.tickMs / stats.ticks).toFixed(2) : 0, tickMaxMs: +stats.tickMax.toFixed(2),
          canvas: [canvas.width, canvas.height], css: [canvas.clientWidth, canvas.clientHeight], reduced: mqReduced.matches };
      },
      destroy: function () {
        alive = false; io.disconnect(); cancelAnimationFrame(raf);
        window.removeEventListener("scroll", schedule); window.removeEventListener("resize", schedule);
        mqMobile.removeEventListener && mqMobile.removeEventListener("change", reset);
        mqReduced.removeEventListener && mqReduced.removeEventListener("change", onMedia);
        imgs = []; delete section.__magicScroll; instances.splice(instances.indexOf(api), 1);
      }
    };
    section.__magicScroll = api; instances.push(api);
    return api;
  }

  function init(root) {
    return [].map.call((root || document).querySelectorAll("[data-magic-scroll]"), function (s) {
      var d = s.dataset, n = function (v) { return v == null || v === "" ? undefined : parseFloat(v); };
      return sequence(s, {
        framesPath: d.frames, frameCount: n(d.count), filePrefix: d.prefix, fileExtension: d.ext, pad: n(d.pad),
        fitMode: d.fit, startFrame: n(d.start), endFrame: n(d.end), posterFrame: n(d.posterFrame),
        scrollHeight: d.height, mobileScrollHeight: d.mobileHeight, mobileFramesPath: d.mobileFrames,
        mobileFrameCount: n(d.mobileCount), mobileBreakpoint: n(d.breakpoint), preloadStrategy: d.preload,
        maxDpr: n(d.maxDpr), focusX: n(d.focusX), focusY: n(d.focusY)
      });
    });
  }

  // Undefined options must not overwrite defaults.
  var _seq = sequence;
  sequence = function (s, opt) {
    var clean = {}; for (var k in opt || {}) if (opt[k] !== undefined) clean[k] = opt[k];
    return _seq(s, clean);
  };

  window.MagicScroll = { init: init, sequence: sequence, instances: instances };
})();
