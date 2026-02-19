import React from 'react';
import { motion } from 'framer-motion';
import { SKILLS } from '../constants';

const m = motion as any;

const Skills: React.FC = () => {
  const categories = Array.from(new Set(SKILLS.map(s => s.category)));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section id="skills" className="py-32 relative">
      <div className="container mx-auto px-6 max-w-7xl">
        <m.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-0.5 bg-orange-600 rounded-full"></div>
            <span className="font-mono text-[10px] uppercase tracking-[0.5em] font-black text-orange-600">Inventory</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black tracking-super-tighter uppercase leading-[0.9] text-slate-900 dark:text-white">
            TECHNICAL <br /> <span className="text-orange-600">CAPABILITIES.</span>
          </h2>
        </m.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-16 gap-y-20">
          {categories.map((category) => (
            <m.div 
              key={category} 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={containerVariants}
              className="space-y-12"
            >
              <m.h3 
                variants={itemVariants}
                className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 dark:text-slate-500 border-b border-slate-100 dark:border-slate-800/50 pb-6"
              >
                {category}
              </m.h3>
              <div className="space-y-10">
                {SKILLS.filter(s => s.category === category).map((skill) => (
                  <m.div 
                    key={skill.name} 
                    variants={itemVariants}
                    className="group"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-white/5 flex items-center justify-center text-xl group-hover:scale-110 group-hover:bg-orange-600/10 group-hover:border-orange-500/30 transition-all duration-500">
                           {skill.icon}
                        </div>
                        <span className="text-sm font-black tracking-widest text-slate-800 dark:text-slate-200 uppercase">{skill.name}</span>
                      </div>
                      <span className="font-mono text-[10px] text-slate-400 font-black">{skill.level}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800/50 rounded-full overflow-hidden">
                      <m.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                        className="h-full bg-gradient-to-r from-orange-600 to-amber-500"
                      />
                    </div>
                  </m.div>
                ))}
              </div>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;