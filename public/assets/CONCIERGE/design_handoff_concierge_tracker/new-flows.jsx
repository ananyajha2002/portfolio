// new-flows.jsx - New Client + New Item bottom-sheet flows

const { useState: nfUseState, useEffect: nfUseEffect, useRef: nfUseRef } = React;

// ─── Shared sheet shell ────────────────────────────────────────────────
function FlowSheet({ onClose, children, top = 60 }) {
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 100, animation: 'cc-fade 220ms var(--ease-out)' }}>
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(20,18,14,0.4)' }} />
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0, top,
        background: 'var(--endless-linen-50)',
        borderTopLeftRadius: 20, borderTopRightRadius: 20,
        overflow: 'hidden',
        boxShadow: '0 -10px 40px rgba(0,0,0,0.15)',
        display: 'flex', flexDirection: 'column',
        animation: 'cc-slide-up 320ms var(--ease-out)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', padding: '8px 0 4px' }}>
          <div style={{ width: 36, height: 4, borderRadius: 999, background: 'var(--endless-linen-300)' }} />
        </div>
        {children}
      </div>
    </div>
  );
}

function FlowHeader({ onClose, onBack, eyebrow, title, step, totalSteps }) {
  return (
    <div style={{ padding: '4px 16px 14px', borderBottom: '0.5px solid var(--endless-linen-200)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
        {onBack ? (
          <button onClick={onBack} style={{ border: 0, background: 'transparent', padding: 4, cursor: 'pointer', color: 'var(--endless-linen-700)', display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'var(--font-sans)', fontSize: 13 }}>
            <svg width="14" height="14" viewBox="0 0 14 14"><path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/></svg>
            Back
          </button>
        ) : <div style={{ width: 0 }} />}
        <div style={{ flex: 1 }} />
        <button onClick={onClose} style={{ border: 0, background: 'transparent', padding: 4, cursor: 'pointer', color: 'var(--endless-linen-700)', fontFamily: 'var(--font-sans)', fontSize: 13 }}>Cancel</button>
      </div>
      {totalSteps && (
        <div style={{ display: 'flex', gap: 4, marginBottom: 14 }}>
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div key={i} style={{
              flex: 1, height: 2, borderRadius: 999,
              background: i < step ? 'var(--endless-noir)' : 'var(--endless-linen-200)',
              transition: 'background 220ms var(--ease-out)',
            }} />
          ))}
        </div>
      )}
      {eyebrow && <Eyebrow style={{ marginBottom: 4 }}>{eyebrow}</Eyebrow>}
      <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 28, lineHeight: 1.05, letterSpacing: '-0.01em', color: 'var(--endless-noir)', margin: 0, textWrap: 'pretty' }}>
        {title}
      </h2>
    </div>
  );
}

// Generic field
function FlowInput({ label, value, onChange, placeholder, type = 'text', autoFocus, hint }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <Eyebrow style={{ marginBottom: 8 }}>{label}</Eyebrow>
      <input
        type={type} value={value} onChange={e => onChange(e.target.value)}
        placeholder={placeholder} autoFocus={autoFocus}
        style={{
          width: '100%', boxSizing: 'border-box',
          background: 'var(--endless-ivory)', border: '0.5px solid var(--endless-linen-200)',
          borderRadius: 10, padding: '14px 14px',
          fontFamily: 'var(--font-sans)', fontSize: 16,
          color: 'var(--endless-noir)', outline: 'none',
        }}
      />
      {hint && <div style={{ marginTop: 6, fontSize: 11, color: 'var(--endless-linen-500)', fontFamily: 'var(--font-sans)' }}>{hint}</div>}
    </div>
  );
}

function FlowTextarea({ label, value, onChange, placeholder, rows = 3 }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <Eyebrow style={{ marginBottom: 8 }}>{label}</Eyebrow>
      <textarea
        value={value} onChange={e => onChange(e.target.value)}
        placeholder={placeholder} rows={rows}
        style={{
          width: '100%', boxSizing: 'border-box',
          background: 'var(--endless-ivory)', border: '0.5px solid var(--endless-linen-200)',
          borderRadius: 10, padding: 14,
          fontFamily: 'var(--font-sans)', fontSize: 15, lineHeight: 1.5,
          color: 'var(--endless-noir)', outline: 'none', resize: 'none',
        }}
      />
    </div>
  );
}

function FlowSegmented({ label, value, onChange, options }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <Eyebrow style={{ marginBottom: 8 }}>{label}</Eyebrow>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {options.map(o => {
          const v = typeof o === 'string' ? o : o.value;
          const lbl = typeof o === 'string' ? o : o.label;
          const active = value === v;
          return (
            <button key={v} onClick={() => onChange(v)} style={{
              padding: '9px 14px', borderRadius: 999,
              border: '0.5px solid ' + (active ? 'var(--endless-noir)' : 'var(--endless-linen-300)'),
              background: active ? 'var(--endless-noir)' : 'transparent',
              color: active ? 'var(--endless-ivory)' : 'var(--endless-linen-700)',
              fontFamily: 'var(--font-sans)', fontSize: 12, fontWeight: 500,
              cursor: 'pointer', whiteSpace: 'nowrap', letterSpacing: '0.02em',
            }}>{lbl}</button>
          );
        })}
      </div>
    </div>
  );
}

function FlowFooter({ children }) {
  return (
    <div style={{
      padding: '12px 16px 20px',
      borderTop: '0.5px solid var(--endless-linen-200)',
      background: 'rgba(250,250,245,0.96)',
      backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
      display: 'flex', gap: 8, alignItems: 'center',
    }}>{children}</div>
  );
}

function PrimaryBtn({ children, onClick, disabled, flex = 1.4 }) {
  return (
    <button onClick={onClick} disabled={disabled} className="endless-cta" style={{
      flex, padding: '13px 14px', borderRadius: 999, border: 0,
      background: 'var(--endless-noir)', color: 'var(--endless-ivory)',
      cursor: disabled ? 'default' : 'pointer', opacity: disabled ? 0.4 : 1,
      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
    }}>{children}</button>
  );
}
function SecondaryBtn({ children, onClick, flex = 1 }) {
  return (
    <button onClick={onClick} className="endless-cta" style={{
      flex, padding: '13px 14px', borderRadius: 999,
      border: '1px solid var(--endless-noir)', background: 'transparent',
      color: 'var(--endless-noir)', cursor: 'pointer',
    }}>{children}</button>
  );
}

// ─── NEW CLIENT FLOW ───────────────────────────────────────────────────
function NewClientFlow({ onClose, onCreate }) {
  const [step, setStep] = nfUseState(0);
  const [form, setForm] = nfUseState({
    name: '', source: 'Referral', referredBy: '',
    phone: '', email: '', whatsappOk: true,
    pickupArea: 'Marina', pickupAddress: '', pickupDate: '',
    consigner: 'Diana', notes: '',
    estItems: 'Mixed (5-15)',
  });
  const update = (patch) => setForm(f => ({ ...f, ...patch }));

  const totalSteps = 3;
  const next = () => setStep(s => Math.min(s + 1, totalSteps - 1));
  const back = () => step > 0 ? setStep(s => s - 1) : onClose();

  const canAdvance = step === 0 ? form.name.trim().length > 1 :
                     step === 1 ? form.phone.length > 4 :
                     true;

  const submit = () => {
    const initials = form.name.split(' ').map(p => p[0]).slice(0,2).join('').toUpperCase();
    onCreate({
      id: 'new-' + Date.now(),
      name: form.name,
      initials,
      pickup: form.pickupAddress || form.pickupArea,
      pickupShort: form.pickupArea,
      pickupDate: form.pickupDate || '- awaiting',
      status: 'new',
      estValue: 0,
      items: [],
      meta: { phone: form.phone, email: form.email, source: form.source, consigner: form.consigner, notes: form.notes },
    });
  };

  return (
    <FlowSheet onClose={onClose} top={50}>
      <FlowHeader
        onBack={back} onClose={onClose}
        eyebrow={`Step ${step + 1} of ${totalSteps}`}
        title={
          step === 0 ? 'New client' :
          step === 1 ? 'Where & when' :
          'Pipeline notes'
        }
        step={step + 1}
        totalSteps={totalSteps}
      />

      <div style={{ flex: 1, overflow: 'auto', padding: '20px 16px 16px' }}>
        {step === 0 && (
          <>
            <FlowInput label="Full name" value={form.name} onChange={v => update({ name: v })} placeholder="e.g. Diane O'Sullivan" autoFocus />
            <FlowSegmented label="Acquired through" value={form.source} onChange={v => update({ source: v })} options={['Referral', 'Instagram', 'Walk-in', 'Brand partner', 'Returning']} />
            {form.source === 'Referral' && (
              <FlowInput label="Referred by" value={form.referredBy} onChange={v => update({ referredBy: v })} placeholder="Existing client name" />
            )}
            <FlowSegmented label="Estimated drop size" value={form.estItems} onChange={v => update({ estItems: v })} options={['Light (1-4)', 'Mixed (5-15)', 'Wardrobe (15+)']} />
          </>
        )}
        {step === 1 && (
          <>
            <FlowInput label="Mobile" value={form.phone} onChange={v => update({ phone: v })} placeholder="+971 50 ___ ____" type="tel" autoFocus />
            <FlowToggleRow label="WhatsApp on this number" value={form.whatsappOk} onChange={v => update({ whatsappOk: v })} />
            <FlowInput label="Email" value={form.email} onChange={v => update({ email: v })} placeholder="name@email.com" type="email" />
            <div style={{ height: 0.5, background: 'var(--endless-linen-200)', margin: '4px 0 18px' }} />
            <FlowSegmented label="Pickup area" value={form.pickupArea} onChange={v => update({ pickupArea: v })} options={['Marina', 'JVC', 'Jumeirah', 'Downtown', 'The Palm', 'DIFC', 'Mirdif', 'Other']} />
            <FlowInput label="Address" value={form.pickupAddress} onChange={v => update({ pickupAddress: v })} placeholder="Building, apartment, villa…" />
            <FlowInput label="Pickup date" value={form.pickupDate} onChange={v => update({ pickupDate: v })} placeholder="e.g. 14 Mar 2026" hint="Leave blank if scheduling later." />
          </>
        )}
        {step === 2 && (
          <>
            <FlowSegmented label="Consigner" value={form.consigner} onChange={v => update({ consigner: v })} options={['Diana', 'Rosie', 'Maya', 'Lubna']} />
            <FlowTextarea label="Internal notes" value={form.notes} onChange={v => update({ notes: v })} placeholder="Anything the team should know - preferences, sensitivities, prior history…" rows={4} />
            <div style={{ marginTop: 8, padding: 14, background: 'var(--endless-linen-100)', border: '0.5px solid var(--endless-linen-200)', borderRadius: 12 }}>
              <Eyebrow style={{ marginBottom: 8 }}>Summary</Eyebrow>
              <SummaryRow label="Name" value={form.name || '-'} />
              <SummaryRow label="Source" value={form.source + (form.source === 'Referral' && form.referredBy ? ` · ${form.referredBy}` : '')} />
              <SummaryRow label="Pickup" value={`${form.pickupArea}${form.pickupAddress ? ' · ' + form.pickupAddress : ''}`} />
              <SummaryRow label="Date" value={form.pickupDate || 'Not scheduled'} />
              <SummaryRow label="Consigner" value={form.consigner} last />
            </div>
          </>
        )}
      </div>

      <FlowFooter>
        <div style={{ flex: 1 }} />
        {step < totalSteps - 1 ? (
          <PrimaryBtn onClick={next} disabled={!canAdvance}>
            Continue
            <svg width="14" height="10" viewBox="0 0 14 10"><path d="M1 5h12m-4-4l4 4-4 4" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </PrimaryBtn>
        ) : (
          <PrimaryBtn onClick={submit}>
            Create client
          </PrimaryBtn>
        )}
      </FlowFooter>
    </FlowSheet>
  );
}

function FlowToggleRow({ label, value, onChange }) {
  return (
    <button onClick={() => onChange(!value)} style={{
      width: '100%', textAlign: 'left', border: 0, background: 'transparent',
      padding: '8px 0', display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', marginBottom: 12,
    }}>
      <div style={{ flex: 1, fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--endless-noir)' }}>{label}</div>
      <div style={{
        width: 38, height: 22, borderRadius: 999, padding: 2, boxSizing: 'border-box',
        background: value ? 'var(--endless-noir)' : 'var(--endless-linen-300)',
        transition: 'background 220ms var(--ease-out)',
      }}>
        <div style={{
          width: 18, height: 18, borderRadius: 999, background: 'var(--endless-ivory)',
          transform: `translateX(${value ? 16 : 0}px)`,
          transition: 'transform 220ms var(--ease-out)',
        }} />
      </div>
    </button>
  );
}

function SummaryRow({ label, value, last }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'flex-start', gap: 12, padding: '7px 0',
      borderBottom: last ? 0 : '0.5px solid var(--endless-linen-200)',
    }}>
      <div style={{ fontSize: 11, color: 'var(--endless-linen-600)', width: 70, flexShrink: 0, fontFamily: 'var(--font-sans)' }}>{label}</div>
      <div style={{ flex: 1, fontSize: 13, color: 'var(--endless-noir)', fontFamily: 'var(--font-sans)' }}>{value}</div>
    </div>
  );
}

// ─── ADD ITEM FLOW ─────────────────────────────────────────────────────
// Step 0: Capture/upload photos
// Step 1: Identify (brand, name, type, category)
// Step 2: Specs (size, colour, condition, shopping type, prices)
// Step 3: Description + review

function AddItemFlow({ client, onClose, onCreate }) {
  const [step, setStep] = nfUseState(0);
  const [form, setForm] = nfUseState({
    photos: [],
    brand: '',
    name: '',
    type: 'Clothing',
    category: '',
    size: '',
    colour: '',
    condition: 'Pre-loved',
    shoppingType: 'SELL',
    price: '',
    rrp: '',
    desc: '',
  });
  const update = (patch) => setForm(f => ({ ...f, ...patch }));

  const totalSteps = 4;
  const next = () => setStep(s => Math.min(s + 1, totalSteps - 1));
  const back = () => step > 0 ? setStep(s => s - 1) : onClose();

  const canAdvance =
    step === 0 ? form.photos.length > 0 :
    step === 1 ? form.brand.length > 0 && form.name.length > 0 :
    step === 2 ? form.size.length > 0 && form.price.length > 0 :
    true;

  const submit = () => {
    onCreate({
      id: 'new-' + Date.now(),
      name: form.name,
      brand: form.brand,
      type: form.type,
      category: form.category || (form.type === 'Clothing' ? 'Dresses' : form.type === 'Shoe' ? 'Heels' : 'Bags'),
      size: form.size,
      colour: form.colour,
      condition: form.condition,
      shoppingType: form.shoppingType,
      price: parseInt(form.price, 10) || 0,
      rrp: parseInt(form.rrp, 10) || 0,
      desc: form.desc,
      status: 'review',
      _photos: form.photos,
    });
  };

  return (
    <FlowSheet onClose={onClose} top={50}>
      <FlowHeader
        onBack={back} onClose={onClose}
        eyebrow={`Adding to ${client.name} · Step ${step + 1} of ${totalSteps}`}
        title={
          step === 0 ? 'Capture photos' :
          step === 1 ? 'Identify the piece' :
          step === 2 ? 'Specs & pricing' :
          'Describe & review'
        }
        step={step + 1}
        totalSteps={totalSteps}
      />

      <div style={{ flex: 1, overflow: 'auto' }}>
        {step === 0 && <PhotoStep photos={form.photos} onChange={p => update({ photos: p })} />}
        {step === 1 && (
          <div style={{ padding: '20px 16px 16px' }}>
            <FlowInput label="Brand" value={form.brand} onChange={v => update({ brand: v })} placeholder="e.g. Self-Portrait" autoFocus />
            <FlowInput label="Item name" value={form.name} onChange={v => update({ name: v })} placeholder="e.g. Beth Tweed Mini Dress" hint="Short, descriptive - buyers search by these words." />
            <FlowSegmented label="Type" value={form.type} onChange={v => update({ type: v })} options={['Clothing', 'Shoe', 'Accessory']} />
            <FlowInput label="Category" value={form.category} onChange={v => update({ category: v })} placeholder={form.type === 'Clothing' ? 'Dresses, Knitwear, Outerwear…' : form.type === 'Shoe' ? 'Heels, Flats, Boots…' : 'Bags, Jewellery, Scarves…'} />
          </div>
        )}
        {step === 2 && (
          <div style={{ padding: '20px 16px 16px' }}>
            <FlowInput label="Size" value={form.size} onChange={v => update({ size: v })} placeholder={form.type === 'Shoe' ? 'EU 38' : form.type === 'Clothing' ? 'UK 8' : 'One size'} autoFocus />
            <FlowInput label="Colour" value={form.colour} onChange={v => update({ colour: v })} placeholder="Powder blue" />
            <FlowSegmented label="Condition" value={form.condition} onChange={v => update({ condition: v })} options={['New with tags', 'Pre-loved', 'Vintage']} />
            <FlowSegmented label="Shopping type" value={form.shoppingType} onChange={v => update({ shoppingType: v })} options={['SELL', 'RENT', 'SELL & RENT']} />
            <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
              <FlowInput label="Price (AED)" value={form.price} onChange={v => update({ price: v.replace(/[^\d]/g,'') })} placeholder="0" type="text" />
              <FlowInput label="RRP (AED)" value={form.rrp} onChange={v => update({ rrp: v.replace(/[^\d]/g,'') })} placeholder="0" type="text" hint="Original retail price." />
            </div>
            {form.price && form.rrp && parseInt(form.rrp,10) > 0 && (
              <div style={{ marginTop: 4, padding: 12, background: 'var(--endless-linen-100)', border: '0.5px solid var(--endless-linen-200)', borderRadius: 10, fontSize: 12, color: 'var(--endless-linen-700)', fontFamily: 'var(--font-sans)' }}>
                Listing at <strong style={{ color: 'var(--endless-noir)' }}>{Math.round(100 - (parseInt(form.price,10) / parseInt(form.rrp,10)) * 100)}% off RRP</strong> - Endless suggests 50-70% for pre-loved.
              </div>
            )}
          </div>
        )}
        {step === 3 && (
          <div style={{ padding: '20px 16px 16px' }}>
            <FlowTextarea label="Description" value={form.desc} onChange={v => update({ desc: v })} placeholder="Worn twice. Notes on fit, fabric, provenance…" rows={4} />
            <button style={{
              width: '100%', padding: '11px 14px', borderRadius: 10,
              border: '0.5px dashed var(--endless-linen-300)', background: 'transparent',
              color: 'var(--endless-linen-700)', fontFamily: 'var(--font-sans)', fontSize: 12,
              fontWeight: 500, letterSpacing: '0.04em', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
              marginTop: -4, marginBottom: 18,
            }}>
              <svg width="12" height="12" viewBox="0 0 12 12"><path d="M2 6h8M6 2v8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>
              Suggest with AI
            </button>

            <div style={{ background: 'var(--endless-ivory)', border: '0.5px solid var(--endless-linen-200)', borderRadius: 12, overflow: 'hidden' }}>
              <div style={{ display: 'flex', gap: 6, padding: 10, overflowX: 'auto', scrollbarWidth: 'none' }}>
                {form.photos.map((p, i) => (
                  <div key={i} style={{ width: 60, height: 75, borderRadius: 4, background: p, backgroundSize: 'cover', backgroundPosition: 'center', flexShrink: 0 }} />
                ))}
              </div>
              <div style={{ padding: '12px 14px', borderTop: '0.5px solid var(--endless-linen-200)' }}>
                <Eyebrow style={{ marginBottom: 4 }}>{form.brand || 'Brand'}</Eyebrow>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, color: 'var(--endless-noir)', letterSpacing: '-0.01em' }}>{form.name || 'Item name'}</div>
                <div style={{ display: 'flex', gap: 10, marginTop: 8, flexWrap: 'wrap' }}>
                  <Tag>{form.type}</Tag>
                  {form.size && <Tag>{form.size}</Tag>}
                  {form.colour && <Tag>{form.colour}</Tag>}
                  <Tag>{form.condition}</Tag>
                  <Tag accent>{form.shoppingType}</Tag>
                </div>
                <div style={{ marginTop: 10, display: 'flex', alignItems: 'baseline', gap: 8 }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--endless-noir)', letterSpacing: '-0.01em' }}>AED {form.price || '0'}</div>
                  {form.rrp && <div style={{ fontSize: 12, color: 'var(--endless-linen-500)', textDecoration: 'line-through' }}>AED {form.rrp}</div>}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <FlowFooter>
        {step === totalSteps - 1 && (
          <SecondaryBtn onClick={() => setStep(0)}>Edit</SecondaryBtn>
        )}
        <div style={{ flex: 1 }} />
        {step < totalSteps - 1 ? (
          <PrimaryBtn onClick={next} disabled={!canAdvance}>
            Continue
            <svg width="14" height="10" viewBox="0 0 14 10"><path d="M1 5h12m-4-4l4 4-4 4" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </PrimaryBtn>
        ) : (
          <PrimaryBtn onClick={submit}>
            Send to review
          </PrimaryBtn>
        )}
      </FlowFooter>
    </FlowSheet>
  );
}

function Tag({ children, accent }) {
  return (
    <span style={{
      padding: '4px 9px', borderRadius: 999,
      border: '0.5px solid ' + (accent ? 'var(--endless-noir)' : 'var(--endless-linen-300)'),
      background: accent ? 'var(--endless-noir)' : 'transparent',
      color: accent ? 'var(--endless-ivory)' : 'var(--endless-linen-700)',
      fontFamily: 'var(--font-sans)', fontSize: 10, fontWeight: accent ? 600 : 500,
      letterSpacing: accent ? '0.1em' : '0.02em',
      textTransform: accent ? 'uppercase' : 'none',
    }}>{children}</span>
  );
}

// Photo step: simulated capture surface - top "viewfinder" + bottom thumbnails
function PhotoStep({ photos, onChange }) {
  const [capturing, setCapturing] = nfUseState(false);
  const palettes = [
    ['#E8DFD2', '#C9B79C', '#A48868'],
    ['#EFE7DC', '#D7C7B5', '#B59E83'],
    ['#E2D9CB', '#BFAE96', '#8E7659'],
    ['#F1ECE2', '#D8CDB7', '#A89878'],
    ['#E5DBCB', '#C8B59A', '#9C8262'],
    ['#EEE3D2', '#D2BC9E', '#9B7F5F'],
  ];
  const fakePhoto = (i) => {
    const p = palettes[i % palettes.length];
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 500' preserveAspectRatio='xMidYMid slice'>
      <defs><radialGradient id='g${i}' cx='${30 + (i*20)%40}%' cy='${20 + (i*15)%40}%' r='90%'>
        <stop offset='0%' stop-color='${p[0]}'/><stop offset='60%' stop-color='${p[1]}'/><stop offset='100%' stop-color='${p[2]}'/>
      </radialGradient></defs>
      <rect width='400' height='500' fill='url(#g${i})'/>
    </svg>`;
    return `url("data:image/svg+xml;utf8,${encodeURIComponent(svg)}")`;
  };

  const capture = () => {
    if (capturing) return;
    setCapturing(true);
    setTimeout(() => {
      onChange([...photos, fakePhoto(photos.length)]);
      setCapturing(false);
    }, 350);
  };

  const remove = (i) => onChange(photos.filter((_, j) => j !== i));

  const guidanceFor = photos.length;
  const guidance = [
    'Front, full length - good lighting',
    'Back of the piece',
    'Detail (fabric, label, hardware)',
    'Any flaws - be honest',
    'Optional: in motion / on body',
    'Looks great. Add more or continue.',
  ][Math.min(guidanceFor, 5)];

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {/* Viewfinder */}
      <div style={{
        margin: '16px 16px 12px',
        height: 360,
        borderRadius: 12, overflow: 'hidden',
        background: photos.length === 0 ? '#1C1C18' : 'var(--endless-linen-100)',
        position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {photos.length > 0 ? (
          <div style={{
            position: 'absolute', inset: 0,
            background: photos[photos.length - 1], backgroundSize: 'cover', backgroundPosition: 'center',
            filter: 'brightness(0.95)',
          }} />
        ) : (
          <>
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(60% 60% at 50% 40%, rgba(255,255,255,0.04), transparent 70%)' }} />
            <div style={{ color: 'rgba(250,250,245,0.5)', fontFamily: 'var(--font-sans)', fontSize: 13, letterSpacing: '0.04em' }}>
              Camera preview
            </div>
          </>
        )}
        {/* Crosshair guides */}
        <svg style={{ position: 'absolute', inset: 0, opacity: 0.18 }} viewBox="0 0 100 100" preserveAspectRatio="none">
          <line x1="33" y1="0" x2="33" y2="100" stroke="white" strokeWidth="0.2" vectorEffect="non-scaling-stroke" />
          <line x1="66" y1="0" x2="66" y2="100" stroke="white" strokeWidth="0.2" vectorEffect="non-scaling-stroke" />
          <line x1="0" y1="33" x2="100" y2="33" stroke="white" strokeWidth="0.2" vectorEffect="non-scaling-stroke" />
          <line x1="0" y1="66" x2="100" y2="66" stroke="white" strokeWidth="0.2" vectorEffect="non-scaling-stroke" />
        </svg>
        {capturing && (
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.7)', animation: 'cc-fade 350ms var(--ease-out)' }} />
        )}
        {/* Counter */}
        <div style={{
          position: 'absolute', top: 12, left: 12,
          padding: '5px 10px', borderRadius: 999,
          background: 'rgba(20,18,14,0.6)', backdropFilter: 'blur(8px)',
          color: 'rgba(255,255,255,0.95)',
          fontFamily: 'var(--font-sans)', fontSize: 10, fontWeight: 500,
          letterSpacing: '0.08em', textTransform: 'uppercase',
          display: 'flex', alignItems: 'center', gap: 6,
        }}>
          <span style={{ width: 5, height: 5, borderRadius: 999, background: '#E04878' }} />
          {photos.length} / 6
        </div>
      </div>

      {/* Guidance */}
      <div style={{ textAlign: 'center', padding: '0 24px', marginBottom: 16 }}>
        <Eyebrow>Shot {Math.min(photos.length + 1, 6)} of 6</Eyebrow>
        <div style={{ marginTop: 6, fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--endless-noir)' }}>{guidance}</div>
      </div>

      {/* Capture row */}
      <div style={{ padding: '0 24px 16px', display: 'flex', alignItems: 'center', gap: 16, justifyContent: 'center' }}>
        <button title="Upload" style={{
          width: 44, height: 44, borderRadius: 12, border: '0.5px solid var(--endless-linen-300)',
          background: 'var(--endless-ivory)', cursor: 'pointer', padding: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="18" height="18" viewBox="0 0 18 18">
            <rect x="2" y="4" width="14" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.2" fill="none"/>
            <circle cx="6" cy="8" r="1.2" stroke="currentColor" strokeWidth="1" fill="none"/>
            <path d="M2 12l4-3 3 2 3-2 4 3" stroke="currentColor" strokeWidth="1.2" fill="none"/>
          </svg>
        </button>
        <button onClick={capture} disabled={photos.length >= 6} style={{
          width: 64, height: 64, borderRadius: 999, padding: 0, cursor: 'pointer',
          border: '2px solid var(--endless-noir)', background: 'transparent',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          opacity: photos.length >= 6 ? 0.4 : 1,
        }}>
          <div style={{ width: 50, height: 50, borderRadius: 999, background: 'var(--endless-noir)' }} />
        </button>
        <button title="Flip" style={{
          width: 44, height: 44, borderRadius: 12, border: '0.5px solid var(--endless-linen-300)',
          background: 'var(--endless-ivory)', cursor: 'pointer', padding: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="18" height="18" viewBox="0 0 18 18">
            <path d="M3 7a6 6 0 0 1 11 1M15 11a6 6 0 0 1-11-1" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
            <path d="M14 5v3h-3M4 13v-3h3" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Thumbnail strip */}
      {photos.length > 0 && (
        <div style={{ padding: '0 16px 20px', display: 'flex', gap: 6, overflowX: 'auto', scrollbarWidth: 'none' }}>
          {photos.map((p, i) => (
            <div key={i} style={{ position: 'relative', width: 64, height: 80, flexShrink: 0 }}>
              <div style={{
                width: '100%', height: '100%', borderRadius: 6,
                background: p, backgroundSize: 'cover', backgroundPosition: 'center',
                border: '0.5px solid var(--endless-linen-200)',
              }} />
              <button onClick={() => remove(i)} style={{
                position: 'absolute', top: -6, right: -6, width: 18, height: 18, borderRadius: 999,
                border: 0, background: 'var(--endless-noir)', color: 'var(--endless-ivory)',
                cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="8" height="8" viewBox="0 0 8 8"><path d="M1.5 1.5l5 5M6.5 1.5l-5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
              </button>
              <div style={{ position: 'absolute', top: 4, left: 4, padding: '1px 5px', borderRadius: 999, background: 'rgba(20,18,14,0.7)', color: 'white', fontSize: 9, fontFamily: 'var(--font-sans)', fontWeight: 500 }}>{i+1}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

Object.assign(window, { NewClientFlow, AddItemFlow });
