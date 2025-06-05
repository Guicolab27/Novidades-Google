import React from 'react';
import { motion } from 'framer-motion';
import EditableSection from '../components/EditableSection';
import AddSection from '../components/AddSection';
import { useContent } from '../context/ContentContext';

const Q1: React.FC = () => {
  const { content } = useContent();
  const pageName = 'q1';
  const pageData = content[pageName];

  if (!pageData) return null;

  return (
    <>
      <div className="relative pt-32 pb-20 bg-secondary">
        <div className="absolute inset-0 opacity-20 overflow-hidden">
          <div className="absolute -right-10 -top-20 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
          <div className="absolute -left-20 -bottom-20 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
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
              Acompanhe os destaques e as principais inovações apresentadas no primeiro trimestre.
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
          <motion.div
            className="bg-white p-8 rounded-xl shadow-lg max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-semibold mb-4 text-secondary">Destaques do Trimestre</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary/20 text-primary font-medium">1</span>
                <div>
                  <h4 className="font-medium text-secondary">Lançamento do Google AI Studio</h4>
                  <p className="text-secondary/70">Nova plataforma para desenvolvimento e teste de aplicações de IA.</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary/20 text-primary font-medium">2</span>
                <div>
                  <h4 className="font-medium text-secondary">Atualização do Chrome</h4>
                  <p className="text-secondary/70">Melhorias de performance e novos recursos de privacidade.</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary/20 text-primary font-medium">3</span>
                <div>
                  <h4 className="font-medium text-secondary">Pixel Feature Drop</h4>
                  <p className="text-secondary/70">Novas funcionalidades exclusivas para dispositivos Pixel.</p>
                </div>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Q1;