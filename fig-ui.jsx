// ===== Figma-aligned brand bits =====
// Drawn from Twoto Figma: Instrument Sans, color rgb(57,62,70), 2px hard shadow,
// rounded 9-20 corners, RGB triad mark.

const FIG = {
  ink: "rgb(57,62,70)",
  border: "rgb(160,174,192)",
  bg: "#ffffff",
  accent: "rgb(24,119,242)",
};

// Original RGB-triad mark — recreated from Figma asset
function FigRgb({ size = 56 }) {
  const r = size * 0.34, cx = size/2, cy = size/2, off = r * 0.62;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden>
      <g style={{ mixBlendMode: "screen" }}>
        <circle cx={cx} cy={cy - off*0.7} r={r} fill="#ef4444"/>
        <circle cx={cx - off} cy={cy + off*0.5} r={r} fill="#22c55e"/>
        <circle cx={cx + off} cy={cy + off*0.5} r={r} fill="#3b82f6"/>
      </g>
    </svg>
  );
}

// Lightbulb — from Figma Frame-7 / Frame-19
function Bulb({ size = 80, lit = true, color = "#ffd517" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" aria-hidden>
      <path d="M40 12c-11 0-20 9-20 20 0 6 3 11 7 14 4 4 3 11 3 11h20s0-7 4-11c4-3 6-8 6-14 0-11-9-20-20-20z"
        fill={lit ? color : "#e5e5e5"}
        stroke={lit ? color : "#c4c4c4"}
        strokeWidth="1"/>
      <rect x="30" y="60" width="20" height="3.5" rx="1.5" fill="#e5e5e5"/>
      <rect x="33" y="66" width="14" height="3.5" rx="1.5" fill="#e5e5e5"/>
      {lit && (
        <g stroke={color} strokeWidth="2" strokeLinecap="round">
          <path d="M40 4v6"/>
          <path d="M64 14l-4 4"/>
          <path d="M76 36h-6"/>
          <path d="M16 14l4 4"/>
          <path d="M4 36h6"/>
        </g>
      )}
    </svg>
  );
}

// Card with Figma's signature 2px hard offset shadow + 1px border
const figCard = {
  background: "#fff",
  border: `1px solid ${FIG.border}`,
  borderRadius: 9,
  boxShadow: `2px 2px 0 0 ${FIG.border}`,
};
const figCardDark = {
  background: FIG.ink,
  color: "#fff",
  border: `1px solid #000`,
  borderRadius: 9,
  boxShadow: `2px 2px 0 0 #000`,
};

// Bottom rounded-pill nav (matches Figma)
function FigNav({ active = "home" }) {
  const items = [
    { id: "home", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/></svg> },
    { id: "rooms", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg> },
    { id: "auto", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L4.5 14h6L9 22l8.5-12h-6L13 2z"/></svg> },
    { id: "presets", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><circle cx="12" cy="12" r="9"/></svg> },
    { id: "settings", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19 12a7 7 0 0 0-.1-1.2l2-1.5-2-3.4-2.3.9A7 7 0 0 0 14.5 5L14 2.5h-4l-.5 2.5a7 7 0 0 0-2.1 1.8l-2.3-.9-2 3.4 2 1.5A7 7 0 0 0 5 12c0 .4 0 .8.1 1.2l-2 1.5 2 3.4 2.3-.9a7 7 0 0 0 2.1 1.8l.5 2.5h4l.5-2.5a7 7 0 0 0 2.1-1.8l2.3.9 2-3.4-2-1.5c.1-.4.1-.8.1-1.2z"/></svg> },
  ];
  return (
    <div style={{
      position: "absolute", left: "50%", bottom: 22, transform: "translateX(-50%)",
      width: 300, height: 50, borderRadius: 25, background: FIG.ink,
      border: "1px solid #000", boxShadow: "2px 2px 0 0 #000",
      display: "flex", alignItems: "center", justifyContent: "space-around", padding: "0 10px"
    }}>
      {items.map(it => (
        <button key={it.id} style={{
          border: 0, width: 40, height: 40, borderRadius: 10,
          background: active === it.id ? "rgba(255,255,255,.12)" : "transparent",
          color: "#fff", cursor: "pointer",
          display: "inline-flex", alignItems: "center", justifyContent: "center"
        }}>{it.icon}</button>
      ))}
    </div>
  );
}

// Sub-tab pill on device pages: Home / Effects / Pallettes / Presets / Extras
function DeviceSubNav({ active }) {
  const items = ["Home","Effects","Pallettes","Presets","Extras"];
  return (
    <div style={{ display: "flex", gap: 6, padding: "0 24px", overflowX: "auto" }}>
      {items.map(t => (
        <span key={t} style={{
          padding: "6px 14px", borderRadius: 999,
          fontFamily: "Instrument Sans, system-ui, sans-serif",
          fontSize: 13, fontWeight: active === t ? 700 : 500,
          color: active === t ? "#fff" : FIG.ink,
          background: active === t ? FIG.ink : "transparent",
          border: `1px solid ${active === t ? FIG.ink : FIG.border}`,
          whiteSpace: "nowrap",
        }}>{t}</span>
      ))}
    </div>
  );
}

// Device page header (logo + name + sub-tabs in nav row)
function DeviceHeader({ subActive, name = "PixC Lyt" }) {
  return (
    <>
      <div style={{ padding: "8px 16px 0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <button style={{ border: 0, background: "transparent", cursor: "pointer", padding: 6 }} aria-label="Back">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={FIG.ink} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <button style={{ border: 0, background: "transparent", cursor: "pointer", padding: 6 }} aria-label="Pin">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={FIG.ink} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22V12M5 9l7-7 7 7-3 3H8L5 9z"/></svg>
        </button>
      </div>
      <div style={{ textAlign: "center", padding: "0 24px" }}>
        <div style={{ display: "inline-flex", justifyContent: "center", marginBottom: 6 }}>
          <FigRgb size={96}/>
        </div>
        <div style={{ fontFamily: "Instrument Sans, system-ui, sans-serif", fontWeight: 700, fontSize: 24, color: "#000", letterSpacing: "-0.005em" }}>{name}</div>
      </div>
      <div style={{ paddingTop: 14, paddingBottom: 8 }}>
        <DeviceSubNav active={subActive}/>
      </div>
    </>
  );
}

Object.assign(window, { FIG, FigRgb, Bulb, figCard, figCardDark, FigNav, DeviceSubNav, DeviceHeader });
