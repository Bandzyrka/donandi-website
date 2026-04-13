import { useEffect, useRef, useState } from 'react';
import {
  Calculator,
  FileText,
  Users,
  Scale,
  Building2,
  TrendingUp,
  Heart,
  Handshake,
  BookOpen,
  ArrowRight,
  X,
} from 'lucide-react';
import gsap from 'gsap';
// ScrollTrigger registered in App.tsx

interface Service {
  icon: React.ElementType;
  title: string;
  short: string;
  tags?: string[];
  expanded: string[];
}

const services: Service[] = [
  {
    icon: Heart,
    title: 'Księgowość NGO',
    short: 'Specjalistyczne rozliczenia dla fundacji i stowarzyszeń',
    expanded: [
      'Działalność w trzecim sektorze wymaga nie tylko serca, ale i doskonałej znajomości specyficznych przepisów podatkowych. Oferowana przez nas księgowość dla NGO to kompleksowe wsparcie dla fundacji, stowarzyszeń oraz klubów sportowych, które chcą skupić się na swojej misji, mając pewność, że ich finanse są w dobrych rękach.',
      'Doskonale rozumiemy wyzwania, przed którymi stoją organizacje pozarządowe, dlatego w ramach współpracy zapewniamy:',
      '• Prowadzenie ksiąg rachunkowych zgodnie z ustawą o rachunkowości, z uwzględnieniem specyfiki działalności statutowej.',
      '• Rzetelne rozliczanie dotacji i subwencji (unijnych, państwowych i samorządowych) oraz przygotowywanie raportów dla darczyńców.',
      '• Sporządzanie rocznych sprawozdań finansowych oraz merytorycznych, dostosowanych do wymagań odpowiednich ministerstw.',
      '• Obsługę działalności odpłatnej i gospodarczej NGO, dbając o właściwe rozdzielenie kosztów.',
      'Z nami Twoja organizacja staje się w pełni transparentna, co buduje zaufanie darczyńców i instytucji kontrolujących.',
    ],
  },
  {
    icon: Handshake,
    title: 'Obsługa PES',
    short: 'Kompleksowe wsparcie dla podmiotów ekonomii społecznej',
    expanded: [
      'Przekształcenie w Przedsiębiorstwo Ekonomii Społecznej (PES) to szansa na rozwój, ale też szereg nowych obowiązków sprawozdawczych. Jako partner merytoryczny, wspieramy podmioty ekonomii społecznej w procesie transformacji oraz bieżącej działalności, dbając o zachowanie wszystkich przywilejów wynikających z tego statusu.',
      'Nasza obsługa finansowa PES obejmuje kluczowe obszary niezbędne do prawidłowego funkcjonowania podmiotu:',
      '• Monitoring wskaźników zatrudnienia i reinwestowania zysków, co jest niezbędne do utrzymania statusu przedsiębiorstwa społecznego.',
      '• Doradztwo w zakresie pozyskiwania i rozliczania instrumentów zwrotnych oraz bezzwrotnych dedykowanych dla sektora ES.',
      '• Przygotowywanie specjalistycznej sprawozdawczości dotyczącej reintegracji społecznej i zawodowej pracowników.',
      '• Optymalizacja podatkowa z uwzględnieniem zwolnień przysługujących podmiotom realizującym cele pożytku publicznego.',
      'Pomagamy Ci profesjonalnie zarządzać organizacją, która łączy biznesową efektywność z realną zmianą społeczną.',
    ],
  },
  {
    icon: FileText,
    title: 'Księgowość pełna',
    short: 'Kompleksowa obsługa dla rozwijających się przedsiębiorstw wymagających pełnej księgowości.',
    tags: ['Pełna księgowość', 'Sprawozdania', 'Bilans'],
    expanded: [
      'Wraz ze wzrostem skali działalności, rosną wymagania informacyjne i prawne stawiane przed przedsiębiorstwem. Księgowość pełna to nie tylko ustawowy obowiązek dla spółek kapitałowych, ale przede wszystkim potężne narzędzie analityczne, które pozwala na precyzyjne zarządzanie kapitałem i planowanie inwestycji.',
      'Nasze podejście do prowadzenia ksiąg rachunkowych wykracza poza schematy – stajemy się Twoim zewnętrznym działem controllingu:',
      '1. Opracowujemy indywidualną politykę rachunkowości oraz zakładowy plan kont dostosowany do specyfiki Twojej branży.',
      '2. Zapewniamy bieżącą ewidencję wszystkich operacji gospodarczych i kontrolę nad rozrachunkami z kontrahentami.',
      '3. Monitorujemy płynność finansową i przygotowujemy raporty, które ułatwiają podejmowanie kluczowych decyzji biznesowych.',
      '4. Gwarantujemy profesjonalną obsługę finansową firm w zakresie reprezentacji przed organami kontrolnymi.',
      'Z nami skomplikowane księgi stają się czytelnym źródłem wiedzy o Twoim sukcesie.',
    ],
  },
  {
    icon: Calculator,
    title: 'Księgowość uproszczona',
    short: 'Idealna dla małych firm i startupów. Proste rozliczenia, niskie koszty, pełna kontrola.',
    tags: ['KPiR', 'Ryczałt', 'Faktury'],
    expanded: [
      'Prowadzenie własnego biznesu to wyzwanie, które wymaga pełnego skupienia na pasji i klientach, a nie na zawiłościach systemu podatkowego. Nasza oferta na księgowość uproszczoną została stworzona z myślą o mikro-przedsiębiorcach, freelancerach oraz innowacyjnych startupach, którzy szukają rzetelnego wsparcia w rozsądnej cenie.',
      'W ramach współpracy oferujemy nie tylko ewidencję dokumentów, ale przede wszystkim bezpieczeństwo Twojego biznesu:',
      '• Prowadzenie podatkowej księgi przychodów i rozchodów (KPiR) z dbałością o każdy koszt uzyskania przychodu.',
      '• Kompleksowa obsługa firm rozliczających się poprzez ryczałt ewidencjonowany.',
      '• Bieżące prowadzenie ewidencji środków trwałych oraz wartości niematerialnych i prawnych.',
      '• Terminowe sporządzanie i wysyłka deklaracji PIT oraz plików JPK_V7.',
      'Dzięki nam zyskujesz jasny obraz swoich finansów i pewność, że Twoje rozliczenia są zawsze zgodne z aktualnie obowiązującymi przepisami, takimi jak Ład Podatkowy.',
    ],
  },
  {
    icon: Users,
    title: 'Kadry i płace',
    short: 'Profesjonalna obsługa personalna. Umowy, wynagrodzenia, zwolnienia, ZUS.',
    tags: ['Umowy', 'Wynagrodzenia', 'ZUS'],
    expanded: [
      'Zespół to serce każdej firmy, jednak zarządzanie dokumentacją pracowniczą i rozliczeniami bywa procesem czasochłonnym i obarczonym dużym ryzykiem prawnym. Nasz outsourcing kadr i płac pozwala zdjąć ten ciężar z Twoich barków, zapewniając pełną dyskrecję i profesjonalizm.',
      'Zajmujemy się każdym aspektem zatrudnienia, od momentu rekrutacji po zakończenie współpracy:',
      '• Precyzyjne naliczanie wynagrodzeń z uwzględnieniem dodatków, premii oraz zwolnień lekarskich.',
      '• Sporządzanie umów o pracę, umów zlecenie i o dzieło, zgodnie z aktualnym Kodeksem Pracy.',
      '• Prowadzenie pełnych akt osobowych pracowników (również w formie elektronicznej).',
      '• Nadzór nad terminami szkoleń BHP, badań lekarskich oraz rozliczanie limitów urlopowych.',
      'Dzięki naszej pomocy budujesz wizerunek rzetelnego pracodawcy, a Twoi pracownicy mają pewność, że ich wypłaty zawsze dotrą na czas i zostaną obliczone bezbłędnie.',
    ],
  },
  {
    icon: Scale,
    title: 'Doradztwo podatkowe',
    short: 'Optymalizacja i planowanie podatkowe. Pomagamy minimalizować obciążenia fiskalne.',
    tags: ['Optymalizacja', 'Planowanie', 'Kontrola'],
    expanded: [
      'W świecie dynamicznie zmieniających się przepisów, pasywne podejście do podatków to ryzyko, na które nie warto się narażać. Nasze doradztwo podatkowe to usługa proaktywna – nie tylko reagujemy na zmiany, ale wyprzedzamy je, szukając rozwiązań najkorzystniejszych dla Twojego portfela.',
      'Pomagamy bezpiecznie nawigować w gąszczu przepisów, oferując:',
      '• Indywidualne planowanie podatkowe i dobór optymalnej formy opodatkowania dla nowych oraz istniejących projektów.',
      '• Skuteczną optymalizację podatkową, która pozwala legalnie minimalizować obciążenia fiskalne i zwiększać rentowność firmy.',
      '• Przeprowadzanie audytów podatkowych, które identyfikują ewentualne ryzyka i obszary do poprawy.',
      '• Przygotowywanie wniosków o wydanie wiążących interpretacji podatkowych.',
      'Jesteśmy Twoim głosem w kontaktach z Urzędem Skarbowym, dbając o to, by każda decyzja finansowa była poparta solidną analizą prawną.',
    ],
  },
  {
    icon: Building2,
    title: 'Rozliczenia ZUS',
    short: 'Pełna obsługa spraw ubezpieczeniowych. Deklaracje, zgłoszenia, rozliczenia.',
    tags: ['Deklaracje', 'Zgłoszenia', 'Kontrola'],
    expanded: [
      'Relacje z Zakładem Ubezpieczeń Społecznych wymagają ogromnej skrupulatności i terminowości. Błędy w zgłoszeniach czy deklaracjach mogą prowadzić do uciążliwych kontroli i naliczania odsetek. Oferujemy kompleksowe rozliczenia z ZUS, które eliminują stres związany z ubezpieczeniami społecznymi.',
      'Zapewniamy pełne wsparcie w komunikacji z urzędem:',
      '• Bieżące przygotowywanie i wysyłka deklaracji rozliczeniowych (ZUS DRA, RCA, RSA) poprzez system Płatnik.',
      '• Szybkie zgłoszenia do ZUS nowych pracowników oraz wyrejestrowywanie osób kończących współpracę.',
      '• Rozliczanie składek zdrowotnych i społecznych osób prowadzących działalność gospodarczą.',
      '• Pomoc w uzyskiwaniu zaświadczeń o niezaleganiu oraz reprezentacja podczas kontroli z ZUS.',
      'Z nami masz gwarancję, że Twoja historia ubezpieczeniowa i dokumentacja pracowników są prowadzone wzorowo.',
    ],
  },
  {
    icon: TrendingUp,
    title: 'Sprawozdawczość',
    short: 'Okresowe i roczne sprawozdania finansowe. Zgodność z przepisami i terminowość.',
    tags: ['Miesięczne', 'Kwartalne', 'Roczne'],
    expanded: [
      'Rzetelne podsumowanie roku obrotowego to nie tylko formalność, ale wizytówka Twojej firmy przed bankami, inwestorami i kontrahentami. Usługa, jaką jest sprawozdawczość finansowa, zapewnia, że najważniejsze dokumenty w Twojej firmie zostaną przygotowane profesjonalnie i na czas.',
      'W ramach zamknięcia roku i raportowania okresowego oferujemy:',
      '1. Sporządzanie pełnego rocznego sprawozdania finansowego, w tym bilansu oraz rachunku zysków i strat.',
      '2. Przygotowanie informacji dodatkowej oraz zestawienia zmian w kapitale własnym.',
      '3. Elektroniczną wysyłkę sprawozdań do Krajowego Rejestru Sądowego (KRS) oraz Szefa KAS.',
      '4. Opracowywanie raportów zarządczych i analiz finansowych na specjalne życzenie klienta.',
      'Nasze sprawozdania to gwarancja zgodności z przepisami i terminowości, co buduje Twoją wiarygodność w całym środowisku biznesowym.',
    ],
  },
  {
    icon: BookOpen,
    title: 'Radca prawny',
    short: 'Profesjonalne wsparcie prawne dla Twojego biznesu i organizacji',
    expanded: [
      'W prowadzeniu firmy i organizacji pozarządowej solidne zaplecze prawne jest równie ważne jak dobra księgowość. Nasz radca prawny zapewnia kompleksową opiekę prawną, która chroni Twoje interesy i minimalizuje ryzyko operacyjne w codziennej działalności.',
      'Oferujemy wsparcie dostosowane do specyfiki nowoczesnego biznesu oraz sektora NGO:',
      '• Obsługa prawna firm w zakresie sporządzania, opiniowania i negocjowania umów handlowych oraz statutów.',
      '• Pomoc w procesach przekształceń własnościowych, w tym doradztwo przy uzyskiwaniu statusu Przedsiębiorstwa Społecznego.',
      '• Reprezentowanie Twoich interesów w sporach przed sądami powszechnymi oraz organami administracji publicznej.',
      '• Doradztwo w obszarze prawa pracy, ochrony danych osobowych (RODO) oraz prawa własności intelektualnej.',
      'Dzięki ścisłej współpracy prawnika z naszymi księgowymi, otrzymujesz spójne rozwiązania, które biorą pod uwagę zarówno aspekty prawne, jak i finansowe Twojego przedsięwzięcia.',
    ],
  },
];

const ServiceCard = ({ service, index }: { service: Service; index: number }) => {
  const [isOpen, setIsOpen] = useState(false);
  const Icon = service.icon;

  const isPriority = index < 2;

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const paragraphs = service.expanded;

  // Modal overlay for expanded content
  const ExpandedModal = () => (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-stone-900/60 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={handleClose}
      />
      {/* Modal */}
      <div
        className={`fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-2xl md:max-h-[85vh] bg-white rounded-2xl shadow-2xl z-50 overflow-hidden transition-all duration-300 ${
          isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
        }`}
      >
        {/* Modal header */}
        <div className={`p-6 md:p-8 ${isPriority ? 'bg-amber-50' : 'bg-stone-50'}`}>
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md ${
                isPriority ? 'bg-gradient-to-br from-teal-500 to-teal-600' : 'bg-teal-600'
              }`}>
                <Icon className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="font-display text-2xl font-bold text-stone-900 tracking-tight">
                  {service.title}
                </h3>
                {isPriority && (
                  <p className="text-amber-600 text-sm font-medium mt-1 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                    Nasza specjalizacja
                  </p>
                )}
              </div>
            </div>
            <button
              onClick={handleClose}
              className="p-2 rounded-full hover:bg-stone-200/50 transition-colors"
              aria-label="Zamknij"
            >
              <X className="w-5 h-5 text-stone-500" />
            </button>
          </div>
        </div>
        {/* Modal content */}
        <div className="p-6 md:p-8 overflow-y-auto max-h-[60vh]">
          <div className="space-y-4">
            {paragraphs.map((para, i) => {
              const isBullet = para.startsWith('•') || /^\d+\./.test(para);
              return (
                <p
                  key={i}
                  className={`leading-relaxed ${
                    isBullet
                      ? 'text-stone-600 pl-4 text-sm'
                      : i === 0 || i === paragraphs.length - 1
                      ? 'text-stone-700 font-medium'
                      : 'text-stone-600'
                  }`}
                >
                  {para}
                </p>
              );
            })}
          </div>
        </div>
        {/* Modal footer */}
        <div className="p-6 md:p-8 pt-0">
          <button
            onClick={() => {
              handleClose();
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`w-full py-3.5 px-6 font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 ${
              isPriority
                ? 'bg-amber-500 text-white hover:bg-amber-600'
                : 'bg-teal-600 text-white hover:bg-teal-700'
            }`}
          >
            <span>Skontaktuj się z nami</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </>
  );

  // Priority cards (NGO section) — bold, warm, unmistakably special
  if (isPriority) {
    return (
      <>
        <div className="service-card group relative bg-amber-50 rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 border-2 border-amber-300 shadow-lg shadow-amber-100/50 cursor-pointer"
          onClick={handleOpen}
        >
          {/* Warm decorative accent */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-amber-200/60 to-transparent rounded-bl-full" />
          <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-amber-100/80 to-transparent rounded-tr-full" />

          {/* Card content */}
          <div className="p-8 flex flex-col flex-1 relative z-10">
            {/* Icon + Title row */}
            <div className="flex items-start gap-4 mb-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center flex-shrink-0 shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300">
                <Icon className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-stone-900 tracking-tight">
                  {service.title}
                </h3>
                <p className="text-amber-700 text-sm font-semibold mt-0.5 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                  Nasza specjalizacja
                </p>
              </div>
            </div>

            {/* Short description */}
            <p className="text-stone-700 leading-relaxed mb-6 flex-1">
              {service.short}
            </p>

            {/* CTA — warm accent */}
            <div className="inline-flex items-center gap-2 text-sm font-bold text-amber-700 group-hover:text-amber-800 transition-colors duration-200">
              <span>Dowiedz się więcej</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </div>
          </div>
        </div>
        <ExpandedModal />
      </>
    );
  }

  // Regular cards — crisp white on tinted background with delight
  return (
    <>
      <div
        className="service-card group bg-white rounded-xl border border-stone-200/80 overflow-hidden flex flex-col transition-all duration-300 hover:border-teal-400 hover:shadow-xl hover:-translate-y-1.5 shadow-lg shadow-stone-200/50 cursor-pointer relative"
        onClick={handleOpen}
      >
        {/* Hover glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-teal-50/0 to-amber-50/0 group-hover:from-teal-50/60 group-hover:to-amber-50/40 transition-all duration-500" />

        {/* Card content */}
        <div className="p-5 lg:p-6 flex flex-col flex-1 relative z-10">
          {/* Icon with delight animation */}
          <div className="w-11 h-11 rounded-xl bg-stone-100 flex items-center justify-center mb-4 group-hover:bg-teal-100 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-sm">
            <Icon className="w-5 h-5 text-stone-500 group-hover:text-teal-600 transition-colors duration-300" />
          </div>

          {/* Title */}
          <h3 className="font-display text-base font-semibold text-stone-900 mb-2 tracking-tight group-hover:text-teal-900 transition-colors duration-200">
            {service.title}
          </h3>

          {/* Short description */}
          <p className="text-stone-500 text-sm leading-relaxed mb-4 flex-1 group-hover:text-stone-600 transition-colors duration-200">
            {service.short}
          </p>

          {/* Tags — compact inline style */}
          {service.tags && service.tags.length > 0 && (
            <div className="flex items-center gap-1.5 mb-4 text-xs text-stone-400 group-hover:text-stone-500 transition-colors">
              {service.tags.map((tag, i) => (
                <span key={i} className="flex items-center gap-1.5">
                  {i > 0 && <span className="text-stone-300">·</span>}
                  <span>{tag}</span>
                </span>
              ))}
            </div>
          )}

          {/* CTA with arrow animation */}
          <div className="inline-flex items-center gap-1.5 text-sm font-medium text-teal-600 mt-auto">
            <span>Szczegóły</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </div>
      </div>
      <ExpandedModal />
    </>
  );
};

const Services = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.services-label',
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
        '.services-headline',
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
        '.services-subtext',
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

      const cards = cardsRef.current?.querySelectorAll('.service-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.3,
            ease: 'power2.out',
            stagger: 0.05,
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 78%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="section-padding bg-white relative overflow-hidden"
    >
      {/* Subtle dot pattern for texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: '24px 24px'
        }}
      />
      {/* Warm gradient accent in corner */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-amber-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-teal-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="container-custom relative z-10">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="services-label section-label">Nasze Usługi</span>
          <h2 className="services-headline font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-stone-900 mb-8 tracking-tight leading-[1.1]">
            Księgowość, która{' '}
            <span className="text-teal-700 relative">
              dotrzymuje Ci kroku
              <svg className="absolute -bottom-2 left-0 w-full h-3 text-amber-300/60" viewBox="0 0 200 12" preserveAspectRatio="none">
                <path d="M0,8 Q50,0 100,8 T200,8" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
              </svg>
            </span>
          </h2>
          <p className="services-subtext text-lg sm:text-xl text-stone-600 leading-relaxed max-w-2xl">
            Twoje przedsiębiorstwo zasługuje na elastyczne wsparcie. Zapewniamy
            pełną obsługę księgową skrojoną na miarę – od szybkich wdrożeń dla
            startupów po kompleksowe doradztwo dla dużych firm. Jesteśmy Twoim
            zewnętrznym działem finansowym, na którym zawsze możesz polegać.
          </p>
        </div>

        {/* All cards wrapper – used for stagger animation */}
        <div ref={cardsRef} className="mb-6 space-y-12">
          {/* NGO & Sektor Społeczny — Hero section that commands attention */}
          <div className="relative">
            {/* Background accent for the entire NGO section */}
            <div className="absolute -inset-4 sm:-inset-6 lg:-inset-8 bg-gradient-to-br from-amber-50/50 via-transparent to-transparent rounded-3xl -z-10" />

            <div className="mb-10 relative">
              {/* Bold specialization badge */}
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-amber-100 rounded-full mb-4">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                <span className="text-sm font-bold text-amber-800 uppercase tracking-wide">Nasza Specjalizacja</span>
              </div>
              <h3 className="font-display text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight">
                NGO i Sektor Społeczny
              </h3>
              <p className="text-stone-600 mt-3 text-lg max-w-2xl">
                Blisko 20 lat doświadczenia w obsłudze fundacji, stowarzyszeń i przedsiębiorstw społecznych.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {services.slice(0, 2).map((service, index) => (
                <ServiceCard key={index} service={service} index={index} />
              ))}
            </div>
          </div>

          {/* Księgowość Biznesowa — on tinted background for contrast */}
          <div className="bg-stone-50/80 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-10 rounded-3xl">
            <div className="mb-6">
              <span className="text-xs font-medium text-stone-500 uppercase tracking-widest">Dla Firm</span>
              <h3 className="font-display text-xl font-semibold text-stone-800 tracking-tight mt-1">Księgowość Biznesowa</h3>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {services.slice(2, 6).map((service, index) => (
                <ServiceCard key={index + 2} service={service} index={index + 2} />
              ))}
            </div>
          </div>

          {/* Usługi Specjalistyczne — on tinted background */}
          <div className="bg-stone-50/80 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-10 rounded-3xl">
            <div className="mb-6">
              <span className="text-xs font-medium text-stone-500 uppercase tracking-widest">Wsparcie Dodatkowe</span>
              <h3 className="font-display text-xl font-semibold text-stone-800 tracking-tight mt-1">Usługi Specjalistyczne</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-5">
              {services.slice(6).map((service, index) => (
                <ServiceCard key={index + 6} service={service} index={index + 6} />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-stone-600 mb-4">
            Nie wiesz, która usługa jest dla Ciebie?
          </p>
          <button
            onClick={() =>
              document
                .querySelector('#contact')
                ?.scrollIntoView({ behavior: 'smooth' })
            }
            className="btn-ghost"
          >
            <span>Skontaktuj się z nami</span>
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services;
