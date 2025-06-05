import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const InteractiveBanner: React.FC = () => {
  const bannerRef = useRef<HTMLDivElement>(null);
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!bannerRef.current) return;
      
      const { clientX, clientY } = e;
      const { left, top, width, height } = bannerRef.current.getBoundingClientRect();
      
      const x = (clientX - left) / width;
      const y = (clientY - top) / height;
      
      const moveX = (x - 0.5) * 20;
      const moveY = (y - 0.5) * 20;
      
      bannerRef.current.style.setProperty('--move-x', `${moveX}px`);
      bannerRef.current.style.setProperty('--move-y', `${moveY}px`);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  };

  const particles = Array.from({ length: 20 }).map((_, i) => ({
    size: Math.random() * 10 + 5,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 10
  }));

  return (
    <div 
      ref={bannerRef}
      className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-secondary via-secondary/90 to-secondary"
      style={{
        '--move-x': '0px',
        '--move-y': '0px',
      } as React.CSSProperties}
    >
      {/* Animated particles */}
      {particles.map((particle, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full bg-primary/20"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            x: [0, 30, -30, 0],
            y: [0, -30, 30, 0],
            scale: [1, 1.2, 0.8, 1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}

      {/* Content */}
      <div className="container-custom relative z-10" ref={ref}>
        <motion.div 
          className="text-center text-white space-y-6 max-w-3xl mx-auto"
          variants={textVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.h1
            className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
            animate={{
              scale: [1, 1.02, 1],
              transition: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
          >
            <span className="text-primary">Novidades</span> Google
          </motion.h1>
          
          <motion.div
            className="h-1 w-24 bg-primary mx-auto"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          />
          
          <motion.p
            className="text-xl md:text-2xl text-white/90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Seja bem-vindo(a) ao nosso espaço dedicado à divulgação das Novidades do Google e outros temas valiosos para as atividades que desenvolvemos na Colaborativa.
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <a
              href="#menu"
              className="btn btn-primary"
            >
              Explorar Menu
            </a>
            <a
              href="#content"
              className="btn btn-outline border-white text-white hover:bg-white hover:text-secondary"
            >
              Ver Conteúdo
            </a>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default InteractiveBanner;