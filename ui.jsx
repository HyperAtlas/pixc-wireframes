// ---- Phone shell + reusable bits ----

function Phone({ children, dark, statusbar = true, time = "9:41", ...rest }) {
  return (
    <div className={"phone" + (dark ? " dark" : "")} style={dark ? { background: "#09090b", color: "#fafafa" } : undefined} {...rest}>
      <div className="phone-inner">
        {statusbar && (
          <div className={"statusbar" + (dark ? " dark" : "")}>
            <span>{time}</span>
            <span className="icons">
              {/* signal */}
              <svg className="ic-sm" viewBox="0 0 16 16" fill="currentColor"><rect x="1" y="10" width="2" height="3" rx=".5"/><rect x="5" y="7" width="2" height="6" rx=".5"/><rect x="9" y="4" width="2" height="9" rx=".5"/><rect x="13" y="1" width="2" height="12" rx=".5"/></svg>
              {/* wifi */}
              <svg className="ic-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5a10 10 0 0 1 14 0"/><path d="M8.5 16a5 5 0 0 1 7 0"/><circle cx="12" cy="19.5" r=".8" fill="currentColor"/></svg>
              {/* battery */}
              <svg width="24" height="12" viewBox="0 0 24 12" fill="none"><rect x="0.5" y="0.5" width="20" height="11" rx="2.5" stroke="currentColor"/><rect x="2" y="2" width="17" height="8" rx="1.2" fill="currentColor"/><rect x="21" y="4" width="2" height="4" rx="1" fill="currentColor"/></svg>
            </span>
          </div>
        )}
        {children}
        <div className="home-indicator" />
      </div>
    </div>
  );
}

// Header bar (back button + title) — transparent by default so the phone's
// dotted matrix backdrop shows through. Pass `solid` if you need it opaque.
function Header({ title, onBack, right, transparent, solid }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 12,
      padding: "8px 16px 12px",
      background: solid ? "var(--background)" : "transparent",
      flex: "0 0 auto"
    }}>
      {onBack !== false && (
        <button className="btn btn-ghost btn-icon-sm" aria-label="Back">
          <svg className="ic-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
      )}
      <div style={{ flex: 1, fontWeight: 600, fontSize: 16, letterSpacing: "-0.005em" }}>{title}</div>
      {right}
    </div>
  );
}

// Bottom tab bar (used on home/device screens)
function TabBar({ active = "home" }) {
  const items = [
    { id: "home", icon: <svg className="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/></svg> },
    { id: "rooms", icon: <svg className="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg> },
    { id: "auto", icon: <svg className="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L4.5 14h6L9 22l8.5-12h-6L13 2z"/></svg> },
    { id: "stats", icon: <svg className="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="M7 14l4-4 3 3 5-6"/></svg> },
    { id: "settings", icon: <svg className="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09c0 .66.39 1.26 1 1.51a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9c.25.61.85 1 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg> },
  ];
  return (
    <div className="tabbar">
      {items.map(it => (
        <button key={it.id} className={active === it.id ? "active" : ""}>{it.icon}</button>
      ))}
    </div>
  );
}

// Twoto wordmark icon
function TwotoMark({ size = "md" }) {
  const dim = size === "lg" ? 80 : 56;
  const r = size === "lg" ? 20 : 14;
  return (
    <span className={"twoto-mark" + (size === "lg" ? " lg" : "")} style={{ width: dim, height: dim, borderRadius: r }}>
      <svg width={size === "lg" ? 40 : 28} height={size === "lg" ? 40 : 28} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3v3"/>
        <path d="M5 11a7 7 0 0 1 14 0v3a4 4 0 0 1-2 3.5V20a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-2.5A4 4 0 0 1 9 14"/>
        <path d="M9 11h6"/>
      </svg>
    </span>
  );
}

// Bulb logo — large, photoreal-feeling SVG mark for device hero cards.
// Designed to overflow above its container (negative margin).
function BulbMark({ size = 140, glow = "#ea580c", on = true }) {
  const w = size, h = size * 1.18;
  return (
    <svg width={w} height={h} viewBox="0 0 140 165" style={{ display: "block", overflow: "visible" }}>
      <defs>
        <radialGradient id="bulbGlass" cx="50%" cy="42%" r="55%">
          <stop offset="0%" stopColor="#fff7ed" stopOpacity={on ? 1 : 0.55}/>
          <stop offset="55%" stopColor={on ? glow : "#e4e4e7"} stopOpacity={on ? 0.95 : 0.5}/>
          <stop offset="100%" stopColor={on ? "#9a3412" : "#a1a1aa"} stopOpacity="0.92"/>
        </radialGradient>
        <linearGradient id="bulbBase" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#52525b"/>
          <stop offset="55%" stopColor="#27272a"/>
          <stop offset="100%" stopColor="#0a0a0a"/>
        </linearGradient>
        <radialGradient id="bulbHL" cx="35%" cy="32%" r="22%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85"/>
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0"/>
        </radialGradient>
        <filter id="bulbGlow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="14"/>
        </filter>
      </defs>
      {on && (
        <ellipse cx="70" cy="62" rx="78" ry="78" fill={glow} opacity="0.32" filter="url(#bulbGlow)"/>
      )}
      {/* Bulb body */}
      <path d="M70 8 C 38 8 22 32 22 56 c 0 18 8 30 16 40 c 5 6 8 12 9 18 h 46 c 1 -6 4 -12 9 -18 c 8 -10 16 -22 16 -40 C 118 32 102 8 70 8 z"
        fill="url(#bulbGlass)" stroke="#27272a" strokeWidth="1.2"/>
      {/* Filament */}
      <path d="M58 60 q 6 -12 12 0 q 6 12 12 0" fill="none" stroke={on ? "#fffbeb" : "#a1a1aa"} strokeWidth="1.6" strokeLinecap="round" opacity={on ? 0.9 : 0.55}/>
      <path d="M70 48 v 14" stroke={on ? "#fffbeb" : "#a1a1aa"} strokeWidth="1.4" strokeLinecap="round" opacity={on ? 0.85 : 0.5}/>
      {/* Specular highlight */}
      <ellipse cx="50" cy="40" rx="18" ry="22" fill="url(#bulbHL)"/>
      {/* Screw base */}
      <path d="M47 116 h 46 v 8 h -46 z" fill="url(#bulbBase)"/>
      <path d="M50 124 h 40 v 4 h -40 z M51 130 h 38 v 4 h -38 z M52 136 h 36 v 4 h -36 z" fill="#3f3f46"/>
      <path d="M58 142 q 12 14 24 0 v 10 q -12 12 -24 0 z" fill="#18181b"/>
      <ellipse cx="70" cy="155" rx="10" ry="3" fill="#0a0a0a"/>
    </svg>
  );
}

// RGB color triad mark — the original brand artwork, simplified
function RgbMark({ size = 56 }) {
  const r = size * 0.32;
  const cx = size / 2, cy = size / 2;
  const off = r * 0.55;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <defs>
        <filter id="rgbBlend" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="0.2"/>
        </filter>
      </defs>
      <g style={{ mixBlendMode: "screen" }}>
        <circle cx={cx} cy={cy - off * 0.7} r={r} fill="#ef4444" />
        <circle cx={cx - off} cy={cy + off * 0.5} r={r} fill="#22c55e" />
        <circle cx={cx + off} cy={cy + off * 0.5} r={r} fill="#3b82f6" />
      </g>
      <circle cx={cx} cy={cy} r={r * 0.5} fill="none" stroke="#09090b" strokeWidth="1" strokeDasharray="2 2"/>
    </svg>
  );
}

Object.assign(window, { Phone, Header, TabBar, TwotoMark, RgbMark, BulbMark });
