// item-detail.jsx - bottom-sheet modal for item editing

const { useState: uiUseState, useEffect: uiUseEffect, useRef: uiUseRef } = React;

function ItemDetail({ item, client, onClose, onAction, accent }) {
  const [draft, setDraft] = uiUseState(item);
  const [galleryIdx, setGalleryIdx] = uiUseState(0);
  const [showRejectNote, setShowRejectNote] = uiUseState(false);
  const [rejectNote, setRejectNote] = uiUseState('');
  const [editingField, setEditingField] = uiUseState(null);
  const [showNotes, setShowNotes] = uiUseState(false);

  uiUseEffect(() => { setDraft(item); }, [item.id]);

  const update = (patch) => {
    setDraft(d => ({ ...d, ...patch }));
    onAction(client.id, item.id, patch);
  };

  const photos = item.placeholder ? [] : [0,1,2,3].map(i => photoFor(item.id, i));

  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 100,
      animation: 'cc-fade 220ms var(--ease-out)',
    }}>
      {/* scrim */}
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(20,18,14,0.4)' }} />
      {/* sheet */}
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0, top: 80,
        background: 'var(--endless-linen-50)',
        borderTopLeftRadius: 20, borderTopRightRadius: 20,
        overflow: 'hidden',
        boxShadow: '0 -10px 40px rgba(0,0,0,0.15)',
        display: 'flex', flexDirection: 'column',
        animation: 'cc-slide-up 320ms var(--ease-out)',
      }}>
        {/* drag handle */}
        <div style={{ display: 'flex', justifyContent: 'center', padding: '8px 0 4px' }}>
          <div style={{ width: 36, height: 4, borderRadius: 999, background: 'var(--endless-linen-300)' }} />
        </div>

        {/* close + status */}
        <div style={{ padding: '4px 16px 8px', display: 'flex', alignItems: 'center', gap: 8 }}>
          <button onClick={onClose} style={{ border: 0, background: 'transparent', padding: 4, cursor: 'pointer', color: 'var(--endless-linen-700)', fontFamily: 'var(--font-sans)', fontSize: 13, display: 'flex', alignItems: 'center', gap: 4 }}>
            <svg width="14" height="14" viewBox="0 0 14 14"><path d="M11 3L3 11M3 3l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </button>
          <div style={{ flex: 1 }} />
          <StatusBadge status={draft.status} size="lg" />
        </div>

        {/* scroll body */}
        <div style={{ flex: 1, overflow: 'auto', paddingBottom: 100 }}>
          {/* Gallery */}
          {item.placeholder ? (
            <div style={{ height: 320, background: 'var(--endless-linen-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--endless-linen-500)', fontFamily: 'var(--font-sans)', fontSize: 13 }}>
              Awaiting photographer
            </div>
          ) : (
            <div>
              <div style={{ display: 'flex', overflowX: 'auto', scrollSnapType: 'x mandatory', scrollbarWidth: 'none', gap: 4, padding: '0 16px' }}
                onScroll={e => {
                  const w = e.currentTarget.clientWidth;
                  setGalleryIdx(Math.round(e.currentTarget.scrollLeft / (w - 16)));
                }}
              >
                {photos.map((src, i) => (
                  <img key={i} src={src} style={{
                    width: 'calc(100% - 16px)', height: 380, objectFit: 'cover', flexShrink: 0,
                    scrollSnapAlign: 'center', borderRadius: 4, background: 'var(--endless-linen-100)',
                  }} />
                ))}
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: 4, padding: '10px 0 4px' }}>
                {photos.map((_, i) => (
                  <span key={i} style={{
                    width: i === galleryIdx ? 16 : 4, height: 4, borderRadius: 999,
                    background: i === galleryIdx ? 'var(--endless-noir)' : 'var(--endless-linen-300)',
                    transition: 'width 0.22s var(--ease-out)',
                  }} />
                ))}
              </div>
            </div>
          )}

          {/* Title */}
          <div style={{ padding: '14px 20px 4px' }}>
            <Eyebrow style={{ marginBottom: 6 }}>{draft.brand}</Eyebrow>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 26, lineHeight: 1.1, color: 'var(--endless-noir)', margin: 0, letterSpacing: '-0.01em', textWrap: 'pretty' }}>
              {draft.name}
            </h2>
          </div>

          {/* Shopping type pills */}
          <div style={{ padding: '10px 20px 4px', display: 'flex', gap: 6 }}>
            {['SELL', 'RENT', 'SELL & RENT'].map(t => {
              const active = draft.shoppingType === t;
              return (
                <button key={t} onClick={() => update({ shoppingType: t })} className="endless-cta" style={{
                  flex: 1, padding: '9px 8px', borderRadius: 999,
                  border: '1px solid ' + (active ? 'var(--endless-noir)' : 'var(--endless-linen-300)'),
                  background: active ? 'var(--endless-noir)' : 'transparent',
                  color: active ? 'var(--endless-ivory)' : 'var(--endless-linen-700)',
                  fontSize: 10, cursor: 'pointer', fontFamily: 'var(--font-sans)', fontWeight: 700,
                  letterSpacing: '0.12em',
                }}>{t}</button>
              );
            })}
          </div>

          {/* Price */}
          <div style={{ padding: '14px 20px', display: 'flex', gap: 10 }}>
            <PriceField label="Price (AED)" value={draft.price} onChange={v => update({ price: v })} accent />
            <PriceField label="RRP (AED)" value={draft.rrp} onChange={v => update({ rrp: v })} muted />
          </div>

          {/* Fields */}
          <div style={{ margin: '0 16px', background: 'var(--endless-ivory)', border: '0.5px solid var(--endless-linen-200)', borderRadius: 12, overflow: 'hidden' }}>
            <Field label="Brand" value={draft.brand} editing={editingField === 'brand'} onEdit={() => setEditingField('brand')} onCommit={(v) => { update({ brand: v }); setEditingField(null); }} />
            <Field label="Type" value={draft.type} options={['Clothing', 'Shoe', 'Accessory']} onChange={v => update({ type: v })} />
            <Field label="Category" value={draft.category} editing={editingField === 'category'} onEdit={() => setEditingField('category')} onCommit={(v) => { update({ category: v }); setEditingField(null); }} />
            <Field label="Size" value={draft.size} editing={editingField === 'size'} onEdit={() => setEditingField('size')} onCommit={(v) => { update({ size: v }); setEditingField(null); }} />
            <Field label="Colour" value={draft.colour} editing={editingField === 'colour'} onEdit={() => setEditingField('colour')} onCommit={(v) => { update({ colour: v }); setEditingField(null); }} />
            <Field label="Condition" value={draft.condition} options={['New with tags', 'Pre-loved', 'Vintage']} onChange={v => update({ condition: v })} last />
          </div>

          {/* Description */}
          <div style={{ padding: '20px 20px 8px' }}>
            <Eyebrow style={{ marginBottom: 8 }}>Description</Eyebrow>
            <textarea
              value={draft.desc || ''}
              onChange={e => update({ desc: e.target.value })}
              placeholder="Worn twice. A few words on fabric, fit, and provenance…"
              rows={4}
              style={{
                width: '100%', boxSizing: 'border-box',
                background: 'var(--endless-ivory)', border: '0.5px solid var(--endless-linen-200)',
                borderRadius: 12, padding: 14, fontFamily: 'var(--font-sans)',
                fontSize: 14, lineHeight: 1.5, color: 'var(--endless-noir)',
                outline: 'none', resize: 'none',
              }}
            />
          </div>

          {/* Internal notes */}
          <div style={{ padding: '8px 20px 20px' }}>
            <button onClick={() => setShowNotes(s => !s)} style={{ width: '100%', border: 0, background: 'transparent', padding: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontFamily: 'var(--font-sans)' }}>
              <Eyebrow>Internal notes</Eyebrow>
              <span style={{ fontSize: 11, color: 'var(--endless-linen-500)' }}>{showNotes ? 'Hide' : '+ Add note'}</span>
            </button>
            {showNotes && (
              <div style={{ marginTop: 10, background: 'var(--endless-linen-100)', border: '0.5px solid var(--endless-linen-200)', borderRadius: 12, padding: 14 }}>
                <div style={{ fontSize: 12, color: 'var(--endless-linen-700)', marginBottom: 6, fontStyle: 'italic' }}>Rosie · yesterday</div>
                <div style={{ fontSize: 13, color: 'var(--endless-noir)', lineHeight: 1.5, marginBottom: 10 }}>Photographer flagged a small mark near the hem. Worth confirming with the client before listing.</div>
                <textarea placeholder="Add a note for the team…" rows={2} style={{
                  width: '100%', boxSizing: 'border-box',
                  background: 'var(--endless-ivory)', border: '0.5px solid var(--endless-linen-300)',
                  borderRadius: 8, padding: 10, fontFamily: 'var(--font-sans)', fontSize: 13,
                  outline: 'none', resize: 'none',
                }} />
              </div>
            )}
          </div>
        </div>

        {/* Action bar */}
        <div style={{
          position: 'absolute', left: 0, right: 0, bottom: 0,
          padding: '12px 16px 20px',
          background: 'rgba(250,250,245,0.96)',
          backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
          borderTop: '0.5px solid var(--endless-linen-200)',
          display: 'flex', gap: 8,
        }}>
          {showRejectNote ? (
            <div style={{ flex: 1, display: 'flex', gap: 8, alignItems: 'center' }}>
              <input
                value={rejectNote} onChange={e => setRejectNote(e.target.value)} autoFocus
                placeholder="Reason for rejection…"
                style={{
                  flex: 1, border: '0.5px solid var(--endless-linen-300)', borderRadius: 999,
                  padding: '10px 14px', fontFamily: 'var(--font-sans)', fontSize: 13, outline: 'none',
                  background: 'var(--endless-ivory)',
                }}
              />
              <button onClick={() => { update({ status: 'rejected', rejectNote }); setShowRejectNote(false); setRejectNote(''); }} className="endless-cta" style={{
                padding: '10px 14px', borderRadius: 999, border: 0, background: 'var(--endless-noir)',
                color: 'var(--endless-ivory)', cursor: 'pointer',
              }}>Reject</button>
            </div>
          ) : draft.status === 'approved' || draft.status === 'live' ? (
            <>
              <button onClick={() => update({ status: 'review' })} className="endless-cta" style={{
                flex: 1, padding: '12px 14px', borderRadius: 999, border: '1px solid var(--endless-noir)',
                background: 'transparent', color: 'var(--endless-noir)', cursor: 'pointer',
              }}>Reopen</button>
              {draft.status === 'approved' ? (
                <button onClick={() => update({ status: 'live' })} className="endless-cta" style={{
                  flex: 1.4, padding: '12px 14px', borderRadius: 999, border: 0,
                  background: 'var(--endless-rosette)', color: 'var(--endless-ivory)', cursor: 'pointer',
                }}>Move to Live →</button>
              ) : (
                <div className="endless-cta" style={{ flex: 1.4, padding: '12px 14px', borderRadius: 999, border: '1px solid var(--endless-rosette)', color: 'var(--endless-rosette)', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                  <StatusDot color="var(--endless-rosette)" size={6} /> Live on Endless
                </div>
              )}
            </>
          ) : (
            <>
              <button onClick={() => setShowRejectNote(true)} className="endless-cta" style={{
                flex: 1, padding: '12px 14px', borderRadius: 999, border: '1px solid var(--endless-noir)',
                background: 'transparent', color: 'var(--endless-noir)', cursor: 'pointer',
              }}>Reject</button>
              <button onClick={() => update({ status: 'approved' })} className="endless-cta" style={{
                flex: 1.4, padding: '12px 14px', borderRadius: 999, border: 0,
                background: 'var(--endless-noir)', color: 'var(--endless-ivory)', cursor: 'pointer',
              }}>Approve</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, options, onChange, editing, onEdit, onCommit, last }) {
  const [val, setVal] = uiUseState(value);
  uiUseEffect(() => setVal(value), [value]);

  if (options) {
    return (
      <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10, borderBottom: last ? 0 : '0.5px solid var(--endless-linen-200)' }}>
        <div style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--endless-linen-600)', width: 90, flexShrink: 0 }}>{label}</div>
        <div style={{ flex: 1, display: 'flex', gap: 4, justifyContent: 'flex-end' }}>
          {options.map(o => {
            const active = value === o;
            return (
              <button key={o} onClick={() => onChange(o)} style={{
                padding: '5px 10px', fontSize: 11, fontFamily: 'var(--font-sans)',
                border: '0.5px solid ' + (active ? 'var(--endless-noir)' : 'var(--endless-linen-300)'),
                background: active ? 'var(--endless-noir)' : 'transparent',
                color: active ? 'var(--endless-ivory)' : 'var(--endless-linen-700)',
                borderRadius: 999, cursor: 'pointer', whiteSpace: 'nowrap',
              }}>{o}</button>
            );
          })}
        </div>
      </div>
    );
  }

  if (editing) {
    return (
      <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10, borderBottom: last ? 0 : '0.5px solid var(--endless-linen-200)' }}>
        <div style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--endless-linen-600)', width: 90, flexShrink: 0 }}>{label}</div>
        <input
          value={val} onChange={e => setVal(e.target.value)} autoFocus
          onBlur={() => onCommit(val)}
          onKeyDown={e => { if (e.key === 'Enter') onCommit(val); }}
          style={{
            flex: 1, border: '0.5px solid var(--endless-noir)',
            borderRadius: 6, padding: '6px 10px', fontFamily: 'var(--font-sans)', fontSize: 13,
            color: 'var(--endless-noir)', textAlign: 'right', outline: 'none', background: 'var(--endless-ivory)',
          }}
        />
      </div>
    );
  }

  return (
    <button onClick={onEdit} style={{
      width: '100%', textAlign: 'left', border: 0, background: 'transparent',
      padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer',
      borderBottom: last ? 0 : '0.5px solid var(--endless-linen-200)',
    }}>
      <div style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--endless-linen-600)', width: 90, flexShrink: 0 }}>{label}</div>
      <div style={{ flex: 1, fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--endless-noir)', textAlign: 'right' }}>{value}</div>
      <svg width="10" height="10" viewBox="0 0 10 10" style={{ color: 'var(--endless-linen-400)' }}><path d="M2 1l4 4-4 4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/></svg>
    </button>
  );
}

function PriceField({ label, value, onChange, accent, muted }) {
  const [v, setV] = uiUseState(value);
  uiUseEffect(() => setV(value), [value]);
  return (
    <label style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
      <Eyebrow>{label}</Eyebrow>
      <input
        type="number" value={v}
        onChange={e => setV(+e.target.value || 0)}
        onBlur={() => onChange(v)}
        style={{
          background: 'var(--endless-ivory)', border: '0.5px solid var(--endless-linen-200)',
          borderRadius: 10, padding: '12px 14px',
          fontFamily: 'var(--font-display)', fontSize: 22,
          color: muted ? 'var(--endless-linen-500)' : 'var(--endless-noir)',
          outline: 'none', fontVariantNumeric: 'tabular-nums',
        }}
      />
    </label>
  );
}

Object.assign(window, { ItemDetail });
