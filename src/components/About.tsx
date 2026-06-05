import { motion } from 'motion/react';
import { Medal, GraduationCap, Github, Linkedin, Mail, ArrowUpRight, Award, Trophy, Code2, HeartHandshake, Sparkles } from 'lucide-react';
import { PERSONAL_INFO, CODING_STATS } from '../data';

export default function About() {
  // Helper to dynamically render Lucide icons in a safe manner
  const getIcon = (name: string, className: string) => {
    switch (name) {
      case 'Code':
        return <Code2 className={className} />;
      case 'GitMerge':
        return <Award className={className} />;
      case 'Trophy':
        return <Trophy className={className} />;
      case 'FolderCode':
        return <Medal className={className} />;
      default:
        return <Trophy className={className} />;
    }
  };

  // Convert stats gradient to custom indigo/emerald bounds
  const getStatColors = (idx: number) => {
    if (idx % 3 === 0) return { border: 'border-l-4 border-l-indigo-505', text: 'text-indigo-400', banner: 'from-indigo-600/10 to-transparent' };
    if (idx % 3 === 1) return { border: 'border-l-4 border-l-emerald-505', text: 'text-emerald-400', banner: 'from-emerald-600/10 to-transparent' };
    return { border: 'border-l-4 border-l-purple-505', text: 'text-purple-400', banner: 'from-purple-600/10 to-transparent' };
  };

  return (
    <section
      id="about"
      className="py-24 bg-slate-950 border-t border-slate-900 overflow-hidden relative"
    >
      <div className="absolute top-1/2 left-[-150px] w-96 h-96 bg-purple-600/5 rounded-full blur-3xl pointer-events-none z-0" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Title */}
        <div className="text-left max-w-3xl mb-16 space-y-3">
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-mono tracking-widest text-indigo-400 uppercase font-semibold"
          >
            // 02. branding & bio
          </motion.h3>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading font-extrabold text-3xl sm:text-4xl tracking-tight text-white uppercase italic"
          >
            BRIDGING ELEGANCE WITH{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-emerald-400">
              RIGOROUS ENGINEERING
            </span>
          </motion.h2>
          <p className="text-slate-400 text-sm max-w-2xl font-light leading-relaxed">
            Meet the developer behind the algorithm. I design interactive web architectures with mathematical efficiency, pristine typography, and deep computational focus.
          </p>
        </div>

        {/* Content Profile Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          
          {/* Left Block: Bio & Education */}
          <div className="lg:col-span-7 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-slate-900 border border-slate-800 p-8 rounded-none border-l-4 border-l-emerald-500 space-y-5"
            >
              <h3 className="text-lg font-heading font-bold text-slate-100 uppercase tracking-tight flex items-center gap-2">
                <HeartHandshake className="h-4 w-4 text-emerald-450" /> Professional Persona
              </h3>
              <p className="text-slate-300 leading-relaxed font-light text-sm">
                {PERSONAL_INFO.aboutLong}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-slate-805">
                <div className="flex gap-3">
                  <div className="h-10 w-10 shrink-0 bg-indigo-950/50 border border-indigo-800/40 flex items-center justify-center text-indigo-400">
                    <GraduationCap className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-bold">UNIVERSITY</h4>
                    <p className="text-xs font-mono font-semibold text-slate-200">{PERSONAL_INFO.university}</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <div className="h-10 w-10 shrink-0 bg-emerald-950/50 border border-emerald-800/40 flex items-center justify-center text-emerald-400">
                    <Award className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-bold">ACADEMIC CGPA</h4>
                    <p className="text-xs font-mono font-semibold text-slate-200">CGPA score of {PERSONAL_INFO.cgpa}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Quick action buttons & Resume access */}
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 bg-slate-900 border border-slate-800 hover:border-slate-600 text-xs font-mono uppercase tracking-widest transition-all duration-150 text-slate-300 hover:text-white rounded-none"
              >
                <Linkedin className="h-4 w-4 text-indigo-400" />
                Connect
                <ArrowUpRight className="h-3.5 w-3.5 text-slate-600" />
              </a>
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 bg-slate-900 border border-slate-800 hover:border-slate-600 text-xs font-mono uppercase tracking-widest transition-all duration-150 text-slate-300 hover:text-white rounded-none"
              >
                <Github className="h-4 w-4 text-emerald-400" />
                GitHub
                <ArrowUpRight className="h-3.5 w-3.5 text-slate-600" />
              </a>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="inline-flex items-center gap-2 px-5 py-3 bg-indigo-950/40 border border-indigo-800 hover:border-indigo-600 text-xs font-mono uppercase tracking-widest transition-all duration-150 text-indigo-455 hover:text-white rounded-none"
              >
                <Mail className="h-4 w-4" />
                Shoot Email
              </a>
            </div>
          </div>

          {/* Right Block: Dynamic Interactive CSE Coding Stats */}
          <div className="lg:col-span-5 space-y-4">
            <h4 className="text-[10px] font-mono uppercase tracking-widest text-slate-550 font-bold block mb-1">
              // Coding Stats
            </h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {CODING_STATS.map((stat, idx) => {
                const styling = getStatColors(idx);
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                    className={`relative p-5 bg-slate-900 border border-slate-800 rounded-none hover:border-slate-600 transition-all duration-150 group overflow-hidden ${styling.border}`}
                  >
                    {/* Subtle hover background highlight */}
                    <div className={`absolute inset-0 bg-gradient-to-tr ${styling.banner} opacity-0 group-hover:opacity-[0.06] transition-opacity duration-200`} />
                    
                    {/* Icon */}
                    <div className="mb-3">
                      <div className="h-9 w-9 bg-slate-950 border border-slate-850 flex items-center justify-center text-slate-300">
                        {getIcon(stat.iconName, `h-4.5 w-4.5 ${styling.text}`)}
                      </div>
                    </div>

                    {/* Stat contents */}
                    <div className="space-y-1">
                      <div className="text-xl font-extrabold font-mono text-slate-200 tracking-tight">
                        {stat.value}
                      </div>
                      <h5 className="text-[11px] font-mono text-slate-400 uppercase tracking-widest">
                        {stat.label}
                      </h5>
                      <p className="text-[10px] text-slate-500 font-sans leading-snug">
                        {stat.subText}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Quick interactive note */}
            <div className="p-4 bg-slate-900 border border-slate-805/70 rounded-none flex items-start gap-3">
              <Sparkles className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
              <p className="text-[11px] text-slate-500 font-mono leading-relaxed">
                <span className="font-bold text-slate-350 uppercase tracking-wider">Note:</span> Academic rankings and commit histories are sourced dynamically via verified API feeds and active GitHub tracking systems.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
