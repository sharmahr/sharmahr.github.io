const TAU = Math.PI * 2;
const ACCENT = "#d3ef97";

/* A small orthographic renderer, not a WebGL dependency. All geometry is
   authored here; the scene has no model downloads or texture requests. */
export function createSystemRenderer(canvas, initial = {}) {
  const context = canvas.getContext("2d", { alpha: true });
  if (!context) return null;

  let width = 600;
  let height = 620;
  let dpr = 1;
  let frame = null;
  let visible = true;
  let destroyed = false;
  let lastTime = 0;
  let elapsed = 0;
  let spread = 1;
  let yaw = 0.68;
  let pitch = 0.52;
  let pointerX = 0;
  let pointerY = 0;
  let options = { exploded: true, paused: false, reduced: false, ...initial };

  const project = ([x, y, z]) => {
    const u = x * Math.cos(yaw) - z * Math.sin(yaw);
    const v = x * Math.sin(yaw) + z * Math.cos(yaw);
    const scale = Math.min(width / 570, height / 570);
    return [width / 2 + u * scale, height * 0.45 + (y * Math.cos(pitch) + v * Math.sin(pitch)) * scale];
  };

  function path(points, { fill, stroke = "#536046", lineWidth = 0.8, closed = false, alpha = 1 } = {}) {
    context.beginPath();
    points.forEach((point, index) => {
      const [x, y] = project(point);
      if (index === 0) context.moveTo(x, y);
      else context.lineTo(x, y);
    });
    if (closed || fill) context.closePath();
    context.globalAlpha = alpha;
    if (fill) {
      context.fillStyle = fill;
      context.fill();
    }
    if (stroke) {
      context.strokeStyle = stroke;
      context.lineWidth = lineWidth;
      context.stroke();
    }
    context.globalAlpha = 1;
  }

  const square = (y, size, x = 0, z = 0) => [
    [x - size, y, z - size], [x + size, y, z - size],
    [x + size, y, z + size], [x - size, y, z + size]
  ];

  function block(y, size, thickness, palette, x = 0, z = 0) {
    const top = square(y, size, x, z);
    const bottom = square(y + thickness, size, x, z);
    for (let i = 0; i < 4; i += 1) {
      const next = (i + 1) % 4;
      path([top[i], top[next], bottom[next], bottom[i]], {
        fill: palette[i % 2 ? 1 : 2], stroke: palette[3], closed: true
      });
    }
    path(top, { fill: palette[0], stroke: palette[3], closed: true });
  }

  function dot(point, radius = 2, color = ACCENT) {
    const [x, y] = project(point);
    context.beginPath();
    context.arc(x, y, radius * Math.min(width / 570, height / 570), 0, TAU);
    context.fillStyle = color;
    context.fill();
  }

  function traces(y, size, phase) {
    for (let i = -3; i <= 3; i += 1) {
      const lane = i * 24;
      const bend = 58 + Math.abs(i) * 11;
      path([[-size + 14, y, lane], [-bend, y, lane], [-40, y, lane * 0.5]], { stroke: "#647154", alpha: 0.65 });
      path([[40, y, lane * 0.5], [bend, y, lane], [size - 14, y, lane]], { stroke: "#647154", alpha: 0.65 });
      path([[lane, y, -size + 14], [lane, y, -bend], [lane * 0.5, y, -40]], { stroke: "#647154", alpha: 0.65 });
      path([[lane * 0.5, y, 40], [lane, y, bend], [lane, y, size - 14]], { stroke: "#647154", alpha: 0.65 });
      if (i % 2 === 0) {
        const progress = (phase + (i + 3) * 0.13) % 1;
        dot([size - 14 - progress * (size - 60), y, lane], 1.7);
      }
    }
  }

  function draw() {
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    context.clearRect(0, 0, width, height);
    const bottomY = 28 + spread * 65;
    const middleY = -8;
    const topY = -44 - spread * 69;
    const phase = elapsed * 0.16;

    for (let i = -6; i <= 6; i += 1) {
      path([[-220, 147, i * 34], [220, 147, i * 34]], { stroke: "#70815c", alpha: 0.11 });
      path([[i * 34, 147, -220], [i * 34, 147, 220]], { stroke: "#70815c", alpha: 0.11 });
    }

    block(bottomY, 162, 12, ["#20291d", "#141c12", "#1a2317", "#647254"]);
    path(square(bottomY - 0.2, 150), { closed: true, stroke: "#84916c" });
    path(square(bottomY - 0.3, 142), { closed: true, stroke: "#4f5f41" });
    traces(bottomY - 0.5, 142, phase);
    block(bottomY - 9, 34, 9, ["#445538", "#283422", "#34432b", "#7d9064"]);

    for (let i = -5; i <= 5; i += 1) {
      for (const side of [-1, 1]) {
        path([[i * 21, bottomY + 5, side * 162], [i * 21, bottomY + 5, side * 173]], { stroke: "#9ba989", lineWidth: 2.2 });
        path([[side * 162, bottomY + 5, i * 21], [side * 173, bottomY + 5, i * 21]], { stroke: "#9ba989", lineWidth: 2.2 });
      }
    }

    if (spread > 0.05) {
      for (const x of [-98, 98]) {
        for (const z of [-98, 98]) {
          context.setLineDash([2, 5]);
          path([[x, bottomY - 1, z], [x, topY + 8, z]], { stroke: "#a4ba83", alpha: spread * 0.55 });
          context.setLineDash([]);
          const progress = (phase + (x + z) * 0.007 + 3) % 1;
          dot([x, bottomY - progress * (bottomY - topY), z], 2);
        }
      }
    }

    block(middleY, 138, 9, ["#293322", "#192015", "#20291b", "#879471"]);
    path(square(middleY - 0.2, 125), { stroke: "#72835b", closed: true });
    traces(middleY - 0.5, 122, phase + 0.2);
    for (const x of [-62, 0, 62]) {
      for (const z of [-58, 0, 58]) {
        const isCore = x === 0 && z === 0;
        block(middleY - 6, 14, 6, isCore
          ? ["#c3df8a", "#637c40", "#8da85e", "#d8f0a8"]
          : ["#48593a", "#283621", "#38482c", "#819768"], x, z);
      }
    }

    block(topY, 116, 12, ["#35432a", "#202b19", "#2a3622", "#9aa980"]);
    path(square(topY - 0.2, 104), { stroke: "#809765", closed: true });
    path(square(topY - 0.2, 95), { stroke: "#61764d", closed: true });
    traces(topY - 0.4, 99, phase + 0.5);
    for (const x of [-98, 98]) {
      for (const z of [-98, 98]) {
        dot([x, topY - 0.5, z], 3, "#14220f");
        dot([x, topY - 0.5, z], 1.2, "#abc48b");
      }
    }
    block(topY - 8, 48, 8, ["#647a48", "#324626", "#495d35", "#b3cc8c"]);
    block(topY - 31, 37, 23, ["#d2eaa4", "#718d4a", "#a2bd75", "#e5f5c8"]);
    path([[-15, topY - 31.5, -12], [-15, topY - 31.5, 12]], { stroke: "#455b2b", lineWidth: 2.2 });
    path([[-15, topY - 31.5, 0], [0, topY - 31.5, 0], [0, topY - 31.5, 12]], { stroke: "#455b2b", lineWidth: 2.2 });
    path([[18, topY - 31.5, -10], [8, topY - 31.5, -10], [8, topY - 31.5, 0], [18, topY - 31.5, 0], [18, topY - 31.5, 10], [8, topY - 31.5, 10]], { stroke: "#455b2b", lineWidth: 2.2 });
  }

  function schedule() {
    if (frame === null && visible && !document.hidden && !destroyed) frame = requestAnimationFrame(tick);
  }

  function tick(time) {
    frame = null;
    if (destroyed || !visible || document.hidden) return;
    const delta = Math.min((time - lastTime) / 1000 || 0.033, 0.05);
    if (lastTime && time - lastTime < 1000 / 30) {
      schedule();
      return;
    }
    lastTime = time;
    const moving = !options.paused && !options.reduced;
    if (moving) elapsed += delta;
    const targetSpread = options.exploded ? 1 : 0;
    const targetYaw = 0.68 + (moving ? pointerX * 0.28 + Math.sin(elapsed * 0.23) * 0.06 : 0);
    const targetPitch = 0.52 + (moving ? pointerY * 0.12 : 0);
    const blend = options.reduced ? 1 : 1 - Math.exp(-delta * 9);
    spread += (targetSpread - spread) * blend;
    yaw += (targetYaw - yaw) * blend;
    pitch += (targetPitch - pitch) * blend;
    draw();
    const settling = Math.abs(targetSpread - spread) + Math.abs(targetYaw - yaw) + Math.abs(targetPitch - pitch) > 0.001;
    if (moving || settling) schedule();
  }

  function resize() {
    const bounds = canvas.getBoundingClientRect();
    width = Math.max(1, bounds.width);
    height = Math.max(1, bounds.height);
    dpr = Math.min(window.devicePixelRatio || 1, 1.75);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    schedule();
  }

  function stop() {
    if (frame !== null) cancelAnimationFrame(frame);
    frame = null;
    lastTime = 0;
  }

  const onPointer = (event) => {
    if (event.pointerType === "touch" || options.reduced || options.paused) return;
    const bounds = canvas.getBoundingClientRect();
    pointerX = ((event.clientX - bounds.left) / width - 0.5) * 2;
    pointerY = ((event.clientY - bounds.top) / height - 0.5) * 2;
    schedule();
  };
  const onLeave = () => { pointerX = 0; pointerY = 0; schedule(); };
  const onVisibility = () => { if (document.hidden) stop(); else schedule(); };
  const intersection = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) schedule();
    else stop();
  });
  const sizes = new ResizeObserver(resize);
  sizes.observe(canvas);
  intersection.observe(canvas);
  canvas.addEventListener("pointermove", onPointer);
  canvas.addEventListener("pointerleave", onLeave);
  document.addEventListener("visibilitychange", onVisibility);
  resize();
  draw();

  return {
    setOptions(next) { options = { ...options, ...next }; schedule(); },
    destroy() {
      destroyed = true;
      stop();
      intersection.disconnect();
      sizes.disconnect();
      canvas.removeEventListener("pointermove", onPointer);
      canvas.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    }
  };
}
