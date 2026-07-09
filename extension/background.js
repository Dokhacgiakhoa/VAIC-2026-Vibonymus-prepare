import { getMe, fetchTaxonomies, fetchAllTeams, fetchProfile, TOKEN_KEY } from './lib/api.js';
import { buildLabelMaps, transformTeam } from './lib/transform.js';

const STATE_KEY = 'scrapeState';
const KEEPALIVE_ALARM = 'scrape-keepalive';
const HUB_URL = 'https://hub.aiforvietnam.org/*';

async function setState(patch) {
  const { [STATE_KEY]: prev } = await chrome.storage.session.get(STATE_KEY);
  const next = { ...(prev || {}), ...patch };
  await chrome.storage.session.set({ [STATE_KEY]: next });
  chrome.runtime.sendMessage({ type: 'state', state: next }).catch(() => {});
  return next;
}

async function getState() {
  const { [STATE_KEY]: state } = await chrome.storage.session.get(STATE_KEY);
  return state || { status: 'idle' };
}

const DIACRITICS_RE = new RegExp('[\\u0300-\\u036f]', 'g');

function usernameSlug(me) {
  const raw = (me && (me.handle || me.email || me.full_name)) || 'unknown';
  return (
    raw
      .toString()
      .toLowerCase()
      .normalize('NFD')
      .replace(DIACRITICS_RE, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'unknown'
  );
}

function nowStamp() {
  return new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d+Z$/, '').slice(0, 15);
}

/** Tìm tab hub.aiforvietnam.org đang mở, hoặc tự mở 1 tab mới (không active) nếu chưa có. */
async function findOrCreateHubTab() {
  const tabs = await chrome.tabs.query({ url: HUB_URL });
  if (tabs.length > 0) return tabs[0];

  const tab = await chrome.tabs.create({ url: 'https://hub.aiforvietnam.org/', active: false });
  await new Promise((resolve) => {
    function listener(tabId, info) {
      if (tabId === tab.id && info.status === 'complete') {
        chrome.tabs.onUpdated.removeListener(listener);
        resolve();
      }
    }
    chrome.tabs.onUpdated.addListener(listener);
  });
  return tab;
}

async function getTokenFromBrowser() {
  const tab = await findOrCreateHubTab();
  const [{ result }] = await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: (key) => localStorage.getItem(key),
    args: [TOKEN_KEY],
  });
  return result;
}

// Giữ service worker không bị Chrome tắt giữa chừng trong lúc đang cào (có thể mất vài phút).
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === KEEPALIVE_ALARM) {
    // no-op, alarm nổ định kỳ là đủ để giữ service worker sống.
  }
});

async function runScrape() {
  await chrome.alarms.create(KEEPALIVE_ALARM, { periodInMinutes: 0.4 });

  try {
    await setState({ status: 'running', step: 'Đang lấy token đăng nhập từ trình duyệt...', progress: null, error: null });

    const token = await getTokenFromBrowser();
    if (!token) {
      await setState({ status: 'error', error: 'Không tìm thấy token. Hãy đăng nhập tại hub.aiforvietnam.org rồi thử lại.' });
      return;
    }

    const me = await getMe(token).catch(() => null);
    if (!me) {
      await setState({ status: 'error', error: 'Token không hợp lệ / đã hết hạn. Hãy tải lại trang hub.aiforvietnam.org (đảm bảo đã đăng nhập) rồi thử lại.' });
      return;
    }

    await setState({ step: `Đăng nhập: ${me.full_name || me.email}. Đang tải danh mục tra cứu...` });
    const taxonomies = await fetchTaxonomies(token);
    const labelMaps = buildLabelMaps(taxonomies);

    await setState({ step: 'Đang cào danh sách đội...' });
    const rawTeams = await fetchAllTeams(token, {
      onProgress: (count, total) => setState({ step: `Đã lấy ${count}/${total} đội...` }),
    });

    const uniqueHandles = [...new Set(rawTeams.flatMap((t) => (t.members || []).map((m) => m.handle)))];
    await setState({ step: `Đang cào hồ sơ ${uniqueHandles.length} thành viên...`, progress: { done: 0, total: uniqueHandles.length } });

    const profilesByHandle = new Map();
    let done = 0;
    for (const handle of uniqueHandles) {
      try {
        const profile = await fetchProfile(token, handle);
        profilesByHandle.set(handle, profile);
      } catch (err) {
        if (err.status === 401) {
          await setState({
            status: 'error',
            error: `Phiên đăng nhập hết hạn giữa chừng (đã cào ${done}/${uniqueHandles.length} thành viên). Hãy tải lại trang hub.aiforvietnam.org rồi thử lại.`,
          });
          return;
        }
        profilesByHandle.set(handle, {});
      }
      done += 1;
      await setState({ progress: { done, total: uniqueHandles.length } });
    }

    const teams = rawTeams.map((rawTeam) => transformTeam(rawTeam, profilesByHandle, labelMaps));
    const snapshot = {
      scrapedAt: new Date().toISOString(),
      scrapedBy: usernameSlug(me),
      totalTeams: teams.length,
      teams,
    };

    const filename = `vaic-scrapes/${nowStamp()}-${usernameSlug(me)}.json`;
    const json = JSON.stringify(snapshot, null, 2);
    const dataUrl = `data:application/json;charset=utf-8,${encodeURIComponent(json)}`;

    await chrome.downloads.download({ url: dataUrl, filename, saveAs: false });

    await setState({
      status: 'done',
      step: `Xong! Đã cào ${teams.length} đội, ${uniqueHandles.length} thành viên.\nFile đã tải về: Downloads/${filename}\n\nHãy copy file này vào thư mục data/scrapes/ của repo rồi commit + mở PR.`,
    });
  } catch (err) {
    await setState({ status: 'error', error: err.message || String(err) });
  } finally {
    chrome.alarms.clear(KEEPALIVE_ALARM);
  }
}

chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
  if (msg.type === 'start-scrape') {
    runScrape();
    sendResponse({ ok: true });
    return false;
  }
  if (msg.type === 'get-state') {
    getState().then(sendResponse);
    return true; // sendResponse bất đồng bộ
  }
  return false;
});
