cacheName = "descentStaticCache_v2"

self.addEventListener('install', function(e) {
	e.waitUntil(
	  caches.open(cacheName).then(function(cache) {
		return cache.addAll([
			
			
			"/descent-quest-builder/index_web.html",
			"/descent-quest-builder/css/bootstrap/bootstrap.css",
			"/descent-quest-builder/css/general.css",
			"/descent-quest-builder/css/scrollbar.css",
			"/descent-quest-builder/css/jquery/jquery-ui.css",
			
			"/descent-quest-builder/css/dices.css",
			"/descent-quest-builder/css/multiplayer_things.css",
			"/descent-quest-builder/js/dices.js",
			"/descent-quest-builder/js/multiplayer.js",
		
			
			"/descent-quest-builder/js/otherBase64Assets.js",
			"/descent-quest-builder/js/draggable.js",
			"/descent-quest-builder/js/PDF_logic.js",
			"/descent-quest-builder/js/save_project_logic.js",
			"/descent-quest-builder/js/text_script.js",
			"/descent-quest-builder/js/loadTiles.js",
			"/descent-quest-builder/js/bootstrap_page.js",
			"/descent-quest-builder/js/searchItems.js",
			"/descent-quest-builder/js/scaleUi.js",
		
			"/descent-quest-builder/base64Tiles/lieutenants.js",
			"/descent-quest-builder/base64Tiles/baseSetOutside.js",
			"/descent-quest-builder/base64Tiles/baseSetInside.js",
			"/descent-quest-builder/base64Tiles/labyrinth_of_ruin.js",
			"/descent-quest-builder/base64Tiles/lair_of_the_wyrm.js",
			"/descent-quest-builder/base64Tiles/monsters.js",
			"/descent-quest-builder/base64Tiles/shadows_of_nerekhall.js",
			"/descent-quest-builder/base64Tiles/tokens.js",
			"/descent-quest-builder/base64Tiles/trollfens.js",
			"/descent-quest-builder/base64Tiles/miscellaneous.js",
			"/descent-quest-builder/base64Tiles/heroes.js",
		
			"/descent-quest-builder/js/tilesGenerator.js",
			"/descent-quest-builder/js/jquery/jquery-3.4.1.min.js",
			"/descent-quest-builder/js/jquery/jquery-ui.js",
			"/descent-quest-builder/js/bootstrap/bootstrap.js",
			"/descent-quest-builder/js/html2canvas/html2canvas.js",
			"/descent-quest-builder/js/html2canvas/jspdf.debug.js",
			"/descent-quest-builder/js/fileSaver/FileSaver.js",
			"/descent-quest-builder/assets/background_050.jpg",
			"/descent-quest-builder/assets/background_025.jpg",
			"/descent-quest-builder/assets/background_033.jpg",
			"/descent-quest-builder/assets/background_075.jpg",
			"/descent-quest-builder/assets/background.jpg",
			"/descent-quest-builder/assets/trasnparent.png"
		]);
	  })
	);
});

self.addEventListener('activate', e => {
	self.clients.claim();
});

self.addEventListener('fetch', async e => {
	const req = e.request;
	const url = new URL(req.url);

	if (url.origin === location.origin) {
		e.respondWith(cacheFirst(req));
	} else {
		e.respondWith(networkAndCache(req));
	}
});

async function cacheFirst(req) {
	const cache = await caches.open(cacheName);
	const cached = await cache.match(req);
	return cached || fetch(req);
}

async function networkAndCache(req) {
	const cache = await caches.open(cacheName);
	try {
		const fresh = await fetch(req);
		await cache.put(req, fresh.clone());
		return fresh;
	} catch (e) {
		const cached = await cache.match(req);
		return cached;
	}
}