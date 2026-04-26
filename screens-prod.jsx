// ===== Production-fill screens =====
// Adds the production-critical wireframes that were missing from the
// initial pass: firmware/OTA, device troubleshoot, sign-out confirm,
// permission pre-prompt, delete-account. Each screen is self-contained
// and uses the shared Phone, Header and shadcn-style tokens.

// ---- Bluetooth / Wi-Fi permission pre-prompt -----------------------------
// Shown before triggering the OS-native permission dialog so the user
// understands the why and is more likely to accept.
function ScreenPermissionPrompt({ kind = "bluetooth" }) {
  const config = {
    bluetooth: {
      title: "Allow Bluetooth access",
      sub: "PixC uses Bluetooth to discover and pair nearby devices. We never use it to track your location.",
      icon: <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M7 7l10 10-5 5V2l5 5L7 17"/></svg>,
    },
    wifi: {
      title: "Allow local network",
      sub: "PixC needs to talk to bulbs and hubs on your home network. Required for setup and direct local control.",
      icon: <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5a10 10 0 0 1 14 0"/><path d="M8.5 16a5 5 0 0 1 7 0"/><circle cx="12" cy="19.5" r=".8" fill="currentColor"/></svg>,
    },
    location: {
      title: "Allow location access",
      sub: "Location enables presence-based automations like 'turn lights on when I arrive home'. Always optional.",
      icon: <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-7 8-13a8 8 0 1 0-16 0c0 6 8 13 8 13z"/><circle cx="12" cy="9" r="3"/></svg>,
    },
  }[kind];

  return (
    <Phone>
      <Header title=""/>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "0 24px 24px" }}>
        <div style={{
          width: 80, height: 80, borderRadius: 22,
          background: "var(--primary-soft)", color: "var(--primary)",
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          marginBottom: 24,
        }}>{config.icon}</div>

        <div className="h1" style={{ marginBottom: 6 }}>{config.title}</div>
        <div className="muted" style={{ fontSize: 14, marginBottom: 20 }}>{config.sub}</div>

        <div className="card" style={{ padding: 14 }}>
          <div className="row" style={{ padding: "10px 12px" }}>
            <div className="icon-wrap" style={{ background: "rgba(22,163,74,.10)", color: "var(--success)" }}>
              <svg className="ic-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
            </div>
            <div className="label-wrap"><div className="t">Required to set up devices</div></div>
          </div>
          <div className="row" style={{ padding: "10px 12px" }}>
            <div className="icon-wrap" style={{ background: "rgba(22,163,74,.10)", color: "var(--success)" }}>
              <svg className="ic-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
            </div>
            <div className="label-wrap"><div className="t">Used only while you're in PixC</div></div>
          </div>
          <div className="row" style={{ padding: "10px 12px" }}>
            <div className="icon-wrap" style={{ background: "rgba(22,163,74,.10)", color: "var(--success)" }}>
              <svg className="ic-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
            </div>
            <div className="label-wrap"><div className="t">Never shared with third parties</div></div>
          </div>
        </div>

        <div style={{ flex: 1 }}/>
        <button className="btn btn-primary btn-lg btn-block">Continue</button>
        <button className="btn btn-ghost btn-lg btn-block" style={{ marginTop: 4, color: "var(--muted-foreground)" }}>Not now</button>
      </div>
    </Phone>
  );
}

// ---- Device offline + troubleshoot ---------------------------------------
function ScreenDeviceTroubleshoot() {
  const steps = [
    { t: "Power cycle the device",         s: "Unplug for 10 seconds, then plug it back in.", icon: <svg className="ic-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18.36 6.64a9 9 0 1 1-12.73 0"/><path d="M12 2v10"/></svg> },
    { t: "Check Wi-Fi reception",          s: "The device should be within 10 m of the router.", icon: <svg className="ic-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5a10 10 0 0 1 14 0"/><path d="M8.5 16a5 5 0 0 1 7 0"/><circle cx="12" cy="19.5" r=".8" fill="currentColor"/></svg> },
    { t: "Confirm 2.4 GHz network",        s: "PixC devices don't connect to 5 GHz Wi-Fi.", icon: <svg className="ic-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M7 10v4M11 8v8M15 11v3M19 9v6"/></svg> },
    { t: "Re-pair the device",             s: "Reset the device and pair it again.", icon: <svg className="ic-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"/></svg> },
  ];
  return (
    <Phone>
      <Header title="Troubleshoot"/>
      <div style={{ flex: 1, overflow: "auto", padding: "0 20px 24px" }}>
        <div className="card" style={{ padding: 16, marginBottom: 18, background: "rgba(220,38,38,.06)", border: "1px solid rgba(220,38,38,.18)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ width: 10, height: 10, borderRadius: 999, background: "var(--destructive)", boxShadow: "0 0 0 4px rgba(220,38,38,.18)" }}/>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600 }}>PixC Lyt is offline</div>
              <div className="muted small">Last seen 2 minutes ago · Living room</div>
            </div>
          </div>
        </div>

        <div className="muted small" style={{ marginBottom: 8, textTransform: "uppercase", letterSpacing: ".06em", fontWeight: 500 }}>Try these steps</div>
        <div className="card" style={{ marginBottom: 18 }}>
          {steps.map((step, i) => (
            <div className="row" key={i}>
              <div className="icon-wrap" style={{ background: "var(--primary-soft)", color: "var(--primary)" }}>{step.icon}</div>
              <div className="label-wrap"><div className="t">{step.t}</div><div className="s">{step.s}</div></div>
              <svg className="ic-sm chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
            </div>
          ))}
        </div>

        <div className="muted small" style={{ marginBottom: 8, textTransform: "uppercase", letterSpacing: ".06em", fontWeight: 500 }}>Still need help?</div>
        <div className="card">
          <div className="row">
            <div className="icon-wrap"><svg className="ic-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg></div>
            <div className="label-wrap"><div className="t">Contact support</div><div className="s">Avg. reply 4 min</div></div>
            <svg className="ic-sm chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
          </div>
        </div>
      </div>
    </Phone>
  );
}

// ---- OTA / firmware update flow ------------------------------------------
function ScreenOtaProgress({ stage = "downloading" }) {
  // stage: "available" | "downloading" | "installing" | "success"
  const stages = [
    { id: "downloading", label: "Downloading 2.6.1", pct: 64,  sub: "12 MB of 18 MB" },
    { id: "installing",  label: "Installing on device", pct: 100, sub: "Don't power off the device" },
  ];
  const current = stages.find(s => s.id === stage) || stages[0];
  return (
    <Phone>
      <Header title="Firmware update"/>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "0 24px 24px" }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 18 }}>
          <div style={{ position: "relative", width: 140, height: 140 }}>
            {/* Progress ring */}
            <svg width="140" height="140" viewBox="0 0 140 140">
              <circle cx="70" cy="70" r="62" stroke="var(--muted)" strokeWidth="8" fill="none"/>
              <circle cx="70" cy="70" r="62" stroke="var(--primary)" strokeWidth="8" fill="none"
                strokeDasharray={`${(current.pct / 100) * 389.6} 389.6`}
                strokeLinecap="round"
                transform="rotate(-90 70 70)"/>
            </svg>
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
              <div className="h2" style={{ fontVariantNumeric: "tabular-nums" }}>{current.pct}%</div>
              <div className="muted small">{current.sub}</div>
            </div>
          </div>

          <div style={{ textAlign: "center" }}>
            <div className="h2">{current.label}</div>
            <div className="muted" style={{ fontSize: 14, marginTop: 4, maxWidth: 280 }}>
              Keep PixC open while we update PixC Lyt.
            </div>
          </div>

          <div className="card" style={{ width: "100%", padding: 12, display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ width: 28, height: 28, borderRadius: 8, background: "var(--primary-soft)", color: "var(--primary)", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5M12 16v.01"/></svg>
            </span>
            <div className="small muted">Updates apply security patches and improve LightSync latency.</div>
          </div>
        </div>

        <button className="btn btn-outline btn-lg btn-block" disabled>Updating…</button>
      </div>
    </Phone>
  );
}

function ScreenOtaSuccess() {
  return (
    <Phone>
      <Header title="Firmware update"/>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "0 24px 24px" }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 18 }}>
          <div style={{
            width: 96, height: 96, borderRadius: 999,
            background: "rgba(22,163,74,.10)", color: "var(--success)",
            display: "inline-flex", alignItems: "center", justifyContent: "center",
          }}>
            <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
          </div>
          <div style={{ textAlign: "center" }}>
            <div className="h2">Up to date</div>
            <div className="muted" style={{ fontSize: 14, marginTop: 4, maxWidth: 280 }}>
              PixC Lyt is now running firmware 2.6.1.
            </div>
          </div>

          <div className="card" style={{ width: "100%", padding: 14 }}>
            <div className="muted small" style={{ textTransform: "uppercase", letterSpacing: ".06em", fontWeight: 500, marginBottom: 6 }}>What's new</div>
            <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, lineHeight: 1.5 }}>
              <li>LightSync wireless latency reduced by 40 ms</li>
              <li>Stability fix for 2.4 GHz networks with 802.11ax routers</li>
              <li>New "Sunrise" preset</li>
            </ul>
          </div>
        </div>

        <button className="btn btn-primary btn-lg btn-block">Done</button>
      </div>
    </Phone>
  );
}

// ---- Sign-out confirm (dialog-style screen) ------------------------------
function ScreenSignOutConfirm() {
  return (
    <Phone>
      <div style={{
        position: "absolute", inset: 0,
        background: "var(--overlay-scrim)",
        backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "0 24px",
      }}>
        <div className="card" style={{
          width: "100%", maxWidth: 320, padding: 20,
          background: "var(--background)",
          boxShadow: "0 24px 48px -16px rgba(0,0,0,.25)",
          textAlign: "center",
        }}>
          <div style={{
            width: 56, height: 56, borderRadius: 16,
            background: "rgba(220,38,38,.10)", color: "var(--destructive)",
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 14px",
          }}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="M16 17l5-5-5-5"/><path d="M21 12H9"/></svg>
          </div>
          <div style={{ fontSize: 17, fontWeight: 600, letterSpacing: "-0.01em" }}>Sign out of PixC?</div>
          <div className="muted" style={{ fontSize: 13, marginTop: 6, lineHeight: 1.45 }}>
            Your devices stay paired. You'll need to sign back in to control them from this phone.
          </div>
          <button className="btn btn-block" style={{
            marginTop: 16, height: 44, background: "var(--destructive)", color: "#fff",
          }}>Sign out</button>
          <button className="btn btn-ghost btn-block" style={{ marginTop: 6 }}>Cancel</button>
        </div>
      </div>
    </Phone>
  );
}

// ---- Delete account ------------------------------------------------------
function ScreenDeleteAccount() {
  return (
    <Phone>
      <Header title="Delete account"/>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "0 24px 24px" }}>
        <div style={{
          width: 64, height: 64, borderRadius: 16,
          background: "rgba(220,38,38,.10)", color: "var(--destructive)",
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          marginBottom: 16,
        }}>
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16v.01"/></svg>
        </div>

        <div className="h1" style={{ marginBottom: 6 }}>This can't be undone</div>
        <div className="muted" style={{ fontSize: 14, marginBottom: 18 }}>
          Deleting your account removes your homes, paired devices, automations, and usage history.
        </div>

        <div className="card" style={{ padding: 14, marginBottom: 18 }}>
          {[
            "All homes you own will be deleted",
            "Paired devices will reset to factory state",
            "Members will lose access immediately",
            "Energy and event history will be wiped",
          ].map((t, i, arr) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderTop: i === 0 ? "0" : "1px solid var(--border)" }}>
              <span style={{ width: 6, height: 6, borderRadius: 999, background: "var(--destructive)", flexShrink: 0 }}/>
              <span style={{ fontSize: 13 }}>{t}</span>
            </div>
          ))}
        </div>

        <label className="field-label">Type "DELETE" to confirm</label>
        <input className="input" placeholder="DELETE"/>

        <div style={{ flex: 1 }}/>
        <button className="btn btn-block btn-lg" style={{ background: "var(--destructive)", color: "#fff" }} disabled>
          Delete account permanently
        </button>
        <button className="btn btn-ghost btn-lg btn-block" style={{ marginTop: 4 }}>Cancel</button>
      </div>
    </Phone>
  );
}

// ---- Create new home -----------------------------------------------------
function ScreenCreateHome() {
  return (
    <Phone>
      <Header title="Create home"/>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "0 24px 24px" }}>
        <div style={{
          width: 64, height: 64, borderRadius: 16,
          background: "var(--primary-soft)", color: "var(--primary)",
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          marginBottom: 16,
        }}>
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/><path d="M9 20v-5h6v5"/></svg>
        </div>

        <div className="h1" style={{ marginBottom: 6 }}>Name your home</div>
        <div className="muted" style={{ fontSize: 14, marginBottom: 20 }}>
          You can rename it any time and add up to four more later.
        </div>

        <label className="field-label">Home name</label>
        <input className="input" defaultValue="Rayon's apartment"/>

        <label className="field-label" style={{ marginTop: 14 }}>Type</label>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
          {[
            { id: "apt", t: "Apartment",  icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="3" width="16" height="18" rx="1.5"/><path d="M9 7h.01M15 7h.01M9 12h.01M15 12h.01M9 17h.01M15 17h.01"/></svg> },
            { id: "house", t: "House",    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/></svg> },
            { id: "studio", t: "Studio",  icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="6" width="18" height="14" rx="1.5"/><path d="M3 10h18"/></svg> },
          ].map((x, i) => (
            <button key={x.id} style={{
              padding: 14, borderRadius: 14,
              background: i === 0 ? "var(--primary-soft)" : "var(--card)",
              border: i === 0 ? "1.5px solid var(--primary)" : "1px solid var(--border)",
              color: i === 0 ? "var(--primary-soft-fg)" : "var(--foreground)",
              cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
            }}>
              {x.icon}
              <span style={{ fontSize: 13, fontWeight: 600 }}>{x.t}</span>
            </button>
          ))}
        </div>

        <div style={{ flex: 1 }}/>
        <button className="btn btn-primary btn-lg btn-block">Create home</button>
      </div>
    </Phone>
  );
}

// ---- Reset App-lock passcode — passwordless, email-OTP flow ------------
// Step 1 of 4: request a verification code to the account email.
function ScreenResetAppLockPasscode() {
  return (
    <Phone>
      <Header title="Reset App-lock passcode"/>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "0 24px 24px" }}>
        <div style={{
          width: 64, height: 64, borderRadius: 16,
          background: "var(--primary-soft)", color: "var(--primary)",
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          marginBottom: 16,
        }}>
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/><path d="M12 15v2"/></svg>
        </div>

        <div className="h1" style={{ marginBottom: 6 }}>Reset App-lock passcode</div>
        <div className="muted" style={{ fontSize: 14, marginBottom: 20 }}>
          We'll email a 6-digit verification code. Enter it on the next step, then choose a new passcode.
        </div>

        <div className="card" style={{ padding: 0, marginBottom: 18 }}>
          <div className="row">
            <div className="icon-wrap" style={{ background: "var(--primary-soft)", color: "var(--primary)" }}>
              <svg className="ic-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>
            </div>
            <div className="label-wrap">
              <div className="t">Send code to</div>
              <div className="s mono">rayon@email.com</div>
            </div>
          </div>
        </div>

        <button className="btn btn-primary btn-lg btn-block">Send verification code</button>

        <div style={{ flex: 1 }}/>

        <div className="card" style={{ padding: 12, display: "flex", gap: 10, alignItems: "flex-start", background: "var(--muted)", border: 0 }}>
          <span style={{ width: 28, height: 28, borderRadius: 8, background: "var(--background)", color: "var(--muted-foreground)", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5M12 16v.01"/></svg>
          </span>
          <div className="small" style={{ flex: 1 }}>
            Locked out of your email too? <button className="btn btn-ghost btn-sm" style={{ height: "auto", padding: 0, fontSize: 13, color: "var(--primary)", fontWeight: 600 }}>Contact support</button>
          </div>
        </div>
      </div>
    </Phone>
  );
}

// Step 2 of 4: enter the 6-digit code we emailed.
function ScreenResetAppLockVerify({ error }) {
  const digits = error ? ["1","2","3","8","8","8"] : ["4","2","8","","",""];
  return (
    <Phone>
      <Header title="Verify code"/>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "0 24px 24px" }}>
        <div style={{
          width: 56, height: 56, borderRadius: 16,
          background: "var(--primary-soft)", color: "var(--primary)",
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          marginBottom: 14,
        }}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>
        </div>

        <div className="h1" style={{ marginBottom: 6 }}>Enter the code</div>
        <div className="muted" style={{ fontSize: 14, marginBottom: 20 }}>
          We sent a 6-digit code to <span style={{ color: "var(--foreground)", fontWeight: 500 }}>r***n@email.com</span>. It expires in 10 minutes.
        </div>

        <div style={{ display: "flex", gap: 8, justifyContent: "space-between", marginBottom: 12 }}>
          {[0,1,2,3,4,5].map(i => (
            <div key={i} style={{
              width: 48, height: 56,
              border: `1px solid ${error ? "var(--destructive)" : (i === 3 ? "var(--ring)" : "var(--input)")}`,
              borderRadius: 10,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 20, fontWeight: 500,
              boxShadow: i === 3 && !error ? "0 0 0 3px rgba(var(--primary-rgb),.18)" : undefined,
              fontFamily: "Geist Mono, monospace",
            }}>{digits[i]?.trim()}</div>
          ))}
        </div>

        {error
          ? <div style={{ color: "var(--destructive)", fontSize: 13, fontWeight: 500, display: "flex", alignItems: "center", gap: 6 }}>
              <svg className="ic-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              Invalid code. Try again.
            </div>
          : <div className="muted small">Didn't get it? Check spam, or resend below.</div>
        }

        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 24 }}>
          <button className="btn btn-primary btn-lg btn-block">Verify</button>
          <button className="btn btn-ghost btn-lg btn-block">Resend code</button>
        </div>

        <div style={{ flex: 1 }}/>
        <div className="muted small" style={{ textAlign: "center" }}>
          Locked out of your email? <span style={{ color: "var(--primary)", fontWeight: 600 }}>Contact support</span>
        </div>
      </div>
    </Phone>
  );
}

// Step 5 (success): passcode reset complete. Slight variant of setup-success copy.
function ScreenAppLockResetSuccess() {
  return (
    <Phone>
      <Header title=""/>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "0 24px 24px" }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 18 }}>
          <div style={{ width: 88, height: 88, borderRadius: 999, background: "rgba(22,163,74,.10)", color: "var(--success)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
          </div>
          <div style={{ textAlign: "center" }}>
            <div className="h2">Passcode reset</div>
            <div className="muted" style={{ fontSize: 14, marginTop: 6, maxWidth: 280 }}>
              Use your new passcode the next time PixC asks to unlock.
            </div>
          </div>
          <div className="card" style={{ width: "100%", padding: 14, background: "var(--muted)", border: 0 }}>
            <div className="muted small" style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5M12 16v.01"/></svg>
              For your security, all signed-in devices were notified of this change.
            </div>
          </div>
        </div>
        <button className="btn btn-primary btn-lg btn-block">Done</button>
      </div>
    </Phone>
  );
}

// ---- App-lock setup flow -------------------------------------------------
// 1. Intro: explain App-lock, pick method (biometric / passcode / both)
function ScreenAppLockSetupIntro() {
  const [method, setMethod] = React.useState("both");
  const options = [
    { id: "bio",     t: "Biometric only",      s: "Use your phone's biometrics at app launch.",
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/><circle cx="12" cy="11" r="3"/><path d="M8 17c1-2 2.5-3 4-3s3 1 4 3"/></svg> },
    { id: "pin",     t: "4-digit passcode",    s: "Required if biometrics aren't available.",
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg> },
    { id: "both",    t: "Biometric + passcode", s: "Recommended. Falls back to passcode after 3 failures.",
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6z"/><path d="M9 12l2 2 4-4"/></svg> },
  ];
  return (
    <Phone>
      <Header title="Turn on App-lock"/>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "0 24px 24px" }}>
        <div style={{
          width: 64, height: 64, borderRadius: 16,
          background: "var(--primary-soft)", color: "var(--primary)",
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          marginBottom: 16,
        }}>
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>
        </div>
        <div className="h1" style={{ marginBottom: 6 }}>Lock the app</div>
        <div className="muted" style={{ fontSize: 14, marginBottom: 18 }}>
          App-lock prompts before opening PixC, so guests can't change your home setup.
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 18 }}>
          {options.map(o => {
            const sel = method === o.id;
            return (
              <button key={o.id} onClick={() => setMethod(o.id)} className="card" style={{
                padding: 12, display: "flex", alignItems: "center", gap: 12,
                textAlign: "left", cursor: "pointer", font: "inherit",
                background: sel ? "var(--primary-soft)" : "var(--card)",
                border: sel ? "1.5px solid var(--primary)" : "1px solid var(--border)",
                color: "var(--foreground)",
              }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 10, flex: "0 0 auto",
                  background: sel ? "var(--primary)" : "var(--muted)",
                  color: sel ? "var(--primary-foreground)" : "var(--foreground)",
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                }}>{o.icon}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{o.t}</div>
                  <div className="muted small" style={{ marginTop: 2 }}>{o.s}</div>
                </div>
                <span aria-hidden style={{
                  width: 20, height: 20, borderRadius: 999,
                  border: sel ? "6px solid var(--primary)" : "1.5px solid var(--border-strong)",
                  background: "var(--background)", boxSizing: "border-box",
                }}/>
              </button>
            );
          })}
        </div>

        <div style={{ flex: 1 }}/>
        <button className="btn btn-primary btn-lg btn-block">Continue</button>
        <button className="btn btn-ghost btn-lg btn-block" style={{ marginTop: 4 }}>Skip for now</button>
      </div>
    </Phone>
  );
}

// 2. Choose passcode (numeric input)
function ScreenAppLockSetPasscode({ confirm }) {
  return (
    <Phone>
      <Header title={confirm ? "Confirm passcode" : "Create passcode"}/>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "0 24px 24px", alignItems: "center" }}>
        <div style={{
          width: 56, height: 56, borderRadius: 16,
          background: "var(--primary-soft)", color: "var(--primary)",
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          marginTop: 16, marginBottom: 14,
        }}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>
        </div>
        <div className="h2" style={{ textAlign: "center" }}>{confirm ? "Re-enter to confirm" : "Choose a 4-digit passcode"}</div>
        <div className="muted" style={{ fontSize: 13, marginTop: 6, textAlign: "center", maxWidth: 280 }}>
          You'll enter this passcode each time you open PixC.
        </div>

        <div style={{ display: "flex", gap: 14, marginTop: 28 }}>
          {[0,1,2,3].map(i => (
            <span key={i} style={{
              width: 14, height: 14, borderRadius: 999,
              border: "1.5px solid var(--border-strong)",
              background: i < (confirm ? 4 : 2) ? "var(--foreground)" : "transparent",
            }}/>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 64px)", gap: 14, marginTop: 28 }}>
          {[1,2,3,4,5,6,7,8,9].map(n => (
            <button key={n} style={{
              width: 64, height: 64, borderRadius: 999,
              background: "var(--muted)", border: "1px solid var(--border)",
              color: "var(--foreground)", fontSize: 22, fontWeight: 500, cursor: "pointer",
            }}>{n}</button>
          ))}
          <span/>
          <button style={{ width: 64, height: 64, borderRadius: 999, background: "var(--muted)", border: "1px solid var(--border)", color: "var(--foreground)", fontSize: 22, fontWeight: 500, cursor: "pointer" }}>0</button>
          <button aria-label="Delete" style={{ width: 64, height: 64, borderRadius: 999, background: "transparent", border: 0, color: "var(--muted-foreground)", display: "inline-flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
            <svg width="20" height="16" viewBox="0 0 24 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 3H8L2 9l6 6h14a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1z"/><path d="M18 6l-6 6M12 6l6 6"/></svg>
          </button>
        </div>
      </div>
    </Phone>
  );
}

// 3. Setup success
function ScreenAppLockSetupSuccess() {
  return (
    <Phone>
      <Header title=""/>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "0 24px 24px" }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 18 }}>
          <div style={{ width: 88, height: 88, borderRadius: 999, background: "rgba(22,163,74,.10)", color: "var(--success)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
          </div>
          <div style={{ textAlign: "center" }}>
            <div className="h2">App-lock is on</div>
            <div className="muted" style={{ fontSize: 14, marginTop: 6, maxWidth: 280 }}>
              You'll need biometrics or your passcode to open PixC from now on.
            </div>
          </div>
        </div>
        <button className="btn btn-primary btn-lg btn-block">Done</button>
      </div>
    </Phone>
  );
}

// ---- Device offline (full-screen device control state) ------------------
function ScreenDeviceOffline() {
  return (
    <Phone>
      <Header title="PixC Lyt" right={
        <button className="btn btn-ghost btn-icon-sm" aria-label="More">
          <svg className="ic-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="5" r="1.4"/><circle cx="12" cy="12" r="1.4"/><circle cx="12" cy="19" r="1.4"/></svg>
        </button>
      }/>
      <div className="empty-hero">
        <span className="ic-disc" style={{ color: "var(--destructive)" }}>
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5a10 10 0 0 1 14 0"/><path d="M8.5 16a5 5 0 0 1 7 0"/><circle cx="12" cy="19.5" r=".9" fill="currentColor" stroke="none"/><path d="M3 3l18 18"/></svg>
        </span>
        <div className="h2">PixC Lyt is offline</div>
        <div className="muted" style={{ fontSize: 14, marginTop: 4, maxWidth: 280 }}>
          We can't reach this device. It was last seen 2 minutes ago in <span style={{ color: "var(--foreground)", fontWeight: 500 }}>Living room</span>.
        </div>

        <div className="card" style={{ width: "100%", maxWidth: 320, marginTop: 22, padding: 0, background: "var(--background)" }}>
          <div className="row">
            <div className="icon-wrap" style={{ background: "var(--muted)", color: "var(--muted-foreground)" }}>
              <svg className="ic-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-6.2-8.5"/><path d="M21 4v5h-5"/></svg>
            </div>
            <div className="label-wrap"><div className="t">Retry connection</div><div className="s">Last attempt 30 s ago</div></div>
            <svg className="ic-sm chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
          </div>
          <div className="row">
            <div className="icon-wrap" style={{ background: "var(--primary-soft)", color: "var(--primary)" }}>
              <svg className="ic-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 8v4M12 16v.01"/></svg>
            </div>
            <div className="label-wrap"><div className="t">Open troubleshooter</div><div className="s">Step-by-step recovery</div></div>
            <svg className="ic-sm chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
          </div>
        </div>
      </div>
    </Phone>
  );
}

// ---- Pairing failed -----------------------------------------------------
function ScreenPairingFailed() {
  return (
    <AddDeviceShell
      title="Setup failed"
      step={4}
      hero={<AddDeviceHero state="error" label="Couldn't pair PixC Lyt" sub={<>The device responded but cloud registration timed out. Your network may be blocking outbound connections to <span className="mono" style={{ color: "var(--foreground)" }}>api.pixc.app</span>.</>}/>}
      footer={
        <>
          <button className="btn btn-primary btn-lg btn-block">Try again</button>
          <button className="btn btn-outline btn-lg btn-block" style={{ marginTop: 6 }}>Open troubleshooter</button>
          <button className="btn btn-ghost btn-lg btn-block" style={{ marginTop: 4, color: "var(--muted-foreground)" }}>Cancel setup</button>
        </>
      }
    >
      <div className="card" style={{ marginTop: 6, padding: 14, background: "rgba(220,38,38,.05)", border: "1px solid rgba(220,38,38,.2)" }}>
        <div className="muted small" style={{ textTransform: "uppercase", letterSpacing: ".06em", fontWeight: 500, marginBottom: 6, color: "var(--destructive)" }}>Error · CLOUD_TIMEOUT</div>
        <div className="small">Reset the device for 10 s and try again, or skip and pair from local control.</div>
      </div>
    </AddDeviceShell>
  );
}

// ---- Wi-Fi connect failed -----------------------------------------------
function ScreenWifiFailed() {
  return (
    <AddDeviceShell
      title="Wi-Fi setup"
      step={3}
      hero={<AddDeviceHero state="no-signal" label="Couldn't connect to Wi-Fi" sub={<><span style={{ color: "var(--foreground)", fontWeight: 500 }}>Home_2.4G</span> rejected the password, or the network is out of range of the device.</>}/>}
      footer={<button className="btn btn-primary btn-lg btn-block">Try again</button>}
    >
      <div className="card" style={{ marginTop: 6 }}>
        <div className="row">
          <div className="icon-wrap" style={{ background: "rgba(220,38,38,.10)", color: "var(--destructive)" }}>
            <svg className="ic-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M9 9l6 6M15 9l-6 6"/></svg>
          </div>
          <div className="label-wrap"><div className="t">Wrong password</div><div className="s">Tap to re-enter</div></div>
          <svg className="ic-sm chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
        </div>
        <div className="row">
          <div className="icon-wrap"><svg className="ic-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5a10 10 0 0 1 14 0"/><path d="M8.5 16a5 5 0 0 1 7 0"/><circle cx="12" cy="19.5" r=".8" fill="currentColor"/></svg></div>
          <div className="label-wrap"><div className="t">Use a different network</div></div>
          <svg className="ic-sm chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
        </div>
      </div>
    </AddDeviceShell>
  );
}

// ---- OTA failed ---------------------------------------------------------
function ScreenOtaFailed() {
  return (
    <Phone>
      <Header title="Firmware update"/>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "0 24px 24px" }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 18 }}>
          <div style={{
            width: 88, height: 88, borderRadius: 999,
            background: "rgba(220,38,38,.10)", color: "var(--destructive)",
            display: "inline-flex", alignItems: "center", justifyContent: "center",
          }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 8v5M12 17v.01"/></svg>
          </div>
          <div style={{ textAlign: "center" }}>
            <div className="h2">Update failed</div>
            <div className="muted" style={{ fontSize: 14, marginTop: 4, maxWidth: 280 }}>
              The device disconnected at 64%. It rolled back safely to firmware 2.5.4.
            </div>
          </div>

          <div className="card" style={{ width: "100%", padding: 14 }}>
            <div className="muted small" style={{ textTransform: "uppercase", letterSpacing: ".06em", fontWeight: 500, marginBottom: 6 }}>Error · CONN_LOST</div>
            <div className="small">Make sure the device stays powered and within Wi-Fi range during updates.</div>
          </div>
        </div>

        <button className="btn btn-primary btn-lg btn-block">Try again</button>
        <button className="btn btn-ghost btn-lg btn-block" style={{ marginTop: 4, color: "var(--muted-foreground)" }}>Skip for now</button>
      </div>
    </Phone>
  );
}

// ---- Generic error toast / sheet (network down etc.) -------------------
function ScreenGenericError() {
  return (
    <Phone>
      <Header title=""/>
      <div className="empty-hero">
        <span className="ic-disc" style={{ color: "var(--destructive)" }}>
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 8v5M12 17v.01"/></svg>
        </span>
        <div className="h2">Something went wrong</div>
        <div className="muted" style={{ fontSize: 14, marginTop: 4, maxWidth: 280 }}>
          We couldn't reach PixC's servers. Check your connection and try again.
        </div>
        <div className="card" style={{ width: "100%", maxWidth: 320, marginTop: 22, padding: 14 }}>
          <div className="muted small mono" style={{ marginBottom: 6 }}>Error · NETWORK_UNREACHABLE</div>
          <div className="small">Request to <span className="mono" style={{ color: "var(--foreground)" }}>api.pixc.app</span> timed out after 15 s.</div>
        </div>
        <button className="btn btn-primary btn-lg btn-block" style={{ maxWidth: 320, marginTop: 18 }}>Try again</button>
      </div>
    </Phone>
  );
}

Object.assign(window, {
  ScreenPermissionPrompt,
  ScreenDeviceTroubleshoot,
  ScreenOtaProgress,
  ScreenOtaSuccess,
  ScreenOtaFailed,
  ScreenSignOutConfirm,
  ScreenDeleteAccount,
  ScreenCreateHome,
  ScreenResetAppLockPasscode,
  ScreenResetAppLockVerify,
  ScreenAppLockResetSuccess,
  ScreenAppLockSetupIntro,
  ScreenAppLockSetPasscode,
  ScreenAppLockSetupSuccess,
  ScreenDeviceOffline,
  ScreenPairingFailed,
  ScreenWifiFailed,
  ScreenGenericError,
});
