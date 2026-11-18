/* Network-first main document; no personal data or third-party map tiles cached. */
const CACHE='jm-web-v1';
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(c=>c.addAll(['/','/manifest.webmanifest','/favicon-jm.svg','/jm-192-v2.png','/jm-512-v2.png','/jm-apple-v2.png'])))});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('jm-web-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',event=>{const r=event.request;const url=new URL(r.url);if(r.method!=='GET'||url.origin!==self.location.origin)return;
 if(r.mode==='navigate'){event.respondWith(fetch(r).then(response=>{if(response.ok){const copy=response.clone();caches.open(CACHE).then(c=>c.put('/',copy));}return response}).catch(()=>caches.match('/')));return;}
 if(['/manifest.webmanifest','/favicon-jm.svg','/jm-192-v2.png','/jm-512-v2.png','/jm-apple-v2.png'].includes(url.pathname)){event.respondWith(fetch(r).catch(()=>caches.match(r)))}
});
