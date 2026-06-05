import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Github, Linkedin, Mail, Cpu } from 'lucide-react';
import { PERSONAL_INFO } from '../data';

interface NavbarProps {
  activeSection: string;
  setActiveSection: (id: string) => void;
}

export default function Navbar({ activeSection, setActiveSection }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'hero', label: 'home', prefix: '// 01. ' },
    { id: 'about', label: 'about', prefix: '// 02. ' },
    { id: 'skills', label: 'skills', prefix: '// 03. ' },
    { id: 'projects', label: 'projects', prefix: '// 04. ' },
    { id: 'playground', label: 'sandbox', prefix: '// 05. ' },
    { id: 'contact', label: 'contact', prefix: '// 06. ' },
  ];

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    setMobileOpen(false);
    const element = document.getElementById(id);
    if (element) {
      // Use offset calculations or standard scroll for precision
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const formattedName = PERSONAL_INFO.name.replace(/\s+/g, '_').toUpperCase();

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-45 transition-all duration-300 ${
          scrolled
            ? 'bg-slate-950/90 backdrop-blur-md border-b border-slate-800 shadow-md'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo Brand: Geometric Balanced design */}
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => handleNavClick('hero')}
          >
            <div className="w-8 h-8 bg-gradient-to-tr from-indigo-500 to-emerald-400 rotate-45 flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:rotate-135">
              <span className="-rotate-45 font-bold text-slate-950 text-xs tracking-tighter">PS</span>
            </div>
            <div>
              <span className="font-mono font-bold tracking-tighter text-lg block text-slate-100 hover:text-indigo-400 transition-colors">
                {formattedName}
              </span>
              <span className="text-[9px] font-mono tracking-widest text-slate-500 block uppercase">
                B.Tech CSE Portfolio
              </span>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className="relative px-3.5 py-2 text-xs font-mono tracking-wide transition-colors duration-150 cursor-pointer"
              >
                {activeSection === link.id && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute inset-x-0 bottom-0 h-[2px] bg-indigo-505 bg-gradient-to-r from-indigo-500 to-emerald-400"
                    transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                  />
                )}
                <span className={`transition-colors uppercase tracking-widest ${
                  activeSection === link.id ? 'text-indigo-450 font-bold' : 'text-slate-400 hover:text-slate-100'
                }`}>
                  <span className="text-[10px] opacity-50 mr-0.5">{link.prefix}</span>
                  {link.label}
                </span>
              </button>
            ))}
          </nav>

          {/* Socials & CTA */}
          <div className="hidden lg:flex items-center space-x-3">
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-indigo-400 transition-colors p-2 rounded-none border border-slate-800 bg-slate-900/40 hover:bg-slate-900"
              title="GitHub Profile"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-emerald-400 transition-colors p-2 rounded-none border border-slate-800 bg-slate-900/40 hover:bg-slate-900"
              title="LinkedIn Profile"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <button
              onClick={() => handleNavClick('contact')}
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-[11px] font-bold tracking-widest uppercase px-4 py-2 transition-all duration-200 cursor-pointer"
            >
              Contact
            </button>
          </div>

          {/* Mobile Hamburger */}
          <div className="flex lg:hidden items-center space-x-2">
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white p-2"
            >
              <Github className="h-5 w-5" />
            </a>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="text-slate-350 hover:text-white p-2 bg-slate-900 border border-slate-800 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-20 z-40 lg:hidden bg-slate-950/95 backdrop-blur-xl border-b border-slate-800 px-4 py-6 shadow-2xl space-y-4"
          >
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`w-full text-left px-4 py-3 text-sm font-mono uppercase tracking-wider transition-all duration-150 cursor-pointer ${
                    activeSection === link.id
                      ? 'bg-slate-900 text-indigo-400 border-l-4 border-l-indigo-500 pl-3'
                      : 'text-slate-300 hover:bg-slate-900/50 hover:text-white'
                  }`}
                >
                  <span className="opacity-40 mr-1.5">{link.prefix}</span>
                  {link.label}
                </button>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <span className="text-slate-500 text-xs font-mono">// SOCIALS</span>
              <div className="flex space-x-3">
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-slate-900 border border-slate-800 p-2 text-slate-300 hover:text-white"
                >
                  <Github className="h-4 w-4" />
                </a>
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-slate-900 border border-slate-800 p-2 text-slate-300 hover:text-white"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
              </div>
            </div>

            <button
              onClick={() => handleNavClick('contact')}
              className="w-full text-center py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs uppercase tracking-widest font-bold"
            >
              Send Message
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
