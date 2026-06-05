import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SKILLS_DATA } from '../data';
import { Skill } from '../types';
import {
  Binary,
  Coffee,
  Terminal,
  FileCode,
  Database,
  Atom,
  Compass,
  Palette,
  Zap,
  Cpu,
  Server,
  Flame,
  Network,
  Settings,
  Globe,
  TableProperties,
  GitBranch,
  Layers,
  CheckCircle,
  GraduationCap,
} from 'lucide-react';

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = [
    'All',
    'Languages',
    'Frontend',
    'Backend & DB',
    'Core CS Fundamentals',
    'Developer Tools',
  ];

  const filteredSkills = selectedCategory === 'All'
    ? SKILLS_DATA
    : SKILLS_DATA.filter(skill => skill.category === selectedCategory);

  // Safe mapping of iconName string to dynamic React Node
  const getSkillIcon = (name: string, className: string) => {
    switch (name) {
      case 'Binary':
        return <Binary className={className} />;
      case 'Coffee':
        return <Coffee className={className} />;
      case 'Terminal':
        return <Terminal className={className} />;
      case 'FileCode':
        return <FileCode className={className} />;
      case 'Database':
        return <Database className={className} />;
      case 'Atom':
        return <Atom className={className} />;
      case 'Compass':
        return <Compass className={className} />;
      case 'Palette':
        return <Palette className={className} />;
      case 'Zap':
        return <Zap className={className} />;
      case 'Cpu':
        return <Cpu className={className} />;
      case 'Server':
        return <Server className={className} />;
      case 'Flame':
        return <Flame className={className} />;
      case 'Network':
        return <Network className={className} />;
      case 'Settings':
        return <Settings className={className} />;
      case 'Globe':
        return <Globe className={className} />;
      case 'TableProperties':
        return <TableProperties className={className} />;
      case 'GitBranch':
        return <GitBranch className={className} />;
      case 'Layers':
        return <Layers className={className} />;
      default:
        return <CheckCircle className={className} />;
    }
  };

  return (
    <section
      id="skills"
      className="py-24 bg-slate-950 border-t border-slate-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Content */}
        <div className="text-left max-w-3xl mb-16 space-y-3">
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-mono tracking-widest text-indigo-400 uppercase font-semibold block"
          >
            // 03. skills inventory
          </motion.h3>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading font-extrabold text-3xl sm:text-4xl tracking-tight text-white uppercase italic"
          >
            RIGOROUS COMPUTATIONAL STACK
          </motion.h2>
          <p className="text-slate-400 text-sm max-w-2xl font-light leading-relaxed">
            Organized systematically across engineering disciplines. I prioritize runtime efficiency, modular component trees, relational compliance, and persistent cache pipelines.
          </p>
        </div>

        {/* Filter Navigation Tabs - Sharp Geometric Blocks */}
        <div className="flex flex-wrap items-center justify-start gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2.5 text-xs font-mono tracking-widest uppercase transition-all duration-150 cursor-pointer rounded-none ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white font-bold'
                  : 'bg-slate-900 text-slate-400 hover:bg-slate-850 hover:text-white border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Dynamic Skill Item Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill: Skill) => (
              <motion.div
                key={skill.name}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="relative p-6 bg-slate-900 border border-slate-800 hover:border-slate-500 transition-all duration-150 group rounded-none flex flex-col justify-between"
              >
                {/* Information Header Block */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="h-9 w-9 bg-slate-950 border border-slate-800 flex items-center justify-center text-indigo-400 shrink-0">
                        {getSkillIcon(skill.iconName, 'h-4.5 w-4.5 group-hover:scale-110 transition-transform')}
                      </div>
                      <div>
                        <span className="text-[9px] font-mono text-emerald-400 font-bold block uppercase tracking-wider">
                          {skill.category}
                        </span>
                        <h4 className="text-sm font-bold text-slate-200 tracking-tight">
                          {skill.name}
                        </h4>
                      </div>
                    </div>
                    <div>
                      <span className="text-xs font-mono bg-slate-955 border border-slate-800 px-2 py-0.5 text-slate-300 font-bold">
                        {skill.level}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Progress bar container - geometrically flat */}
                <div className="space-y-1.5 pt-2">
                  <div className="h-1.5 w-full bg-slate-950 border border-slate-850 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                      className="h-full bg-gradient-to-r from-indigo-500 to-emerald-405"
                    />
                  </div>
                  
                  {/* Skill level indicators */}
                  <div className="flex items-center justify-between text-[9px] font-mono text-slate-500 uppercase tracking-tighter">
                    <span>[0%] theory</span>
                    <span>[100%] production</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Curriculum Highlights banner - Custom engineering card block */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 p-8 bg-slate-900 border border-slate-800 border-l-4 border-l-indigo-500 rounded-none flex flex-col md:flex-row items-center gap-8 relative overflow-hidden"
        >
          <div className="absolute top-[-50px] right-[-50px] w-48 h-48 bg-indigo-650/10 rounded-full blur-2xl z-0 pointer-events-none" />
          
          <div className="bg-slate-950 border border-slate-800 p-4 text-indigo-400 shrink-0 rounded-none z-10">
            <GraduationCap className="h-8 w-8" />
          </div>
          
          <div className="space-y-2 flex-1 text-left z-10">
            <h4 className="font-heading font-extrabold text-base uppercase text-slate-250 tracking-wide">
              B.Tech CSE Core Curriculum Alignment
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed font-sans font-light">
              Academic studies thoroughly target complexity parameters, ACID model specifications, multiprocess thread architectures inside modern operating systems, and computer networks framing setups. This architectural rigor ensures scalable application standards.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2 shrink-0 md:max-w-xs justify-center md:justify-end z-10">
            <span className="px-3 py-1 text-[10px] font-mono bg-slate-950 border border-slate-800 text-slate-400 rounded-none uppercase">CS_301: DSA</span>
            <span className="px-3 py-1 text-[10px] font-mono bg-slate-950 border border-slate-800 text-slate-400 rounded-none uppercase">CS_302: OS</span>
            <span className="px-3 py-1 text-[10px] font-mono bg-slate-950 border border-slate-800 text-slate-400 rounded-none uppercase">CS_303: DBMS</span>
            <span className="px-3 py-1 text-[10px] font-mono bg-slate-950 border border-slate-800 text-slate-400 rounded-none uppercase">CS_304: Networks</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
