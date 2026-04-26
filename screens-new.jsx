// ===== New screens added per user spec =====
// - ScreenAppLaunch: brief splash shown when app opens (animated logo)
// - ScreenWelcomePostAuth: shown immediately after onboarding completes
// - ScreenEditRoom: edit existing room (vs. add)
// - ScreenTwotoAI: chat-style AI assistant
// - ScanningHero: reusable scanning animation (used in all add-device scanning steps)
// - Empty-state variants of populated screens

// ---- Reusable Add device hero ----
// Always renders the same chip in the same vertical position.
// Only the content below the title/sub changes per screen.
// state: "scanning" | "wifi" | "pairing" | "success" | "no-signal"
function AddDeviceHero({ label = "Scanning for devices", sub = "Make sure your device is in pairing mode.", state = "scanning" }) {
  const animateRings = state === "scanning" || state === "pairing";
  const showProbe   = state === "scanning";
  const badge = (() => {
    if (state === "wifi") {
      return { color: "var(--primary)", svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5a10 10 0 0 1 14 0"/><path d="M8.5 16a5 5 0 0 1 7 0"/><circle cx="12" cy="19.5" r=".8" fill="currentColor"/></svg> };
    }
    if (state === "no-signal") {
      return { color: "var(--destructive)", svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5a10 10 0 0 1 14 0"/><path d="M8.5 16a5 5 0 0 1 7 0"/><circle cx="12" cy="19.5" r=".9" fill="currentColor" stroke="none"/><path d="M3 3l18 18"/></svg> };
    }
    if (state === "success") {
      return { color: "var(--success)", svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg> };
    }
    if (state === "pairing") {
      return { color: "var(--primary)", svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ animation: "scan-spin 1.1s linear infinite" }}><path d="M21 12a9 9 0 1 1-6.2-8.5"/></svg> };
    }
    if (state === "error") {
      return { color: "var(--destructive)", svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 8v5"/><path d="M12 17v.01"/></svg> };
    }
    return null;
  })();
  // Failed states desaturate the device chip so the success/scanning
  // colour pop is reserved for healthy flows.
  const chipMuted = state === "error" || state === "no-signal";

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 18, padding: "32px 0 8px" }}>
      <div style={{
        position: "relative",
        width: 180, height: 180,
        display: "flex", alignItems: "center", justifyContent: "center"
      }}>
        {/* Outer pulse rings — animated only while actively scanning/pairing */}
        <span style={{
          position: "absolute", inset: 20, borderRadius: 999,
          background: "var(--muted)",
          animation: animateRings ? "scan-pulse 2.4s ease-out infinite" : "none",
          opacity: animateRings ? undefined : .5,
        }} />
        <span style={{
          position: "absolute", inset: 20, borderRadius: 999,
          background: "var(--muted)",
          animation: animateRings ? "scan-pulse 2.4s ease-out infinite" : "none",
          animationDelay: "1.2s",
          opacity: animateRings ? undefined : 0,
        }} />

        {/* Device chip — fixed position, same across all screens */}
        <div style={{
          position: "relative",
          width: 96, height: 96, borderRadius: 22,
          background: "#0a0a0a", color: "white",
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          border: "1px solid #1f1f1f",
          boxShadow: "0 10px 28px -10px rgba(0,0,0,.4)",
          filter: chipMuted ? "saturate(.55)" : undefined,
        }}>
          <RgbMark size={56} />
          {showProbe && (
            <span style={{
              position: "absolute",
              width: 28, height: 28, borderRadius: 999,
              border: "1.5px dashed rgba(96,165,250,.95)",
              top: 22, right: 18,
              animation: "scan-spin 4s linear infinite"
            }} />
          )}
        </div>

        {/* State badge — overlaid bottom-right of chip */}
        {badge && (
          <div style={{
            position: "absolute",
            bottom: 36, right: 36,
            width: 32, height: 32, borderRadius: 999,
            background: "var(--background)",
            border: "1px solid var(--border)",
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            color: badge.color,
            boxShadow: "0 4px 10px -4px rgba(0,0,0,.18)",
          }}>
            {badge.svg}
          </div>
        )}
      </div>

      <div style={{ textAlign: "center", padding: "0 20px" }}>
        <div className="h3">{label}</div>
        <div className="muted small" style={{ marginTop: 4, maxWidth: 280, marginInline: "auto" }}>{sub}</div>
      </div>

      <style>{`
        @keyframes scan-pulse {
          0%   { opacity: .55; transform: scale(1); }
          80%  { opacity: 0;   transform: scale(2.05); }
          100% { opacity: 0;   transform: scale(2.05); }
        }
        @keyframes scan-spin {
          from { transform: rotate(0); } to { transform: rotate(360deg); }
        }
      `}</style>
    </div>);
}

// Backwards-compatible alias — older code referenced ScanningHero
const ScanningHero = AddDeviceHero;

// ---- 01a · Cold-start splash — robotic boot sequence ----
// Hex-grid backdrop, concentric scanner rings, orbiting dots, a status
// readout that cycles boot phases, a spectrum sweep at the bottom and
// camera-style corner brackets. Runs once per cold launch.
function ScreenAppLaunch() {
  return (
    <Phone>
      <div className="hex-grid" style={{
        flex: 1, position: "relative", overflow: "hidden",
        display: "flex", flexDirection: "column",
      }}>
        {/* Camera focus brackets — corners */}
        {[
          { top: 16, left: 16,    rot: 0   },
          { top: 16, right: 16,   rot: 90  },
          { bottom: 16, right: 16, rot: 180 },
          { bottom: 16, left: 16, rot: 270 },
        ].map((p, i) => (
          <span key={i} style={{
            position: "absolute", ...p, width: 18, height: 18,
            borderTop: "1.5px solid var(--primary)",
            borderLeft: "1.5px solid var(--primary)",
            transform: `rotate(${p.rot}deg)`,
            opacity: .85,
          }}/>
        ))}

        {/* Top status bar — monospace coordinates */}
        <div style={{ display: "flex", justifyContent: "space-between", padding: "44px 28px 0" }}>
          <span className="mono small" style={{ color: "var(--primary)", letterSpacing: ".08em" }}>● PixC · v2.6.1</span>
          <span className="mono small muted" style={{ letterSpacing: ".08em" }}>SYS 0×24</span>
        </div>

        {/* Hero — concentric scanner with orbiting nodes */}
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
          <div style={{ position: "relative", width: 220, height: 220 }}>
            {/* Outer dashed ring (counter-rotates) */}
            <span style={{
              position: "absolute", inset: 0, borderRadius: 999,
              border: "1px dashed color-mix(in srgb, var(--primary) 55%, transparent)",
              animation: "orbit-2 18s linear infinite",
            }}/>
            {/* Mid solid ring */}
            <span style={{
              position: "absolute", inset: 22, borderRadius: 999,
              border: "1px solid color-mix(in srgb, var(--primary) 35%, transparent)",
            }}/>
            {/* Pulse rings */}
            {[0, 0.8, 1.6].map((d, i) => (
              <span key={i} style={{
                position: "absolute", inset: 22, borderRadius: 999,
                border: "1.5px solid var(--primary)",
                animation: "ring-pulse 2.4s ease-out infinite",
                animationDelay: `${d}s`,
                opacity: .9,
              }}/>
            ))}

            {/* Orbiting nodes (rotate the whole rotor) */}
            <div style={{ position: "absolute", inset: 0, animation: "orbit-1 6s linear infinite" }}>
              {[
                { color: "#ef4444", angle: 0   },
                { color: "#facc15", angle: 90  },
                { color: "#22c55e", angle: 180 },
                { color: "var(--primary)", angle: 270 },
              ].map((n, i) => (
                <span key={i} style={{
                  position: "absolute", left: "50%", top: "50%",
                  width: 10, height: 10, borderRadius: 999,
                  background: n.color,
                  boxShadow: `0 0 14px ${n.color}`,
                  transform: `translate(-50%, -50%) rotate(${n.angle}deg) translateY(-105px)`,
                }}/>
              ))}
            </div>

            {/* Center mark */}
            <div style={{
              position: "absolute", left: "50%", top: "50%",
              transform: "translate(-50%, -50%)",
              width: 96, height: 96, borderRadius: 24,
              background: "#0a0a0a",
              border: "1px solid #1f1f1f",
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 8px 30px -6px color-mix(in srgb, var(--primary) 60%, transparent), inset 0 0 0 1px rgba(255,255,255,.04)",
            }}>
              <RgbMark size={56}/>
              {/* corner notches */}
              <span style={{ position: "absolute", top: -1, left: -1, width: 10, height: 10, borderTop: "2px solid var(--primary)", borderLeft: "2px solid var(--primary)" }}/>
              <span style={{ position: "absolute", top: -1, right: -1, width: 10, height: 10, borderTop: "2px solid var(--primary)", borderRight: "2px solid var(--primary)" }}/>
              <span style={{ position: "absolute", bottom: -1, left: -1, width: 10, height: 10, borderBottom: "2px solid var(--primary)", borderLeft: "2px solid var(--primary)" }}/>
              <span style={{ position: "absolute", bottom: -1, right: -1, width: 10, height: 10, borderBottom: "2px solid var(--primary)", borderRight: "2px solid var(--primary)" }}/>
            </div>

            {/* Vertical scan line sweeping the chip */}
            <span style={{
              position: "absolute", left: "calc(50% - 60px)", top: "calc(50% - 60px)",
              width: 120, height: 120, borderRadius: 24, overflow: "hidden",
              pointerEvents: "none",
            }}>
              <span style={{
                position: "absolute", left: 0, right: 0, height: 3,
                background: "linear-gradient(90deg, transparent, var(--primary), transparent)",
                animation: "scan-sweep 2.6s ease-in-out infinite",
                opacity: .9,
              }}/>
            </span>
          </div>
        </div>

        {/* Status readout — cycles boot phases */}
        <div style={{ padding: "0 28px 8px", textAlign: "center" }}>
          <div className="h2" style={{ letterSpacing: "-0.02em" }}>
            PixC<span style={{ color: "var(--primary)", marginLeft: 4 }}>·</span>
          </div>
          <div style={{ position: "relative", height: 18, marginTop: 6 }}>
            {[
              { t: "INIT · system services",  d: "0s"   },
              { t: "MESH · scanning network", d: "1.2s" },
              { t: "BIND · loading scenes",   d: "2.4s" },
            ].map((s, i) => (
              <span key={i} className="mono small" style={{
                position: "absolute", inset: 0,
                color: "var(--muted-foreground)",
                letterSpacing: ".08em",
                animation: `status-cycle 3.6s ease-in-out infinite`,
                animationDelay: s.d,
                opacity: 0,
              }}>
                <span style={{ color: "var(--primary)" }}>›</span> {s.t}
                <span style={{ animation: "type-blink 1s step-end infinite", marginLeft: 2 }}>_</span>
              </span>
            ))}
          </div>
        </div>

        {/* Spectrum sweep at bottom */}
        <div style={{ padding: "0 28px 18px" }}>
          <div style={{
            height: 4, borderRadius: 999,
            background: "linear-gradient(90deg, var(--primary), #06b6d4, #22c55e, #facc15, #ef4444, var(--primary))",
            backgroundSize: "200% 100%",
            animation: "spectrum-shift 3s linear infinite",
            opacity: .9,
          }}/>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
            <span className="mono small muted" style={{ letterSpacing: ".08em" }}>0×0000</span>
            <span className="mono small muted" style={{ letterSpacing: ".08em" }}>READY</span>
          </div>
        </div>
      </div>
    </Phone>
  );
}

// ---- 01b · Warm-start splash — mesh reconnect ----
// Visualizes the device mesh re-forming. Each device dot blinks awake;
// connecting lines draw between them with a stroke-dash animation.
// Below the mesh, a monospace log streams the reconnections.
function ScreenAppLaunchReturning() {
  // Devices laid out in a 4-node mesh. Coordinates are within a 280×220 box.
  const devices = [
    { name: "Lyt · Bedroom",        x:  60, y:  50, color: "var(--primary)", state: "online",  delay: 0    },
    { name: "Strip · Living room",  x: 220, y:  60, color: "#22c55e",        state: "online",  delay: 0.4  },
    { name: "Bulb · Kitchen",       x: 230, y: 170, color: "#facc15",        state: "syncing", delay: 0.8  },
    { name: "Outlet · Office",      x:  50, y: 175, color: "#ef4444",        state: "offline", delay: 1.2  },
  ];
  // Lines (full mesh between pairs)
  const lines = [
    [0,1], [0,2], [0,3], [1,2], [1,3], [2,3],
  ];
  return (
    <Phone>
      <div style={{ padding: "44px 24px 0", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ position: "relative", width: 44, height: 44 }}>
          <span style={{
            position: "absolute", inset: -4, borderRadius: 14,
            border: "1px solid color-mix(in srgb, var(--primary) 40%, transparent)",
            animation: "ring-pulse 2.4s ease-out infinite",
          }}/>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: "#0a0a0a", display: "inline-flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
            <RgbMark size={28}/>
          </div>
        </div>
        <div>
          <div style={{ fontSize: 18, fontWeight: 600, letterSpacing: "-0.01em" }}>Welcome back, Rayon</div>
          <div className="mono small" style={{ color: "var(--primary)", letterSpacing: ".06em" }}>
            › MESH · 3 of 4 online
            <span style={{ animation: "type-blink 1s step-end infinite", marginLeft: 4 }}>_</span>
          </div>
        </div>
      </div>

      {/* Mesh visualization */}
      <div className="hex-grid" style={{
        margin: "20px 24px 0", height: 240, position: "relative",
        borderRadius: 14, overflow: "hidden",
        background: "linear-gradient(180deg, color-mix(in srgb, var(--primary) 6%, var(--background)), var(--background))",
        border: "1px solid var(--border)",
      }}>
        {/* Camera focus brackets in the corners */}
        {[
          { top: 8, left: 8,    rot: 0   },
          { top: 8, right: 8,   rot: 90  },
          { bottom: 8, right: 8, rot: 180 },
          { bottom: 8, left: 8, rot: 270 },
        ].map((p, i) => (
          <span key={i} style={{
            position: "absolute", ...p, width: 10, height: 10,
            borderTop: "1.5px solid color-mix(in srgb, var(--primary) 50%, transparent)",
            borderLeft: "1.5px solid color-mix(in srgb, var(--primary) 50%, transparent)",
            transform: `rotate(${p.rot}deg)`,
          }}/>
        ))}

        {/* Scan line sweeping the mesh box */}
        <span style={{
          position: "absolute", left: 0, right: 0, height: 2,
          background: "linear-gradient(90deg, transparent, var(--primary), transparent)",
          opacity: .85,
          animation: "mesh-scan 3.4s ease-in-out infinite",
          pointerEvents: "none",
        }}/>

        <svg viewBox="0 0 280 220" preserveAspectRatio="none" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
          <defs>
            <linearGradient id="mesh-line-grad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%"  stopColor="color-mix(in srgb, var(--primary) 80%, transparent)"/>
              <stop offset="50%" stopColor="color-mix(in srgb, var(--primary) 100%, transparent)"/>
              <stop offset="100%" stopColor="color-mix(in srgb, var(--primary) 80%, transparent)"/>
            </linearGradient>
          </defs>

          {/* Lines between devices — pathLength=1 normalizes the dash so each
              line draws fully regardless of length. */}
          {lines.map(([a, b], i) => {
            const da = devices[a], db = devices[b];
            const offline = devices[a].state === "offline" || devices[b].state === "offline";
            return (
              <line key={i}
                x1={da.x} y1={da.y} x2={db.x} y2={db.y}
                pathLength="1"
                stroke={offline ? "var(--border-strong)" : "url(#mesh-line-grad)"}
                strokeWidth={offline ? "1" : "1.5"}
                strokeLinecap="round"
                strokeDasharray="1"
                style={{
                  strokeDashoffset: 1,
                  animation: `mesh-draw 1.4s ease-out forwards`,
                  animationDelay: `${0.2 + i * 0.18}s`,
                  opacity: offline ? .35 : .95,
                }}
              />
            );
          })}

          {/* Data packets — small dashes traveling along the active links */}
          {lines.map(([a, b], i) => {
            const da = devices[a], db = devices[b];
            const offline = devices[a].state === "offline" || devices[b].state === "offline";
            if (offline) return null;
            return (
              <line key={`packet-${i}`}
                x1={da.x} y1={da.y} x2={db.x} y2={db.y}
                pathLength="1"
                stroke="#ffffff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="0.04 0.96"
                style={{
                  strokeDashoffset: 1,
                  animation: `mesh-packet ${3 + i * 0.4}s linear infinite`,
                  animationDelay: `${1 + i * 0.25}s`,
                  filter: "drop-shadow(0 0 3px var(--primary))",
                  opacity: .9,
                }}
              />
            );
          })}
        </svg>

        {/* Device nodes */}
        {devices.map((d, i) => (
          <div key={i} style={{
            position: "absolute", left: d.x, top: d.y, transform: "translate(-50%, -50%)",
            display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
          }}>
            {/* Outer ping ring — only when online/syncing */}
            {d.state !== "offline" && (
              <span style={{
                position: "absolute", left: "50%", top: 0,
                width: 18, height: 18, borderRadius: 999,
                border: `1.5px solid ${d.color}`,
                animation: "node-ring 2.4s ease-out infinite",
                animationDelay: `${d.delay}s`,
                pointerEvents: "none",
              }}/>
            )}
            <span style={{
              width: 18, height: 18, borderRadius: 999,
              background: d.state === "offline" ? "var(--muted)" : `radial-gradient(circle at 35% 30%, color-mix(in srgb, ${d.color} 80%, #fff) 0%, ${d.color} 60%)`,
              boxShadow: d.state === "offline"
                ? "inset 0 0 0 1px var(--border-strong)"
                : `0 0 18px ${d.color}, 0 0 0 3px color-mix(in srgb, ${d.color} 22%, transparent)`,
              animation: d.state === "online"  ? `node-blink 2.2s ease-in-out infinite`
                       : d.state === "syncing" ? "node-blink 1s ease-in-out infinite"
                                               : undefined,
              animationDelay: `${d.delay}s`,
              position: "relative", zIndex: 1,
            }}/>
            <span className="mono small" style={{
              fontSize: 9.5, color: "var(--muted-foreground)",
              padding: "1px 5px", borderRadius: 4,
              background: "color-mix(in srgb, var(--background) 80%, transparent)",
              backdropFilter: "blur(2px)",
              whiteSpace: "nowrap",
              letterSpacing: ".04em",
            }}>{d.name}</span>
          </div>
        ))}
      </div>

      {/* Reconnect log */}
      <div style={{ padding: "16px 24px 0" }}>
        <div className="mono small muted" style={{ letterSpacing: ".06em", textTransform: "uppercase" }}>Connection log</div>
        <div className="card" style={{ marginTop: 6, padding: "10px 12px" }}>
          {[
            { t: "Lyt · Bedroom",         s: "OK · 38 ms",   ok: true  },
            { t: "Strip · Living room",   s: "OK · 42 ms",   ok: true  },
            { t: "Bulb · Kitchen",        s: "syncing scene…", sync: true },
            { t: "Outlet · Office",       s: "no response",  err: true  },
          ].map((l, i) => (
            <div key={i} className="mono" style={{
              display: "flex", alignItems: "center", gap: 8,
              fontSize: 11, padding: "4px 0",
              borderTop: i === 0 ? "0" : "1px solid var(--border)",
            }}>
              <span style={{
                color: l.ok ? "var(--success)" : l.sync ? "var(--primary)" : l.err ? "var(--destructive)" : "var(--muted-foreground)",
                width: 14, textAlign: "center",
              }}>{l.ok ? "✓" : l.sync ? "↻" : l.err ? "×" : "·"}</span>
              <span style={{ flex: 1, color: "var(--foreground)" }}>{l.t}</span>
              <span className="muted">{l.s}</span>
            </div>
          ))}
        </div>

        <div style={{ height: 3, borderRadius: 999, background: "var(--muted)", overflow: "hidden", marginTop: 14 }}>
          <span style={{
            display: "block", width: "75%", height: "100%",
            background: "linear-gradient(90deg, var(--primary), #06b6d4)",
            borderRadius: 999,
          }}/>
        </div>
        <div className="mono small muted" style={{ textAlign: "center", marginTop: 8, letterSpacing: ".08em" }}>
          RESTORING SCENES · 75%
        </div>
      </div>
    </Phone>
  );
}

// ---- 01c · Warm-start loading screen (homescreen resume) ----
// Robotic loading screen, stylistic kin to the cold-start splash but
// distinct: shorter sequence, "RESUMING" status, mesh-summary readout,
// animated progress with monospace percent. Used when the app comes back
// from background and the homescreen is rehydrating.
function ScreenHomeWelcome() {
  return (
    <Phone>
      <div className="hex-grid" style={{
        flex: 1, position: "relative", overflow: "hidden",
        display: "flex", flexDirection: "column",
      }}>
        {/* Camera focus brackets — corners */}
        {[
          { top: 16, left: 16,    rot: 0   },
          { top: 16, right: 16,   rot: 90  },
          { bottom: 16, right: 16, rot: 180 },
          { bottom: 16, left: 16, rot: 270 },
        ].map((p, i) => (
          <span key={i} style={{
            position: "absolute", ...p, width: 18, height: 18,
            borderTop: "1.5px solid var(--primary)",
            borderLeft: "1.5px solid var(--primary)",
            transform: `rotate(${p.rot}deg)`,
            opacity: .85,
          }}/>
        ))}

        {/* Top status bar */}
        <div style={{ display: "flex", justifyContent: "space-between", padding: "44px 28px 0" }}>
          <span className="mono small" style={{ color: "var(--primary)", letterSpacing: ".08em" }}>● PixC · resume</span>
          <span className="mono small muted" style={{ letterSpacing: ".08em" }}>SES 0×9F</span>
        </div>

        {/* Hero — single ring + center mark, faster animation than cold start */}
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
          <div style={{ position: "relative", width: 180, height: 180 }}>
            {/* Outer dashed ring (rotates) */}
            <span style={{
              position: "absolute", inset: 0, borderRadius: 999,
              border: "1px dashed color-mix(in srgb, var(--primary) 50%, transparent)",
              animation: "orbit-1 12s linear infinite",
            }}/>
            {/* Pulse rings */}
            {[0, 0.6].map((d, i) => (
              <span key={i} style={{
                position: "absolute", inset: 18, borderRadius: 999,
                border: "1.5px solid var(--primary)",
                animation: "ring-pulse 1.8s ease-out infinite",
                animationDelay: `${d}s`,
                opacity: .9,
              }}/>
            ))}
            {/* 4 mini-orbiting nodes representing devices */}
            <div style={{ position: "absolute", inset: 0, animation: "orbit-1 4s linear infinite" }}>
              {[
                { color: "var(--primary)", angle: 0   },
                { color: "#22c55e",        angle: 90  },
                { color: "#facc15",        angle: 180 },
                { color: "#06b6d4",        angle: 270 },
              ].map((n, i) => (
                <span key={i} style={{
                  position: "absolute", left: "50%", top: "50%",
                  width: 8, height: 8, borderRadius: 999,
                  background: n.color,
                  boxShadow: `0 0 10px ${n.color}`,
                  transform: `translate(-50%, -50%) rotate(${n.angle}deg) translateY(-86px)`,
                }}/>
              ))}
            </div>

            {/* Center mark */}
            <div style={{
              position: "absolute", left: "50%", top: "50%",
              transform: "translate(-50%, -50%)",
              width: 84, height: 84, borderRadius: 22,
              background: "#0a0a0a",
              border: "1px solid #1f1f1f",
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 8px 26px -6px color-mix(in srgb, var(--primary) 60%, transparent), inset 0 0 0 1px rgba(255,255,255,.04)",
            }}>
              <RgbMark size={48}/>
              <span style={{ position: "absolute", top: -1, left: -1, width: 9, height: 9, borderTop: "2px solid var(--primary)", borderLeft: "2px solid var(--primary)" }}/>
              <span style={{ position: "absolute", top: -1, right: -1, width: 9, height: 9, borderTop: "2px solid var(--primary)", borderRight: "2px solid var(--primary)" }}/>
              <span style={{ position: "absolute", bottom: -1, left: -1, width: 9, height: 9, borderBottom: "2px solid var(--primary)", borderLeft: "2px solid var(--primary)" }}/>
              <span style={{ position: "absolute", bottom: -1, right: -1, width: 9, height: 9, borderBottom: "2px solid var(--primary)", borderRight: "2px solid var(--primary)" }}/>
            </div>

            {/* Vertical scan line */}
            <span style={{
              position: "absolute", left: "calc(50% - 52px)", top: "calc(50% - 52px)",
              width: 104, height: 104, borderRadius: 22, overflow: "hidden",
              pointerEvents: "none",
            }}>
              <span style={{
                position: "absolute", left: 0, right: 0, height: 3,
                background: "linear-gradient(90deg, transparent, var(--primary), transparent)",
                animation: "scan-sweep 1.6s ease-in-out infinite",
                opacity: .9,
              }}/>
            </span>
          </div>
        </div>

        {/* Status readout — cycles resume phases */}
        <div style={{ padding: "0 28px 4px", textAlign: "center" }}>
          <div className="h2" style={{ letterSpacing: "-0.02em" }}>
            Welcome back<span style={{ color: "var(--primary)", marginLeft: 4 }}>·</span>
          </div>
          <div className="muted small" style={{ marginTop: 4, marginBottom: 10 }}>Rehydrating your home</div>

          <div style={{ position: "relative", height: 16 }}>
            {[
              { t: "RESUME · session restored",   d: "0s"   },
              { t: "MESH · 4 of 4 online",        d: "1.0s" },
              { t: "SCENES · ready",              d: "2.0s" },
            ].map((s, i) => (
              <span key={i} className="mono small" style={{
                position: "absolute", inset: 0,
                color: "var(--muted-foreground)",
                letterSpacing: ".08em",
                animation: `status-cycle 3s ease-in-out infinite`,
                animationDelay: s.d,
                opacity: 0,
              }}>
                <span style={{ color: "var(--primary)" }}>›</span> {s.t}
                <span style={{ animation: "type-blink 1s step-end infinite", marginLeft: 2 }}>_</span>
              </span>
            ))}
          </div>
        </div>

        {/* Progress bar with monospace percent */}
        <div style={{ padding: "8px 28px 22px" }}>
          <div style={{
            height: 4, borderRadius: 999,
            background: "color-mix(in srgb, var(--primary) 15%, var(--muted))",
            overflow: "hidden",
            position: "relative",
          }}>
            <span style={{
              display: "block", width: "72%", height: "100%",
              background: "linear-gradient(90deg, var(--primary), #06b6d4, #22c55e)",
              borderRadius: 999,
              boxShadow: "0 0 12px color-mix(in srgb, var(--primary) 65%, transparent)",
            }}/>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
            <span className="mono small muted" style={{ letterSpacing: ".08em" }}>RESUMING</span>
            <span className="mono small" style={{ color: "var(--primary)", letterSpacing: ".08em", fontVariantNumeric: "tabular-nums" }}>72%</span>
          </div>
        </div>
      </div>
    </Phone>
  );
}

// ---- 01d · Join home with invite code ----
function ScreenJoinHome() {
  const [code, setCode] = React.useState(["P", "X", "7", "Q", "", ""]);
  return (
    <Phone>
      <div style={{ padding: "8px 16px 0" }}>
        <button className="btn btn-ghost btn-icon-sm" aria-label="Back">
          <svg className="ic-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "8px 24px 24px" }}>
        {/* Hero */}
        <div style={{ textAlign: "center", marginTop: 12 }}>
          <div style={{
            width: 72, height: 72, borderRadius: 999,
            background: "var(--muted)", margin: "0 auto",
            display: "inline-flex", alignItems: "center", justifyContent: "center",
          }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/><path d="M9 20v-6h6v6"/></svg>
          </div>
          <div className="h2" style={{ marginTop: 16 }}>Join a home</div>
          <div className="muted" style={{ fontSize: 14, maxWidth: 280, margin: "6px auto 0" }}>
            Ask a home admin for a 6-character invite code.
          </div>
        </div>

        {/* Code input */}
        <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 28 }}>
          {code.map((c, i) => (
            <div key={i} style={{
              width: 44, height: 56, borderRadius: 12,
              border: c ? "1.5px solid var(--foreground)" : "1.5px solid var(--border-strong)",
              background: "var(--background)",
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              fontSize: 22, fontWeight: 600, fontFamily: "Geist Mono, ui-monospace, monospace",
              color: "var(--foreground)",
            }}>{c}</div>
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
          <button className="btn btn-ghost btn-sm" style={{ color: "var(--muted-foreground)", fontSize: 12 }}>
            <svg className="ic-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 9h6v6H9z"/></svg>
            Or scan QR code
          </button>
        </div>

        <div style={{ flex: 1 }}/>

        <div className="card" style={{ padding: 14, display: "flex", gap: 12, alignItems: "flex-start", background: "var(--muted)", border: 0, marginBottom: 14 }}>
          <span style={{ width: 28, height: 28, borderRadius: 999, background: "var(--background)", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5M12 16v.01"/></svg>
          </span>
          <div className="small">Codes expire after 24 hours. Joining grants access to all rooms by default — admins can scope this later.</div>
        </div>

        <button className="btn btn-primary btn-lg btn-block" disabled={code.some(c=>!c)}>Join home</button>
        <button className="btn btn-ghost btn-lg btn-block" style={{ marginTop: 4 }}>Set up a new home instead</button>
      </div>
    </Phone>
  );
}

// ---- 01g · Welcome (post-auth) — between auth and adding first device ----
function ScreenWelcomePostAuth() {
  const choices = [
    {
      id: "add",
      title: "Add your first device",
      sub: "Pair a PixC bulb, strip, or panel over Wi-Fi.",
      primary: true,
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 18h6"/><path d="M10 21h4"/>
          <path d="M12 3a6 6 0 0 0-4 10.5c.7.7 1 1.6 1 2.5v1h6v-1c0-.9.3-1.8 1-2.5A6 6 0 0 0 12 3z"/>
        </svg>
      ),
    },
    {
      id: "join",
      title: "Join a home",
      sub: "Use a 6-character invite code from a home admin.",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/>
          <path d="M9 20v-5h6v5"/>
        </svg>
      ),
    },
    {
      id: "home",
      title: "Go to homescreen",
      sub: "Skip for now and explore the app.",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7" rx="1.5"/>
          <rect x="14" y="3" width="7" height="7" rx="1.5"/>
          <rect x="3" y="14" width="7" height="7" rx="1.5"/>
          <rect x="14" y="14" width="7" height="7" rx="1.5"/>
        </svg>
      ),
    },
  ];

  return (
    <Phone>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "36px 24px 24px" }}>
        {/* Hero — refined orbital. Soft gradient ring + 8 gradient dashes
            + central tile with primary halo. Sticks taper outward and use
            paired colors so it reads as polished, not confetti. */}
        <div style={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
          <div style={{ position: "relative", width: 200, height: 200, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
            {/* Outer halo */}
            <span style={{
              position: "absolute", inset: 0, borderRadius: 999,
              background: "radial-gradient(circle, color-mix(in srgb, var(--primary) 28%, transparent) 0%, transparent 60%)",
            }}/>
            {/* Thin ring */}
            <span style={{
              position: "absolute", inset: 14, borderRadius: 999,
              border: "1px dashed color-mix(in srgb, var(--primary) 35%, transparent)",
            }}/>
            {/* 8 gradient dashes — paired so opposite sticks share a color */}
            {[
              { deg: 0,   c: "#ef4444" },
              { deg: 45,  c: "#f97316" },
              { deg: 90,  c: "#facc15" },
              { deg: 135, c: "#22c55e" },
              { deg: 180, c: "#06b6d4" },
              { deg: 225, c: "var(--primary)" },
              { deg: 270, c: "#a855f7" },
              { deg: 315, c: "#ec4899" },
            ].map((s) => (
              <span key={s.deg} style={{
                position: "absolute", left: "50%", top: "50%",
                width: 3, height: 18, borderRadius: 999,
                background: `linear-gradient(180deg, ${s.c}, color-mix(in srgb, ${s.c} 30%, transparent))`,
                boxShadow: `0 0 10px ${s.c}`,
                transform: `translate(-50%, -50%) rotate(${s.deg}deg) translateY(-86px)`,
              }}/>
            ))}
            {/* Center tile */}
            <div style={{
              position: "relative",
              width: 100, height: 100, borderRadius: 26,
              background: "radial-gradient(120% 90% at 50% 0%, color-mix(in srgb, var(--primary) 22%, #0a0a0a) 0%, #0a0a0a 70%)",
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              border: "1px solid color-mix(in srgb, var(--primary) 35%, #1f1f1f)",
              boxShadow: "0 12px 36px -12px color-mix(in srgb, var(--primary) 60%, transparent), inset 0 1px 0 rgba(255,255,255,.05)",
            }}>
              <RgbMark size={62}/>
              {/* Corner notches */}
              <span style={{ position: "absolute", top: -1, left: -1, width: 10, height: 10, borderTop: "2px solid var(--primary)", borderLeft: "2px solid var(--primary)" }}/>
              <span style={{ position: "absolute", top: -1, right: -1, width: 10, height: 10, borderTop: "2px solid var(--primary)", borderRight: "2px solid var(--primary)" }}/>
              <span style={{ position: "absolute", bottom: -1, left: -1, width: 10, height: 10, borderBottom: "2px solid var(--primary)", borderLeft: "2px solid var(--primary)" }}/>
              <span style={{ position: "absolute", bottom: -1, right: -1, width: 10, height: 10, borderBottom: "2px solid var(--primary)", borderRight: "2px solid var(--primary)" }}/>
            </div>
          </div>
        </div>

        <div style={{ textAlign: "center", maxWidth: 300, marginInline: "auto", marginTop: 14 }}>
          <div className="mono small" style={{ color: "var(--primary)", letterSpacing: ".12em", textTransform: "uppercase", marginBottom: 6 }}>
            Setup complete
          </div>
          <div className="h1" style={{ marginBottom: 6, letterSpacing: "-0.02em" }}>Welcome, Rayon</div>
          <div className="muted" style={{ fontSize: 14 }}>
            Your home is ready. What would you like to do first?
          </div>
        </div>

        <div style={{ flex: 1 }}/>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {choices.map((c) => (
            <button key={c.id} className="card" style={{
              padding: 14, display: "flex", alignItems: "center", gap: 12,
              textAlign: "left", cursor: "pointer", font: "inherit",
              background: c.primary ? "var(--primary)" : "var(--card)",
              color: c.primary ? "var(--primary-foreground)" : "var(--foreground)",
              border: c.primary ? "1px solid var(--primary)" : "1px solid var(--border)",
            }}>
              <div style={{
                width: 40, height: 40, borderRadius: 12, flex: "0 0 auto",
                background: c.primary ? "rgba(255,255,255,.18)" : "var(--muted)",
                color: c.primary ? "var(--primary-foreground)" : "var(--foreground)",
                display: "inline-flex", alignItems: "center", justifyContent: "center",
              }}>
                {c.icon}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{c.title}</div>
                <div style={{ fontSize: 12, opacity: c.primary ? .85 : 1, color: c.primary ? "rgba(255,255,255,.85)" : "var(--muted-foreground)", marginTop: 2 }}>{c.sub}</div>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: .6 }}><path d="M9 6l6 6-6 6"/></svg>
            </button>
          ))}
        </div>
      </div>
    </Phone>
  );
}

// ---- Edit room (sibling of Add room) ----
function ScreenEditRoom() {
  // Inline SVG room icons (lucide-style) — guaranteed to render in both
  // themes; uses currentColor so contrast is always correct.
  const icons = [
    { id: "sofa",  svg: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12V8a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v4"/><path d="M2 14a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2v2h-2v-2H6v2H4v-2a2 2 0 0 1-2-2v-3z"/><path d="M6 12v-1a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v1"/></svg> },
    { id: "bed",   svg: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round"><path d="M2 18v-7a2 2 0 0 1 2-2h6a3 3 0 0 1 3 3v1h7a2 2 0 0 1 2 2v3"/><path d="M2 18h20v2"/><circle cx="6.5" cy="11.5" r="1.5"/></svg> },
    { id: "chef",  svg: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round"><path d="M5 3h14v6a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4V3z"/><path d="M9 13v8M15 13v8"/><path d="M5 7h14"/></svg> },
    { id: "bath",  svg: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12h18v3a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4v-3z"/><path d="M7 12V6a2 2 0 0 1 4 0"/><path d="M5 21l1-2M19 21l-1-2"/><path d="M12 3v0"/></svg> },
    { id: "desk",  svg: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="11" rx="2"/><path d="M2 19h20"/><path d="M9 19v-2M15 19v-2"/></svg> },
    { id: "tv",    svg: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="13" rx="2"/><path d="M8 22h8M12 18v4"/></svg> },
    { id: "car",   svg: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round"><path d="M5 11l1.6-4.5A2 2 0 0 1 8.5 5h7a2 2 0 0 1 1.9 1.5L19 11"/><path d="M3 17v-5h18v5h-2a2 2 0 0 1-4 0H9a2 2 0 0 1-4 0H3z"/><circle cx="7" cy="17" r="1.4" fill="currentColor"/><circle cx="17" cy="17" r="1.4" fill="currentColor"/></svg> },
    { id: "yard",  svg: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22V12"/><path d="M12 12c-3 0-5-2-5-5 0-1 .4-2 1-2.6.6.6 1.5 1 2.5 1 .8 0 1.6-.3 2.2-.8.6.5 1.4.8 2.3.8 1 0 1.9-.4 2.5-1 .6.6 1 1.6 1 2.6 0 3-2 5-5 5z"/><path d="M5 22h14"/></svg> },
  ];

  return (
    <Phone>
      <Header title="Edit room" right={<button className="btn btn-ghost btn-sm" style={{ color: "var(--destructive)" }}>Delete</button>} />
      <div style={{ flex: 1, overflow: "auto", padding: "0 24px 24px" }}>
        <label className="field-label">Name</label>
        <input className="input" defaultValue="Living room" />

        <div className="field-label" style={{ marginTop: 16 }}>Icon</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
          {icons.map((it, i) => {
            const sel = i === 5;
            return (
              <button key={it.id} type="button" aria-label={it.id} style={{
                aspectRatio: "1", borderRadius: 14, cursor: "pointer", padding: 0,
                border: sel ? "1.5px solid var(--primary)" : "1px solid var(--border)",
                background: sel ? "var(--primary-soft)" : "var(--card)",
                color: sel ? "var(--primary)" : "var(--foreground)",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: sel ? "0 0 0 3px rgba(var(--primary-rgb),.18)" : undefined,
              }}>
                {it.svg}
              </button>
            );
          })}
        </div>

        <div className="muted small" style={{ marginTop: 20, marginBottom: 8, textTransform: "uppercase", letterSpacing: ".06em", fontWeight: 500 }}>4 devices in this room</div>
        <div className="card">
          {[
          { n: "PixC Lyt", s: "Connected · 82%", c: "#a855f7", k: "bulb", on: true },
          { n: "Strip 01", s: "Connected · 64%", c: "#22c55e", k: "strip", on: true },
          { n: "Bulb 02", s: "Connected · Off", c: "#f59e0b", k: "bulb", on: false },
          { n: "Lamp", s: "Connected · 45%", c: "#3b82f6", k: "lamp", on: true }].
          map((d) =>
          <div className="row" key={d.n}>
              <div className="icon-wrap" style={{ background: d.c + "22", color: d.c }}>{window.DEVICE_ICONS[d.k]}</div>
              <div className="label-wrap">
                <div className="t">{d.n}</div>
                <div className="s">{d.s}</div>
              </div>
              <button className="btn btn-ghost btn-sm" style={{ color: "var(--muted-foreground)" }}>Move</button>
            </div>
          )}
        </div>

        <button className="btn btn-outline btn-block" style={{ marginTop: 14 }}>
          <svg className="ic-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14" /></svg>
          Add device to this room
        </button>

        <div style={{ height: 80 }} />
      </div>

      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: "12px 24px", background: "linear-gradient(to top, var(--background), transparent)" }}>
        <button className="btn btn-primary btn-lg btn-block">Save changes</button>
      </div>
    </Phone>);

}

// ---- PixC AI — chat-style assistant ----
function ScreenTwotoAI() {
  const [plan] = (window.usePixcPlan ? window.usePixcPlan() : ["free", () => {}]);
  const isPro = plan === "pro";
  const used = isPro ? 412 : 12;
  const cap  = isPro ? 1000 : 30;

  const messages = [
  { who: "ai", t: "Hi Rayon! I can change scenes, dim or color your lights, or build a routine. What would you like to do?" },
  { who: "me", t: "Make the bedroom feel like sunset." },
  { who: "ai", t: "Got it. I'll set Bedroom strip to a warm 2700K + amber gradient, brightness 45%.", action: { devices: 2, scene: "Sunset", brightness: 45 } },
  { who: "me", t: "And dim the rest of the house." },
  { who: "ai", t: "Dimming Living, Kitchen and Hallway lights to 30%. Want me to save this as a scene?", suggestions: ["Save as 'Wind down'", "Just for tonight"] }];


  return (
    <Phone>
      {/* Header */}
      <div style={{ padding: "8px 16px 0", display: "flex", alignItems: "center", justifyContent: "space-between", flex: "0 0 auto" }}>
        <button className="btn btn-ghost btn-icon-sm" aria-label="Back">
          <svg className="ic-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{
            width: 22, height: 22, borderRadius: 7,
            background: "radial-gradient(circle at 35% 35%, #c4b5fd, #6366f1 60%, #ec4899)",
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 0 10px rgba(139,92,246,.55)"
          }}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l1.6 4.4L18 8l-4.4 1.6L12 14l-1.6-4.4L6 8l4.4-1.6L12 2z" /></svg>
          </span>
          <div style={{ fontSize: 14, fontWeight: 600 }}>PixC AI</div>
        </div>
        <button className="btn btn-ghost btn-icon-sm" aria-label="More">
          <svg className="ic-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="5" r="1.5" /><circle cx="12" cy="12" r="1.5" /><circle cx="12" cy="19" r="1.5" /></svg>
        </button>
      </div>

      {/* Quota counter */}
      <div style={{ padding: "4px 16px 0", display: "flex", alignItems: "center", gap: 8 }}>
        <span className="mono" style={{ flex: 1, color: "var(--muted-foreground)", letterSpacing: ".04em", fontSize: 10.5 }}>
          <span style={{ color: "var(--foreground)", fontWeight: 600 }}>{used.toLocaleString()}</span>
          <span> / {cap.toLocaleString()} this week · resets Mon</span>
        </span>
        {!isPro && <window.LockBadge size="sm"/>}
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflow: "auto", padding: "16px 16px 8px", display: "flex", flexDirection: "column", gap: 10 }}>
        {messages.map((m, i) =>
        <div key={i} style={{ display: "flex", justifyContent: m.who === "me" ? "flex-end" : "flex-start" }}>
            <div style={{
            maxWidth: "82%",
            padding: "9px 13px", borderRadius: 16,
            background: m.who === "me" ? "var(--foreground)" : "var(--muted)",
            color: m.who === "me" ? "var(--background)" : "var(--foreground)",
            fontSize: 13, lineHeight: 1.45,
            borderBottomRightRadius: m.who === "me" ? 4 : 16,
            borderBottomLeftRadius: m.who === "me" ? 16 : 4
          }}>
              {m.t}
              {m.action &&
            <div style={{
              marginTop: 8, padding: "8px 10px", borderRadius: 10,
              background: "var(--background)", color: "var(--foreground)",
              border: "1px solid var(--border)",
              display: "flex", alignItems: "center", gap: 8
            }}>
                  <span style={{
                width: 28, height: 28, borderRadius: 8,
                background: "linear-gradient(135deg, #facc15, #ea580c)",
                flex: "0 0 auto"
              }} />
                  <div style={{ fontSize: 12, lineHeight: 1.3 }}>
                    <div style={{ fontWeight: 600 }}>{m.action.scene}</div>
                    <div className="muted small">{m.action.devices} devices · {m.action.brightness}%</div>
                  </div>
                  <button className="btn btn-primary btn-sm" style={{ height: 26, marginLeft: "auto" }}>Apply</button>
                </div>
            }
              {m.suggestions &&
            <div style={{ display: "flex", gap: 6, marginTop: 8, flexWrap: "wrap" }}>
                  {m.suggestions.map((s) =>
              <button key={s} className="btn btn-outline btn-sm" style={{
                height: 26, fontSize: 12,
                background: "var(--background)"
              }}>{s}</button>
              )}
                </div>
            }
            </div>
          </div>
        )}

        {/* Typing indicator */}
        <div style={{ display: "flex", justifyContent: "flex-start" }}>
          <div style={{
            padding: "10px 13px", borderRadius: 16,
            background: "var(--muted)",
            display: "inline-flex", gap: 4, alignItems: "center",
            borderBottomLeftRadius: 4
          }}>
            {[0, 1, 2].map((i) =>
            <span key={i} style={{
              width: 5, height: 5, borderRadius: 999,
              background: "var(--muted-foreground)",
              animation: "ai-typing 1.2s ease-in-out infinite",
              animationDelay: `${i * 0.18}s`
            }} />
            )}
          </div>
        </div>
      </div>

      {/* Composer */}
      <div style={{ padding: "8px 16px 14px", borderTop: "1px solid var(--border)" }}>
        <div style={{
          display: "flex", alignItems: "center", gap: 6,
          padding: "6px 6px 6px 14px", borderRadius: 999,
          border: "1px solid var(--border)", background: "var(--background)"
        }}>
          <button className="btn btn-ghost btn-icon-sm" aria-label="Add">
            <svg className="ic-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14" /></svg>
          </button>
          <input
            placeholder="Ask PixC AI…"
            style={{
              flex: 1, border: 0, outline: "none", background: "transparent",
              fontSize: 13, fontFamily: "inherit", color: "var(--foreground)",
              padding: "4px 0"
            }} />
          
          <button className="btn btn-ghost btn-icon-sm" aria-label="Voice">
            <svg className="ic-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="2" width="6" height="13" rx="3" /><path d="M5 11a7 7 0 0 0 14 0M12 18v3" /></svg>
          </button>
          <button className="btn btn-primary btn-icon-sm" aria-label="Send" style={{ width: 32, height: 32, borderRadius: 999 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13" /><path d="M22 2l-7 20-4-9-9-4z" /></svg>
          </button>
        </div>

        {/* Quick suggestions */}
        <div style={{ display: "flex", gap: 6, marginTop: 10, overflowX: "auto", scrollbarWidth: "none" }}>
          {["Movie night", "Wake me at 7", "All off", "Bedtime"].map((s) =>
          <button key={s} className="btn btn-outline btn-sm" style={{
            height: 28, fontSize: 12, padding: "0 10px", flex: "0 0 auto"
          }}>{s}</button>
          )}
        </div>
      </div>

      <style>{`
        @keyframes ai-typing {
          0%, 60%, 100% { opacity: .3; transform: translateY(0); }
          30%           { opacity: 1;  transform: translateY(-3px); }
        }
      `}</style>
    </Phone>);

}

// ---- PixC AI · empty (first launch, no history) ----
function ScreenTwotoAIEmpty() {
  const [plan] = (window.usePixcPlan ? window.usePixcPlan() : ["free", () => {}]);
  const isPro = plan === "pro";
  const cap = isPro ? 1000 : 30;

  const ideas = [
  "Set bedroom to a sunset.",
  "Dim everything except hallway.",
  "Movie night for living room.",
  "Slowly wake me at 7am."];

  return (
    <Phone>
      <div style={{ padding: "8px 16px 0", display: "flex", alignItems: "center", justifyContent: "space-between", flex: "0 0 auto" }}>
        <button className="btn btn-ghost btn-icon-sm" aria-label="Back">
          <svg className="ic-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
        </button>
        <div style={{ fontSize: 14, fontWeight: 600 }}>PixC AI</div>
        <button className="btn btn-ghost btn-icon-sm" aria-label="More">
          <svg className="ic-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="5" r="1.5" /><circle cx="12" cy="12" r="1.5" /><circle cx="12" cy="19" r="1.5" /></svg>
        </button>
      </div>

      <div style={{ padding: "4px 16px 0", display: "flex", alignItems: "center", gap: 8 }}>
        <span className="mono" style={{ flex: 1, color: "var(--muted-foreground)", letterSpacing: ".04em", fontSize: 10.5 }}>
          <span style={{ color: "var(--foreground)", fontWeight: 600 }}>0</span>
          <span> / {cap.toLocaleString()} this week · resets Mon</span>
        </span>
        {!isPro && <window.LockBadge size="sm"/>}
      </div>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 24px", gap: 18 }}>
        <span style={{
          width: 72, height: 72, borderRadius: 22,
          background: "radial-gradient(circle at 35% 35%, #c4b5fd, #6366f1 55%, #ec4899)",
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 0 30px rgba(139,92,246,.45)"
        }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l1.6 4.4L18 8l-4.4 1.6L12 14l-1.6-4.4L6 8l4.4-1.6L12 2z" /><path d="M19 14l.8 2.2L22 17l-2.2.8L19 20l-.8-2.2L16 17l2.2-.8L19 14z" /></svg>
        </span>
        <div style={{ textAlign: "center" }}>
          <div className="h2">Ask anything</div>
          <div className="muted" style={{ fontSize: 14, marginTop: 4, maxWidth: 280 }}>
            PixC AI controls your home in plain language. Try one of these:
          </div>
        </div>
        <div style={{ width: "100%", display: "grid", gap: 8 }}>
          {ideas.map((s) =>
          <button key={s} className="btn btn-outline btn-block" style={{ justifyContent: "flex-start", height: 44, padding: "0 14px", fontSize: 13, fontWeight: 400 }}>
              <svg className="ic-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--muted-foreground)" }}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
              {s}
            </button>
          )}
        </div>
      </div>

      <div style={{ padding: "8px 16px 14px", borderTop: "1px solid var(--border)" }}>
        <div style={{
          display: "flex", alignItems: "center", gap: 6,
          padding: "6px 6px 6px 14px", borderRadius: 999,
          border: "1px solid var(--border)", background: "var(--background)"
        }}>
          <span className="muted" style={{ flex: 1, fontSize: 13 }}>Ask PixC AI…</span>
          <button className="btn btn-primary btn-icon-sm" style={{ width: 32, height: 32, borderRadius: 999 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13" /><path d="M22 2l-7 20-4-9-9-4z" /></svg>
          </button>
        </div>
      </div>
    </Phone>);

}

// ---- Empty home (no devices, no rooms beyond default) ----
// Used as 03 · Home empty when the user has just signed up
function ScreenHomeEmpty() {
  return (
    <Phone>
      <div style={{ padding: "8px 20px 4px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: 999, background: "var(--muted)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 600 }}>R</div>
          <div>
            <div className="muted" style={{ fontSize: 12 }}>Good evening</div>
            <div style={{ fontSize: 15, fontWeight: 600, letterSpacing: "-0.005em" }}>Rayon</div>
          </div>
        </div>
        <button className="btn btn-outline btn-icon-sm" aria-label="Settings">
          <svg className="ic-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>
        </button>
      </div>

      <div style={{ padding: "10px 20px 0" }}>
        <button className="btn" style={{
          width: "100%", height: 56, padding: "0 14px",
          background: "var(--dark)", color: "var(--dark-fg)",
          borderRadius: 14, justifyContent: "flex-start", gap: 12,
          border: "1px solid var(--dark)",
          cursor: "pointer", fontFamily: "inherit"
        }}>
          <span style={{
            width: 32, height: 32, borderRadius: 10,
            background: "radial-gradient(circle at 35% 35%, #c4b5fd, #6366f1 60%, #ec4899)",
            display: "inline-flex", alignItems: "center", justifyContent: "center"
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l1.6 4.4L18 8l-4.4 1.6L12 14l-1.6-4.4L6 8l4.4-1.6L12 2z" /></svg>
          </span>
          <span style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 1, flex: 1 }}>
            <span style={{ fontSize: 14, fontWeight: 600 }}>Ask PixC AI</span>
            <span style={{ fontSize: 11, color: "var(--dark-muted)" }}>Try "find my devices" once you've added one</span>
          </span>
        </button>
      </div>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 32px", gap: 16 }}>
        <div style={{
          width: 160, height: 160, borderRadius: 999,
          background: "var(--muted)",
          border: "1px dashed var(--border-strong)",
          display: "inline-flex", alignItems: "center", justifyContent: "center"
        }}>
          <RgbMark size={84} />
        </div>
        <div style={{ textAlign: "center" }}>
          <div className="h2">Set up your first device</div>
          <div className="muted" style={{ fontSize: 14, marginTop: 6, maxWidth: 280 }}>
            Bulbs, strips, or sensors — pair them in under a minute and they'll show up here.
          </div>
        </div>
        <button className="btn btn-primary btn-lg btn-block" style={{ marginTop: 4 }}>
          <svg className="ic-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14" /></svg>
          Add device
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", maxWidth: 280 }}>
          <span style={{ flex: 1, height: 1, background: "var(--border)" }}/>
          <span className="muted small">or</span>
          <span style={{ flex: 1, height: 1, background: "var(--border)" }}/>
        </div>
        <button className="btn btn-outline btn-lg btn-block">
          <svg className="ic-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 9h6v6H9z"/></svg>
          Join an existing home
        </button>
      </div>

      <div style={{ height: 32 }} />
    </Phone>);

}

// ---- Notifications · empty ----
function ScreenNotificationsEmpty() {
  return (
    <Phone>
      <Header title="Notifications" right={<button className="btn btn-ghost btn-sm" style={{ color: "var(--muted-foreground)" }} disabled>Mark read</button>} />
      <div className="empty-hero">
        <span className="ic-disc">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 21a2 2 0 0 0 4 0"/></svg>
        </span>
        <div className="h2">You're all caught up</div>
        <div className="muted" style={{ fontSize: 14, marginTop: 4, maxWidth: 280 }}>
          New activity from your home and devices will appear here.
        </div>
        <button className="btn btn-outline btn-sm" style={{ marginTop: 18 }}>Notification settings</button>
      </div>
    </Phone>
  );
}

// ---- Energy · empty (first 24h) ----
function ScreenEnergyEmpty() {
  return (
    <Phone>
      <Header title="Energy" right={<button className="btn btn-outline btn-sm" disabled>This week</button>} />
      <div className="empty-hero">
        <span className="ic-disc">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="M7 14l4-4 3 3 5-6"/></svg>
        </span>
        <div className="h2">No usage data yet</div>
        <div className="muted" style={{ fontSize: 14, marginTop: 4, maxWidth: 280 }}>
          Energy usage will appear after 24 hours of activity from at least one device.
        </div>

        <div className="card" style={{ width: "100%", maxWidth: 320, marginTop: 22, padding: 14, background: "var(--background)" }}>
          <div className="muted small" style={{ textTransform: "uppercase", letterSpacing: ".06em" }}>Total this week</div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginTop: 4 }}>
            <span className="h1" style={{ color: "var(--muted-foreground)" }}>—</span>
            <span className="muted">kWh</span>
          </div>
          <div style={{
            marginTop: 14, height: 64, borderRadius: 8,
            background: "linear-gradient(180deg, var(--muted) 0%, var(--background) 100%)",
            border: "1px dashed var(--border-strong)",
            display: "flex", alignItems: "flex-end", justifyContent: "space-around", padding: "0 8px 6px",
          }}>
            {[14, 22, 18, 30, 16, 26, 12].map((h, i) => (
              <span key={i} style={{
                width: 8, height: h, borderRadius: 2,
                background: "color-mix(in srgb, var(--primary) 30%, var(--muted))",
                opacity: .55,
              }}/>
            ))}
          </div>
        </div>
      </div>
    </Phone>
  );
}

// ---- Sharing · empty (no members yet) ----
function ScreenSharingEmpty() {
  return (
    <Phone>
      <Header title="Members" right={<button className="btn btn-outline btn-sm"><svg className="ic-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14" /></svg>Invite</button>} />
      <div style={{ flex: 1, padding: "0 20px 24px", display: "flex", flexDirection: "column" }}>
        <div className="card" style={{ padding: 14, background: "var(--muted)", display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: "var(--card)", color: "var(--foreground)", border: "1px solid var(--border)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
            <svg className="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11l9-8 9 8" /><path d="M5 10v10h14V10" /></svg>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 600 }}>Rayon's Home</div>
            <div className="muted small">Just you</div>
          </div>
        </div>

        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 14 }}>
          <div style={{
            width: 88, height: 88, borderRadius: 999,
            background: "var(--muted)",
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            color: "var(--muted-foreground)"
          }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 11h-6M22 14h-6" /></svg>
          </div>
          <div style={{ textAlign: "center" }}>
            <div className="h3">Share with family</div>
            <div className="muted" style={{ fontSize: 14, marginTop: 6, maxWidth: 260 }}>
              Add up to 6 people. They'll be able to control devices, but only you can change Wi-Fi or invite others.
            </div>
          </div>
          <button className="btn btn-primary btn-block">Invite someone</button>
        </div>
      </div>
    </Phone>);

}

Object.assign(window, {
  AddDeviceHero, ScanningHero,
  ScreenAppLaunch, ScreenAppLaunchReturning, ScreenHomeWelcome, ScreenJoinHome, ScreenWelcomePostAuth,
  ScreenEditRoom, ScreenTwotoAI, ScreenTwotoAIEmpty,
  ScreenHomeEmpty, ScreenNotificationsEmpty, ScreenEnergyEmpty, ScreenSharingEmpty
});