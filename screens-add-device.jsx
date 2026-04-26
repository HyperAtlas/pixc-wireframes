// ===== Add device flow =====
// Every screen in this flow shares the same animated hero (AddDeviceHero)
// in the same vertical position. Only the labels and the body content
// underneath the hero change between steps.

function StepDots({ step, total = 5 }) {
  return (
    <div style={{ display: "flex", gap: 4 }}>
      {Array.from({ length: total }).map((_, i) => (
        <span key={i} style={{
          flex: 1, height: 4, borderRadius: 2,
          background: i < step ? "var(--foreground)" : "var(--border)"
        }}/>
      ))}
    </div>
  );
}

// Shared shell — Header + step dots + hero block always in the same place.
function AddDeviceShell({ title, step, hero, children, footer }) {
  return (
    <Phone>
      <Header title={title}/>
      <div style={{ padding: "0 24px" }}><StepDots step={step}/></div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "0 24px 20px", minHeight: 0 }}>
        {hero}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", minHeight: 0 }}>
          {children}
        </div>
        {footer}
      </div>
    </Phone>
  );
}

// 01 · Scanning
function ScreenScanning() {
  return (
    <AddDeviceShell
      title="Add device"
      step={1}
      hero={<AddDeviceHero state="scanning" label="Scanning for devices" sub="Make sure your device is in pairing mode."/>}
      footer={<button className="btn btn-outline btn-lg btn-block">Cancel</button>}
    >
      <div className="card" style={{ marginTop: 8 }}>
        <div className="row">
          <div className="icon-wrap"><svg className="ic-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5a10 10 0 0 1 14 0"/><path d="M8.5 16a5 5 0 0 1 7 0"/><circle cx="12" cy="19.5" r=".8" fill="currentColor"/></svg></div>
          <div className="label-wrap"><div className="t">Bluetooth & Wi-Fi</div><div className="s">Both required for setup</div></div>
          <span className="badge badge-success">On</span>
        </div>
      </div>
    </AddDeviceShell>
  );
}

// 01 · Scanning · empty result
function ScreenScanningEmpty() {
  return (
    <AddDeviceShell
      title="Add device"
      step={1}
      hero={<AddDeviceHero state="no-signal" label="No devices found" sub="Make sure your device is powered on, in pairing mode, and within 10 meters."/>}
      footer={<button className="btn btn-primary btn-lg btn-block">Try again</button>}
    >
      <div className="card" style={{ marginTop: 8 }}>
        <div className="row">
          <div className="icon-wrap" style={{ background: "var(--primary-soft)", color: "var(--primary)" }}>
            <svg className="ic-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 8v4"/><circle cx="12" cy="16" r=".8" fill="currentColor"/></svg>
          </div>
          <div className="label-wrap"><div className="t">Troubleshoot</div><div className="s">Reset your device or check the indicator light.</div></div>
          <svg className="ic-sm chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
        </div>
      </div>
    </AddDeviceShell>
  );
}

// 02 · Devices found
function ScreenDevicesFound() {
  const devices = [
    { name: "PixC Lyt", id: "AA:F2:1B", strong: true },
    { name: "PixC Strip 01", id: "BC:39:7C", strong: true },
    { name: "PixC Bulb 02", id: "DA:11:30", strong: false },
  ];
  return (
    <AddDeviceShell
      title="Add device"
      step={2}
      hero={<AddDeviceHero state="scanning" label={`${devices.length} devices found`} sub="Tap a device to begin pairing."/>}
      footer={<button className="btn btn-outline btn-lg btn-block">Cancel</button>}
    >
      <div className="card" style={{ marginTop: 6 }}>
        {devices.map((d, i) => (
          <div className="row" key={i}>
            <div className="icon-wrap" style={{ background: "#0a0a0a" }}><RgbMark size={22}/></div>
            <div className="label-wrap">
              <div className="t">{d.name}</div>
              <div className="s mono">{d.id}</div>
            </div>
            <svg width="14" height="10" viewBox="0 0 14 10" style={{ color: d.strong ? "var(--foreground)" : "var(--border-strong)" }}>
              <rect x="0" y="7" width="2" height="3" rx=".5" fill="currentColor"/>
              <rect x="4" y="4" width="2" height="6" rx=".5" fill="currentColor"/>
              <rect x="8" y="2" width="2" height="8" rx=".5" fill={d.strong ? "currentColor" : "var(--border)"}/>
              <rect x="12" y="0" width="2" height="10" rx=".5" fill={d.strong ? "currentColor" : "var(--border)"}/>
            </svg>
            <svg className="ic-sm chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
          </div>
        ))}
      </div>
    </AddDeviceShell>
  );
}

// 03 · Wi-Fi credentials
function ScreenWifi() {
  return (
    <AddDeviceShell
      title="Wi-Fi setup"
      step={3}
      hero={<AddDeviceHero state="wifi" label="Connect to Wi-Fi" sub="PixC Lyt only supports 2.4 GHz networks."/>}
      footer={
        <>
          <div className="muted small" style={{ textAlign: "center", marginBottom: 12 }}>
            Credentials are stored encrypted on the device.
          </div>
          <button className="btn btn-primary btn-lg btn-block">Connect</button>
        </>
      }
    >
      <div style={{ marginTop: 8 }}>
        <label className="field-label">Network</label>
        <div className="input" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <svg className="ic-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5a10 10 0 0 1 14 0"/><path d="M8.5 16a5 5 0 0 1 7 0"/><circle cx="12" cy="19.5" r=".8" fill="currentColor"/></svg>
            Home_2.4G
          </span>
          <svg className="ic-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>
        </div>

        <label className="field-label" style={{ marginTop: 14 }}>Password</label>
        <div style={{ position: "relative" }}>
          <input className="input" type="password" defaultValue="•••••••••" style={{ paddingRight: 40 }}/>
          <button className="btn btn-ghost btn-icon-sm" style={{ position: "absolute", right: 4, top: 4 }} aria-label="Show password">
            <svg className="ic-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z"/><circle cx="12" cy="12" r="3"/></svg>
          </button>
        </div>

        <label style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 14, fontSize: 13 }}>
          <input type="checkbox" defaultChecked/> Remember this network
        </label>
      </div>
    </AddDeviceShell>
  );
}

// 04 · Pairing
function ScreenPairing() {
  return (
    <AddDeviceShell
      title="Setting up"
      step={4}
      hero={<AddDeviceHero state="pairing" label="Pairing your device" sub="This takes about 30 seconds. Keep the device powered on."/>}
    >
      <div className="card" style={{ marginTop: 6 }}>
        <div className="row">
          <div className="icon-wrap" style={{ background: "rgba(22,163,74,.10)", color: "var(--success)" }}>
            <svg className="ic-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
          </div>
          <div className="label-wrap"><div className="t">Connection established</div><div className="s">Bluetooth handshake complete</div></div>
        </div>
        <div className="row">
          <div className="icon-wrap" style={{ background: "rgba(22,163,74,.10)", color: "var(--success)" }}>
            <svg className="ic-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
          </div>
          <div className="label-wrap"><div className="t">Wi-Fi credentials sent</div><div className="s">Encrypted via TLS 1.3</div></div>
        </div>
        <div className="row">
          <div className="icon-wrap" style={{ background: "var(--primary-soft)", color: "var(--primary)" }}>
            <svg className="ic-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ animation: "spin 1s linear infinite" }}><path d="M21 12a9 9 0 1 1-6.2-8.5"/></svg>
          </div>
          <div className="label-wrap"><div className="t">Connecting to cloud</div><div className="s">Registering device…</div></div>
        </div>
        <div className="row">
          <div className="icon-wrap" style={{ background: "var(--muted)", color: "var(--muted-foreground)" }}>
            <span className="mono small">4</span>
          </div>
          <div className="label-wrap muted"><div className="t" style={{ fontWeight: 400 }}>Firmware check</div></div>
        </div>
      </div>

      <div style={{ marginTop: 16 }}>
        <div className="progress"><span style={{ width: "65%" }}/></div>
      </div>
      <style>{`@keyframes spin { from { transform: rotate(0)} to { transform: rotate(360deg)} }`}</style>
    </AddDeviceShell>
  );
}

// 05 · Success
function ScreenPairSuccess() {
  return (
    <AddDeviceShell
      title="All set"
      step={5}
      hero={<AddDeviceHero state="success" label="PixC Lyt is connected" sub="Your new device is online and ready."/>}
      footer={
        <>
          <button className="btn btn-primary btn-lg btn-block">Open device</button>
          <button className="btn btn-ghost btn-lg btn-block" style={{ marginTop: 4 }}>Add another</button>
        </>
      }
    >
      <div className="card" style={{ marginTop: 6 }}>
        <div className="row">
          <div className="icon-wrap" style={{ background: "#0a0a0a" }}><RgbMark size={22}/></div>
          <div className="label-wrap"><div className="t">PixC Lyt</div><div className="s">Living room · Online</div></div>
          <span className="badge badge-success">Online</span>
        </div>
        <div className="row">
          <div className="icon-wrap" style={{ background: "var(--muted)", color: "var(--muted-foreground)" }}>
            <svg className="ic-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12l3-3 3 3-3 3z"/><path d="M21 12l-3-3-3 3 3 3z"/><path d="M12 3l-3 3 3 3 3-3z"/><path d="M12 21l-3-3 3-3 3 3z"/></svg>
          </div>
          <div className="label-wrap"><div className="t">Assign to room</div><div className="s">Living room</div></div>
          <svg className="ic-sm chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
        </div>
      </div>

      {/* New-device promo: 1 month of PixC+ on the house */}
      <div className="card iot-card" style={{ marginTop: 12, padding: "12px 14px", display: "flex", gap: 12, alignItems: "center" }}>
        <span style={{
          width: 36, height: 36, borderRadius: 10,
          background: "linear-gradient(180deg, color-mix(in srgb, var(--primary) 22%, var(--card)), var(--card))",
          border: "1px solid color-mix(in srgb, var(--primary) 35%, var(--border))",
          color: "var(--primary)",
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
          boxShadow: "0 0 14px -3px color-mix(in srgb, var(--primary) 60%, transparent)",
        }}>
          <i className="fa-solid fa-gift" style={{ fontSize: 14 }}/>
        </span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", gap: 6 }}>
            1 month of PixC+ on us
          </div>
          <div className="muted" style={{ fontSize: 11.5, marginTop: 2, lineHeight: 1.4 }}>
            Set up your new device today and unlock multi-home, AI, and PixCluster free for 30 days.
          </div>
        </div>
        <button className="btn btn-primary btn-sm" style={{ flexShrink: 0 }}>Claim</button>
      </div>
    </AddDeviceShell>
  );
}

Object.assign(window, { AddDeviceShell, ScreenScanning, ScreenScanningEmpty, ScreenDevicesFound, ScreenWifi, ScreenPairing, ScreenPairSuccess });
