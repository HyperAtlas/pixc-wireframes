# PixC — Smart home wireframes

Design wireframes for the PixC smart-home app. ~85 screens across onboarding, auth, app-lock, device control, LightSync (TV / wireless / audio), automations, and more.

## Live site

Hosted via GitHub Pages at the URL configured in this repo's settings (Settings → Pages → main branch).

- `index.html` — landing page with links to the two viewers
- `m.html` — mobile viewer (full-screen, swipe between screens, theme + accent picker)
- `PixC.html` — desktop canvas (all artboards visible side-by-side)

## Local preview

```sh
python3 -m http.server 8000
# then open http://localhost:8000/
# or from another device on the same Wi-Fi: http://<your-mac-ip>:8000/m.html
```

## Stack

- React 18 (loaded via CDN)
- In-browser Babel for JSX
- Plain CSS with custom properties (light + dark themes)
- Font Awesome 6 for some icons; Geist + Geist Mono for typography
- No build step — every screen is a function in a `screens-*.jsx` file, registered on `window` and referenced from the canvas (`app.jsx`) and the mobile index (`m.html`)

## File map

| File | Contents |
|---|---|
| `index.html` | Landing page |
| `PixC.html` | Desktop design canvas |
| `m.html` | Mobile viewer + screen index |
| `ui.jsx` | Phone shell, header, tab bar, RGB mark, bulb mark |
| `app.jsx` | Canvas registration + tweaks panel |
| `design-canvas.jsx` | DesignCanvas / DCSection / DCArtboard primitives |
| `tweaks-panel.jsx` | Tweaks panel + hooks |
| `screens-onboarding.jsx` | Splash, walkthrough, sign-in, OTP, profile setup |
| `screens-home.jsx` | Home, rooms, device cards |
| `screens-add-device.jsx` | Pairing flow (scanning → Wi-Fi → success) |
| `screens-device.jsx` | Device control: color / effects / palettes / LightSync / segments / etc. |
| `screens-system.jsx` | Settings, profile, sharing, energy, notifications |
| `screens-extra.jsx` | Help, search, switch home, profile detail |
| `screens-extra2.jsx` | Add-device-to-room, presets, automations, segments, palettes |
| `screens-new.jsx` | Welcome screens, AI screens, empty states, splash hero |
| `screens-prod.jsx` | Production-fill: permissions, troubleshoot, OTA, sign-out, delete account, app-lock setup, reset, failure states |

## License

Internal — HyperAtlas.
