# Lottie Animation Assets for Księgowość Donandi

## Primary Collection (Recommended)
**Banking and Finance Animations** - Purple/pink tones, recolorable to teal
https://creattie.com/lottie-animated-illustrations/collection/banking-and-finance-illustration

---

## Asset Mapping by Section

### HERO SECTION
| Purpose | Animation | URL | Color Note |
|---------|-----------|-----|------------|
| Main visual - consultation | `cooperation-with-bank-3` | https://creattie.com/lottie-animated-illustrations/item/cooperation-with-bank-3 | Recolor purple→teal |
| Alt: Financial advisor | `online-bank-advisor-3` | https://creattie.com/lottie-animated-illustrations/item/online-bank-advisor-3 | Recolor purple→teal |
| Alt: Trust/support | `bank-support-3` | https://creattie.com/lottie-animated-illustrations/item/bank-support-3 | Recolor purple→teal |

---

### SERVICES SECTION

#### NGO i Sektor Społeczny
| Service | Animation | URL |
|---------|-----------|-----|
| Księgowość NGO | `team-collaboration-2` | https://creattie.com/all-items/item/team-collaboration-2 |
| Obsługa PES | `cooperation-1` | https://creattie.com/all-items/item/cooperation-1 |

#### Księgowość Biznesowa
| Service | Animation | URL |
|---------|-----------|-----|
| Księgowość pełna | `financial-document-8` | https://creattie.com/all-items/item/financial-document-8 |
| Księgowość uproszczona | `calculator-77` | https://creattie.com/all-items/item/calculator-77 |
| Kadry i płace | `hr-database` | https://creattie.com/all-items/item/hr-database |
| Doradztwo podatkowe | `financial-growth-3` | https://creattie.com/all-items/item/financial-growth-3 |

#### Usługi Specjalistyczne
| Service | Animation | URL |
|---------|-----------|-----|
| Rozliczenia ZUS | `certified-document-4` | https://creattie.com/all-items/item/certified-document-4 |
| Sprawozdawczość | `amount-calculation-3` | https://creattie.com/lottie-animated-illustrations/item/amount-calculation-3 |
| Radca prawny | `signing-contract` | https://creattie.com/all-items/item/signing-contract |

---

### ABOUT SECTION
| Purpose | Animation | URL |
|---------|-----------|-----|
| Main visual - team success | `financial-satisfaction-3` | https://creattie.com/lottie-animated-illustrations/item/financial-satisfaction-3 |
| Alt: Growth story | `financial-growth-3` | https://creattie.com/lottie-animated-illustrations/item/financial-growth-3 |
| Alt: Teamwork | `teamwork-12` | https://creattie.com/all-items/item/teamwork-12 |

---

### CONTACT SECTION
| Purpose | Animation | URL |
|---------|-----------|-----|
| Main visual | `customer-support-8` | https://creattie.com/all-items/item/customer-support-8 |
| Alt: Support | `customer-support-10` | https://creattie.com/all-items/item/customer-support-10 |
| Alt: Online advisor | `online-bank-advisor-3` | https://creattie.com/lottie-animated-illustrations/item/online-bank-advisor-3 |

---

### WHY CHOOSE US SECTION (Feature Icons)
| Feature | Animation | URL |
|---------|-----------|-----|
| Experience | `bank-officer-3` | https://creattie.com/lottie-animated-illustrations/item/bank-officer-3 |
| Security | `bank-safe-3` | https://creattie.com/lottie-animated-illustrations/item/bank-safe-3 |
| Digital | `cloud-banking-3` | https://creattie.com/lottie-animated-illustrations/item/cloud-banking-3 |
| Support | `bank-support-3` | https://creattie.com/lottie-animated-illustrations/item/bank-support-3 |

---

## Color Customization

The Banking and Finance collection uses **purple/pink** tones. To match the site's **teal** palette:

### In Lottie JSON files:
Replace these color values:
- Purple `#6366f1` → Teal `#0d9488` (teal-600)
- Pink `#ec4899` → Coral `#f97316` (orange-500) or keep as accent
- Light purple `#a5b4fc` → Light teal `#5eead4` (teal-300)

### Using LottieFiles Editor:
1. Upload JSON to https://lottiefiles.com/editor
2. Use color picker to change purple→teal
3. Export modified JSON

### Using lottie-colorify (code):
```bash
npm install lottie-colorify
```
```js
import { replaceColor } from 'lottie-colorify';
const tealAnimation = replaceColor('#6366f1', '#0d9488', originalAnimation);
```

---

## Download Instructions

1. Sign in to Creattie with your subscription
2. Click each link above
3. Download as **JSON** (Lottie format)
4. Save to `src/assets/lottie/` in the project
5. Rename files descriptively:
   - `hero-consultation.json`
   - `service-ngo.json`
   - `service-pes.json`
   - etc.

---

## Implementation

After downloading, I'll set up:
1. `lottie-react` package installation
2. Reusable `<LottieAnimation>` component
3. Integration into each section
4. Color customization via lottie-colorify

---

## Alternative Collections (Similar Style)

- **Teamwork Collection**: https://creattie.com/lottie-animated-illustrations/collection/teamwork-illustration
- **Customer Support**: https://creattie.com/lottie-animated-illustrations/collection/customer-support-illustration  
- **Business & Finance**: https://creattie.com/lottie-animated-illustrations/collection/business-and-finance-illustration
