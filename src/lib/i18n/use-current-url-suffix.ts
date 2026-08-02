'use client';

import { useSyncExternalStore } from 'react';

type UrlSuffix = {
  search: string;
  hash: string;
};

const urlChangeEvent = 'batumi-lighthouse:urlchange';
let subscriberCount = 0;
let originalPushState: History['pushState'] | undefined;
let originalReplaceState: History['replaceState'] | undefined;

function patchHistory() {
  if (subscriberCount > 0) return;

  originalPushState = window.history.pushState;
  originalReplaceState = window.history.replaceState;

  window.history.pushState = function pushState(...args) {
    originalPushState?.apply(this, args);
    window.dispatchEvent(new Event(urlChangeEvent));
  };

  window.history.replaceState = function replaceState(...args) {
    originalReplaceState?.apply(this, args);
    window.dispatchEvent(new Event(urlChangeEvent));
  };
}

function restoreHistory() {
  if (subscriberCount > 0) return;

  if (originalPushState) window.history.pushState = originalPushState;
  if (originalReplaceState) window.history.replaceState = originalReplaceState;
  originalPushState = undefined;
  originalReplaceState = undefined;
}

function subscribe(onStoreChange: () => void) {
  patchHistory();
  subscriberCount += 1;

  window.addEventListener(urlChangeEvent, onStoreChange);
  window.addEventListener('popstate', onStoreChange);
  window.addEventListener('hashchange', onStoreChange);

  return () => {
    window.removeEventListener(urlChangeEvent, onStoreChange);
    window.removeEventListener('popstate', onStoreChange);
    window.removeEventListener('hashchange', onStoreChange);
    subscriberCount -= 1;
    restoreHistory();
  };
}

function getBrowserHref() {
  return window.location.href;
}

function getServerHref() {
  return '';
}

export function useCurrentUrlSuffix(): UrlSuffix {
  const href = useSyncExternalStore(subscribe, getBrowserHref, getServerHref);

  if (!href) return { search: '', hash: '' };

  const url = new URL(href);

  return { search: url.search, hash: url.hash };
}
