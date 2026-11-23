import React from 'react';
import { motion } from 'framer-motion';
import { CONSULTANCY_PROJECTS } from '../constants';
import { Briefcase, Building2, Code2, ShieldCheck } from 'lucide-react';

const m = motion as any;

const ConsultancyProjects: React.FC = () => {
  return (
    <section id="consultancy" className="py-28 relative overflow-hidden bg-slate-900/10 dark:bg-black/30">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <m.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-0.5 bg-orange-600 rounded-full"></div>
            <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-orange-600 font-black block">Client Work</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black tracking-super-tighter uppercase leading-[0.9] text-slate-900 dark:text-white">
            CONSULTANCY <br /> <span className="text-orange-600">PROJECTS.</span>
          </h2>
          <p className="mt-4 text-slate-500 dark:text-slate-400 font-medium max-w-xl text-base md:text-lg">
            Proprietary industrial software & engineering solutions delivered directly for corporate clients.
          </p>
        </m.div>

        <div className="grid md:grid-cols-2 gap-10">
          {CONSULTANCY_PROJECTS.map((proj, idx) => (
            <m.div
              key={proj.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: idx * 0.15 }}
              className="glass-card rounded-[2.5rem] border border-slate-200 dark:border-white/10 overflow-hidden bg-white/5 dark:bg-slate-900/20 group hover:border-orange-500/40 transition-all duration-500 flex flex-col justify-between"
            >
              <div>
                {/* Project Image */}
                <div className="relative h-64 md:h-72 w-full overflow-hidden bg-black">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-80" />
                  
                  {/* Client badge */}
                  <div className="absolute top-5 left-5">
                    <div className="flex items-center gap-2 px-3.5 py-1.5 bg-black/70 backdrop-blur-md border border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest text-orange-400">
                      <Building2 size={13} />
                      Client: {proj.client}
                    </div>
                  </div>

                  {/* Confidential / Proprietary watermark badge */}
                  <div className="absolute bottom-4 right-4">
                    <span className="flex items-center gap-1.5 px-3 py-1 bg-white/10 backdrop-blur-md rounded-md text-[9px] font-black uppercase tracking-widest text-white/80 border border-white/10">
                      <ShieldCheck size={13} className="text-orange-500" /> Proprietary
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 md:p-10">
                  <div className="flex items-center gap-2 mb-3">
                    <Briefcase size={16} className="text-orange-500" />
                    <span className="font-mono text-[10px] uppercase tracking-widest text-orange-500 font-bold">Industrial Engagement</span>
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-4 group-hover:text-orange-500 transition-colors">
                    {proj.title}
                  </h3>

                  <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base leading-relaxed mb-8 font-medium">
                    {proj.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {proj.technologies.map(tech => (
                      <span
                        key={tech}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-[10px] font-bold text-slate-700 dark:text-white/80 uppercase tracking-widest"
                      >
                        <Code2 size={12} className="text-orange-500" />
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer info: Explains no public repository/link as per industry NDA */}
              <div className="px-8 pb-8 pt-2 border-t border-slate-100 dark:border-white/5 text-[11px] font-mono text-slate-400 dark:text-slate-500 flex items-center justify-between">
                <span>Enterprise NDA Protected</span>
                <span className="text-orange-500/70 font-black">Production Deployed</span>
              </div>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ConsultancyProjects;

