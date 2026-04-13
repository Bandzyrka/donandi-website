# Fix 04: Visual Authenticity

## Impeccable Command
`/impeccable:bolder` - Replace generic visuals with authentic brand imagery

## Priority: P2

## Target Files
- `src/sections/Hero.tsx`
- `src/sections/About.tsx`

---

## Problem

The site uses placeholder-quality visuals that undermine the "trustworthy partner" brand:

1. **Hero illustration**: Inline SVG of two people at a desk looks like a wireframe mockup
2. **About section photo**: Generic Unsplash people high-fiving - disconnected from brand

For an accounting firm under Fundacja Donandi's patronage, authenticity matters more than decoration.

---

## Fix A: Hero Visual

### Option 1: Remove Illustration Entirely
Replace the complex SVG with a simpler, more confident visual:
- Fundacja Donandi logo mark
- Abstract geometric pattern in brand colors
- Just whitespace (let the copy breathe)

### Option 2: Simple Icon Composition
Instead of "two people at desk" illustration:
- Clean icons: document + shield + checkmark
- Represents: paperwork + security + done

### Option 3: Photography (if available)
Real photo of team or office (must be actual, not stock)

**Implementation:**
```jsx
// Remove the FloatingCard and complex SVG
// Replace with simpler, confident visual
<div className="relative">
  {/* Simple geometric shape or brand mark */}
</div>
```

---

## Fix B: About Section Photo

### Option 1: Remove Stock Photo
If no real team photos available, remove entirely. White space > fake trust.

### Option 2: Replace with Brand Visual
- Fundacja Donandi imagery
- Office photo (if real)
- Team photo (if real)

### Option 3: Abstract Visual
Geometric pattern or illustration that represents values without pretending to be real people.

**Current code to modify:**
Look for `<img>` or background image in About.tsx and either:
1. Remove the image container
2. Replace src with authentic imagery
3. Use CSS pattern/gradient as placeholder

---

## Visual Notes

- The Fundacja Donandi connection is mentioned but not shown - this is a missed opportunity
- If real photos aren't available, abstraction is more honest than stock
- Consider adding Fundacja Donandi logo/badge prominently

---

## Validation
Ask: "Does this look like a real company or a template?" The answer should be "real company."
