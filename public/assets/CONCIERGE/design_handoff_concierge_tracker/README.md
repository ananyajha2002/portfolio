# Handoff: Endless Concierge Tracker

## Overview

The **Endless Concierge Tracker** is a mobile-first internal tool used by Endless ops team members in Dubai to manage clients listing items through the concierge service. Ops teams collect garments from clients, photograph each item, then review, price, and approve them for sale or rent on the Endless platform.

The tool replaces a sprawling multi-sheet Excel workbook (the "Concierge Master Sheet"). Real ops actions modeled here: navigate clients → items → item detail; approve / reject items (with note); inline-edit any field; move approved items to "Live on Endless"; add internal team notes; bulk-select and act on multiple items; filter and search.

## About the Design Files

The files in this bundle are **design references created in HTML/JSX prototypes** — they show intended look, copy, layout, and behavior, not production code to ship. The task is to **recreate these designs in the target codebase's existing environment** (likely React Native or a React web app for an internal tool, or whatever framework the Endless team prefers) using its established patterns, design tokens, and component libraries.

If no environment exists, React + Tailwind (or React Native with NativeWind) is a sensible default given the design system already lives in CSS custom properties.

## Fidelity

**High-fidelity.** Final colors, typography, spacing, copy, and interactions are all intentional. Recreate pixel-perfectly using the codebase's existing primitives. The brand system (`colors_and_type.css`) is included and should be the source of truth for design tokens.

## Screens / Views

The app is a single-stack mobile flow with three views and one overlay:

### 1. Client List (`view.kind === 'list'`)

**Purpose:** Triage all concierge clients in the pipeline at a glance — who's new, who's mid-review, who's ready to list, who's already live.

**Layout:**
- Sticky top bar (52px top padding for iOS status bar, 14px bottom) with the Endless brand mark (18px tall) on the left, "+ New" pill button on the right (36×36, circular), eyebrow caption (`{n} clients · {n} items in pipeline`), and a large display heading "Concierge" in Meno Banner 32px.
- Search input (full-width, 10px radius, 0.5px linen-300 border, 32px left padding for inline search icon).
- Horizontal filter chip row: All / New / In review / Ready / Live. Each chip shows label + count. Active chip is filled noir with ivory text.
- Vertical stack of client cards, 8px gap, 16px horizontal padding.

**Client card components:**
- 14×16 padding, ivory bg, 0.5px linen-200 border, 12px radius.
- Top row: 40×40 circular initials avatar (linen-100 bg, Meno Banner 14px), client name (Meno Banner 19px, proper case), pickup location + date row (12px linen-600), and right-aligned status row (status dot + label, AED estimated value below).
- Bottom row: 2px-tall progress bar (`reviewed / total` items) and "{X}/{Y} items" label.
- Progress bar fill is noir except for `live` clients which fill rosette.

### 2. Client Detail (`view.kind === 'client'`)

**Purpose:** Photo grid of every item submitted by one client, with bulk operations.

**Layout:**
- Top bar with Back chevron ("Back" link, 13px linen-700), brand mark hidden, eyebrow `{location} · pickup {date}`, large heading is the client's full name in Meno Banner 32px. "Select" toggle on the right (turns rosette + reads "Done" while selecting).
- Stats strip: Items / Approved / Est. value, separated by hairline dividers. Stat values use Meno Banner 22px (17px for the AED string).
- Filter chip row: All / Pending / In review / Approved / Rejected / Live (chips with count of 0 are hidden, except "All").
- 2-column photo grid, 10px gap, 16px horizontal padding.

**Item card components:**
- 4:5 aspect-ratio photo container, 4px radius, linen-100 bg.
- Status badge in top-left of photo: pill, ivory bg with 0.5px noir border, status dot + label in 10px sans uppercase letter-spacing 0.06em.
- Selection checkbox in top-right when in select mode (22×22 circle, fills noir when selected).
- Below photo: brand in 10px linen-500 tracked uppercase, item name in 13px noir, then size · price row in 11px linen-600.
- "Awaiting photos" placeholder card: linen-100 bg, centered camera icon (24px, linen-400), "awaiting photos" caption.

**Bulk action bar (when selecting):**
- Pinned to bottom of device frame (above home indicator), 12×16 padding.
- Backdrop-blurred ivory bg, 0.5px linen-200 top border.
- "{n} selected" label on left, Reject (outlined noir) + Approve (filled noir) CTAs on right. Disabled at 0.4 opacity when nothing selected.

### 3. Item Detail (`view.kind === 'item'`)

**Purpose:** Full editing surface for one item. Opens as a bottom-sheet over the Client Detail view.

**Pattern:** Bottom-sheet modal — `position: absolute; left: 0; right: 0; bottom: 0; top: 80`. Slides up from below with `cc-slide-up` 320ms ease-out. Scrim is `rgba(20,18,14,0.4)`, dismissible by tap.

**Layout (top to bottom):**
- Drag handle (36×4 linen-300 pill, centered, 8px top padding).
- Close button (X icon, 14×14, linen-700) on left; current status badge (`size="lg"`) on right.
- **Photo gallery:** horizontal scroll-snap row of 4 photos per item, each `width: 100% - 16px; height: 380px; object-fit: cover; border-radius: 4px`. Page-dot indicator below (active dot is 16px wide, others 4px).
- Title block: 14×20 padding, eyebrow with brand name, then item name in Meno Banner 26px (proper case).
- **Shopping type pills:** segmented row of 3 — `SELL` / `RENT` / `SELL & RENT` — uppercase 10px tracked 0.12em, active is noir-filled.
- **Price block:** two side-by-side numeric inputs — Price (AED) and RRP (AED). Both Meno Banner 22px, ivory bg, 0.5px linen-200 border, 10px radius. RRP renders in linen-500 (visually muted, since it's reference).
- **Field card** (ivory, 0.5px linen-200, 12px radius, hairline-separated rows):
  - Brand (text, tap to inline-edit)
  - Type (segmented: Clothing / Shoe / Accessory)
  - Category (text, inline-edit)
  - Size (text, inline-edit)
  - Colour (text, inline-edit)
  - Condition (segmented: New with tags / Pre-loved / Vintage)
- **Description:** 4-row textarea, ivory bg, 0.5px linen-200 border, 12px radius.
- **Internal notes:** collapsible. Header reads "Internal notes" eyebrow + "+ Add note" affordance. Expanded shows one mock prior note (Rosie · yesterday) and a 2-row textarea for new notes.

**Sticky action bar (bottom of sheet):**
- Backdrop-blurred ivory bg, 12×16 padding (20 bottom for safe-area).
- Default state: Reject (outlined noir) + Approve (filled noir, flex 1.4 — slightly wider).
- Approved state: Reopen (outlined) + "Move to Live →" (filled rosette).
- Live state: Reopen (outlined) + "Live on Endless" (rosette-outlined chip with dot).
- Reject flow: tapping Reject swaps the action bar for an inline rejection-note input + Reject confirm button.

## Interactions & Behavior

**Navigation:** Single React state machine — `view = { kind: 'list' | 'client' | 'item', clientId?, itemId? }`. No URL routing in the prototype (would map cleanly to `/clients`, `/clients/:id`, `/clients/:id/items/:itemId` in a real app).

**Item updates:** All field edits, status changes, and shopping-type changes call a single `updateItem(clientId, itemId, patch)` reducer that merges the patch and recomputes the rolled-up client status (see "State Management").

**Inline field editing:** Tap a row → the value swaps for an autofocused input with a noir 0.5px border. Commits on Enter or blur.

**Filtering & search:** Pure client-side. Search matches `name` or `pickup` substrings, case-insensitive. Filter chips are mutually exclusive radio behavior.

**Bulk select:** "Select" header toggle exposes circular checkboxes on every item card. The bulk action bar slides in. Approve/Reject apply to all selected items at once via the same `updateItem` reducer.

**Animations:**
- Bottom sheet: `cc-slide-up` (translateY 100% → 0, 320ms ease-out).
- Scrim: `cc-fade` (opacity 0 → 1, 220ms ease-out).
- Status badge updates: instantaneous (no transition needed).
- Filter chip activation: instantaneous.
- Progress bar: `width 0.4s var(--ease-out)`.
- Page dots: `width 0.22s var(--ease-out)`.

**Shopping type semantics:**
- `SELL` — item is sold outright.
- `RENT` — item rents per occasion.
- `SELL & RENT` — both available simultaneously.

## State Management

```typescript
type Item = {
  id: string;
  name: string;
  brand: string;
  type: 'Clothing' | 'Shoe' | 'Accessory';
  category: string;
  size: string;
  colour: string;
  condition: 'New with tags' | 'Pre-loved' | 'Vintage';
  shoppingType: 'SELL' | 'RENT' | 'SELL & RENT';
  price: number;        // AED
  rrp: number;          // AED
  status: 'pending' | 'review' | 'approved' | 'rejected' | 'live';
  desc?: string;
  rejectNote?: string;
  placeholder?: boolean; // "awaiting photos" empty state
};

type Client = {
  id: string;
  name: string;
  initials: string;
  pickup: string;        // full address
  pickupShort: string;   // neighborhood label
  pickupDate: string;
  status: 'new' | 'review' | 'ready' | 'live';
  estValue: number;      // AED
  items: Item[];
};
```

**Client status rollup logic (`rolledStatus(items)` in app.jsx):**
- All items `live` → `live`.
- All items reviewed (approved/rejected/live) → `ready`.
- Any item touched (not pending) → `review`.
- Else → `new`.

This recomputes on every item update so the client list reflects reality.

## Design Tokens

All tokens live in `colors_and_type.css` as CSS custom properties. Lift them into the target codebase's token system — do not duplicate values inline.

**Brand colors:**
- `--endless-noir: #000000` — primary text & UI accents
- `--endless-ivory: #FFFFFF` — primary surface
- `--endless-linen: #E0E0D8` — warm neutral surface
- `--endless-rosette: #E04878` — signature pink, accent (used for "Live on Endless" only — restraint is intentional)
- `--endless-tangerine: #E05028` — secondary accent (warm orange-red)

**Linen scale (warm neutral):** 50 `#FAFAF5` · 100 `#F3F2EC` · 200 `#E0E0D8` · 300 `#C9C8BE` · 400 `#A8A79C` · 500 `#7A7970` · 600 `#55554F` · 700 `#35352F` · 800 `#1C1C18` · 900 `#0A0A08`.

**Status colors:**
- pending → linen-500 dot
- review → tangerine dot
- approved → success `#3F7D5E`
- rejected → noir
- live → rosette

**Typography:**
- `--font-display`: "Meno Banner" (serif, brand voice). Used at 19px (client name), 22px (stats), 26px (item name in detail), 32px (page title).
- `--font-sans`: "DM Sans". Used for all body, labels, eyebrows, CTAs.
- **Bold 700 is reserved for CTAs only** and must be uppercase tracked 0.12–0.14em.
- **Eyebrow:** 10px DM Sans medium, tracking 0.18em, uppercase, linen-500.

**Spacing:** 4-based scale. Common values used: 4, 6, 8, 10, 12, 14, 16, 20, 24, 32.

**Radii:** 4 (photo cards) · 8 (chips inside cards) · 10 (inputs) · 12 (cards & field groups) · 20 (bottom sheet top corners) · 999 (pills, dots, avatars).

**Borders:** Almost always `0.5px solid var(--endless-linen-200)` or `var(--endless-linen-300)`. Hairlines, not visible chrome.

**Shadows:** Restraint. The bottom sheet uses `0 -10px 40px rgba(0,0,0,0.15)`. Cards rely on borders, not shadows.

**Motion:**
- `--ease-out: cubic-bezier(0.22, 0.61, 0.36, 1)` — default for all transitions.
- Durations: 120ms (fast), 220ms (base), 420ms (slow).

## Assets

- `assets/brand-mark-noir.png` — square brand mark used in the top-left of the Client List header (18px tall). Replace with the codebase's existing brand asset import.
- `fonts/MenoBanner-Regular.otf` — bundled display font. Self-host or use the team's existing font pipeline.
- **Item photos:** the prototype generates SVG placeholder gradients via `photoFor(itemId, idx)` in `data.jsx`. In production, items have 4 hi-res photographs taken in-house by the Endless team — wire to the actual photo CDN and render a hero photo on cards plus a 4-photo gallery in the detail sheet.

## Files

- **`Concierge.html`** — entry point. Loads React, Babel, all JSX modules, and renders `<App />`. Contains the `TWEAK_DEFAULTS` block and the iOS-frame wrapper. Reproduce its routing logic in the target framework.
- **`app.jsx`** — `TopBar`, `ClientList`, `ClientRow`, `ClientDetail`, `ItemCard`, `Stat`, `StatusBadge`, `StatusDot`, `Eyebrow`, helper functions `fmtAED` and `rolledStatus`.
- **`item-detail.jsx`** — `ItemDetail` bottom-sheet, `Field` (inline-editable row, segmented variant), `PriceField`.
- **`data.jsx`** — `SEED_CLIENTS` (9 realistic clients with mixed-status items, drawn from the actual Concierge Master Sheet), `STATUS_META`, `CLIENT_STATUS_META`, `photoFor()` placeholder generator.
- **`colors_and_type.css`** — full Endless design system. **Source of truth** for tokens.
- **`ios-frame.jsx`** — iOS device frame used for the prototype demo. Drop in production; use the target platform's safe-area handling instead.
- **`tweaks-panel.jsx`** — design-time tweak panel. Drop in production.

## Recommended implementation notes

1. The bottom sheet should use the platform-native presentation: `react-native-bottom-sheet` (RN), Radix `Dialog` with custom slide-from-bottom (web), or platform sheet primitives.
2. Status badges and filter chips are good candidates for a single shared `<Pill>` primitive with `variant` and `tone` props.
3. The "rolledStatus" function should live in shared business logic (not the UI layer) since it's likely needed server-side too.
4. Inline-edit pattern (tap row → swap to input) is reusable — extract a `<EditableField>` component.
5. The "awaiting photos" placeholder is a real ops state (clients before photographer visits) — model it explicitly in the data layer, not as a UI fallback.
