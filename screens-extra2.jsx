// ===== Additional screens (round 2) =====
// - ScreenSearch: search across devices, rooms, presets
// - ScreenAddDeviceToRoom: pick from unassigned devices for an existing room
// - ScreenNewPalette: create a custom palette
// - ScreenPresetsEmpty: presets gallery — empty state
// - ScreenSegmentsEmpty: segments — empty state (uninitialized strip)

const { RgbMark, FigPillNav, DeviceTopBar } = window;

// ---- Search ----
function ScreenSearch() {
  const recent = ["Bedroom", "Movie night", "Strip 01"];
  const results = {
    devices: [
      { n: "PixC Lyt",  s: "Living room · Online",  c: "#a855f7" },
      { n: "Strip 01",  s: "Bedroom · Online",       c: "#22c55e" },
      { n: "Bulb 02",   s: "Kitchen · Off",          c: "#f59e0b" },
    ],
    rooms: [
      { n: "Living room", s: "4 devices" },
      { n: "Bedroom",     s: "3 devices" },
    ],
    presets: [
      { n: "Movie night", s: "All rooms · 2 lights",  g: "linear-gradient(135deg,#7c3aed,#1e1b4b)" },
      { n: "Reading",     s: "Bedroom · 1 light",     g: "linear-gradient(135deg,#fde68a,#f59e0b)" },
    ],
  };

  return (
    <Phone>
      {/* Search bar header */}
      <div style={{ padding: "8px 16px 0", display: "flex", alignItems: "center", gap: 8, flex: "0 0 auto" }}>
        <button className="btn btn-ghost btn-icon-sm" aria-label="Back">
          <svg className="ic-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <div style={{
          flex: 1, display: "flex", alignItems: "center", gap: 8,
          height: 38, padding: "0 12px", borderRadius: 12,
          border: "1px solid var(--border)", background: "var(--card)",
        }}>
          <svg className="ic-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--muted-foreground)" }}><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>
          <input
            placeholder="Search devices, rooms, presets…"
            defaultValue="bed"
            style={{
              flex: 1, border: 0, outline: "none", background: "transparent",
              fontSize: 13, fontFamily: "inherit", color: "var(--foreground)",
            }}
          />
          <button className="btn btn-ghost btn-icon-sm" aria-label="Clear" style={{ width: 22, height: 22, color: "var(--muted-foreground)" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M9 9l6 6M15 9l-6 6"/></svg>
          </button>
        </div>
      </div>

      <div style={{ flex: 1, overflow: "auto", padding: "16px 20px 24px" }}>
        {/* Recent */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
          <div className="muted small" style={{ textTransform: "uppercase", letterSpacing: ".06em", fontWeight: 500 }}>Recent</div>
          <button className="btn btn-ghost btn-sm" style={{ height: 22, fontSize: 11, color: "var(--muted-foreground)" }}>Clear</button>
        </div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 18 }}>
          {recent.map(r => (
            <span key={r} style={{
              padding: "5px 12px", borderRadius: 999,
              border: "1px solid var(--border)", background: "var(--card)",
              fontSize: 12, color: "var(--foreground)",
              display: "inline-flex", alignItems: "center", gap: 6,
            }}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--muted-foreground)" }}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>
              {r}
            </span>
          ))}
        </div>

        {/* Devices */}
        <div className="muted small" style={{ marginBottom: 8, textTransform: "uppercase", letterSpacing: ".06em", fontWeight: 500 }}>Devices</div>
        <div className="card" style={{ marginBottom: 16 }}>
          {results.devices.map(d => (
            <div className="row" key={d.n}>
              <div className="icon-wrap" style={{ background: d.c + "22", color: d.c }}>
                <div style={{ width: 16, height: 16, borderRadius: 5, background: d.c }}/>
              </div>
              <div className="label-wrap"><div className="t"><Hl text={d.n} q="bed"/></div><div className="s"><Hl text={d.s} q="bed"/></div></div>
              <svg className="ic-sm chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
            </div>
          ))}
        </div>

        {/* Rooms */}
        <div className="muted small" style={{ marginBottom: 8, textTransform: "uppercase", letterSpacing: ".06em", fontWeight: 500 }}>Rooms</div>
        <div className="card" style={{ marginBottom: 16 }}>
          {results.rooms.map(r => (
            <div className="row" key={r.n}>
              <div className="icon-wrap"><svg className="ic-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/></svg></div>
              <div className="label-wrap"><div className="t"><Hl text={r.n} q="bed"/></div><div className="s">{r.s}</div></div>
              <svg className="ic-sm chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
            </div>
          ))}
        </div>

        {/* Presets */}
        <div className="muted small" style={{ marginBottom: 8, textTransform: "uppercase", letterSpacing: ".06em", fontWeight: 500 }}>Presets</div>
        <div className="card">
          {results.presets.map(p => (
            <div className="row" key={p.n}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: p.g, flex: "0 0 auto" }}/>
              <div className="label-wrap"><div className="t">{p.n}</div><div className="s">{p.s}</div></div>
              <svg className="ic-sm chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
            </div>
          ))}
        </div>
      </div>
    </Phone>
  );
}

// Highlight matched substring
function Hl({ text, q }) {
  const i = text.toLowerCase().indexOf(q.toLowerCase());
  if (i < 0) return text;
  return (
    <>
      {text.slice(0, i)}
      <mark style={{ background: "var(--primary-soft)", color: "var(--primary)", padding: "0 2px", borderRadius: 3 }}>{text.slice(i, i + q.length)}</mark>
      {text.slice(i + q.length)}
    </>
  );
}

// ---- Add device to (existing) room ----
// Reachable from Edit room → "Add device to this room"
function ScreenAddDeviceToRoom() {
  return (
    <Phone>
      <Header title="Add to Living room"/>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div style={{ flex: 1, overflow: "auto", padding: "0 20px 16px" }}>
          <div className="muted small" style={{ marginBottom: 10 }}>Choose existing devices, or pair a new one.</div>

          <div className="muted small" style={{ marginBottom: 8, textTransform: "uppercase", letterSpacing: ".06em", fontWeight: 500 }}>Available devices</div>
          <div className="card" style={{ marginBottom: 14 }}>
            {[
              { n: "Bulb 02", s: "Unassigned · Online", c: "#f59e0b", k: "bulb", checked: true,
                ic: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18h6"/><path d="M10 21h4"/><path d="M12 3a6 6 0 0 0-4 10.5c.7.7 1 1.6 1 2.5v1h6v-1c0-.9.3-1.8 1-2.5A6 6 0 0 0 12 3z"/></svg> },
              { n: "Outlet 01", s: "Unassigned · Online", c: "#06b6d4",
                ic: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="3" width="16" height="18" rx="3"/><circle cx="9" cy="11" r="1.2"/><circle cx="15" cy="11" r="1.2"/><path d="M9 16h6"/></svg> },
              { n: "Sensor", s: "Unassigned · Online", c: "#22c55e",
                ic: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M5 12a7 7 0 0 1 14 0"/><path d="M2 12a10 10 0 0 1 20 0"/></svg> },
            ].map(d => (
              <div className="row" key={d.n}>
                <div className="icon-wrap" style={{ background: d.c + "22", color: d.c }}>{d.ic}</div>
                <div className="label-wrap"><div className="t">{d.n}</div><div className="s">{d.s}</div></div>
                <span style={{
                  width: 22, height: 22, borderRadius: 999,
                  border: `1.5px solid ${d.checked ? "var(--primary)" : "var(--border-strong)"}`,
                  background: d.checked ? "var(--primary)" : "transparent",
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                  flex: "0 0 auto",
                }}>
                  {d.checked && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>}
                </span>
              </div>
            ))}
          </div>

          <div className="muted small" style={{ marginBottom: 8, textTransform: "uppercase", letterSpacing: ".06em", fontWeight: 500 }}>Move from another room</div>
          <div className="card" style={{ marginBottom: 14 }}>
            {[
              { n: "Lamp", s: "Hallway · Online", c: "#3b82f6",
                ic: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3h8l3 7H5l3-7z"/><path d="M12 10v9"/><path d="M9 21h6"/></svg> },
            ].map(d => (
              <div className="row" key={d.n}>
                <div className="icon-wrap" style={{ background: d.c + "22", color: d.c }}>{d.ic}</div>
                <div className="label-wrap"><div className="t">{d.n}</div><div className="s">{d.s}</div></div>
                <button className="btn btn-outline btn-sm">Move</button>
              </div>
            ))}
          </div>

          <button className="btn btn-outline btn-block">
            <svg className="ic-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"/></svg>
            Pair a new device
          </button>
        </div>
        <div style={{ padding: "12px 20px 24px", borderTop: "1px solid var(--border)" }}>
          <button className="btn btn-primary btn-lg btn-block">Add 1 device</button>
        </div>
      </div>
    </Phone>
  );
}

// ---- New palette (custom palette creator) ----
function ScreenNewPalette() {
  const stops = [
    { c: "#ea580c", pos: 0 },
    { c: "#fb7185", pos: 33 },
    { c: "#a855f7", pos: 66 },
    { c: "#3b82f6", pos: 100 },
  ];
  const gradient = `linear-gradient(90deg, ${stops.map(s => `${s.c} ${s.pos}%`).join(", ")})`;
  const presetSwatches = [
    ["#ea580c","#fb7185","#a855f7","#3b82f6"],
    ["#22c55e","#06b6d4","#a855f7","#ec4899"],
    ["#0a0a0a","#27272a","#52525b","#a1a1aa"],
    ["#fde68a","#fbcfe8","#bae6fd","#bbf7d0"],
  ];
  return (
    <Phone>
      <Header title="New palette" right={<button className="btn btn-ghost btn-sm" style={{ color: "var(--primary)", fontWeight: 600 }}>Save</button>}/>
      <div style={{ flex: 1, overflow: "auto", padding: "0 20px 100px" }}>
        {/* Live preview */}
        <div className="muted small" style={{ marginBottom: 8, textTransform: "uppercase", letterSpacing: ".06em", fontWeight: 500 }}>Preview</div>
        <div className="card" style={{ padding: 12, marginBottom: 16 }}>
          <div style={{ height: 110, borderRadius: 10, background: gradient, marginBottom: 10 }}/>
          <div style={{ display: "flex", gap: 8 }}>
            {stops.map(s => <div key={s.c + s.pos} style={{ flex: 1, height: 36, borderRadius: 6, background: s.c }}/>)}
          </div>
        </div>

        {/* Name */}
        <label className="field-label">Name</label>
        <input className="input" defaultValue="My palette"/>

        {/* Color stops editor */}
        <div className="field-label" style={{ marginTop: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span>Color stops</span>
          <button className="btn btn-ghost btn-sm" style={{ height: 22, color: "var(--primary)" }}>
            <svg className="ic-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"/></svg>
            Add
          </button>
        </div>

        {/* Track w/ stop handles */}
        <div style={{ position: "relative", height: 36, margin: "8px 12px 16px" }}>
          <div style={{ position: "absolute", inset: "12px 0", borderRadius: 999, background: gradient, border: "1px solid var(--border)" }}/>
          {stops.map((s, i) => (
            <span key={i} style={{
              position: "absolute", left: `${s.pos}%`, top: 0,
              width: 22, height: 36, transform: "translateX(-50%)",
              display: "flex", flexDirection: "column", alignItems: "center", gap: 2,
            }}>
              <span style={{ width: 18, height: 18, borderRadius: 999, background: s.c, border: "2.5px solid white", boxShadow: "0 0 0 1.5px rgba(0,0,0,.45), 0 2px 6px rgba(0,0,0,.18)" }}/>
              <span style={{ width: 1.5, flex: 1, background: "var(--border-strong)" }}/>
            </span>
          ))}
        </div>

        <div className="card" style={{ marginBottom: 16 }}>
          {stops.map((s, i) => (
            <div className="row" key={i}>
              <div style={{ width: 28, height: 28, borderRadius: 8, background: s.c, flex: "0 0 auto", border: "1px solid var(--border)" }}/>
              <div className="label-wrap">
                <div className="t mono" style={{ textTransform: "uppercase" }}>{s.c.replace("#","#")}</div>
                <div className="s mono">{s.pos}%</div>
              </div>
              <button className="btn btn-ghost btn-icon-sm" style={{ color: "var(--muted-foreground)" }} aria-label="Remove">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/></svg>
              </button>
            </div>
          ))}
        </div>

        {/* Start from a swatch */}
        <div className="muted small" style={{ marginBottom: 8, textTransform: "uppercase", letterSpacing: ".06em", fontWeight: 500 }}>Start from</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
          {presetSwatches.map((cs, i) => (
            <button key={i} className="card" style={{ padding: 8, cursor: "pointer", border: "1px solid var(--border)", background: "var(--card)", textAlign: "left" }}>
              <div style={{ display: "flex", height: 44, borderRadius: 6, overflow: "hidden", marginBottom: 6 }}>
                {cs.map(c => <div key={c} style={{ flex: 1, background: c }}/>)}
              </div>
              <div className="muted small">{["Sunset","Aurora","Mono","Pastel"][i]}</div>
            </button>
          ))}
        </div>

        {/* Animation */}
        <div className="muted small" style={{ marginBottom: 8, textTransform: "uppercase", letterSpacing: ".06em", fontWeight: 500 }}>Animation</div>
        <div className="card">
          <div className="row">
            <div className="label-wrap"><div className="t">Cycle</div><div className="s">Loop through stops</div></div>
            <label className="switch"><input type="checkbox" defaultChecked/><span className="track"><span className="thumb"/></span></label>
          </div>
          <div className="row">
            <div className="label-wrap"><div className="t">Speed</div></div>
            <input type="range" className="range" defaultValue={50} style={{ width: 140 }}/>
          </div>
        </div>
      </div>
      <FigPillNav active="palettes"/>
    </Phone>
  );
}

// ---- Presets · empty ----
function ScreenPresetsEmpty() {
  return (
    <Phone>
      <Header title="Presets" right={<button className="btn btn-outline btn-sm" disabled style={{ opacity: .5 }}>New</button>}/>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "0 20px 100px" }}>
        <div className="muted small" style={{ marginBottom: 12 }}>Save the current state of your lights as a one-tap scene.</div>

        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16 }}>
          <div style={{
            width: 96, height: 96, borderRadius: 24,
            background: "var(--muted)",
            border: "1px dashed var(--border-strong)",
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            color: "var(--muted-foreground)",
          }}>
            <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
          </div>
          <div style={{ textAlign: "center" }}>
            <div className="h3">No presets yet</div>
            <div className="muted" style={{ fontSize: 14, marginTop: 6, maxWidth: 280 }}>
              Tune your lights, then save the look as Movie night, Reading, or anything else you'll come back to.
            </div>
          </div>
          <button className="btn btn-primary btn-block" style={{ maxWidth: 240 }}>
            <svg className="ic-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"/></svg>
            Save current as preset
          </button>
        </div>
      </div>
      <FigPillNav active="extras"/>
    </Phone>
  );
}

// ---- Segments · empty ----
function ScreenSegmentsEmpty() {
  return (
    <Phone>
      <Header title="Segments" right={<button className="btn btn-outline btn-sm"><svg className="ic-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"/></svg>Add</button>}/>
      <div style={{ flex: 1, overflow: "auto", padding: "0 20px 100px" }}>
        <div className="card" style={{ padding: 16, marginBottom: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 10 }}>
            <div>
              <div className="muted small" style={{ textTransform: "uppercase", letterSpacing: ".06em" }}>Total LEDs</div>
              <div style={{ fontSize: 22, fontWeight: 600, marginTop: 2 }}>200</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div className="muted small" style={{ textTransform: "uppercase", letterSpacing: ".06em" }}>Segments</div>
              <div style={{ fontSize: 22, fontWeight: 600, marginTop: 2 }}>0</div>
            </div>
          </div>
          {/* Empty strip */}
          <div style={{ height: 18, borderRadius: 999, border: "1px dashed var(--border-strong)", background: "repeating-linear-gradient(45deg, transparent 0 6px, var(--muted) 6px 7px)" }}/>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
            <span className="mono small muted">0</span>
            <span className="mono small muted">200</span>
          </div>
        </div>

        {/* Empty illustration */}
        <div style={{ padding: "24px 16px", display: "flex", flexDirection: "column", alignItems: "center", gap: 14, textAlign: "center" }}>
          <div style={{
            width: 88, height: 88, borderRadius: 22,
            background: "var(--muted)",
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            color: "var(--muted-foreground)",
          }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="9" width="5" height="6" rx="1"/><rect x="9" y="9" width="5" height="6" rx="1"/><rect x="16" y="9" width="6" height="6" rx="1"/></svg>
          </div>
          <div>
            <div className="h3">No segments yet</div>
            <div className="muted" style={{ fontSize: 14, marginTop: 6, maxWidth: 280 }}>
              Split your strip into zones to color or animate parts independently. Try a quick split below to start.
            </div>
          </div>
        </div>

        <div className="muted small" style={{ marginTop: 4, marginBottom: 8, textTransform: "uppercase", letterSpacing: ".06em", fontWeight: 500 }}>Quick split</div>
        <div className="card" style={{ padding: 12, display: "flex", gap: 8 }}>
          {[2, 4, 5, 8, 10].map(n => (
            <button key={n} className="btn btn-outline btn-sm" style={{ flex: 1, height: 40, flexDirection: "column", gap: 0 }}>
              <span style={{ fontSize: 14, fontWeight: 600 }}>{n}</span>
              <span style={{ fontSize: 10, color: "var(--muted-foreground)", fontWeight: 400 }}>{200 / n} LEDs ea</span>
            </button>
          ))}
        </div>

        <button className="btn btn-ghost btn-block" style={{ marginTop: 14, color: "var(--primary)" }}>
          <svg className="ic-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"/></svg>
          Create segment manually
        </button>
      </div>
      <FigPillNav active="extras"/>
    </Phone>
  );
}

Object.assign(window, {
  ScreenSearch, ScreenAddDeviceToRoom,
  ScreenNewPalette, ScreenPresetsEmpty, ScreenSegmentsEmpty,
  ScreenNewAutomation, ScreenPowerDetails,
  ScreenNewSegment, ScreenMoveDevice,
});

// ---- New Segment creation ----
function ScreenNewSegment() {
  const [name, setName] = React.useState("Desk");
  const [start, setStart] = React.useState(60);
  const [end, setEnd] = React.useState(120);
  const [color, setColor] = React.useState("#06b6d4");
  const swatches = ["#ef4444","#f59e0b","#facc15","#22c55e","#06b6d4","#3b82f6","#8b5cf6","#ec4899","#ffffff"];
  const total = 200;
  const ledCount = end - start;
  return (
    <Phone>
      <Header title="New segment" right={<button className="btn btn-primary btn-sm">Save</button>}/>
      <div style={{ flex: 1, overflow: "auto", padding: "0 20px 100px" }}>
        {/* Live preview */}
        <div className="card" style={{ padding: 16, marginBottom: 16 }}>
          <div className="muted small" style={{ textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 10 }}>Preview</div>
          <div style={{ position: "relative", height: 22, borderRadius: 999, background: "var(--muted)", overflow: "hidden" }}>
            <div style={{
              position: "absolute", top: 0, bottom: 0,
              left: `${(start / total) * 100}%`,
              width: `${((end - start) / total) * 100}%`,
              background: color,
              boxShadow: `0 0 18px ${color}aa, inset 0 0 0 1px rgba(255,255,255,.25)`,
            }}/>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, fontSize: 11, color: "var(--muted-foreground)" }}>
            <span className="mono">LED 0</span>
            <span style={{ fontWeight: 500, color: "var(--foreground)" }}>{ledCount} LEDs</span>
            <span className="mono">LED {total}</span>
          </div>
        </div>

        {/* Name */}
        <label className="field-label">Name</label>
        <div className="input">
          <input value={name} onChange={e=>setName(e.target.value)} style={{ border:0, outline:"none", background:"transparent", flex:1, fontSize:14 }}/>
        </div>

        {/* LED range */}
        <label className="field-label" style={{ marginTop: 18 }}>LED range</label>
        <div className="card" style={{ padding: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 4 }}>
            <span className="muted">Start</span>
            <span className="mono" style={{ fontWeight: 600 }}>{start}</span>
          </div>
          <input type="range" min={0} max={total - 1} value={start} onChange={e=>setStart(Math.min(+e.target.value, end-1))} style={{ width: "100%", accentColor: color }}/>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginTop: 12, marginBottom: 4 }}>
            <span className="muted">End</span>
            <span className="mono" style={{ fontWeight: 600 }}>{end}</span>
          </div>
          <input type="range" min={1} max={total} value={end} onChange={e=>setEnd(Math.max(+e.target.value, start+1))} style={{ width: "100%", accentColor: color }}/>
        </div>

        {/* Color */}
        <label className="field-label" style={{ marginTop: 18 }}>Color</label>
        <div className="card" style={{ padding: 14, display: "flex", gap: 10, flexWrap: "wrap" }}>
          {swatches.map(c => (
            <button key={c} onClick={()=>setColor(c)} aria-label={c} style={{
              width: 30, height: 30, borderRadius: 999,
              background: c,
              border: c === color ? "2px solid var(--foreground)" : "1px solid var(--border)",
              boxShadow: c === color ? `0 0 0 2px var(--background) inset` : "none",
              cursor: "pointer",
            }}/>
          ))}
        </div>

        {/* Behavior */}
        <label className="field-label" style={{ marginTop: 18 }}>Behavior</label>
        <div className="card">
          <div className="row">
            <div className="label-wrap"><div className="t">Independent</div><div className="s">Reacts to its own scenes & effects</div></div>
            <label className="switch"><input type="checkbox" defaultChecked/><span className="track"><span className="thumb"/></span></label>
          </div>
          <div className="row">
            <div className="label-wrap"><div className="t">Mirror to opposite end</div><div className="s">Symmetrical zone at LED {total - end}–{total - start}</div></div>
            <label className="switch"><input type="checkbox"/><span className="track"><span className="thumb"/></span></label>
          </div>
        </div>
      </div>
      <FigPillNav active="extras"/>
    </Phone>
  );
}

// ---- Move device — pick a destination room ----
function ScreenMoveDevice() {
  const rooms = [
    { name: "Living room",  count: 4, current: false },
    { name: "Bedroom",      count: 3, current: true  },
    { name: "Kitchen",      count: 3, current: false },
    { name: "Office",       count: 2, current: false },
    { name: "Hallway",      count: 0, current: false },
  ];
  const [pick, setPick] = React.useState("Living room");
  return (
    <Phone>
      <Header title="Move device" right={<button className="btn btn-primary btn-sm" disabled={pick === "Bedroom"}>Move</button>}/>
      <div style={{ flex: 1, overflow: "auto", padding: "8px 20px 100px" }}>
        <div className="card" style={{ padding: 14, marginBottom: 18, display: "flex", alignItems: "center", gap: 12 }}>
          <RgbMark size={36}/>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 600 }}>PixC Lyt</div>
            <div className="muted small">Currently in <span style={{ color: "var(--foreground)", fontWeight: 500 }}>Bedroom</span></div>
          </div>
        </div>

        <div className="muted small" style={{ marginBottom: 8, textTransform: "uppercase", letterSpacing: ".06em", fontWeight: 500 }}>Move to</div>
        <div className="card">
          {rooms.map(r => {
            const selected = pick === r.name;
            return (
              <button key={r.name} onClick={()=>!r.current && setPick(r.name)} disabled={r.current} className="row" style={{
                width: "100%", border: 0, background: "transparent", textAlign: "left",
                color: "var(--foreground)", font: "inherit",
                cursor: r.current ? "default" : "pointer", opacity: r.current ? .55 : 1,
              }}>
                <div className="icon-wrap"><svg className="ic-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/></svg></div>
                <div className="label-wrap">
                  <div className="t">{r.name}{r.current && <span className="muted small" style={{ fontWeight: 400, marginLeft: 6 }}>· current</span>}</div>
                  <div className="s">{r.count} {r.count === 1 ? "device" : "devices"}</div>
                </div>
                <span aria-hidden style={{
                  width: 20, height: 20, borderRadius: 999,
                  border: selected ? "6px solid var(--primary)" : "1.5px solid var(--border-strong)",
                  background: "var(--background)",
                  boxSizing: "border-box",
                }}/>
              </button>
            );
          })}
        </div>

        <button className="btn btn-ghost btn-block" style={{ marginTop: 14, color: "var(--primary)" }}>
          <svg className="ic-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"/></svg>
          Create new room
        </button>
      </div>
    </Phone>
  );
}

// ---- New Automation creation ----
function ScreenNewAutomation() {
  const [trigger, setTrigger] = React.useState("time");
  return (
    <Phone>
      <Header title="New automation" right={<button className="btn btn-ghost btn-sm" style={{ color: "var(--primary)", fontWeight: 600 }}>Save</button>}/>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div style={{ flex: 1, overflow: "auto", padding: "0 20px 16px" }}>
          {/* Name */}
          <label className="field-label">Name</label>
          <input className="input" defaultValue="Movie night"/>

          {/* When (Trigger) */}
          <div className="muted small" style={{ marginTop: 18, marginBottom: 8, textTransform: "uppercase", letterSpacing: ".06em", fontWeight: 500 }}>When</div>
          <div className="seg" style={{ marginBottom: 12 }}>
            <button className={trigger === "time" ? "active" : ""} onClick={() => setTrigger("time")}>Time</button>
            <button className={trigger === "sunset" ? "active" : ""} onClick={() => setTrigger("sunset")}>Sun</button>
            <button className={trigger === "arrive" ? "active" : ""} onClick={() => setTrigger("arrive")}>Location</button>
            <button className={trigger === "device" ? "active" : ""} onClick={() => setTrigger("device")}>Device</button>
          </div>

          {trigger === "time" && (
            <div className="card" style={{ padding: 16, marginBottom: 12 }}>
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: 6, fontVariantNumeric: "tabular-nums", padding: "12px 0" }}>
                <span style={{ fontSize: 56, fontWeight: 300, letterSpacing: "-0.02em" }}>18</span>
                <span style={{ fontSize: 56, fontWeight: 300, color: "var(--muted-foreground)" }}>:</span>
                <span style={{ fontSize: 56, fontWeight: 300, letterSpacing: "-0.02em" }}>30</span>
                <div style={{ display: "flex", flexDirection: "column", marginLeft: 10, border: "1px solid var(--border)", borderRadius: 8, overflow: "hidden" }}>
                  <button className="btn btn-ghost btn-sm" style={{ height: 28, borderRadius: 0, fontWeight: 600, color: "var(--muted-foreground)" }}>AM</button>
                  <button className="btn btn-ghost btn-sm" style={{ height: 28, borderRadius: 0, background: "var(--foreground)", color: "var(--background)", fontWeight: 600 }}>PM</button>
                </div>
              </div>
              <div style={{ display: "flex", gap: 6, marginTop: 6, flexWrap: "wrap", justifyContent: "center" }}>
                {["S","M","T","W","T","F","S"].map((d, i) => (
                  <button key={i} style={{
                    width: 32, height: 32, borderRadius: 999, border: "1.5px solid var(--border)",
                    background: [1,5].includes(i) ? "var(--foreground)" : "transparent",
                    color: [1,5].includes(i) ? "var(--background)" : "var(--foreground)",
                    fontSize: 12, fontWeight: 600, cursor: "pointer",
                  }}>{d}</button>
                ))}
              </div>
            </div>
          )}

          {trigger === "sunset" && (
            <div className="card" style={{ marginBottom: 12 }}>
              <div className="row">
                <div className="icon-wrap"><svg className="ic-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 17a7 7 0 0 1 14 0"/><path d="M3 21h18M12 6V3M5.5 8.5l-2-2M18.5 8.5l2-2"/></svg></div>
                <div className="label-wrap"><div className="t">At sunrise</div><div className="s">Approx. 06:42</div></div>
                <span style={{ width: 18, height: 18, borderRadius: 999, border: "1.5px solid var(--border-strong)" }}/>
              </div>
              <div className="row">
                <div className="icon-wrap"><svg className="ic-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 17a7 7 0 0 1 14 0"/><path d="M3 21h18"/><path d="M12 9V3M16 5l-4 4-4-4"/></svg></div>
                <div className="label-wrap"><div className="t">At sunset</div><div className="s">Approx. 19:18 · Offset −10 min</div></div>
                <span style={{ width: 18, height: 18, borderRadius: 999, border: "1.5px solid var(--primary)", background: "var(--primary)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                </span>
              </div>
            </div>
          )}

          {trigger === "arrive" && (
            <div className="card" style={{ marginBottom: 12 }}>
              <div className="row">
                <div className="icon-wrap"><svg className="ic-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/></svg></div>
                <div className="label-wrap"><div className="t">When I arrive home</div><div className="s">Within 100 m of Home</div></div>
              </div>
              <div className="row">
                <div className="icon-wrap"><svg className="ic-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg></div>
                <div className="label-wrap"><div className="t">When I leave home</div></div>
              </div>
            </div>
          )}

          {trigger === "device" && (
            <div className="card" style={{ marginBottom: 12 }}>
              <div className="row">
                <div className="icon-wrap" style={{ background: "#22c55e22", color: "#22c55e" }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="9" width="20" height="6" rx="1.5"/><path d="M5 12h.01M9 12h.01M13 12h.01M17 12h.01M21 12h.01"/></svg>
                </div>
                <div className="label-wrap"><div className="t">Strip 01 turns on</div><div className="s">Bedroom</div></div>
              </div>
              <div className="row">
                <div className="icon-wrap"><svg className="ic-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12l3-3 3 3-3 3z"/></svg></div>
                <div className="label-wrap"><div className="t">Motion detected</div><div className="s">Hallway sensor</div></div>
              </div>
            </div>
          )}

          {/* Then (Action) */}
          <div className="muted small" style={{ marginTop: 18, marginBottom: 8, textTransform: "uppercase", letterSpacing: ".06em", fontWeight: 500 }}>Then</div>
          <div className="card">
            <div className="row">
              <div className="icon-wrap" style={{ background: "var(--primary-soft)", color: "var(--primary)" }}>
                <svg className="ic-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1v22M5 5l14 14M19 5L5 19"/></svg>
              </div>
              <div className="label-wrap"><div className="t">Set scene · Aurora</div><div className="s">Living room · 60% · Aurora preset</div></div>
              <button className="btn btn-ghost btn-icon-sm" style={{ color: "var(--muted-foreground)" }} aria-label="Edit">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4z"/></svg>
              </button>
            </div>
            <div className="row">
              <div className="icon-wrap" style={{ background: "var(--muted)", color: "var(--muted-foreground)" }}>
                <svg className="ic-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"/></svg>
              </div>
              <div className="label-wrap"><div className="t" style={{ color: "var(--primary)" }}>Add another action</div></div>
            </div>
          </div>

          {/* Options */}
          <div className="muted small" style={{ marginTop: 18, marginBottom: 8, textTransform: "uppercase", letterSpacing: ".06em", fontWeight: 500 }}>Options</div>
          <div className="card">
            <div className="row">
              <div className="label-wrap"><div className="t">Notify when triggered</div></div>
              <label className="switch"><input type="checkbox" defaultChecked/><span className="track"><span className="thumb"/></span></label>
            </div>
            <div className="row">
              <div className="label-wrap"><div className="t">Only when home</div><div className="s">Pause if away</div></div>
              <label className="switch"><input type="checkbox"/><span className="track"><span className="thumb"/></span></label>
            </div>
          </div>
          <div style={{ height: 12 }}/>
        </div>
        <div style={{ padding: "12px 20px 24px", borderTop: "1px solid var(--border)" }}>
          <button className="btn btn-primary btn-lg btn-block">Create automation</button>
        </div>
      </div>
    </Phone>
  );
}


// ---- Power details / consumption ----
function ScreenPowerDetails() {
  const bars = [12, 18, 22, 28, 35, 42, 38, 30, 24, 20, 15, 9];
  const hours = ["6a","8","10","12p","2","4","6","8","10","12a","2","4"];
  return (
    <Phone>
      <DeviceTopBar room="Power"/>
      <div style={{ flex: 1, overflow: "auto", padding: "0 20px 100px" }}>
        {/* Live now */}
        <div className="card" style={{ padding: 16, marginBottom: 16, background: "var(--primary-soft)", border: "1px solid var(--primary-soft-border)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
            <span style={{ width: 8, height: 8, borderRadius: 999, background: "var(--success)", boxShadow: "0 0 0 4px rgba(34,197,94,.15)" }}/>
            <span className="small" style={{ color: "var(--primary)", fontWeight: 600, textTransform: "uppercase", letterSpacing: ".08em" }}>Live</span>
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
            <span style={{ fontSize: 36, fontWeight: 600, letterSpacing: "-0.02em" }}>6.8</span>
            <span className="muted">W</span>
            <span className="muted small" style={{ marginLeft: 8 }}>at 80% brightness</span>
          </div>
          <div className="muted small" style={{ marginTop: 4 }}>~ 0.16 kWh / day at current usage</div>
        </div>

        {/* Today chart */}
        <div className="card" style={{ padding: 16, marginBottom: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 12 }}>
            <div>
              <div className="muted small" style={{ textTransform: "uppercase", letterSpacing: ".06em" }}>Today</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginTop: 4 }}>
                <span style={{ fontSize: 22, fontWeight: 600 }}>0.142</span>
                <span className="muted small">kWh</span>
              </div>
            </div>
            <div className="seg seg-sm">
              <button>D</button>
              <button className="active">W</button>
              <button>M</button>
              <button>Y</button>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height: 92 }}>
            {bars.map((h, i) => (
              <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                <div style={{
                  width: "100%", height: `${h * 2}px`,
                  borderRadius: 4,
                  background: i >= 4 && i <= 7 ? "var(--primary)" : "var(--muted)",
                  border: "1px solid var(--border)",
                }}/>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 4, marginTop: 6 }}>
            {hours.map((h, i) => (
              <span key={i} style={{ flex: 1, textAlign: "center", fontSize: 9 }} className="muted mono">{h}</span>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
          {[
            { l: "This week", v: "1.04", u: "kWh", d: "↓ 8% vs last", up: false },
            { l: "Cost (est.)", v: "₹12", u: ".40", d: "₹1.78/day", up: false },
            { l: "Avg / day", v: "0.14", u: "kWh", d: "5.2 hrs on", up: false },
            { l: "On-time", v: "36", u: "h", d: "this week", up: false },
          ].map((c, i) => (
            <div key={i} className="card" style={{ padding: 12 }}>
              <div className="muted small" style={{ textTransform: "uppercase", letterSpacing: ".06em" }}>{c.l}</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 2, marginTop: 4 }}>
                <span style={{ fontSize: 18, fontWeight: 600 }}>{c.v}</span>
                <span className="muted small">{c.u}</span>
              </div>
              <div className="muted small" style={{ marginTop: 2 }}>{c.d}</div>
            </div>
          ))}
        </div>

        {/* Savings tip */}
        <div className="card" style={{ padding: 14, marginBottom: 16, display: "flex", gap: 12, alignItems: "flex-start" }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(34,197,94,.15)", color: "var(--success)", display: "inline-flex", alignItems: "center", justifyContent: "center", flex: "0 0 auto" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 600 }}>Save ~₹38/mo</div>
            <div className="muted small" style={{ marginTop: 2 }}>Drop brightness from 80% → 65% during evenings. Lights stay comfortable, you save 18%.</div>
          </div>
        </div>

        {/* Settings */}
        <div className="muted small" style={{ marginBottom: 8, textTransform: "uppercase", letterSpacing: ".06em", fontWeight: 500 }}>Settings</div>
        <div className="card">
          <div className="row">
            <div className="label-wrap"><div className="t">Cost rate</div><div className="s">₹8.50 / kWh</div></div>
            <svg className="ic-sm chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
          </div>
          <div className="row">
            <div className="label-wrap"><div className="t">Weekly report</div><div className="s">Mondays · 9:00</div></div>
            <label className="switch"><input type="checkbox" defaultChecked/><span className="track"><span className="thumb"/></span></label>
          </div>
        </div>
      </div>
      <FigPillNav active="extras"/>
    </Phone>
  );
}
