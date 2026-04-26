// ===== Device control screens — Figma Frame 17 layout, device-scoped pill nav =====

const { RgbMark } = window;

// Reusable: top sub-tabs
function PillTabs({ active = "Color", items = ["Color", "Effects", "Palettes", "Extras"] }) {
  return (
    <div style={{ display: "flex", gap: 6, padding: "0 16px", overflowX: "auto", scrollbarWidth: "none" }}>
      {items.map(t => (
        <span key={t} style={{
          flex: "0 0 auto",
          padding: "7px 14px", borderRadius: 999,
          fontSize: 13, fontWeight: active === t ? 600 : 500,
          color: active === t ? "var(--primary-foreground)" : "var(--foreground)",
          background: active === t ? "var(--primary)" : "transparent",
          border: `1px solid ${active === t ? "var(--primary)" : "var(--border)"}`,
          whiteSpace: "nowrap", cursor: "pointer",
        }}>{t}</span>
      ))}
    </div>
  );
}

// Device icon — bold RGB Venn-triad mark.
// 3 outlined base circles (R top, G left, B right). Pairwise overlaps painted
// in their additive mix (yellow, cyan, magenta), triple overlap is white with
// a dashed accent ring. Looks like the product mark in the spec.
function DeviceIcon({ size = 84 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" style={{ display: "block" }}>
      {/* Base circles — fills */}
      <circle cx="50" cy="32" r="26" fill="#ef4444"/>
      <circle cx="33" cy="62" r="26" fill="#22c55e"/>
      <circle cx="67" cy="62" r="26" fill="#3b82f6"/>
      {/* Pairwise overlaps (approximated as small lens-circles) */}
      <circle cx="41.5" cy="48" r="11.5" fill="#facc15"/>{/* R + G → yellow */}
      <circle cx="58.5" cy="48" r="11.5" fill="#ec4899"/>{/* R + B → magenta */}
      <circle cx="50"   cy="62" r="11.5" fill="#22d3ee"/>{/* G + B → cyan */}
      {/* Triple overlap → white core */}
      <circle cx="50" cy="54" r="6.5" fill="#fafafa"/>
      {/* Bold black outlines on the 3 base circles */}
      <circle cx="50" cy="32" r="26" fill="none" stroke="#0a0a0a" strokeWidth="2.4"/>
      <circle cx="33" cy="62" r="26" fill="none" stroke="#0a0a0a" strokeWidth="2.4"/>
      <circle cx="67" cy="62" r="26" fill="none" stroke="#0a0a0a" strokeWidth="2.4"/>
      {/* Dashed center accent */}
      <circle cx="50" cy="54" r="6.5" fill="none" stroke="#0a0a0a" strokeWidth="1.6" strokeDasharray="2.4 2"/>
    </svg>
  );
}

// === The signature device header — bulb mark overflows upward, name center, status under ===
function DeviceTopBar({ name = "PixC Lyt", room = "Living room", section = null, online = true, hideMark = false, title = null, showStatus = false, controllers = null, group = null }) {
  // group: { kind: "cluster" | "fusion", name: "Living room" } — adds a status pill
  // controllers: array of { name, color } — others in the home currently controlling this device
  return (
    <>
      {/* Top row: back arrow (L) + active controllers (R) */}
      <div style={{ padding: "8px 16px 0", display: "flex", alignItems: "center", justifyContent: "space-between", flex: "0 0 auto", position: "relative", zIndex: 2 }}>
        <button className="btn btn-ghost btn-icon-sm" aria-label="Back">
          <svg className="ic-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <span/>
        {controllers && controllers.length > 0 ? (
          <button aria-label="People controlling now" style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            padding: "4px 8px 4px 5px", borderRadius: 999,
            background: "var(--muted)", border: "1px solid var(--border)",
            cursor: "pointer", color: "var(--foreground)",
          }}>
            <span style={{ display: "inline-flex" }}>
              {controllers.slice(0, 3).map((p, i) => (
                <span key={i} style={{
                  width: 20, height: 20, borderRadius: 999,
                  background: p.color,
                  color: "#fff", fontSize: 10, fontWeight: 700,
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                  border: "1.5px solid var(--background)",
                  marginLeft: i === 0 ? 0 : -7, position: "relative", zIndex: 3 - i,
                }}>{p.name[0]}</span>
              ))}
            </span>
            <span style={{ fontSize: 11, fontWeight: 600 }}>{controllers.length}</span>
            <span style={{ width: 6, height: 6, borderRadius: 999, background: "var(--success)", boxShadow: "0 0 0 2px rgba(22,163,74,.18)" }}/>
          </button>
        ) : (
          <span style={{ width: 28 }}/>
        )}
      </div>

      {!hideMark && (
        <div style={{ padding: "0 24px 0", textAlign: "center", position: "relative" }}>
          {/* Bulb icon overflows up — pulled into the safe-area / status bar zone */}
          <div style={{
            display: "flex", justifyContent: "center",
            marginTop: -28, marginBottom: 4,
            position: "relative", zIndex: 1,
          }}>
            <DeviceIcon/>
          </div>
          <div style={{ fontSize: 22, fontWeight: 600, letterSpacing: "-0.01em" }}>{name}</div>
          {/* Section label (Effect/Palette/etc) OR room name chip below title */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, marginTop: 4, flexWrap: "wrap", justifyContent: "center" }}>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: 5,
              padding: "3px 9px", borderRadius: 999,
              border: "1px solid var(--border)",
              fontSize: 11, fontWeight: 500, color: "var(--muted-foreground)",
            }}>
              {section ? (
                <>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 11, height: 11 }}><circle cx="12" cy="12" r="3"/><circle cx="12" cy="12" r="9"/></svg>
                  {section}
                </>
              ) : (
                <>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 11, height: 11 }}><path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/></svg>
                  {room}
                </>
              )}
            </span>
            {showStatus && (
              <span style={{
                display: "inline-flex", alignItems: "center", gap: 5,
                padding: "3px 9px", borderRadius: 999, fontSize: 11, fontWeight: 500,
                background: online ? "rgba(22,163,74,.10)" : "rgba(220,38,38,.08)",
                color: online ? "var(--success)" : "var(--destructive)",
                border: `1px solid ${online ? "rgba(22,163,74,.25)" : "rgba(220,38,38,.25)"}`,
              }}>
                <span style={{ width: 6, height: 6, borderRadius: 999, background: online ? "var(--success)" : "var(--destructive)" }}/>
                {online ? "Online" : "Offline · Local"}
              </span>
            )}
            {group && (
              <span style={{
                display: "inline-flex", alignItems: "center", gap: 5,
                padding: "3px 9px", borderRadius: 999, fontSize: 11, fontWeight: 600,
                background: "var(--primary-soft)",
                color: "var(--primary)",
                border: "1px solid color-mix(in srgb, var(--primary) 35%, transparent)",
              }}>
                {group.primary
                  ? <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.5 6 6.5.5-5 4.5 1.5 6.5L12 16l-5.5 3.5L8 13 3 8.5l6.5-.5z"/></svg>
                  : <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      {group.kind === "cluster"
                        ? <><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></>
                        : <><path d="M5 5h6v6H5zM13 13h6v6h-6zM5 13l6 6M19 5l-6 6"/></>
                      }
                    </svg>
                }
                {group.primary
                  ? `Primary · ${group.kind === "cluster" ? "PixCluster" : "PixFusion"}`
                  : group.kind === "cluster" ? "PixCluster" : "PixFusion"}
              </span>
            )}
          </div>
        </div>
      )}
      {hideMark && title && (
        <div style={{ padding: "8px 24px 0", textAlign: "center" }}>
          <div style={{ fontSize: 22, fontWeight: 600, letterSpacing: "-0.01em" }}>{title}</div>
        </div>
      )}
    </>
  );
}

// SVG color wheel
function ColorWheel({ size = 220, pickAt = { x: 0.74, y: 0.32 } }) {
  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <div style={{
        position: "absolute", inset: 0, borderRadius: "50%",
        background: `radial-gradient(circle, var(--background) 0%, transparent 35%),
          conic-gradient(from 0deg,
            hsl(0 100% 50%), hsl(60 100% 50%), hsl(120 100% 50%),
            hsl(180 100% 50%), hsl(240 100% 50%), hsl(300 100% 50%), hsl(360 100% 50%))`,
        boxShadow: "0 0 0 1px var(--border), 0 6px 18px -6px rgba(0,0,0,.18)",
      }}/>
      <span style={{
        position: "absolute",
        left: `calc(${pickAt.x * 100}% - 11px)`,
        top: `calc(${pickAt.y * 100}% - 11px)`,
        width: 22, height: 22, borderRadius: "50%",
        background: "transparent",
        border: "3px solid white",
        boxShadow: "0 0 0 1.5px rgba(0,0,0,.55), 0 2px 6px rgba(0,0,0,.25)",
      }}/>
    </div>
  );
}

// Slider w/ left icon
function LabeledSlider({ icon, value = 70 }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 10,
      padding: "6px 14px", borderRadius: 999,
      border: "1px solid var(--border)", background: "var(--background)",
    }}>
      <span style={{ width: 22, display: "inline-flex", color: "var(--foreground)" }}>{icon}</span>
      <input type="range" className="range" defaultValue={value} style={{ flex: 1 }}/>
    </div>
  );
}

// 2x2 status grid — quick-jumps to the four sub-modes (Effect / Music / Palette / Segment)
function StatusGrid({ effect = "Solid", music = false, palette = "Breeze", segment = "SEG1" }) {
  const cells = [
    {
      kicker: "Effect", value: effect,
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L4.5 14h6L9 22l8.5-12h-6L13 2z"/></svg>,
    },
    {
      kicker: "Music", value: music ? "On" : "Off", muted: !music,
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>,
    },
    {
      kicker: "Palette", value: palette,
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round"><path d="M19 11l-7 8-7-8a4 4 0 0 1 6-5l1 1 1-1a4 4 0 0 1 6 5z"/></svg>,
    },
    {
      kicker: "Segment", value: segment,
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 0 1 18 0"/><path d="M3 12h2M19 12h2M12 5V3"/></svg>,
    },
  ];
  return (
    <div className="card" style={{ padding: 0, overflow: "hidden" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
        {cells.map((c, i) => {
          const colSep = i % 2 === 0;
          const rowSep = i < 2;
          return (
            <button key={c.kicker} style={{
              display: "flex", alignItems: "center", gap: 12,
              padding: "14px 16px", border: 0, background: "transparent",
              borderRight: colSep ? "1px solid var(--border)" : 0,
              borderBottom: rowSep ? "1px solid var(--border)" : 0,
              cursor: "pointer",
              color: "var(--foreground)",
              fontFamily: "inherit",
              textAlign: "left",
            }}>
              <span style={{ display: "inline-flex", color: c.muted ? "var(--muted-foreground)" : "var(--primary)", flexShrink: 0 }}>{c.icon}</span>
              <span style={{ display: "flex", flexDirection: "column", lineHeight: 1.15, minWidth: 0 }}>
                <span style={{ fontSize: 9.5, fontWeight: 600, letterSpacing: ".08em", color: "var(--muted-foreground)", textTransform: "uppercase" }}>{c.kicker}</span>
                <span style={{ fontSize: 15, fontWeight: 600, marginTop: 2, color: c.muted ? "var(--muted-foreground)" : "var(--foreground)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{c.value}</span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// === Main device control (Figma Frame 17) ===
function ScreenDeviceColor({ online = true, lightSyncOn = false, locked = false, peek = true, inCluster = false, inFusion = false, isPrimaryOf = null, cloudUnreachable = false }) {
  const peekItem = STANDARD_EFFECTS[1]; // Breeze — represents what's running
  const controllers = locked ? null : [
    { name: "Aria", color: "#ec4899" },
    { name: "Sam",  color: "#3b82f6" },
  ];
  // Status pill in the topbar reflects cluster/fusion membership OR
  // shows a Primary indicator when this device drives a group.
  const group = isPrimaryOf === "cluster" ? { kind: "cluster", name: "Living room", primary: true }
              : isPrimaryOf === "fusion"  ? { kind: "fusion",  name: "Movie night", primary: true }
              : inCluster ? { kind: "cluster", name: "Living room" }
              : inFusion  ? { kind: "fusion",  name: "Movie night" }
              : null;
  // When cloud is unreachable, flip the Online pill to Offline · Local
  // so the user sees the right state at a glance.
  const effectiveOnline = cloudUnreachable ? false : online;
  return (
    <Phone>
      <DeviceTopBar online={effectiveOnline} showStatus controllers={controllers} group={group}/>

      {/* Cloud-unreachable banner — local control still works. */}
      {cloudUnreachable && (
        <div style={{ padding: "8px 20px 0" }}>
          <div className="card" style={{
            padding: "10px 12px", display: "flex", alignItems: "center", gap: 10,
            background: "rgba(220,38,38,.06)",
            border: "1px solid rgba(220,38,38,.18)",
            color: "var(--destructive)",
          }}>
            <span style={{ width: 8, height: 8, borderRadius: 999, background: "var(--destructive)", boxShadow: "0 0 0 4px rgba(220,38,38,.18)", flexShrink: 0 }}/>
            <div style={{ flex: 1, fontSize: 11.5, lineHeight: 1.4 }}>
              <span style={{ fontWeight: 600 }}>Offline · using local control</span>
              <span style={{ opacity: .85 }}> · Online features are paused till connectivity is restored.</span>
            </div>
            <button aria-label="Open Wi-Fi settings" title="Open Wi-Fi settings" className="btn btn-ghost btn-icon-sm" style={{
              color: "var(--destructive)", flexShrink: 0,
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5a10 10 0 0 1 14 0"/><path d="M8.5 16a5 5 0 0 1 7 0"/><circle cx="12" cy="19.5" r=".8" fill="currentColor"/></svg>
            </button>
          </div>
        </div>
      )}

      {/* Peek — live preview of what the controller is rendering on the
          strip's currently-active segment. The 10-cell strip is a sample
          of the LEDs (1..10). The lightbulb mascot sits in the top-right,
          watching, while the strip animates underneath. */}
      {peek && !lightSyncOn && (
        <div style={{ padding: "10px 20px 0" }}>
          <div className="card iot-card" style={{ padding: "12px 12px 12px" }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 10, marginBottom: 10 }}>
              <div style={{ minWidth: 0, flex: 1 }}>
                <div style={{ fontSize: 9.5, fontWeight: 600, letterSpacing: ".08em", color: "var(--muted-foreground)", textTransform: "uppercase" }}>Now playing</div>
                <div style={{ fontSize: 12.5, fontWeight: 600, marginTop: 1, display: "flex", alignItems: "center", gap: 6 }}>
                  <span>{peekItem.name}</span>
                  <span className="muted small" style={{ fontWeight: 400 }}>· SEG1 · 82%</span>
                </div>
              </div>

              {/* Lightbulb mascot — top-right corner */}
              <span aria-hidden style={{
                position: "relative",
                width: 36, height: 36,
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                animation: "mascot-bob 2.6s ease-in-out infinite",
                flexShrink: 0,
              }}>
                <svg width="36" height="36" viewBox="0 0 36 36">
                  <defs>
                    <radialGradient id="bulb-glass-peek" cx="40%" cy="40%" r="55%">
                      <stop offset="0%"  stopColor="#fff7ed"/>
                      <stop offset="60%" stopColor="#fb923c"/>
                      <stop offset="100%" stopColor="#c2410c"/>
                    </radialGradient>
                    <radialGradient id="bulb-halo-peek" cx="50%" cy="42%" r="60%">
                      <stop offset="0%"  stopColor="#fbbf24" stopOpacity=".55"/>
                      <stop offset="100%" stopColor="#fbbf24" stopOpacity="0"/>
                    </radialGradient>
                  </defs>
                  {/* Halo */}
                  <circle cx="18" cy="14" r="14" fill="url(#bulb-halo-peek)"/>
                  {/* Bulb glass */}
                  <path d="M18 4 C 11.5 4 8 8.5 8 14 c 0 4 2 6 3.5 8 c 1 1.4 1.5 2.6 1.5 3.6 h 10 c 0 -1 .5 -2.2 1.5 -3.6 c 1.5 -2 3.5 -4 3.5 -8 C 28 8.5 24.5 4 18 4 z"
                    fill="url(#bulb-glass-peek)" stroke="#9a3412" strokeWidth=".7"/>
                  {/* Specular */}
                  <ellipse cx="14" cy="11" rx="2.4" ry="3" fill="#ffffff" opacity=".55"/>
                  {/* Eyes */}
                  <circle cx="15" cy="14" r="1.1" fill="#0a0a0a"/>
                  <circle cx="21" cy="14" r="1.1" fill="#0a0a0a"/>
                  {/* Smile */}
                  <path d="M14.5 17.5 Q18 19.4 21.5 17.5" stroke="#0a0a0a" strokeWidth=".9" fill="none" strokeLinecap="round"/>
                  {/* Screw threads */}
                  <rect x="13" y="26" width="10" height="2.4" rx=".5" fill="#3f3f46"/>
                  <rect x="13.5" y="29" width="9" height="2"   rx=".5" fill="#52525b"/>
                  <rect x="14" y="31.5" width="8"  height="1.8" rx=".5" fill="#3f3f46"/>
                </svg>
              </span>
            </div>

            {/* Live strip — renders whatever the segment is currently playing.
                Off / null → muted bar. Solid color or animated effect → painted
                by peekItem.bg + peekItem.anim. */}
            <div className={peekItem.anim || ""} style={{
              position: "relative", height: 22, borderRadius: 6,
              background: peekItem.bg || "var(--muted)",
              overflow: "hidden",
              border: "1px solid rgba(0,0,0,.06)",
              boxShadow: peekItem.bg ? "inset 0 0 0 1px rgba(255,255,255,.10)" : "none",
            }}>
              {/* Subtle LED tick marks */}
              {Array.from({ length: 16 }).map((_, i) => (
                <span key={i} style={{
                  position: "absolute",
                  left: `${(i + 0.5) * (100 / 16)}%`,
                  top: 0, bottom: 0, width: 1,
                  background: "rgba(255,255,255,.18)",
                }}/>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Wheel + body — wrapped so we can overlay the LightSync curtain */}
      <div style={{ position: "relative", flex: 1, display: "flex", flexDirection: "column", minHeight: 0 }}>
        {/* Wheel */}
        <div style={{ padding: "16px 24px 12px", display: "flex", justifyContent: "center" }}>
          <ColorWheel size={210}/>
        </div>

        {/* Hex */}
        <div style={{ padding: "0 24px", display: "flex", justifyContent: "center" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
            <span className="muted" style={{ fontSize: 14 }}>#</span>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              padding: "6px 12px",
              border: "1px solid var(--border)", borderRadius: 8,
              background: "var(--background)",
            }}>
              <span className="mono" style={{ fontSize: 13, fontWeight: 500, letterSpacing: ".05em" }}>ABCDEF</span>
            </div>
            <button className="btn btn-ghost" style={{ height: 28, width: 28, padding: 0 }} aria-label="Copy">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 14, height: 14, color: "var(--muted-foreground)" }}><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/></svg>
            </button>
          </div>
        </div>

        {/* Brightness */}
        <div style={{ padding: "20px 24px 0" }}>
          <LabeledSlider value={82} icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>}/>
        </div>

        {/* Speed */}
        <div style={{ padding: "10px 24px 0" }}>
          <LabeledSlider value={45} icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 1 18 0"/><path d="M12 12l4-3"/></svg>}/>
        </div>

        {/* Quick-status grid: Effect / Music / Palette / Segment */}
        <div style={{ padding: "20px 20px 0" }}>
          <StatusGrid effect="Solid" music={false} palette="Breeze" segment="SEG1"/>
        </div>

        <div style={{ flex: 1 }}/>
      </div>

      <FigPillNav active="home"/>

      {/* PixCluster overlay — device is in a cluster; instruct user to
          manage from the homepage cluster card. Same scrim as LightSync. */}
      {inCluster && (
        <div style={{
          position: "absolute", inset: 0,
          background: "var(--overlay-scrim)",
          backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)",
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: "0 24px",
          zIndex: 50,
        }}>
          <div style={{
            background: "#0a0a0a",
            color: "#fafafa",
            borderRadius: 20,
            padding: "28px 24px 24px",
            width: "100%",
            maxWidth: 300,
            textAlign: "center",
            display: "flex", flexDirection: "column", alignItems: "center", gap: 14,
            border: "1px solid #27272a",
            boxShadow: "0 24px 48px -16px rgba(0,0,0,.55)",
          }}>
            <div style={{
              width: 56, height: 56, borderRadius: 16,
              background: "rgba(var(--primary-rgb),.20)", color: "var(--primary)",
              display: "inline-flex", alignItems: "center", justifyContent: "center",
            }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>
            </div>
            <div>
              <div style={{ fontSize: 17, fontWeight: 600, letterSpacing: "-0.01em" }}>Part of a PixCluster</div>
              <div style={{ fontSize: 13, color: "#a1a1aa", marginTop: 6, lineHeight: 1.45 }}>
                This device follows the Living room cluster. To control it on its own, disable PixCluster from the homepage.
              </div>
            </div>
            <button className="btn btn-primary btn-block" style={{ marginTop: 4 }}>Open cluster controls</button>
            <button className="btn btn-ghost btn-block" style={{ color: "#a1a1aa" }}>Disable PixCluster</button>
          </div>
        </div>
      )}

      {/* PixFusion overlay — device is in a fusion session; user must
          disable fusion from the homepage to control individually. */}
      {inFusion && (
        <div style={{
          position: "absolute", inset: 0,
          background: "var(--overlay-scrim)",
          backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)",
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: "0 24px",
          zIndex: 50,
        }}>
          <div style={{
            background: "#0a0a0a",
            color: "#fafafa",
            borderRadius: 20,
            padding: "28px 24px 24px",
            width: "100%",
            maxWidth: 300,
            textAlign: "center",
            display: "flex", flexDirection: "column", alignItems: "center", gap: 14,
            border: "1px solid #27272a",
            boxShadow: "0 24px 48px -16px rgba(0,0,0,.55)",
          }}>
            <div style={{
              width: 56, height: 56, borderRadius: 16,
              background: "rgba(var(--primary-rgb),.20)", color: "var(--primary)",
              display: "inline-flex", alignItems: "center", justifyContent: "center",
            }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round"><path d="M5 5h6v6H5zM13 13h6v6h-6zM5 13l6 6M19 5l-6 6"/></svg>
            </div>
            <div>
              <div style={{ fontSize: 17, fontWeight: 600, letterSpacing: "-0.01em" }}>In a PixFusion session</div>
              <div style={{ fontSize: 13, color: "#a1a1aa", marginTop: 6, lineHeight: 1.45 }}>
                This device is fused with others to one source. Disable PixFusion from the homepage to control it on its own.
              </div>
            </div>
            <button className="btn btn-primary btn-block" style={{ marginTop: 4 }}>Open fusion controls</button>
            <button className="btn btn-ghost btn-block" style={{ color: "#a1a1aa" }}>Disable PixFusion</button>
          </div>
        </div>
      )}

      {/* LightSync overlay — full-phone scrim, theme-adaptive, with a small dark card */}
      {lightSyncOn && (
        <div style={{
          position: "absolute", inset: 0,
          background: "var(--overlay-scrim)",
          backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)",
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: "0 24px",
          zIndex: 50,
        }}>
          <div style={{
            background: "#0a0a0a",
            color: "#fafafa",
            borderRadius: 20,
            padding: "28px 24px 24px",
            width: "100%",
            maxWidth: 300,
            textAlign: "center",
            display: "flex", flexDirection: "column", alignItems: "center", gap: 14,
            border: "1px solid #27272a",
            boxShadow: "0 24px 48px -16px rgba(0,0,0,.55)",
          }}>
            <div style={{
              width: 56, height: 56, borderRadius: 16,
              background: "rgba(var(--primary-rgb),.20)", color: "var(--primary)",
              display: "inline-flex", alignItems: "center", justifyContent: "center",
            }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M7 10v4M11 8v8M15 11v3M19 9v6"/></svg>
            </div>
            <div>
              <div style={{ fontSize: 17, fontWeight: 600, letterSpacing: "-0.01em" }}>LightSync is on</div>
              <div style={{ fontSize: 13, color: "#a1a1aa", marginTop: 6, lineHeight: 1.45 }}>
                Color is being driven by your TV. Turn off LightSync to control colors manually.
              </div>
            </div>
            <button className="btn btn-primary btn-block" style={{ marginTop: 4 }}>Turn off LightSync</button>
          </div>
        </div>
      )}

      {/* Device-lock overlay — full-phone scrim, theme-adaptive, with a small dark card */}
      {locked && (
        <div style={{
          position: "absolute", inset: 0,
          background: "var(--overlay-scrim)",
          backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)",
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: "0 24px",
          zIndex: 50,
        }}>
          <div style={{
            background: "#0a0a0a",
            color: "#fafafa",
            borderRadius: 22,
            padding: "22px 20px 18px",
            width: "100%",
            maxWidth: 300,
            display: "flex", flexDirection: "column", alignItems: "center", gap: 12,
            border: "1px solid #27272a",
            boxShadow: "0 24px 48px -16px rgba(0,0,0,.6)",
          }}>
            {/* Lock badge */}
            <div style={{
              width: 64, height: 64, borderRadius: 999,
              background: "radial-gradient(circle at 35% 30%, rgba(var(--primary-rgb),.55), rgba(var(--primary-rgb),.15) 60%, transparent 75%)",
              display: "inline-flex", alignItems: "center", justifyContent: "center",
            }}>
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>
            </div>

            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 17, fontWeight: 600, letterSpacing: "-0.01em" }}>PixC Lyt is locked</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,.55)", marginTop: 4, lineHeight: 1.45 }}>
                Enter the device passcode to control this light.
              </div>
            </div>

            {/* Pin dots */}
            <div style={{ display: "flex", gap: 10, marginTop: 2 }}>
              {[0,1,2,3].map(i => (
                <span key={i} style={{
                  width: 11, height: 11, borderRadius: 999,
                  border: "1.5px solid rgba(255,255,255,.35)",
                  background: i < 2 ? "#fff" : "transparent",
                }}/>
              ))}
            </div>

            {/* Numpad */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 48px)", gap: 8, marginTop: 4 }}>
              {[1,2,3,4,5,6,7,8,9].map(n => (
                <button key={n} style={{
                  width: 48, height: 48, borderRadius: 999,
                  background: "rgba(255,255,255,.08)",
                  border: "1px solid rgba(255,255,255,.12)",
                  color: "#fff", fontSize: 18, fontWeight: 500,
                  cursor: "pointer",
                }}>{n}</button>
              ))}
              <button aria-label="Use biometrics" title="Biometrics" style={{
                width: 48, height: 48, borderRadius: 999,
                background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.12)",
                color: "#fafafa", cursor: "pointer",
                display: "inline-flex", alignItems: "center", justifyContent: "center",
              }}>
                {/* Fingerprint — generic biometrics symbol (Face ID / Touch ID / Android equivalents) */}
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 11a7 7 0 0 1 14 0v3"/>
                  <path d="M8 12a4 4 0 0 1 8 0v4"/>
                  <path d="M12 12v5a3 3 0 0 0 3 3"/>
                  <path d="M3 14c.6-3 2.4-5 5-6"/>
                  <path d="M21 14c-.4 2-1.5 4-3 5"/>
                </svg>
              </button>
              <button style={{ width: 48, height: 48, borderRadius: 999, background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.12)", color: "#fff", fontSize: 18, fontWeight: 500, cursor: "pointer" }}>0</button>
              <button aria-label="Delete" style={{ width: 48, height: 48, borderRadius: 999, background: "transparent", border: 0, color: "rgba(255,255,255,.7)", display: "inline-flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                <svg width="18" height="14" viewBox="0 0 24 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 3H8L2 9l6 6h14a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1z"/><path d="M18 6l-6 6M12 6l6 6"/></svg>
              </button>
            </div>

            {/* Forgot passcode */}
            <button style={{
              fontSize: 12, color: "rgba(255,255,255,.55)",
              background: "transparent", border: 0, cursor: "pointer",
              display: "inline-flex", alignItems: "center", gap: 6,
              marginTop: 2,
            }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 8v4l3 2"/></svg>
              Forgot passcode?
            </button>
          </div>
        </div>
      )}
    </Phone>
  );
}

// ===== Effects sub-page — full effects catalogue =====

const STANDARD_EFFECTS = [
  { name: "Solid",   bg: "#ea580c", anim: "" },
  { name: "Breeze",  bg: "linear-gradient(90deg,#3b82f6,#22c55e,#a855f7,#22c55e,#3b82f6)", anim: "fx-anim" },
  { name: "Sunrise", bg: "linear-gradient(90deg,#f59e0b,#fb7185,#a855f7,#fb7185,#f59e0b)", anim: "fx-anim fx-anim-slow" },
  { name: "Aurora",  bg: "linear-gradient(135deg,#22c55e,#06b6d4,#8b5cf6,#06b6d4,#22c55e)", anim: "fx-anim" },
  { name: "Pulse",   bg: "radial-gradient(circle at 50% 50%, #ef4444 0%, #7f1d1d 80%)", anim: "fx-anim-pulse" },
  { name: "Strobe",  bg: "linear-gradient(90deg,#fafafa,#09090b,#fafafa,#09090b)", anim: "fx-anim fx-anim-fast" },
  { name: "Candle",  bg: "linear-gradient(180deg,#fde68a,#f97316,#fde68a)", anim: "fx-anim fx-anim-y fx-anim-flicker" },
  { name: "Ocean",   bg: "linear-gradient(135deg,#0ea5e9,#1e3a8a,#0ea5e9,#1e3a8a)", anim: "fx-anim fx-anim-slow" },
];

const MUSIC_EFFECTS = [
  { name: "Beat Drop",   bg: "linear-gradient(135deg,#ec4899,#0a0a0a,#ec4899,#0a0a0a)", anim: "fx-anim fx-anim-fast" },
  { name: "Spectrum",    bg: "linear-gradient(90deg,#ef4444,#f59e0b,#22c55e,#3b82f6,#a855f7,#ef4444)", anim: "fx-anim" },
  { name: "VU Meter",    bg: "linear-gradient(180deg,#22c55e 0%,#facc15 60%,#ef4444 100%)", anim: "fx-anim-pulse" },
  { name: "Bass Pulse",  bg: "radial-gradient(circle at 50% 70%, #a855f7 0%, #1e1b4b 70%)", anim: "fx-anim-pulse" },
  { name: "Treble Fizz", bg: "linear-gradient(90deg,#22d3ee,#fef9c3,#22d3ee,#fef9c3)", anim: "fx-anim fx-anim-fast" },
  { name: "Strobe Sync", bg: "linear-gradient(90deg,#0a0a0a,#fff,#0a0a0a,#fff,#0a0a0a)", anim: "fx-anim-flicker" },
  { name: "Wave",        bg: "linear-gradient(135deg,#06b6d4,#3b82f6,#06b6d4,#3b82f6)", anim: "fx-anim" },
  { name: "Confetti",    bg: "conic-gradient(from 0deg,#ef4444,#facc15,#22c55e,#06b6d4,#a855f7,#ef4444)", anim: "fx-anim-spin" },
  { name: "Heartbeat",   bg: "radial-gradient(circle at 50% 50%, #f43f5e 0%, #4c0519 80%)", anim: "fx-anim-pulse" },
  { name: "Disco",       bg: "conic-gradient(from 0deg,#ec4899 0deg,#facc15 90deg,#22c55e 180deg,#3b82f6 270deg,#ec4899 360deg)", anim: "fx-anim-spin" },
  { name: "Drift",       bg: "linear-gradient(135deg,#6366f1,#ec4899,#f59e0b,#ec4899,#6366f1)", anim: "fx-anim fx-anim-slow" },
  { name: "Vinyl",       bg: "radial-gradient(circle, #18181b 30%, #27272a 32%, #18181b 34%, #27272a 36%, #18181b 38%)", anim: "fx-anim-spin" },
];

function EffectChip({ e, active, big, compact }) {
  return (
    <div style={{
      flex: "0 0 auto",
      width: big ? "100%" : "auto",
      borderRadius: 12,
      border: `1px solid ${active ? "var(--primary)" : "var(--border)"}`,
      background: "var(--card)",
      padding: compact ? 6 : 10,
      cursor: "pointer",
      boxShadow: active ? "0 0 0 2px var(--primary-soft)" : "none",
    }}>
      <div className={e.anim || ""} style={{
        width: "100%", height: big ? 130 : (compact ? 64 : 70), borderRadius: 8,
        background: e.bg, marginBottom: compact ? 6 : 8,
      }}/>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 4 }}>
        <div style={{ fontSize: compact ? 11.5 : 13, fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{e.name}</div>
        {active && <span style={{ width: 7, height: 7, borderRadius: 999, background: "var(--primary)", flexShrink: 0 }}/>}
      </div>
    </div>
  );
}

function ScreenDeviceEffects({ music = false }) {
  const list = music ? MUSIC_EFFECTS : STANDARD_EFFECTS;
  const current = list[0];
  return (
    <Phone>
      <DeviceTopBar section="Effect"/>

      {/* Music sync toggle */}
      <div style={{ padding: "12px 20px 0" }}>
        <div className="card" style={{
          padding: 12, display: "flex", alignItems: "center", gap: 12,
          background: music ? "var(--primary-soft)" : "var(--muted)",
          borderColor: music ? "var(--primary-soft-border)" : "var(--border)"
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: music ? "var(--primary)" : "var(--background)",
            color: music ? "var(--primary-foreground)" : "var(--foreground)",
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            border: "1px solid var(--border)"
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: music ? "var(--primary-soft-fg)" : "var(--foreground)" }}>Music sync</div>
            <div className="muted small">{music ? "Listening to ambient sound" : "React to ambient music"}</div>
          </div>
          <label className="switch" style={{ width: 36, height: 20 }}>
            <input type="checkbox" defaultChecked={music}/>
            <span className="track"><span className="thumb"/></span>
          </label>
        </div>
      </div>

      {/* Now playing — hero */}
      <div style={{ padding: "14px 20px 0" }}>
        <div className="muted small" style={{ marginBottom: 8, textTransform: "uppercase", letterSpacing: ".06em", fontWeight: 500 }}>Now playing</div>
        <EffectChip e={current} active big/>
      </div>

      {/* Scrollable list of all effects (2-col grid) */}
      <div style={{ padding: "14px 0 0", flex: 1, overflow: "auto", minHeight: 0 }}>
        <div style={{ padding: "0 20px", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <div className="muted small" style={{ textTransform: "uppercase", letterSpacing: ".06em", fontWeight: 500 }}>{music ? `${MUSIC_EFFECTS.length} music effects` : `${STANDARD_EFFECTS.length} effects`}</div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, padding: "0 20px 90px" }}>
          {list.slice(1).map(e => <EffectChip key={e.name} e={e} compact/>)}
        </div>
      </div>

      <FigPillNav active="effects"/>
    </Phone>
  );
}

// ===== Palettes — pre-curated multi-color schemes =====
function ScreenPalettes() {
  const palettes = [
    { t: "Breeze",   colors: ["#3b82f6","#22c55e","#a855f7","#06b6d4"] },
    { t: "Sunset",   colors: ["#ea580c","#fb7185","#a855f7","#3b82f6"] },
    { t: "Forest",   colors: ["#365314","#16a34a","#84cc16","#facc15"] },
    { t: "Cyberpunk",colors: ["#ec4899","#06b6d4","#a855f7","#0a0a0a"] },
    { t: "Ocean",    colors: ["#0ea5e9","#1e3a8a","#06b6d4","#cffafe"] },
    { t: "Pastel",   colors: ["#fde68a","#fbcfe8","#bae6fd","#bbf7d0"] },
    { t: "Retro",    colors: ["#ef4444","#f59e0b","#22c55e","#3b82f6"] },
    { t: "Mono",     colors: ["#fafafa","#a1a1aa","#52525b","#0a0a0a"] },
    { t: "Aurora",   colors: ["#22c55e","#06b6d4","#a855f7","#ec4899"] },
    { t: "Lava",     colors: ["#7f1d1d","#dc2626","#fb923c","#facc15"] },
    { t: "Candy",    colors: ["#f43f5e","#fb7185","#fda4af","#fecdd3"] },
  ];
  const current = palettes[0];

  const Swatch = ({ colors, big }) => (
    <div style={{ display: "flex", height: big ? 130 : 70, borderRadius: 8, overflow: "hidden" }}>
      {colors.map(c => <div key={c} style={{ flex: 1, background: c }}/>)}
    </div>
  );

  return (
    <Phone>
      <DeviceTopBar section="Palette"/>

      {/* Now playing — hero (matches Effects layout) */}
      <div style={{ padding: "14px 20px 0" }}>
        <div className="muted small" style={{ marginBottom: 8, textTransform: "uppercase", letterSpacing: ".06em", fontWeight: 500 }}>Now playing</div>
        <div style={{
          borderRadius: 12, padding: 10,
          border: "1px solid var(--primary)",
          background: "var(--card)",
          boxShadow: "0 0 0 2px var(--primary-soft)",
        }}>
          <div style={{ marginBottom: 8 }}><Swatch colors={current.colors} big/></div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ fontSize: 13, fontWeight: 600 }}>{current.t}</div>
            <span style={{ width: 8, height: 8, borderRadius: 999, background: "var(--primary)" }}/>
          </div>
        </div>
      </div>

      {/* Scrollable list of all palettes (2-col grid) */}
      <div style={{ padding: "14px 0 0", flex: 1, overflow: "auto", minHeight: 0 }}>
        <div style={{ padding: "0 20px", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <div className="muted small" style={{ textTransform: "uppercase", letterSpacing: ".06em", fontWeight: 500 }}>{palettes.length} palettes</div>
          <button className="btn btn-ghost btn-sm" style={{ height: 24, padding: "0 8px", color: "var(--primary)" }}>
            <svg className="ic-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"/></svg>
            New
          </button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, padding: "0 20px 90px" }}>
          {palettes.slice(1).map(p => (
            <div key={p.t} style={{
              borderRadius: 12, padding: 10,
              border: "1px solid var(--border)",
              background: "var(--card)", cursor: "pointer",
            }}>
              <div style={{ marginBottom: 8 }}><Swatch colors={p.colors}/></div>
              <div style={{ fontSize: 13, fontWeight: 600 }}>{p.t}</div>
            </div>
          ))}
        </div>
      </div>

      <FigPillNav active="palettes"/>
    </Phone>
  );
}

// ===== Schedule / Automation =====
function ScreenSchedule() {
  return (
    <Phone>
      <Header title="Automations" right={<button className="btn btn-outline btn-sm"><svg className="ic-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"/></svg>New</button>}/>
      <div style={{ flex: 1, overflow: "auto", padding: "0 20px 100px" }}>
        <div className="muted small" style={{ marginBottom: 8, textTransform: "uppercase", letterSpacing: ".06em" }}>Today</div>
        <div className="card">
          {[
            { time: "07:00", title: "Wake up", sub: "Sunrise · Bedroom", on: true },
            { time: "18:30", title: "Movie night", sub: "Aurora · Living room", on: true },
            { time: "22:45", title: "Wind down", sub: "Warm 2700 K · 30%", on: false },
          ].map((r, i) => (
            <div className="row" key={i}>
              <div className="icon-wrap" style={{ flexDirection: "column", lineHeight: 1.1 }}>
                <div className="mono" style={{ fontSize: 11, fontWeight: 500 }}>{r.time.split(":")[0]}</div>
                <div className="mono" style={{ fontSize: 10, color: "var(--muted-foreground)" }}>{r.time.split(":")[1]}</div>
              </div>
              <div className="label-wrap"><div className="t">{r.title}</div><div className="s">{r.sub}</div></div>
              <label className="switch"><input type="checkbox" defaultChecked={r.on}/><span className="track"><span className="thumb"/></span></label>
            </div>
          ))}
        </div>

        <div className="muted small" style={{ marginTop: 20, marginBottom: 8, textTransform: "uppercase", letterSpacing: ".06em" }}>Triggers</div>
        <div className="card">
          <div className="row">
            <div className="icon-wrap"><svg className="ic-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/></svg></div>
            <div className="label-wrap"><div className="t">When I arrive home</div><div className="s">Hallway lights → 60%</div></div>
            <label className="switch"><input type="checkbox" defaultChecked/><span className="track"><span className="thumb"/></span></label>
          </div>
          <div className="row">
            <div className="icon-wrap"><svg className="ic-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z"/></svg></div>
            <div className="label-wrap"><div className="t">After sunset</div><div className="s">All lights → Warm 30%</div></div>
            <label className="switch"><input type="checkbox"/><span className="track"><span className="thumb"/></span></label>
          </div>
        </div>
      </div>
      <FigPillNav active="extras"/>
    </Phone>
  );
}

// ===== Bottom pill nav (DEVICE-scoped: Home / Effects / Palettes / Extras / Settings) =====
function FigPillNav({ active = "home" }) {
  const items = [
    { id: "home",     icon: <svg className="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/></svg> },
    { id: "effects",  icon: <svg className="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L4.5 14h6L9 22l8.5-12h-6L13 2z"/></svg> },
    { id: "palettes", icon: <svg className="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22a10 10 0 1 1 10-10c0 3-3 4-5 4h-2a2 2 0 0 0-1 4 1 1 0 0 1-1 2h-1z"/><circle cx="6.5" cy="11.5" r="1" fill="currentColor"/><circle cx="9.5" cy="7" r="1" fill="currentColor"/><circle cx="14.5" cy="7" r="1" fill="currentColor"/><circle cx="17.5" cy="11.5" r="1" fill="currentColor"/></svg> },
    { id: "extras",   icon: <svg className="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l2 6 6 1-4.5 4 1 6-4.5-3-4.5 3 1-6L4 9l6-1z"/></svg> },
    { id: "settings", icon: <svg className="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="6" x2="11" y2="6"/><line x1="15" y1="6" x2="20" y2="6"/><circle cx="13" cy="6" r="2"/><line x1="4" y1="12" x2="7" y2="12"/><line x1="11" y1="12" x2="20" y2="12"/><circle cx="9" cy="12" r="2"/><line x1="4" y1="18" x2="13" y2="18"/><line x1="17" y1="18" x2="20" y2="18"/><circle cx="15" cy="18" r="2"/></svg> },
  ];
  return (
    <div className="tabbar">
      {items.map(it => (
        <button key={it.id} className={active === it.id ? "active" : ""}>{it.icon}</button>
      ))}
    </div>
  );
}

// ===== App-lock screen — biometric default + passcode toggle =====
function ScreenAppLock({ mode = "biometric", wrong = false }) {
  return (
    <Phone>
      <div style={{ padding: "8px 16px 0", display: "flex", alignItems: "center", justifyContent: "space-between", flex: "0 0 auto" }}>
        <span style={{ width: 28 }}/>
        <span className="muted small" style={{ fontWeight: 500 }}>App locked</span>
        <span style={{ width: 28 }}/>
      </div>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 32px", textAlign: "center" }}>
        <div style={{ marginBottom: 4 }}>
          <RgbMark size={72}/>
        </div>
        <div className="h2" style={{ marginTop: 6 }}>Welcome back</div>
        <div className="muted" style={{ fontSize: 13, marginTop: 4, maxWidth: 240 }}>
          Unlock PixC to control your home
        </div>

        {mode === "biometric" ? (
          <>
            <button style={{
              marginTop: 36,
              width: 96, height: 96, borderRadius: 999,
              background: "var(--primary-soft)",
              border: "1px solid var(--primary-soft-border)",
              color: "var(--primary)",
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer",
            }}>
              <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 11a3 3 0 0 0-3 3v3"/><path d="M9 11a3 3 0 0 1 6 0v3a4 4 0 0 1-1 2.6"/><path d="M5 13a7 7 0 0 1 14 0v2"/><path d="M3 11a9 9 0 0 1 18 0"/><path d="M12 17v3"/></svg>
            </button>
            <div className="muted small" style={{ marginTop: 16 }}>Touch sensor to unlock</div>
            <div style={{ marginTop: 28, display: "flex", gap: 10 }}>
              <button className="btn btn-outline btn-sm">Use passcode</button>
            </div>
          </>
        ) : (
          <PasscodeKeypad wrong={wrong} digits={4}/>
        )}
      </div>
    </Phone>
  );
}

// 4-digit keypad
function PasscodeKeypad({ wrong = false, digits = 4 }) {
  const filled = wrong ? digits : digits - 1;
  return (
    <>
      <div style={{ display: "flex", gap: 14, marginTop: 24 }}>
        {Array.from({ length: digits }).map((_, i) => (
          <span key={i} style={{
            width: 14, height: 14, borderRadius: 999,
            background: i < filled ? (wrong ? "var(--destructive)" : "var(--foreground)") : "transparent",
            border: `1.5px solid ${wrong && i < filled ? "var(--destructive)" : "var(--border-strong)"}`,
          }}/>
        ))}
      </div>
      {wrong && (
        <div style={{ marginTop: 12, color: "var(--destructive)", fontSize: 13, fontWeight: 500 }}>
          Wrong PIN. 2 attempts left.
        </div>
      )}
      <div style={{ marginTop: 24, display: "grid", gridTemplateColumns: "repeat(3, 64px)", gap: 14 }}>
        {[1,2,3,4,5,6,7,8,9].map(n => (
          <button key={n} style={{
            width: 64, height: 64, borderRadius: 999,
            border: "1px solid var(--border)", background: "var(--card)",
            fontSize: 24, fontWeight: 500, fontFamily: "inherit",
            cursor: "pointer", color: "var(--foreground)",
          }}>{n}</button>
        ))}
        <span/>
        <button style={{ width: 64, height: 64, borderRadius: 999, border: "1px solid var(--border)", background: "var(--card)", fontSize: 24, fontWeight: 500, fontFamily: "inherit", cursor: "pointer", color: "var(--foreground)" }}>0</button>
        <button style={{ width: 64, height: 64, borderRadius: 999, border: 0, background: "transparent", cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "var(--muted-foreground)" }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12l5-7h13v14H8z"/><path d="M11 9l5 6M16 9l-5 6"/></svg>
        </button>
      </div>
    </>
  );
}

// ===== DEVICE SETTINGS — Wi-Fi / LED / OTA Security =====
function ScreenDeviceSettings() {
  return (
    <Phone>
      <DeviceTopBar section="Settings"/>

      <div style={{ flex: 1, overflow: "auto", padding: "16px 20px 100px" }}>
        {/* Wi-Fi */}
        <div className="muted small" style={{ marginBottom: 8, textTransform: "uppercase", letterSpacing: ".06em", fontWeight: 500 }}>Wi-Fi</div>
        <div className="card" style={{ marginBottom: 16 }}>
          <div className="row">
            <div className="icon-wrap" style={{ background: "var(--primary-soft)", color: "var(--primary)" }}>
              <svg className="ic-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5a10 10 0 0 1 14 0"/><path d="M8.5 16a5 5 0 0 1 7 0"/><circle cx="12" cy="19.5" r=".8" fill="currentColor"/></svg>
            </div>
            <div className="label-wrap"><div className="t">Network</div><div className="s">Home_5G · 2.4 GHz</div></div>
            <span className="badge badge-success">−42 dB</span>
          </div>
          <div className="row">
            <div className="label-wrap"><div className="t">IP address</div></div>
            <div className="s mono" style={{ color: "var(--muted-foreground)" }}>192.168.1.42</div>
          </div>
          <div className="row">
            <div className="label-wrap"><div className="t">Auto-reconnect</div><div className="s">When network drops</div></div>
            <label className="switch"><input type="checkbox" defaultChecked/><span className="track"><span className="thumb"/></span></label>
          </div>
          <div className="row">
            <div className="label-wrap" style={{ color: "var(--primary)" }}><div className="t">Change network</div></div>
            <svg className="ic-sm chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
          </div>
        </div>

        {/* LED */}
        <div className="muted small" style={{ marginBottom: 8, textTransform: "uppercase", letterSpacing: ".06em", fontWeight: 500 }}>LED</div>
        <div className="card" style={{ marginBottom: 16 }}>
          <button className="row" style={{ width: "100%", border: 0, background: "transparent", textAlign: "left", cursor: "pointer", font: "inherit" }}>
            <div className="icon-wrap"><svg className="ic-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg></div>
            <div className="label-wrap"><div className="t">Strip type</div></div>
            <div className="s mono" style={{ color: "var(--muted-foreground)" }}>WS2812B</div>
            <svg className="ic-sm chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
          </button>
          <div className="row">
            <div className="label-wrap"><div className="t">LED count</div><div className="s">Total addressable</div></div>
            <div className="s mono" style={{ color: "var(--muted-foreground)" }}>200</div>
          </div>
          <button className="row" style={{ width: "100%", border: 0, background: "transparent", textAlign: "left", cursor: "pointer", font: "inherit" }}>
            <div className="icon-wrap" style={{ background: "var(--primary-soft)", color: "var(--primary)" }}>
              <svg className="ic-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L4.5 14h6L9 22l8.5-12h-6L13 2z"/></svg>
            </div>
            <div className="label-wrap"><div className="t">Power plan</div><div className="s">Balanced · brightness 75%</div></div>
            <svg className="ic-sm chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
          </button>
        </div>

        {/* OTA */}
        <div className="muted small" style={{ marginBottom: 8, textTransform: "uppercase", letterSpacing: ".06em", fontWeight: 500 }}>OTA · Security</div>
        <div className="card" style={{ marginBottom: 16 }}>
          <div className="row">
            <div className="icon-wrap" style={{ background: "var(--primary-soft)", color: "var(--primary)" }}>
              <svg className="ic-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
            <div className="label-wrap"><div className="t">Firmware</div><div className="s">2.4.1 · up to date</div></div>
            <button className="btn btn-outline btn-sm">Check</button>
          </div>
          <div className="row">
            <div className="label-wrap"><div className="t">Auto update</div><div className="s">Install at 03:00</div></div>
            <label className="switch"><input type="checkbox" defaultChecked/><span className="track"><span className="thumb"/></span></label>
          </div>
          <div className="row">
            <div className="label-wrap"><div className="t">Signed updates only</div><div className="s">Verify firmware signature</div></div>
            <label className="switch"><input type="checkbox" defaultChecked/><span className="track"><span className="thumb"/></span></label>
          </div>
          <div className="row">
            <div className="label-wrap"><div className="t">Device PIN</div><div className="s">Required when offline</div></div>
            <button className="btn btn-outline btn-sm">Change</button>
          </div>
          <div className="row">
            <div className="label-wrap"><div className="t">Local API token</div></div>
            <button className="btn btn-ghost btn-sm" style={{ color: "var(--muted-foreground)" }}>Rotate</button>
          </div>
        </div>

        <div className="card">
          <div className="row" style={{ color: "var(--destructive)" }}>
            <div className="icon-wrap" style={{ background: "rgba(220,38,38,.08)", color: "var(--destructive)" }}>
              <svg className="ic-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M6 6l1 14a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-14"/></svg>
            </div>
            <div className="label-wrap"><div className="t">Remove device</div></div>
          </div>
        </div>
      </div>
      <FigPillNav active="settings"/>
    </Phone>
  );
}

// ===== EXTRAS HUB — Automation / LightSync / Presets / Segments / Wake Light =====
function ScreenDeviceExtras() {
  const tiles = [
    { t: "Segments",   s: "Split strip into zones",     c: "#06b6d4", icon: <svg className="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="9" width="5" height="6" rx="1"/><rect x="9" y="9" width="5" height="6" rx="1"/><rect x="16" y="9" width="6" height="6" rx="1"/></svg> },
    { t: "Automation", s: "Schedules & triggers",       c: "#3b82f6", icon: <svg className="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg> },
    { t: "LightSync",  s: "Sync with screen / TV",      c: "#a855f7", icon: <svg className="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="14" rx="2"/><path d="M8 21h8M12 18v3"/></svg> },
    { t: "Presets",    s: "Saved scenes",               c: "#22c55e", icon: <svg className="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg> },
    { t: "Misc", s: "Power-on, indicator LED…",       c: "#f59e0b", icon: <svg className="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg> },
    { t: "Power", s: "Live usage & savings",         c: "#10b981", icon: <svg className="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z"/></svg> },
  ];
  return (
    <Phone>
      <DeviceTopBar section="Extras"/>

      <div style={{ padding: "16px 20px 0", flex: 1, overflow: "auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {tiles.map(tile => (
            <div key={tile.t} className="card" style={{ padding: 14, cursor: "pointer" }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: tile.c + "1a", color: tile.c,
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                marginBottom: 10
              }}>{tile.icon}</div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>{tile.t}</div>
              <div className="muted small" style={{ marginTop: 2 }}>{tile.s}</div>
            </div>
          ))}
        </div>
        <div style={{ height: 100 }}/>
      </div>

      <FigPillNav active="extras"/>
    </Phone>
  );
}

// ===== Segments page — split N total LEDs into M segments =====
function ScreenSegments() {
  const total = 200;
  const segments = [
    { id: "S1", name: "Top row",    start: 0,   length: 50, color: "#ea580c" },
    { id: "S2", name: "Right side", start: 50,  length: 50, color: "#3b82f6" },
    { id: "S3", name: "Bottom row", start: 100, length: 50, color: "#22c55e" },
    { id: "S4", name: "Left side",  start: 150, length: 50, color: "#a855f7" },
  ];
  return (
    <Phone>
      <Header title="Segments" right={<button className="btn btn-outline btn-sm"><svg className="ic-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"/></svg>Add</button>}/>

      <div style={{ flex: 1, overflow: "auto", padding: "0 20px 100px" }}>
        {/* Strip visualization */}
        <div className="card" style={{ padding: 16, marginBottom: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 10 }}>
            <div>
              <div className="muted small" style={{ textTransform: "uppercase", letterSpacing: ".06em" }}>Total LEDs</div>
              <div style={{ fontSize: 22, fontWeight: 600, marginTop: 2 }}>{total}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div className="muted small" style={{ textTransform: "uppercase", letterSpacing: ".06em" }}>Segments</div>
              <div style={{ fontSize: 22, fontWeight: 600, marginTop: 2 }}>{segments.length}</div>
            </div>
          </div>
          {/* Strip bar */}
          <div style={{ display: "flex", height: 18, borderRadius: 999, overflow: "hidden", border: "1px solid var(--border)" }}>
            {segments.map(s => (
              <div key={s.id} style={{ flex: s.length, background: s.color, position: "relative" }}>
                <span style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,.95)", letterSpacing: ".05em" }}>{s.id}</span>
              </div>
            ))}
          </div>
          {/* Tick marks */}
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
            <span className="mono small muted">0</span>
            <span className="mono small muted">50</span>
            <span className="mono small muted">100</span>
            <span className="mono small muted">150</span>
            <span className="mono small muted">{total}</span>
          </div>
        </div>

        <div className="muted small" style={{ marginBottom: 8, textTransform: "uppercase", letterSpacing: ".06em", fontWeight: 500 }}>Segment list</div>
        <div className="card">
          {segments.map((s, i) => (
            <div className="row" key={s.id}>
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: s.color,
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                color: "white", fontSize: 12, fontWeight: 700,
                flex: "0 0 auto",
              }}>{s.id}</div>
              <div className="label-wrap">
                <div className="t">{s.name}</div>
                <div className="s mono">LED {s.start}–{s.start + s.length - 1} · {s.length} LEDs</div>
              </div>
              <button className="btn btn-ghost btn-icon-sm" style={{ color: "var(--muted-foreground)" }}>
                <svg className="ic-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="19" r="1.5"/></svg>
              </button>
            </div>
          ))}
        </div>

        <div className="muted small" style={{ marginTop: 20, marginBottom: 8, textTransform: "uppercase", letterSpacing: ".06em", fontWeight: 500 }}>Quick split</div>
        <div className="card" style={{ padding: 12, display: "flex", gap: 8 }}>
          {[2, 4, 5, 8, 10].map(n => (
            <button key={n} className="btn btn-outline btn-sm" style={{ flex: 1, height: 40, flexDirection: "column", gap: 0 }}>
              <span style={{ fontSize: 14, fontWeight: 600 }}>{n}</span>
              <span style={{ fontSize: 10, color: "var(--muted-foreground)", fontWeight: 400 }}>{total / n} LEDs ea</span>
            </button>
          ))}
        </div>
      </div>
      <FigPillNav active="extras"/>
    </Phone>
  );
}

// ===== LightSync — production restructure =====
// Three sync sources, each with their own setup:
//   1. TV / HDMI   → linear arrangement (behind-TV strip / around-TV bias)
//   2. Wireless screen (computer mirroring + phone mirroring) → 2D grid
//   3. Audio reactive (PixC Mic + current device audio stream) → audio source

const LIGHTSYNC_MODES = [
  {
    id: "wireless",
    title: "Wireless screen",
    sub: "Mirror a computer or phone screen over Wi-Fi.",
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="13" rx="2"/><path d="M9 20h6M12 16v4"/><path d="M7 8a3 3 0 0 1 5 2.5"/></svg>,
  },
  {
    id: "audio",
    title: "Audio reactive",
    sub: "React to a microphone or your current audio output.",
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3M9 21h6"/></svg>,
  },
  {
    id: "tv",
    title: "PixAmbiSync",
    sub: "Wired ambient TV sync via the PixC HDMI hub. Lowest latency.",
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="14" rx="2"/><path d="M8 21h8M12 18v3"/></svg>,
    comingSoon: true,
  },
];

// Reusable section header
function StepHeader({ n, label }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
      <span style={{
        width: 20, height: 20, borderRadius: 999,
        background: "var(--foreground)", color: "var(--background)",
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        fontSize: 11, fontWeight: 700,
      }}>{n}</span>
      <div className="muted small" style={{ textTransform: "uppercase", letterSpacing: ".06em", fontWeight: 500 }}>{label}</div>
    </div>
  );
}

// 1 · Setup entry — pick a sync source. TV / HDMI marked Coming soon.
function ScreenLightSyncSetup() {
  const [mode, setMode] = React.useState("wireless");
  return (
    <Phone>
      <Header title="Set up LightSync"/>
      <div style={{ flex: 1, overflow: "auto", padding: "4px 20px 100px" }}>
        <div className="muted" style={{ fontSize: 13, marginBottom: 18 }}>
          LightSync drives your lights in real time from an external source. Choose how you'll feed it.
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 18 }}>
          {LIGHTSYNC_MODES.map(m => {
            const disabled = m.comingSoon;
            const sel = mode === m.id;
            return (
              <button key={m.id} onClick={() => !disabled && setMode(m.id)}
                disabled={disabled}
                className="card" style={{
                  padding: 14, display: "flex", alignItems: "center", gap: 12,
                  textAlign: "left", cursor: disabled ? "not-allowed" : "pointer", font: "inherit",
                  background: sel ? "var(--primary-soft)" : "var(--card)",
                  border: sel ? "1.5px solid var(--primary)" : "1px solid var(--border)",
                  color: disabled ? "var(--muted-foreground)" : "var(--foreground)",
                  opacity: disabled ? .55 : 1,
                  filter: disabled ? "blur(.4px) saturate(.6)" : "none",
                  position: "relative",
                  overflow: "hidden",
                }}>
                {disabled && (
                  <span aria-hidden style={{
                    position: "absolute", inset: 0,
                    backgroundImage: "repeating-linear-gradient(45deg, transparent 0 8px, color-mix(in srgb, var(--muted-foreground) 8%, transparent) 8px 9px)",
                    pointerEvents: "none",
                  }}/>
                )}
                <div style={{
                  width: 40, height: 40, borderRadius: 12, flex: "0 0 auto",
                  background: sel ? "var(--primary)" : "var(--muted)",
                  color: sel ? "var(--primary-foreground)" : "var(--foreground)",
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                  opacity: disabled ? .55 : 1,
                }}>{m.icon}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, display: "flex", alignItems: "center", gap: 8 }}>
                    {m.title}
                    {m.comingSoon && <span className="badge" style={{ fontSize: 10, height: 18, padding: "0 6px" }}>Coming soon</span>}
                  </div>
                  <div className="muted small" style={{ marginTop: 2 }}>{m.sub}</div>
                </div>
                {!disabled && (
                  <span aria-hidden style={{
                    width: 20, height: 20, borderRadius: 999,
                    border: sel ? "6px solid var(--primary)" : "1.5px solid var(--border-strong)",
                    background: "var(--background)", boxSizing: "border-box",
                  }}/>
                )}
              </button>
            );
          })}
        </div>

        {/* PixC+ exclusive sync modes */}
        <div className="muted small" style={{ textTransform: "uppercase", letterSpacing: ".06em", fontWeight: 500, marginBottom: 8 }}>Multi-device · PixC+</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 18 }}>
          {[
            { id: "combo",   t: "PixFusion",       s: "Fuse multiple devices into one sync session.",
              icon: <i className="fa-solid fa-layer-group" style={{ fontSize: 16 }}/> },
            { id: "grouped", t: "PixCluster",  s: "Group a room with a primary — others inherit settings.",
              icon: <i className="fa-solid fa-object-group" style={{ fontSize: 16 }}/> },
          ].map(m => (
            <button key={m.id} className="card" style={{
              padding: 14, display: "flex", alignItems: "center", gap: 12,
              textAlign: "left", cursor: "pointer", font: "inherit",
              background: "var(--card)",
              border: "1px solid var(--border)",
              color: "var(--foreground)",
              position: "relative",
            }}>
              <div style={{
                width: 40, height: 40, borderRadius: 12, flex: "0 0 auto",
                background: "var(--muted)", color: "var(--muted-foreground)",
                display: "inline-flex", alignItems: "center", justifyContent: "center",
              }}>{m.icon}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 600, display: "flex", alignItems: "center", gap: 8 }}>
                  {m.t}
                  {window.LockBadge && <window.LockBadge size="sm"/>}
                </div>
                <div className="muted small" style={{ marginTop: 2 }}>{m.s}</div>
              </div>
              <svg className="ic-sm chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--muted-foreground)" }}><path d="M9 18l6-6-6-6"/></svg>
            </button>
          ))}
        </div>

        <button className="btn btn-primary btn-lg btn-block" disabled={mode === "tv"}>Continue</button>
      </div>
      <FigPillNav active="extras"/>
    </Phone>
  );
}

// 2b · Wireless setup — pick source, layout type, and (if TV) placement.
// Layout types:
//   • TV / Monitor — strip wraps a screen; we sample screen edges
//   • 2D           — separate light fixtures placed on a flat 2D grid
//   • Pixel layout — individual pixel-mapped LEDs at custom (x,y) positions
function ScreenLightSyncWireless() {
  const [castSource, setCastSource] = React.useState("computer");
  const [layoutType, setLayoutType] = React.useState("tv");
  const [placement, setPlacement]   = React.useState("behind");

  const layoutTypes = [
    {
      id: "tv",
      t: "TV / Monitor",
      s: "Strip behind or around a screen.",
      diagram: (
        <div style={{ width: 96, height: 60, position: "relative" }}>
          {/* TV */}
          <div style={{ position: "absolute", left: 12, right: 12, top: 6, bottom: 14, background: "var(--foreground)", borderRadius: 3 }}/>
          <div style={{ position: "absolute", left: 36, right: 36, bottom: 2, height: 4, background: "var(--foreground)", opacity: .35, borderRadius: 1 }}/>
          {/* Strip glow */}
          <div style={{ position: "absolute", left: 8, right: 8, top: 2, bottom: 18, border: "2.5px solid", borderImage: "linear-gradient(90deg,#a855f7,#06b6d4,#22c55e,#facc15,#ef4444) 1", borderRadius: 5, opacity: .9 }}/>
        </div>
      ),
    },
    {
      id: "2d",
      t: "2D",
      s: "Multiple lights placed on a 2D grid.",
      diagram: (
        <div style={{ width: 96, height: 60, padding: 4, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gridTemplateRows: "1fr 1fr", gap: 4 }}>
          {[ "#a855f7", "#06b6d4", "#facc15", "#22c55e", "#ef4444", "#3b82f6" ].map((c, i) => (
            <span key={i} style={{ borderRadius: 4, background: `radial-gradient(circle at 35% 30%, ${c}cc, ${c}33 70%)`, boxShadow: `0 0 6px ${c}88` }}/>
          ))}
        </div>
      ),
    },
    {
      id: "pixel",
      t: "Pixel layout",
      s: "Custom pixel-mapped LEDs in any shape.",
      diagram: (
        <div style={{ width: 96, height: 60, position: "relative" }}>
          {/* Heart-ish dot pattern */}
          {[
            [25,18,"#ef4444"],[35,12,"#ef4444"],[45,15,"#facc15"],[55,12,"#22c55e"],[65,18,"#06b6d4"],
            [22,28,"#ef4444"],[35,32,"#facc15"],[48,36,"#facc15"],[60,32,"#22c55e"],[68,28,"#06b6d4"],
            [30,40,"#ef4444"],[45,46,"#facc15"],[60,40,"#22c55e"],
            [40,50,"#facc15"],[50,50,"#facc15"],
          ].map(([x,y,c], i) => (
            <span key={i} style={{
              position: "absolute", left: x, top: y, width: 5, height: 5, borderRadius: 999,
              background: c, boxShadow: `0 0 5px ${c}`,
            }}/>
          ))}
        </div>
      ),
    },
  ];

  return (
    <Phone>
      <Header title="Wireless screen"/>
      <div style={{ flex: 1, overflow: "auto", padding: "4px 20px 100px" }}>
        <StepHeader n={1} label="Cast from"/>
        <div className="card" style={{ marginBottom: 18 }}>
          {[
            { id: "computer", t: "PixSync",         s: "Stream from a Mac, Windows, or Linux desktop." },
            { id: "phone",    t: "Phone mirroring", s: "Mirror this device's screen." },
          ].map(c => {
            const sel = castSource === c.id;
            return (
              <button key={c.id} onClick={() => setCastSource(c.id)} className="row" style={{
                width: "100%", border: 0, background: "transparent", textAlign: "left", cursor: "pointer", font: "inherit",
              }}>
                <div className="icon-wrap" style={{ background: sel ? "var(--primary-soft)" : "var(--muted)", color: sel ? "var(--primary)" : "var(--foreground)" }}>
                  {c.id === "computer"
                    ? <svg className="ic-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="13" rx="2"/><path d="M9 20h6M12 16v4"/></svg>
                    : <svg className="ic-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="2" width="12" height="20" rx="2.5"/><path d="M11 18h2"/></svg>}
                </div>
                <div className="label-wrap"><div className="t">{c.t}</div><div className="s">{c.s}</div></div>
                <span aria-hidden style={{
                  width: 20, height: 20, borderRadius: 999,
                  border: sel ? "6px solid var(--primary)" : "1.5px solid var(--border-strong)",
                  background: "var(--background)", boxSizing: "border-box",
                }}/>
              </button>
            );
          })}
        </div>

        <StepHeader n={2} label="Layout type"/>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 18 }}>
          {layoutTypes.map(l => {
            const sel = layoutType === l.id;
            return (
              <button key={l.id} onClick={() => setLayoutType(l.id)} style={{
                padding: 10, borderRadius: 14,
                background: sel ? "var(--primary-soft)" : "var(--card)",
                border: sel ? "1.5px solid var(--primary)" : "1px solid var(--border)",
                cursor: "pointer", textAlign: "center", font: "inherit", color: "var(--foreground)",
                display: "flex", flexDirection: "column", gap: 6, alignItems: "center",
              }}>
                <div style={{ background: "var(--muted)", borderRadius: 8, padding: 4 }}>{l.diagram}</div>
                <div>
                  <div style={{ fontSize: 12.5, fontWeight: 600 }}>{l.t}</div>
                  <div className="muted small" style={{ fontSize: 10.5, marginTop: 2, lineHeight: 1.3 }}>{l.s}</div>
                </div>
              </button>
            );
          })}
        </div>

        {layoutType === "tv" && (
          <>
            <StepHeader n={3} label="TV placement"/>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 12 }}>
              {[
                { id: "behind", t: "Behind the TV",     s: "Strip wraps the back edge." },
                { id: "around", t: "Behind TV + Other", s: "Strip plus other room lights." },
              ].map(p => {
                const sel = placement === p.id;
                return (
                  <button key={p.id} onClick={() => setPlacement(p.id)} style={{
                    padding: 14, borderRadius: 14,
                    background: sel ? "var(--primary-soft)" : "var(--card)",
                    border: sel ? "1.5px solid var(--primary)" : "1px solid var(--border)",
                    cursor: "pointer", textAlign: "center", font: "inherit", color: "var(--foreground)",
                    display: "flex", flexDirection: "column", gap: 10, alignItems: "center",
                  }}>
                    <div style={{ width: 96, height: 60, borderRadius: 6, background: "var(--muted)", position: "relative", border: "1px solid var(--border)" }}>
                      <div style={{ position: "absolute", left: 16, right: 16, top: 8, bottom: 14, background: "var(--foreground)", borderRadius: 2 }}/>
                      <div style={{ position: "absolute", left: 36, right: 36, bottom: 4, height: 4, background: "var(--foreground)", opacity: .35, borderRadius: 1 }}/>
                      {p.id === "behind" && (
                        <div style={{ position: "absolute", inset: -4, border: "3px solid", borderImage: "linear-gradient(90deg,#a855f7,#06b6d4,#22c55e,#facc15,#ef4444) 1", borderRadius: 8, opacity: .85 }}/>
                      )}
                      {p.id === "around" && (
                        <>
                          <div style={{ position: "absolute", inset: -3, border: "2px solid #a855f7", borderRadius: 8, opacity: .55 }}/>
                          <span style={{ position: "absolute", left: -8, top: -8, width: 10, height: 10, borderRadius: 999, background: "#06b6d4", boxShadow: "0 0 6px #06b6d4" }}/>
                          <span style={{ position: "absolute", right: -8, top: -8, width: 10, height: 10, borderRadius: 999, background: "#facc15", boxShadow: "0 0 6px #facc15" }}/>
                          <span style={{ position: "absolute", left: -8, bottom: -8, width: 10, height: 10, borderRadius: 999, background: "#22c55e", boxShadow: "0 0 6px #22c55e" }}/>
                          <span style={{ position: "absolute", right: -8, bottom: -8, width: 10, height: 10, borderRadius: 999, background: "#ef4444", boxShadow: "0 0 6px #ef4444" }}/>
                        </>
                      )}
                    </div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600 }}>{p.t}</div>
                      <div className="muted small" style={{ marginTop: 2 }}>{p.s}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </>
        )}

        <div className="muted small" style={{ marginBottom: 18 }}>
          {layoutType === "tv" && (placement === "behind"
            ? "Next: set up segments on the strip wrapping the TV."
            : "Next: set up the strip behind the TV, then associate other room lights.")}
          {layoutType === "2d"    && "Next: place each light on the 2D grid that matches your room."}
          {layoutType === "pixel" && "Next: design your pixel layout — each LED gets a custom position."}
        </div>

        <button className="btn btn-primary btn-lg btn-block">Continue</button>
      </div>
      <FigPillNav active="extras"/>
    </Phone>
  );
}

// 2b·i · Segment setup — split the LED strip into segments.
// `mode` switches the preview:
//   • "tv"   — strip drawn wrapping a TV (top / right / bottom / left)
//   • "flat" — flat horizontal strip (used for the 2D layout path)
function ScreenLightSyncSegments({ mode = "tv" }) {
  // For TV mode: the 4 segments are the 4 sides of the TV.
  const segments = mode === "tv"
    ? [
        { name: "SEG1", leds: 14, region: "Top",    color: "#a855f7" },
        { name: "SEG2", leds: 10, region: "Right",  color: "#06b6d4" },
        { name: "SEG3", leds: 14, region: "Bottom", color: "#22c55e" },
        { name: "SEG4", leds: 10, region: "Left",   color: "#facc15" },
      ]
    : [
        { name: "SEG1", leds: 12, region: "Section 1", color: "#a855f7" },
        { name: "SEG2", leds: 12, region: "Section 2", color: "#06b6d4" },
        { name: "SEG3", leds: 12, region: "Section 3", color: "#22c55e" },
        { name: "SEG4", leds: 12, region: "Section 4", color: "#facc15" },
      ];
  const totalLeds = segments.reduce((a, s) => a + s.leds, 0);

  // TV mode: the strip enters at one corner ("start") and traces around in
  // a chosen direction. The user picks both — START and END markers in the
  // diagram update accordingly.
  const [startCorner, setStartCorner] = React.useState("tl"); // tl | tr | br | bl
  const [clockwise,   setClockwise]   = React.useState(true);

  // Position of START / END markers based on orientation.
  const cornerStyle = (c) => ({
    tl: { top: 2,    left: 18,   right: undefined, bottom: undefined },
    tr: { top: 2,    right: 18,  left:  undefined, bottom: undefined },
    br: { bottom: 2, right: 18,  left:  undefined, top:    undefined },
    bl: { bottom: 2, left: 18,   right: undefined, top:    undefined },
  }[c]);
  // The strip terminates at the corner that's "one step before" wrapping
  // back to start in the chosen direction.
  const endCorner = clockwise
    ? ({ tl: "bl", tr: "tl", br: "tr", bl: "br" })[startCorner]
    : ({ tl: "tr", tr: "br", br: "bl", bl: "tl" })[startCorner];
  const startArrow = clockwise
    ? ({ tl: "→",  tr: "↓",  br: "←",  bl: "↑"  })[startCorner]
    : ({ tl: "↓",  tr: "←",  br: "↑",  bl: "→"  })[startCorner];

  // TV-wrap preview — strip drawn as 4 colored bars surrounding a TV diagram.
  const tvWrap = (
    <div style={{ position: "relative", width: "100%", maxWidth: 280, height: 170, margin: "0 auto" }}>
      {/* TV body */}
      <div style={{
        position: "absolute", left: 24, right: 24, top: 18, bottom: 38,
        background: "linear-gradient(180deg, var(--foreground) 0%, color-mix(in srgb, var(--foreground) 88%, var(--muted)) 100%)",
        borderRadius: 6,
        boxShadow: "inset 0 0 0 1px rgba(255,255,255,.06)",
      }}/>
      {/* TV stand */}
      <div style={{ position: "absolute", left: "50%", bottom: 22, transform: "translateX(-50%)", width: 70, height: 4, background: "var(--foreground)", opacity: .55, borderRadius: 1 }}/>
      <div style={{ position: "absolute", left: "50%", bottom: 14, transform: "translateX(-50%)", width: 110, height: 8, background: "var(--foreground)", opacity: .25, borderRadius: 2 }}/>

      {/* SEG1 — Top */}
      <div style={{
        position: "absolute", top: 6, left: 16, right: 16, height: 10,
        background: `linear-gradient(90deg, ${segments[0].color}aa, ${segments[0].color})`,
        borderRadius: 5, boxShadow: `0 0 14px ${segments[0].color}77`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 9.5, fontWeight: 700, letterSpacing: ".06em", color: "rgba(255,255,255,.95)",
      }}>{segments[0].name} · {segments[0].leds}</div>

      {/* SEG2 — Right */}
      <div style={{
        position: "absolute", top: 16, bottom: 38, right: 6, width: 10,
        background: `linear-gradient(180deg, ${segments[1].color}aa, ${segments[1].color})`,
        borderRadius: 5, boxShadow: `0 0 14px ${segments[1].color}77`,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <span style={{
          fontSize: 9.5, fontWeight: 700, letterSpacing: ".06em", color: "rgba(255,255,255,.95)",
          writingMode: "vertical-rl", transform: "rotate(180deg)",
        }}>{segments[1].name} · {segments[1].leds}</span>
      </div>

      {/* SEG3 — Bottom */}
      <div style={{
        position: "absolute", bottom: 28, left: 16, right: 16, height: 10,
        background: `linear-gradient(90deg, ${segments[2].color}, ${segments[2].color}aa)`,
        borderRadius: 5, boxShadow: `0 0 14px ${segments[2].color}77`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 9.5, fontWeight: 700, letterSpacing: ".06em", color: "rgba(255,255,255,.95)",
      }}>{segments[2].name} · {segments[2].leds}</div>

      {/* SEG4 — Left */}
      <div style={{
        position: "absolute", top: 16, bottom: 38, left: 6, width: 10,
        background: `linear-gradient(180deg, ${segments[3].color}, ${segments[3].color}aa)`,
        borderRadius: 5, boxShadow: `0 0 14px ${segments[3].color}77`,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <span style={{
          fontSize: 9.5, fontWeight: 700, letterSpacing: ".06em", color: "rgba(255,255,255,.95)",
          writingMode: "vertical-rl",
        }}>{segments[3].name} · {segments[3].leds}</span>
      </div>

      {/* START / END markers — driven by orientation state. */}
      <span style={{
        position: "absolute", ...cornerStyle(startCorner),
        fontSize: 8, fontFamily: "Geist Mono, monospace",
        color: "var(--primary)", fontWeight: 600, letterSpacing: ".06em",
      }}>START {startArrow}</span>
      <span style={{
        position: "absolute", ...cornerStyle(endCorner),
        fontSize: 8, fontFamily: "Geist Mono, monospace",
        color: "var(--muted-foreground)", letterSpacing: ".06em",
      }}>END</span>
    </div>
  );

  // Flat-strip preview — used when layout is 2D (no TV).
  const flatStrip = (
    <>
      <div style={{ display: "flex", height: 28, borderRadius: 6, overflow: "hidden", border: "1px solid rgba(0,0,0,.06)" }}>
        {segments.map((s, i) => (
          <div key={i} style={{
            flex: s.leds,
            background: `linear-gradient(90deg, ${s.color}cc, ${s.color}88)`,
            position: "relative",
            borderRight: i < segments.length - 1 ? "2px solid var(--background)" : "0",
          }}>
            <span style={{
              position: "absolute", left: 6, top: "50%", transform: "translateY(-50%)",
              fontSize: 10, fontWeight: 600, color: "rgba(255,255,255,.95)", letterSpacing: ".04em",
            }}>{s.name}</span>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", marginTop: 6 }}>
        {segments.map((s, i) => (
          <div key={i} style={{
            flex: s.leds, textAlign: "center",
            fontSize: 10, color: "var(--muted-foreground)", fontFamily: "Geist Mono, monospace",
          }}>{s.leds}</div>
        ))}
      </div>
    </>
  );

  return (
    <Phone>
      <Header title="Strip segments"/>
      <div style={{ flex: 1, overflow: "auto", padding: "4px 20px 100px" }}>
        <div className="muted" style={{ fontSize: 13, marginBottom: 14 }}>
          {mode === "tv"
            ? "Split your strip into segments wrapping the TV. Each segment lights up from its matching screen edge."
            : "Split your strip into sections. Each section maps to one region of the screen."}
        </div>

        <StepHeader n={1} label={mode === "tv" ? "Strip on the TV" : "Strip preview"}/>
        <div style={{
          background: "linear-gradient(180deg, var(--muted) 0%, var(--background) 100%)",
          border: "1px solid var(--border)",
          borderRadius: 14, padding: 14, marginBottom: 18,
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
            <span className="small muted">{totalLeds} LEDs · {segments.length} segments</span>
            <span className="small mono muted">START → END</span>
          </div>
          {mode === "tv" ? tvWrap : flatStrip}
        </div>

        {mode === "tv" && (
          <>
            <StepHeader n={2} label="Strip orientation"/>
            <div className="muted small" style={{ marginBottom: 10 }}>
              Where does the strip enter the TV, and which way does it run?
            </div>
            <div className="card" style={{ padding: 14, marginBottom: 18 }}>
              <div className="muted small" style={{ marginBottom: 8 }}>Start corner</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 14 }}>
                {[
                  { id: "tl", label: "Top-left" },
                  { id: "tr", label: "Top-right" },
                  { id: "bl", label: "Bottom-left" },
                  { id: "br", label: "Bottom-right" },
                ].map(c => {
                  const sel = startCorner === c.id;
                  // mini-TV diagram with a glowing dot at the chosen corner
                  const dot = {
                    tl: { top: 6, left: 8 },
                    tr: { top: 6, right: 8 },
                    bl: { bottom: 6, left: 8 },
                    br: { bottom: 6, right: 8 },
                  }[c.id];
                  return (
                    <button key={c.id} onClick={() => setStartCorner(c.id)} style={{
                      padding: 10, borderRadius: 12, cursor: "pointer", font: "inherit",
                      border: sel ? "1.5px solid var(--primary)" : "1px solid var(--border)",
                      background: sel ? "var(--primary-soft)" : "var(--card)",
                      color: "var(--foreground)",
                      display: "flex", alignItems: "center", gap: 10,
                    }}>
                      <div style={{ position: "relative", width: 38, height: 26, flexShrink: 0 }}>
                        <div style={{ position: "absolute", inset: "3px 4px 6px", background: "var(--foreground)", borderRadius: 3, opacity: .85 }}/>
                        <div style={{ position: "absolute", inset: -2, border: "1.5px solid color-mix(in srgb, var(--primary) 50%, transparent)", borderRadius: 5 }}/>
                        <span style={{
                          position: "absolute", ...dot, width: 7, height: 7, borderRadius: 999,
                          background: "var(--primary)", boxShadow: "0 0 6px var(--primary)",
                        }}/>
                      </div>
                      <span style={{ fontSize: 12.5, fontWeight: 600 }}>{c.label}</span>
                    </button>
                  );
                })}
              </div>

              <div className="muted small" style={{ marginBottom: 8 }}>Direction</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {[
                  { id: true,  label: "Clockwise",         icon: "↻" },
                  { id: false, label: "Counter-clockwise", icon: "↺" },
                ].map(d => {
                  const sel = clockwise === d.id;
                  return (
                    <button key={String(d.id)} onClick={() => setClockwise(d.id)} style={{
                      padding: "10px 12px", borderRadius: 12, cursor: "pointer", font: "inherit",
                      border: sel ? "1.5px solid var(--primary)" : "1px solid var(--border)",
                      background: sel ? "var(--primary-soft)" : "var(--card)",
                      color: "var(--foreground)",
                      display: "flex", alignItems: "center", gap: 8,
                    }}>
                      <span style={{
                        width: 26, height: 26, borderRadius: 8, flexShrink: 0,
                        background: sel ? "var(--primary)" : "var(--muted)",
                        color: sel ? "var(--primary-foreground)" : "var(--foreground)",
                        display: "inline-flex", alignItems: "center", justifyContent: "center",
                        fontSize: 16, fontWeight: 600,
                      }}>{d.icon}</span>
                      <span style={{ fontSize: 12.5, fontWeight: 600 }}>{d.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </>
        )}

        <StepHeader n={mode === "tv" ? 3 : 2} label="Region mapping"/>
        <div className="card" style={{ marginBottom: 18 }}>
          {segments.map((s, i) => (
            <div className="row" key={i}>
              <div className="icon-wrap" style={{ background: s.color + "22", color: s.color }}>
                <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".04em" }}>{s.name}</span>
              </div>
              <div className="label-wrap">
                <div className="t">{s.region}</div>
                <div className="s">{s.leds} LEDs</div>
              </div>
              <button className="btn btn-ghost btn-sm" style={{ color: "var(--muted-foreground)" }}>Edit</button>
            </div>
          ))}
          <div className="row">
            <div className="icon-wrap" style={{ background: "var(--muted)", color: "var(--muted-foreground)" }}>
              <svg className="ic-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"/></svg>
            </div>
            <div className="label-wrap"><div className="t" style={{ color: "var(--primary)" }}>Add segment</div></div>
          </div>
        </div>

        <button className="btn btn-primary btn-lg btn-block">Continue</button>
        <button className="btn btn-ghost btn-block" style={{ marginTop: 6 }}>Auto-detect from calibration</button>
      </div>
      <FigPillNav active="extras"/>
    </Phone>
  );
}

// 2b·ii · Associate room lights — only when "Behind TV + Other" is chosen.
// The center 2 cells render as one composite TV+Strip unit (the strip
// physically wraps the TV) instead of two separate cells side by side.
function ScreenLightSyncAssociate() {
  const cols = 4, rows = 3;
  // Center cells (1,1) and (1,2) are reserved by the TV+Strip composite.
  const placed = {
    "0,0": { color: "#a855f7", name: "Lyt 1" },
    "0,3": { color: "#06b6d4", name: "Lyt 2" },
    "2,0": { color: "#facc15", name: "Lamp" },
    "2,3": { color: "#ef4444", name: "Bulb" },
  };
  const unassigned = [
    { color: "#fb923c", name: "Lyt 3" },
    { color: "#3b82f6", name: "Sconce" },
  ];
  return (
    <Phone>
      <Header title="Associate lights"/>
      <div style={{ flex: 1, overflow: "auto", padding: "4px 20px 100px" }}>
        <div className="muted" style={{ fontSize: 13, marginBottom: 14 }}>
          Place each light at its physical position around the TV. Their color follows the matching screen region.
        </div>

        <StepHeader n={1} label="Map lights to room"/>
        <div style={{
          position: "relative",
          background: "linear-gradient(180deg, var(--muted) 0%, var(--background) 100%)",
          border: "1px solid var(--border)",
          borderRadius: 14, padding: 12,
          marginBottom: 12,
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span className="small muted" style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
              <span style={{ width: 6, height: 6, borderRadius: 999, background: "var(--primary)" }}/>
              Top of screen
            </span>
            <span className="small muted">{Object.keys(placed).length} placed · {unassigned.length} unassigned</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gridTemplateRows: `repeat(${rows}, 1fr)`, gap: 6 }}>
            {Array.from({ length: rows * cols }).map((_, i) => {
              const r = Math.floor(i / cols), c = i % cols;
              // Skip rendering the cells covered by the composite TV+Strip span.
              if (r === 1 && (c === 1 || c === 2)) return null;
              const cell = placed[`${r},${c}`];
              return (
                <div key={i} style={{
                  aspectRatio: "1 / 1",
                  borderRadius: 10,
                  border: cell ? "0" : "1.5px dashed var(--border-strong)",
                  background: cell
                    ? `radial-gradient(circle at 35% 30%, ${cell.color}cc, ${cell.color}55 70%)`
                    : "transparent",
                  boxShadow: cell ? `0 0 14px ${cell.color}80, inset 0 0 0 1px ${cell.color}` : "none",
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                  color: cell ? "#fff" : "var(--muted-foreground)",
                  fontSize: 10, fontWeight: 600, letterSpacing: ".02em",
                  cursor: cell ? "grab" : "pointer",
                }}>
                  {cell ? cell.name : ""}
                </div>
              );
            })}

            {/* TV + Strip composite — spans 2 columns in the middle row */}
            <div style={{
              gridColumn: "2 / span 2",
              gridRow: "2",
              position: "relative",
              borderRadius: 10,
              padding: 6,
            }}>
              {/* Wrapping strip — gradient border */}
              <div style={{
                position: "absolute", inset: 0, borderRadius: 10,
                padding: 3,
                background: "linear-gradient(90deg,#a855f7,#06b6d4,#22c55e,#facc15,#ef4444)",
                boxShadow: "0 0 16px rgba(168,85,247,.55), 0 0 22px rgba(34,197,94,.35)",
              }}>
                {/* Inner cutout (TV body) */}
                <div style={{
                  position: "absolute", inset: 3, borderRadius: 8,
                  background: "linear-gradient(180deg, var(--foreground) 0%, color-mix(in srgb, var(--foreground) 88%, var(--muted)) 100%)",
                  display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                  color: "var(--background)",
                }}>
                  <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".06em" }}>TV + Strip</span>
                  <span style={{ fontSize: 9, opacity: .6, marginTop: 2, fontFamily: "Geist Mono, monospace" }}>48 LEDs · 4 SEG</span>
                </div>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "center", marginTop: 8 }}>
            <span className="small muted">Bottom of screen</span>
          </div>
        </div>

        <StepHeader n={2} label="Unassigned"/>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 18 }}>
          {unassigned.map((u, i) => (
            <span key={i} style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              padding: "6px 10px 6px 6px", borderRadius: 999,
              background: "var(--card)", border: "1px solid var(--border)",
              fontSize: 12, fontWeight: 500,
            }}>
              <span style={{
                width: 16, height: 16, borderRadius: 999,
                background: `radial-gradient(circle at 35% 30%, ${u.color}, ${u.color}88)`,
                boxShadow: `0 0 8px ${u.color}66`,
              }}/>
              {u.name}
            </span>
          ))}
        </div>

        <button className="btn btn-primary btn-lg btn-block">Save and calibrate</button>
        <button className="btn btn-ghost btn-block" style={{ marginTop: 6 }}>Skip · use strip only</button>
      </div>
      <FigPillNav active="extras"/>
    </Phone>
  );
}

// 2b·iii · Pixel layout — freeform pixel-mapping. Each LED has a custom
// (x, y) on the screen so abstract shapes (matrix walls, custom signs)
// can sample colors from arbitrary screen pixels.
function ScreenLightSyncPixelLayout() {
  // Sample pattern — 22 LEDs forming a heart shape in screen-space.
  const pixels = [
    // Row 1
    [22, 18, "#ef4444"], [32, 14, "#ef4444"], [42, 16, "#ef4444"],
    [58, 16, "#ef4444"], [68, 14, "#ef4444"], [78, 18, "#ef4444"],
    // Row 2
    [18, 28, "#f97316"], [30, 28, "#f97316"], [42, 30, "#facc15"],
    [50, 32, "#facc15"], [58, 30, "#facc15"], [70, 28, "#f97316"], [82, 28, "#f97316"],
    // Row 3
    [22, 40, "#22c55e"], [34, 42, "#22c55e"], [50, 46, "#22c55e"],
    [66, 42, "#22c55e"], [78, 40, "#22c55e"],
    // Row 4
    [30, 52, "#06b6d4"], [44, 56, "#06b6d4"], [56, 56, "#06b6d4"], [70, 52, "#06b6d4"],
    // Row 5
    [40, 64, "#a855f7"], [50, 66, "#a855f7"], [60, 64, "#a855f7"],
  ];
  return (
    <Phone>
      <Header title="Pixel layout"/>
      <div style={{ flex: 1, overflow: "auto", padding: "4px 20px 100px" }}>
        <div className="muted" style={{ fontSize: 13, marginBottom: 14 }}>
          Place each LED at the spot on your screen it should sample from. Useful for matrices, signs, and custom shapes.
        </div>

        <StepHeader n={1} label="Pixel canvas"/>
        <div style={{
          position: "relative",
          background: "linear-gradient(180deg, var(--muted) 0%, var(--background) 100%)",
          border: "1px solid var(--border)",
          borderRadius: 14, padding: 12,
          marginBottom: 12,
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span className="small muted" style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
              <span style={{ width: 6, height: 6, borderRadius: 999, background: "var(--primary)" }}/>
              Screen mapping
            </span>
            <span className="small mono muted">{pixels.length} LEDs</span>
          </div>

          {/* Canvas */}
          <div style={{
            position: "relative", width: "100%", aspectRatio: "16 / 10",
            background:
              "repeating-linear-gradient(0deg, transparent 0 19px, color-mix(in srgb, var(--primary) 8%, transparent) 19px 20px)," +
              "repeating-linear-gradient(90deg, transparent 0 19px, color-mix(in srgb, var(--primary) 8%, transparent) 19px 20px)," +
              "var(--background)",
            border: "1px dashed var(--border-strong)",
            borderRadius: 10,
            overflow: "hidden",
          }}>
            {/* Corner labels */}
            <span className="small mono muted" style={{ position: "absolute", top: 4, left: 6, fontSize: 9, letterSpacing: ".06em" }}>0,0</span>
            <span className="small mono muted" style={{ position: "absolute", bottom: 4, right: 6, fontSize: 9, letterSpacing: ".06em" }}>1920,1080</span>

            {pixels.map(([x, y, c], i) => (
              <span key={i} style={{
                position: "absolute",
                left: `${x}%`, top: `${y}%`,
                transform: "translate(-50%, -50%)",
                width: 12, height: 12, borderRadius: 999,
                background: `radial-gradient(circle at 35% 30%, ${c}, ${c}88)`,
                boxShadow: `0 0 10px ${c}, 0 0 0 2px var(--background)`,
              }}/>
            ))}
          </div>
        </div>

        <StepHeader n={2} label="Tools"/>
        <div className="card" style={{ marginBottom: 18 }}>
          <div className="row">
            <div className="icon-wrap" style={{ background: "var(--primary-soft)", color: "var(--primary)" }}>
              <svg className="ic-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"/></svg>
            </div>
            <div className="label-wrap"><div className="t">Add LED</div><div className="s">Tap on the canvas to place</div></div>
            <svg className="ic-sm chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
          </div>
          <div className="row">
            <div className="icon-wrap"><svg className="ic-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg></div>
            <div className="label-wrap"><div className="t">Generate matrix</div><div className="s">Even rows × cols grid</div></div>
            <svg className="ic-sm chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
          </div>
          <div className="row">
            <div className="icon-wrap"><svg className="ic-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M7 10l5-5 5 5"/><path d="M12 5v12"/></svg></div>
            <div className="label-wrap"><div className="t">Import positions</div><div className="s">Paste CSV or scan from device</div></div>
            <svg className="ic-sm chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
          </div>
        </div>

        <button className="btn btn-primary btn-lg btn-block">Continue</button>
      </div>
      <FigPillNav active="extras"/>
    </Phone>
  );
}

// 2c · Audio reactive setup — pick mic vs. system audio + sensitivity
function ScreenLightSyncAudio() {
  const [audioSource, setAudioSource] = React.useState("mic");
  return (
    <Phone>
      <Header title="Audio reactive"/>
      <div style={{ flex: 1, overflow: "auto", padding: "4px 20px 100px" }}>
        <StepHeader n={1} label="Audio source"/>
        <div className="card" style={{ marginBottom: 18 }}>
          {[
            { id: "mic",    t: "PixC Mic",                 s: "Use the device's built-in microphone." },
            { id: "stream", t: "Current device audio",     s: "Use the audio currently playing on this phone." },
          ].map(s => {
            const sel = audioSource === s.id;
            return (
              <button key={s.id} onClick={() => setAudioSource(s.id)} className="row" style={{
                width: "100%", border: 0, background: "transparent", textAlign: "left", cursor: "pointer", font: "inherit",
              }}>
                <div className="icon-wrap" style={{ background: sel ? "var(--primary-soft)" : "var(--muted)", color: sel ? "var(--primary)" : "var(--foreground)" }}>
                  {s.id === "mic"
                    ? <svg className="ic-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3M9 21h6"/></svg>
                    : <svg className="ic-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>}
                </div>
                <div className="label-wrap"><div className="t">{s.t}</div><div className="s">{s.s}</div></div>
                <span aria-hidden style={{
                  width: 20, height: 20, borderRadius: 999,
                  border: sel ? "6px solid var(--primary)" : "1.5px solid var(--border-strong)",
                  background: "var(--background)", boxSizing: "border-box",
                }}/>
              </button>
            );
          })}
        </div>

        <StepHeader n={2} label="Reactive tuning"/>
        <div className="card" style={{ padding: 14, marginBottom: 18 }}>
          {[
            { t: "Sensitivity", v: 65 },
            { t: "Bass response", v: 80 },
            { t: "Treble response", v: 45 },
          ].map((s, i, arr) => (
            <div key={s.t} style={{ marginBottom: i === arr.length - 1 ? 0 : 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span className="small" style={{ fontWeight: 500 }}>{s.t}</span>
                <span className="mono small muted">{s.v}%</span>
              </div>
              <input type="range" className="range" defaultValue={s.v}/>
            </div>
          ))}
        </div>

        <StepHeader n={3} label="Live preview"/>
        <div style={{
          height: 80, borderRadius: 14, marginBottom: 18,
          background: "linear-gradient(90deg,#ef4444,#facc15,#22c55e,#06b6d4,#a855f7)",
          backgroundSize: "200% 100%",
          animation: "fx-pan-x 4s linear infinite",
          position: "relative", overflow: "hidden",
        }}>
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "flex-end", justifyContent: "center", gap: 4, padding: "0 16px 12px" }}>
            {Array.from({ length: 24 }).map((_, i) => (
              <span key={i} style={{
                width: 4, borderRadius: 2,
                height: 12 + Math.abs(Math.sin(i * 0.7)) * 38,
                background: "rgba(255,255,255,.85)",
              }}/>
            ))}
          </div>
        </div>

        <button className="btn btn-primary btn-lg btn-block">Start reactive sync</button>
      </div>
      <FigPillNav active="extras"/>
    </Phone>
  );
}

// 3 · LightSync · running detail (active mode)
function ScreenLightSync({ mode = "tv" }) {
  const heroByMode = {
    tv:       { label: "Living room · TV",          gradient: "linear-gradient(135deg,#a855f7,#3b82f6,#06b6d4)" },
    wireless: { label: "Office · PixSync",          gradient: "linear-gradient(135deg,#0ea5e9,#22c55e,#facc15)" },
    audio:    { label: "Living room · PixC Mic",    gradient: "linear-gradient(135deg,#ef4444,#f97316,#facc15)" },
  };
  const hero = heroByMode[mode] || heroByMode.tv;
  return (
    <Phone>
      <Header title="LightSync"/>
      <div style={{ flex: 1, overflow: "auto", padding: "0 20px 100px" }}>
        <div className="card iot-glow-soft" style={{
          padding: 20, marginBottom: 16,
          background: hero.gradient,
          color: "white", border: "none",
          boxShadow: "0 14px 40px -12px " + (hero.gradient.match(/#[0-9a-f]{3,8}/i)?.[0] || "var(--primary)") + "88, inset 0 1px 0 rgba(255,255,255,.18)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span className="iot-dot" style={{ background: "rgba(255,255,255,.95)" }}/>
            <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: ".08em", opacity: .9 }}>Currently syncing</div>
          </div>
          <div style={{ fontSize: 22, fontWeight: 600, marginTop: 4 }}>{hero.label}</div>
          <div style={{ marginTop: 12, display: "flex", gap: 6 }}>
            {["#fef3c7","#a855f7","#06b6d4","#22c55e","#ef4444"].map(c => (
              <span key={c} style={{ width: 32, height: 6, borderRadius: 3, background: c }}/>
            ))}
          </div>
        </div>

        <div className="muted small" style={{ marginBottom: 8, textTransform: "uppercase", letterSpacing: ".06em", fontWeight: 500 }}>Mode</div>
        <div className="card" style={{ marginBottom: 16 }}>
          {LIGHTSYNC_MODES.map(m => (
            <div className="row" key={m.id}>
              <div className="icon-wrap" style={{ background: m.id === mode ? "var(--primary-soft)" : "var(--muted)", color: m.id === mode ? "var(--primary)" : "var(--foreground)" }}>
                {m.icon}
              </div>
              <div className="label-wrap"><div className="t">{m.title}</div><div className="s">{m.sub}</div></div>
              <label className="switch"><input type="checkbox" defaultChecked={m.id === mode}/><span className="track"><span className="thumb"/></span></label>
            </div>
          ))}
        </div>

        <div className="muted small" style={{ marginBottom: 8, textTransform: "uppercase", letterSpacing: ".06em", fontWeight: 500 }}>Tuning</div>
        <div className="card" style={{ padding: 14 }}>
          {[
            { t: "Intensity", v: 75 }, { t: "Saturation", v: 90 }, { t: "Smoothing", v: 40 },
          ].map((s, i, arr) => (
            <div key={s.t} style={{ marginBottom: i === arr.length - 1 ? 0 : 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span className="small" style={{ fontWeight: 500 }}>{s.t}</span>
                <span className="mono small muted">{s.v}%</span>
              </div>
              <input type="range" className="range" defaultValue={s.v}/>
            </div>
          ))}
        </div>
      </div>
      <FigPillNav active="extras"/>
    </Phone>
  );
}

// ===== Presets gallery =====
function ScreenPresets() {
  const presets = [
    { t: "Movie night", c: "linear-gradient(135deg,#7c3aed,#1e1b4b)" },
    { t: "Reading", c: "linear-gradient(135deg,#fde68a,#f59e0b)" },
    { t: "Focus", c: "linear-gradient(135deg,#fafafa,#e4e4e7)" },
    { t: "Dinner", c: "linear-gradient(135deg,#fb923c,#9a3412)" },
    { t: "Party", c: "conic-gradient(from 0deg,#ec4899,#facc15,#22c55e,#06b6d4,#a855f7,#ec4899)" },
    { t: "Sleep", c: "linear-gradient(135deg,#1e1b4b,#0a0a0a)" },
    { t: "Gaming", c: "linear-gradient(135deg,#22c55e,#0ea5e9)" },
    { t: "Sunset", c: "linear-gradient(135deg,#f59e0b,#fb7185,#a855f7)" },
    { t: "Forest", c: "linear-gradient(135deg,#16a34a,#365314)" },
    { t: "Custom +", c: "var(--muted)", add: true },
  ];
  return (
    <Phone>
      <Header title="Presets" right={<button className="btn btn-outline btn-sm">New</button>}/>
      <div style={{ flex: 1, overflow: "auto", padding: "0 20px 100px" }}>
        <div className="muted small" style={{ marginBottom: 12 }}>Tap to apply · long-press to edit</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {presets.map(p => (
            <div key={p.t} className="card" style={{ padding: 0, overflow: "hidden", cursor: "pointer" }}>
              <div style={{
                height: 90, background: p.c,
                display: p.add ? "flex" : "block",
                alignItems: "center", justifyContent: "center",
                color: p.add ? "var(--muted-foreground)" : "transparent",
                fontSize: 28, fontWeight: 300,
              }}>{p.add ? "+" : ""}</div>
              <div style={{ padding: "10px 12px", fontSize: 13, fontWeight: 600 }}>{p.t.replace(" +", "")}</div>
            </div>
          ))}
        </div>
      </div>
      <FigPillNav active="extras"/>
    </Phone>
  );
}

// ===== Misc settings — power-on behavior, indicator LED, locale, debug =====
function ScreenMiscSettings() {
  return (
    <Phone>
      <Header title="Misc settings"/>
      <div style={{ flex: 1, overflow: "auto", padding: "0 20px 100px" }}>

        <div className="muted small" style={{ marginBottom: 8, textTransform: "uppercase", letterSpacing: ".06em", fontWeight: 500 }}>Power behavior</div>
        <div className="card" style={{ marginBottom: 16 }}>
          <div className="row">
            <div className="label-wrap"><div className="t">After power loss</div><div className="s">Restore to last state</div></div>
            <svg className="ic-sm chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
          </div>
          <div className="row">
            <div className="label-wrap"><div className="t">Default brightness</div><div className="s">When turning on</div></div>
            <div className="s mono" style={{ color: "var(--muted-foreground)" }}>80%</div>
          </div>
          <div className="row">
            <div className="label-wrap"><div className="t">Slow fade on/off</div><div className="s">Smooth transition · 800 ms</div></div>
            <label className="switch"><input type="checkbox" defaultChecked/><span className="track"><span className="thumb"/></span></label>
          </div>
        </div>

        <div className="muted small" style={{ marginBottom: 8, textTransform: "uppercase", letterSpacing: ".06em", fontWeight: 500 }}>Indicator LED</div>
        <div className="card" style={{ marginBottom: 16 }}>
          <div className="row">
            <div className="label-wrap"><div className="t">Status LED</div><div className="s">Tiny LED on PCB</div></div>
            <label className="switch"><input type="checkbox" defaultChecked/><span className="track"><span className="thumb"/></span></label>
          </div>
          <div className="row">
            <div className="label-wrap"><div className="t">Blink during pairing</div></div>
            <label className="switch"><input type="checkbox" defaultChecked/><span className="track"><span className="thumb"/></span></label>
          </div>
        </div>

        <div className="muted small" style={{ marginBottom: 8, textTransform: "uppercase", letterSpacing: ".06em", fontWeight: 500 }}>Time &amp; locale</div>
        <div className="card" style={{ marginBottom: 16 }}>
          <div className="row">
            <div className="label-wrap"><div className="t">Time zone</div></div>
            <div className="s" style={{ color: "var(--muted-foreground)" }}>Asia/Kolkata</div>
          </div>
          <div className="row">
            <div className="label-wrap"><div className="t">24-hour clock</div></div>
            <label className="switch"><input type="checkbox"/><span className="track"><span className="thumb"/></span></label>
          </div>
        </div>

        <div className="muted small" style={{ marginBottom: 8, textTransform: "uppercase", letterSpacing: ".06em", fontWeight: 500 }}>Diagnostics</div>
        <div className="card" style={{ marginBottom: 16 }}>
          <div className="row">
            <div className="label-wrap"><div className="t">Send anonymous diagnostics</div><div className="s">Crash reports, never your data</div></div>
            <label className="switch"><input type="checkbox" defaultChecked/><span className="track"><span className="thumb"/></span></label>
          </div>
          <div className="row">
            <div className="label-wrap"><div className="t">Verbose logging</div><div className="s">For troubleshooting only</div></div>
            <label className="switch"><input type="checkbox"/><span className="track"><span className="thumb"/></span></label>
          </div>
          <div className="row">
            <div className="label-wrap" style={{ color: "var(--primary)" }}><div className="t">Reboot device</div></div>
            <svg className="ic-sm chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
          </div>
          <div className="row" style={{ color: "var(--destructive)" }}>
            <div className="label-wrap"><div className="t">Factory reset</div><div className="s" style={{ color: "var(--destructive)" }}>Erases Wi-Fi &amp; pairing</div></div>
            <svg className="ic-sm chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
          </div>
        </div>

      </div>
      <FigPillNav active="extras"/>
    </Phone>
  );
}

Object.assign(window, {
  ScreenDeviceColor, ScreenDeviceEffects, ScreenSchedule,
  ScreenAppLock,
  ScreenDeviceSettings, ScreenDeviceExtras,
  ScreenLightSync, ScreenLightSyncSetup, ScreenLightSyncWireless, ScreenLightSyncAudio,
  ScreenLightSyncSegments, ScreenLightSyncAssociate, ScreenLightSyncPixelLayout,
  ScreenPresets,
  ScreenPalettes, ScreenSegments, ScreenMiscSettings,
  ScreenStripTypePicker, ScreenPowerPlanPicker, ScreenRemoveDevice,
  FigPillNav, ColorWheel, DeviceTopBar, DeviceIcon, PillTabs,
});

// ===== Strip type picker — bottom sheet over Device settings =====
function ScreenStripTypePicker() {
  const types = [
    { id: "ws2812b", name: "WS2812B", sub: "Most common · GRB · 5 V",       leds: "5 V · 60 mA / LED",  selected: true  },
    { id: "ws2811",  name: "WS2811",  sub: "12 V · GRB · 3-LED groups",     leds: "12 V · 240 mA / 3 LED" },
    { id: "ws2815",  name: "WS2815",  sub: "12 V · GRB · backup data line", leds: "12 V · 60 mA / LED" },
    { id: "sk6812",  name: "SK6812 RGBW", sub: "RGB + dedicated white",     leds: "5 V · 60 mA / LED" },
    { id: "apa102",  name: "APA102 / DotStar", sub: "Two-wire SPI · BGR",   leds: "5 V · 60 mA / LED" },
    { id: "lpd8806", name: "LPD8806", sub: "Older two-wire SPI · GRB",      leds: "5 V · 30 mA / LED" },
    { id: "custom",  name: "Custom…", sub: "Pick chipset, color order, voltage manually" },
  ];
  return (
    <Phone>
      <div style={{
        position: "absolute", inset: 0,
        background: "var(--overlay-scrim)",
        backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)",
        display: "flex", alignItems: "flex-end", justifyContent: "center",
      }}>
        <div onClick={e => e.stopPropagation()} style={{
          width: "100%",
          background: "var(--card)",
          borderTopLeftRadius: 20, borderTopRightRadius: 20,
          padding: "16px 18px calc(28px + env(safe-area-inset-bottom, 0))",
          boxShadow: "0 -10px 40px -10px rgba(0,0,0,.35), 0 0 0 1px var(--border)",
          maxHeight: "92%",
          display: "flex", flexDirection: "column",
        }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 10 }}>
            <span style={{ width: 36, height: 4, borderRadius: 999, background: "var(--border-strong)" }}/>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
            <div style={{ fontSize: 16, fontWeight: 600, letterSpacing: "-0.01em" }}>Strip type</div>
            <button className="btn btn-ghost btn-icon-sm" aria-label="Close">
              <svg className="ic-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
          </div>
          <div className="muted small" style={{ marginBottom: 12 }}>
            Pick the chipset that matches your strip. Wrong type can damage LEDs at full brightness.
          </div>

          <div style={{ flex: 1, overflow: "auto", display: "flex", flexDirection: "column", gap: 8 }}>
            {types.map(t => (
              <button key={t.id} className="card" style={{
                width: "100%", padding: 12,
                display: "flex", alignItems: "center", gap: 12,
                textAlign: "left", cursor: "pointer", font: "inherit",
                background: t.selected ? "var(--primary-soft)" : "var(--card)",
                border: t.selected ? "1.5px solid var(--primary)" : "1px solid var(--border)",
                color: "var(--foreground)",
              }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 10, flex: "0 0 auto",
                  background: t.selected ? "var(--primary)" : "var(--muted)",
                  color: t.selected ? "var(--primary-foreground)" : "var(--foreground)",
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="9" width="20" height="6" rx="1.5"/><path d="M5 12h.01M9 12h.01M13 12h.01M17 12h.01M21 12h.01"/></svg>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13.5, fontWeight: 600 }}>{t.name}</div>
                  <div className="muted small" style={{ marginTop: 1 }}>{t.sub}</div>
                </div>
                {t.leds && <span className="mono small muted" style={{ flexShrink: 0, fontSize: 10.5 }}>{t.leds}</span>}
                <span aria-hidden style={{
                  width: 18, height: 18, borderRadius: 999,
                  border: t.selected ? "5px solid var(--primary)" : "1.5px solid var(--border-strong)",
                  background: "var(--background)", boxSizing: "border-box", flexShrink: 0,
                }}/>
              </button>
            ))}
          </div>

          <button className="btn btn-primary btn-lg btn-block" style={{ marginTop: 14 }}>Save</button>
        </div>
      </div>
    </Phone>
  );
}

// ===== Power plan picker — same bottom-sheet treatment =====
function ScreenPowerPlanPicker() {
  const plans = [
    { id: "balanced",    name: "Balanced",    sub: "Brightness capped at 75%. Recommended.",  spec: "75%",     selected: true },
    { id: "performance", name: "Performance", sub: "Full brightness, no cap.",                spec: "100%" },
    { id: "eco",         name: "Eco",         sub: "Brightness capped at 50% to save power.", spec: "50%" },
  ];
  return (
    <Phone>
      <div style={{
        position: "absolute", inset: 0,
        background: "var(--overlay-scrim)",
        backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)",
        display: "flex", alignItems: "flex-end", justifyContent: "center",
      }}>
        <div style={{
          width: "100%",
          background: "var(--card)",
          borderTopLeftRadius: 20, borderTopRightRadius: 20,
          padding: "16px 18px calc(28px + env(safe-area-inset-bottom, 0))",
          boxShadow: "0 -10px 40px -10px rgba(0,0,0,.35), 0 0 0 1px var(--border)",
        }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 10 }}>
            <span style={{ width: 36, height: 4, borderRadius: 999, background: "var(--border-strong)" }}/>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
            <div style={{ fontSize: 16, fontWeight: 600, letterSpacing: "-0.01em" }}>Power plan</div>
            <button className="btn btn-ghost btn-icon-sm" aria-label="Close">
              <svg className="ic-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
          </div>
          <div className="muted small" style={{ marginBottom: 12 }}>
            Caps total current draw and brightness. Protects the strip and PSU on long runs.
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {plans.map(p => (
              <button key={p.id} className="card" style={{
                width: "100%", padding: 12,
                display: "flex", alignItems: "center", gap: 12,
                textAlign: "left", cursor: "pointer", font: "inherit",
                background: p.selected ? "var(--primary-soft)" : "var(--card)",
                border: p.selected ? "1.5px solid var(--primary)" : "1px solid var(--border)",
                color: "var(--foreground)",
              }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 10, flex: "0 0 auto",
                  background: p.selected ? "var(--primary)" : "var(--muted)",
                  color: p.selected ? "var(--primary-foreground)" : "var(--foreground)",
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L4.5 14h6L9 22l8.5-12h-6L13 2z"/></svg>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13.5, fontWeight: 600 }}>{p.name}</div>
                  <div className="muted small" style={{ marginTop: 1 }}>{p.sub}</div>
                </div>
                {p.spec && <span className="mono small muted" style={{ flexShrink: 0 }}>{p.spec}</span>}
                <span aria-hidden style={{
                  width: 18, height: 18, borderRadius: 999,
                  border: p.selected ? "5px solid var(--primary)" : "1.5px solid var(--border-strong)",
                  background: "var(--background)", boxSizing: "border-box", flexShrink: 0,
                }}/>
              </button>
            ))}
          </div>

          <button className="btn btn-primary btn-lg btn-block" style={{ marginTop: 14 }}>Save</button>
        </div>
      </div>
    </Phone>
  );
}

// ===== Remove device — destructive confirm dialog =====
// Factory reset is mandatory (not optional). If the device can't be
// reached for an automatic reset, the user expands inline manual-reset
// instructions on the same page.
function ScreenRemoveDevice({ showManual = false } = {}) {
  const [openManual, setOpenManual] = React.useState(showManual);
  return (
    <Phone>
      <Header title="Remove device"/>
      <div style={{ flex: 1, overflow: "auto", padding: "0 22px 24px" }}>
        <div style={{
          width: 64, height: 64, borderRadius: 16,
          background: "rgba(220,38,38,.10)", color: "var(--destructive)",
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          marginBottom: 16,
        }}>
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M6 6l1 14a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-14"/><path d="M10 11v6M14 11v6"/></svg>
        </div>

        <div className="h1" style={{ marginBottom: 6 }}>Remove PixC Lyt?</div>
        <div className="muted" style={{ fontSize: 14, marginBottom: 18 }}>
          The device will be unpaired and factory-reset. You'll need to pair it again to use it.
        </div>

        <div className="card" style={{ padding: 14, marginBottom: 18 }}>
          <div className="row" style={{ padding: "8px 0", border: 0 }}>
            <div className="icon-wrap" style={{ background: "#0a0a0a" }}><RgbMark size={20}/></div>
            <div className="label-wrap"><div className="t">PixC Lyt</div><div className="s">Living room · 200 LEDs · firmware 2.4.1</div></div>
          </div>
        </div>

        <div className="card" style={{ padding: 14, marginBottom: 18 }}>
          {[
            "All segments, presets, and palettes saved on this device",
            "Schedules and automations referencing this device will be paused",
            "Energy and event history will be retained for 90 days",
          ].map((t, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "8px 0", borderTop: i === 0 ? "0" : "1px solid var(--border)" }}>
              <span style={{ width: 6, height: 6, borderRadius: 999, background: "var(--destructive)", flexShrink: 0, marginTop: 6 }}/>
              <span style={{ fontSize: 13 }}>{t}</span>
            </div>
          ))}
        </div>

        {/* Locked, mandatory factory-reset notice — replaces the previous
            opt-in checkbox. Visually destructive to signal it's not
            negotiable. */}
        <div style={{
          display: "flex", alignItems: "flex-start", gap: 10,
          padding: "12px 12px", borderRadius: 10,
          background: "rgba(220,38,38,.06)",
          border: "1px solid rgba(220,38,38,.25)",
          color: "var(--destructive)",
          marginBottom: 12,
          opacity: .95,
        }}>
          <span style={{ width: 18, height: 18, borderRadius: 4, background: "var(--destructive)", color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
          </span>
          <div style={{ fontSize: 12.5, lineHeight: 1.45 }}>
            <span style={{ fontWeight: 600 }}>Factory reset · always</span>
            <span style={{ opacity: .9 }}> · The device wipes its credentials and pairing data. Pair it again to use it.</span>
          </div>
        </div>

        {/* Manual-reset fallback — opens inline on the same page when the
            device can't be reached over the network. */}
        <button
          type="button"
          onClick={() => setOpenManual(v => !v)}
          aria-expanded={openManual}
          className="card"
          style={{
            width: "100%", padding: "10px 12px", marginBottom: 18,
            display: "flex", alignItems: "center", gap: 10,
            cursor: "pointer", textAlign: "left", font: "inherit", color: "var(--foreground)",
          }}>
          <span style={{ width: 28, height: 28, borderRadius: 8, background: "var(--muted)", color: "var(--muted-foreground)", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5M12 16v.01"/></svg>
          </span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 500 }}>Can't connect to factory-reset?</div>
            <div className="muted small">{openManual ? "Hide manual reset steps" : "Show manual reset steps"}</div>
          </div>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--muted-foreground)", transform: openManual ? "rotate(180deg)" : "none", transition: "transform .15s" }}><path d="M6 9l6 6 6-6"/></svg>
        </button>

        {openManual && (
          <div className="card" style={{ padding: 14, marginBottom: 18 }}>
            <div className="muted small" style={{ textTransform: "uppercase", letterSpacing: ".06em", fontWeight: 500, marginBottom: 10 }}>Manual reset · PixC Lyt</div>
            <ol style={{ margin: 0, paddingLeft: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { t: "Power off the device", s: "Switch the wall plug or remove the power adapter." },
                { t: "Hold the reset button", s: "Press and hold the small button next to the USB port." },
                { t: "Power on while still holding", s: "Keep holding the button. The LED indicator will turn off." },
                { t: "Release after 10 seconds", s: "Let go when the indicator pulses white — factory reset is complete." },
                { t: "Pair the device again", s: "Open Add device on the home screen to pair it back." },
              ].map((step, i) => (
                <li key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <span style={{
                    width: 22, height: 22, borderRadius: 999,
                    background: "var(--primary-soft)", color: "var(--primary)",
                    display: "inline-flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0,
                    fontSize: 11, fontWeight: 700, fontFamily: "Geist Mono, monospace",
                  }}>{i + 1}</span>
                  <div style={{ flex: 1, paddingTop: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 500 }}>{step.t}</div>
                    <div className="muted small" style={{ marginTop: 1 }}>{step.s}</div>
                  </div>
                </li>
              ))}
            </ol>
            <div className="muted small" style={{ marginTop: 14, padding: "8px 10px", borderRadius: 8, background: "var(--muted)" }}>
              <span style={{ fontWeight: 500, color: "var(--foreground)" }}>Indicator off?</span> Try a different USB cable or power adapter, then repeat the steps.
            </div>
          </div>
        )}

        <button className="btn btn-block btn-lg" style={{ background: "var(--destructive)", color: "#fff" }}>Remove device</button>
        <button className="btn btn-ghost btn-lg btn-block" style={{ marginTop: 4 }}>Cancel</button>
      </div>
    </Phone>
  );
}
