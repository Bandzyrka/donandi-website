import { useEffect, useRef } from 'react';
import { Phone, CheckCircle2 } from 'lucide-react';
import gsap from 'gsap';
// ScrollTrigger registered in App.tsx

const trustBadges = [
  'Bezpłatna konsultacja',
  'Bez zobowiązań',
  'Wiedza od 2006 roku',
];

const CTA = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.cta-headline',
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
        '.cta-subtext',
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
        '.cta-buttons',
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

      gsap.fromTo(
        '.cta-badges',
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
          delay: 0.15,
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden bg-stone-800"
    >
      <div className="container-custom relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="cta-headline text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            Gotowy, by odciążyć swoją firmę lub organizację?
          </h2>

          <p className="cta-subtext text-lg text-stone-300 mb-10 leading-relaxed">
            Niezależnie od tego, czy prowadzisz dynamiczny biznes, czy fundację – chętnie
            podzielimy się naszym 20-letnim doświadczeniem. Umów się na bezpłatną
            konsultację, podczas której przeanalizujemy Twoje potrzeby i podpowiemy,
            jak najlepiej zorganizować Twoje finanse. To spotkanie do niczego Cię nie
            zobowiązuje.
          </p>

          <div className="cta-buttons flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={scrollToContact}
              className="inline-flex items-center justify-center px-8 py-4 bg-teal-600 text-white font-semibold rounded-xl transition-all duration-200 hover:bg-teal-700 hover:shadow-lg"
            >
              Umów bezpłatną rozmowę →
            </button>

            <a
              href="tel:+48501601189"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent text-white font-semibold rounded-xl border-2 border-white/40 transition-all duration-200 hover:bg-white/10 hover:border-white/60"
            >
              <Phone className="w-5 h-5" />
              <span>+48 501 601 189</span>
            </a>
          </div>

          {/* Trust badges */}
          <div className="cta-badges flex flex-wrap items-center justify-center gap-6 mt-10 pt-8 border-t border-stone-700">
            {trustBadges.map((badge) => (
              <div key={badge} className="flex items-center gap-2 text-stone-300">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-teal-500" />
                <span className="text-sm">{badge}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
