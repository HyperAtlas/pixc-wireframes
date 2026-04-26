// ===== Additional screens for completeness =====

// Single device detail / overview — landing screen for a tapped device (DEPRECATED, kept for compat)
function _UnusedScreenDeviceOverview() {
  return (
    <Phone>
      <div style={{ padding: "8px 16px 0", display: "flex", alignItems: "center", justifyContent: "space-between", flex: "0 0 auto" }}>
        <button className="btn btn-ghost btn-icon-sm">
          <svg className="ic-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <button className="btn btn-ghost btn-icon-sm">
          <svg className="ic-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="19" r="1.5"/></svg>
        </button>
      </div>

      <div style={{ padding: "8px 24px 0" }}>
        <div className="device-card" style={{ padding: 18, minHeight: 220 }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
            <div>
              <div className="meta" style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: ".06em" }}>Living room</div>
              <div style={{ fontSize: 22, fontWeight: 600, letterSpacing: "-0.01em", marginTop: 2 }}>PixC Lyt</div>
            </div>
            <label className="switch" style={{ width: 44, height: 26 }}>
              <input type="checkbox" defaultChecked/>
              <span className="track" style={{ borderRadius: 999 }}><span className="thumb" style={{ width: 22, height: 22, top: 2, left: 2 }}/></span>
            </label>
          </div>

          <div style={{ marginTop: 28, display: "flex", alignItems: "center", justifyContent: "center", height: 90 }}>
            <div style={{
              width: 90, height: 90, borderRadius: 999,
              background: "radial-gradient(circle at 35% 35%, #c084fc, #7c3aed 75%)",
              boxShadow: "0 0 60px #a855f766, 0 0 120px #a855f733",
            }}/>
          </div>

          <div style={{ marginTop: 24, display: "flex", justifyContent: "space-between", fontSize: 12 }}>
            <div>
              <div className="meta">Brightness</div>
              <div style={{ marginTop: 2, fontWeight: 600 }}>82%</div>
            </div>
            <div>
              <div className="meta">Effect</div>
              <div style={{ marginTop: 2, fontWeight: 600 }}>Solid</div>
            </div>
            <div>
              <div className="meta">Today</div>
              <div style={{ marginTop: 2, fontWeight: 600 }}>0.4 kWh</div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: "16px 24px 0", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <button className="btn btn-outline" style={{ height: 64, flexDirection: "column", gap: 4 }}>
          <svg className="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 3a9 9 0 0 0 0 18z" fill="currentColor"/></svg>
          <span style={{ fontSize: 12, fontWeight: 500 }}>Color</span>
        </button>
        <button className="btn btn-outline" style={{ height: 64, flexDirection: "column", gap: 4 }}>
          <svg className="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L4.5 14h6L9 22l8.5-12h-6L13 2z"/></svg>
          <span style={{ fontSize: 12, fontWeight: 500 }}>Effects</span>
        </button>
        <button className="btn btn-outline" style={{ height: 64, flexDirection: "column", gap: 4 }}>
          <svg className="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>
          <span style={{ fontSize: 12, fontWeight: 500 }}>Schedule</span>
        </button>
        <button className="btn btn-outline" style={{ height: 64, flexDirection: "column", gap: 4 }}>
          <svg className="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19 12a7 7 0 0 0-.1-1.2l2-1.5-2-3.4-2.3.9A7 7 0 0 0 14.5 5L14 2.5h-4l-.5 2.5a7 7 0 0 0-2.1 1.8l-2.3-.9-2 3.4 2 1.5A7 7 0 0 0 5 12c0 .4 0 .8.1 1.2l-2 1.5 2 3.4 2.3-.9a7 7 0 0 0 2.1 1.8l.5 2.5h4l.5-2.5a7 7 0 0 0 2.1-1.8l2.3.9 2-3.4-2-1.5c.1-.4.1-.8.1-1.2z"/></svg>
          <span style={{ fontSize: 12, fontWeight: 500 }}>Settings</span>
        </button>
      </div>

      <div style={{ padding: "20px 24px 0" }}>
        <div className="muted small" style={{ marginBottom: 8, textTransform: "uppercase", letterSpacing: ".06em", fontWeight: 500 }}>Device info</div>
        <div className="card">
          <div className="row"><div className="label-wrap"><div className="t">Firmware</div></div><div className="s mono" style={{ color: "var(--muted-foreground)" }}>2.4.1</div></div>
          <div className="row"><div className="label-wrap"><div className="t">Signal</div></div><span className="badge badge-success">Strong · −42 dB</span></div>
          <div className="row"><div className="label-wrap"><div className="t">Connected</div></div><div className="s mono" style={{ color: "var(--muted-foreground)" }}>14 days</div></div>
        </div>
      </div>

      <div style={{ flex: 1 }}/>
      <FigPillNav active="home"/>
    </Phone>
  );
}

// Scene editor — build a scene from devices
function ScreenSceneEditor() {
  const devices = [
    { name: "PixC Lyt", room: "Living room", color: "#a855f7", brightness: 82, on: true },
    { name: "Strip 01", room: "Bedroom", color: "#f59e0b", brightness: 60, on: true },
    { name: "Bulb 02", room: "Kitchen", color: "#22c55e", brightness: 40, on: false },
    { name: "Lamp", room: "Hallway", color: "#3b82f6", brightness: 70, on: true },
  ];
  return (
    <Phone>
      <Header title="New scene" right={<button className="btn btn-primary btn-sm">Save</button>}/>
      <div style={{ flex: 1, overflow: "auto", padding: "0 20px 24px" }}>
        <label className="field-label">Scene name</label>
        <input className="input" defaultValue="Movie night"/>

        <div className="field-label" style={{ marginTop: 16 }}>Icon &amp; color</div>
        <div style={{ display: "flex", gap: 8 }}>
          {["#a855f7","#ef4444","#f59e0b","#22c55e","#3b82f6","#09090b"].map((c, i) => (
            <span key={c} style={{
              width: 36, height: 36, borderRadius: 999, background: c,
              boxShadow: i === 0 ? "0 0 0 2px var(--ring), inset 0 0 0 2px white" : "inset 0 0 0 1px rgba(0,0,0,.05)",
              cursor: "pointer"
            }}/>
          ))}
        </div>

        <div className="field-label" style={{ marginTop: 20, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span>Devices ({devices.filter(d => d.on).length})</span>
          <button className="btn btn-ghost btn-sm" style={{ color: "var(--muted-foreground)" }}>Add</button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {devices.map(d => (
            <div key={d.name} className="card" style={{ padding: 14, opacity: d.on ? 1 : .55 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{
                  width: 36, height: 36, borderRadius: 10,
                  background: d.color, boxShadow: d.on ? `0 0 18px ${d.color}66` : "none",
                }}/>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 500 }}>{d.name}</div>
                  <div className="muted small">{d.room}</div>
                </div>
                <label className="switch"><input type="checkbox" defaultChecked={d.on}/><span className="track"><span className="thumb"/></span></label>
              </div>
              {d.on && (
                <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 10 }}>
                  <svg className="ic-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--muted-foreground)" }}><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>
                  <input type="range" className="range" defaultValue={d.brightness}/>
                  <span className="mono small muted" style={{ minWidth: 32, textAlign: "right" }}>{d.brightness}%</span>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="field-label" style={{ marginTop: 20 }}>Run</div>
        <div className="seg" style={{ width: "100%", display: "flex" }}>
          <button className="active" style={{ flex: 1 }}>Manually</button>
          <button style={{ flex: 1 }}>On schedule</button>
          <button style={{ flex: 1 }}>By trigger</button>
        </div>
      </div>
    </Phone>
  );
}

// Voice / search — Siri-ish quick action
function ScreenVoice() {
  const suggestions = [
    "Turn off all lights",
    "Set bedroom to 30%",
    "Start Movie night",
    "Warm white in kitchen",
  ];
  return (
    <Phone dark>
      <div style={{ padding: "8px 16px 0", display: "flex", alignItems: "center", justifyContent: "space-between", flex: "0 0 auto" }}>
        <button className="btn btn-ghost btn-icon-sm" style={{ color: "var(--dark-fg)" }}>
          <svg className="ic-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>
        <span className="mono small" style={{ color: "var(--dark-muted)" }}>LISTENING</span>
        <button className="btn btn-ghost btn-icon-sm" style={{ color: "var(--dark-fg)" }}>
          <svg className="ic-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 8v4M12 16h.01"/></svg>
        </button>
      </div>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 32px", textAlign: "center" }}>
        <div style={{ position: "relative", width: 180, height: 180 }}>
          <div style={{ position: "absolute", inset: 30, borderRadius: 999, background: "radial-gradient(circle, #6366f1, #ec4899 60%, #f59e0b)", filter: "blur(20px)", opacity: .9 }}/>
          <div style={{ position: "absolute", inset: 50, borderRadius: 999, border: "1px solid rgba(255,255,255,.18)" }}/>
          <div style={{ position: "absolute", inset: 70, borderRadius: 999, border: "1px solid rgba(255,255,255,.10)" }}/>
        </div>
        <div style={{ marginTop: 32, fontSize: 22, fontWeight: 500, letterSpacing: "-0.01em", color: "var(--dark-fg)" }}>
          “Dim the living room…”
        </div>
        <div style={{ marginTop: 10, color: "var(--dark-muted)", fontSize: 13 }}>Tap to stop &nbsp;·&nbsp; or wait</div>
      </div>

      <div style={{ padding: "0 24px 24px" }}>
        <div className="mono small" style={{ color: "var(--dark-muted)", textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 10 }}>Try saying</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {suggestions.map(s => (
            <div key={s} style={{
              padding: "10px 14px", borderRadius: 8,
              background: "rgba(255,255,255,.06)",
              border: "1px solid rgba(255,255,255,.08)",
              color: "var(--dark-fg)", fontSize: 13,
            }}>“{s}”</div>
          ))}
        </div>
      </div>
    </Phone>
  );
}

// Family / sharing — invite members
function ScreenSharing() {
  const members = [
    { name: "Rayon Kell", role: "Owner", initial: "R", you: true },
    { name: "Mira Sato", role: "Admin", initial: "M" },
    { name: "Jules Pham", role: "Member", initial: "J" },
    { name: "kids@home", role: "Guest", initial: "K", muted: true },
  ];
  return (
    <Phone>
      <Header title="Members" right={<button className="btn btn-outline btn-sm"><svg className="ic-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"/></svg>Invite</button>}/>

      <div style={{ flex: 1, overflow: "auto", padding: "0 20px 24px" }}>
        <div className="card" style={{ padding: 14, background: "var(--muted)", display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: "white", border: "1px solid var(--border)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
            <svg className="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/></svg>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 600 }}>Rayon's Home</div>
            <div className="muted small">12 devices · 4 rooms</div>
          </div>
          <button className="btn btn-ghost btn-sm" style={{ color: "var(--muted-foreground)" }}>Edit</button>
        </div>

        <div className="muted small" style={{ marginTop: 20, marginBottom: 8, textTransform: "uppercase", letterSpacing: ".06em", fontWeight: 500 }}>People</div>
        <div className="card">
          {members.map(m => (
            <div className="row" key={m.name}>
              <div className="icon-wrap" style={{
                background: m.muted ? "var(--muted)" : "var(--foreground)",
                color: m.muted ? "var(--muted-foreground)" : "white",
                fontWeight: 600, fontSize: 14
              }}>{m.initial}</div>
              <div className="label-wrap">
                <div className="t">{m.name}{m.you && <span className="muted" style={{ fontWeight: 400 }}> · You</span>}</div>
                <div className="s">{m.role}</div>
              </div>
              <button className="btn btn-ghost btn-icon-sm" style={{ color: "var(--muted-foreground)" }}>
                <svg className="ic-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="19" r="1.5"/></svg>
              </button>
            </div>
          ))}
        </div>

        <div className="muted small" style={{ marginTop: 20, marginBottom: 8, textTransform: "uppercase", letterSpacing: ".06em", fontWeight: 500 }}>Invite link</div>
        <div className="card" style={{ padding: 14 }}>
          <div className="mono" style={{ fontSize: 12, color: "var(--muted-foreground)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", padding: "8px 12px", border: "1px solid var(--border)", borderRadius: 8 }}>
            pixc.app/inv/8K2Q-XR4P
          </div>
          <div style={{ marginTop: 10, display: "flex", gap: 8 }}>
            <button className="btn btn-outline btn-sm" style={{ flex: 1 }}>
              <svg className="ic-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/></svg>
              Copy
            </button>
            <button className="btn btn-primary btn-sm" style={{ flex: 1 }}>
              <svg className="ic-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><path d="M16 6l-4-4-4 4"/><path d="M12 2v13"/></svg>
              Share
            </button>
          </div>
        </div>
      </div>
    </Phone>
  );
}

// Software update
function ScreenUpdate() {
  return (
    <Phone>
      <Header title="Update available"/>
      <div style={{ flex: 1, padding: "0 24px 24px", display: "flex", flexDirection: "column" }}>
        <div className="card" style={{ padding: 18, textAlign: "center" }}>
          <div style={{ display: "inline-flex", width: 56, height: 56, borderRadius: 14, background: "var(--twoto-soft)", color: "var(--twoto)", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v12"/><path d="M7 10l5 5 5-5"/><path d="M3 21h18"/></svg>
          </div>
          <div className="h2">Firmware 2.5.0</div>
          <div className="muted small mono" style={{ marginTop: 4 }}>PixC Lyt · 8.4 MB</div>
        </div>

        <div className="muted small" style={{ marginTop: 20, marginBottom: 8, textTransform: "uppercase", letterSpacing: ".06em", fontWeight: 500 }}>What's new</div>
        <div className="card" style={{ padding: 14 }}>
          <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, lineHeight: 1.6, color: "var(--foreground)" }}>
            <li>Faster pairing — under 5 seconds in most cases</li>
            <li>Smoother color transitions on Aurora &amp; Breeze</li>
            <li>Lower idle power draw (−18%)</li>
            <li>Bug fixes for Music sync stuttering</li>
          </ul>
        </div>

        <div className="card" style={{ padding: 14, marginTop: 14, display: "flex", alignItems: "center", gap: 10, background: "var(--muted)" }}>
          <svg className="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--muted-foreground)" }}><circle cx="12" cy="12" r="9"/><path d="M12 8v4M12 16h.01"/></svg>
          <div className="small" style={{ flex: 1 }}>Keep the device powered during update.<br/>This usually takes 2–3 minutes.</div>
        </div>

        <div style={{ flex: 1 }}/>
        <button className="btn btn-primary btn-lg btn-block">Install now</button>
        <button className="btn btn-ghost btn-lg btn-block" style={{ marginTop: 4 }}>Remind me tonight</button>
      </div>
    </Phone>
  );
}

// Help & Support
function ScreenHelp() {
  const topics = [
    { t: "Getting started", s: "Set up your first device" },
    { t: "Wi-Fi & connection", s: "Pairing won't complete?" },
    { t: "Scenes & automations", s: "Build, edit, share" },
    { t: "Account & sharing", s: "Invite family members" },
  ];
  return (
    <Phone>
      <Header title="Help &amp; support" right={
        <button className="btn btn-ghost btn-icon-sm" aria-label="Close">
          <svg className="ic-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>
      }/>
      <div style={{ flex: 1, overflow: "auto", padding: "0 20px 24px" }}>
        <div style={{ position: "relative" }}>
          <svg className="ic-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ position: "absolute", left: 12, top: 12, color: "var(--muted-foreground)" }}><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>
          <input className="input" placeholder="Search articles…" style={{ paddingLeft: 38 }}/>
        </div>

        <div className="muted small" style={{ marginTop: 20, marginBottom: 8, textTransform: "uppercase", letterSpacing: ".06em", fontWeight: 500 }}>Browse topics</div>
        <div className="card">
          {topics.map(t => (
            <div className="row" key={t.t}>
              <div className="icon-wrap"><svg className="ic-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M2 4h12a4 4 0 0 1 4 4v12"/><path d="M22 20H10a4 4 0 0 1-4-4V4"/></svg></div>
              <div className="label-wrap"><div className="t">{t.t}</div><div className="s">{t.s}</div></div>
              <svg className="ic-sm chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
            </div>
          ))}
        </div>

        <div className="muted small" style={{ marginTop: 20, marginBottom: 8, textTransform: "uppercase", letterSpacing: ".06em", fontWeight: 500 }}>Contact us</div>
        <div className="card">
          <div className="row">
            <div className="icon-wrap"><svg className="ic-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg></div>
            <div className="label-wrap"><div className="t">Chat with support</div><div className="s">Avg. reply 4 min</div></div>
            <span className="badge badge-success">Online</span>
          </div>
          <div className="row">
            <div className="icon-wrap"><svg className="ic-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16v16H4z"/><path d="M4 4l8 8 8-8"/></svg></div>
            <div className="label-wrap"><div className="t">Email us</div><div className="s">help@pixc.app</div></div>
            <svg className="ic-sm chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
          </div>
          <div className="row">
            <div className="icon-wrap"><svg className="ic-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M9.1 9a3 3 0 1 1 5.7 1.5c-.3 1-1.5 1.5-2.3 2-.5.3-.5.8-.5 1"/><circle cx="12" cy="17" r=".8" fill="currentColor"/></svg></div>
            <div className="label-wrap"><div className="t">FAQ</div><div className="s">Common questions</div></div>
            <svg className="ic-sm chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
          </div>
        </div>

        <div className="muted small mono" style={{ marginTop: 20, textAlign: "center" }}>PixC v2.5.0 (build 1042)</div>
      </div>
    </Phone>
  );
}

// Search results
function ScreenSearch() {
  const recents = ["bedroom", "scene movie", "warm white", "kitchen lamp"];
  const results = [
    { t: "PixC Lyt", s: "Living room · On · 82%", c: "#a855f7", k: "device" },
    { t: "Strip 01", s: "Bedroom · On · 64%", c: "#22c55e", k: "device" },
    { t: "Movie night", s: "Scene · 4 devices", c: "#f59e0b", k: "scene" },
  ];
  return (
    <Phone>
      <div style={{ padding: "8px 16px 12px", display: "flex", alignItems: "center", gap: 8, flex: "0 0 auto" }}>
        <button className="btn btn-ghost btn-icon-sm">
          <svg className="ic-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <div style={{ flex: 1, position: "relative" }}>
          <svg className="ic-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ position: "absolute", left: 12, top: 12, color: "var(--muted-foreground)" }}><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>
          <input className="input" defaultValue="bedroom" style={{ paddingLeft: 38, paddingRight: 36 }}/>
          <button className="btn btn-ghost btn-icon-sm" style={{ position: "absolute", right: 4, top: 4 }}>
            <svg className="ic-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>
      </div>

      <div style={{ flex: 1, overflow: "auto", padding: "0 20px 24px" }}>
        <div className="muted small" style={{ marginBottom: 8, textTransform: "uppercase", letterSpacing: ".06em", fontWeight: 500 }}>Results</div>
        <div className="card">
          {results.map(r => (
            <div className="row" key={r.t}>
              <div className="icon-wrap" style={{ background: r.c + "22" }}>
                {r.k === "device"
                  ? <span style={{ width: 14, height: 14, borderRadius: 999, background: r.c }}/>
                  : <svg className="ic-sm" viewBox="0 0 24 24" fill="none" stroke={r.c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L4.5 14h6L9 22l8.5-12h-6L13 2z"/></svg>}
              </div>
              <div className="label-wrap"><div className="t">{r.t}</div><div className="s">{r.s}</div></div>
              <svg className="ic-sm chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
            </div>
          ))}
        </div>

        <div className="muted small" style={{ marginTop: 20, marginBottom: 8, textTransform: "uppercase", letterSpacing: ".06em", fontWeight: 500, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span>Recent</span>
          <button className="btn btn-ghost btn-sm" style={{ height: 24, padding: "0 8px", color: "var(--muted-foreground)" }}>Clear</button>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {recents.map(r => (
            <span key={r} className="badge" style={{ height: 28, padding: "0 12px", fontSize: 12 }}>{r}</span>
          ))}
        </div>
      </div>
    </Phone>
  );
}

// Permissions / location prompt
function ScreenPermissions() {
  return (
    <Phone>
      <div style={{ padding: "16px 24px 0", display: "flex", flexDirection: "column", flex: 1 }}>
        <div className="muted small mono" style={{ textTransform: "uppercase", letterSpacing: ".08em" }}>Step 3 of 4</div>
        <div className="h1" style={{ marginTop: 10 }}>Allow location access</div>
        <div className="muted" style={{ marginTop: 6, fontSize: 14 }}>
          PixC uses your location to enable “arrive home” triggers and sunrise/sunset automations. We never share or sell it.
        </div>

        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "32px 0" }}>
          <div style={{
            width: 220, height: 220, borderRadius: 999,
            background: "radial-gradient(circle, white 0%, var(--muted) 70%)",
            border: "1px solid var(--border)",
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            position: "relative",
          }}>
            <span style={{ position: "absolute", inset: 60, borderRadius: 999, border: "1px dashed var(--border-strong)" }}/>
            <span style={{ position: "absolute", inset: 30, borderRadius: 999, border: "1px dashed var(--border-strong)", opacity: .5 }}/>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--foreground)" }}>
              <path d="M12 22s8-7 8-13a8 8 0 0 0-16 0c0 6 8 13 8 13z"/>
              <circle cx="12" cy="9" r="3"/>
            </svg>
          </div>
        </div>

        <div className="card" style={{ padding: 12, display: "flex", gap: 10, alignItems: "flex-start", background: "var(--muted)" }}>
          <svg className="ic-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--muted-foreground)", marginTop: 2 }}><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          <div className="small">Location is processed on-device. You can revoke access anytime in Settings.</div>
        </div>

        <button className="btn btn-primary btn-lg btn-block" style={{ marginTop: 14 }}>Allow while using</button>
        <button className="btn btn-ghost btn-lg btn-block" style={{ marginTop: 4, color: "var(--muted-foreground)" }}>Not now</button>
      </div>
    </Phone>
  );
}

Object.assign(window, {
  ScreenSceneEditor, ScreenVoice,
  ScreenSharing, ScreenHelp, ScreenSearch, ScreenPermissions,
});
