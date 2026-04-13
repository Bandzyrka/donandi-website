import { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Usługi', href: '#services' },
    { name: 'Dlaczego My', href: '#why-choose-us' },
    { name: 'Cennik', href: '#pricing' },
    { name: 'FAQ', href: '#faq' },
    { name: 'O nas', href: '#about' },
    { name: 'Kontakt', href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-teal-700 focus:text-white focus:rounded-lg"
      >
        Przejdź do treści
      </a>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-white/90 backdrop-blur-xl shadow-soft py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a
              href="#"
              className="flex items-center gap-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 rounded-lg"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <div className="w-10 h-10 bg-teal-700 rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                <span className="font-display text-white font-semibold text-lg">D</span>
              </div>
              <div className="hidden sm:block">
                <span className="font-display font-semibold text-lg tracking-tight text-stone-900">
                  Księgowość Donandi
                </span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className="text-sm font-medium text-stone-700 hover:text-teal-700 underline-animation transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 rounded-sm"
                >
                  {link.name}
                </button>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:flex items-center gap-4">
              <a
                href="tel:+48501601189"
                className="flex items-center gap-2 text-sm font-medium text-stone-700 hover:text-teal-700 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 rounded-sm"
              >
                <Phone className="w-4 h-4" />
                <span>+48 501 601 189</span>
              </a>
              <button
                onClick={() => scrollToSection('#contact')}
                className="btn-primary text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
              >
                Konsultacja
              </button>
            </div>

            {/* Mobile Actions */}
            <div className="flex items-center gap-2 lg:hidden">
              {/* Phone icon - always visible on mobile */}
              <a
                href="tel:+48501601189"
                className="p-2 rounded-lg hover:bg-teal-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
                aria-label="Zadzwoń: +48 501 601 189"
              >
                <Phone className="w-5 h-5 text-teal-700" />
              </a>

              {/* Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg hover:bg-stone-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
                aria-label={isMobileMenuOpen ? 'Zamknij menu' : 'Otwórz menu'}
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6 text-stone-700" />
                ) : (
                  <Menu className="w-6 h-6 text-stone-700" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className="absolute inset-0 bg-stone-900/50 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        <div
          className={`absolute top-0 right-0 w-full max-w-sm h-full bg-white shadow-2xl transition-transform duration-500 ease-out-expo ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="p-6 pt-20">
            <div className="flex flex-col gap-4">
              {navLinks.map((link, index) => (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className="text-left text-lg font-medium text-stone-700 hover:text-teal-700 py-3 border-b border-stone-100 transition-all duration-300 focus-visible:outline-none focus-visible:text-teal-700 focus-visible:bg-teal-50 rounded-sm"
                  style={{
                    animationDelay: `${index * 80}ms`,
                  }}
                >
                  {link.name}
                </button>
              ))}
            </div>
            <div className="mt-8 flex flex-col gap-4">
              <a
                href="tel:+48501601189"
                className="flex items-center gap-3 text-stone-700 hover:text-teal-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded-sm"
              >
                <Phone className="w-5 h-5 text-teal-700" />
                <span className="font-medium">+48 501 601 189</span>
              </a>
              <button
                onClick={() => scrollToSection('#contact')}
                className="btn-primary w-full"
              >
                Konsultacja
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
