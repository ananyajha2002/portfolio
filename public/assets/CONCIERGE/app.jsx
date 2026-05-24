// app.jsx - Endless Concierge Tracker

const { useState, useEffect, useRef, useMemo } = React;

// ─── helpers ───────────────────────────────────────────────────────────
const fmtAED = (n) => n ? `AED ${n.toLocaleString('en')}` : '-';

function rolledStatus(items) {
  if (!items.length) return 'new';
  const allLive = items.every(i => i.status === 'live');
  if (allLive) return 'live';
  const reviewedCount = items.filter(i => ['approved','rejected','live'].includes(i.status)).length;
  const allReviewed = reviewedCount === items.length;
  if (allReviewed) return 'ready';
  const anyTouched = items.some(i => i.status !== 'pending');
  return anyTouched ? 'review' : 'new';
}

// ─── shared atoms ──────────────────────────────────────────────────────
function StatusDot({ color, size = 8 }) {
  return <span style={{ width: size, height: size, borderRadius: 999, background: color, display: 'inline-block', flexShrink: 0 }} />;
}

function StatusBadge({ status, size = 'sm' }) {
  const meta = STATUS_META[status];
  const padY = size === 'lg' ? 6 : 4;
  const padX = size === 'lg' ? 10 : 8;
  const fs = size === 'lg' ? 11 : 10;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: `${padY}px ${padX}px`,
      background: 'rgba(255,255,255,0.92)',
      backdropFilter: 'blur(8px)',
      border: '0.5px solid rgba(0,0,0,0.08)',
      borderRadius: 999,
      fontFamily: 'var(--font-sans)',
      fontSize: fs, fontWeight: 500,
      letterSpacing: '0.06em', textTransform: 'uppercase',
      color: 'var(--endless-noir)',
      whiteSpace: 'nowrap',
    }}>
      <StatusDot color={meta.dot} size={6} />
      {meta.label}
    </span>
  );
}

function Eyebrow({ children, style }) {
  return <div style={{ fontFamily: 'var(--font-sans)', fontSize: 10, fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--endless-linen-500)', ...style }}>{children}</div>;
}

// Top header - soft ivory bar with brand mark + page title
function TopBar({ title, eyebrow, onBack, right }) {
  return (
    <div style={{
      padding: '52px 20px 14px',
      background: 'rgba(250,250,245,0.92)',
      backdropFilter: 'blur(20px) saturate(180%)',
      WebkitBackdropFilter: 'blur(20px) saturate(180%)',
      borderBottom: '0.5px solid var(--endless-linen-200)',
      position: 'sticky', top: 0, zIndex: 10,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
        {onBack ? (
          <button onClick={onBack} style={{
            border: 0, background: 'transparent', padding: 0, cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 4,
            fontFamily: 'var(--font-sans)', fontSize: 13, color: 'var(--endless-linen-700)',
          }}>
            <svg width="14" height="14" viewBox="0 0 14 14"><path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/></svg>
            Back
          </button>
        ) : (
          <img src="assets/brand-mark-noir.png" style={{ height: 18, width: 'auto' }} alt="endless" />
        )}
        <div style={{ flex: 1 }} />
        {right}
      </div>
      {eyebrow && <Eyebrow style={{ marginBottom: 4 }}>{eyebrow}</Eyebrow>}
      <h1 style={{
        fontFamily: 'var(--font-display)', fontWeight: 400,
        fontSize: 32, lineHeight: 1.05, letterSpacing: '-0.01em',
        margin: 0, color: 'var(--endless-noir)',
        textWrap: 'pretty',
      }}>{title}</h1>
    </div>
  );
}

// ─── CLIENT LIST ───────────────────────────────────────────────────────
function ClientList({ clients, onOpen, onNew, accent }) {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');

  const counts = useMemo(() => {
    const c = { all: clients.length, new: 0, review: 0, ready: 0, live: 0 };
    clients.forEach(cl => { c[cl.status]++; });
    return c;
  }, [clients]);

  const filtered = clients.filter(c => {
    if (filter !== 'all' && c.status !== filter) return false;
    if (query && !c.name.toLowerCase().includes(query.toLowerCase()) && !c.pickup.toLowerCase().includes(query.toLowerCase())) return false;
    return true;
  });

  const totalItems = clients.reduce((s, c) => s + c.items.length, 0);

  return (
    <div style={{ minHeight: '100%', background: 'var(--endless-linen-50)', paddingBottom: 60 }}>
      <TopBar
        eyebrow={`${clients.length} clients · ${totalItems} items in pipeline`}
        title="Concierge"
        right={
          <button onClick={onNew} style={{
            width: 36, height: 36, borderRadius: 999, border: '0.5px solid var(--endless-linen-300)',
            background: 'var(--endless-ivory)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', padding: 0,
          }}>
            <svg width="14" height="14" viewBox="0 0 14 14"><path d="M7 2v10M2 7h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </button>
        }
      />

      {/* Search */}
      <div style={{ padding: '12px 20px 8px' }}>
        <div style={{ position: 'relative' }}>
          <svg width="14" height="14" viewBox="0 0 14 14" style={{ position: 'absolute', left: 12, top: 11, color: 'var(--endless-linen-500)' }}>
            <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.4" fill="none"/><path d="M9.5 9.5l3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
          </svg>
          <input
            value={query} onChange={e => setQuery(e.target.value)}
            placeholder="Search clients, addresses…"
            style={{
              width: '100%', boxSizing: 'border-box',
              border: '0.5px solid var(--endless-linen-300)',
              background: 'var(--endless-ivory)',
              padding: '9px 12px 9px 32px',
              fontFamily: 'var(--font-sans)', fontSize: 14,
              borderRadius: 10, outline: 'none', color: 'var(--endless-noir)',
            }}
          />
        </div>
      </div>

      {/* Filter chips */}
      <div style={{ padding: '4px 20px 14px', display: 'flex', gap: 6, overflowX: 'auto', scrollbarWidth: 'none' }}>
        {[
          { id: 'all', label: 'All' },
          { id: 'new', label: 'New' },
          { id: 'review', label: 'In review' },
          { id: 'ready', label: 'Ready' },
          { id: 'live', label: 'Live' },
        ].map(f => {
          const active = filter === f.id;
          return (
            <button key={f.id} onClick={() => setFilter(f.id)} style={{
              padding: '6px 12px', borderRadius: 999, fontSize: 12, fontWeight: 500,
              fontFamily: 'var(--font-sans)', cursor: 'pointer', whiteSpace: 'nowrap',
              border: '0.5px solid ' + (active ? 'var(--endless-noir)' : 'var(--endless-linen-300)'),
              background: active ? 'var(--endless-noir)' : 'transparent',
              color: active ? 'var(--endless-ivory)' : 'var(--endless-linen-700)',
              letterSpacing: '0.02em',
            }}>
              {f.label} <span style={{ opacity: 0.5, marginLeft: 4 }}>{counts[f.id]}</span>
            </button>
          );
        })}
      </div>

      {/* Client cards */}
      <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {filtered.map(c => <ClientRow key={c.id} client={c} onOpen={() => onOpen(c.id)} accent={accent} />)}
        {filtered.length === 0 && (
          <div style={{ padding: '40px 20px', textAlign: 'center', color: 'var(--endless-linen-500)', fontFamily: 'var(--font-sans)', fontSize: 14 }}>
            No clients match.
          </div>
        )}
      </div>
    </div>
  );
}

function ClientRow({ client, onOpen, accent }) {
  const meta = CLIENT_STATUS_META[client.status];
  const reviewed = client.items.filter(i => i.status !== 'pending').length;
  const total = client.items.length;
  const pct = total ? reviewed/total : 0;

  return (
    <button onClick={onOpen} style={{
      width: '100%', textAlign: 'left', cursor: 'pointer',
      background: 'var(--endless-ivory)', border: '0.5px solid var(--endless-linen-200)',
      borderRadius: 12, padding: '14px 16px',
      fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column', gap: 12,
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
        {/* initials */}
        <div style={{
          width: 40, height: 40, borderRadius: 999,
          background: 'var(--endless-linen-100)',
          border: '0.5px solid var(--endless-linen-200)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--font-display)', fontSize: 14,
          color: 'var(--endless-noir)', flexShrink: 0, }}>{client.initials}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 19, fontWeight: 400, color: 'var(--endless-noir)', lineHeight: 1.15, letterSpacing: '-0.01em' }}>
            {client.name}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4, fontSize: 12, color: 'var(--endless-linen-600)' }}>
            <span>{client.pickupShort}</span>
            <span style={{ color: 'var(--endless-linen-300)' }}>·</span>
            <span>pickup {client.pickupDate}</span>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 11, color: 'var(--endless-linen-700)', fontWeight: 500, letterSpacing: '0.02em' }}>
            <StatusDot color={meta.dot} size={6} /> {meta.label}
          </div>
          <div style={{ fontSize: 11, color: 'var(--endless-linen-500)' }}>{fmtAED(client.estValue)}</div>
        </div>
      </div>

      {/* Progress + items */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ flex: 1, height: 2, background: 'var(--endless-linen-200)', borderRadius: 999, overflow: 'hidden' }}>
          <div style={{ width: `${pct*100}%`, height: '100%', background: client.status === 'live' ? 'var(--endless-rosette)' : 'var(--endless-noir)', transition: 'width 0.4s var(--ease-out)' }} />
        </div>
        <div style={{ fontSize: 11, color: 'var(--endless-linen-600)', whiteSpace: 'nowrap', fontVariantNumeric: 'tabular-nums' }}>
          {reviewed}/{total} items
        </div>
      </div>
    </button>
  );
}

// ─── CLIENT DETAIL (item grid) ─────────────────────────────────────────
function ClientDetail({ client, onBack, onOpenItem, onItemAction, onAddItem, accent }) {
  const [filter, setFilter] = useState('all');
  const [selecting, setSelecting] = useState(false);
  const [selected, setSelected] = useState(new Set());

  const counts = useMemo(() => {
    const c = { all: client.items.length, pending: 0, review: 0, approved: 0, rejected: 0, live: 0 };
    client.items.forEach(i => { c[i.status]++; });
    return c;
  }, [client.items]);

  const filtered = client.items.filter(i => filter === 'all' || i.status === filter);

  const toggleSel = (id) => {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id); else next.add(id);
    setSelected(next);
  };

  const bulkApprove = () => {
    selected.forEach(id => onItemAction(client.id, id, { status: 'approved' }));
    setSelected(new Set()); setSelecting(false);
  };
  const bulkReject = () => {
    selected.forEach(id => onItemAction(client.id, id, { status: 'rejected' }));
    setSelected(new Set()); setSelecting(false);
  };

  return (
    <div style={{ position: 'absolute', inset: 0, background: 'var(--endless-linen-50)', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, overflow: 'auto', paddingBottom: selecting ? 100 : 60 }}>
      <TopBar
        onBack={onBack}
        eyebrow={`${client.pickupShort} · pickup ${client.pickupDate}`}
        title={client.name}
        right={
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <button onClick={onAddItem} title="Add item" style={{
              width: 32, height: 32, borderRadius: 999, border: '0.5px solid var(--endless-linen-300)',
              background: 'var(--endless-ivory)', display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', padding: 0,
            }}>
              <svg width="12" height="12" viewBox="0 0 12 12"><path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>
            </button>
            <button onClick={() => { setSelecting(s => !s); setSelected(new Set()); }} style={{
              border: 0, background: 'transparent', padding: '6px 10px', cursor: 'pointer',
              fontFamily: 'var(--font-sans)', fontSize: 12, fontWeight: 500,
              color: selecting ? 'var(--endless-rosette)' : 'var(--endless-linen-700)',
              letterSpacing: '0.02em',
            }}>{selecting ? 'Done' : 'Select'}</button>
          </div>
        }
      />

      {/* Stats strip */}
      <div style={{ padding: '14px 20px 10px', display: 'flex', gap: 0, alignItems: 'stretch' }}>
        <Stat label="Items" value={client.items.length} />
        <Divider />
        <Stat label="Approved" value={counts.approved + counts.live} />
        <Divider />
        <Stat label="Est. value" value={fmtAED(client.estValue)} small />
      </div>

      {/* Filter chips */}
      <div style={{ padding: '0 20px 14px', display: 'flex', gap: 6, overflowX: 'auto', scrollbarWidth: 'none' }}>
        {[
          { id: 'all', label: 'All' },
          { id: 'pending', label: 'Pending' },
          { id: 'review', label: 'In review' },
          { id: 'approved', label: 'Approved' },
          { id: 'rejected', label: 'Rejected' },
          { id: 'live', label: 'Live' },
        ].map(f => {
          const active = filter === f.id;
          if (counts[f.id] === 0 && f.id !== 'all') return null;
          return (
            <button key={f.id} onClick={() => setFilter(f.id)} style={{
              padding: '6px 12px', borderRadius: 999, fontSize: 12, fontWeight: 500,
              fontFamily: 'var(--font-sans)', cursor: 'pointer', whiteSpace: 'nowrap',
              border: '0.5px solid ' + (active ? 'var(--endless-noir)' : 'var(--endless-linen-300)'),
              background: active ? 'var(--endless-noir)' : 'transparent',
              color: active ? 'var(--endless-ivory)' : 'var(--endless-linen-700)',
              letterSpacing: '0.02em',
            }}>
              {f.label} <span style={{ opacity: 0.5, marginLeft: 4 }}>{counts[f.id]}</span>
            </button>
          );
        })}
      </div>

      {/* 2-col photo grid */}
      <div style={{ padding: '0 16px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {filtered.map(item => (
          <ItemCard
            key={item.id} item={item}
            selecting={selecting}
            selected={selected.has(item.id)}
            onClick={() => selecting ? toggleSel(item.id) : onOpenItem(client.id, item.id)}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{ padding: '40px 20px', textAlign: 'center', color: 'var(--endless-linen-500)', fontFamily: 'var(--font-sans)', fontSize: 14 }}>
          Nothing here yet.
        </div>
      )}
      </div>

      {/* Bulk action bar */}
      {selecting && (
        <div style={{
          position: 'absolute', bottom: 34, left: 0, right: 0, zIndex: 20,
          padding: '12px 16px',
          background: 'rgba(250,250,245,0.96)',
          backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
          borderTop: '0.5px solid var(--endless-linen-200)',
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <div style={{ flex: 1, fontFamily: 'var(--font-sans)', fontSize: 13, color: 'var(--endless-noir)' }}>
            {selected.size} selected
          </div>
          <button disabled={!selected.size} onClick={bulkReject} className="endless-cta" style={{
            padding: '10px 14px', borderRadius: 999, border: '1px solid var(--endless-noir)',
            background: 'transparent', color: 'var(--endless-noir)', cursor: 'pointer',
            opacity: selected.size ? 1 : 0.4,
          }}>Reject</button>
          <button disabled={!selected.size} onClick={bulkApprove} className="endless-cta" style={{
            padding: '10px 14px', borderRadius: 999, border: 0,
            background: 'var(--endless-noir)', color: 'var(--endless-ivory)', cursor: 'pointer',
            opacity: selected.size ? 1 : 0.4,
          }}>Approve</button>
        </div>
      )}
    </div>
  );
}

function Stat({ label, value, small }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Eyebrow>{label}</Eyebrow>
      <div style={{
        fontFamily: 'var(--font-display)', fontSize: small ? 17 : 22,
        color: 'var(--endless-noir)', letterSpacing: '-0.01em',
        fontVariantNumeric: 'tabular-nums', lineHeight: 1.1,
      }}>{value}</div>
    </div>
  );
}
function Divider() {
  return <div style={{ width: 0.5, background: 'var(--endless-linen-300)', alignSelf: 'stretch', margin: '0 14px' }} />;
}

function ItemCard({ item, onClick, selecting, selected }) {
  return (
    <button onClick={onClick} style={{
      border: 0, padding: 0, background: 'transparent', textAlign: 'left',
      cursor: 'pointer', fontFamily: 'var(--font-sans)', position: 'relative',
    }}>
      <div style={{
        position: 'relative', width: '100%', aspectRatio: '4/5',
        borderRadius: 4, overflow: 'hidden',
        background: 'var(--endless-linen-100)',
        outline: selected ? '2px solid var(--endless-noir)' : 'none',
        outlineOffset: 2,
      }}>
        {item.placeholder ? (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 4, padding: 12, textAlign: 'center' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" style={{ color: 'var(--endless-linen-400)' }}>
              <rect x="3" y="5" width="18" height="14" rx="1.5" stroke="currentColor" strokeWidth="1" fill="none"/>
              <circle cx="9" cy="11" r="1.5" stroke="currentColor" strokeWidth="1" fill="none"/>
              <path d="M3 17l5-4 4 3 3-2 6 4" stroke="currentColor" strokeWidth="1" fill="none"/>
            </svg>
            <span style={{ fontSize: 10, color: 'var(--endless-linen-500)', letterSpacing: '0.04em' }}>awaiting photos</span>
          </div>
        ) : (
          <img src={photoFor(item.id, 0)} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        )}
        {/* Status badge */}
        <div style={{ position: 'absolute', top: 8, left: 8 }}>
          <StatusBadge status={item.status} />
        </div>
        {/* Selection checkbox */}
        {selecting && (
          <div style={{ position: 'absolute', top: 8, right: 8,
            width: 22, height: 22, borderRadius: 999,
            background: selected ? 'var(--endless-noir)' : 'rgba(255,255,255,0.92)',
            border: '0.5px solid ' + (selected ? 'var(--endless-noir)' : 'rgba(0,0,0,0.2)'),
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            {selected && <svg width="11" height="11" viewBox="0 0 11 11"><path d="M2 5.5l2.5 2.5 5-5" stroke="#fff" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>}
          </div>
        )}
      </div>
      <div style={{ padding: '8px 2px 4px' }}>
        <div style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--endless-linen-500)' }}>{item.brand}</div>
        <div style={{ fontSize: 13, color: 'var(--endless-noir)', marginTop: 2, lineHeight: 1.25, fontWeight: 400, textWrap: 'pretty' }}>{item.name}</div>
        {!item.placeholder && (
          <div style={{ fontSize: 11, color: 'var(--endless-linen-600)', marginTop: 4, display: 'flex', gap: 8 }}>
            <span>{item.size}</span>
            <span style={{ color: 'var(--endless-linen-300)' }}>·</span>
            <span>{fmtAED(item.price)}</span>
          </div>
        )}
      </div>
    </button>
  );
}

Object.assign(window, { TopBar, ClientList, ClientDetail, StatusBadge, StatusDot, Eyebrow, fmtAED, rolledStatus });
