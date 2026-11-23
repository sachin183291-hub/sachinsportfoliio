import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ACHIEVEMENTS } from '../constants';
import { Achievement } from '../types';
import { Trophy, Award, X, ZoomIn } from 'lucide-react';

const m = motion as any;

const Honors: React.FC = () => {
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);

  return (
    <section id="honors" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        <m.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-0.5 bg-orange-600 rounded-full"></div>
            <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-orange-600 font-black block">Recognition</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black tracking-super-tighter uppercase leading-[0.9] text-slate-900 dark:text-white">
            HONORS & <span className="text-orange-600">HACKATHONS.</span>
          </h2>
          <p className="mt-4 text-slate-500 dark:text-slate-400 font-medium max-w-xl text-base md:text-lg">
            Major hackathon victories, ideathons, and innovation expo wins. Click any card to inspect the credential.
          </p>
        </m.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ACHIEVEMENTS.map((ach, idx) => (
            <m.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              onClick={() => ach.image && setSelectedAchievement(ach)}
              className="glass-card rounded-3xl border border-slate-200 dark:border-slate-800/60 bg-white/5 dark:bg-slate-900/5 hover:border-orange-500/40 transition-all duration-300 group flex flex-col justify-between overflow-hidden cursor-pointer shadow-lg"
            >
              {/* Photo Banner with Zoom */}
              {ach.image && (
                <div className="relative h-44 w-full overflow-hidden bg-black/40">
                  <img
                    src={ach.image}
                    alt={ach.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-60" />
                  <div className="absolute top-3 right-3 p-2 bg-black/60 rounded-xl text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <ZoomIn size={14} />
                  </div>
                  <div className="absolute bottom-3 left-4">
                    <span className="font-mono text-[9px] font-black uppercase tracking-widest text-orange-400 bg-black/70 px-2 py-0.5 rounded backdrop-blur-md border border-white/10">
                      {ach.year}
                    </span>
                  </div>
                </div>
              )}

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-9 h-9 rounded-xl bg-orange-600/10 text-orange-600 flex items-center justify-center group-hover:scale-110 group-hover:bg-orange-600 group-hover:text-white transition-all">
                      {ach.category === 'Hackathon' ? <Trophy size={16} /> : <Award size={16} />}
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-orange-600">
                      {ach.category}
                    </span>
                  </div>
                  <h4 className="text-base font-black text-slate-900 dark:text-white uppercase tracking-tight mb-2 leading-snug group-hover:text-orange-500 transition-colors">
                    {ach.title}
                  </h4>
                  <p className="text-xs text-slate-400 font-medium leading-relaxed">
                    {ach.organization}
                  </p>
                </div>
              </div>
            </m.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal for Certificate/Award Image */}
      <AnimatePresence>
        {selectedAchievement && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedAchievement(null)}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8 bg-black/95 backdrop-blur-2xl overflow-y-auto"
          >
            {/* Top-Right Big Floating Close Button */}
            <button
              onClick={() => setSelectedAchievement(null)}
              className="fixed top-6 right-6 md:top-8 md:right-8 z-[10000] flex items-center gap-2 px-5 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-full shadow-2xl shadow-orange-600/50 transition-all font-black text-xs uppercase tracking-widest cursor-pointer border border-white/20 hover:scale-105 active:scale-95"
            >
              <X size={20} className="stroke-[3]" />
              <span>Close</span>
            </button>

            <m.div
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-slate-900/95 rounded-3xl p-6 md:p-8 border border-white/10 shadow-2xl overflow-hidden my-auto"
            >
              <div className="rounded-2xl overflow-hidden bg-black/80 max-h-[65vh] flex items-center justify-center mb-6 border border-white/5">
                <img
                  src={selectedAchievement.image}
                  alt={selectedAchievement.title}
                  className="w-full h-auto max-h-[65vh] object-contain rounded-xl"
                />
              </div>

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-2 border-t border-white/10">
                <div>
                  <span className="font-mono text-[10px] font-black uppercase tracking-widest text-orange-500 bg-orange-500/10 px-2.5 py-1 rounded">
                    {selectedAchievement.year} • {selectedAchievement.category}
                  </span>
                  <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight mt-2 mb-1">
                    {selectedAchievement.title}
                  </h3>
                  <p className="text-sm text-slate-400 font-medium">
                    {selectedAchievement.organization}
                  </p>
                </div>

                <button
                  onClick={() => setSelectedAchievement(null)}
                  className="px-6 py-3 bg-white/10 hover:bg-orange-600 text-white rounded-xl font-bold text-xs uppercase tracking-widest transition-all border border-white/10 text-center"
                >
                  Dismiss
                </button>
              </div>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Honors;
