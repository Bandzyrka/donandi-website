# Design Fix Specs - Impeccable Critique Fixes

## Overview
6 fix specs addressing issues found in `/impeccable:critique` assessment.
Score before: **26/40** | Target: **32+/40**

---

## Fix Specs

| File | Area | Priority | Impeccable Command |
|------|------|----------|-------------------|
| `fix-01-accessibility.md` | Contrast, headings, line-length | **P1** | `/impeccable:audit` |
| `fix-02-color-warmth.md` | Warm palette shift | **P1** | `/impeccable:colorize` |
| `fix-03-cta-hierarchy.md` | Button competition | **P2** | `/impeccable:quieter` |
| `fix-04-visual-authenticity.md` | Placeholder images | **P2** | `/impeccable:bolder` |
| `fix-05-layout-cleanup.md` | Decorative removal, service grid | **P2** | `/impeccable:quieter` + `/impeccable:layout` |
| `fix-06-polish.md` | Minor fixes, consistency | **P3** | `/impeccable:polish` |

---

## Execution Order

### Phase 1: Critical (run in parallel)
- `fix-01-accessibility.md` - WCAG compliance
- `fix-02-color-warmth.md` - Palette foundation

### Phase 2: Visual Hierarchy (sequential, depends on Phase 1 colors)
- `fix-03-cta-hierarchy.md` - Button styling depends on new colors
- `fix-04-visual-authenticity.md` - Remove/replace placeholder visuals

### Phase 3: Cleanup (run in parallel)
- `fix-05-layout-cleanup.md` - Remove decorations
- `fix-06-polish.md` - Final consistency pass

---

## Subagent Prompt Template

```
You are implementing design fixes for Księgowość Donandi website using Impeccable design principles.

## Design Context
- **Brand**: Warm, trustworthy, grounded (ciepły, solidny, przejrzysty)
- **Theme**: Light mode, generous whitespace
- **References**: infakt.pl, wfirma.pl
- **Anti-patterns**: AI-generated look, gradient orbs, bounce animations, cold blue dominance

## Impeccable Rules
- NO gradient text
- NO glassmorphism
- NO decorative gradient orbs
- NO bounce/elastic animations
- Use OKLCH colors if defining new ones
- Generous whitespace, clear hierarchy

## Your Task
Read the fix spec file and implement ALL changes listed.
Use the Impeccable command specified in the spec as your guide.
Run validation command at end if specified.

Implement the changes now.
```

---

## Validation

After all fixes, run:
```bash
npx impeccable --json src/sections/
```

Then re-run `/impeccable:critique` to verify score improvement.
