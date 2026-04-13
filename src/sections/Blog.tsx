import { useEffect, useRef } from 'react';
import { Calendar, Clock, User } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const blogPosts = [
  {
    id: 1,
    title: 'Zmiany w podatku dochodowym 2024 - co musisz wiedzieć?',
    excerpt: 'Przegląd najważniejszych zmian w przepisach podatkowych, które wpłyną na działalność Twojej firmy w nadchodzącym roku.',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop',
    category: 'Podatki',
    author: 'Anna Nowak',
    date: '15 stycznia 2024',
    readTime: '5 min',
  },
  {
    id: 2,
    title: 'Jak wybrać najlepszy sposób rozliczania dla swojej firmy?',
    excerpt: 'Porównanie KPiR, ryczałtu i księgowości pełnej. Która forma będzie najkorzystniejsza dla Twojego biznesu?',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop',
    category: 'Poradnik',
    author: 'Marek Kowalski',
    date: '10 stycznia 2024',
    readTime: '8 min',
  },
  {
    id: 3,
    title: 'Kadry i płace - najczęstsze błędy przedsiębiorców',
    excerpt: 'Praktyczne wskazówki jak unikać typowych problemów w rozliczeniach pracowniczych i ZUS.',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600&h=400&fit=crop',
    category: 'Kadry',
    author: 'Katarzyna Wiśniewska',
    date: '5 stycznia 2024',
    readTime: '6 min',
  },
];

const Blog = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animations
      gsap.fromTo(
        '.blog-label',
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
        '.blog-headline',
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

      // Blog cards animation
      const cards = sectionRef.current?.querySelectorAll('.blog-card');
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
              trigger: '.blog-grid',
              start: 'top 80%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="blog"
      ref={sectionRef}
      className="section-padding bg-white relative overflow-hidden"
    >
      <div className="container-custom relative z-10">
        {/* Section header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <div>
            <span className="blog-label section-label">Blog</span>
            <h2 className="blog-headline text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900">
              Aktualności i <span className="text-teal-700">porady</span>
            </h2>
          </div>
        </div>

        {/* Blog grid */}
        <div className="blog-grid grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="blog-card group bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-200"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-102"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Category badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-teal-700 text-sm font-medium rounded-full">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Meta */}
                <div className="flex items-center gap-4 text-sm text-stone-500 mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-stone-900 mb-3 line-clamp-2 group-hover:text-teal-700 transition-colors duration-300">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-stone-600 text-sm line-clamp-2 mb-4">
                  {post.excerpt}
                </p>

                {/* Author and link */}
                <div className="flex items-center justify-between pt-4 border-t border-stone-100">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-teal-600" />
                    </div>
                    <span className="text-sm text-stone-600">{post.author}</span>
                  </div>
                  <span
                    title="Artykuły będą dostępne wkrótce"
                    className="text-stone-400 text-sm font-medium inline-flex items-center gap-1 cursor-not-allowed select-none"
                    aria-label="Czytaj – wkrótce dostępne"
                  >
                    <span>Czytaj</span>
                    <span className="text-xs bg-stone-100 text-stone-500 px-1.5 py-0.5 rounded-full">Wkrótce</span>
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Blog;
