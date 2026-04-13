# Spec 01: Hero Section (Strona Główna)

## Target Files
- `src/sections/Hero.tsx` - Main hero content
- `src/sections/Navigation.tsx` - Phone number and CTA button

## Impeccable Skills
- `/impeccable:clarify` - UX copy improvements
- `/impeccable:layout` - Visual hierarchy and spacing

## Design Context
- **Theme**: Light mode, warm and trustworthy
- **Emotion**: "I can trust these people" within 5 seconds
- **References**: infakt.pl, wfirma.pl - clean, modern, generous whitespace

---

## Changes Required

### A. Headline
**Current**: "Profesjonalna księgowość, która rozumie Twój biznes"

**New**:
```
Księgowość z doświadczeniem, która wspiera Twoje cele
```
- "wspiera Twoje cele" should be visually emphasized (brand color, not gradient)

### B. Subtext / Description
**New**:
```
Od blisko 20 lat zdejmujemy ciężar formalności z barków przedsiębiorców. Zapewniamy rzetelne rozliczenia oraz pełne wsparcie merytoryczne dla firm, fundacji, stowarzyszeń i sektora PES. Z nami zyskujesz czas na rozwój swojej misji, mając pewność, że podatki są pod kontrolą.
```
- Bold/emphasize: "fundacji, stowarzyszeń i sektora PES"

### C. Primary CTA Button
**New**: `Umów bezpłatną konsultację`
- Links to contact form (#contact)

### D. Secondary CTA Button
**New**: `Zobacz, jak pomagamy`
- Links to services section (#services)

### E. Trust Badges (below CTAs)
**New badges**:
- "Doświadczenie od 2006 roku"
- "Eksperci sektora NGO i PES"

### F. Right Side Visual
**Change**: Replace current dashboard/panel mockup with friendly, trust-inspiring graphic featuring people
- Consider: illustration or warm photography style
- Should feel approachable, not corporate stock

### G. Phone Number in Navigation
**New**: `+48 501 601 189`

### H. Navigation CTA Button
**New label**: `Konsultacja`

---

## Implementation Notes
- Remove any gradient text (design system ban)
- Ensure headline has strong typographic hierarchy
- Trust badges should feel subtle, not promotional
- Phone number should be clickable (tel: link)
- Maintain GSAP entrance animations but ensure they feel purposeful, not performative
