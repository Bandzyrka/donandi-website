import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Quote, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
// ScrollTrigger registered in App.tsx

const testimonials = [
  {
    id: 1,
    name: 'Anna Kowalska',
    role: 'Właścicielka',
    company: 'Kowalska Studio',
    initials: 'AK',
    color: 'bg-teal-100 text-teal-700',
    content: '„Doceniam przede wszystkim terminowość i porządek w dokumentach. Od kiedy współpracujemy, nie muszę pilnować dat w kalendarzu, bo wiem, że wszystko zostanie rozliczone na czas."',
  },
  {
    id: 2,
    name: 'Tomasz Jabłoński',
    role: 'Prezes Zarządu',
    company: 'Fundacja Aktywni Razem',
    initials: 'TJ',
    color: 'bg-amber-100 text-amber-700',
    content: '„Prowadzenie księgowości w organizacji pozarządowej wymaga specyficznej wiedzy, zwłaszcza przy rozliczaniu dotacji i wymogach Przedsiębiorstwa Ekonomii Społecznej. Donandi doskonale czuje te tematy."',
  },
  {
    id: 3,
    name: 'Katarzyna Wiśniewska',
    role: 'Właścicielka',
    company: 'Pracownia Bella',
    initials: 'KW',
    color: 'bg-stone-200 text-stone-700',
    content: '„Bardzo cenię sobie możliwość szybkiej konsultacji i ludzkie podejście. Nie czuję się jak kolejny numer w systemie. Mam poczucie, że moje finanse są w naprawdę dobrych rękach."',
  },
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animations
      gsap.fromTo(
        '.testimonials-label',
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
        '.testimonials-headline',
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

      // Carousel entrance
      gsap.fromTo(
        carouselRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.3,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: carouselRef.current,
            start: 'top 80%',
          },
          delay: 0.1,
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Auto-advance carousel with pause on hover/focus
  const [isPaused, setIsPaused] = useState(false);
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="section-padding bg-stone-50 relative overflow-hidden"
    >
      <div className="container-custom relative z-10">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="testimonials-label section-label">Opinie Klientów</span>
          <h2 className="testimonials-headline text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900">
            Co mówią o nas <span className="text-teal-700">przedsiębiorcy</span>
          </h2>
        </div>

        {/* Carousel */}
        <div
          ref={carouselRef}
          className="relative max-w-4xl mx-auto"
        >
          {/* Quote icon */}
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 bg-stone-800 rounded-2xl flex items-center justify-center shadow-large z-20">
            <Quote className="w-8 h-8 text-white" />
          </div>

          {/* Cards container - aria-live announces changes to screen readers */}
          <div
            className="relative min-h-[320px] sm:min-h-[280px]"
            aria-live="polite"
            aria-atomic="true"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onFocus={() => setIsPaused(true)}
            onBlur={() => setIsPaused(false)}
          >
            {testimonials.map((testimonial, index) => {
              const isActive = index === activeIndex;
              const isPrev = index === (activeIndex - 1 + testimonials.length) % testimonials.length;
              const isNext = index === (activeIndex + 1) % testimonials.length;

              let transform = 'translateX(100%)';
              let opacity = 0;
              let zIndex = 0;

              if (isActive) {
                transform = 'translateX(0)';
                opacity = 1;
                zIndex = 10;
              } else if (isPrev) {
                transform = 'translateX(-100%)';
                opacity = 0;
                zIndex = 5;
              } else if (isNext) {
                transform = 'translateX(100%)';
                opacity = 0;
                zIndex = 5;
              }

              return (
                <div
                  key={testimonial.id}
                  className="absolute inset-0 transition-all duration-300 ease-out"
                  style={{
                    transform,
                    opacity,
                    zIndex,
                  }}
                >
                  <div className="bg-white rounded-3xl shadow-large p-8 sm:p-10 h-full border border-stone-100">
                    {/* Content */}
                    <p className="text-lg sm:text-xl text-stone-700 leading-relaxed mb-8">
                      {testimonial.content}
                    </p>

                    {/* Author */}
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-14 h-14 rounded-full ring-4 ring-stone-100 flex items-center justify-center font-semibold text-lg ${testimonial.color}`}
                        aria-label={testimonial.name}
                      >
                        {testimonial.initials}
                      </div>
                      <div>
                        <p className="font-semibold text-stone-900">
                          {testimonial.name}
                        </p>
                        <p className="text-sm text-stone-600">
                          {testimonial.role}, {testimonial.company}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prevSlide}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); prevSlide(); } }}
              className="w-12 h-12 rounded-full bg-white shadow-soft flex items-center justify-center text-stone-600 hover:text-stone-900 hover:shadow-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
              aria-label="Poprzednia opinia"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Dots */}
            <div className="flex gap-2" role="tablist" aria-label="Opinie klientów">
              {testimonials.map((t, index) => (
                <button
                  key={index}
                  role="tab"
                  aria-selected={index === activeIndex}
                  onClick={() => setActiveIndex(index)}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActiveIndex(index); } }}
                  className={`h-3 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 ${
                    index === activeIndex
                      ? 'bg-teal-700 w-8'
                      : 'bg-stone-300 hover:bg-stone-400 w-3'
                  }`}
                  aria-label={`Opinia ${index + 1}: ${t.name}`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); nextSlide(); } }}
              className="w-12 h-12 rounded-full bg-white shadow-soft flex items-center justify-center text-stone-600 hover:text-stone-900 hover:shadow-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
              aria-label="Następna opinia"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-ghost group"
          >
            <span>Porozmawiajmy o współpracy</span>
            <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
