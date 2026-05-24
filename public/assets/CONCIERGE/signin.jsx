// signin.jsx - Endless Concierge System opening / sign-in screen

const { useState: siUseState, useEffect: siUseEffect } = React;

function SignInScreen({ onEnter }) {
  const [email, setEmail] = siUseState('');
  const [password, setPassword] = siUseState('');
  const [loading, setLoading] = siUseState(false);
  const [revealedAt, setRevealedAt] = siUseState(0);

  siUseEffect(() => {
    // Stagger entrance after mount
    const t = setTimeout(() => setRevealedAt(Date.now()), 60);
    return () => clearTimeout(t);
  }, []);

  const submit = (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); onEnter(); }, 700);
  };

  // Subtle moving gradient sheen
  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: 'var(--endless-noir, #14120E)',
      overflow: 'hidden',
      display: 'flex', flexDirection: 'column',
      fontFamily: 'var(--font-sans)',
      color: 'var(--endless-ivory)',
    }}>
      {/* Editorial sheen - warm radial wash from upper-right */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(120% 80% at 90% -10%, rgba(224,72,120,0.18), transparent 55%), radial-gradient(120% 100% at -10% 110%, rgba(224,80,40,0.12), transparent 60%)',
      }} />
      {/* Hairline grain */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.4,
        background: `url("data:image/svg+xml;utf8,${encodeURIComponent("<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence baseFrequency='0.85' numOctaves='2' /></filter><rect width='200' height='200' filter='url(#n)' opacity='0.5'/></svg>")}")`,
        mixBlendMode: 'overlay',
      }} />

      {/* Top status spacer */}
      <div style={{ height: 52, flexShrink: 0 }} />

      {/* Brand mark */}
      <div style={{
        padding: '24px 32px 0',
        animation: 'cc-fade-in 600ms var(--ease-out, cubic-bezier(0.22,0.61,0.36,1)) both',
        animationDelay: '80ms',
      }}>
        <img src="assets/brand-mark-ivory.png" style={{ height: 22, width: 'auto', opacity: 0.95 }} alt="Endless" />
      </div>

      <div style={{ flex: 1 }} />

      {/* Wordmark block */}
      <div style={{ padding: '0 32px 32px', position: 'relative', zIndex: 2 }}>
        <div style={{
          fontSize: 10, fontWeight: 500, letterSpacing: '0.22em', textTransform: 'uppercase',
          color: 'rgba(250,250,245,0.5)',
          marginBottom: 18,
          animation: 'cc-fade-in 600ms var(--ease-out, ease-out) both',
          animationDelay: '160ms',
        }}>Internal - Ops only</div>
        <h1 style={{
          fontFamily: 'var(--font-display, "Meno Banner", serif)',
          fontWeight: 400, fontSize: 56, lineHeight: 0.95,
          letterSpacing: '-0.02em',
          margin: 0, color: 'var(--endless-ivory)',
          textWrap: 'pretty',
          animation: 'cc-fade-in 700ms var(--ease-out, ease-out) both',
          animationDelay: '220ms',
        }}>
          Endless<br/>
          Concierge<br/>
          <span style={{ color: 'var(--endless-rosette, #E04878)' }}>System</span>
        </h1>
        <div style={{
          marginTop: 18,
          fontFamily: 'var(--font-sans)', fontSize: 14, lineHeight: 1.5,
          color: 'rgba(250,250,245,0.65)', maxWidth: 320,
          animation: 'cc-fade-in 700ms var(--ease-out, ease-out) both',
          animationDelay: '320ms',
        }}>
          Manage clients, review pieces, and move them onto Endless - from the Dubai concierge floor to live in minutes.
        </div>
      </div>

      {/* Sign-in card */}
      <form onSubmit={submit} style={{
        margin: '0 16px 16px',
        background: 'rgba(250,250,245,0.06)',
        border: '0.5px solid rgba(250,250,245,0.14)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderRadius: 20, padding: 18,
        animation: 'cc-fade-in 700ms var(--ease-out, ease-out) both',
        animationDelay: '440ms',
        position: 'relative', zIndex: 2,
      }}>
        <SignInField
          label="Email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={setEmail}
          placeholder="you@endless.ae"
        />
        <div style={{ height: 0.5, background: 'rgba(250,250,245,0.14)', margin: '14px 0' }} />
        <SignInField
          label="Passcode"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={setPassword}
          placeholder="••••••"
        />

        <button type="submit" disabled={loading || !email} style={{
          marginTop: 18, width: '100%',
          padding: '14px 16px', borderRadius: 999,
          border: 0,
          background: loading ? 'rgba(250,250,245,0.4)' : 'var(--endless-ivory)',
          color: 'var(--endless-noir)',
          fontFamily: 'var(--font-sans)', fontSize: 12, fontWeight: 700,
          letterSpacing: '0.14em', textTransform: 'uppercase',
          cursor: email && !loading ? 'pointer' : 'default',
          opacity: email && !loading ? 1 : 0.5,
          transition: 'opacity 220ms var(--ease-out, ease-out)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
        }}>
          {loading ? (
            <>
              <span style={{ width: 12, height: 12, borderRadius: 999, border: '1.5px solid rgba(0,0,0,0.2)', borderTopColor: 'var(--endless-noir)', animation: 'cc-spin 700ms linear infinite', display: 'inline-block' }} />
              Signing in
            </>
          ) : (
            <>
              Enter Concierge
              <svg width="14" height="10" viewBox="0 0 14 10"><path d="M1 5h12m-4-4l4 4-4 4" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </>
          )}
        </button>

        <button type="button" style={{
          marginTop: 10, width: '100%',
          padding: '11px 16px', borderRadius: 999,
          border: '0.5px solid rgba(250,250,245,0.2)',
          background: 'transparent',
          color: 'rgba(250,250,245,0.85)',
          fontFamily: 'var(--font-sans)', fontSize: 12, fontWeight: 500,
          letterSpacing: '0.04em',
          cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        }}>
          <svg width="13" height="13" viewBox="0 0 13 13"><rect x="2" y="3" width="9" height="7" rx="1" stroke="currentColor" strokeWidth="1.2" fill="none"/><circle cx="6.5" cy="6.5" r="1.5" stroke="currentColor" strokeWidth="1.2" fill="none"/></svg>
          Use Face ID
        </button>
      </form>

      {/* Footer */}
      <div style={{
        padding: '10px 32px 30px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase',
        color: 'rgba(250,250,245,0.4)',
        position: 'relative', zIndex: 2,
        animation: 'cc-fade-in 700ms var(--ease-out, ease-out) both',
        animationDelay: '560ms',
      }}>
        <span>v 2.6 · Dubai</span>
        <span>Need access?</span>
      </div>

      <style>{`
        @keyframes cc-spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}

function SignInField({ label, type, value, onChange, placeholder, autoComplete }) {
  return (
    <label style={{ display: 'block' }}>
      <div style={{
        fontSize: 10, fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase',
        color: 'rgba(250,250,245,0.5)', marginBottom: 8,
      }}>{label}</div>
      <input
        type={type} value={value} onChange={e => onChange(e.target.value)}
        placeholder={placeholder} autoComplete={autoComplete}
        style={{
          width: '100%', boxSizing: 'border-box',
          background: 'transparent', border: 0, outline: 'none',
          padding: 0, fontFamily: 'var(--font-sans)',
          fontSize: 17, color: 'var(--endless-ivory)',
          caretColor: 'var(--endless-rosette, #E04878)',
        }}
      />
    </label>
  );
}

Object.assign(window, { SignInScreen });
