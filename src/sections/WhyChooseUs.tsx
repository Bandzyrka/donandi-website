import { useEffect, useRef } from 'react';
import { ShieldCheck, Users, Zap, BookOpen, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
// ScrollTrigger registered in App.tsx

const features = [
  {
    icon: ShieldCheck,
    title: 'Gwarancja rzetelności',
    description: 'Twoje bezpieczeństwo finansowe jest naszym priorytetem. Dbamy o najwyższe standardy pracy i bierzemy pełną odpowiedzialność za poprawność Twoich rozliczeń. Dzięki naszej skrupulatności zyskujesz solidny fundament i absolutny spokój o przyszłość swojej firmy.',
  },
  {
    icon: Users,
    title: 'Bezpośrednia współpraca',
    description: 'Stawiamy na relację, a nie tylko na liczby. Pracujesz z ludźmi, którzy naprawdę znają Twoją branżę i są dostępni zawsze wtedy, gdy potrzebujesz merytorycznego wsparcia. Rozumiemy Twoje potrzeby i mówimy Twoim językiem, budując partnerstwo oparte na zaufaniu.',
  },
  {
    icon: Zap,
    title: 'Szybkość i precyzja działania',
    description: 'Szanujemy Twój czas, dlatego gwarantujemy szybkie rozliczenie dokumentów. Dzięki sprawnej obsłudze zawsze masz dostęp do aktualnych danych finansowych, co pozwala Ci trzymać rękę na pulsie i nigdy nie przegapić ważnego terminu.',
  },
  {
    icon: BookOpen,
    title: 'Wiedza poparta praktyką',
    description: 'Nasza praktyka w księgowości budowana jest od blisko 20 lat. Doskonale znamy specyfikę zarówno biznesu, jak i organizacji pozarządowych (NGO) oraz sektora PES. Zapewniamy rzetelne wsparcie merytoryczne oparte na wieloletniej obecności w branży.',
  },
];

const WhyChooseUs = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animations
      gsap.fromTo(
        '.why-label',
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
        '.why-headline',
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

      // Cards animation - simple fade in
      const cards = cardsRef.current?.querySelectorAll('.why-card');
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
              trigger: cardsRef.current,
              start: 'top 75%',
            },
          }
        );
      }

      // Icons - simple fade in (no spin)
      const icons = cardsRef.current?.querySelectorAll('.why-icon');
      if (icons) {
        gsap.fromTo(
          icons,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.3,
            stagger: 0.05,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 75%',
            },
            delay: 0.1,
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="why-choose-us"
      ref={sectionRef}
      className="section-padding bg-white relative overflow-hidden"
    >
      <div className="container-custom relative z-10">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="why-label section-label">Dlaczego My</span>
          <h2 className="why-headline font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-stone-900 tracking-tight leading-[1.1]">
            Co nas <span className="text-teal-700">wyróżnia</span>
          </h2>
        </div>

        {/* Features — varied layout for rhythm */}
        <div ref={cardsRef} className="max-w-5xl mx-auto space-y-6">
          {/* Row 1: Lead feature — bold horizontal hero card */}
          <div className="why-card group flex flex-col md:flex-row md:items-center gap-8 bg-stone-900 text-white rounded-3xl p-10 lg:p-14 relative overflow-hidden">
            {/* Ambient warm glow */}
            <div className="absolute -top-20 -right-20 w-60 h-60 bg-amber-500/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-teal-500/10 rounded-full blur-2xl"></div>
            <div className="why-icon w-20 h-20 rounded-2xl bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center flex-shrink-0 shadow-xl relative z-10">
              <ShieldCheck className="w-10 h-10 text-white" />
            </div>
            <div className="flex-1 relative z-10">
              <h3 className="font-display text-3xl lg:text-4xl font-bold mb-3 tracking-tight">
                {features[0].title}
              </h3>
              <p className="text-stone-300 text-lg leading-relaxed max-w-xl">
                {features[0].description}
              </p>
            </div>
          </div>

          {/* Row 2: Two features side by side — compact cards */}
          <div className="grid md:grid-cols-2 gap-5">
            {features.slice(1, 3).map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="why-card group relative bg-white rounded-xl p-6 lg:p-8 border border-stone-200 hover:border-teal-200 hover:shadow-md transition-all duration-200"
                >
                  {/* Icon + Title inline */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="why-icon w-10 h-10 rounded-lg bg-stone-100 flex items-center justify-center group-hover:bg-teal-50 transition-colors duration-200">
                      <Icon className="w-5 h-5 text-teal-700" />
                    </div>
                    <h3 className="font-display text-lg font-semibold text-stone-900 tracking-tight">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-stone-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Row 3: Closing feature — warm emphasis for "experience" theme */}
          <div className="why-card group flex flex-col md:flex-row md:items-start gap-6 bg-gradient-to-br from-amber-50/60 via-white to-teal-50/40 rounded-2xl p-8 lg:p-10 border border-amber-100/30">
            <div className="flex-1 order-2 md:order-1">
              <span className="text-xs font-semibold text-amber-600 uppercase tracking-widest flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                Od 2006 roku
              </span>
              <h3 className="font-display text-2xl font-semibold text-stone-900 mb-3 mt-1 tracking-tight">
                {features[3].title}
              </h3>
              <p className="text-stone-600 leading-relaxed">
                {features[3].description}
              </p>
            </div>
            <div className="why-icon w-14 h-14 rounded-xl bg-white shadow-sm flex items-center justify-center flex-shrink-0 order-1 md:order-2 border border-amber-100">
              <BookOpen className="w-7 h-7 text-amber-600" />
            </div>
          </div>
        </div>

        {/* Bottom CTA — bold warm invitation */}
        <div className="text-center mt-20">
          <div className="inline-flex flex-col items-center gap-6 bg-gradient-to-br from-amber-50 via-white to-teal-50/50 rounded-3xl px-12 py-12 border border-amber-100/50 shadow-lg">
            <p className="font-display text-3xl lg:text-4xl font-bold text-stone-900 tracking-tight">
              Zróbmy pierwszy krok razem
            </p>
            <p className="text-stone-600 text-lg max-w-lg">
              Skorzystaj z bezpłatnej konsultacji i sprawdź, jak nasze doświadczenie może wesprzeć Twój rozwój.
            </p>
            <button
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center justify-center px-8 py-4 bg-stone-900 text-white font-semibold rounded-xl transition-all duration-300 hover:bg-stone-800 hover:shadow-xl hover:-translate-y-0.5 group text-lg"
            >
              <span>Umów konsultację</span>
              <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
