import { motion, useScroll, useSpring } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Resume from './components/Resume';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="relative selection:bg-primary/30 selection:text-primary">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-[60] origin-left"
        style={{ scaleX }}
      />

      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-12%] left-[-8%] h-[30rem] w-[30rem] rounded-full bg-primary/5 blur-[140px]" />
        <div className="absolute bottom-[-12%] right-[-8%] h-[26rem] w-[26rem] rounded-full bg-secondary/6 blur-[140px]" />
      </div>

      <Navbar />

      <main>
        <Hero />
        <About />
        <Projects />
        <Resume />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
