import { motion } from 'motion/react';
import { MILESTONES_DATA } from '../data';
import { Milestone } from '../types';
import { GraduationCap, Briefcase, Award, Calendar, CheckSquare } from 'lucide-react';

export default function CodingMilestones() {
  const getMilestoneIcon = (type: string) => {
    switch (type) {
      case 'internship':
        return <Briefcase className="h-4.5 w-4.5 text-emerald-400" />;
      case 'hackathon':
        return <Award className="h-4.5 w-4.5 text-indigo-400" />;
      default:
        return <GraduationCap className="h-4.5 w-4.5 text-purple-400" />;
    }
  };

  const getMilestoneAccent = (type: string) => {
    switch (type) {
      case 'internship': return 'border-l-l-emerald-500';
      case 'hackathon': return 'border-l-l-indigo-500';
      default: return 'border-l-l-purple-500';
    }
  };

  return (
    <section
      id="milestones"
      className="py-24 bg-slate-950 border-t border-slate-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Group */}
        <div className="text-left max-w-3xl mb-16 space-y-3">
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-mono tracking-widest text-indigo-400 uppercase font-semibold block"
          >
            // 05. milestones & corporate roadmap
          </motion.h3>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading font-extrabold text-3xl sm:text-4xl tracking-tight text-white uppercase italic"
          >
            ACADEMIC SEMESTERS & EXPERIENCE JOURNEY
          </motion.h2>
          <p className="text-slate-400 text-sm max-w-2xl font-light leading-relaxed">
            Tracking B.Tech metrics sequentially. Highlights include industry dev stints, algorithmic competing runs, and core algorithms student mentoring.
          </p>
        </div>

        {/* Visual Timeline Row */}
        <div className="relative border-l border-slate-800 max-w-4xl mx-auto pl-6 sm:pl-8 space-y-12">
          
          {MILESTONES_DATA.map((stone: Milestone, idx: number) => (
            <motion.div
              key={stone.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="relative group"
            >
              {/* Outer circle dot - sharp box */}
              <div className="absolute -left-[41px] sm:-left-[49px] top-1.5 h-8 w-8 bg-slate-950 border border-slate-800 flex items-center justify-center text-white shadow-md group-hover:border-indigo-550 transition-colors duration-200 rounded-none z-10">
                {getMilestoneIcon(stone.type)}
              </div>

              {/* Inside details card - sharp board with left accent stripe */}
              <div className={`bg-slate-900 border border-slate-805 hover:border-slate-500 rounded-none p-6 sm:p-8 space-y-4 transition-all duration-150 relative border-l-4 ${
                stone.type === 'internship' ? 'border-l-emerald-505' : stone.type === 'hackathon' ? 'border-l-indigo-505' : 'border-l-purple-505'
              }`}>
                
                {/* Meta Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-[10px] font-mono text-indigo-400 font-bold uppercase tracking-wider block">
                      {stone.semester}
                    </span>
                    <h4 className="font-heading font-bold text-lg text-slate-100 uppercase tracking-tight">
                      {stone.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 font-mono tracking-wide">{stone.subtitle}</p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 self-start sm:self-center">
                    <span className="text-[9px] uppercase font-mono px-2.5 py-0.5 bg-slate-950 border border-slate-800 text-slate-350 rounded-none font-bold">
                      {stone.type}
                    </span>
                    
                    <span className="text-[9px] font-mono text-slate-500 flex items-center gap-1 uppercase">
                      <Calendar className="h-3 w-3 text-indigo-400" /> {stone.period}
                    </span>
                  </div>
                </div>

                {/* Accomplishments detail list */}
                <ul className="space-y-2.5 pt-1">
                  {stone.achievements.map((ach, aIdx) => (
                    <li key={aIdx} className="flex items-start gap-3.5 text-slate-305 font-light text-xs sm:text-sm">
                      <CheckSquare className="h-4 w-4 text-emerald-450 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{ach}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
