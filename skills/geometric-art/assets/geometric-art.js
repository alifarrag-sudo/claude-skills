/* Geometric Art: a posterised gradient field with ordered dither on every band edge.
   WebGL2, no dependencies, every frame a pure function of t (seek-safe for HyperFrames).
   Inspired by the Hero Geometric component in Componentry by harshjdhv (MIT, see NOTICE).
   Simplex noise: Ashima Arts / Ian McEwan, MIT. */
(function () {
  const VERT = `#version 300 es
in vec2 p;
void main() { gl_Position = vec4(p, 0.0, 1.0); }`;

  const FRAG = `#version 300 es
precision highp float;
uniform vec2 uRes;
uniform float uTime, uBands, uNoise, uScale, uDither, uPixel, uFade;
uniform vec2 uDir;
uniform vec3 uPal[8];
uniform vec3 uPaper;
out vec4 outColor;

vec3 permute(vec3 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }
float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m; m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 a0 = x - floor(x + 0.5);
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

// 8x8 Bayer matrix without lookup tables, values in [0,1)
float b2(vec2 a) { a = floor(a); return fract(a.x * 0.5 + a.y * a.y * 0.75); }
float bayer8(vec2 a) { return b2(a * 0.25) * 0.0625 + b2(a * 0.5) * 0.25 + b2(a); }

void main() {
  vec2 cell = floor(gl_FragCoord.xy / uPixel);
  vec2 uv = (cell + 0.5) * uPixel / uRes;       // sample at cell centre so pixels stay crisp
  float asp = uRes.x / uRes.y;
  vec2 q = (uv - 0.5) * vec2(asp, 1.0);

  // linear ramp along uDir, 0 at the start corner and 1 at the far corner
  float ext = 0.5 * (abs(uDir.x) * asp + abs(uDir.y));
  float g = dot(q, uDir) / (2.0 * ext) + 0.5;
  g += snoise(q * uScale + uTime * vec2(0.05, 0.03)) * uNoise;

  float d = bayer8(cell);
  float band = floor(clamp(g, 0.0, 1.0) * uBands + (d - 0.5) * uDither);
  vec3 c = uPal[int(clamp(band, 0.0, uBands - 1.0))];

  // dithered dissolve into paper around the start corner
  vec2 corner = -sign(uDir) * vec2(0.5 * asp, 0.5);
  float f = smoothstep(0.0, max(uFade, 1e-4), length(q - corner));
  c = mix(uPaper, c, uDither > 0.0 ? step(d, f) : f);

  outColor = vec4(c, 1.0);
}`;

  const DEFAULTS = {
    colors: ["#2F6BFF", "#EEF5FF"], // 2 to 8 stops, dark to light reads best
    bands: 4, // 2 to 8 flat bands
    angle: 45, // degrees, direction the ramp climbs (0 = left to right, 90 = bottom to top)
    noise: 0.25, // how far the band edges wander
    scale: 1.5, // noise frequency
    dither: 0.5, // 0 = hard edges, 1 = dither across a whole band
    pixel: 2, // dither cell size in CSS px (use 3+ for video, 1px dither dies in H.264)
    fade: 0.35, // radius of the dissolve into paper, in frame heights (0 = off)
    paper: "#FFFFFF",
    speed: 1,
    pixelRatio: 1,
  };

  const hex = (h) => {
    const s = String(h).trim().replace(/^#/, "");
    const n = /^[0-9a-f]{6}$/i.test(s) ? parseInt(s, 16) : 0x808080;
    return [(n >> 16) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
  };

  const clampBands = (n) => Math.max(2, Math.min(8, Math.round(n) || 4));

  // spread n band colours evenly across the stops
  function bandColors(stops, n) {
    const s = stops.length > 1 ? stops : [stops[0], stops[0]];
    return Array.from({ length: n }, (_, i) => {
      const t = (i / (n - 1)) * (s.length - 1);
      const k = Math.min(Math.floor(t), s.length - 2);
      const f = t - k;
      return s[k].map((v, j) => v + (s[k + 1][j] - v) * f);
    });
  }

  function parseColors(c) {
    const list = Array.isArray(c) ? c : String(c || "").split(/[\s,]+/);
    const clean = list.filter((x) => /^#?[0-9a-f]{6}$/i.test(String(x).trim()));
    return (clean.length ? clean : DEFAULTS.colors).slice(0, 8);
  }

  function create(canvas, opts) {
    const gl = canvas.getContext("webgl2", { antialias: false, preserveDrawingBuffer: true });
    if (!gl) return null;
    const sh = (type, src) => {
      const s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s));
      return s;
    };
    const prog = gl.createProgram();
    gl.attachShader(prog, sh(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(prog));
    gl.useProgram(prog);

    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const U = {};
    for (const n of ["uRes", "uTime", "uBands", "uNoise", "uScale", "uDither", "uPixel", "uFade", "uDir", "uPal", "uPaper"])
      U[n] = gl.getUniformLocation(prog, n);

    let o = { ...DEFAULTS, ...opts };

    function render(t) {
      const w = canvas.width, h = canvas.height;
      const bands = clampBands(o.bands);
      const a = (o.angle * Math.PI) / 180;
      const pal = new Float32Array(24);
      pal.set(bandColors(parseColors(o.colors).map(hex), bands).flat());
      gl.viewport(0, 0, w, h);
      gl.uniform2f(U.uRes, w, h);
      gl.uniform1f(U.uTime, (t || 0) * o.speed);
      gl.uniform1f(U.uBands, bands);
      gl.uniform1f(U.uNoise, o.noise);
      gl.uniform1f(U.uScale, o.scale);
      gl.uniform1f(U.uDither, o.dither);
      gl.uniform1f(U.uPixel, Math.max(1, o.pixel * o.pixelRatio));
      gl.uniform1f(U.uFade, o.fade);
      gl.uniform2f(U.uDir, Math.cos(a), Math.sin(a));
      gl.uniform3fv(U.uPal, pal);
      gl.uniform3fv(U.uPaper, hex(o.paper));
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    }

    return {
      render,
      gl,
      set(next) { o = { ...o, ...next }; },
      destroy() { const x = gl.getExtension("WEBGL_lose_context"); if (x) x.loseContext(); },
    };
  }

  // Web use: fills `el` (give it position:relative), animates while on screen,
  // holds a still frame under prefers-reduced-motion, falls back to hard CSS bands without WebGL2.
  function mount(el, opts = {}) {
    const canvas = document.createElement("canvas");
    canvas.setAttribute("aria-hidden", "true");
    Object.assign(canvas.style, { position: "absolute", inset: "0", width: "100%", height: "100%", display: "block", pointerEvents: "none" });
    el.prepend(canvas);
    const art = create(canvas, opts);
    if (!art) {
      canvas.remove();
      const o = { ...DEFAULTS, ...opts };
      const cols = bandColors(parseColors(o.colors).map(hex), clampBands(o.bands)).map((c) => `rgb(${c.map((v) => Math.round(v * 255))})`);
      const stops = cols.map((c, i) => `${c} ${(i / cols.length) * 100}% ${((i + 1) / cols.length) * 100}%`);
      el.style.background = `linear-gradient(${90 - o.angle}deg, ${stops.join(", ")})`;
      return null;
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t0 = performance.now();
    let raf = 0, visible = true;
    const frame = (now) => {
      art.render(still ? 0 : (now - t0) / 1000);
      raf = still || !visible ? 0 : requestAnimationFrame(frame);
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(frame); };

    art.set({ pixelRatio: dpr });
    const ro = new ResizeObserver(() => {
      canvas.width = Math.max(1, Math.round(el.clientWidth * dpr));
      canvas.height = Math.max(1, Math.round(el.clientHeight * dpr));
      kick();
    });
    ro.observe(el);
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) kick(); });
    io.observe(el);

    return {
      ...art,
      set(next) { art.set(next); kick(); },
      destroy() { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); art.destroy(); canvas.remove(); },
    };
  }

  globalThis.GeometricArt = { create, mount, DEFAULTS, parseColors };
})();
