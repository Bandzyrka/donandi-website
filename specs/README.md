# Księgowość Donandi - Website Update Specs

## Overview
8 spec files for updating the Donandi accounting website based on client requirements from `Zmiany na stronie Księgowość Donandi.pdf`.

**Skipped sections** (to be updated later):
- V. Cennik (Pricing) - "będzie do podmiany na kolejnym etapie"
- VII. Blog - "do edycji na kolejnym etapie"

---

## Spec Files

| File | Section | Target | Complexity | Impeccable Skills |
|------|---------|--------|------------|-------------------|
| `spec-01-hero.md` | Hero | `Hero.tsx` | Medium | clarify, layout |
| `spec-02-services.md` | Services | `Services.tsx` | **High** | layout, clarify, typeset |
| `spec-03-about.md` | About | `About.tsx` | Medium | clarify, layout, typeset |
| `spec-04-why-us.md` | Why Us | `WhyChooseUs.tsx` | Low | clarify, layout |
| `spec-05-testimonials.md` | Testimonials | `Testimonials.tsx` | Low | clarify, layout |
| `spec-06-newsletter-cta.md` | Newsletter/CTA | `CTA.tsx` | Medium | clarify, layout |
| `spec-07-contact.md` | Contact | `Contact.tsx` | Low | clarify, layout |
| `spec-08-footer.md` | Footer | `Footer.tsx` | Low | layout, clarify |

---

## Execution Order

### Phase 1: Foundation (can run in parallel)
- `spec-01-hero.md` - Sets the tone
- `spec-08-footer.md` - Quick win, updates contact info

### Phase 2: Content-Heavy (sequential recommended)
- `spec-02-services.md` - **Largest change**, 9 cards with detailed content
- `spec-03-about.md` - Updates stats and messaging

### Phase 3: Supporting Sections (can run in parallel)
- `spec-04-why-us.md`
- `spec-05-testimonials.md`
- `spec-06-newsletter-cta.md`
- `spec-07-contact.md`

---

## Subagent Prompt Template

```
You are implementing website changes for Księgowość Donandi, a Polish accounting firm.

## Design Context
- **Theme**: Light mode
- **Personality**: Warm, trustworthy, grounded (ciepły, solidny, przejrzysty)
- **References**: infakt.pl, wfirma.pl - clean, modern, generous whitespace
- **Emotion**: "I can trust these people" within 5 seconds

## Design Rules (from Impeccable)
- NO gradient text (use solid colors)
- NO side-stripe borders on cards
- NO glassmorphism
- NO Inter font (already in codebase - consider changing)
- Use OKLCH colors, not HSL
- Generous whitespace, clear hierarchy
- Polish language throughout

## Your Task
Read the spec file and implement ALL changes listed. The spec contains:
- Exact new copy (use verbatim)
- Layout requirements
- Visual notes

## Files to Modify
- Target: `src/sections/[SectionName].tsx`
- May need: `src/index.css` for new styles

Implement the changes now.
```

---

## Key Content Changes Summary

### Contact Info (applies to multiple sections)
- **Address**: Ul. Sobieskiego 2/32, 39-200 Dębica
- **Phone**: +48 501 601 189 (or 501 601 189)
- **Email**: ksiegowosc.donandi@gmail.com
- **Social**: Keep Facebook only, add Fundacja Donandi link

### Priority Services (new positioning)
1. Księgowość NGO (first)
2. Obsługa PES (second)
3. Then existing services...
9. Radca prawny (last, new)

### CTA Standardization
All "Dowiedz się więcej →" links become "Zobacz, jak pomagamy →"
All main CTAs lead to contact form (#contact)
