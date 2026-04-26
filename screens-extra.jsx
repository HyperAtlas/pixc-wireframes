// ===== Additional screens for completeness =====

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
          <div style={{ width: 40, height: 40, borderRadius: 10, background: "var(--card)", color: "var(--foreground)", border: "1px solid var(--border)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
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


Object.assign(window, { ScreenSharing, ScreenHelp, ScreenSearch });
