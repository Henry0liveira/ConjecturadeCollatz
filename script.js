function collatz(n) {
  const seq = [n];
  while (n !== 1) {
    if (n % 2 === 0) n = n / 2;
    else n = 3 * n + 1;
    seq.push(n);
    if (seq.length > 100000) break; // safety
  }
  return seq;
}

function simulate() {
  const input = document.getElementById('numInput');
  const val = parseInt(input.value);
  const err = document.getElementById('errMsg');

  if (!val || val < 1 || val > 99999999 || !Number.isInteger(val)) {
    err.style.display = 'block';
    return;
  }
  err.style.display = 'none';

  const seq = collatz(val);
  const peak = Math.max(...seq);
  const steps = seq.length - 1;

  // Stats
  document.getElementById('statSteps').textContent = steps;
  document.getElementById('statPeak').textContent = peak.toLocaleString('pt-BR');
  document.getElementById('statStart').textContent = val.toLocaleString('pt-BR');
  const statsBar = document.getElementById('statsBar');
  statsBar.style.display = 'grid';
  statsBar.classList.add('reveal');

  // Chart
  drawChart(seq);
  const cw = document.getElementById('chartWrap');
  cw.style.display = 'block';
  cw.classList.add('reveal');

  // Sequence text
  const nums = seq.map((n, i) => {
    let cls = n % 2 === 0 ? 'seq-even' : 'seq-odd';
    if (n === 1) cls = 'seq-one';
    const arrow = i < seq.length - 1 ? ' → ' : '';
    return `<span class="${cls}">${n.toLocaleString('pt-BR')}</span>${arrow}`;
  }).join('');

  document.getElementById('seqNums').innerHTML = nums;
  const sw = document.getElementById('seqWrap');
  sw.style.display = 'block';
  sw.classList.add('reveal');
}

function drawChart(seq) {
  const canvas = document.getElementById('myChart');
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const wrap = canvas.parentElement;
  const W = wrap.clientWidth - 40;
  const H = 280;

  canvas.width = W * dpr;
  canvas.height = H * dpr;
  canvas.style.width = W + 'px';
  canvas.style.height = H + 'px';
  ctx.scale(dpr, dpr);

  ctx.clearRect(0, 0, W, H);

  const pad = { top: 20, right: 20, bottom: 40, left: 60 };
  const chartW = W - pad.left - pad.right;
  const chartH = H - pad.top - pad.bottom;

  const maxVal = Math.max(...seq);
  const minVal = 0;

  // Grid lines
  ctx.strokeStyle = '#1e1e2e';
  ctx.lineWidth = 1;
  for (let i = 0; i <= 4; i++) {
    const y = pad.top + (chartH / 4) * i;
    ctx.beginPath();
    ctx.moveTo(pad.left, y);
    ctx.lineTo(pad.left + chartW, y);
    ctx.stroke();

    const val = Math.round(maxVal - (maxVal / 4) * i);
    ctx.fillStyle = '#6b6b80';
    ctx.font = '11px IBM Plex Mono, monospace';
    ctx.textAlign = 'right';
    ctx.fillText(val.toLocaleString('pt-BR'), pad.left - 8, y + 4);
  }

  // X axis labels
  const xStep = Math.ceil(seq.length / 8);
  ctx.fillStyle = '#6b6b80';
  ctx.font = '11px IBM Plex Mono, monospace';
  ctx.textAlign = 'center';
  for (let i = 0; i < seq.length; i += xStep) {
    const x = pad.left + (i / (seq.length - 1)) * chartW;
    ctx.fillText(i, x, H - pad.bottom + 16);
  }
  ctx.fillText(seq.length - 1, pad.left + chartW, H - pad.bottom + 16);

  // Area fill
  ctx.beginPath();
  seq.forEach((val, i) => {
    const x = pad.left + (i / (seq.length - 1)) * chartW;
    const y = pad.top + chartH - ((val - minVal) / (maxVal - minVal)) * chartH;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.lineTo(pad.left + chartW, pad.top + chartH);
  ctx.lineTo(pad.left, pad.top + chartH);
  ctx.closePath();

  const grad = ctx.createLinearGradient(0, pad.top, 0, pad.top + chartH);
  grad.addColorStop(0, 'rgba(0,255,136,0.25)');
  grad.addColorStop(1, 'rgba(0,255,136,0)');
  ctx.fillStyle = grad;
  ctx.fill();

  // Line
  ctx.beginPath();
  seq.forEach((val, i) => {
    const x = pad.left + (i / (seq.length - 1)) * chartW;
    const y = pad.top + chartH - ((val - minVal) / (maxVal - minVal)) * chartH;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.strokeStyle = '#00ff88';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Peak dot
  const peakIdx = seq.indexOf(maxVal);
  const px = pad.left + (peakIdx / (seq.length - 1)) * chartW;
  const py = pad.top;
  ctx.beginPath();
  ctx.arc(px, py + chartH - ((maxVal - minVal) / (maxVal - minVal)) * chartH, 5, 0, Math.PI * 2);
  ctx.fillStyle = '#ff6b35';
  ctx.fill();
  ctx.fillStyle = '#ff6b35';
  ctx.font = 'bold 11px IBM Plex Mono, monospace';
  ctx.textAlign = 'center';
  ctx.fillText('PICO: ' + maxVal.toLocaleString('pt-BR'), px, py + 2 + chartH - ((maxVal - minVal) / (maxVal - minVal)) * chartH - 12);
}

function randomize() {
  const n = Math.floor(Math.random() * 9999) + 2;
  document.getElementById('numInput').value = n;
  simulate();
}

// Enter key
document.getElementById('numInput').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') simulate();
});
