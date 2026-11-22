// Guarda só a "casca" do app (tela, ícones) para ele abrir rápido e ser instalável.
// Os dados da OS sempre vêm da internet (Google), nunca ficam velhos no celular.
const CACHE = 'voltec-gestao-v2';
const CASCA = ['./', 'index.html', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png', '../config.js?v=2'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(CASCA)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  const u = new URL(e.request.url);
  if (e.request.method !== 'GET' || u.origin !== location.origin) return;   // Google: sempre direto da internet
  e.respondWith(fetch(e.request).then(r => { const c = r.clone(); caches.open(CACHE).then(x => x.put(e.request, c)); return r; }).catch(() => caches.match(e.request)));
});
