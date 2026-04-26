// ===== Subscription / paywall =====
// Tiers: PixC Free vs PixC+ at ₹199/mo.
// This file defines:
//   - LockBadge          small "PixC+" pill that overlays gated tiles
//   - UpsellModal        reusable modal triggered when a free user hits a wall
//   - usePixcPlan        plan state hook (localStorage-backed, default "free")
//   - PixcPlanToggle     UI control to flip between free / pro for preview
//   - ScreenPaywall      full comparison + pricing screen
//   - ScreenSubscriptionManage  current plan settings (cancel / renew)
//   - ScreenCombinationSync     multi-device sync (PixC+ only)
//   - ScreenGroupedLightSync    sync a room/group as one (PixC+ only)
//   - Per-wall variant screens so each upsell UX is reviewable as an artboard.
//
// Pricing + tier table is specified in PIXC_TIERS so it can be reused.

const PIXC_PRICE = "₹199";
const PIXC_PRICE_PERIOD = "month";

// Device cap per home is a hardware ceiling — applies to BOTH tiers.
const PIXC_DEVICE_CAP = 25;

const PIXC_TIERS = {
  free: {
    name: "PixC Free",
    price: "₹0",
    devicesPerHome: PIXC_DEVICE_CAP,
    homes: "2",
    members: "3 total",
    automations: "10",
    ai: "30 / week",
    energy: "14 days",
    notifications: "7 days",
    combinationSync: false,
    groupedSync: false,
  },
  pro: {
    name: "PixC+",
    price: PIXC_PRICE,
    devicesPerHome: PIXC_DEVICE_CAP,
    homes: "Unlimited",
    members: "6 max",
    automations: "Unlimited",
    ai: "1,000 / week",
    energy: "12 months",
    notifications: "90 days",
    combinationSync: true,
    groupedSync: true,
  },
};

// ----- Plan state hook ----------------------------------------------------
// Persists to localStorage so the picked plan sticks across reloads. The
// returned setter dispatches a "pixc-plan-change" event so other components
// (e.g. mounted on a different tree) can re-render in response.
function usePixcPlan() {
  const read = () => {
    try { return localStorage.getItem("pixc-plan") || "free"; }
    catch { return "free"; }
  };
  const [plan, setPlanState] = React.useState(read);
  React.useEffect(() => {
    const onChange = () => setPlanState(read());
    window.addEventListener("pixc-plan-change", onChange);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener("pixc-plan-change", onChange);
      window.removeEventListener("storage", onChange);
    };
  }, []);
  const setPlan = React.useCallback((next) => {
    try { localStorage.setItem("pixc-plan", next); } catch {}
    window.dispatchEvent(new Event("pixc-plan-change"));
    setPlanState(next);
  }, []);
  return [plan, setPlan];
}

// ----- LockBadge ----------------------------------------------------------
// Tiny pill marker placed on tiles / rows that require PixC+.
function LockBadge({ size = "sm", style }) {
  const small = size === "sm";
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 4,
      padding: small ? "2px 7px" : "3px 9px",
      borderRadius: 999,
      background: "color-mix(in srgb, var(--primary) 18%, var(--background))",
      color: "var(--primary)",
      border: "1px solid color-mix(in srgb, var(--primary) 35%, transparent)",
      fontSize: small ? 10 : 11,
      fontWeight: 600,
      letterSpacing: ".04em",
      ...style,
    }}>
      <svg width={small ? 9 : 10} height={small ? 9 : 10} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="11" width="16" height="10" rx="2"/>
        <path d="M8 11V7a4 4 0 0 1 8 0v4"/>
      </svg>
      PixC+
    </span>
  );
}

// ----- UpsellModal --------------------------------------------------------
// Reusable upsell sheet. Renders the wall-hit context and a single CTA.
// Designed to be embedded in a screen as an overlay.
//
// Props:
//   feature     "homes" | "members" | "automations" | "ai" | "energy" |
//               "notifications" | "combinationSync" | "groupedSync"
//   currentUsage / limit   Optional, shown when present (e.g. 3 / 2 homes).
//   onClose     Optional close handler (no-op for static wireframes).
function UpsellModal({ feature, currentUsage, limit, onClose }) {
  const config = {
    homes:           { title: "More homes with PixC+", body: "Free includes up to 2 homes. PixC+ unlocks unlimited homes — useful for vacation properties, parents' place, or your studio.", icon: <i className="fa-solid fa-house"/> },
    members:         { title: "Invite more family with PixC+", body: "Free shares with up to 3 people. PixC+ raises the cap to 6 — enough for the whole household.", icon: <i className="fa-solid fa-user-group"/> },
    automations:     { title: "Unlimited automations with PixC+", body: "Free covers 10 automations. PixC+ removes the cap so you can choreograph every routine.", icon: <i className="fa-solid fa-wand-magic-sparkles"/> },
    ai:              { title: "1,000 AI prompts a week", body: "Free includes 30 prompts per 7 days. PixC+ raises this to 1,000 — never wait for the reset.", icon: <i className="fa-solid fa-sparkles"/> },
    energy:          { title: "12 months of energy history", body: "Free shows the last 14 days. PixC+ keeps a full year, with weekly and monthly breakdowns.", icon: <i className="fa-solid fa-bolt"/> },
    notifications:   { title: "90 days of notifications", body: "Free keeps the last 7 days. PixC+ retains 90 — handy when you're piecing together what happened.", icon: <i className="fa-solid fa-bell"/> },
    combinationSync: { title: "PixFusion · PixC+", body: "Fuse multiple devices into one LightSync session — e.g. a strip behind the TV plus bulbs behind the couch all reacting together to the same source.", icon: <i className="fa-solid fa-layer-group"/> },
    groupedSync:     { title: "PixCluster · PixC+", body: "Group a room as one sync target. Pick a primary device — its settings (effect, palette, brightness) are inherited by every device in the cluster.", icon: <i className="fa-solid fa-object-group"/> },
  }[feature] || { title: "Upgrade to PixC+", body: "Unlock the full PixC experience.", icon: <i className="fa-solid fa-crown"/> };

  return (
    <div onClick={onClose} style={{
      position: "absolute", inset: 0, zIndex: 60,
      background: "var(--overlay-scrim)",
      backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)",
      display: "flex", alignItems: "flex-end", justifyContent: "center",
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        width: "100%",
        background: "var(--card)",
        borderTopLeftRadius: 24, borderTopRightRadius: 24,
        padding: "20px 22px calc(28px + env(safe-area-inset-bottom, 0))",
        boxShadow: "0 -10px 40px -10px rgba(0,0,0,.35), 0 0 0 1px var(--border), inset 0 1px 0 color-mix(in srgb, var(--primary) 22%, transparent)",
        position: "relative",
      }}>
        {/* Drag handle */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 14 }}>
          <span style={{ width: 36, height: 4, borderRadius: 999, background: "var(--border-strong)" }}/>
        </div>

        {/* Hero icon + PixC+ badge */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
          <span style={{
            width: 44, height: 44, borderRadius: 14,
            background: "linear-gradient(180deg, color-mix(in srgb, var(--primary) 22%, var(--card)), var(--card))",
            border: "1px solid color-mix(in srgb, var(--primary) 35%, var(--border))",
            color: "var(--primary)",
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            fontSize: 18,
            boxShadow: "0 0 18px -4px color-mix(in srgb, var(--primary) 60%, transparent)",
          }}>{config.icon}</span>
          <LockBadge size="md"/>
        </div>

        <div style={{ fontSize: 19, fontWeight: 700, letterSpacing: "-0.015em", marginBottom: 6 }}>{config.title}</div>
        <div className="muted" style={{ fontSize: 13.5, lineHeight: 1.5, marginBottom: 14 }}>{config.body}</div>

        {/* Usage row when relevant */}
        {currentUsage != null && limit != null && (
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "10px 12px", borderRadius: 10,
            background: "var(--muted)", marginBottom: 14,
          }}>
            <span className="mono small" style={{ color: "var(--muted-foreground)", letterSpacing: ".06em" }}>USAGE</span>
            <span className="mono small" style={{ fontVariantNumeric: "tabular-nums" }}>
              <span style={{ color: "var(--destructive)", fontWeight: 600 }}>{currentUsage}</span>
              <span className="muted"> / {limit}</span>
            </span>
          </div>
        )}

        {/* Price */}
        <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 16 }}>
          <span style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-0.02em" }}>{PIXC_PRICE}</span>
          <span className="muted" style={{ fontSize: 13 }}>/ {PIXC_PRICE_PERIOD}</span>
          <span style={{ marginLeft: "auto" }} className="muted small">Cancel anytime</span>
        </div>

        <button className="btn btn-primary btn-lg btn-block">Start PixC+</button>
        <button className="btn btn-ghost btn-block" style={{ marginTop: 6 }}>Maybe later</button>
        <div className="muted small" style={{ textAlign: "center", marginTop: 10 }}>
          <span style={{ color: "var(--foreground)", fontWeight: 500 }}>Restore purchase</span>
          <span> · </span>
          <span>See full comparison</span>
        </div>
      </div>
    </div>
  );
}

// ----- ScreenPaywall ------------------------------------------------------
// Full pricing comparison page. Reachable from settings, upsell modals,
// and the "see full comparison" footer.
function ScreenPaywall() {
  const rows = [
    { lever: "Devices per home",   free: "25",        pro: "25" },
    { lever: "Homes",              free: "2",         pro: "Unlimited" },
    { lever: "Family members",     free: "3",         pro: "6" },
    { lever: "Automations",        free: "10",        pro: "Unlimited" },
    { lever: "AI prompts / week",  free: "30",        pro: "1,000" },
    { lever: "Energy history",     free: "14 d",      pro: "12 mo" },
    { lever: "Notifications",      free: "7 d",       pro: "90 d" },
    { lever: "PixFusion",   free: "—",         pro: "✓" },
    { lever: "PixCluster",         free: "—",         pro: "✓" },
  ];
  return (
    <Phone>
      <Header right={
        <button className="btn btn-ghost btn-icon-sm" aria-label="Close">
          <svg className="ic-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>
      }/>
      <div style={{ flex: 1, overflow: "auto", padding: "0 22px 24px" }}>
        {/* Hero */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
          <span style={{
            width: 56, height: 56, borderRadius: 16,
            background: "linear-gradient(180deg, color-mix(in srgb, var(--primary) 22%, var(--card)), var(--card))",
            border: "1px solid color-mix(in srgb, var(--primary) 35%, var(--border))",
            color: "var(--primary)",
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 0 24px -4px color-mix(in srgb, var(--primary) 70%, transparent)",
          }}>
            <i className="fa-solid fa-crown" style={{ fontSize: 22 }}/>
          </span>
          <div>
            <div className="mono small" style={{ color: "var(--primary)", letterSpacing: ".1em", textTransform: "uppercase" }}>Upgrade</div>
            <div className="h2" style={{ marginTop: 2 }}>PixC+</div>
          </div>
        </div>

        <div className="muted" style={{ fontSize: 14, marginBottom: 18 }}>
          Full lighting control, more homes and family members, longer history, and exclusive sync modes.
        </div>

        {/* Price card */}
        <div className="card iot-card" style={{ padding: "16px 16px 14px", marginBottom: 18 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
            <span style={{ fontSize: 34, fontWeight: 700, letterSpacing: "-0.02em" }}>{PIXC_PRICE}</span>
            <span className="muted">/ {PIXC_PRICE_PERIOD}</span>
            <span style={{ marginLeft: "auto" }}>
              <span className="badge badge-success" style={{ height: 22 }}>7-day free trial</span>
            </span>
          </div>
          <div className="muted small" style={{ marginTop: 4 }}>Cancel anytime. Renews at {PIXC_PRICE} / {PIXC_PRICE_PERIOD} after the trial.</div>
        </div>

        {/* Comparison */}
        <div className="muted small" style={{ textTransform: "uppercase", letterSpacing: ".06em", fontWeight: 500, marginBottom: 8 }}>What you get</div>
        <div className="card" style={{ padding: 0, overflow: "hidden", marginBottom: 18 }}>
          <div style={{
            display: "grid", gridTemplateColumns: "1.7fr 0.9fr 0.9fr",
            background: "var(--muted)",
            padding: "10px 14px",
            fontSize: 10.5, fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--muted-foreground)",
          }}>
            <span>Feature</span>
            <span style={{ textAlign: "right" }}>Free</span>
            <span style={{ textAlign: "right", color: "var(--primary)" }}>PixC+</span>
          </div>
          {rows.map((r, i) => (
            <div key={i} style={{
              display: "grid", gridTemplateColumns: "1.7fr 0.9fr 0.9fr",
              alignItems: "center",
              padding: "10px 14px",
              fontSize: 13,
              borderTop: i === 0 ? "0" : "1px solid var(--border)",
            }}>
              <span style={{ fontWeight: 500 }}>{r.lever}</span>
              <span className="muted mono" style={{ textAlign: "right", fontVariantNumeric: "tabular-nums", fontSize: 12.5, whiteSpace: "nowrap" }}>{r.free}</span>
              <span className="mono" style={{ textAlign: "right", color: "var(--primary)", fontWeight: 600, fontVariantNumeric: "tabular-nums", fontSize: 12.5, whiteSpace: "nowrap" }}>{r.pro}</span>
            </div>
          ))}
        </div>

        <button className="btn btn-primary btn-lg btn-block">Start 7-day free trial</button>
        <button className="btn btn-ghost btn-lg btn-block" style={{ marginTop: 4 }}>Restore purchase</button>

        <div className="muted small" style={{ textAlign: "center", marginTop: 14, lineHeight: 1.5 }}>
          Billed monthly via your store account. Cancel any time from Settings.
        </div>
      </div>
    </Phone>
  );
}

// ----- ScreenSubscriptionManage ------------------------------------------
function ScreenSubscriptionManage({ plan = "pro" }) {
  const isPro = plan === "pro";
  return (
    <Phone>
      <Header title="Subscription"/>
      <div style={{ flex: 1, overflow: "auto", padding: "0 22px 24px" }}>
        <div className="card iot-card" style={{ padding: 18, marginBottom: 18 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{
              width: 44, height: 44, borderRadius: 14,
              background: isPro ? "linear-gradient(180deg, color-mix(in srgb, var(--primary) 22%, var(--card)), var(--card))" : "var(--muted)",
              border: `1px solid ${isPro ? "color-mix(in srgb, var(--primary) 35%, var(--border))" : "var(--border)"}`,
              color: isPro ? "var(--primary)" : "var(--muted-foreground)",
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              fontSize: 18,
            }}>
              <i className={isPro ? "fa-solid fa-crown" : "fa-solid fa-circle-user"}/>
            </span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, color: "var(--muted-foreground)", textTransform: "uppercase", letterSpacing: ".08em" }}>Current plan</div>
              <div style={{ fontSize: 18, fontWeight: 600, marginTop: 2 }}>{isPro ? "PixC+" : "PixC Free"}</div>
            </div>
            {isPro && <span className="badge badge-success">Active</span>}
          </div>
          {isPro && (
            <div style={{ marginTop: 14, paddingTop: 14, borderTop: "1px solid var(--border)", display: "flex", gap: 16 }}>
              <div>
                <div className="muted small">Renews</div>
                <div style={{ fontWeight: 600, marginTop: 2 }}>Apr 26, 2026</div>
              </div>
              <div>
                <div className="muted small">Price</div>
                <div style={{ fontWeight: 600, marginTop: 2 }}>{PIXC_PRICE} / mo</div>
              </div>
              <div style={{ marginLeft: "auto" }}>
                <div className="muted small">Member since</div>
                <div style={{ fontWeight: 600, marginTop: 2 }}>Jan 2026</div>
              </div>
            </div>
          )}
        </div>

        {!isPro && (
          <button className="btn btn-primary btn-lg btn-block" style={{ marginBottom: 18 }}>
            <i className="fa-solid fa-crown" style={{ fontSize: 14 }}/>
            Upgrade to PixC+
          </button>
        )}

        <div className="muted small" style={{ textTransform: "uppercase", letterSpacing: ".06em", fontWeight: 500, marginBottom: 8 }}>Manage</div>
        <div className="card" style={{ marginBottom: 18 }}>
          <div className="row">
            <div className="icon-wrap"><i className="fa-solid fa-receipt"/></div>
            <div className="label-wrap"><div className="t">Billing history</div><div className="s">Invoices and receipts</div></div>
            <svg className="ic-sm chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
          </div>
          <div className="row">
            <div className="icon-wrap"><i className="fa-solid fa-arrow-rotate-left"/></div>
            <div className="label-wrap"><div className="t">Restore purchase</div><div className="s">Re-link an existing subscription</div></div>
            <svg className="ic-sm chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
          </div>
          {isPro && (
            <div className="row">
              <div className="icon-wrap" style={{ background: "rgba(220,38,38,.10)", color: "var(--destructive)" }}><i className="fa-solid fa-circle-stop"/></div>
              <div className="label-wrap"><div className="t" style={{ color: "var(--destructive)" }}>Cancel subscription</div><div className="s">Keep access until renewal</div></div>
              <svg className="ic-sm chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
            </div>
          )}
        </div>

        {isPro ? (
          <>
            <div className="muted small" style={{ textTransform: "uppercase", letterSpacing: ".06em", fontWeight: 500, marginBottom: 8 }}>What's included</div>
            <div className="card" style={{ padding: 14 }}>
              {[
                "Unlimited homes and devices",
                "Up to 6 family members",
                "Unlimited automations",
                "1,000 AI prompts / week",
                "12 months of energy history",
                "90 days of notifications",
                "PixFusion + PixCluster",
              ].map((t, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 0" }}>
                  <span style={{ width: 18, height: 18, borderRadius: 999, background: "color-mix(in srgb, var(--primary) 18%, transparent)", color: "var(--primary)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                    <i className="fa-solid fa-check" style={{ fontSize: 9 }}/>
                  </span>
                  <span style={{ fontSize: 13.5 }}>{t}</span>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="muted small" style={{ textTransform: "uppercase", letterSpacing: ".06em", fontWeight: 500, marginBottom: 8 }}>Your Free plan</div>
            <div className="card" style={{ padding: 14, marginBottom: 18 }}>
              {[
                { t: "2 homes",                ok: true  },
                { t: "3 family members",       ok: true  },
                { t: "10 automations",         ok: true  },
                { t: "30 AI prompts / week",   ok: true  },
                { t: "14 days energy history", ok: true  },
                { t: "7 days notifications",   ok: true  },
                { t: "Unlimited devices, all colors, all effects", ok: true },
              ].map((row, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 0" }}>
                  <span style={{ width: 18, height: 18, borderRadius: 999, background: "var(--muted)", color: "var(--success)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                    <i className="fa-solid fa-check" style={{ fontSize: 9 }}/>
                  </span>
                  <span style={{ fontSize: 13.5 }}>{row.t}</span>
                </div>
              ))}
            </div>

            <div className="muted small" style={{ textTransform: "uppercase", letterSpacing: ".06em", fontWeight: 500, marginBottom: 8 }}>Unlock with PixC+</div>
            <div className="card" style={{ padding: 14 }}>
              {[
                "Unlimited homes",
                "Up to 6 family members",
                "Unlimited automations",
                "1,000 AI prompts / week",
                "12 months energy history",
                "90 days notifications",
                "PixFusion + PixCluster",
              ].map((t, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 0" }}>
                  <span style={{ width: 18, height: 18, borderRadius: 999, background: "color-mix(in srgb, var(--primary) 14%, transparent)", color: "var(--primary)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                    <i className="fa-solid fa-lock" style={{ fontSize: 9 }}/>
                  </span>
                  <span style={{ fontSize: 13.5 }}>{t}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </Phone>
  );
}

// ----- ScreenCancelConfirm ------------------------------------------------
function ScreenCancelConfirm() {
  return (
    <Phone>
      <Header title="Cancel PixC+"/>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "0 22px 24px" }}>
        <div style={{
          width: 64, height: 64, borderRadius: 16,
          background: "rgba(220,38,38,.10)", color: "var(--destructive)",
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          marginBottom: 16,
        }}>
          <i className="fa-solid fa-triangle-exclamation" style={{ fontSize: 24 }}/>
        </div>

        <div className="h2" style={{ marginBottom: 6 }}>You'll lose these on Apr 26</div>
        <div className="muted" style={{ fontSize: 14, marginBottom: 18 }}>
          Your subscription will stay active until the end of the billing period, then PixC+ features turn off automatically.
        </div>

        <div className="card" style={{ padding: 14, marginBottom: 18 }}>
          {[
            "Homes 3–5 will become read-only",
            "Members 4–6 will be removed",
            "Automations 11+ will pause",
            "Energy history older than 14 days will be hidden",
            "PixFusion and PixCluster will turn off",
          ].map((t, i, arr) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderTop: i === 0 ? "0" : "1px solid var(--border)" }}>
              <span style={{ width: 6, height: 6, borderRadius: 999, background: "var(--destructive)", flexShrink: 0 }}/>
              <span style={{ fontSize: 13 }}>{t}</span>
            </div>
          ))}
        </div>

        <div style={{ flex: 1 }}/>
        <button className="btn btn-block btn-lg" style={{ background: "var(--destructive)", color: "#fff" }}>Cancel subscription</button>
        <button className="btn btn-ghost btn-lg btn-block" style={{ marginTop: 4 }}>Keep PixC+</button>
      </div>
    </Phone>
  );
}

// ----- PixFusion setup --------------------------------------------
// Multi-device sync session — pick devices that should react to one source.
function ScreenCombinationSync() {
  const devices = [
    { name: "PixC Lyt",       room: "Living room", color: "#a855f7", kind: "bulb",  on: true,  selected: true  },
    { name: "Strip 01",       room: "Living room", color: "#22c55e", kind: "strip", on: true,  selected: true  },
    { name: "Bulb 02",        room: "Kitchen",     color: "#f59e0b", kind: "bulb",  on: false, selected: false },
    { name: "Lamp",           room: "Hallway",     color: "#3b82f6", kind: "lamp",  on: true,  selected: true  },
    { name: "Panel A",        room: "Bedroom",     color: "#06b6d4", kind: "panel", on: true,  selected: false },
  ];
  return (
    <Phone>
      <Header title="PixFusion" right={<LockBadge/>}/>
      <div style={{ flex: 1, overflow: "auto", padding: "0 20px 24px" }}>
        <div className="muted" style={{ fontSize: 13, marginBottom: 14 }}>
          Sync any combination of devices to a single source. Pick the lights that should react together.
        </div>

        <div className="muted small" style={{ textTransform: "uppercase", letterSpacing: ".06em", fontWeight: 500, marginBottom: 8 }}>Source</div>
        <div className="card" style={{ marginBottom: 14 }}>
          <div className="row">
            <div className="icon-wrap" style={{ background: "var(--primary-soft)", color: "var(--primary)" }}>
              <i className="fa-solid fa-display"/>
            </div>
            <div className="label-wrap"><div className="t">PixSync · Computer</div><div className="s">Mirroring this Mac · 60 fps</div></div>
            <svg className="ic-sm chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
          </div>
        </div>

        <div className="muted small" style={{ textTransform: "uppercase", letterSpacing: ".06em", fontWeight: 500, marginBottom: 8 }}>Devices ({devices.filter(d => d.selected).length} of {devices.length})</div>
        <div className="card" style={{ marginBottom: 14 }}>
          {devices.map((d, i) => (
            <div className="row" key={i}>
              <div className="icon-wrap" style={{ background: d.color + "22", color: d.color }}>
                <i className={
                  d.kind === "bulb"  ? "fa-solid fa-lightbulb" :
                  d.kind === "strip" ? "fa-solid fa-grip-lines" :
                  d.kind === "lamp"  ? "fa-solid fa-lamp" :
                                       "fa-solid fa-square"
                }/>
              </div>
              <div className="label-wrap">
                <div className="t">{d.name}</div>
                <div className="s">{d.room} · {d.on ? "Online" : "Offline"}</div>
              </div>
              <label className="switch"><input type="checkbox" defaultChecked={d.selected}/><span className="track"><span className="thumb"/></span></label>
            </div>
          ))}
        </div>

        <div className="card" style={{ padding: 14, marginBottom: 18, display: "flex", gap: 12, alignItems: "flex-start" }}>
          <span style={{ width: 32, height: 32, borderRadius: 10, background: "var(--primary-soft)", color: "var(--primary)", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <i className="fa-solid fa-circle-info"/>
          </span>
          <div className="small">All selected devices share the same color stream. Use Grouped Sync to map them spatially.</div>
        </div>

        <button className="btn btn-primary btn-lg btn-block">Start PixFusion</button>
      </div>
    </Phone>
  );
}

// ----- PixCluster setup ---------------------------------------
// Group a room into one sync target. The user picks (1) a room/scene and
// (2) a primary device. The primary's effect / palette / brightness is
// the source of truth — every device in the cluster inherits it.
function ScreenGroupedLightSync() {
  const groups = [
    { name: "Living room",  count: 4, sample: ["#a855f7","#22c55e","#06b6d4","#facc15"], selected: true },
    { name: "Bedroom",      count: 3, sample: ["#3b82f6","#22c55e","#a855f7"],          selected: false },
    { name: "Hallway",      count: 2, sample: ["#3b82f6","#facc15"],                    selected: false },
    { name: "Movie night",  count: 6, sample: ["#7c3aed","#1e1b4b","#3b82f6","#06b6d4","#a855f7","#1e1b4b"], scene: true, selected: false },
  ];
  // Devices belonging to the selected group — first one is the primary.
  const devices = [
    { name: "PixC Lyt",  room: "Living room", color: "#a855f7", kind: "bulb",  primary: true  },
    { name: "Strip 01",  room: "Living room", color: "#22c55e", kind: "strip", primary: false },
    { name: "Lamp",      room: "Living room", color: "#06b6d4", kind: "lamp",  primary: false },
    { name: "Bulb 02",   room: "Living room", color: "#facc15", kind: "bulb",  primary: false },
  ];
  return (
    <Phone>
      <Header title="PixCluster" right={<LockBadge/>}/>
      <div style={{ flex: 1, overflow: "auto", padding: "0 20px 100px" }}>
        <div className="muted" style={{ fontSize: 13, marginBottom: 14 }}>
          Group a room into one sync target. Pick a primary device — its settings (effect, palette, brightness) are inherited by every device in the cluster.
        </div>

        <div className="muted small" style={{ textTransform: "uppercase", letterSpacing: ".06em", fontWeight: 500, marginBottom: 8 }}>1 · Pick a room or scene</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 18 }}>
          {groups.map((g, i) => (
            <button key={i} className="card" style={{
              padding: 14, display: "flex", alignItems: "center", gap: 12,
              textAlign: "left", cursor: "pointer", font: "inherit",
              background: g.selected ? "var(--primary-soft)" : "var(--card)",
              border: g.selected ? "1.5px solid var(--primary)" : "1px solid var(--border)",
              color: "var(--foreground)",
            }}>
              <div style={{
                width: 44, height: 44, borderRadius: 12, flex: "0 0 auto",
                background: g.selected ? "var(--primary)" : "var(--muted)",
                color: g.selected ? "var(--primary-foreground)" : "var(--foreground)",
                display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 16,
              }}>
                <i className={g.scene ? "fa-solid fa-clapperboard" : "fa-solid fa-house-chimney"}/>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{g.name}</div>
                <div className="muted small">{g.count} {g.scene ? "devices in scene" : "devices"}</div>
              </div>
              <div style={{ display: "flex", gap: 3 }}>
                {g.sample.slice(0, 4).map((c, j) => (
                  <span key={j} style={{ width: 14, height: 14, borderRadius: 4, background: c, boxShadow: `0 0 6px ${c}66` }}/>
                ))}
              </div>
            </button>
          ))}
        </div>

        {/* Step 2 — pick the primary (source of truth) */}
        <div className="muted small" style={{ textTransform: "uppercase", letterSpacing: ".06em", fontWeight: 500, marginBottom: 8 }}>2 · Primary device</div>
        <div className="muted small" style={{ marginBottom: 10 }}>
          The cluster inherits the primary's effect, palette, and brightness. Tap any device to make it the new primary.
        </div>
        <div className="card" style={{ marginBottom: 18 }}>
          {devices.map((d, i) => (
            <button key={i} className="row" style={{
              width: "100%", border: 0, background: "transparent", textAlign: "left", cursor: "pointer", font: "inherit",
            }}>
              <div className="icon-wrap" style={{ background: d.color + "22", color: d.color }}>
                <i className={
                  d.kind === "bulb"  ? "fa-solid fa-lightbulb" :
                  d.kind === "strip" ? "fa-solid fa-grip-lines" :
                  d.kind === "lamp"  ? "fa-solid fa-lamp" :
                                       "fa-solid fa-square"
                }/>
              </div>
              <div className="label-wrap">
                <div className="t" style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  {d.name}
                  {d.primary && (
                    <span style={{
                      display: "inline-flex", alignItems: "center", gap: 3,
                      padding: "1px 6px", borderRadius: 999,
                      background: "var(--primary-soft)",
                      color: "var(--primary)",
                      border: "1px solid color-mix(in srgb, var(--primary) 35%, transparent)",
                      fontSize: 9.5, fontWeight: 700, letterSpacing: ".06em",
                    }}>
                      <i className="fa-solid fa-star" style={{ fontSize: 7 }}/> PRIMARY
                    </span>
                  )}
                </div>
                <div className="s">{d.primary ? "Source of truth" : "Inherits primary"}</div>
              </div>
              <span aria-hidden style={{
                width: 20, height: 20, borderRadius: 999,
                border: d.primary ? "6px solid var(--primary)" : "1.5px solid var(--border-strong)",
                background: "var(--background)", boxSizing: "border-box",
              }}/>
            </button>
          ))}
        </div>

        {/* Step 3 — sync mode */}
        <div className="muted small" style={{ textTransform: "uppercase", letterSpacing: ".06em", fontWeight: 500, marginBottom: 8 }}>3 · Sync mode</div>
        <div className="card" style={{ marginBottom: 18 }}>
          <div className="row">
            <div className="icon-wrap" style={{ background: "var(--primary-soft)", color: "var(--primary)" }}>
              <i className="fa-solid fa-blender-phone" style={{ fontSize: 14 }}/>
            </div>
            <div className="label-wrap"><div className="t">Average · blend</div><div className="s">Cluster shows the average color across the screen.</div></div>
            <span aria-hidden style={{
              width: 20, height: 20, borderRadius: 999,
              border: "6px solid var(--primary)",
              background: "var(--background)", boxSizing: "border-box",
            }}/>
          </div>
          <div className="row">
            <div className="icon-wrap"><i className="fa-solid fa-shuffle" style={{ fontSize: 14 }}/></div>
            <div className="label-wrap"><div className="t">Spread · per-device sample</div><div className="s">Each device samples a different region.</div></div>
            <span aria-hidden style={{
              width: 20, height: 20, borderRadius: 999,
              border: "1.5px solid var(--border-strong)",
              background: "var(--background)", boxSizing: "border-box",
            }}/>
          </div>
        </div>

        <button className="btn btn-primary btn-lg btn-block">Save PixCluster</button>
      </div>
    </Phone>
  );
}

// ----- Wall-hit variant screens -----------------------------------------
// Each variant renders a backdrop of the screen the user was on plus the
// UpsellModal sheet — making each wall-hit reviewable as its own artboard.
function UpsellBackdrop({ title, summary }) {
  return (
    <>
      <Header title={title}/>
      <div style={{ flex: 1, padding: "0 22px", display: "flex", flexDirection: "column", justifyContent: "flex-start", gap: 12, opacity: .6 }}>
        <div className="card" style={{ padding: 14 }}>
          <div className="muted small" style={{ textTransform: "uppercase", letterSpacing: ".06em" }}>Status</div>
          <div style={{ fontWeight: 600, marginTop: 4 }}>{summary}</div>
        </div>
        <div className="card" style={{ height: 80, background: "var(--muted)" }}/>
        <div className="card" style={{ height: 60, background: "var(--muted)" }}/>
      </div>
    </>
  );
}

function ScreenUpsellHomes() {
  return (
    <Phone>
      <UpsellBackdrop title="Homes" summary="Adding 3rd home — Beach house"/>
      <UpsellModal feature="homes" currentUsage={3} limit={2}/>
    </Phone>
  );
}
function ScreenUpsellMembers() {
  return (
    <Phone>
      <UpsellBackdrop title="Family & guests" summary="Inviting 4th member"/>
      <UpsellModal feature="members" currentUsage={4} limit={3}/>
    </Phone>
  );
}
function ScreenUpsellAutomations() {
  return (
    <Phone>
      <UpsellBackdrop title="Automations" summary="Saving 11th automation"/>
      <UpsellModal feature="automations" currentUsage={11} limit={10}/>
    </Phone>
  );
}
function ScreenUpsellAILimit() {
  return (
    <Phone>
      <UpsellBackdrop title="PixC AI" summary="Weekly limit reached"/>
      <UpsellModal feature="ai" currentUsage={30} limit={30}/>
    </Phone>
  );
}
function ScreenUpsellEnergy() {
  return (
    <Phone>
      <UpsellBackdrop title="Energy" summary="Looking back past 14 days"/>
      <UpsellModal feature="energy"/>
    </Phone>
  );
}
function ScreenUpsellNotifications() {
  return (
    <Phone>
      <UpsellBackdrop title="Notifications" summary="Looking back past 7 days"/>
      <UpsellModal feature="notifications"/>
    </Phone>
  );
}
function ScreenUpsellCombinationSync() {
  return (
    <Phone>
      <UpsellBackdrop title="LightSync" summary="Tap on PixFusion"/>
      <UpsellModal feature="combinationSync"/>
    </Phone>
  );
}
function ScreenUpsellGroupedSync() {
  return (
    <Phone>
      <UpsellBackdrop title="LightSync" summary="Tap on PixCluster"/>
      <UpsellModal feature="groupedSync"/>
    </Phone>
  );
}

// Device-cap reached — 25 / 25 in this home. Hardware ceiling, but the
// upsell points at PixC+ unlimited homes (each with 25 devices) as the path.
function ScreenUpsellDeviceCap() {
  return (
    <Phone>
      <Header title="Add device" right={
        <button className="btn btn-ghost btn-icon-sm" aria-label="Close">
          <svg className="ic-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>
      }/>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "0 22px 24px" }}>
        <div style={{
          width: 64, height: 64, borderRadius: 16,
          background: "rgba(220,38,38,.10)", color: "var(--destructive)",
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          marginBottom: 16,
        }}>
          <i className="fa-solid fa-house-circle-exclamation" style={{ fontSize: 24 }}/>
        </div>

        <div className="h2" style={{ marginBottom: 6 }}>Home is full · 25 of 25</div>
        <div className="muted" style={{ fontSize: 14, marginBottom: 18 }}>
          A single home supports 25 devices — a hardware ceiling that keeps the mesh stable. Move a device to another home, remove one, or add another home with PixC+.
        </div>

        <div className="card" style={{ padding: 14, marginBottom: 18 }}>
          <div className="muted small" style={{ textTransform: "uppercase", letterSpacing: ".06em" }}>This home</div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginTop: 6 }}>
            <span className="mono" style={{ fontSize: 26, fontWeight: 700, letterSpacing: "-0.01em", fontVariantNumeric: "tabular-nums" }}>25</span>
            <span className="muted">/ 25 devices</span>
          </div>
          <div style={{ marginTop: 10, height: 4, borderRadius: 999, background: "var(--muted)", overflow: "hidden" }}>
            <span style={{ display: "block", width: "100%", height: "100%", background: "var(--destructive)", borderRadius: 999 }}/>
          </div>
        </div>

        <div style={{ flex: 1 }}/>

        <div className="card iot-card" style={{ padding: 14, marginBottom: 12, display: "flex", gap: 12, alignItems: "center" }}>
          <span style={{
            width: 36, height: 36, borderRadius: 10,
            background: "linear-gradient(180deg, color-mix(in srgb, var(--primary) 22%, var(--card)), var(--card))",
            border: "1px solid color-mix(in srgb, var(--primary) 35%, var(--border))",
            color: "var(--primary)",
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0,
          }}>
            <i className="fa-solid fa-plus" style={{ fontSize: 13 }}/>
          </span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 600 }}>Add another home with PixC+</div>
            <div className="muted" style={{ fontSize: 11.5, marginTop: 2, lineHeight: 1.4 }}>
              Free is capped at 2 homes. PixC+ unlocks unlimited homes — 25 devices each.
            </div>
          </div>
          <LockBadge size="sm"/>
        </div>

        <button className="btn btn-primary btn-lg btn-block">Upgrade to PixC+</button>
        <button className="btn btn-outline btn-lg btn-block" style={{ marginTop: 6 }}>Move a device to another home</button>
      </div>
    </Phone>
  );
}

// Reusable subscription settings row — drop into Settings list.
function SubscriptionSettingsRow({ plan = "free" }) {
  const isPro = plan === "pro";
  return (
    <div className="row">
      <div className="icon-wrap" style={{
        background: isPro ? "var(--primary-soft)" : "var(--muted)",
        color: isPro ? "var(--primary)" : "var(--muted-foreground)",
      }}>
        <i className={isPro ? "fa-solid fa-crown" : "fa-solid fa-circle-user"}/>
      </div>
      <div className="label-wrap">
        <div className="t" style={{ display: "flex", alignItems: "center", gap: 6 }}>
          Subscription
          {!isPro && <LockBadge size="sm"/>}
        </div>
        <div className="s">{isPro ? "PixC+ · renews Apr 26" : "PixC Free · upgrade for unlimited homes"}</div>
      </div>
      <svg className="ic-sm chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
    </div>
  );
}

Object.assign(window, {
  PIXC_TIERS, PIXC_PRICE, PIXC_PRICE_PERIOD, PIXC_DEVICE_CAP,
  usePixcPlan, LockBadge, UpsellModal, SubscriptionSettingsRow,
  ScreenPaywall, ScreenSubscriptionManage, ScreenCancelConfirm,
  ScreenCombinationSync, ScreenGroupedLightSync,
  ScreenUpsellHomes, ScreenUpsellMembers, ScreenUpsellAutomations, ScreenUpsellAILimit,
  ScreenUpsellEnergy, ScreenUpsellNotifications,
  ScreenUpsellCombinationSync, ScreenUpsellGroupedSync,
  ScreenUpsellDeviceCap,
});
