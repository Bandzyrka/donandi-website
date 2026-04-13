# Fix 05: Layout & Decorative Cleanup

## Impeccable Command
`/impeccable:quieter` + `/impeccable:layout` - Remove AI-template decorations, improve service grid

## Priority: P2

## Target Files
- `src/sections/Hero.tsx`
- `src/sections/Services.tsx`
- `src/sections/WhyChooseUs.tsx`
- `src/sections/Contact.tsx`
- `src/index.css`

---

## A. Remove Decorative Elements

### Gradient Orbs
Find and remove all decorative blurred shapes:

```jsx
// Remove these patterns:
<div className="absolute ... bg-gradient-to-r ... blur-3xl opacity-20" />
<div className="absolute ... rounded-full ... blur-..." />
```

**Locations:**
- Hero.tsx - floating gradient shapes
- Contact.tsx - background decorations
- WhyChooseUs.tsx - accent shapes

These add no value and scream "AI template."

### Bounce/Elastic Animations
In `src/index.css`, find and remove or replace:
```css
/* Remove bounce easing */
cubic-bezier(0.68, -0.55, 0.265, 1.55)
```
Replace with subtle ease:
```css
cubic-bezier(0.4, 0, 0.2, 1)
```

### Glassmorphism Utilities
Remove unused `.glassmorphism` class from CSS if not actively used.

---

## B. Service Cards Layout

### Problem
9 identical cards overwhelm users. NGO/PES clients might not scroll past row one.

### Fix Options

**Option 1: Visual Grouping**
Add subtle section dividers:
```
[NGO & PES Services]
- Księgowość NGO
- Obsługa PES

[Core Accounting]  
- Księgowość pełna
- Księgowość uproszczona
- Kadry i płace
- Doradztwo podatkowe

[Specialized]
- Rozliczenia ZUS
- Sprawozdawczość
- Radca prawny
```

**Option 2: Reduce to 6 + "więcej"**
Show 6 most important, link to full list.

**Option 3: Tabbed/Filtered View**
Tabs: "Dla biznesu" | "Dla NGO/PES" | "Specjalistyczne"

---

## C. FloatingCard in Hero

The 3D rotating card with "Twój dedykowany księgowy" is unnecessary flourish.

**Options:**
1. Remove entirely
2. Simplify to static testimonial/stat
3. Replace with Fundacja Donandi badge

---

## Validation
After cleanup, run:
```bash
npx impeccable --json src/sections/
```
Expected: 0 `bounce-easing` or `dark-glow` findings
