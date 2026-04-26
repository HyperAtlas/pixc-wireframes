// ===== Home, Rooms, Empty states =====

function RoomChip({ icon, label, active, count }) {
  return (
    <button style={{
      flex: "0 0 auto", border: 0, padding: 0, background: "transparent", cursor: "pointer",
      display: "flex", flexDirection: "column", alignItems: "center", gap: 8
    }}>
      <span style={{
        width: 64, height: 64, borderRadius: 16,
        background: active ? "var(--foreground)" : "var(--card)",
        color: active ? "var(--background)" : "var(--foreground)",
        border: `1px solid ${active ? "var(--foreground)" : "var(--border)"}`,
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        position: "relative"
      }}>
        {icon}
        {count != null && (
          <span style={{
            position: "absolute", top: -6, right: -6,
            background: "var(--background)", color: "var(--foreground)",
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

function ScreenHome({ activeCluster = false, activeFusion = false, homeOffline = false } = {}) {
  const [plan] = (window.usePixcPlan ? window.usePixcPlan() : ["free", () => {}]);
  const isPro = plan === "pro";
  const activeGroup = activeCluster ? { kind: "cluster", title: "Living Room PixCluster", room: "Living room", primary: "PixC Lyt", devices: 4, effect: "Aurora", brightness: 65 }
                    : activeFusion  ? { kind: "fusion",  title: "Movie night PixFusion", room: "Living room", primary: "PixC Lyt", devices: 6, effect: "Sunset", brightness: 78 }
                    : null;
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
        {homeOffline ? (
          <div className="card" style={{
            padding: "10px 12px", display: "flex", alignItems: "center", gap: 10,
            background: "rgba(220,38,38,.06)",
            border: "1px solid rgba(220,38,38,.18)",
            color: "var(--destructive)",
          }}>
            <span style={{ width: 8, height: 8, borderRadius: 999, background: "var(--destructive)", boxShadow: "0 0 0 4px rgba(220,38,38,.18)" }}/>
            <div style={{ flex: 1, fontSize: 12 }}>
              <span style={{ fontWeight: 600 }}>Working offline · local mode</span>
              <span className="muted" style={{ color: "var(--destructive)", opacity: .8 }}> · cloud unreachable, AI &amp; cloud automations paused</span>
            </div>
            <button className="btn btn-ghost btn-sm" style={{ height: 24, padding: "0 8px", fontSize: 12, color: "var(--destructive)" }}>Retry</button>
          </div>
        ) : (
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
        )}
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

      {/* Active group card — only when Pro user has an active cluster/fusion.
          Shown above the Sync tiles to signal the room/group is being driven
          as a unit. Mirrors device-card aesthetic with the same Living
          room / Online status pills as a device. */}
      {activeGroup && isPro && (
        <div style={{ padding: "16px 20px 0" }}>
          <div className="card iot-card" style={{
            padding: 14,
            display: "flex", flexDirection: "column", gap: 10,
          }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 10 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
                <span style={{
                  width: 36, height: 36, borderRadius: 10,
                  background: "var(--primary-soft)", color: "var(--primary)",
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                }}>
                  <i className={activeGroup.kind === "cluster" ? "fa-solid fa-object-group" : "fa-solid fa-layer-group"} style={{ fontSize: 16 }}/>
                </span>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, letterSpacing: "-0.005em" }}>{activeGroup.title}</div>
                  <div className="muted small" style={{ fontSize: 11, marginTop: 1 }}>{activeGroup.devices} devices · primary <span style={{ color: "var(--foreground)", fontWeight: 500 }}>{activeGroup.primary}</span></div>
                </div>
              </div>
              <label className="switch"><input type="checkbox" defaultChecked/><span className="track"><span className="thumb"/></span></label>
            </div>

            {/* Status pills — match the device topbar's Living room / Online style */}
            <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
              <span style={{
                display: "inline-flex", alignItems: "center", gap: 5,
                padding: "3px 9px", borderRadius: 999,
                border: "1px solid var(--border)",
                fontSize: 11, fontWeight: 500, color: "var(--muted-foreground)",
              }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 11, height: 11 }}><path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/></svg>
                {activeGroup.room}
              </span>
              <span style={{
                display: "inline-flex", alignItems: "center", gap: 5,
                padding: "3px 9px", borderRadius: 999, fontSize: 11, fontWeight: 500,
                background: "rgba(22,163,74,.10)", color: "var(--success)",
                border: "1px solid rgba(22,163,74,.25)",
              }}>
                <span style={{ width: 6, height: 6, borderRadius: 999, background: "var(--success)" }}/>
                Online
              </span>
              <span className="muted small mono" style={{ marginLeft: "auto", fontSize: 10.5, letterSpacing: ".04em" }}>
                {activeGroup.effect} · {activeGroup.brightness}%
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Sync features — entry to PixFusion & PixCluster.
          Free: tiles disabled with a PixC+ label inside.
          Pro: tiles enabled. */}
      <div style={{ padding: "16px 20px 0" }}>
        <div className="h3" style={{ marginBottom: 8 }}>Sync</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {[
            { id: "fusion",  t: "PixFusion",  s: "Fuse multiple devices into one sync.", icon: "fa-solid fa-layer-group" },
            { id: "cluster", t: "PixCluster", s: "Group a room — primary drives the rest.", icon: "fa-solid fa-object-group" },
          ].map(tile => (
            <button key={tile.id} className={isPro ? "card iot-card" : "card"} disabled={!isPro} style={{
              padding: 12, textAlign: "left", cursor: isPro ? "pointer" : "not-allowed", font: "inherit",
              display: "flex", flexDirection: "column", gap: 6, alignItems: "flex-start",
              color: isPro ? "var(--foreground)" : "var(--muted-foreground)",
              background: isPro ? undefined : "var(--card)",
              border: isPro ? undefined : "1px solid var(--border)",
              opacity: isPro ? 1 : .85,
              position: "relative",
              overflow: "hidden",
            }}>
              {!isPro && (
                <span aria-hidden style={{
                  position: "absolute", inset: 0,
                  backgroundImage: "repeating-linear-gradient(45deg, transparent 0 8px, color-mix(in srgb, var(--muted-foreground) 6%, transparent) 8px 9px)",
                  pointerEvents: "none",
                }}/>
              )}
              <div style={{ display: "flex", alignItems: "center", gap: 6, width: "100%" }}>
                <span style={{
                  width: 32, height: 32, borderRadius: 9,
                  background: isPro ? "var(--primary-soft)" : "var(--muted)",
                  color: isPro ? "var(--primary)" : "var(--muted-foreground)",
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                }}>
                  <i className={tile.icon} style={{ fontSize: 14 }}/>
                </span>
                {!isPro && window.LockBadge && (
                  <span style={{ marginLeft: "auto" }}><window.LockBadge size="sm"/></span>
                )}
              </div>
              <div style={{ fontSize: 13, fontWeight: 600 }}>{tile.t}</div>
              <div className="muted small" style={{ fontSize: 11, lineHeight: 1.35 }}>{tile.s}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Devices */}
      <div style={{ padding: "16px 20px 0", flex: 1, overflow: "hidden" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
            <div className="h3">Devices</div>
            <span className="mono small" style={{ color: "var(--muted-foreground)", letterSpacing: ".04em" }}>
              <span style={{ color: "var(--foreground)", fontWeight: 600 }}>12</span>
              <span> / 25</span>
            </span>
          </div>
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
          {icons.map((id, i) => {
            const sel = i === 0;
            return (
              <button key={id} type="button" aria-label={id} style={{
                aspectRatio: "1", borderRadius: 14, cursor: "pointer", padding: 0,
                border: sel ? "1.5px solid var(--primary)" : "1px solid var(--border)",
                background: sel ? "var(--primary-soft)" : "var(--card)",
                color: sel ? "var(--primary)" : "var(--foreground)",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: sel ? "0 0 0 3px rgba(var(--primary-rgb),.18)" : undefined,
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round">
                  {id === "sofa" && <><path d="M4 12V8a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v4"/><path d="M2 14a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2v2h-2v-2H6v2H4v-2a2 2 0 0 1-2-2v-3z"/><path d="M6 12v-1a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v1"/></>}
                  {id === "bed" && <><path d="M2 18v-7a2 2 0 0 1 2-2h6a3 3 0 0 1 3 3v1h7a2 2 0 0 1 2 2v3"/><path d="M2 18h20v2"/><circle cx="6.5" cy="11.5" r="1.5"/></>}
                  {id === "chef" && <><path d="M5 3h14v6a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4V3z"/><path d="M9 13v8M15 13v8"/><path d="M5 7h14"/></>}
                  {id === "bath" && <><path d="M3 12h18v3a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4v-3z"/><path d="M7 12V6a2 2 0 0 1 4 0"/><path d="M5 21l1-2M19 21l-1-2"/></>}
                  {id === "desk" && <><rect x="3" y="4" width="18" height="11" rx="2"/><path d="M2 19h20"/><path d="M9 19v-2M15 19v-2"/></>}
                  {id === "tv" && <><rect x="3" y="5" width="18" height="13" rx="2"/><path d="M8 22h8M12 18v4"/></>}
                  {id === "car" && <><path d="M5 11l1.6-4.5A2 2 0 0 1 8.5 5h7a2 2 0 0 1 1.9 1.5L19 11"/><path d="M3 17v-5h18v5h-2a2 2 0 0 1-4 0H9a2 2 0 0 1-4 0H3z"/><circle cx="7" cy="17" r="1.4" fill="currentColor"/><circle cx="17" cy="17" r="1.4" fill="currentColor"/></>}
                  {id === "yard" && <><path d="M12 22V12"/><path d="M12 12c-3 0-5-2-5-5 0-1 .4-2 1-2.6.6.6 1.5 1 2.5 1 .8 0 1.6-.3 2.2-.8.6.5 1.4.8 2.3.8 1 0 1.9-.4 2.5-1 .6.6 1 1.6 1 2.6 0 3-2 5-5 5z"/><path d="M5 22h14"/></>}
                </svg>
              </button>
            );
          })}
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

Object.assign(window, { ScreenHome, ScreenAddRoom, DeviceCard, RoomChip, DEVICE_ICONS });
