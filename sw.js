const cachName = "gomartv1"
const assets = [
    "/",
    "/index.html",
    "/bootstrap.min.css",
    "/css/style.css",
    "/css/animate.css",
    "/css/owl.carousel.css",
    "/css/all.css",

]


self.addEventListener("install", (installEvent) => {
    installEvent.waituntil(

        caches.open(cachName).then((cache) => {
            cache.addAll(assets).then().catch()
        })
            .catch((error) => { })
    )
})

self.addEventListener("activate", (activeteEvent) => {
    activeteEvent.waituntil(

        caches.keys().then((keys) => {
            console.log(keys);
            return Promise.all(
                keys.filter((key) => key != (cachName))
                    .map((key) => caches.delete(key))
            )
        })
    )
})


self.addEventListener("fetch", (fetchEvent) => {

    fetchEvent.respondWith(
        caches.match(fetchEvent.request).then((res) => {
            return res || fetch(fetchEvent.request).then((fetchres) => {
                return caches.open(cacheName).then((cache) => {
                    cache.put(fetchEvent.request, fetchres.clone())
                    return fetchres
                })
            })
        })
    )
})