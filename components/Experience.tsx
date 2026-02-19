import React from 'react';
import { motion } from 'framer-motion';
import { EXPERIENCES, EDUCATION } from '../constants';
import { Briefcase, GraduationCap } from 'lucide-react';

const m = motion as any;

const Experience: React.FC = () => {
  const trajectory = [
    ...EXPERIENCES.map(e => ({ 
      ...e, 
      type: 'work', 
      title: e.role, 
      subtitle: e.company,
      points: Array.isArray(e.description) ? e.description : [e.description]
    }))
  ];

  return (
    <section id="trajectory" className="py-32 relative">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="mb-24">
          <m.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="w-12 h-0.5 bg-orange-600 rounded-full"></div>
            <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-orange-600 font-black block">Career Path</span>
          </m.div>
          <m.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black tracking-super-tighter uppercase leading-[0.9] text-slate-900 dark:text-white"
          >
            PROFESSIONAL <br /> <span className="text-orange-600">JOURNEY.</span>
          </m.h2>
        </div>

        <div className="relative max-w-5xl ml-2">
          {/* Main vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-orange-600 via-slate-200 dark:via-slate-800 to-transparent" />

          <div className="space-y-20">
            {trajectory.map((item, idx) => (
              <m.div 
                key={idx}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative pl-20 group"
              >
                {/* Visual marker */}
                <m.div 
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20, delay: idx * 0.1 + 0.3 }}
                  className="absolute left-0 top-0 w-12 h-12 rounded-2xl bg-white dark:bg-[#050505] border-2 border-slate-100 dark:border-slate-800 flex items-center justify-center z-10 shadow-xl group-hover:border-orange-600 transition-all duration-500" 
                >
                  <Briefcase size={20} className="text-slate-400 group-hover:text-orange-600 transition-colors" />
                </m.div>
                
                <div className="flex flex-col md:flex-row md:items-start gap-10">
                  <div className="w-full md:w-1/4 shrink-0">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-orange-600 font-black bg-orange-600/10 px-3 py-1.5 rounded-lg inline-block mb-4">
                      {item.period}
                    </span>
                    <h3 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white uppercase leading-tight mb-2">
                      {item.title}
                    </h3>
                    <p className="text-base text-slate-400 font-bold uppercase tracking-widest">
                      {item.subtitle}
                    </p>
                  </div>

                  <div className="flex-1">
                    <div className="glass-card p-10 rounded-[2.5rem] border border-slate-200 dark:border-slate-800/50 hover:border-orange-500/30 transition-all duration-500 group bg-white/5 dark:bg-slate-900/5">
                      <ul className="space-y-6">
                        {item.points.map((point, i) => (
                          <li key={i} className="text-base text-slate-500 dark:text-slate-400 leading-relaxed flex gap-5 font-medium">
                            <span className="mt-2.5 w-2 h-2 shrink-0 bg-orange-500/20 rounded-full group-hover:bg-orange-600 transition-colors" />
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </m.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;