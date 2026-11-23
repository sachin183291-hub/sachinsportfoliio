import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Send, MapPin, Mail, CheckCircle, Github, Linkedin, Twitter, FileDown } from 'lucide-react';
import { tsParticles } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

const m = motion as any;

interface ContactProps {
  onOpenResume?: () => void;
}

const Contact: React.FC<ContactProps> = ({ onOpenResume }) => {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');
  const initialized = useRef(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (initialized.current) return;
    const initContactParticles = async () => {
      try {
        const particleElement = document.getElementById("contact-particles");
        if (!particleElement) return;
        await loadSlim(tsParticles);
        await tsParticles.load({
          id: "contact-particles",
          options: {
            fullScreen: { enable: false },
            fpsLimit: 60,
            interactivity: {
              events: { onHover: { enable: true, mode: "bubble" } },
              modes: { bubble: { distance: 150, duration: 2, opacity: 0.6, size: 5, color: "#f97316" } },
            },
            particles: {
              color: { value: ["#f97316", "#fbbf24"] },
              move: { enable: true, speed: 0.3, random: true },
              number: { density: { enable: true, width: 800, height: 800 }, value: 30 },
              opacity: { value: { min: 0.05, max: 0.15 } },
              size: { value: { min: 1, max: 3 } },
            },
          },
        });
        initialized.current = true;
      } catch (error) { console.warn("tsParticles Contact load failed:", error); }
    };
    initContactParticles();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    const name = formData.get('userName');
    const email = formData.get('userEmail');
    const message = formData.get('userMessage');

    // Construct the email components
    const recipient = 'sachinsiddhappachetty01@gmail.com';
    const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
    const body = encodeURIComponent(`Hello Sachin,\n\nYou have received a new message from your portfolio website:\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n\n--- End of Message ---`);

    setStatus('sending');

    // Create the mailto link
    const mailtoLink = `mailto:${recipient}?subject=${subject}&body=${body}`;

    setTimeout(() => {
      // Trigger the email client
      window.location.href = mailtoLink;
      
      setStatus('success');
      setTimeout(() => {
        setStatus('idle');
        formRef.current?.reset();
      }, 5000);
    }, 1200);
  };

  const inputStyles = "w-full bg-white/50 dark:bg-slate-900/50 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-2xl px-6 py-4 outline-none transition-all duration-300 focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 font-bold placeholder:text-slate-400 text-slate-900 dark:text-white";

  const socialLinks = [
    { icon: Github, href: 'https://github.com/sachin183291-hub', label: 'Github' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/sachin-s-86b971326', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://x.com/Mr_sachin183', label: 'Twitter' }
  ];

  return (
    <section id="contact" className="py-32 relative overflow-hidden bg-transparent">
      <div id="contact-particles" className="absolute inset-0 z-0 pointer-events-none opacity-40 dark:opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.05)_0%,transparent_70%)] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          
          <m.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-0.5 bg-orange-600 rounded-full"></div>
              <span className="font-mono text-[10px] uppercase tracking-[0.5em] font-black text-orange-600">Direct Message</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black tracking-super-tighter mb-10 leading-[0.9] text-slate-900 dark:text-white uppercase">
              LET'S <br /> CO-CREATE <br /> <span className="text-orange-600">HISTORY.</span>
            </h2>
            <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 mb-12 font-medium leading-relaxed max-w-md">
              Available for full-time roles, strategic consulting, or collaborative engineering ventures. 
            </p>

            <div className="space-y-10 mb-16">
              {[
                { icon: Mail, label: 'Email', value: 'sachinsiddhappachetty01@gmail.com', href: 'mailto:sachinsiddhappachetty01@gmail.com' },
                { icon: MapPin, label: 'Location', value: 'Salem, Tamil Nadu, India' }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-6 group">
                  <div className="w-14 h-14 bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/10 rounded-2xl flex items-center justify-center text-orange-600 group-hover:scale-110 transition-transform duration-500 shadow-lg">
                    <item.icon size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest font-black mb-1">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} className="text-xl font-black text-slate-900 dark:text-white hover:text-orange-500 transition-colors uppercase tracking-tighter">{item.value}</a>
                    ) : (
                      <p className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-6">
              <div className="flex gap-4">
                {socialLinks.map((social, idx) => (
                  <m.a
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -6, scale: 1.1 }}
                    className="w-14 h-14 glass-card rounded-2xl flex items-center justify-center text-slate-500 hover:text-orange-500 hover:border-orange-500/30 transition-all duration-300"
                    title={social.label}
                  >
                    <social.icon size={20} />
                  </m.a>
                ))}
              </div>
              <div className="h-10 w-px bg-slate-200 dark:bg-slate-800 mx-2 hidden sm:block" />
              <m.button
                onClick={onOpenResume}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-4 px-10 py-5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-[2rem] font-black text-[11px] uppercase tracking-[0.3em] shadow-2xl shadow-slate-900/10 group"
              >
                <FileDown size={18} className="group-hover:translate-y-1 transition-transform duration-300" />
                Resume
              </m.button>
            </div>
          </m.div>

          <m.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <div className="glass-card p-10 md:p-16 rounded-[3rem] overflow-hidden relative bg-white/40 dark:bg-slate-900/20">
              {status === 'success' ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-20">
                  <m.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-24 h-24 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mb-8"><CheckCircle size={48} /></m.div>
                  <h3 className="text-3xl font-black mb-4 uppercase tracking-tighter">Transmission Successful.</h3>
                  <p className="text-slate-400 font-medium text-balance">Your message has been formatted. Please send the draft in your email client!</p>
                  <m.button 
                    onClick={() => setStatus('idle')}
                    className="mt-8 text-orange-500 font-black uppercase text-[10px] tracking-widest hover:underline"
                  >
                    Send another message
                  </m.button>
                </div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Identified Name</label>
                      <input required name="userName" type="text" placeholder="Sachin" className={inputStyles} />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Email Endpoint</label>
                      <input required name="userEmail" type="email" placeholder="sachin@example.com" className={inputStyles} />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Payload Description</label>
                    <textarea required name="userMessage" rows={5} placeholder="Tell me about your vision..." className={`${inputStyles} resize-none`} />
                  </div>
                  <m.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={status === 'sending'}
                    className="w-full relative overflow-hidden group bg-orange-600 text-white font-black py-6 rounded-[2rem] shadow-2xl shadow-orange-600/30 flex items-center justify-center gap-4 text-xs uppercase tracking-[0.4em]"
                  >
                    {status === 'sending' ? "Transmitting..." : <>Deploy Message <Send size={18} /></>}
                  </m.button>
                </form>
              )}
            </div>
          </m.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;