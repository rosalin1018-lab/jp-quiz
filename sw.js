// sw.js
const CACHE_NAME = 'jp-learning-cache-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './icon.png'
];

// 安裝 Service Worker 並快取檔案
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('快取已開啟');
        return cache.addAll(urlsToCache);
      })
  );
});

// 處理請求：優先從快取抓取，沒網路才抓線上
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response; // 找到快取，直接回傳
        }
        return fetch(event.request); // 沒快取，去網路上抓
      })
  );
});
