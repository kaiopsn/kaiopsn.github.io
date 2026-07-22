// FinanceApp — Service Worker (offline-first, caminhos relativos)
// IMPORTANTE: a cada atualização, troque o número de VERSION abaixo.
// Isso faz o app detectar a nova versão e mostrar "Atualização disponível".
const VERSION = 'v51';
const CACHE = 'financeapp-' + VERSION;
const PRECACHE = [
  './',
  'index.html',
  'manifest.json',
  'chart.min.js',
  'fonts.css',
  'fonts/inter.woff2',
  'fonts/fraunces.woff2',
  'fonts/fraunces-italic.woff2',
  'icon-192.png',
  'icon-512.png',
  'icon-512-maskable.png'
];

self.addEventListener('install', e => {
  // NÃO chama skipWaiting aqui: a nova versão fica "esperando" até o usuário
  // tocar em "Atualizar" (a página manda a mensagem SKIP_WAITING).
  e.waitUntil(
    caches.open(CACHE)
      .then(c => Promise.allSettled(PRECACHE.map(u => c.add(u).catch(() => null))))
  );
});

// A página pede para ativar a nova versão imediatamente
self.addEventListener('message', e => {
  if (e.data && e.data.type === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET' || !e.request.url.startsWith('http')) return;

  // Assets estáticos (js/css/fontes/imagens): cache-first
  if (/\.(woff2?|js|css|png|svg|jpg|jpeg|webp|ico)$/i.test(new URL(e.request.url).pathname)) {
    e.respondWith(
      caches.match(e.request).then(c => c || fetch(e.request).then(r => {
        const copy = r.clone();
        caches.open(CACHE).then(cache => cache.put(e.request, copy));
        return r;
      }).catch(() => c))
    );
    return;
  }

  // Navegação / app: network-first, cache como fallback offline
  e.respondWith(
    fetch(e.request)
      .then(r => { const copy = r.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); return r; })
      .catch(() => caches.match(e.request).then(c => c || caches.match('index.html')))
  );
});
