const startBtn = document.getElementById('start');
const statusEl = document.getElementById('status');

function render(state) {
  if (!state || state.status === 'idle') {
    statusEl.className = '';
    statusEl.textContent = '';
    startBtn.disabled = false;
    return;
  }

  if (state.status === 'running') {
    startBtn.disabled = true;
    statusEl.className = '';
    const progress = state.progress ? ` (${state.progress.done}/${state.progress.total})` : '';
    statusEl.textContent = (state.step || 'Đang chạy...') + progress;
  } else if (state.status === 'done') {
    startBtn.disabled = false;
    statusEl.className = 'done';
    statusEl.textContent = state.step;
  } else if (state.status === 'error') {
    startBtn.disabled = false;
    statusEl.className = 'error';
    statusEl.textContent = 'Lỗi: ' + state.error;
  }
}

chrome.runtime.sendMessage({ type: 'get-state' }, render);

chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === 'state') render(msg.state);
});

startBtn.addEventListener('click', () => {
  startBtn.disabled = true;
  statusEl.className = '';
  statusEl.textContent = 'Đang bắt đầu...';
  chrome.runtime.sendMessage({ type: 'start-scrape' });
});
