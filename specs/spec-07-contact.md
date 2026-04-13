# Spec 07: Contact Section (Kontakt)

## Target File
`src/sections/Contact.tsx`

## Impeccable Skills
- `/impeccable:clarify` - Contact information clarity
- `/impeccable:layout` - Form + info arrangement

## Design Context
- Clarity over cleverness
- Information findable in under 3 seconds
- Warm but professional

---

## Changes Required

### A. Contact Information

**Address**:
```
Ul. Sobieskiego 2/32
39-200 Dębica
```

**Phone**:
```
501 601 189
```
- Remove days/hours notation
- Clickable tel: link

**Email**:
```
ksiegowosc.donandi@gmail.com
```
- Remove "Odpowiadamy w ciągu 24h" text

**Opening Hours**:
- **REMOVE entirely** (for now)

### B. Social Media Icons
**Keep**: Facebook icon (with link)
**Remove**: LinkedIn, Instagram

**Optional Add**: WordPress/website icon linking to main Fundacja Donandi website

### Form
Keep existing form structure:
- Imię i nazwisko
- Email
- Telefon
- Temat (dropdown)
- Wiadomość
- GDPR consent checkbox
- Submit button: "Wyślij wiadomość"

---

## Visual Notes
- Contact info should be scannable at a glance
- Map optional (if present, ensure it shows Dębica location)
- Form should feel simple, not overwhelming
- Remove any "Znajdź nas" section if it references removed social links
