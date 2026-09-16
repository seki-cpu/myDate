# myDate PWA installation

myDate V1 supports installability through the browser using the native Web App Manifest and platform metadata.

This implementation intentionally does **not** add a service worker, offline caching, an install banner, or a custom download button.

## iPhone / iPad

1. Open myDate in Safari.
2. Tap the Share button.
3. Choose **Add to Home Screen**.
4. Confirm the name `myDate` and add it.

The installed app uses the Apple touch icon and opens without normal browser chrome where supported.

## Android Chrome

1. Open myDate in Chrome.
2. Open the browser menu.
3. Choose **Install app** or **Add to Home screen** when offered.
4. Confirm the installation.

The installed app uses the Web App Manifest and opens with `display: standalone`.

## Windows Chrome / Edge

1. Open myDate in Chrome or Edge.
2. Use the browser install action in the address bar or browser menu.
3. Confirm installation.

The installed app opens in its own standalone app window where supported.

## macOS

Browser support differs by browser and macOS version.

- Safari: use **File > Add to Dock** when available.
- Chrome or other Chromium browsers: use the browser's install action when available.

## PWA metadata

The app manifest is served by Next.js from `src/app/manifest.ts` and declares:

- `id: "/"`
- `name: "myDate"`
- `short_name: "myDate"`
- `start_url: "/"`
- `scope: "/"`
- `display: "standalone"`
- `background_color: "#fffdf9"`
- `theme_color: "#fffdf9"`

Application icons are stored in `public/icons/`, with Apple touch icon and favicon supplied through Next.js file-based metadata in `src/app/`.

## Explicit non-goals for V1

The installability implementation does not include:

- service workers
- Workbox, Serwist, `next-pwa`, or another PWA library
- offline caches or offline mutation queues
- custom install prompts, banners, or download buttons
- navigation rewrites
- caching of private Auth, Memory, Photo, Supabase, or storage responses

Normal myDate navigation and existing application behavior remain unchanged.
