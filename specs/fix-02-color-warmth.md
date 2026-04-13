# Fix 02: Warmer Color Palette

## Impeccable Command
`/impeccable:colorize` - Shift from cold blue to warm, trustworthy palette

## Priority: P1

## Target Files
- `src/index.css` (CSS variables)
- `tailwind.config.js` (if custom colors defined)
- All section files for inline color updates

---

## Design Intent

**Current:** Saturated blue (#1E40AF / blue-700) dominates everything - feels AI-generated and cold
**Target:** Warm, grounded, trustworthy (ciepły, solidny, przejrzysty)

## Color Strategy

### Primary Action Color
**Current:** `bg-blue-600` / `bg-blue-700`
**New:** Warm blue or teal that still feels professional but less cold

Consider:
- `bg-blue-600` → `bg-sky-600` (warmer blue)
- Or introduce warm accent: `bg-amber-600` for CTAs
- Keep blue for trust, add warm gray tones to backgrounds

### Background Warmth
**Current:** Pure `bg-white`, `bg-slate-50`
**New:** Add subtle warmth:
- `bg-white` → `bg-stone-50` or `bg-neutral-50`
- `bg-slate-50` → `bg-warm-gray-50` (custom)

### Text Colors
**Current:** `text-slate-600`, `text-slate-900`
**New:** Consider `text-stone-700`, `text-neutral-900` for warmer feel

### Gradient Orbs (Remove)
Remove all decorative gradient shapes - they scream "AI template"

---

## Files to Update

### src/index.css
Define CSS custom properties for new palette:
```css
:root {
  --color-primary: /* warm blue or teal */;
  --color-primary-hover: /* darker variant */;
  --color-bg-warm: /* subtle warm white */;
}
```

### Section Files
Search and replace:
- `bg-blue-700` → new primary
- `bg-blue-600` → new primary
- `text-blue-600` → new primary text
- `border-blue-*` → new primary border
- Remove gradient orb divs entirely

---

## Reference
Look at infakt.pl - they use green as primary, warm whites, clear hierarchy without cold blue everywhere.

## Validation
Visual check: Does the site still feel like "every AI accounting site" or does it now have warmth?
