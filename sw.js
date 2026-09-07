// Minimal service worker for Dispatch (Oak Joinery). Its only real job is
// to exist with a fetch handler — Chrome requires an active service worker
// before it will fire the "beforeinstallprompt" event that powers the
// in-app Install button. It deliberately does NOT cache anything: this
// app already has its own online sync/local-storage logic, and adding
// offline caching here would risk serving a stale copy of the app code
// after an update. If real offline support is wanted later, revisit this.
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  // Pass every request straight through to the network, unmodified.
  event.respondWith(fetch(event.request));
});
