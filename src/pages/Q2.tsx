import React from 'react';
import { motion } from 'framer-motion';
import EditableSection from '../components/EditableSection';
import AddSection from '../components/AddSection';
import { useContent } from '../context/ContentContext';

const Q2: React.FC = () => {
  const { content } = useContent();
  const pageName = 'q2';
  const pageData = content[pageName];

  if (!pageData) return null;

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.5,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    }),
  };

  return (
    <>
      <div className="relative pt-32 pb-20 bg-secondary">
        <div className="absolute inset-0 opacity-20 overflow-hidden">
          <div className="absolute -left-10 -top-20 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
          <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
        </div>
        <div className="container-custom relative z-10">
          <motion.div
            className="text-center text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="page-title text-white mb-4">{pageData.title}</h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Conheça as principais inovações e atualizações apresentadas no segundo trimestre.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="section bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            {pageData.sections.map(section => (
              <EditableSection
                key={section.id}
                id={section.id}
                pageName={pageName}
                className="mb-12"
              />
            ))}
            
            <AddSection pageName={pageName} />
          </div>
        </div>
      </div>

      <div className="section bg-light">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12 text-secondary">Eventos do Trimestre</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              custom={0}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="mb-4 h-48 bg-secondary/10 rounded-lg flex items-center justify-center">
                <span className="text-4xl font-bold text-primary">I/O 2023</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-secondary">Google I/O 2023</h3>
              <p className="text-secondary/80 mb-4">
                Conferência anual de desenvolvedores do Google, apresentando as mais recentes tecnologias e atualizações de produtos.
              </p>
              <a href="#" className="text-primary font-medium hover:underline">Saiba mais →</a>
            </motion.div>
            
            <motion.div
              custom={1}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="mb-4 h-48 bg-secondary/10 rounded-lg flex items-center justify-center">
                <span className="text-4xl font-bold text-primary">Cloud Next</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-secondary">Google Cloud Next</h3>
              <p className="text-secondary/80 mb-4">
                Evento focado nas soluções de nuvem do Google, apresentando inovações em infraestrutura, segurança e IA.
              </p>
              <a href="#" className="text-primary font-medium hover:underline">Saiba mais →</a>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Q2;