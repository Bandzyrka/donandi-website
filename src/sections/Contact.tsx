import { useState, useEffect, useRef } from 'react';
import { MapPin, Phone, Mail, Send, CheckCircle, Loader2 } from 'lucide-react';
import gsap from 'gsap';
// ScrollTrigger registered in App.tsx

const contactInfo = [
  {
    icon: MapPin,
    title: 'Adres',
    content: 'Ul. Sobieskiego 2/32',
    subContent: '39-200 Dębica',
    href: null,
  },
  {
    icon: Phone,
    title: 'Telefon',
    content: '501 601 189',
    subContent: null,
    href: 'tel:501601189',
  },
  {
    icon: Mail,
    title: 'Email',
    content: 'ksiegowosc.donandi@gmail.com',
    subContent: null,
    href: 'mailto:ksiegowosc.donandi@gmail.com',
  },
];

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    consent: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateField = (name: string, value: string | boolean): string => {
    switch (name) {
      case 'name':
        if (!value || (value as string).trim().length === 0) return 'Imię i nazwisko jest wymagane';
        if ((value as string).trim().length < 2) return 'Imię i nazwisko jest wymagane';
        return '';
      case 'email': {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value || (value as string).trim().length === 0) return 'Podaj poprawny adres email';
        if (!emailRegex.test(value as string)) return 'Podaj poprawny adres email';
        return '';
      }
      case 'phone': {
        if (!value || (value as string).trim().length === 0) return '';
        // Accept: 501601189, 501 601 189, +48 501 601 189, +48501601189
        const cleaned = (value as string).replace(/[\s-]/g, '').replace(/^\+48/, '');
        if (!/^\d{9}$/.test(cleaned)) return 'Podaj poprawny numer telefonu (9 cyfr)';
        return '';
      }
      case 'message':
        if (!value || (value as string).trim().length === 0) return 'Wiadomość musi mieć minimum 10 znaków';
        if ((value as string).trim().length < 10) return 'Wiadomość musi mieć minimum 10 znaków';
        return '';
      case 'consent':
        if (!value) return 'Zgoda jest wymagana';
        return '';
      default:
        return '';
    }
  };

  const validateAll = (): boolean => {
    const fields: Record<string, string | boolean> = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
      consent: formData.consent,
    };
    const newErrors: Record<string, string> = {};
    for (const [field, value] of Object.entries(fields)) {
      const error = validateField(field, value);
      if (error) newErrors[field] = error;
    }
    setErrors(newErrors);
    setTouched({ name: true, email: true, phone: true, message: true, consent: true });
    return Object.keys(newErrors).length === 0;
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const fieldValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, fieldValue);
    setErrors((prev) => ({ ...prev, [name]: error }));
    setFocusedField(null);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animations
      gsap.fromTo(
        '.contact-headline',
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
        '.contact-description',
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

      // Contact cards animation
      gsap.fromTo(
        '.contact-card',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.3,
          stagger: 0.05,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.contact-cards',
            start: 'top 85%',
          },
        }
      );

      // Form animation
      gsap.fromTo(
        '.contact-form',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.3,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.contact-form',
            start: 'top 85%',
          },
          delay: 0.1,
        }
      );

      // Form fields stagger
      gsap.fromTo(
        '.form-field',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.3,
          stagger: 0.05,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.contact-form',
            start: 'top 85%',
          },
          delay: 0.15,
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateAll()) return;
    setIsSubmitting(true);

    try {
      // Send form data via Formspree
      // Setup: Go to formspree.io, create form for fundacja.donandi@gmail.com, replace endpoint below
      const response = await fetch('https://formspree.io/f/xjgjvpyb', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || 'Nie podano',
          subject: formData.subject || 'Kontakt ze strony',
          message: formData.message,
          _subject: `Nowa wiadomość od ${formData.name} - Księgowość Donandi`,
        }),
      });

      if (!response.ok) {
        throw new Error('Błąd wysyłania');
      }

      setIsSubmitted(true);

      // Reset after showing success
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
          consent: false,
        });
        setErrors({});
        setTouched({});
      }, 5000);
    } catch {
      setErrors({ submit: 'Wystąpił błąd. Spróbuj ponownie lub zadzwoń: 501 601 189' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const fieldValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData((prev) => ({
      ...prev,
      [name]: fieldValue,
    }));
    if (touched[name]) {
      const error = validateField(name, fieldValue);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="section-padding bg-stone-50 relative overflow-hidden"
    >
      <div className="container-custom relative z-10">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="section-label">Kontakt</span>
          <h2 className="contact-headline text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 mb-6">
            Skontaktuj się z <span className="text-teal-700">nami</span>
          </h2>
          <p className="contact-description text-lg text-stone-600">
            Masz pytania? Chętnie na nie odpowiemy. Wypełnij formularz lub skorzystaj 
            z poniższych danych kontaktowych.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Contact info */}
          <div className="lg:col-span-2">
            <div className="contact-cards grid sm:grid-cols-2 lg:grid-cols-1 gap-4">
              {contactInfo.map((item, index) => {
                const Icon = item.icon;
                const cardInner = (
                  <>
                    <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-teal-200 transition-colors duration-300">
                      <Icon className="w-6 h-6 text-teal-700" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-stone-500 mb-1">
                        {item.title}
                      </p>
                      <p className="font-semibold text-stone-900">{item.content}</p>
                      {item.subContent && (
                        <p className="text-sm text-stone-600">{item.subContent}</p>
                      )}
                    </div>
                  </>
                );
                const sharedClass =
                  'contact-card group flex items-start gap-4 p-5 bg-white rounded-2xl hover:bg-stone-50 transition-colors duration-200';
                return item.href ? (
                  <a key={index} href={item.href} className={sharedClass}>
                    {cardInner}
                  </a>
                ) : (
                  <div key={index} className={sharedClass}>
                    {cardInner}
                  </div>
                );
              })}
            </div>

            {/* Social links */}
            <div className="mt-8">
              <p className="text-sm font-medium text-stone-500 mb-4">Znajdź nas</p>
              <div className="flex gap-3">
                {/* Facebook */}
                <a
                  href="https://www.facebook.com/profile.php?id=61568504007796"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-12 h-12 bg-stone-100 rounded-xl flex items-center justify-center text-stone-600 hover:bg-stone-200 hover:text-stone-900 transition-colors duration-200"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>

                {/* Fundacja Donandi website */}
                <a
                  href="https://donandi.pl"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Fundacja Donandi"
                  className="w-12 h-12 bg-stone-100 rounded-xl flex items-center justify-center text-stone-600 hover:bg-stone-200 hover:text-stone-900 transition-colors duration-200"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className="lg:col-span-3">
            <div className="contact-form bg-white rounded-3xl shadow-card p-8 border border-stone-100">
              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-scale-in">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-stone-900 mb-2">
                    Dziękujemy za wiadomość!
                  </h3>
                  <p className="text-stone-600">
                    Odpowiemy najszybciej jak to możliwe.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="form-field">
                      <label
                        htmlFor="name"
                        className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                          focusedField === 'name' ? 'text-teal-700' : 'text-stone-700'
                        }`}
                      >
                        Imię i nazwisko <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('name')}
                        onBlur={handleBlur}
                        required
                        aria-describedby={touched.name && errors.name ? 'name-error' : undefined}
                        aria-invalid={touched.name && !!errors.name}
                        className={`w-full px-4 py-3 bg-stone-50 border rounded-xl text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
                          touched.name && errors.name
                            ? 'border-red-400 focus:ring-red-500/20 focus:border-red-500'
                            : 'border-stone-200 focus:ring-teal-500/20 focus:border-teal-500'
                        }`}
                        placeholder="Jan Kowalski"
                      />
                      {touched.name && errors.name && (
                        <p id="name-error" className="mt-1.5 text-xs text-red-500" role="alert">{errors.name}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div className="form-field">
                      <label
                        htmlFor="email"
                        className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                          focusedField === 'email' ? 'text-teal-700' : 'text-stone-700'
                        }`}
                      >
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('email')}
                        onBlur={handleBlur}
                        required
                        aria-describedby={touched.email && errors.email ? 'email-error' : undefined}
                        aria-invalid={touched.email && !!errors.email}
                        className={`w-full px-4 py-3 bg-stone-50 border rounded-xl text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
                          touched.email && errors.email
                            ? 'border-red-400 focus:ring-red-500/20 focus:border-red-500'
                            : 'border-stone-200 focus:ring-teal-500/20 focus:border-teal-500'
                        }`}
                        placeholder="jan@example.com"
                      />
                      {touched.email && errors.email && (
                        <p id="email-error" className="mt-1.5 text-xs text-red-500" role="alert">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    {/* Phone */}
                    <div className="form-field">
                      <label
                        htmlFor="phone"
                        className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                          focusedField === 'phone' ? 'text-teal-700' : 'text-stone-700'
                        }`}
                      >
                        Telefon
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('phone')}
                        onBlur={handleBlur}
                        aria-describedby={touched.phone && errors.phone ? 'phone-error' : undefined}
                        aria-invalid={touched.phone && !!errors.phone}
                        className={`w-full px-4 py-3 bg-stone-50 border rounded-xl text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
                          touched.phone && errors.phone
                            ? 'border-red-400 focus:ring-red-500/20 focus:border-red-500'
                            : 'border-stone-200 focus:ring-teal-500/20 focus:border-teal-500'
                        }`}
                        placeholder="123 456 789"
                      />
                      {touched.phone && errors.phone && (
                        <p id="phone-error" className="mt-1.5 text-xs text-red-500" role="alert">{errors.phone}</p>
                      )}
                    </div>

                    {/* Subject */}
                    <div className="form-field">
                      <label
                        htmlFor="subject"
                        className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                          focusedField === 'subject' ? 'text-teal-700' : 'text-stone-700'
                        }`}
                      >
                        Temat
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('subject')}
                        onBlur={handleBlur}
                        className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all duration-300 appearance-none cursor-pointer"
                      >
                        <option value="">Wybierz temat</option>
                        <option value="ksiegowosc">Księgowość</option>
                        <option value="kadry">Kadry i płace</option>
                        <option value="doradztwo">Doradztwo podatkowe</option>
                        <option value="wspolpraca">Współpraca</option>
                        <option value="inne">Inne</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="form-field">
                    <label
                      htmlFor="message"
                      className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                        focusedField === 'message' ? 'text-teal-700' : 'text-stone-700'
                      }`}
                    >
                      Wiadomość <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('message')}
                      onBlur={handleBlur}
                      required
                      rows={5}
                      aria-describedby={touched.message && errors.message ? 'message-error' : undefined}
                      aria-invalid={touched.message && !!errors.message}
                      className={`w-full px-4 py-3 bg-stone-50 border rounded-xl text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 transition-all duration-300 resize-none ${
                        touched.message && errors.message
                          ? 'border-red-400 focus:ring-red-500/20 focus:border-red-500'
                          : 'border-stone-200 focus:ring-teal-500/20 focus:border-teal-500'
                      }`}
                      placeholder="Opisz, w czym możemy pomóc..."
                    />
                    {touched.message && errors.message && (
                      <p id="message-error" className="mt-1.5 text-xs text-red-500" role="alert">{errors.message}</p>
                    )}
                  </div>

                  {/* Consent */}
                  <div className="form-field">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        id="consent"
                        name="consent"
                        checked={formData.consent}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                        aria-describedby={touched.consent && errors.consent ? 'consent-error' : undefined}
                        aria-invalid={touched.consent && !!errors.consent}
                        className="w-5 h-5 mt-0.5 rounded border-stone-300 text-teal-700 focus:ring-teal-500/20 cursor-pointer"
                      />
                      <span className="text-sm text-stone-600">
                        Wyrażam zgodę na przetwarzanie moich danych osobowych w celu
                        udzielenia odpowiedzi na zapytanie. Administratorem danych jest
                        Księgowość Donandi. *
                      </span>
                    </label>
                    {touched.consent && errors.consent && (
                      <p id="consent-error" className="mt-1.5 text-xs text-red-500" role="alert">{errors.consent}</p>
                    )}
                  </div>

                  {/* Submit error */}
                  {errors.submit && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                      {errors.submit}
                    </div>
                  )}

                  {/* Submit button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-primary py-4 text-base disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        <span>Wysyłanie...</span>
                      </>
                    ) : (
                      <>
                        <span>Wyślij wiadomość</span>
                        <Send className="w-5 h-5 ml-2" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
