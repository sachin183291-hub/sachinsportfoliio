import React from 'react';
import { motion } from 'framer-motion';
import { EDUCATION } from '../constants';
import { GraduationCap, MapPin, Landmark, BookOpen } from 'lucide-react';

const m = motion as any;

const Education: React.FC = () => {
  return (
    <section id="education" className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="mb-24">
          <m.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="w-12 h-0.5 bg-orange-600 rounded-full"></div>
            <span className="font-mono text-[10px] uppercase tracking-[0.5em] font-black text-orange-600">Academia</span>
          </m.div>
          <m.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black tracking-super-tighter uppercase leading-[0.9] text-slate-900 dark:text-white"
          >
            SCHOLASTIC <br /> <span className="text-orange-600">HISTORY.</span>
          </m.h2>
        </div>

        <div className="relative max-w-5xl ml-2">
          {/* Vertical Backbone Line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-orange-600 via-slate-200 dark:via-slate-800 to-transparent" />

          <div className="space-y-20">
            {EDUCATION.map((edu, index) => (
              <m.div
                key={index}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative pl-20 group"
              >
                {/* Timeline Node Icon */}
                <m.div 
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20, delay: index * 0.2 + 0.3 }}
                  className="absolute left-0 top-0 w-12 h-12 rounded-2xl bg-white dark:bg-[#050505] border-2 border-slate-100 dark:border-slate-800 flex items-center justify-center z-10 shadow-xl group-hover:border-orange-600 transition-all duration-500"
                >
                  <GraduationCap size={20} className="text-slate-400 group-hover:text-orange-600 transition-colors" />
                </m.div>

                {/* Content Area */}
                <div className="flex flex-col md:flex-row md:items-start gap-10">
                  <div className="w-full md:w-1/4 shrink-0">
                    <span className="font-mono text-[10px] uppercase tracking-widest font-black text-orange-600 bg-orange-600/10 px-3 py-1.5 rounded-lg inline-block mb-4">
                      {edu.period}
                    </span>
                    <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight uppercase leading-tight mb-2">
                      {edu.institution}
                    </h3>
                    <div className="flex items-center gap-2 text-slate-400 font-bold uppercase tracking-widest text-[10px]">
                      <MapPin size={12} className="text-orange-500/50" />
                      {edu.location}
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="glass-card p-10 rounded-[2.5rem] border border-slate-200 dark:border-slate-800/50 hover:border-orange-500/30 transition-all duration-500 relative overflow-hidden bg-white/5 dark:bg-slate-900/5">
                      <div className="relative z-10">
                        <div className="inline-flex items-center gap-3 px-5 py-2 rounded-xl bg-slate-900/10 dark:bg-white/5 border border-slate-200 dark:border-white/5 mb-8">
                          <BookOpen size={16} className="text-orange-500" />
                          <span className="text-sm font-black text-slate-700 dark:text-slate-300 uppercase tracking-widest">{edu.degree}</span>
                        </div>

                        {edu.description && (
                          <p className="text-base md:text-lg text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                            {edu.description}
                          </p>
                        )}
                      </div>

                      {/* Subtle Background Watermark */}
                      <div className="absolute -bottom-10 -right-10 opacity-[0.03] dark:opacity-[0.05] group-hover:rotate-12 transition-transform duration-1000">
                        <GraduationCap size={200} />
                      </div>
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

export default Education;