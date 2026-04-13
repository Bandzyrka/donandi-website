import { useEffect, useRef, useState } from 'react';
import { Users, Calendar, Target, ArrowRight, Shield, Clock, UserCheck, Building2, ShieldCheck } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import aboutPhoto from '../assets/images/about-photo.webp';

const stats = [
  { icon: Users, value: 30, suffix: '+', label: 'Zadowolonych klientów' },
  { icon: Calendar, value: 20, suffix: '', label: 'Lat doświadczenia w branży' },
  { icon: Target, value: 100, suffix: '%', label: 'Terminowości rozliczeń' },
];

// Reordered and refined badges - lead with differentiators
const badges = [
  { icon: Building2, label: 'NGO i PES', detail: 'Unikalna specjalizacja' },
  { icon: Shield, label: 'Patronat Fundacji', detail: 'Gwarancja etyki' },
  { icon: UserCheck, label: 'Osobisty opiekun', detail: 'Jeden kontakt' },
  { icon: Clock, label: 'Terminowość', detail: 'Bez kompromisów' },
];

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [counters, setCounters] = useState(stats.map(() => 0));

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image reveal animation - set initial state immediately, animate on scroll
      gsap.set(imageRef.current, { opacity: 0 });
      gsap.to(imageRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      });

      // Content animations
      gsap.fromTo(
        '.about-label',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.3,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
          delay: 0.05,
        }
      );

      gsap.fromTo(
        '.about-headline',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.3,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
          delay: 0.1,
        }
      );

      gsap.fromTo(
        '.about-text p',
        { y: 15, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.3,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
          delay: 0.15,
        }
      );

      // Counter animation trigger
      ScrollTrigger.create({
        trigger: '.stats-container',
        start: 'top 80%',
        onEnter: () => {
          stats.forEach((stat, index) => {
            gsap.to(
              { value: 0 },
              {
                value: stat.value,
                duration: 0.8,
                ease: 'power2.out',
                onUpdate: function () {
                  setCounters((prev) => {
                    const newCounters = [...prev];
                    newCounters[index] = Math.round(this.targets()[0].value);
                    return newCounters;
                  });
                },
              }
            );
          });
        },
        once: true,
      });

      // Badges animation
      gsap.fromTo(
        '.badge-item',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.3,
          stagger: 0.05,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.badges-list',
            start: 'top 85%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section-padding bg-stone-50 relative overflow-hidden"
    >
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Brand Visual */}
          <div className="relative">
            <div
              ref={imageRef}
              className="relative"
            >
              {/* Offset background block - warmer tone */}
              <div className="absolute top-6 -left-3 lg:-left-6 w-full h-full bg-teal-800/90 rounded-[2rem] -z-10" />

              {/* Main image container */}
              <div className="relative rounded-[1.5rem] sm:rounded-[2rem] rounded-tl-[3rem] sm:rounded-tl-[4rem] overflow-hidden shadow-large">
                <img
                  src={aboutPhoto}
                  alt="Zespół księgowych w rozmowie z klientem - osobiste podejście i zaufanie"
                  className="w-full aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5] object-cover"
                  loading="lazy"
                />
              </div>

              {/* Trust badge - floating top right, responsive sizing */}
              <div className="absolute -top-2 sm:-top-3 right-4 sm:right-6 lg:right-10 bg-teal-700 text-white rounded-xl sm:rounded-2xl shadow-lg px-3 sm:px-5 py-2.5 sm:py-4">
                <div className="flex items-center gap-2 sm:gap-3">
                  <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-teal-200" strokeWidth={1.5} />
                  <div>
                    <p className="text-lg sm:text-2xl font-bold tracking-tight">0 kar</p>
                    <p className="text-[10px] sm:text-xs text-teal-200 uppercase tracking-wide">Od US i ZUS</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content - restructured for clear hierarchy */}
          <div className="lg:pl-8">
            <span className="about-label section-label">O Nas</span>

            {/* PRIMARY: Headline - the focal point */}
            <h2 className="about-headline text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-stone-900 mb-8 leading-[1.1]">
              Twój spokój w świecie podatków
              <span className="block mt-2 text-teal-700">— od biznesu po misję społeczną</span>
            </h2>

            {/* SECONDARY: Body text - scannable chunks */}
            <div className="about-text space-y-4 mb-10">
              {/* Chunk 1: The hook - experience */}
              <p className="text-lg text-stone-700 leading-relaxed">
                <strong className="text-stone-900">Od 2006 roku</strong> wspieramy przedsiębiorców
                w prowadzeniu księgowości. Blisko dwie dekady doświadczenia pozwalają nam oferować
                wsparcie na najwyższym poziomie.
              </p>

              {/* Chunk 2: The differentiator - NGO/PES expertise */}
              <p className="text-stone-600 leading-relaxed">
                Specjalizujemy się w obsłudze{' '}
                <a href="#services" className="font-semibold text-teal-700 hover:underline">
                  organizacji pozarządowych (NGO)
                </a>{' '}
                oraz{' '}
                <a href="#services" className="font-semibold text-teal-700 hover:underline">
                  przedsiębiorstw ekonomii społecznej (PES)
                </a>
                . To unikalna specjalizacja, którą rozwijamy od lat.
              </p>

              {/* Chunk 3: The trust signal - Fundacja Donandi */}
              <p className="text-stone-600 leading-relaxed">
                Działamy pod patronatem{' '}
                <a
                  href="https://www.fundacjadonandi.pl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-teal-700 hover:underline"
                >
                  Fundacji Donandi
                </a>
                {' '}— gwarancja etyki, transparentności i merytorycznej niezawodności.
              </p>
            </div>

            {/* TERTIARY: Badges - quieter, horizontal strip with consistent styling */}
            <div className="badges-list flex flex-wrap gap-2 mb-8">
              {badges.map((badge, index) => {
                const Icon = badge.icon;
                return (
                  <div
                    key={index}
                    className="badge-item inline-flex items-center gap-2 bg-stone-100 hover:bg-stone-200/80 rounded-full px-4 py-2 transition-colors duration-200"
                  >
                    <Icon className="w-4 h-4 text-teal-600 flex-shrink-0" strokeWidth={2} />
                    <span className="text-stone-700 text-sm font-medium">{badge.label}</span>
                  </div>
                );
              })}
            </div>

            {/* SUPPORTING: Stats - responsive layout with consistent icons */}
            <div className="stats-container grid grid-cols-3 gap-4 sm:flex sm:flex-wrap sm:items-center sm:gap-x-8 sm:gap-y-4 mb-8 pb-8 border-b border-stone-200">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-center sm:text-left">
                    <Icon className="w-5 h-5 text-stone-400 mx-auto sm:mx-0 hidden sm:block" strokeWidth={1.5} />
                    <div>
                      <span className="text-xl sm:text-2xl font-bold text-stone-800 block sm:inline">
                        {counters[index]}{stat.suffix}
                      </span>
                      <span className="text-xs sm:text-sm text-stone-500 sm:ml-2 block sm:inline">{stat.label}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA - specific action, full-width on mobile for thumb access */}
            <button
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-ghost group w-full sm:w-auto justify-center"
            >
              <span>Umów bezpłatną konsultację</span>
              <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
