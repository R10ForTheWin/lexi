/* Lexi's service worker has two jobs that pull against each other:
   open with no signal, and never leave anyone on an old deck.

   So the app itself is network-first. Every open with a connection gets
   whatever was last pushed, and the copy it fetched becomes the offline
   fallback. A slow connection gets four seconds before the saved copy
   is shown instead - and the fresh one still lands in the cache for
   next time.

   The libraries and fonts sit at versioned URLs that never change, so
   those come straight from the cache once they are in it.

   Progress is never in here. It lives in localStorage, which this file
   does not touch - clearing this cache costs nothing but a download. */
const CACHE='lexi-shell-v1';
const SHELL=['./','lexi.html','manifest.webmanifest','icon-180.png','icon-192.png','icon-512.png'];
const LIBS=[
  'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/Draggable.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js',
  'https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Archivo:wght@300;400;500&family=IBM+Plex+Mono:wght@400;500&display=swap'
];

self.addEventListener('install',ev=>{
  /* One at a time and forgiving: a CDN hiccup on install must not stop
     the app from installing - that file is simply fetched on first use. */
  ev.waitUntil(caches.open(CACHE).then(c=>Promise.all(
    SHELL.concat(LIBS).map(u=>c.add(u).catch(()=>{}))
  )).then(()=>self.skipWaiting()));
});

self.addEventListener('activate',ev=>{
  ev.waitUntil(caches.keys()
    .then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k))))
    .then(()=>self.clients.claim()));
});

const keep=(req,res)=>{
  if(res && (res.ok || res.type==='opaque')){
    const copy=res.clone();
    caches.open(CACHE).then(c=>c.put(req,copy));
  }
  return res;
};

function fresh(ev){
  const req=ev.request;
  const net=fetch(req).then(res=>keep(req,res));
  ev.waitUntil(net.catch(()=>{}));
  const saved=()=>caches.match(req,{ignoreSearch:true})
    .then(r=>r||(req.mode==='navigate'?caches.match('lexi.html'):undefined));
  const slow=new Promise(ok=>setTimeout(ok,4000)).then(saved);
  return Promise.race([
    net.catch(saved),
    slow.then(r=>r||net)
  ]).then(r=>r||net);
}

function stored(req){
  return caches.match(req).then(hit=>hit||fetch(req).then(res=>keep(req,res)));
}

self.addEventListener('fetch',ev=>{
  const req=ev.request;
  if(req.method!=='GET') return;
  const url=new URL(req.url);
  if(url.origin===location.origin) ev.respondWith(fresh(ev));
  else if(/(^|\.)(cdnjs\.cloudflare\.com|fonts\.googleapis\.com|fonts\.gstatic\.com)$/.test(url.hostname))
    ev.respondWith(stored(req));
});
