import { useEffect, useState, useRef } from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
// ScrollTrigger registered in App.tsx

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: 'Ile kosztuje zmiana biura rachunkowego?',
    answer:
      'Zmiana biura rachunkowego jest bezpłatna i znacznie prostsza, niż się wydaje. Pierwszą konsultację prowadzimy gratis — omawiamy Twoją sytuację, oczekiwania i dobieramy odpowiedni pakiet. Nie ma ukrytych opłat za przejęcie dokumentacji ani za wdrożenie. Po podpisaniu umowy zajmujemy się całą logistyką przekazania dokumentów od poprzedniego biura.',
  },
  {
    question: 'Co jeśli mam zaległości podatkowe?',
    answer:
      'Zaległości podatkowe to częstsza sytuacja, niż myślisz — i zdecydowanie można ją uporządkować. Pomagamy ocenić skalę problemu, przygotować korygujące deklaracje oraz negocjować z urzędem skarbowym układy ratalne lub umorzenia odsetek. Działamy dyskretnie i bez oceniania — ważne, żeby jak najszybciej zacząć naprawiać sytuację.',
  },
  {
    question: 'Jak wygląda proces wdrożenia?',
    answer:
      'Wdrożenie przebiega w trzech krokach. Krok 1: bezpłatna rozmowa — poznajemy Twoją firmę, rodzaj działalności i dotychczasowy sposób rozliczeń. Krok 2: formalności — podpisujemy umowę i udzielamy sobie wzajemnych pełnomocnictw (do US i ZUS). Krok 3: przejęcie — przejmujemy dokumentację od poprzedniego biura lub porządkujemy dokumenty od zera. Cały proces zajmuje zwykle 3–5 dni roboczych.',
  },
  {
    question: 'Czy obsługujecie firmy zdalnie?',
    answer:
      'Tak — prowadzimy pełną obsługę zdalną na terenie całej Polski. Dokumenty przekazujesz cyfrowo (skan, zdjęcie lub aplikacja do faktur), komunikujemy się przez e-mail, telefon lub wideorozmowę. Osobiste spotkania są możliwe w naszym biurze w Warszawie, ale nie są wymagane. Wielu naszych klientów nigdy nie odwiedziło nas osobiście — i są w pełni zadowoleni.',
  },
  {
    question: 'Jakie dokumenty będę musiał dostarczać?',
    answer:
      'Obsługujemy dokumenty w formie cyfrowej — wystarczy zdjęcie lub skan faktury, paragonu czy wyciągu bankowego. Możesz korzystać z dowolnej aplikacji do wystawiania faktur (np. inFakt, wFirma, Fakturownia) lub po prostu wrzucać skany na wspólny dysk. Na początku współpracy ustalimy razem sposób, który najbardziej pasuje do Twojego stylu pracy.',
  },
  {
    question: 'Czy pomagacie w rozliczaniu dotacji NGO?',
    answer:
      'To jedna z naszych głównych specjalizacji. Obsługujemy fundacje, stowarzyszenia i przedsiębiorstwa społeczne — rozliczamy dotacje unijne, rządowe i samorządowe, przygotowujemy sprawozdania merytoryczne i finansowe, monitorujemy wskaźniki wymagane do utrzymania statusu PES. Działamy pod patronatem Fundacji Donandi, więc doskonale rozumiemy specyfikę sektora.',
  },
  {
    question: 'Jak szybko odpowiadacie na pytania?',
    answer:
      'Odpowiadamy na wiadomości e-mail i telefony w ciągu 24 godzin w dni robocze — zazwyczaj znacznie szybciej. Każdy klient ma przypisanego dedykowanego opiekuna, do którego może pisać bezpośrednio. Nie trafiasz na infolinię ani do kolejki — kontaktujesz się z osobą, która zna Twoją firmę.',
  },
  {
    question: 'Czy mogę liczyć na stałego opiekuna?',
    answer:
      'Tak — od pierwszego dnia współpracy przydzielamy Ci dedykowanego opiekuna księgowego, który zna Twoją firmę, jej historię i specyfikę. To ta sama osoba, z którą rozmawiasz o deklaracjach, pytasz o fakturę i zgłaszasz zmiany. Żadnego przerzucania między działami ani tłumaczenia swojej sytuacji od nowa przy każdym kontakcie.',
  },
];

const FAQAccordionItem = ({
  item,
  index,
  isOpen,
  onToggle,
}: {
  item: FAQItem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) => {
  return (
    <div className="faq-item border border-stone-200 rounded-xl overflow-hidden transition-shadow duration-300 hover:shadow-md">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left bg-white hover:bg-stone-50 transition-colors duration-200"
        aria-expanded={isOpen}
        aria-controls={`faq-content-${index}`}
      >
        <div className="flex items-center gap-4 min-w-0">
          <span className="flex-shrink-0 w-7 h-7 rounded-full bg-teal-50 border border-teal-100 text-teal-700 text-xs font-bold flex items-center justify-center">
            {index + 1}
          </span>
          <span className="font-display text-base sm:text-lg font-semibold text-stone-900 tracking-tight leading-snug">
            {item.question}
          </span>
        </div>
        <ChevronDown
          className={`w-5 h-5 flex-shrink-0 text-teal-600 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* CSS grid-template-rows transition for smoother height animation */}
      <div
        id={`faq-content-${index}`}
        className="grid transition-[grid-template-rows,opacity] duration-300 ease-out"
        style={{
          gridTemplateRows: isOpen ? '1fr' : '0fr',
          opacity: isOpen ? 1 : 0,
        }}
      >
        <div className="overflow-hidden">
          <div className="px-6 pb-6 pt-1">
            <div className="pl-11">
              <p className="text-stone-600 leading-relaxed text-sm sm:text-base">
                {item.answer}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const FAQ = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.faq-label',
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
        '.faq-headline',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.3,
          ease: 'power2.out',
          delay: 0.05,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );

      gsap.fromTo(
        '.faq-subtext',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.3,
          ease: 'power2.out',
          delay: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );

      gsap.fromTo(
        '.faq-item',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.3,
          ease: 'power2.out',
          stagger: 0.05,
          scrollTrigger: {
            trigger: '.faq-list',
            start: 'top 78%',
          },
        }
      );

      gsap.fromTo(
        '.faq-cta',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.3,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.faq-cta',
            start: 'top 90%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="faq"
      ref={sectionRef}
      className="section-padding bg-stone-50 relative overflow-hidden"
    >
      {/* Subtle dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: '24px 24px',
        }}
      />
      {/* Gradient accents */}
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-teal-100/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-amber-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="container-custom relative z-10">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="faq-label section-label">Często zadawane pytania</span>
          <h2 className="faq-headline font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-stone-900 mb-6 tracking-tight leading-[1.1]">
            Masz pytania?{' '}
            <span className="text-teal-700 relative">
              Mamy odpowiedzi
              <svg
                className="absolute -bottom-2 left-0 w-full h-3 text-amber-300/60"
                viewBox="0 0 200 12"
                preserveAspectRatio="none"
              >
                <path
                  d="M0,8 Q50,0 100,8 T200,8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h2>
          <p className="faq-subtext text-lg sm:text-xl text-stone-600 leading-relaxed max-w-2xl mx-auto">
            Zebraliśmy pytania, które słyszymy najczęściej od nowych klientów.
            Jeśli nie znajdziesz tu odpowiedzi — napisz do nas, chętnie pomożemy.
          </p>
        </div>

        {/* FAQ list */}
        <div className="faq-list max-w-3xl mx-auto space-y-3 mb-14">
          {faqs.map((item, index) => (
            <FAQAccordionItem
              key={index}
              item={item}
              index={index}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="faq-cta text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-white border border-stone-200 rounded-2xl px-8 py-6 shadow-sm">
            <div className="text-left">
              <p className="font-semibold text-stone-900 text-sm sm:text-base">
                Nie znalazłeś odpowiedzi na swoje pytanie?
              </p>
              <p className="text-stone-500 text-sm mt-0.5">
                Napisz do nas — odpiszemy w ciągu 24 godzin.
              </p>
            </div>
            <button
              onClick={() =>
                document
                  .querySelector('#contact')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }
              className="flex-shrink-0 inline-flex items-center gap-2 bg-teal-700 text-white font-semibold text-sm px-5 py-3 rounded-xl hover:bg-teal-800 transition-colors duration-200"
            >
              <span>Zadaj pytanie</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
