import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Playground from './components/Playground';
import CodingMilestones from './components/CodingMilestones';
import Contact from './components/Contact';
import { PERSONAL_INFO } from './data';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUp, Copyright, Cpu } from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [initialSimulator, setInitialSimulator] = useState<'sorting' | 'database' | 'networking' | 'none'>('none');
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);

  // Dynamic Scroll Highlighting logic
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);

      const sections = ['hero', 'about', 'skills', 'projects', 'playground', 'contact'];
      let currentSection = 'hero';

      for (const sectId of sections) {
        const element = document.getElementById(sectId);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 160 && rect.bottom >= 160) {
            currentSection = sectId;
            break;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSimulateProject = (type: 'sorting' | 'database' | 'networking' | 'none') => {
    setInitialSimulator(type);
    
    setTimeout(() => {
      const playgroundElement = document.getElementById('playground');
      if (playgroundElement) {
        playgroundElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);

    setTimeout(() => {
      setInitialSimulator('none');
    }, 1000);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-950 font-sans text-slate-100 selection:bg-indigo-500/20 selection:text-indigo-400">
      
      {/* Dynamic Navbar */}
      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />

      {/* Main Container Content */}
      <main>
        {/* Hero Section */}
        <Hero
          onExploreProjects={() => scrollToSection('projects')}
          onExplorePlayground={() => scrollToSection('playground')}
        />

        {/* About Section */}
        <About />

        {/* Skills Section */}
        <Skills />

        {/* Projects Section */}
        <Projects onSimulateProject={handleSimulateProject} />

        {/* Sandbox Algo Playground Section */}
        <Playground initialSimulator={initialSimulator} />

        {/* Academic Milestones Roadmap Section */}
        <CodingMilestones />

        {/* Contact Handshake Section */}
        <Contact />
      </main>

      {/* Footer Layout - Geometric Balance */}
      <footer className="bg-slate-950 border-t border-slate-900 py-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-slate-900 pb-10">
            {/* Logo details with geometric accent */}
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 bg-slate-900 border border-slate-800 flex items-center justify-center text-indigo-400 font-bold text-xs rounded-none">
                <Cpu className="h-4.5 w-4.5" />
              </div>
              <div>
                <span className="font-heading font-black text-base text-slate-100 uppercase tracking-tight block">
                  {PERSONAL_INFO.name}
                </span>
                <span className="text-[10px] font-mono tracking-widest text-slate-500 block uppercase font-bold">
                  // B.Tech CSE PORTFOLIO
                </span>
              </div>
            </div>

            {/* Ingress credentials details */}
            <p className="text-xs text-slate-550 font-mono text-center md:text-right uppercase">
              REACTION ENGINES & TAILWIND STABILIZED // DIRECTORIES INDEX ACTIVE
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 text-[10px] font-mono text-slate-500">
            <span className="flex items-center gap-1.5 uppercase tracking-wide">
              <Copyright className="h-4.5 w-4.5 text-indigo-405" /> 2026 {PERSONAL_INFO.name}. All Engineering privileges reserved.
            </span>
            <div className="flex space-x-4 uppercase tracking-wider font-bold">
              <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 transition-colors">[ GITHUB ]</a>
              <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 transition-colors">[ LINKEDIN ]</a>
              <a href={`mailto:${PERSONAL_INFO.email}`} className="hover:text-indigo-400 transition-colors">[ INSTITUTIONAL_MAIL ]</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Scroll back home button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 right-6 z-40 h-10 w-10 cursor-pointer rounded-none bg-indigo-600 hover:bg-indigo-500 border border-indigo-400/20 text-white flex items-center justify-center shadow-lg transition duration-150"
            title="Scroll to Top"
          >
            <ArrowUp className="h-4.5 w-4.5" />
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  );
}
