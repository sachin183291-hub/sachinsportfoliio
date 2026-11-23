import React from 'react';
import { motion } from 'framer-motion';
import { User, Target, Zap, Heart } from 'lucide-react';

const m = motion as any;

const About: React.FC = () => {
  const boxVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.98 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.15,
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    })
  };

  return (
    <section id="about" className="py-32 relative overflow-hidden bg-slate-50/50 dark:bg-transparent">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          
          <div className="lg:col-span-5">
            <m.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:sticky lg:top-40"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-0.5 bg-orange-600 rounded-full"></div>
                <span className="font-mono text-[10px] uppercase tracking-[0.5em] font-black text-orange-600">Identity & Purpose</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-black tracking-super-tighter mb-10 leading-[0.9] text-slate-900 dark:text-white uppercase">
                ABOUT <br /> <span className="text-orange-600">ME.</span>
              </h2>
              
              <div className="space-y-6 text-lg md:text-xl text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                <p>
                  I am <span className="text-slate-900 dark:text-white font-black italic">Sachin S</span>, a motivated <span className="text-orange-600 font-bold">Electronics and Communication Engineering</span> student specializing in <span className="text-slate-900 dark:text-white font-bold">Artificial Intelligence and Software Development</span>.
                </p>
                <p>
                  With practical experience in AI Engineering, Prompt Engineering, Machine Learning, Deep Learning, and Full Stack Development, I build intelligent end-to-end applications and robust software solutions.
                </p>
              </div>
            </m.div>
          </div>

          <div className="lg:col-span-7 space-y-8">
            {[
              {
                num: '01',
                title: 'AI & Full Stack Fusion',
                icon: Target,
                desc: 'Specializing in combining Machine Learning models (TensorFlow, scikit-learn, OpenCV) with robust React and Node.js web architectures to build intelligent software solutions.'
              },
              {
                num: '02',
                title: 'Hardware & IoT Integration',
                icon: Zap,
                desc: 'ECE foundation enables seamlessly bridging physical IoT microcontrollers (Arduino, ESP32) with cloud backends and responsive dashboards.'
              },
              {
                num: '03',
                title: 'Proven Track Record',
                icon: Heart,
                desc: 'Hackathon winner and active innovator with experience in real-world consultancy projects, high-stakes 24-hour hackathons, and corporate internships.'
              }
            ].map((box, i) => (
              <m.div 
                key={i}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={boxVariants}
                className="group relative p-10 md:p-12 glass-card rounded-[2.5rem] overflow-hidden bg-white/5 dark:bg-slate-900/5 hover:border-orange-500/40 transition-all duration-500 border border-transparent"
              >
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-10">
                    <span className="font-mono text-5xl font-black text-slate-100 dark:text-slate-800/50 transition-colors group-hover:text-orange-500/10">
                      {box.num}
                    </span>
                    <div className="w-12 h-12 bg-orange-600/10 dark:bg-white/5 rounded-2xl flex items-center justify-center text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-all duration-500">
                      <box.icon size={20} />
                    </div>
                  </div>
                  <h3 className="text-2xl font-black mb-6 text-slate-900 dark:text-white tracking-tight uppercase">{box.title}</h3>
                  <p className="text-base md:text-lg text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                    {box.desc}
                  </p>
                </div>
                
                {/* Accent line on hover */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-orange-600 scale-y-0 group-hover:scale-y-100 transition-transform duration-500" />
              </m.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;