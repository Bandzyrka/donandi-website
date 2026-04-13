# Fix 03: CTA Button Hierarchy

## Impeccable Command
`/impeccable:quieter` - Reduce visual noise from competing CTAs

## Priority: P2

## Target Files
- `src/sections/Hero.tsx`
- `src/sections/Services.tsx`
- `src/sections/About.tsx`
- `src/sections/WhyChooseUs.tsx`
- `src/sections/Testimonials.tsx`
- `src/sections/CTA.tsx`

---

## Problem

Every section has a primary-styled "contact us" button. When everything screams for attention, nothing gets it. Users experience decision fatigue.

**Current CTA distribution:**
- Hero: 2 buttons (primary + secondary) ✓ OK
- Services: "Zobacz, jak pomagamy" on each card + section CTA
- About: Primary CTA
- WhyChooseUs: Primary CTA
- Testimonials: Primary CTA
- CTA section: Primary CTA ✓ OK (this is THE call to action)
- Contact: Form submit ✓ OK

---

## Fix Strategy

### Keep Primary (filled, prominent):
1. **Hero** - "Umów bezpłatną konsultację" (first impression)
2. **CTA Section** - Final push before footer
3. **Contact** - Form submit

### Downgrade to Secondary (ghost/outline):
- **Services** section-level CTA → ghost button
- **About** CTA → ghost button or remove
- **WhyChooseUs** CTA → ghost button or remove
- **Testimonials** CTA → ghost button or remove

### Service Cards
Keep "Zobacz, jak pomagamy →" as text links (no button styling)

---

## Implementation

### Primary Button (keep for Hero, CTA section, Contact submit)
```jsx
className="bg-primary text-white px-6 py-3 rounded-lg font-medium"
```

### Secondary Button (ghost style)
```jsx
className="border border-primary text-primary px-6 py-3 rounded-lg font-medium hover:bg-primary/5"
```

### Text Link (for service cards)
```jsx
className="text-primary font-medium hover:underline inline-flex items-center gap-1"
```

---

## Validation
Scroll through page: Only 2-3 buttons should visually "pop" as primary actions.
