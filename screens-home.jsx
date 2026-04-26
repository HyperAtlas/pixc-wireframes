// ===== Home, Rooms, Empty states =====

function RoomChip({ icon, label, active, count }) {
  return (
    <button style={{
      flex: "0 0 auto", border: 0, padding: 0, background: "transparent", cursor: "pointer",
      display: "flex", flexDirection: "column", alignItems: "center", gap: 8
    }}>
      <span style={{
        width: 64, height: 64, borderRadius: 16,
        background: active ? "var(--dark)" : "white",
        color: active ? "white" : "var(--foreground)",
        border: `1px solid ${active ? "var(--dark)" : "var(--border)"}`,
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        position: "relative"
      }}>
        {icon}
        {count != null && (
          <span style={{
            position: "absolute", top: -6, right: -6,
            background: "white", color: "var(--foreground)",
            border: "1px solid var(--border)",
            borderRadius: 999, minWidth: 20, height: 20, padding: "0 6px",
            fontSize: 11, fontWeight: 500,
            display: "inline-flex", alignItems: "center", justifyContent: "center"
          }}>{count}</span>
        )}
      </span>
      <span style={{ fontSize: 12, fontWeight: active ? 500 : 400, color: active ? "var(--foreground)" : "var(--muted-foreground)" }}>{label}</span>
    </button>
  );
}

// Vector icons for the device chip — bulb / strip / lamp / panel
const DEVICE_ICONS = {
  bulb: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18h6"/><path d="M10 21h4"/>
      <path d="M12 3a6 6 0 0 0-4 10.5c.7.7 1 1.6 1 2.5v1h6v-1c0-.9.3-1.8 1-2.5A6 6 0 0 0 12 3z"/>
    </svg>
  ),
  strip: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="9" width="20" height="6" rx="1.5"/>
      <path d="M5 12h.01M9 12h.01M13 12h.01M17 12h.01M21 12h.01"/>
    </svg>
  ),
  lamp: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 3h8l3 7H5l3-7z"/>
      <path d="M12 10v9"/><path d="M9 21h6"/>
    </svg>
  ),
  panel: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l9 6-9 6-9-6 9-6z"/>
      <path d="M3 9v6l9 6 9-6V9"/>
    </svg>
  ),
};

function DeviceCard({ name, room, color, kind = "bulb", on = true, brightness = 80, effect = "Solid", offline = false }) {
  const effectIcons = {
    Solid:   <svg className="ic-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="6"/></svg>,
    Breeze:  <svg className="ic-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8h11a3 3 0 1 0-3-3"/><path d="M3 13h15a3 3 0 1 1-3 3"/><path d="M3 18h7"/></svg>,
    Sunrise: <svg className="ic-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round"><path d="M5 17a7 7 0 0 1 14 0"/><path d="M3 21h18M12 6V3M5.5 8.5l-2-2M18.5 8.5l2-2"/></svg>,
    Aurora:  <svg className="ic-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round"><path d="M3 18c2-6 4-9 6-9s2 6 4 6 2-9 4-9 4 6 4 12"/></svg>,
    Pulse:   <svg className="ic-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12h4l2-7 4 14 2-7h6"/></svg>,
    Off:     <svg className="ic-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M5 5l14 14"/></svg>,
  };
  const icon = DEVICE_ICONS[kind] || DEVICE_ICONS.bulb;
  return (
    <div className={"device-card" + (on ? "" : " off")} style={{
      minHeight: 168, position: "relative",
      ...(on ? {
        background: `linear-gradient(155deg, ${color}33 0%, ${color}14 45%, #0a0a0a 100%), #0a0a0a`,
        color: "#fafafa",
        border: `1px solid ${color}40`,
        boxShadow: `0 0 0 1px ${color}10, 0 8px 24px -16px ${color}66`,
      } : {
        background: "var(--muted)",
        color: "var(--muted-foreground)",
        border: "1px solid var(--border)",
      }),
    }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 600 }}>{name}</div>
          <div className="meta" style={{ marginTop: 2, color: on ? "rgba(255,255,255,.65)" : "var(--muted-foreground)" }}>{room}</div>
        </div>
        <label className="switch">
          <input type="checkbox" defaultChecked={on}/>
          <span className="track"><span className="thumb"/></span>
        </label>
      </div>

      {/* Device icon chip — glows with the bulb color when on */}
      <div style={{
        marginTop: 14,
        width: 48, height: 48, borderRadius: 14,
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        background: on ? `radial-gradient(circle at 35% 30%, ${color}55, ${color}22 70%)` : "var(--background)",
        boxShadow: on ? `0 0 28px ${color}66, inset 0 0 0 1px ${color}55` : "inset 0 0 0 1px var(--border)",
        color: on ? "#fff" : "var(--muted-foreground)",
      }}>
        {icon}
      </div>

      <div style={{ marginTop: 14, display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: on ? "rgba(255,255,255,.85)" : "var(--muted-foreground)" }}>
        <svg className="ic-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>
        <span style={{ flex: 1 }}>{on ? `${brightness}%` : "Off"}</span>
        <span style={{ opacity: .55 }}>•</span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 4, opacity: .9 }}>
          {effectIcons[effect] || effectIcons.Solid}
          {effect}
        </span>
      </div>
    </div>
  );
}

function ScreenHome() {
  const rooms = [
    { id: "all", label: "All", count: 12, icon: <svg className="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>, active: true },
    { id: "lr", label: "Living", count: 4, icon: <svg className="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4"/><path d="M2 16a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v3h-2v-2H4v2H2v-3z"/></svg> },
    { id: "br", label: "Bedroom", count: 3, icon: <svg className="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M2 14V8h7a3 3 0 0 1 3 3v1h10v6"/><path d="M2 18h20"/><circle cx="6" cy="11" r="1.5"/></svg> },
    { id: "kt", label: "Kitchen", count: 3, icon: <svg className="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M5 3h14v6a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4V3z"/><path d="M9 13v8M15 13v8"/></svg> },
    { id: "add", label: "Add", icon: <svg className="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"/></svg> },
  ];

  return (
    <Phone>
      {/* Top bar */}
      <div style={{ padding: "8px 20px 4px", display: "flex", alignItems: "center", justifyContent: "space-between", flex: "0 0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: 999, background: "var(--muted)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 600 }}>R</div>
          <div>
            <div className="muted" style={{ fontSize: 11 }}>Good evening, Rayon</div>
            <button className="btn btn-ghost" style={{
              padding: 0, height: "auto", gap: 4,
              fontSize: 15, fontWeight: 600, letterSpacing: "-0.005em",
              color: "var(--foreground)",
            }} aria-label="Switch home">
              Rayon's apartment
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: .55 }}><path d="M6 9l6 6 6-6"/></svg>
            </button>
          </div>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          <button className="btn btn-outline btn-icon-sm" aria-label="Search">
            <svg className="ic-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>
          </button>
          <button className="btn btn-outline btn-icon-sm" aria-label="Notifications" style={{ position: "relative" }}>
            <svg className="ic-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 21a2 2 0 0 0 4 0"/></svg>
            <span style={{ position: "absolute", top: 4, right: 4, width: 7, height: 7, borderRadius: 999, background: "var(--twoto)", border: "1.5px solid white" }}/>
          </button>
        </div>
      </div>

      {/* AI Assistant + status row */}
      <div style={{ padding: "10px 20px 0", display: "flex", gap: 10 }}>
        <button className="btn" style={{
          flex: 1, height: 56, padding: "0 14px",
          background: "var(--dark)", color: "var(--dark-fg)",
          borderRadius: 14, justifyContent: "flex-start", gap: 12,
          border: "1px solid var(--dark)",
          boxShadow: "0 4px 14px -6px rgba(0,0,0,.25), 0 0 28px -8px color-mix(in srgb, var(--primary) 40%, transparent)",
          cursor: "pointer", fontFamily: "inherit",
        }}>
          <span style={{
            width: 32, height: 32, borderRadius: 10,
            background: "radial-gradient(circle at 35% 35%, #c4b5fd, #6366f1 60%, #ec4899)",
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 0 14px rgba(139,92,246,.5)",
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l1.6 4.4L18 8l-4.4 1.6L12 14l-1.6-4.4L6 8l4.4-1.6L12 2z"/><path d="M19 14l.8 2.2L22 17l-2.2.8L19 20l-.8-2.2L16 17l2.2-.8L19 14z"/></svg>
          </span>
          <span style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 1, flex: 1 }}>
            <span style={{ fontSize: 14, fontWeight: 600, letterSpacing: "-0.005em" }}>Ask PixC AI</span>
            <span style={{ fontSize: 11, color: "var(--dark-muted)", fontWeight: 400 }}>“Set the bedroom to warm 30%…”</span>
          </span>
          <svg className="ic-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--dark-muted)" }}><path d="M9 18l6-6-6-6"/></svg>
        </button>
      </div>

      <div style={{ padding: "10px 20px 0" }}>
        <div className="card" style={{ padding: "10px 12px", display: "flex", alignItems: "center", gap: 10, background: "var(--muted)" }}>
          <span className="iot-dot"/>
          <div style={{ flex: 1, fontSize: 12 }}>
            <span style={{ fontWeight: 500 }}>8 online</span>
            <span className="muted"> · 1 local · </span>
            <span className="mono" style={{ fontWeight: 500 }}>2.3 kWh</span>
            <span className="muted"> today</span>
          </div>
          <button className="btn btn-ghost btn-sm" style={{ height: 24, padding: "0 8px", fontSize: 12 }}>Details</button>
        </div>
      </div>

      {/* Rooms */}
      <div style={{ padding: "16px 0 0" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px 8px" }}>
          <div className="h3">Rooms</div>
          <button className="btn btn-ghost btn-sm" style={{ color: "var(--muted-foreground)" }}>Manage</button>
        </div>
        <div style={{ display: "flex", gap: 12, overflowX: "auto", padding: "4px 20px 8px" }}>
          {rooms.map(r => <RoomChip key={r.id} {...r}/>)}
        </div>
      </div>

      {/* Devices */}
      <div style={{ padding: "16px 20px 0", flex: 1, overflow: "hidden" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
          <div className="h3">Devices</div>
          <button className="btn btn-outline btn-sm">
            <svg className="ic-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"/></svg>
            Add
          </button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <DeviceCard name="PixC Lyt" room="Living room" color="#a855f7" kind="bulb" effect="Solid" brightness={82}/>
          <DeviceCard name="Strip 01" room="Bedroom" color="#22c55e" kind="strip" effect="Breeze" brightness={64} offline/>
          <DeviceCard name="Bulb 02" room="Kitchen" on={false} color="#f59e0b" kind="bulb" effect="Off"/>
          <DeviceCard name="Lamp" room="Hallway" color="#3b82f6" kind="lamp" effect="Solid" brightness={45}/>
        </div>
      </div>

      <div style={{ height: 32 }}/>
    </Phone>
  );
}

// Empty state when no devices found (NEW)
function ScreenNoDevices() {
  return (
    <Phone>
      <Header title="Add devices"/>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "0 24px 24px", alignItems: "center" }}>
        <div style={{ width: 220, height: 220, borderRadius: 999, background: "var(--muted)", border: "1px dashed var(--border-strong)", display: "inline-flex", alignItems: "center", justifyContent: "center", marginTop: 32 }}>
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--muted-foreground)" }}>
            <path d="M3 12c5-5 13-5 18 0"/><path d="M6.5 15.5c3-3 8-3 11 0"/><circle cx="12" cy="19" r="1"/>
          </svg>
        </div>
        <div className="h2" style={{ marginTop: 28 }}>No devices found</div>
        <div className="muted" style={{ fontSize: 14, textAlign: "center", maxWidth: 280, marginTop: 6 }}>
          Make sure your device is powered on, in pairing mode, and within 10 meters.
        </div>

        <div style={{ flex: 1 }}/>
        <button className="btn btn-primary btn-lg btn-block">Try again</button>
        <button className="btn btn-ghost btn-lg btn-block" style={{ marginTop: 4 }}>Set up manually</button>
      </div>
    </Phone>
  );
}

// Add room (NEW)
function ScreenAddRoom() {
  const icons = [
    "sofa","bed","chef","bath","desk","tv","car","yard"
  ];
  return (
    <Phone>
      <Header title="New room"/>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div style={{ flex: 1, overflow: "auto", padding: "0 24px 16px" }}>
        <label className="field-label">Name</label>
        <input className="input" defaultValue="Living room"/>

        <div className="field-label" style={{ marginTop: 16 }}>Icon</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
          {icons.map((id, i) => (
            <div key={id} style={{
              aspectRatio: "1", borderRadius: 12,
              border: `1px solid ${i === 0 ? "var(--ring)" : "var(--border)"}`,
              background: i === 0 ? "var(--foreground)" : "white",
              color: i === 0 ? "white" : "var(--foreground)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: i === 0 ? "0 0 0 3px rgba(24,24,27,.08)" : undefined
            }}>
              <svg className="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                {id === "sofa" && <><path d="M4 12V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4"/><path d="M2 16a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v3h-2v-2H4v2H2v-3z"/></>}
                {id === "bed" && <><path d="M2 14V8h7a3 3 0 0 1 3 3v1h10v6"/><path d="M2 18h20"/><circle cx="6" cy="11" r="1.5"/></>}
                {id === "chef" && <><path d="M5 3h14v6a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4V3z"/><path d="M9 13v8M15 13v8"/></>}
                {id === "bath" && <><path d="M3 11h18v3a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4v-3z"/><path d="M7 11V6a2 2 0 0 1 4 0"/><path d="M5 21l1-3M19 21l-1-3"/></>}
                {id === "desk" && <><path d="M3 7h18M5 7v13M19 7v13M3 11h18"/></>}
                {id === "tv" && <><rect x="3" y="5" width="18" height="12" rx="2"/><path d="M8 21h8M12 17v4"/></>}
                {id === "car" && <><path d="M5 11l1.5-4h11L19 11"/><path d="M3 17v-5h18v5h-2a2 2 0 0 1-4 0H9a2 2 0 0 1-4 0H3z"/></>}
                {id === "yard" && <><path d="M12 22V12"/><path d="M8 12a4 4 0 1 1 8 0"/><path d="M5 18h14"/></>}
              </svg>
            </div>
          ))}
        </div>

        <div className="field-label" style={{ marginTop: 20 }}>Devices in this room</div>
        <div className="muted small" style={{ marginBottom: 8 }}>Toggle on to add. Available devices are unassigned.</div>
        <div className="card">
          <div className="row">
            <div className="icon-wrap" style={{ background: "#a855f733", color: "#a855f7" }}>{DEVICE_ICONS.bulb}</div>
            <div className="label-wrap"><div className="t">PixC Lyt</div><div className="s" style={{ color: "var(--success)" }}>Added · Living room</div></div>
            <label className="switch"><input type="checkbox" defaultChecked/><span className="track"><span className="thumb"/></span></label>
          </div>
          <div className="row">
            <div className="icon-wrap" style={{ background: "#22c55e33", color: "#22c55e" }}>{DEVICE_ICONS.strip}</div>
            <div className="label-wrap"><div className="t">Strip 01</div><div className="s" style={{ color: "var(--success)" }}>Added · Living room</div></div>
            <label className="switch"><input type="checkbox" defaultChecked/><span className="track"><span className="thumb"/></span></label>
          </div>
        </div>

        <div className="field-label" style={{ marginTop: 18 }}>Available devices</div>
        <div className="card">
          <div className="row">
            <div className="icon-wrap" style={{ background: "#f59e0b33", color: "#f59e0b" }}>{DEVICE_ICONS.bulb}</div>
            <div className="label-wrap"><div className="t">Bulb 02</div><div className="s">Unassigned</div></div>
            <label className="switch"><input type="checkbox"/><span className="track"><span className="thumb"/></span></label>
          </div>
          <div className="row">
            <div className="icon-wrap" style={{ background: "#3b82f633", color: "#3b82f6" }}>{DEVICE_ICONS.lamp}</div>
            <div className="label-wrap"><div className="t">Lamp</div><div className="s">Hallway</div></div>
            <label className="switch"><input type="checkbox"/><span className="track"><span className="thumb"/></span></label>
          </div>
        </div>
        <div style={{ height: 24 }}/>
        </div>
        <div style={{ padding: "12px 24px 24px", borderTop: "1px solid var(--border)" }}>
          <button className="btn btn-primary btn-lg btn-block">Create room</button>
        </div>
      </div>
    </Phone>
  );
}

Object.assign(window, { ScreenHome, ScreenNoDevices, ScreenAddRoom, DeviceCard, RoomChip, DEVICE_ICONS });
