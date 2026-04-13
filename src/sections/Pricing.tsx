import { useEffect, useRef, useState } from 'react';
import { Check, HelpCircle, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
// ScrollTrigger registered in App.tsx

const pricingPlans = [
  {
    name: 'Start',
    description: 'Dla freelancerów i małych firm',
    price: 'od 199',
    period: 'zł/mies',
    popular: false,
    features: [
      'KPiR lub ryczałt',
      'Do 50 faktur miesięcznie',
      'Rozliczenie ZUS',
      'Deklaracje podatkowe',
      'Dostęp do panelu online',
      'Wsparcie email',
    ],
    notIncluded: [
      'Księgowość pełna',
      'Kadry i płace',
      'Doradztwo podatkowe',
    ],
  },
  {
    name: 'Biznes',
    description: 'Dla rozwijających się firm',
    price: 'od 399',
    period: 'zł/mies',
    popular: true,
    features: [
      'KPiR lub ryczałt',
      'Do 150 faktur miesięcznie',
      'Rozliczenie ZUS',
      'Deklaracje podatkowe',
      'Dostęp do panelu online',
      'Wsparcie tel. i email',
      'Kadry i płace (do 5 osób)',
      'Doradztwo podatkowe',
    ],
    notIncluded: [
      'Księgowość pełna',
    ],
  },
  {
    name: 'Profesjonal',
    description: 'Dla firm wymagających pełnej obsługi',
    price: 'od 799',
    period: 'zł/mies',
    popular: false,
    features: [
      'Pełna księgowość',
      'Bez limitu faktur',
      'Rozliczenie ZUS',
      'Deklaracje podatkowe',
      'Dostęp do panelu online',
      'Priorytetowe wsparcie 24/7',
      'Kadry i płace (bez limitu)',
      'Doradztwo podatkowe',
      'Sprawozdania finansowe',
      'Reprezentacja przed US',
    ],
    notIncluded: [],
  },
];

const Pricing = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hoveredPlan, setHoveredPlan] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animations
      gsap.fromTo(
        '.pricing-label',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.3,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );

      gsap.fromTo(
        '.pricing-headline',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.3,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
          delay: 0.05,
        }
      );

      gsap.fromTo(
        '.pricing-subtext',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.3,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
          delay: 0.1,
        }
      );

      // Cards animation - simple fade and slide up
      const cards = sectionRef.current?.querySelectorAll('.pricing-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.3,
            stagger: 0.05,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: '.pricing-cards',
              start: 'top 80%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="pricing"
      ref={sectionRef}
      className="section-padding bg-stone-50 relative overflow-hidden"
    >
      <div className="container-custom relative z-10">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="pricing-label section-label">Cennik</span>
          <h2 className="pricing-headline font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-stone-900 mb-8 tracking-tight leading-[1.1]">
            Przejrzyste <span className="text-teal-700">ceny</span>,<br className="hidden sm:block" /> bez ukrytych kosztów
          </h2>
          <p className="pricing-subtext text-lg text-stone-600">
            Wybierz pakiet dopasowany do potrzeb Twojej firmy. 
            Wszystkie ceny są netto. Możliwość indywidualnej wyceny.
          </p>
        </div>

        {/* Pricing cards — asymmetric grid with dramatic featured center */}
        <div className="pricing-cards grid md:grid-cols-3 gap-5 max-w-6xl mx-auto items-start">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`pricing-card relative transition-all duration-300 ${
                plan.popular
                  ? 'bg-stone-900 text-white rounded-2xl p-8 lg:p-12 shadow-2xl md:-my-6 ring-1 ring-amber-400/20'
                  : 'bg-white text-stone-900 rounded-xl p-6 lg:p-8 border border-stone-200 hover:border-teal-200 hover:shadow-lg'
              } ${hoveredPlan === index && !plan.popular ? '-translate-y-1' : ''}`}
              onMouseEnter={() => setHoveredPlan(index)}
              onMouseLeave={() => setHoveredPlan(null)}
            >
              {/* Popular badge — warm amber for emphasis */}
              {plan.popular && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-400 text-amber-900 text-xs font-semibold rounded-full mb-6">
                  <span className="w-1.5 h-1.5 bg-amber-600 rounded-full"></span>
                  Najpopularniejszy
                </div>
              )}

              {/* Plan header */}
              <div className={plan.popular ? 'mb-8' : 'mb-6'}>
                <h3 className={`font-display font-semibold tracking-tight ${
                  plan.popular ? 'text-2xl text-white' : 'text-lg text-stone-900'
                }`}>
                  {plan.name}
                </h3>
                <p className={`text-sm mt-1 ${plan.popular ? 'text-stone-400' : 'text-stone-500'}`}>
                  {plan.description}
                </p>
              </div>

              {/* Price */}
              <div className={plan.popular ? 'mb-10' : 'mb-6'}>
                <div className="flex items-baseline gap-1">
                  <span className={`font-display font-semibold tracking-tight ${
                    plan.popular ? 'text-5xl text-white' : 'text-3xl text-stone-900'
                  }`}>
                    {plan.price}
                  </span>
                  <span className={`text-sm ${plan.popular ? 'text-stone-400' : 'text-stone-500'}`}>
                    {plan.period}
                  </span>
                </div>
              </div>

              {/* Features */}
              <ul className={`space-y-2.5 ${plan.popular ? 'mb-10' : 'mb-6'}`}>
                {plan.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-start gap-2.5">
                    <Check className={`w-4 h-4 flex-shrink-0 mt-0.5 ${plan.popular ? 'text-teal-400' : 'text-teal-600'}`} />
                    <span className={`text-sm ${plan.popular ? 'text-stone-300' : 'text-stone-600'}`}>
                      {feature}
                    </span>
                  </li>
                ))}
                {plan.notIncluded.map((feature, fIndex) => (
                  <li key={`not-${fIndex}`} className="flex items-start gap-2.5 opacity-40">
                    <HelpCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-stone-400" />
                    <span className="text-sm text-stone-400 line-through">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button
                onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                className={`w-full py-3 px-6 rounded-lg font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 group ${
                  plan.popular
                    ? 'bg-teal-500 text-white hover:bg-teal-400'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                <span>Wybierz pakiet</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          ))}
        </div>

        {/* Additional info — left-aligned for variety */}
        <div className="mt-16 max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-6 border-t border-stone-200">
            <p className="text-stone-500 text-sm">
              Nie wiesz, który pakiet wybrać? Pomożemy dobrać odpowiednie rozwiązanie.
            </p>
            <button
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-teal-700 font-medium text-sm hover:text-teal-800 inline-flex items-center gap-1.5 flex-shrink-0"
            >
              <span>Umów bezpłatną konsultację</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
