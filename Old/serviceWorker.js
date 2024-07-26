const staticSenior = "senior-v1";
const assets = [
  // "/",
  // "/index.html",
  // "/css/style.css",
  // "/css/animate.css",
  // "/css/bootstrap.css",
  // "/css/custom-animate.css",
  // "/css/font-awesome.css",
  // "/css/jquery-ui.css",
  // "/css/jquery.fancybox.min.css",
  // "/css/owl.css",
  // "/css/responsive.css",
  // "/css/custom.css",
  // "/css/simple-line-icons.css",
  // "/css/images/ui-icons_444444_256x240.png",
  // "/css/images/ui-icons_555555_256x240.png",
  // "/js/appear.js",
  // "/js/bootstrap.min.js",
  // "/js/bxslider.js",
  // "/js/countdown.js",
  // "/js/custom-script.js",
  // "/js/jquery-ui.js",
  // "/js/jquery.fancybox.js",
  // "/js/jquery.js",
  // "/js/owl.js",
  // "/js/PageScroll.js",
  // "/js/popper.min.js",
  // "/js/theme.js",
  // "/js/wow.js",
  // "/images/logo.svg",
  // "/images/favicon.png",
  // "/images/icons/icon-128x128.png",
  // "/images/icons/icon-144x144.png",
  // "/images/icons/icon-152x152.png",
  // "/images/icons/icon-192x192.png",
  // "/images/icons/icon-384x384.png",
  // "/images/icons/icon-512x512.png",
  // "/images/icons/icon-72x72.png",
  // "/images/icons/icon-96x96.png",
];

self.addEventListener("install", (installEvent) => {
  installEvent.waitUntil(
    caches.open(staticSenior).then((cache) => {
      cache.addAll(assets);
    })
  );
});

self.addEventListener("fetch", (fetchEvent) => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then((res) => {
      return res || fetch(fetchEvent.request);
    })
  );
});
