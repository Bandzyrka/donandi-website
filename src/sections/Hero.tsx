import { useEffect, useRef } from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';
import gsap from 'gsap';
import heroPhoto from '../assets/images/hero-photo.webp';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Respect reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Timeline for entrance animations - slower, more grounded feel
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Headline animation - weighted entrance
      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll('.word');
        tl.fromTo(
          words,
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.08 },
          0.15
        );
      }

      // Subtext fade in - deliberate reveal
      tl.fromTo(
        subtextRef.current,
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.45 },
        0.5
      );

      // CTA buttons - confident appearance
      tl.fromTo(
        ctaRef.current?.querySelectorAll('button, a') || [],
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.1 },
        0.7
      );

      // Card fade in - gentle reveal
      tl.fromTo(
        cardRef.current,
        { opacity: 0, scale: 0.98 },
        { opacity: 1, scale: 1, duration: 0.6 },
        0.3
      );

      // Stats badge fade in - final touch
      tl.fromTo(
        statsRef.current,
        { y: 12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4 },
        0.9
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden bg-gradient-to-br from-stone-50 via-white to-stone-50"
    >
      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-50 to-teal-50 rounded-full mb-6 border border-amber-100/50">
              <span className="w-2 h-2 bg-amber-400 rounded-full" />
              <span className="text-sm font-medium text-stone-700">Pod patronatem Fundacji Donandi</span>
            </div>

            <h1
              ref={headlineRef}
              className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-stone-900 leading-[1.05] tracking-tight mb-8"
            >
              <span className="word inline-block">Księgowość</span>{' '}
              <span className="word inline-block text-teal-700">z&nbsp;misją,</span>
              <br />
              <span className="word inline-block">która</span>{' '}
              <span className="word inline-block">wspiera</span>{' '}
              <span className="word inline-block text-teal-700">Twój</span>{' '}
              <span className="word inline-block text-teal-700">rozwój</span>
            </h1>

            <p
              ref={subtextRef}
              className="text-lg text-stone-600 mb-6 leading-relaxed max-w-xl"
            >
              Zdejmujemy ciężar formalności z barków przedsiębiorców. Rzetelne rozliczenia, pełne wsparcie merytoryczne — Ty zajmujesz się rozwojem, my pilnujemy podatków.
            </p>

            <div className="flex flex-wrap gap-2 mb-8">
              <span className="inline-flex items-center px-3 py-1.5 bg-teal-50 text-teal-800 text-sm font-medium rounded-full">
                Firmy i JDG
              </span>
              <span className="inline-flex items-center px-3 py-1.5 bg-amber-50 text-amber-800 text-sm font-medium rounded-full">
                Fundacje i NGO
              </span>
              <span className="inline-flex items-center px-3 py-1.5 bg-stone-100 text-stone-700 text-sm font-medium rounded-full">
                Ekonomia społeczna
              </span>
            </div>

            <div ref={ctaRef} className="mb-10">
              <div className="flex flex-col sm:flex-row gap-4 mb-3">
                <button
                  onClick={() => scrollToSection('#contact')}
                  className="btn-primary group"
                >
                  <span>Porozmawiajmy o Twojej firmie</span>
                  <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
                <button
                  onClick={() => scrollToSection('#services')}
                  className="btn-secondary"
                >
                  Zobacz, jak pomagamy
                </button>
              </div>
              <p className="text-sm text-stone-500">
                Bezpłatna konsultacja · 15 minut · Bez zobowiązań
              </p>
            </div>

            <div ref={statsRef} className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-teal-600" />
                <span className="text-sm font-medium text-stone-700">Odpowiadamy w ciągu 24h</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-teal-600" />
                <span className="text-sm font-medium text-stone-700">Stały opiekun Twojej firmy</span>
              </div>
            </div>
          </div>

          {/* Right side visual - Photo with creative framing */}
          <div className="relative lg:pl-8">
            <div
              ref={cardRef}
              className="relative w-full max-w-lg mx-auto"
            >
              {/* Background accent shape */}
              <div className="absolute -top-6 -right-6 w-full h-full bg-teal-100 rounded-[2rem] -z-10" />

              {/* Main image with organic rounded corners */}
              <div className="relative rounded-[2rem] overflow-hidden shadow-large">
                <img
                  src={heroPhoto}
                  alt="Przedsiębiorca z spokojem wychodzi z biura - księgowość załatwiona"
                  className="w-full h-auto object-cover"
                />
                {/* Subtle gradient overlay at bottom */}
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-stone-900/20 to-transparent" />
              </div>

              {/* Floating accent card - bottom left */}
              <div className="absolute -bottom-6 -left-4 bg-white rounded-2xl shadow-card px-5 py-4 border border-stone-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-teal-700" />
                  </div>
                  <div>
                    <p className="font-display text-lg font-semibold text-stone-900 tracking-tight">Od 2006</p>
                    <p className="text-sm text-stone-500">Zaufany partner</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
