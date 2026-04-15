import { useEffect, useRef } from 'react';
import { Facebook, Mail, Phone, MapPin, Heart, Globe } from 'lucide-react';
import gsap from 'gsap';
// ScrollTrigger registered in App.tsx

const footerLinks = {
  services: [
    { name: 'Księgowość NGO (org. pozarządowe)', href: '#services' },
    { name: 'Obsługa PES (ekonomia społeczna)', href: '#services' },
    { name: 'Księgowość pełna', href: '#services' },
    { name: 'Księgowość uproszczona', href: '#services' },
    { name: 'Kadry i płace', href: '#services' },
    { name: 'Radca prawny', href: '#services' },
  ],
  company: [
    { name: 'O nas', href: '#about' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Opinie', href: '#testimonials' },
  ],
  contact: [
    { icon: Mail, text: 'ksiegowosc.donandi@gmail.com', href: 'mailto:ksiegowosc.donandi@gmail.com' },
    { icon: Phone, text: '+48 501 601 189', href: 'tel:+48501601189' },
    { icon: MapPin, text: 'Dębica, Polska', href: null },
  ],
};

const socialLinks = [
  { icon: Facebook, href: 'https://www.facebook.com/profile.php?id=61568504007796', label: 'Facebook', external: true },
  { icon: Globe, href: 'https://fundacja-donandi.pl', label: 'Fundacja Donandi', external: true },
];

const Footer = () => {
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Logo and description
      gsap.fromTo(
        '.footer-logo',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.3,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
          },
        }
      );

      // Link columns
      gsap.fromTo(
        '.footer-column',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.3,
          stagger: 0.05,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
          },
          delay: 0.05,
        }
      );

      // Social icons
      gsap.fromTo(
        '.social-icon',
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.3,
          stagger: 0.05,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
          },
          delay: 0.1,
        }
      );

      // Bottom bar
      gsap.fromTo(
        '.footer-bottom',
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.3,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
          },
          delay: 0.15,
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (href: string) => {
    if (href === '#') return;
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer
      ref={footerRef}
      className="bg-stone-900 text-white relative overflow-hidden"
    >
      {/* Top subtle border */}
      <div className="footer-border h-px bg-stone-700" />

      <div className="container-custom relative z-10 py-16">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Logo and description */}
          <div className="lg:col-span-2">
            <div className="footer-logo">
              <a
                href="#"
                className="flex items-center gap-3 mb-6 group"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                <div className="w-12 h-12 bg-stone-700 rounded-xl flex items-center justify-center transition-colors duration-300 group-hover:bg-teal-700">
                  <span className="text-white font-bold text-xl">D</span>
                </div>
                <span className="font-semibold text-xl text-white">
                  Księgowość Donandi
                </span>
              </a>
              <p className="text-stone-300 leading-relaxed mb-6 max-w-prose">
                Wspieramy biznes i misję społeczną od 2006 roku. Zapewniamy profesjonalną obsługę księgową dla firm, organizacji pozarządowych (NGO) oraz podmiotów ekonomii społecznej (PES), budując relacje oparte na zaufaniu i rzetelności.
              </p>

              {/* Social links */}
              <div className="flex gap-3">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.href}
                      aria-label={social.label}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-icon w-10 h-10 bg-stone-800 rounded-lg flex items-center justify-center text-stone-400 hover:bg-stone-700 hover:text-white transition-colors duration-300"
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Services links */}
          <div className="footer-column">
            <h4 className="font-semibold text-white mb-4">Usługi</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-stone-300 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company links */}
          <div className="footer-column">
            <h4 className="font-semibold text-white mb-4">Firma</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-stone-300 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div className="footer-column">
            <h4 className="font-semibold text-white mb-4">Kontakt</h4>
            <ul className="space-y-3">
              {footerLinks.contact.map((item, index) => {
                const Icon = item.icon;
                return (
                  <li key={index} className="flex items-start gap-3">
                    <Icon className="w-5 h-5 text-stone-500 flex-shrink-0 mt-0.5" />
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-stone-300 hover:text-white transition-colors duration-300"
                      >
                        {item.text}
                      </a>
                    ) : (
                      <span className="text-stone-300">{item.text}</span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom mt-12 pt-8 border-t border-stone-800">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <p className="text-stone-400 text-sm text-center">
              © 2026 Księgowość Donandi. Wszelkie prawa zastrzeżone.
            </p>
          </div>

          {/* Fundacja Donandi mention */}
          <div className="mt-6 pt-6 border-t border-stone-800/50">
            <p className="text-center text-stone-400 text-sm flex items-center justify-center gap-1">
              Działamy pod patronatem{' '}
              <a
                href="https://fundacja-donandi.pl"
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-500 hover:text-white transition-colors duration-300"
              >
                Fundacji Donandi
              </a>
              {' '}<Heart className="w-4 h-4 text-red-400 fill-red-400 inline" />
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
