import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PROJECTS_DATA } from '../data';
import { Project } from '../types';
import { ExternalLink, Github, Sparkles, Terminal, X, ArrowRight, Play } from 'lucide-react';

interface ProjectsProps {
  onSimulateProject: (type: 'sorting' | 'database' | 'networking' | 'none') => void;
}

export default function Projects({ onSimulateProject }: ProjectsProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'DSA':
        return 'text-emerald-400 border-emerald-800/50 bg-emerald-950/20';
      case 'Systems':
        return 'text-indigo-400 border-indigo-805/50 bg-indigo-950/20';
      case 'AI & ML':
        return 'text-purple-400 border-purple-800/50 bg-purple-950/20';
      default:
        return 'text-slate-350 border-slate-800 bg-slate-900/40';
    }
  };

  return (
    <section
      id="projects"
      className="py-24 bg-slate-950 border-t border-slate-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Block */}
        <div className="text-left max-w-3xl mb-16 space-y-3">
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-mono tracking-widest text-indigo-400 uppercase font-semibold block"
          >
            // 04. portfolio & research project systems
          </motion.h3>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading font-extrabold text-3xl sm:text-4xl tracking-tight text-white uppercase italic"
          >
            SELECTED ACADEMIC & CSE ENGINE INVENTIONS
          </motion.h2>
          <p className="text-slate-400 text-sm max-w-2xl font-light leading-relaxed">
            A curated index of full-stack structures demonstrating system normalization rules, Dijkstra algorithm optimization paths, and client sentiment classifiers with verified benchmark telemetry.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PROJECTS_DATA.map((project: Project, idx: number) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.98, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="relative bg-slate-900 border border-slate-800 hover:border-slate-500 transition-all duration-150 flex flex-col justify-between overflow-hidden rounded-none group"
            >
              {/* Top ambient color bar based on category - Geometric alignment */}
              <div className={`h-1.5 w-full bg-gradient-to-r ${
                project.category === 'DSA'
                  ? 'from-emerald-500 to-indigo-505'
                  : project.category === 'Systems'
                  ? 'from-indigo-500 to-purple-500'
                  : 'from-purple-500 to-emerald-400'
              }`} />

              <div className="p-8 space-y-4 flex-1">
                {/* Meta Header */}
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-none border tracking-widest ${getCategoryColor(project.category)}`}>
                    {project.category}
                  </span>
                  
                  {project.simulationType !== 'none' && (
                    <span className="flex items-center gap-1.5 text-[10px] text-indigo-400 font-mono bg-indigo-950/50 px-2.5 py-0.5 rounded-none border border-indigo-805/40 uppercase tracking-tighter">
                      <Sparkles className="h-3 w-3 animate-spin text-emerald-400" /> Live Simulator
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="font-heading font-bold text-xl text-slate-100 group-hover:text-indigo-400 transition-colors uppercase tracking-tight">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-light line-clamp-3">
                  {project.description}
                </p>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="text-[10px] font-mono bg-slate-950 border border-slate-800 px-2 py-0.5 rounded-none text-slate-400 uppercase">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action bar footer */}
              <div className="bg-slate-950 px-8 py-4 border-t border-slate-800/80 flex items-center justify-between">
                <button
                  onClick={() => setSelectedProject(project)}
                  className="text-xs font-mono uppercase tracking-widest text-slate-400 hover:text-white flex items-center gap-1.5 cursor-pointer"
                >
                  <Terminal className="h-3.5 w-3.5 text-indigo-500" />
                  Blueprint Details
                  <ArrowRight className="h-3 w-3" />
                </button>

                <div className="flex items-center space-x-2.5">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 border border-slate-800 bg-slate-900 text-slate-400 hover:text-white transition-colors hover:bg-slate-800"
                    title="Source Repository"
                  >
                    <Github className="h-4 w-4" />
                  </a>
                  {project.simulationType !== 'none' && (
                    <button
                      onClick={() => onSimulateProject(project.simulationType)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-[10px] font-bold tracking-widest uppercase transition-all duration-150 cursor-pointer rounded-none"
                    >
                      <Play className="h-3 w-3 fill-current" />
                      Run
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal Sheet for Project Blueprint Detail representation */}
        <AnimatePresence>
          {selectedProject && (
            <div className="fixed inset-0 z-55 flex items-center justify-center p-4">
              {/* Overlay background */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.75 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProject(null)}
                className="absolute inset-0 bg-slate-950 cursor-pointer"
              />

              {/* Modal Container */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="relative bg-slate-900 border border-slate-800 rounded-none shadow-2xl overflow-hidden max-w-2xl w-full max-h-[90vh] flex flex-col justify-between"
              >
                {/* Header colored banner */}
                <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-400 h-2 w-full" />
                
                {/* Inner sheet head */}
                <div className="p-6 pb-4 border-b border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono tracking-widest text-indigo-400 font-bold uppercase">
                      // PROJECT BLUEPRINT METADATA
                    </span>
                    <h4 className="font-heading font-black text-xl text-slate-100 uppercase tracking-tight italic">
                      {selectedProject.title}
                    </h4>
                  </div>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="p-1.5 bg-slate-955 border border-slate-800 text-slate-400 hover:text-white transition-colors"
                    aria-label="Close modal"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                {/* Modal scrollable body context */}
                <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs sm:text-sm leading-relaxed">
                  
                  {/* Long descriptive block */}
                  <div className="space-y-2">
                    <h5 className="text-[10px] font-mono text-slate-500 uppercase font-bold tracking-widest">// SYSTEM ARCHITECTURE SUMMARY</h5>
                    <p className="text-slate-300 font-light leading-relaxed font-sans">{selectedProject.longDescription}</p>
                  </div>

                  {/* Built metrics cards */}
                  {selectedProject.stats && (
                    <div className="space-y-2">
                      <h5 className="text-[10px] font-mono text-slate-500 uppercase font-bold tracking-widest">// ACADEMIC & BENCHMARK METRICS</h5>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {selectedProject.stats.map((metric) => (
                          <div key={metric.label} className="bg-slate-950 border border-slate-800 p-3 rounded-none text-center">
                            <span className="text-[9px] font-mono text-slate-500 block uppercase tracking-wider mb-1">{metric.label}</span>
                            <span className="text-xs font-mono font-bold text-slate-200 block truncate">{metric.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Bullet features */}
                  {selectedProject.keyFeatures && (
                    <div className="space-y-2">
                      <h5 className="text-[10px] font-mono text-slate-500 uppercase font-bold tracking-widest">// CORE IMPLEMENTED CAPABILITIES</h5>
                      <ul className="space-y-1.5 font-mono text-xs">
                        {selectedProject.keyFeatures.map((feat) => (
                          <li key={feat} className="flex items-start gap-2 text-slate-350 bg-slate-950/40 p-2.5 border border-slate-850/60 rounded-none">
                            <span className="w-1.5 h-1.5 bg-indigo-505 shrink-0 mt-1.5 rotate-45" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Tech footprint */}
                  <div className="space-y-2">
                    <h5 className="text-[10px] font-mono text-slate-500 uppercase font-bold tracking-widest">// STABILITY ENGINES & COMPACT STACK</h5>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedProject.technologies.map((t) => (
                        <span key={t} className="text-[10px] font-mono bg-slate-950 border border-slate-800 text-indigo-400 px-2 py-0.5 rounded-none uppercase">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer panel controls */}
                <div className="bg-slate-950 p-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-xs font-mono uppercase tracking-widest"
                  >
                    <Github className="h-4 w-4 text-emerald-450" />
                    Source Github Repository
                    <ExternalLink className="h-3 w-3 text-slate-600" />
                  </a>

                  {selectedProject.simulationType !== 'none' ? (
                    <button
                      onClick={() => {
                        onSimulateProject(selectedProject.simulationType);
                        setSelectedProject(null);
                      }}
                      className="w-full sm:w-auto px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-[11px] font-bold tracking-widest uppercase transition-all duration-150 cursor-pointer rounded-none flex items-center justify-center gap-1.5"
                    >
                      <Play className="h-3.5 w-3.5 fill-current" />
                      Run Simulator In-App
                    </button>
                  ) : (
                    <span className="text-slate-500 text-xs font-mono flex items-center gap-1 uppercase">
                      <Terminal className="h-4 w-4 text-indigo-500" /> [compiled build ready]
                    </span>
                  )}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
