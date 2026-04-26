// ===== System screens: Settings, Notifications, Profile, Stats =====

function ScreenSettings() {
  return (
    <Phone>
      <Header title="Settings" onBack={false}/>
      <div style={{ flex: 1, overflow: "auto", padding: "0 20px 24px" }}>

        {/* Active home — switcher card */}
        <div className="card" style={{ padding: 14, marginBottom: 12, background: "linear-gradient(135deg, rgba(var(--primary-rgb),.10), transparent)", border: "1px solid var(--border)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: "var(--primary)", color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/></svg>
            </div>
            <div style={{ flex: 1 }}>
              <div className="muted small" style={{ textTransform: "uppercase", letterSpacing: ".06em", fontWeight: 500, marginBottom: 2 }}>Current home</div>
              <div style={{ fontSize: 15, fontWeight: 600 }}>Rayon's apartment</div>
              <div className="muted small">Owner · 12 devices · 2 members</div>
            </div>
            <button className="btn btn-outline btn-sm">Switch</button>
          </div>
        </div>

        <div className="card" style={{ padding: 14, display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
          <div style={{ width: 48, height: 48, borderRadius: 999, background: "var(--muted)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontWeight: 600 }}>R</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 15, fontWeight: 600 }}>Rayon</div>
            <div className="muted small">rayon@email.com</div>
          </div>
          <button className="btn btn-outline btn-sm">Edit</button>
        </div>

        <div className="muted small" style={{ marginBottom: 8, textTransform: "uppercase", letterSpacing: ".06em" }}>Preferences</div>
        <div className="card" style={{ marginBottom: 16 }}>
          <div className="row">
            <div className="icon-wrap"><svg className="ic-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z"/></svg></div>
            <div className="label-wrap"><div className="t">Appearance</div><div className="s">System</div></div>
            <svg className="ic-sm chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
          </div>
          <div className="row">
            <div className="icon-wrap"><svg className="ic-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 21a2 2 0 0 0 4 0"/></svg></div>
            <div className="label-wrap"><div className="t">Notifications</div><div className="s">Push, email</div></div>
            <svg className="ic-sm chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
          </div>
          <div className="row">
            <div className="icon-wrap"><svg className="ic-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20"/></svg></div>
            <div className="label-wrap"><div className="t">Language & region</div><div className="s">English (IN)</div></div>
            <svg className="ic-sm chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
          </div>
        </div>

        <div className="muted small" style={{ marginBottom: 8, textTransform: "uppercase", letterSpacing: ".06em" }}>Home</div>
        <div className="card" style={{ marginBottom: 16 }}>
          <div className="row">
            <div className="icon-wrap"><svg className="ic-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg></div>
            <div className="label-wrap"><div className="t">Rooms</div><div className="s">4 rooms</div></div>
            <svg className="ic-sm chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
          </div>
          <div className="row">
            <div className="icon-wrap"><svg className="ic-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/></svg></div>
            <div className="label-wrap"><div className="t">Devices</div><div className="s">12 connected</div></div>
            <svg className="ic-sm chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
          </div>
          <div className="row">
            <div className="icon-wrap"><svg className="ic-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 11h-6M22 14h-6"/></svg></div>
            <div className="label-wrap"><div className="t">Family & guests</div><div className="s">2 members</div></div>
            <svg className="ic-sm chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
          </div>
        </div>

        <div className="muted small" style={{ marginBottom: 8, textTransform: "uppercase", letterSpacing: ".06em" }}>Security</div>
        <div className="card" style={{ marginBottom: 16 }}>
          <div className="row">
            <div className="icon-wrap"><svg className="ic-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg></div>
            <div className="label-wrap"><div className="t">App lock</div><div className="s">Biometric · Passcode</div></div>
            <label className="switch"><input type="checkbox" defaultChecked/><span className="track"><span className="thumb"/></span></label>
          </div>
          <div className="row">
            <div className="icon-wrap"><svg className="ic-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11V8a3 3 0 0 1 6 0v3"/><rect x="6" y="11" width="12" height="9" rx="2"/></svg></div>
            <div className="label-wrap"><div className="t">Change passcode</div><div className="s">4-digit PIN</div></div>
            <svg className="ic-sm chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
          </div>
          <div className="row">
            <div className="icon-wrap"><svg className="ic-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg></div>
            <div className="label-wrap"><div className="t">Auto-lock</div><div className="s">After 1 minute</div></div>
            <svg className="ic-sm chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
          </div>
          <div className="row">
            <div className="icon-wrap"><svg className="ic-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></div>
            <div className="label-wrap"><div className="t">Two-factor auth</div><div className="s">Off</div></div>
            <label className="switch"><input type="checkbox"/><span className="track"><span className="thumb"/></span></label>
          </div>
        </div>

        <div className="muted small" style={{ marginBottom: 8, textTransform: "uppercase", letterSpacing: ".06em" }}>About</div>
        <div className="card">
          <div className="row">
            <div className="icon-wrap"><svg className="ic-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01"/></svg></div>
            <div className="label-wrap"><div className="t">Help & support</div></div>
            <svg className="ic-sm chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
          </div>
          <div className="row">
            <div className="icon-wrap"><svg className="ic-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="M16 17l5-5-5-5M21 12H9"/></svg></div>
            <div className="label-wrap" style={{ color: "var(--destructive)" }}><div className="t">Sign out</div></div>
          </div>
        </div>
        <div className="muted small mono" style={{ textAlign: "center", marginTop: 24 }}>v 2.4.1 (build 8821)</div>
      </div>
    </Phone>
  );
}

// Notifications (NEW)
function ScreenNotifications() {
  const items = [
    { type: "alert", title: "Bedroom motion detected", time: "2m", body: "Strip 01 turned on automatically.", unread: true },
    { type: "info", title: "Firmware updated", time: "1h", body: "PixC Lyt updated to v3.2.0." },
    { type: "warn", title: "Bulb 02 went offline", time: "3h", body: "Last seen at 18:42. Tap to troubleshoot.", unread: true },
    { type: "info", title: "Weekly energy report", time: "Mon", body: "You used 11% less than last week." },
  ];
  return (
    <Phone>
      <Header title="Notifications" right={<button className="btn btn-ghost btn-sm" style={{ color: "var(--muted-foreground)" }}>Mark read</button>}/>
      <div style={{ flex: 1, overflow: "auto", padding: "0 20px 24px" }}>
        <div className="seg" style={{ marginBottom: 16 }}>
          <button className="active">All</button>
          <button>Alerts</button>
          <button>Devices</button>
          <button>System</button>
        </div>
        <div className="card">
          {items.map((n, i) => (
            <div className="row" key={i} style={{ alignItems: "flex-start", padding: "14px 16px" }}>
              <div className="icon-wrap" style={{
                background: n.type === "alert" ? "#eff6ff" : n.type === "warn" ? "#fef2f2" : "var(--muted)",
                color: n.type === "alert" ? "var(--twoto)" : n.type === "warn" ? "var(--destructive)" : "var(--foreground)"
              }}>
                {n.type === "alert" && <svg className="ic-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12c0-5.5-4.5-10-10-10S2 6.5 2 12a10 10 0 0 0 4 8l-1 2 4-1a10 10 0 0 0 13-9z"/></svg>}
                {n.type === "warn" && <svg className="ic-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4M12 17h.01"/></svg>}
                {n.type === "info" && <svg className="ic-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>}
              </div>
              <div className="label-wrap">
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div className="t">{n.title}</div>
                  {n.unread && <span style={{ width: 6, height: 6, borderRadius: 999, background: "var(--twoto)" }}/>}
                </div>
                <div className="s" style={{ marginTop: 2 }}>{n.body}</div>
              </div>
              <div className="muted small mono" style={{ flex: "0 0 auto" }}>{n.time}</div>
            </div>
          ))}
        </div>
      </div>
    </Phone>
  );
}

// Energy / insights (NEW)
function ScreenEnergy() {
  const bars = [22, 38, 28, 50, 64, 41, 72];
  const days = ["M","T","W","T","F","S","S"];
  return (
    <Phone>
      <Header title="Energy" right={<button className="btn btn-outline btn-sm">This week</button>}/>
      <div style={{ flex: 1, overflow: "auto", padding: "0 20px 24px" }}>
        <div className="card" style={{ padding: 16 }}>
          <div className="muted small" style={{ textTransform: "uppercase", letterSpacing: ".06em" }}>Total this week</div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginTop: 4 }}>
            <span className="h1">14.8</span>
            <span className="muted">kWh</span>
            <span className="badge badge-success" style={{ marginLeft: "auto" }}>↓ 11%</span>
          </div>
          <div style={{ marginTop: 18, display: "flex", alignItems: "flex-end", gap: 8, height: 96 }}>
            {bars.map((h, i) => (
              <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                <div style={{
                  width: "100%", height: `${h}%`, borderRadius: 6,
                  background: i === 6 ? "var(--foreground)" : "var(--muted)",
                  border: "1px solid var(--border)"
                }}/>
                <span className="muted small mono">{days[i]}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="muted small" style={{ marginTop: 20, marginBottom: 8, textTransform: "uppercase", letterSpacing: ".06em" }}>Top consumers</div>
        <div className="card">
          {[
            { n: "PixC Lyt", r: "Living room", v: "5.2 kWh", p: 72, c: "#a855f7", k: "bulb" },
            { n: "Strip 01", r: "Bedroom", v: "3.8 kWh", p: 52, c: "#22c55e", k: "strip" },
            { n: "Lamp", r: "Hallway", v: "2.1 kWh", p: 28, c: "#3b82f6", k: "lamp" },
          ].map((d, i) => (
            <div className="row" key={i}>
              <div className="icon-wrap" style={{ background: d.c + "22", color: d.c }}>{window.DEVICE_ICONS[d.k]}</div>
              <div className="label-wrap">
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div className="t">{d.n}</div>
                  <div className="mono small">{d.v}</div>
                </div>
                <div className="s">{d.r}</div>
                <div className="progress" style={{ marginTop: 6 }}>
                  <span style={{ width: `${d.p}%`, background: d.c }}/>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Phone>
  );
}

// Account / Profile (NEW)
function ScreenProfile() {
  return (
    <Phone>
      <Header title="Account"/>
      <div style={{ flex: 1, overflow: "auto", padding: "0 20px 24px" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "8px 0 24px" }}>
          <div style={{ position: "relative" }}>
            <div style={{ width: 80, height: 80, borderRadius: 999, background: "var(--muted)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 28, fontWeight: 600 }}>R</div>
            <button className="btn btn-primary btn-icon-sm" style={{ position: "absolute", bottom: 0, right: 0, width: 28, height: 28, borderRadius: 999 }}>
              <svg className="ic-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 12, height: 12 }}><path d="M12 5v14M5 12h14"/></svg>
            </button>
          </div>
          <div className="h3" style={{ marginTop: 12 }}>Rayon</div>
          <div className="muted small">rayon@email.com</div>
        </div>

        <div className="muted small" style={{ marginBottom: 8, textTransform: "uppercase", letterSpacing: ".06em" }}>Account details</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div>
            <label className="field-label">Display name</label>
            <input className="input" defaultValue="Rayon"/>
          </div>
          <div>
            <label className="field-label">Email</label>
            <input className="input" defaultValue="rayon@email.com"/>
          </div>
          <div>
            <label className="field-label">Phone</label>
            <input className="input" defaultValue="+91 98xxx xxx12"/>
          </div>
        </div>

        <div className="muted small" style={{ marginTop: 20, marginBottom: 8, textTransform: "uppercase", letterSpacing: ".06em" }}>Security</div>
        <div className="card">
          <div className="row">
            <div className="icon-wrap"><svg className="ic-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg></div>
            <div className="label-wrap"><div className="t">Change password</div></div>
            <svg className="ic-sm chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
          </div>
          <div className="row">
            <div className="icon-wrap"><svg className="ic-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></div>
            <div className="label-wrap"><div className="t">Two-factor auth</div><div className="s">Off</div></div>
            <label className="switch"><input type="checkbox"/><span className="track"><span className="thumb"/></span></label>
          </div>
          <div className="row">
            <div className="icon-wrap"><svg className="ic-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1 3-6z"/></svg></div>
            <div className="label-wrap"><div className="t">Active sessions</div><div className="s">2 devices</div></div>
            <svg className="ic-sm chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
          </div>
        </div>
      </div>
    </Phone>
  );
}

Object.assign(window, { ScreenSettings, ScreenNotifications, ScreenEnergy, ScreenProfile, ScreenSwitchHome, ScreenFamilyGuests });

// ---- Switch home ----
function ScreenSwitchHome() {
  const homes = [
    { name: "Rayon's apartment", role: "Owner", devices: 12, members: 2, current: true },
    { name: "Parents' house",     role: "Member", devices: 8,  members: 4 },
    { name: "Beach house",        role: "Guest",  devices: 5,  members: 6 },
  ];
  return (
    <Phone>
      <Header title="Switch home"/>
      <div style={{ flex: 1, overflow: "auto", padding: "8px 20px 24px" }}>
        <div className="muted" style={{ fontSize: 13, marginBottom: 14 }}>
          Active home is the one being controlled. You'll get notifications from all homes you're a member of.
        </div>

        <div className="card">
          {homes.map(h => (
            <button key={h.name} className="row" style={{ width: "100%", border: 0, background: "transparent", textAlign: "left", cursor: "pointer" }}>
              <div className="icon-wrap" style={{ background: h.current ? "var(--primary)" : "var(--muted)", color: h.current ? "#fff" : "var(--foreground)" }}>
                <svg className="ic-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/></svg>
              </div>
              <div className="label-wrap">
                <div className="t" style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  {h.name}
                  {h.current && <span style={{ fontSize: 10, padding: "2px 6px", borderRadius: 999, background: "rgba(22,163,74,.12)", color: "var(--success)", fontWeight: 600 }}>ACTIVE</span>}
                </div>
                <div className="s">{h.role} · {h.devices} devices · {h.members} {h.members === 1 ? "member" : "members"}</div>
              </div>
              <span aria-hidden style={{
                width: 20, height: 20, borderRadius: 999,
                border: h.current ? "6px solid var(--foreground)" : "1.5px solid var(--border-strong)",
                background: "var(--background)", boxSizing: "border-box",
              }}/>
            </button>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 14 }}>
          <button className="btn btn-outline btn-lg">
            <svg className="ic-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"/></svg>
            New home
          </button>
          <button className="btn btn-outline btn-lg">
            <svg className="ic-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 9h6v6H9z"/></svg>
            Join with code
          </button>
        </div>
      </div>
    </Phone>
  );
}

// ---- Family & guests management ----
function ScreenFamilyGuests() {
  const members = [
    { name: "Rayon",  email: "rayon@email.com",  role: "Owner",  color: "#ea580c", you: true },
    { name: "Aria",   email: "aria@email.com",   role: "Admin",  color: "#ec4899" },
    { name: "Sam",    email: "sam.k@email.com",  role: "Member", color: "#3b82f6" },
  ];
  const guests = [
    { name: "House cleaner",  expires: "Daily · 9–11 AM",   color: "#22c55e", scope: "Living room only" },
    { name: "Dog sitter",     expires: "Until Oct 28",      color: "#a855f7", scope: "All rooms" },
  ];
  return (
    <Phone>
      <Header title="Family & guests" right={<button className="btn btn-primary btn-sm"><svg className="ic-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"/></svg>Invite</button>}/>
      <div style={{ flex: 1, overflow: "auto", padding: "0 20px 24px" }}>

        {/* Invite share card */}
        <div className="card" style={{ padding: 14, marginBottom: 16, background: "linear-gradient(135deg, rgba(var(--primary-rgb),.12), transparent)", border: "1px solid var(--border)" }}>
          <div className="muted small" style={{ textTransform: "uppercase", letterSpacing: ".06em", fontWeight: 500, marginBottom: 4 }}>Invite link</div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <code style={{ flex: 1, fontFamily: "Geist Mono, ui-monospace, monospace", fontSize: 18, fontWeight: 600, letterSpacing: ".08em" }}>PX-7Q4M</code>
            <button className="btn btn-outline btn-sm">Copy</button>
            <button className="btn btn-outline btn-sm">QR</button>
          </div>
          <div className="muted small" style={{ marginTop: 6 }}>Expires in 23 hours · regenerate anytime</div>
        </div>

        {/* Members */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
          <div className="muted small" style={{ textTransform: "uppercase", letterSpacing: ".06em", fontWeight: 500 }}>Members ({members.length})</div>
          <div className="muted small">Full home access</div>
        </div>
        <div className="card" style={{ marginBottom: 18 }}>
          {members.map(m => (
            <div className="row" key={m.email}>
              <span style={{
                width: 36, height: 36, borderRadius: 999, background: m.color, color: "#fff",
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                fontSize: 13, fontWeight: 700, flexShrink: 0,
              }}>{m.name[0]}</span>
              <div className="label-wrap">
                <div className="t" style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  {m.name}{m.you && <span className="muted small" style={{ fontWeight: 400 }}>· you</span>}
                </div>
                <div className="s">{m.email}</div>
              </div>
              <span style={{
                fontSize: 11, fontWeight: 600, padding: "3px 8px", borderRadius: 999,
                background: m.role === "Owner" ? "rgba(var(--primary-rgb),.12)" : "var(--muted)",
                color: m.role === "Owner" ? "var(--primary)" : "var(--foreground)",
              }}>{m.role}</span>
              {!m.you && <svg className="ic-sm chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>}
            </div>
          ))}
        </div>

        {/* Guests */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
          <div className="muted small" style={{ textTransform: "uppercase", letterSpacing: ".06em", fontWeight: 500 }}>Guests ({guests.length})</div>
          <div className="muted small">Time-limited · scoped</div>
        </div>
        <div className="card" style={{ marginBottom: 18 }}>
          {guests.map(g => (
            <div className="row" key={g.name}>
              <span style={{
                width: 36, height: 36, borderRadius: 999, background: g.color, color: "#fff",
                display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>
              </span>
              <div className="label-wrap">
                <div className="t">{g.name}</div>
                <div className="s">{g.expires} · {g.scope}</div>
              </div>
              <button className="btn btn-ghost btn-icon-sm" aria-label="Revoke">
                <svg className="ic-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>
            </div>
          ))}
        </div>

        {/* Permissions */}
        <div className="muted small" style={{ marginBottom: 8, textTransform: "uppercase", letterSpacing: ".06em", fontWeight: 500 }}>Default for new members</div>
        <div className="card" style={{ marginBottom: 12 }}>
          <div className="row">
            <div className="label-wrap"><div className="t">Can add new devices</div></div>
            <label className="switch"><input type="checkbox" defaultChecked/><span className="track"><span className="thumb"/></span></label>
          </div>
          <div className="row">
            <div className="label-wrap"><div className="t">Can edit automations</div></div>
            <label className="switch"><input type="checkbox" defaultChecked/><span className="track"><span className="thumb"/></span></label>
          </div>
          <div className="row">
            <div className="label-wrap"><div className="t">Can invite others</div></div>
            <label className="switch"><input type="checkbox"/><span className="track"><span className="thumb"/></span></label>
          </div>
          <div className="row">
            <div className="label-wrap"><div className="t">Notify when away</div><div className="s">Members get alerts when nobody's home</div></div>
            <label className="switch"><input type="checkbox" defaultChecked/><span className="track"><span className="thumb"/></span></label>
          </div>
        </div>
      </div>
    </Phone>
  );
}
