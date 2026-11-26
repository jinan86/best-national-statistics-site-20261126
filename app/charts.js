// Pure-SVG charts for Statistik Indonesia. No library, no canvas, no
// network: each function takes a series from data.js and returns an SVG
// string with axes, gridlines and value labels.

function niceTicks(min, max, count) {
  const span = max - min || 1;
  const step = span / count;
  const mag = 10 ** Math.floor(Math.log10(step));
  const norm = step / mag;
  const nice = norm < 1.5 ? 1 : norm < 3.5 ? 2 : norm < 7.5 ? 5 : 10;
  const s = nice * mag;
  const lo = Math.floor(min / s) * s;
  const ticks = [];
  for (let v = lo; v <= max + s * 0.001; v += s) ticks.push(v);
  return ticks;
}

function fmt(n) {
  const s = String(Math.round(n * 100) / 100);
  return s.replace('.', ',');
}

function chartFrame(series, width, height, centered = false) {
  const padL = 56, padR = 14, padT = 18, padB = 34;
  const values = series.points.map((p) => p.y);
  let min = Math.min(...values);
  let max = Math.max(...values);
  if (min > 0) min = Math.min(min, 0);
  if (min === max) { min -= 1; max += 1; }
  const pad = (max - min) * 0.08;
  min -= pad; max += pad;
  const innerW = width - padL - padR;
  const innerH = height - padT - padB;
  const xAt = (i) => centered
    ? padL + (innerW / series.points.length) * (i + 0.5)
    : padL + (series.points.length === 1 ? innerW / 2 : (i * innerW) / (series.points.length - 1));
  const yAt = (v) => padT + innerH - ((v - min) / (max - min)) * innerH;
  const ticks = niceTicks(min, max, 4);
  let grid = '';
  for (const t of ticks) {
    const y = yAt(t);
    grid += `<line x1="${padL}" y1="${y.toFixed(1)}" x2="${width - padR}" y2="${y.toFixed(1)}" class="grid"/>`
      + `<text x="${padL - 8}" y="${(y + 4).toFixed(1)}" class="axis" text-anchor="end">${fmt(t)}</text>`;
  }
  let labels = '';
  series.points.forEach((p, i) => {
    labels += `<text x="${xAt(i).toFixed(1)}" y="${height - 10}" class="axis" text-anchor="middle">${p.x}</text>`;
  });
  return { padL, padR, padT, padB, innerW, innerH, xAt, yAt, grid, labels, width, height };
}

export function lineChart(series, options = {}) {
  const width = options.width ?? 640;
  const height = options.height ?? 300;
  const color = options.color ?? '#0e7c6b';
  const f = chartFrame(series, width, height);
  const pts = series.points.map((p, i) => `${f.xAt(i).toFixed(1)},${f.yAt(p.y).toFixed(1)}`).join(' ');
  const area = `${f.padL},${f.yAt(Math.max(0, Math.min(...series.points.map((p) => p.y))))} ${pts} ${f.xAt(series.points.length - 1).toFixed(1)},${f.yAt(Math.max(0, Math.min(...series.points.map((p) => p.y))))}`;
  let dots = '';
  series.points.forEach((p, i) => {
    dots += `<circle cx="${f.xAt(i).toFixed(1)}" cy="${f.yAt(p.y).toFixed(1)}" r="4.5" class="dot" fill="${color}"/>`
      + `<text x="${f.xAt(i).toFixed(1)}" y="${(f.yAt(p.y) - 10).toFixed(1)}" class="value" text-anchor="middle">${fmt(p.y)}</text>`;
  });
  return `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Grafik garis: ${series.title}" class="chart-svg">`
    + f.grid
    + `<polygon points="${area}" class="area" fill="${color}"/>`
    + `<polyline points="${pts}" class="line" stroke="${color}"/>`
    + dots + f.labels
    + `</svg>`;
}

export function barChart(series, options = {}) {
  const width = options.width ?? 640;
  const height = options.height ?? 300;
  const color = options.color ?? '#0f2a43';
  const negColor = options.negColor ?? '#b3402e';
  const f = chartFrame(series, width, height, true);
  const zeroY = f.yAt(0);
  const slot = f.innerW / series.points.length;
  const barW = Math.min(52, slot * 0.62);
  let bars = '';
  series.points.forEach((p, i) => {
    const cx = f.xAt(i);
    const y = f.yAt(p.y);
    const top = Math.min(y, zeroY);
    const h = Math.max(1, Math.abs(zeroY - y));
    const fill = p.y < 0 ? negColor : color;
    bars += `<rect x="${(cx - barW / 2).toFixed(1)}" y="${top.toFixed(1)}" width="${barW.toFixed(1)}" height="${h.toFixed(1)}" rx="3" fill="${fill}"/>`
      + `<text x="${cx.toFixed(1)}" y="${(top - 7).toFixed(1)}" class="value" text-anchor="middle">${fmt(p.y)}</text>`;
  });
  return `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Grafik batang: ${series.title}" class="chart-svg">`
    + f.grid
    + `<line x1="${f.padL}" y1="${zeroY.toFixed(1)}" x2="${width - f.padR}" y2="${zeroY.toFixed(1)}" class="zero"/>`
    + bars + f.labels
    + `</svg>`;
}
