// シンプルなオフラインキャッシュ
const CACHE_NAME = 'houou-v1';
const ASSETS = [
'./',
'./index.html',
'./manifest.json',
// 画像は必要に応じて追記
// './images/logo-horizontal.png',
// './images/store-hero.jpg',
];


self.addEventListener('install', (e) => {
e.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
});


self.addEventListener('activate', (e) => {
e.waitUntil(caches.keys().then(keys => Promise.all(
keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
)));
});


self.addEventListener('fetch', (e) => {
e.respondWith(
caches.match(e.request).then((res) => res || fetch(e.request))
);
});
