import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import Services from './sections/Services';
import WhyChooseUs from './sections/WhyChooseUs';
import Testimonials from './sections/Testimonials';
import About from './sections/About';
import FAQ from './sections/FAQ';
import CTA from './sections/CTA';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Configure ScrollTrigger defaults
    ScrollTrigger.defaults({
      toggleActions: 'play none none reverse',
    });

    // Refresh ScrollTrigger on load
    ScrollTrigger.refresh();

    // Cleanup on unmount
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <Navigation />

      {/* Main content */}
      <main id="main">
        {/* Hero Section */}
        <Hero />

        {/* Services Section */}
        <Services />

        {/* Why Choose Us Section */}
        <WhyChooseUs />

        {/* Testimonials Section */}
        <Testimonials />

        {/* FAQ Section */}
        <FAQ />

        {/* About Section */}
        <About />

        {/* CTA Section */}
        <CTA />

        {/* Contact Section */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
