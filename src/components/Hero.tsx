import { motion } from 'motion/react';
import { Terminal, ArrowRight, Code, Sparkles, Database, Layers } from 'lucide-react';
import { PERSONAL_INFO } from '../data';

interface HeroProps {
  onExploreProjects: () => void;
  onExplorePlayground: () => void;
}

export default function Hero({ onExploreProjects, onExplorePlayground }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative min-h-[96vh] flex items-center justify-center pt-24 pb-16 overflow-hidden bg-slate-950 text-slate-100"
    >
      {/* Decorative Shifting Ambient Background Elements */}
      <div className="absolute top-[-100px] right-[-100px] w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none z-0" />
      <div className="absolute bottom-[-100px] left-[-100px] w-96 h-96 bg-emerald-600/15 rounded-full blur-3xl pointer-events-none z-0" />

      {/* Grid Pattern overlay - High contrast sharp line grids */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_40%,#000_65%,transparent_100%)] opacity-25 pointer-events-none z-0" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10">
        
        {/* Left Side: Branding, copy and CTA */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-6 text-align-left text-left">
          
          {/* Animated Chip matching Geometrical theme */}
          <div className="inline-flex self-start items-center gap-2 px-3 py-1 rounded-none bg-slate-900 border border-slate-800">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse-emerald"></span>
            <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-bold">
              // Available for Internships (Fall 2026)
            </span>
          </div>

          {/* Shifting Colorful Title */}
          <div className="space-y-4">
            <span className="text-xs font-mono font-medium tracking-widest text-indigo-400 block uppercase">
              // B.Tech CSE Student & Full-Stack Architect
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[0.9] tracking-tighter uppercase italic font-heading">
              CRAFTING <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-emerald-400">
                DIGITAL REALMS
              </span>
            </h1>
            <p className="text-slate-100 font-mono text-lg font-bold">
              Hi, I am Priyanka Snale.
            </p>
          </div>

          {/* Description */}
          <p className="text-slate-400 text-base sm:text-lg max-w-xl leading-relaxed font-sans font-light">
            I specialize in <span className="text-slate-100 font-semibold border-b border-indigo-500 pb-0.5">Full-Stack Architecture</span> and <span className="text-slate-100 font-semibold border-b border-emerald-400 pb-0.5">Algorithm Optimization</span>. Pursuing my B.Tech engineering degree with a current CGPA of <strong className="text-white font-bold">{PERSONAL_INFO.cgpa}</strong>.
          </p>

          {/* CTAs - sharp geometric blocks */}
          <div className="flex flex-col sm:flex-row items-center justify-start gap-4 pt-4">
            {/* Primary CTA */}
            <button
              onClick={onExplorePlayground}
              className="w-full sm:w-auto px-6 py-3.5 bg-indigo-600 hover:bg-indigo-505 text-white font-mono text-xs font-bold tracking-widest uppercase transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer group rounded-none"
            >
              <Terminal className="h-4 w-4" />
              Run Playgrounds
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>

            {/* Secondary CTA */}
            <button
              onClick={onExploreProjects}
              className="w-full sm:w-auto px-6 py-3.5 border border-slate-800 hover:border-slate-600 bg-slate-900/60 hover:bg-slate-900 text-slate-300 font-mono text-xs font-bold tracking-widest uppercase transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer rounded-none"
            >
              <Code className="h-4 w-4 text-emerald-400" />
              View Work
            </button>
          </div>

          {/* Highlight badges under divider */}
          <div className="flex flex-wrap gap-y-3 gap-x-6 pt-6 text-slate-500 font-mono text-xs border-t border-slate-900 max-w-lg">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-indigo-505 rotate-45 transform" />
              C++ & Python Core
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-emerald-405 rotate-45 transform" />
              Interactive Sandboxes
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-purple-405 rotate-45 transform" />
              DBMS Normalization
            </span>
          </div>
        </div>

        {/* Right Side: Code Block / Console Terminal with Geometric balance */}
        <div className="lg:col-span-5 w-full max-w-lg mx-auto">
          <div className="relative border border-slate-800 bg-slate-900/95 shadow-2xl p-0.5 overflow-hidden rounded-none">
            {/* Top Indicator bar */}
            <div className="bg-slate-950 px-4 py-3 flex items-center justify-between border-b border-slate-800">
              <div className="flex space-x-2">
                <span className="w-2.5 h-2.5 rounded-none bg-slate-800 inline-block border border-slate-700" />
                <span className="w-2.5 h-2.5 rounded-none bg-slate-800 inline-block border border-slate-700" />
                <span className="w-2.5 h-2.5 rounded-none bg-slate-800 inline-block border border-slate-700" />
              </div>
              <div className="text-[10px] font-mono tracking-widest text-slate-400 flex items-center gap-1.5 uppercase font-bold">
                <Terminal className="h-3 w-3 text-indigo-400" />
                priyanka_snale_core.ts
              </div>
              <span className="text-[9px] font-mono text-emerald-400 font-bold bg-emerald-950/40 border border-emerald-800/40 px-2.5 py-0.5 uppercase tracking-tight">
                system: active
              </span>
            </div>

            {/* Code Content */}
            <div className="p-6 font-mono text-[11px] sm:text-xs leading-relaxed overflow-x-auto text-slate-300">
              <p className="text-slate-500 mb-2">// Indian Institute of Technology CSE Track</p>
              <p>
                <span className="text-indigo-400">const</span> <span className="text-emerald-405">candidate</span> = {'{'}
              </p>
              <div className="pl-4 space-y-1.5 my-2">
                <p>
                  fullName: <span className="text-slate-100">"Priyanka Snale"</span>,
                </p>
                <p>
                  institution: <span className="text-slate-100">"IIT / B.Tech CSE"</span>,
                </p>
                <p>
                  cgpaScore: <span className="text-indigo-400">9.45</span>, <span className="text-slate-600">// max: 10.0</span>
                </p>
                <p>
                  algorithmsRating: <span className="text-purple-400">"Knight Rank"</span>,
                </p>
                <p>
                  favouriteStructure: <span className="text-emerald-400">"Adjacency_Map_Graphs"</span>,
                </p>
                <p>
                  coreProficiencies: [
                </p>
                <div className="pl-4 text-slate-400">
                  <p>"React.js + Tailwind",</p>
                  <p>"Relational normal forms",</p>
                  <p>"Computer Networking Routing"</p>
                </div>
                <p>
                  ],
                </p>
                <p>
                  readyForInternships: <span className="text-indigo-400">true</span>
                </p>
              </div>
              <p>{'}'};</p>

              <div className="mt-5 pt-4 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-500">
                <span className="flex items-center gap-1 text-emerald-400 uppercase font-mono font-bold">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse-emerald" />
                  STATUS: LIVE_GRID
                </span>
                <span>ENGINEERING SOURCE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
