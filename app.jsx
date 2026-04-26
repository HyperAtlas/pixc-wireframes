// ===== App: design canvas with all screens + global Tweaks panel =====

const { DesignCanvas, DCSection, DCArtboard, TweaksPanel, useTweaks, TweakSection, TweakRadio, TweakColor, TweakToggle } = window;

const TWOTO_TWEAKS = /*EDITMODE-BEGIN*/{
  "theme": "light",
  "accent": "#2563eb"
}/*EDITMODE-END*/;

const ACCENT_PRESETS = [
  { value: "#2563eb", label: "Cobalt" },
  { value: "#3b82f6", label: "Electric" },
  { value: "#0ea5e9", label: "Azure" },
  { value: "#4f46e5", label: "Indigo" },
  { value: "#1d4ed8", label: "Royal" },
  { value: "#06b6d4", label: "Cyan" },
];

function FloatingThemeToggle({ theme, accent, onTheme, onAccent }) {
  const isDark = theme === "dark";
  return (
    <div style={{
      position: "fixed", top: 16, left: 16, zIndex: 200,
      display: "inline-flex", alignItems: "center", gap: 6,
      padding: 6,
      background: "rgba(255,255,255,.85)",
      backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
      border: "1px solid rgba(0,0,0,.08)",
      borderRadius: 999,
      boxShadow: "0 4px 14px -6px rgba(0,0,0,.18)",
      fontFamily: "Geist, system-ui, sans-serif",
    }}>
      <button
        type="button"
        onClick={() => onTheme(isDark ? "light" : "dark")}
        title={isDark ? "Switch to light" : "Switch to dark"}
        style={{
          width: 32, height: 32, borderRadius: 999,
          border: 0, background: "transparent", cursor: "pointer",
          color: "#0a0a0a",
          display: "inline-flex", alignItems: "center", justifyContent: "center",
        }}>
        {isDark ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z"/></svg>
        )}
      </button>
      <span style={{ width: 1, height: 20, background: "rgba(0,0,0,.08)" }}/>
      {ACCENT_PRESETS.map(c => {
        const active = c.value.toLowerCase() === (accent || "").toLowerCase();
        return (
          <button
            key={c.value}
            type="button"
            onClick={() => onAccent(c.value)}
            title={c.label}
            style={{
              width: 22, height: 22, borderRadius: 999,
              background: c.value, cursor: "pointer", border: 0, padding: 0,
              boxShadow: active
                ? `0 0 0 2px #fff, 0 0 0 4px ${c.value}`
                : "0 0 0 1px rgba(0,0,0,.12)",
            }}/>
        );
      })}
      <span style={{ width: 1, height: 20, background: "rgba(0,0,0,.08)" }}/>
      <PlanToggle/>
    </div>
  );
}

// Free / PixC+ preview toggle — flips a localStorage key + dispatches an
// event so plan-aware screens (AI counter, lock badges, etc.) re-render.
function PlanToggle() {
  const [plan, setPlan] = (window.usePixcPlan ? window.usePixcPlan() : ["free", () => {}]);
  const isPro = plan === "pro";
  return (
    <button
      type="button"
      onClick={() => setPlan(isPro ? "free" : "pro")}
      title={isPro ? "Switch to Free preview" : "Switch to PixC+ preview"}
      style={{
        height: 26, padding: "0 10px", borderRadius: 999,
        background: isPro ? "#2563eb" : "transparent",
        color: isPro ? "#ffffff" : "#0a0a0a",
        border: isPro ? "1px solid #2563eb" : "1px solid rgba(0,0,0,.15)",
        cursor: "pointer",
        fontFamily: "inherit", fontSize: 11, fontWeight: 600, letterSpacing: ".04em",
        display: "inline-flex", alignItems: "center", gap: 5,
      }}>
      {isPro && (
        <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M5 16l-2-9 6 4 5-7 5 7 6-4-2 9z"/></svg>
      )}
      {isPro ? "PixC+" : "Free"}
    </button>
  );
}

function App() {
  const [tweaks, setTweak] = useTweaks(TWOTO_TWEAKS);

  // Apply tokens at the document level
  React.useEffect(() => {
    document.documentElement.setAttribute("data-theme", tweaks.theme);
    document.documentElement.style.setProperty("--primary", tweaks.accent);
    document.documentElement.style.setProperty("--ring", tweaks.accent);
  }, [tweaks.theme, tweaks.accent]);

  return (
    <>
      <FloatingThemeToggle
        theme={tweaks.theme}
        accent={tweaks.accent}
        onTheme={v => setTweak("theme", v)}
        onAccent={v => setTweak("accent", v)}
      />
      <DesignCanvas title="PixC" subtitle="Smart-bulb app — Sunset accent, biometric lock, music-reactive effects">

        <DCSection id="launch" title="01 · App launch">
          <DCArtboard id="app-launch" label="Cold-start splash (first time)" width={375} height={812}><ScreenAppLaunch/></DCArtboard>
          <DCArtboard id="app-launch-returning" label="Returning · devices reconnecting" width={375} height={812}><ScreenAppLaunchReturning/></DCArtboard>
        </DCSection>

        <DCSection id="onboarding" title="02 · Onboarding & Auth">
          <DCArtboard id="splash" label="Welcome" width={375} height={812}><ScreenSplash/></DCArtboard>
          <DCArtboard id="walkthrough" label="Walkthrough" width={375} height={812}><ScreenWalkthrough/></DCArtboard>
          <DCArtboard id="signin" label="Sign in" width={375} height={812}><ScreenSignIn/></DCArtboard>
          <DCArtboard id="otp" label="Verify code" width={375} height={812}><ScreenOtp/></DCArtboard>
          <DCArtboard id="profile-setup" label="Profile setup" width={375} height={812}><ScreenProfileSetup/></DCArtboard>
          <DCArtboard id="post-auth" label="Welcome (post-auth)" width={375} height={812}><ScreenWelcomePostAuth/></DCArtboard>
          <DCArtboard id="join-home" label="Join home with invite code" width={375} height={812}><ScreenJoinHome/></DCArtboard>
          <DCArtboard id="create-home" label="Create new home" width={375} height={812}><ScreenCreateHome/></DCArtboard>
          <DCArtboard id="perm-bluetooth" label="Permission · Bluetooth" width={375} height={812}><ScreenPermissionPrompt kind="bluetooth"/></DCArtboard>
          <DCArtboard id="perm-wifi" label="Permission · Local network" width={375} height={812}><ScreenPermissionPrompt kind="wifi"/></DCArtboard>
          <DCArtboard id="perm-location" label="Permission · Location" width={375} height={812}><ScreenPermissionPrompt kind="location"/></DCArtboard>
        </DCSection>

        <DCSection id="lock" title="03 · App lock (configurable in Settings)">
          <DCArtboard id="lock-bio" label="App lock · biometric" width={375} height={812}><ScreenAppLock mode="biometric"/></DCArtboard>
          <DCArtboard id="lock-pin" label="App lock · passcode" width={375} height={812}><ScreenAppLock mode="passcode"/></DCArtboard>
          <DCArtboard id="lock-pin-wrong" label="App lock · wrong PIN" width={375} height={812}><ScreenAppLock mode="passcode" wrong/></DCArtboard>
          <DCArtboard id="applock-setup-intro" label="App-lock setup · intro" width={375} height={812}><ScreenAppLockSetupIntro/></DCArtboard>
          <DCArtboard id="applock-set-passcode" label="App-lock setup · create passcode" width={375} height={812}><ScreenAppLockSetPasscode/></DCArtboard>
          <DCArtboard id="applock-confirm-passcode" label="App-lock setup · confirm passcode" width={375} height={812}><ScreenAppLockSetPasscode confirm/></DCArtboard>
          <DCArtboard id="applock-setup-success" label="App-lock setup · success" width={375} height={812}><ScreenAppLockSetupSuccess/></DCArtboard>
          <DCArtboard id="reset-applock-request" label="Reset App-lock · request code" width={375} height={812}><ScreenResetAppLockPasscode/></DCArtboard>
          <DCArtboard id="reset-applock-verify" label="Reset App-lock · verify code" width={375} height={812}><ScreenResetAppLockVerify/></DCArtboard>
          <DCArtboard id="reset-applock-verify-error" label="Reset App-lock · code invalid" width={375} height={812}><ScreenResetAppLockVerify error/></DCArtboard>
          <DCArtboard id="reset-applock-new-passcode" label="Reset App-lock · new passcode" width={375} height={812}><ScreenAppLockSetPasscode/></DCArtboard>
          <DCArtboard id="reset-applock-confirm-passcode" label="Reset App-lock · confirm passcode" width={375} height={812}><ScreenAppLockSetPasscode confirm/></DCArtboard>
          <DCArtboard id="reset-applock-success" label="Reset App-lock · success" width={375} height={812}><ScreenAppLockResetSuccess/></DCArtboard>
        </DCSection>

        <DCSection id="home" title="04 · Home, Rooms & Account">
          {/* Home tab */}
          <DCArtboard id="home-welcome" label="Daily welcome (warm)" width={375} height={812}><ScreenHomeWelcome/></DCArtboard>
          <DCArtboard id="home-empty" label="Home · empty (no devices)" width={375} height={812}><ScreenHomeEmpty/></DCArtboard>
          <DCArtboard id="home" label="Home · populated" width={375} height={812}><ScreenHome/></DCArtboard>
          <DCArtboard id="home-cluster" label="Home · active PixCluster (Pro)" width={375} height={812}><ScreenHome activeCluster/></DCArtboard>
          <DCArtboard id="home-fusion" label="Home · active PixFusion (Pro)" width={375} height={812}><ScreenHome activeFusion/></DCArtboard>
          <DCArtboard id="home-offline" label="Home · offline (local mode)" width={375} height={812}><ScreenHome homeOffline/></DCArtboard>
          <DCArtboard id="search" label="Search" width={375} height={812}><ScreenSearch/></DCArtboard>

          {/* Group-level sync features (controlled from home, not per-device) */}
          <DCArtboard id="combination-sync" label="PixFusion · setup (PixC+)" width={375} height={812}><ScreenCombinationSync/></DCArtboard>
          <DCArtboard id="upsell-combination" label="PixFusion · tap from Free (upsell)" width={375} height={812}><ScreenUpsellCombinationSync/></DCArtboard>
          <DCArtboard id="grouped-sync" label="PixCluster · setup (PixC+)" width={375} height={812}><ScreenGroupedLightSync/></DCArtboard>
          <DCArtboard id="upsell-grouped" label="PixCluster · tap from Free (upsell)" width={375} height={812}><ScreenUpsellGroupedSync/></DCArtboard>

          {/* PixC AI */}
          <DCArtboard id="ai-empty" label="PixC AI · first launch" width={375} height={812}><ScreenTwotoAIEmpty/></DCArtboard>
          <DCArtboard id="ai-chat" label="PixC AI · in conversation" width={375} height={812}><ScreenTwotoAI/></DCArtboard>
          <DCArtboard id="upsell-ai" label="PixC AI · weekly limit hit (upsell)" width={375} height={812}><ScreenUpsellAILimit/></DCArtboard>

          {/* Rooms */}
          <DCArtboard id="add-room" label="Add room" width={375} height={812}><ScreenAddRoom/></DCArtboard>
          <DCArtboard id="edit-room" label="Edit room" width={375} height={812}><ScreenEditRoom/></DCArtboard>
          <DCArtboard id="add-device-to-room" label="Add device to room" width={375} height={812}><ScreenAddDeviceToRoom/></DCArtboard>

          {/* Homes (multi-home) */}
          <DCArtboard id="switch-home" label="Switch home" width={375} height={812}><ScreenSwitchHome/></DCArtboard>
          <DCArtboard id="upsell-homes" label="Switch home · 3rd home (upsell)" width={375} height={812}><ScreenUpsellHomes/></DCArtboard>

          {/* Family / sharing */}
          <DCArtboard id="family-guests" label="Family &amp; guests" width={375} height={812}><ScreenFamilyGuests/></DCArtboard>
          <DCArtboard id="upsell-members" label="Family · 4th member (upsell)" width={375} height={812}><ScreenUpsellMembers/></DCArtboard>
          <DCArtboard id="sharing-empty" label="Sharing · empty" width={375} height={812}><ScreenSharingEmpty/></DCArtboard>
          <DCArtboard id="sharing" label="Sharing · populated" width={375} height={812}><ScreenSharing/></DCArtboard>

          {/* Notifications */}
          <DCArtboard id="notifications-empty" label="Notifications · empty" width={375} height={812}><ScreenNotificationsEmpty/></DCArtboard>
          <DCArtboard id="notifications" label="Notifications · populated" width={375} height={812}><ScreenNotifications/></DCArtboard>
          <DCArtboard id="upsell-notifications" label="Notifications · past 7 d (upsell)" width={375} height={812}><ScreenUpsellNotifications/></DCArtboard>

          {/* Energy */}
          <DCArtboard id="energy-empty" label="Energy · empty" width={375} height={812}><ScreenEnergyEmpty/></DCArtboard>
          <DCArtboard id="energy" label="Energy · populated" width={375} height={812}><ScreenEnergy/></DCArtboard>
          <DCArtboard id="upsell-energy" label="Energy · past 14 d (upsell)" width={375} height={812}><ScreenUpsellEnergy/></DCArtboard>

          {/* Account */}
          <DCArtboard id="profile" label="Profile" width={375} height={812}><ScreenProfile/></DCArtboard>
          <DCArtboard id="settings" label="Settings (incl. App lock + Subscription)" width={375} height={812}><ScreenSettings/></DCArtboard>

          {/* Subscription pages */}
          <DCArtboard id="paywall" label="Paywall · pricing" width={375} height={812}><ScreenPaywall/></DCArtboard>
          <DCArtboard id="sub-manage-free" label="Subscription · current Free" width={375} height={812}><ScreenSubscriptionManage plan="free"/></DCArtboard>
          <DCArtboard id="sub-manage-pro" label="Subscription · current PixC+" width={375} height={812}><ScreenSubscriptionManage plan="pro"/></DCArtboard>
          <DCArtboard id="sub-cancel" label="Subscription · cancel confirm" width={375} height={812}><ScreenCancelConfirm/></DCArtboard>

          {/* Help + dangerous */}
          <DCArtboard id="help" label="Help &amp; support" width={375} height={812}><ScreenHelp/></DCArtboard>
          <DCArtboard id="sign-out-confirm" label="Sign-out confirm" width={375} height={812}><ScreenSignOutConfirm/></DCArtboard>
          <DCArtboard id="delete-account" label="Delete account" width={375} height={812}><ScreenDeleteAccount/></DCArtboard>
        </DCSection>

        <DCSection id="add-device" title="05 · Add device flow">
          <DCArtboard id="scan" label="Scanning" width={375} height={812}><ScreenScanning/></DCArtboard>
          <DCArtboard id="scan-empty" label="Scanning · no devices found" width={375} height={812}><ScreenScanningEmpty/></DCArtboard>
          <DCArtboard id="found" label="Devices found" width={375} height={812}><ScreenDevicesFound/></DCArtboard>
          <DCArtboard id="wifi" label="Wi-Fi setup" width={375} height={812}><ScreenWifi/></DCArtboard>
          <DCArtboard id="pairing" label="Pairing" width={375} height={812}><ScreenPairing/></DCArtboard>
          <DCArtboard id="success" label="Success (incl. 1-mo PixC+ promo)" width={375} height={812}><ScreenPairSuccess/></DCArtboard>
          <DCArtboard id="pairing-failed" label="Pairing failed" width={375} height={812}><ScreenPairingFailed/></DCArtboard>
          <DCArtboard id="wifi-failed" label="Wi-Fi connect failed" width={375} height={812}><ScreenWifiFailed/></DCArtboard>
          <DCArtboard id="troubleshoot" label="Device offline · troubleshoot" width={375} height={812}><ScreenDeviceTroubleshoot/></DCArtboard>
          <DCArtboard id="upsell-device-cap" label="Home full · 25/25 (upsell)" width={375} height={812}><ScreenUpsellDeviceCap/></DCArtboard>
        </DCSection>

        <DCSection id="device" title="06 · Device control">
          <DCArtboard id="color" label="Color (Frame 17)" width={375} height={812}><ScreenDeviceColor/></DCArtboard>
          <DCArtboard id="color-locked" label="Color · device locked" width={375} height={812}><ScreenDeviceColor online={false} locked/></DCArtboard>
          <DCArtboard id="color-lightsync" label="Color · LightSync overlay" width={375} height={812}><ScreenDeviceColor lightSyncOn/></DCArtboard>
          <DCArtboard id="device-offline" label="Device offline" width={375} height={812}><ScreenDeviceOffline/></DCArtboard>
          <DCArtboard id="color-in-cluster" label="Color · in PixCluster (overlay)" width={375} height={812}><ScreenDeviceColor inCluster/></DCArtboard>
          <DCArtboard id="color-in-fusion" label="Color · in PixFusion (overlay)" width={375} height={812}><ScreenDeviceColor inFusion/></DCArtboard>
          <DCArtboard id="effects" label="Effects · standard" width={375} height={812}><ScreenDeviceEffects/></DCArtboard>
          <DCArtboard id="effects-music" label="Effects · Music sync ON" width={375} height={812}><ScreenDeviceEffects music/></DCArtboard>
          <DCArtboard id="palettes" label="Palettes" width={375} height={812}><ScreenPalettes/></DCArtboard>
          <DCArtboard id="palette-new" label="New palette" width={375} height={812}><ScreenNewPalette/></DCArtboard>
          <DCArtboard id="extras-hub" label="Extras hub" width={375} height={812}><ScreenDeviceExtras/></DCArtboard>
          <DCArtboard id="segments-empty" label="Segments · empty" width={375} height={812}><ScreenSegmentsEmpty/></DCArtboard>
          <DCArtboard id="segments" label="Segments (split LEDs)" width={375} height={812}><ScreenSegments/></DCArtboard>
          <DCArtboard id="segment-new" label="New segment" width={375} height={812}><ScreenNewSegment/></DCArtboard>
          <DCArtboard id="lightsync-setup" label="LightSync · pick source" width={375} height={812}><ScreenLightSyncSetup/></DCArtboard>
          <DCArtboard id="lightsync-wireless" label="LightSync · source + layout type" width={375} height={812}><ScreenLightSyncWireless/></DCArtboard>
          <DCArtboard id="lightsync-segments-tv" label="LightSync · segments (TV wrap)" width={375} height={812}><ScreenLightSyncSegments mode="tv"/></DCArtboard>
          <DCArtboard id="lightsync-segments-flat" label="LightSync · segments (2D flat strip)" width={375} height={812}><ScreenLightSyncSegments mode="flat"/></DCArtboard>
          <DCArtboard id="lightsync-associate" label="LightSync · associate room lights" width={375} height={812}><ScreenLightSyncAssociate/></DCArtboard>
          <DCArtboard id="lightsync-pixel" label="LightSync · pixel layout" width={375} height={812}><ScreenLightSyncPixelLayout/></DCArtboard>
          <DCArtboard id="lightsync-audio" label="LightSync · Audio reactive" width={375} height={812}><ScreenLightSyncAudio/></DCArtboard>
          <DCArtboard id="lightsync-running-tv" label="LightSync running · TV" width={375} height={812}><ScreenLightSync mode="tv"/></DCArtboard>
          <DCArtboard id="lightsync-running-wireless" label="LightSync running · Wireless" width={375} height={812}><ScreenLightSync mode="wireless"/></DCArtboard>
          <DCArtboard id="lightsync-running-audio" label="LightSync running · Audio" width={375} height={812}><ScreenLightSync mode="audio"/></DCArtboard>

          <DCArtboard id="presets-empty" label="Presets · empty" width={375} height={812}><ScreenPresetsEmpty/></DCArtboard>
          <DCArtboard id="presets" label="Presets gallery" width={375} height={812}><ScreenPresets/></DCArtboard>
          <DCArtboard id="schedule" label="Automations" width={375} height={812}><ScreenSchedule/></DCArtboard>
          <DCArtboard id="automation-new" label="New automation" width={375} height={812}><ScreenNewAutomation/></DCArtboard>
          <DCArtboard id="upsell-automations" label="Automations · 11th hit (upsell)" width={375} height={812}><ScreenUpsellAutomations/></DCArtboard>
          <DCArtboard id="power-details" label="Power details" width={375} height={812}><ScreenPowerDetails/></DCArtboard>
          <DCArtboard id="misc" label="Misc settings" width={375} height={812}><ScreenMiscSettings/></DCArtboard>
          <DCArtboard id="dev-settings" label="Device settings (Wi-Fi · LED · OTA)" width={375} height={812}><ScreenDeviceSettings/></DCArtboard>
          <DCArtboard id="ota-progress" label="Firmware update · in progress" width={375} height={812}><ScreenOtaProgress/></DCArtboard>
          <DCArtboard id="ota-success" label="Firmware update · success" width={375} height={812}><ScreenOtaSuccess/></DCArtboard>
          <DCArtboard id="ota-failed" label="Firmware update · failed" width={375} height={812}><ScreenOtaFailed/></DCArtboard>
          <DCArtboard id="generic-error" label="Generic error" width={375} height={812}><ScreenGenericError/></DCArtboard>
          <DCArtboard id="move-device" label="Move device" width={375} height={812}><ScreenMoveDevice/></DCArtboard>
        </DCSection>

      </DesignCanvas>

      <TweaksPanel title="Tweaks">
        <TweakSection label="Appearance">
          <TweakRadio
            label="Theme"
            value={tweaks.theme}
            options={[{ value: "light", label: "Light" }, { value: "dark", label: "Dark" }]}
            onChange={v => setTweak("theme", v)}
          />
          <TweakColor
            label="Accent"
            value={tweaks.accent}
            onChange={v => setTweak("accent", v)}
          />
          <div style={{ display: "flex", gap: 6, padding: "0 4px 4px" }}>
            {["#2563eb", "#3b82f6", "#0ea5e9", "#4f46e5", "#1d4ed8", "#06b6d4"].map(c => (
              <button key={c} type="button" onClick={() => setTweak("accent", c)} style={{
                width: 24, height: 24, borderRadius: 999, background: c, cursor: "pointer",
                border: c.toLowerCase() === (tweaks.accent || "").toLowerCase() ? "2px solid #fff" : "2px solid transparent",
                boxShadow: c.toLowerCase() === (tweaks.accent || "").toLowerCase() ? "0 0 0 2px " + c : "0 0 0 1px rgba(0,0,0,.15)"
              }}/>
            ))}
          </div>
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
