# Fix 01: Accessibility & Contrast

## Impeccable Command
`/impeccable:audit` - Accessibility and contrast fixes

## Priority: P1 (Critical)

## Target Files
- `src/sections/Contact.tsx`
- `src/sections/Footer.tsx`
- `src/index.css`

---

## Issues to Fix

### A. Low Contrast Text (WCAG 4.5:1 Failure)

**Contact.tsx line ~241, ~254:**
```
text-slate-600 on bg-blue-700
```
**Fix:** Replace with `text-white` or `text-blue-50`

**Footer.tsx line ~183:**
```
text-slate-400 on dark background
```
**Fix:** Replace with `text-slate-300` or lighter

### B. Skipped Heading Level

**Contact.tsx:**
Current: h2 "Skontaktuj się z nami" followed by h4 "Usługi"
**Fix:** Change h4 to h3, maintain visual size with classes

### C. Line Length (Readability)

Several body text blocks exceed 80 characters per line.
**Fix:** Add `max-w-prose` (65ch) or `max-w-2xl` to long text containers

---

## Validation
After fixes, run:
```bash
npx impeccable --json src/sections/Contact.tsx src/sections/Footer.tsx
```
Expected: 0 `low-contrast` or `gray-on-color` findings
