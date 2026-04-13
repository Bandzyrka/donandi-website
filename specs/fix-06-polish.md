# Fix 06: Final Polish

## Impeccable Command
`/impeccable:polish` - Minor fixes and consistency pass

## Priority: P3

## Target Files
- Various section files
- `src/index.css`

---

## Minor Fixes

### A. Empty Stats
**About.tsx:**
"100% Skoncentrowania na Twoim celu" is empty marketing-speak.

**Fix:** Replace with something concrete:
- "100% terminowości rozliczeń" (100% on-time filings)
- "0 kar skarbowych" (0 tax penalties)
- Or remove this stat entirely

### B. Unexplained Terms
NGO and PES might not be clear to all visitors.

**Fix:** Add brief explanatory text or tooltip:
- "NGO (organizacje pozarządowe)"
- "PES (Przedsiębiorstwa Ekonomii Społecznej)"

### C. Newsletter Headline Consistency
"Podatki po ludzku" is great warmth - this tone should appear elsewhere too.

**Review:** Does the headline copy match this warm tone throughout?

### D. Testimonial Authenticity
If testimonials use generic names (Anna Kowalska, etc.), either:
1. Use real client names with permission
2. Remove testimonials section
3. Replace with client logos if available

### E. Footer Heart Emoji
"Działamy pod patronatem Fundacji Donandi ❤️"

The heart feels slightly incongruous with professional tone.
**Consider:** Replace with proper Fundacja Donandi logo/icon

### F. Blog/Cennik Navigation
These nav items link to #blog and #pricing but scroll behavior may be unclear.

**Verify:** Smooth scroll works and sections are clearly marked when reached.

---

## Consistency Pass

After all other fixes, do a final pass:
1. All buttons use consistent border-radius
2. All cards use consistent shadow/border treatment
3. All section spacing is rhythmic (use consistent py-16/py-24)
4. All icons are same style (outline vs filled)
5. All link hover states are consistent

---

## Validation
Run full audit:
```bash
npx impeccable --json src/sections/
```
Expected: Clean or only intentional findings
