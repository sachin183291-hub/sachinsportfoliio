import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { tsParticles } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

// Cast motion to any to bypass missing prop types in some environments
const m = motion as any;

const Background: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const yOffset = useTransform(scrollYProgress, [0, 1], [0, -500]);
  const rotateOffset = useTransform(scrollYProgress, [0, 1], [0, 15]);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    
    const initParticles = async () => {
      try {
        const particleElement = document.getElementById("tsparticles-main");
        if (!particleElement) return;

        await loadSlim(tsParticles);
        
        await tsParticles.load({
          id: "tsparticles-main",
          options: {
            fullScreen: { enable: false },
            fpsLimit: 120,
            interactivity: {
              events: {
                onHover: {
                  enable: true,
                  mode: ["bubble", "connect"],
                },
                onClick: {
                  enable: true,
                  mode: "push",
                },
                resize: { enable: true },
              },
              modes: {
                bubble: {
                  distance: 200,
                  duration: 2,
                  opacity: 0.8,
                  size: 6,
                  color: "#f97316",
                  mix: true
                },
                connect: {
                  distance: 150,
                  links: {
                    opacity: 0.2
                  },
                  radius: 120
                },
                push: {
                  quantity: 4,
                },
                repulse: {
                  distance: 100,
                  duration: 0.4,
                }
              },
            },
            particles: {
              color: {
                value: ["#f97316", "#fbbf24", "#ea580c"],
              },
              links: {
                color: "#f97316",
                distance: 150,
                enable: true,
                opacity: 0.1,
                width: 0.5,
                triangles: {
                  enable: true,
                  opacity: 0.02
                }
              },
              move: {
                direction: "none",
                enable: true,
                outModes: {
                  default: "out",
                },
                random: true,
                speed: { min: 0.2, max: 0.8 },
                straight: false
              },
              number: {
                density: {
                  enable: true,
                  width: 1000,
                  height: 1000
                },
                value: 60,
              },
              opacity: {
                value: { min: 0.05, max: 0.3 },
                animation: {
                  enable: true,
                  speed: 0.5,
                  sync: false
                }
              },
              shape: {
                type: "circle",
              },
              size: {
                value: { min: 1, max: 3 },
                animation: {
                  enable: true,
                  speed: 2,
                  sync: false
                }
              }
            },
            detectRetina: true,
          },
        });
        initialized.current = true;
      } catch (error) {
        console.warn("tsParticles load failed:", error);
      }
    };

    initParticles();
  }, []);

  return (
    <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none select-none bg-transparent">
      {/* 1. Base Layer: Advanced Ambient Gradients */}
      <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/[0.03] via-transparent to-amber-500/[0.03] dark:from-orange-950/[0.08] dark:to-transparent" />
      
      {/* 2. Main Particle Canvas (Tech Mesh) */}
      <div id="tsparticles-main" className="absolute inset-0 z-20 opacity-60 dark:opacity-40" />

      {/* 3. Deep Bokeh Layer (Blurry Background Particles) */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <m.div 
          animate={{
            y: [0, -40, 0],
            x: [0, 30, 0],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[15%] left-[10%] w-64 h-64 rounded-full bg-orange-600/10 blur-[100px]"
        />
        <m.div 
          animate={{
            y: [0, 50, 0],
            x: [0, -40, 0],
            opacity: [0.05, 0.15, 0.05]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[20%] right-[15%] w-96 h-96 rounded-full bg-amber-600/5 blur-[120px]"
        />
      </div>

      {/* 4. Subtle Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.05)_100%)] dark:bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.2)_100%)] z-50 pointer-events-none" />
    </div>
  );
};

export default Background;