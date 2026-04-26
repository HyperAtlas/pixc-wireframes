// ===== Onboarding & Auth screens =====

// 01 - Splash / welcome (replaces "slide to unlock")
function ScreenSplash() {
  return (
    <Phone>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "40px 24px 32px" }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 24 }}>
          <TwotoMark size="lg" />
          <div style={{ textAlign: "center" }}>
            <div className="h1" style={{ marginBottom: 8 }}>Welcome to PixC</div>
            <div className="muted" style={{ fontSize: 15, maxWidth: 280 }}>
              Control every light, sensor and outlet in your home from one place.
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <button className="btn btn-primary btn-lg btn-block">Get started</button>
          <button className="btn btn-ghost btn-lg btn-block">I already have an account</button>
        </div>
      </div>
    </Phone>
  );
}

// 02 - Onboarding carousel (NEW)
function ScreenWalkthrough() {
  return (
    <Phone>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "32px 24px" }}>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button className="btn btn-ghost btn-sm" style={{ color: "var(--muted-foreground)" }}>Skip</button>
        </div>

        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 32 }}>
          {/* Hero: dark tile with proper RGB mark — mixBlendMode screen needs a dark canvas */}
          <div style={{
            width: 220, height: 220, borderRadius: 24,
            background: "radial-gradient(120% 90% at 50% 0%, color-mix(in srgb, var(--primary) 18%, #0a0a0a) 0%, #0a0a0a 70%)",
            border: "1px solid color-mix(in srgb, var(--primary) 30%, #1f1f1f)",
            boxShadow: "0 18px 48px -16px color-mix(in srgb, var(--primary) 60%, transparent), inset 0 1px 0 rgba(255,255,255,.06)",
            display: "flex", alignItems: "center", justifyContent: "center",
            position: "relative",
            overflow: "hidden",
          }}>
            {/* Soft halo behind the RGB mark */}
            <span style={{
              position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)",
              width: 160, height: 160, borderRadius: 999,
              background: "radial-gradient(circle, rgba(255,255,255,.08), transparent 65%)",
            }}/>
            <RgbMark size={140}/>
            <div style={{
              position: "absolute", top: 14, left: 14,
              padding: "4px 9px", borderRadius: 999,
              background: "rgba(255,255,255,.10)",
              border: "1px solid rgba(255,255,255,.18)",
              fontSize: 10, fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase",
              color: "#fafafa",
              backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)",
            }}>16M colors</div>
            <div style={{
              position: "absolute", bottom: 14, right: 14,
              display: "inline-flex", alignItems: "center", gap: 6,
              padding: "4px 9px", borderRadius: 999,
              background: "rgba(255,255,255,.10)",
              border: "1px solid rgba(255,255,255,.18)",
              fontSize: 10, fontWeight: 600, letterSpacing: ".04em",
              color: "#fafafa",
              backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)",
            }}>
              <span style={{ width: 6, height: 6, borderRadius: 999, background: "#22c55e", boxShadow: "0 0 6px #22c55e" }}/>
              LIVE
            </div>
          </div>
          <div style={{ textAlign: "center", maxWidth: 300 }}>
            <div className="h2" style={{ marginBottom: 8 }}>Paint your space with light</div>
            <div className="muted" style={{ fontSize: 15 }}>
              Mix any color, save your favorites, or let the room react to music and motion.
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "center" }}>
          <div style={{ display: "flex", gap: 6 }}>
            <span style={{ width: 20, height: 6, borderRadius: 3, background: "var(--foreground)" }}/>
            <span style={{ width: 6, height: 6, borderRadius: 3, background: "var(--border-strong)" }}/>
            <span style={{ width: 6, height: 6, borderRadius: 3, background: "var(--border-strong)" }}/>
          </div>
          <button className="btn btn-primary btn-lg btn-block">Next</button>
        </div>
      </div>
    </Phone>
  );
}

// 03 - Sign in / Email
function ScreenSignIn() {
  return (
    <Phone>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "8px 24px 24px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <button className="btn btn-ghost btn-icon-sm" aria-label="Back">
            <svg className="ic-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
        </div>

        <div style={{ marginTop: 24 }}>
          <TwotoMark/>
          <div className="h1" style={{ marginTop: 24, marginBottom: 6 }}>Welcome back</div>
          <div className="muted" style={{ fontSize: 14 }}>Enter your email to sign in to PixC.</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 28 }}>
          <div>
            <label className="field-label">Email</label>
            <input className="input" type="email" placeholder="name@example.com" defaultValue="rayon@email.com" />
          </div>
          <button className="btn btn-primary btn-lg btn-block">Continue with email</button>

          <div style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--muted-foreground)", fontSize: 12, margin: "8px 0" }}>
            <div style={{ flex: 1, height: 1, background: "var(--border)" }}/>
            <span>OR CONTINUE WITH</span>
            <div style={{ flex: 1, height: 1, background: "var(--border)" }}/>
          </div>

          <button className="btn btn-outline btn-lg btn-block">
            <svg className="ic-sm" viewBox="0 0 24 24" fill="currentColor"><path d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.12 0-.23-.02-.3-.03-.01-.06-.04-.22-.04-.39 0-1.15.572-2.27 1.206-2.98.804-.94 2.142-1.64 3.248-1.68.03.13.05.28.05.43zm4.565 15.71c-.03.07-.463 1.58-1.518 3.12-.945 1.34-1.94 2.71-3.43 2.71-1.517 0-1.9-.88-3.63-.88-1.698 0-2.302.91-3.67.91-1.377 0-2.332-1.26-3.428-2.8-1.287-1.82-2.323-4.63-2.323-7.28 0-4.28 2.797-6.55 5.552-6.55 1.448 0 2.675.95 3.6.95.865 0 2.222-1.01 3.902-1.01.613 0 2.886.06 4.374 2.19-.13.09-2.383 1.37-2.383 4.19 0 3.26 2.854 4.42 2.955 4.45z"/></svg>
            Continue with Apple
          </button>
          <button className="btn btn-outline btn-lg btn-block">
            <svg className="ic-sm" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A10.99 10.99 0 0 0 12 23z"/><path fill="#FBBC05" d="M5.84 14.09A6.6 6.6 0 0 1 5.49 12c0-.72.13-1.43.35-2.09V7.07H2.18A10.99 10.99 0 0 0 1 12c0 1.77.42 3.45 1.18 4.93l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"/></svg>
            Continue with Google
          </button>
        </div>

        <div style={{ flex: 1 }}/>
        <div className="muted small" style={{ textAlign: "center", maxWidth: 280, margin: "0 auto" }}>
          By continuing you agree to our <span style={{ color: "var(--foreground)", textDecoration: "underline" }}>Terms</span> and <span style={{ color: "var(--foreground)", textDecoration: "underline" }}>Privacy Policy</span>.
        </div>
      </div>
    </Phone>
  );
}

// 04 - OTP verify
function ScreenOtp({ error }) {
  const digits = error ? ["1","2","3","8","8","8"] : ["4","2","8","",""," "];
  return (
    <Phone>
      <Header title="Verify your email" />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "8px 24px 24px" }}>
        <div className="muted" style={{ fontSize: 14, marginBottom: 28 }}>
          We sent a 6-digit code to <span style={{ color: "var(--foreground)", fontWeight: 500 }}>r***n@email.com</span>. Enter it below to continue.
        </div>

        <div style={{ display: "flex", gap: 8, justifyContent: "space-between", marginBottom: 12 }}>
          {[0,1,2,3,4,5].map(i => (
            <div key={i} style={{
              width: 48, height: 56,
              border: `1px solid ${error ? "var(--destructive)" : (i === 3 ? "var(--ring)" : "var(--input)")}`,
              borderRadius: 10,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 20, fontWeight: 500,
              boxShadow: i === 3 && !error ? "0 0 0 3px rgba(24,24,27,.08)" : undefined,
              fontFamily: "Geist Mono, monospace"
            }}>{digits[i]?.trim()}</div>
          ))}
        </div>

        {error
          ? <div style={{ color: "var(--destructive)", fontSize: 13, fontWeight: 500, display: "flex", alignItems: "center", gap: 6 }}>
              <svg className="ic-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              Invalid code. Try again.
            </div>
          : <div className="muted small">Code expires in 9:42</div>
        }

        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 28 }}>
          <button className="btn btn-primary btn-lg btn-block">Verify</button>
          <button className="btn btn-ghost btn-lg btn-block">Resend code</button>
        </div>
      </div>
    </Phone>
  );
}

// 06 - Profile setup (replaces "additional info")
function ScreenProfileSetup() {
  return (
    <Phone>
      <Header title="" />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "0 24px 24px" }}>
        <div className="h1" style={{ marginBottom: 6 }}>Set up your profile</div>
        <div className="muted" style={{ fontSize: 14, marginBottom: 24 }}>A few quick details so we can personalize your home.</div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div>
            <label className="field-label">Display name</label>
            <input className="input" defaultValue="Rayon" />
          </div>
          <div>
            <label className="field-label">Timezone</label>
            <div className="input" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", color: "var(--foreground)" }}>
              <span>Asia / Kolkata (GMT+5:30)</span>
              <svg className="ic-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>
            </div>
          </div>
          <div>
            <label className="field-label">Temperature unit</label>
            <div className="seg" style={{ width: "100%" }}>
              <button className="active" style={{ flex: 1, justifyContent: "center" }}>°C</button>
              <button style={{ flex: 1, justifyContent: "center" }}>°F</button>
            </div>
          </div>
        </div>

        <div style={{ flex: 1 }}/>
        <button className="btn btn-primary btn-lg btn-block">Continue</button>
      </div>
    </Phone>
  );
}

Object.assign(window, { ScreenSplash, ScreenWalkthrough, ScreenSignIn, ScreenOtp, ScreenProfileSetup });
