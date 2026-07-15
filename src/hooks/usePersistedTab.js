import { useState } from 'react';

/** Sub-tab state that survives F5 by mirroring the active id into localStorage. */
export function usePersistedTab(storageKey, defaultId, validIds) {
  const [tab, setTabState] = useState(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      return validIds.includes(saved) ? saved : defaultId;
    } catch {
      return defaultId;
    }
  });

  const setTab = (id) => {
    setTabState(id);
    try {
      localStorage.setItem(storageKey, id);
    } catch {
      // localStorage indisponible (private mode, quota...) — bỏ qua, chỉ mất tính năng ghi nhớ.
    }
  };

  return [tab, setTab];
}
