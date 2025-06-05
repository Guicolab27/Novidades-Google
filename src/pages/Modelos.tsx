import React from 'react';
import { motion } from 'framer-motion';
import EditableSection from '../components/EditableSection';
import AddSection from '../components/AddSection';
import { useContent } from '../context/ContentContext';

const Modelos: React.FC = () => {
  const { content } = useContent();
  const pageName = 'modelos';
  const pageData = content[pageName];

  if (!pageData) return null;

  const models = [
    {
      name: 'Gemini',
      description: 'Modelo multimodal avançado capaz de compreender texto, imagens, áudio e vídeo de forma integrada.',
      category: 'IA Multimodal',
      image: 'https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      name: 'PaLM',
      description: 'Modelo de linguagem de grande escala projetado para compreender contexto e gerar texto natural.',
      category: 'Processamento de Linguagem',
      image: 'https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      name: 'MedPaLM',
      description: 'Modelo especializado para respostas a perguntas médicas com alto grau de precisão e embasamento científico.',
      category: 'IA para Saúde',
      image: 'https://images.pexels.com/photos/4226140/pexels-photo-4226140.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      name: 'Imagen',
      description: 'Sistema de geração de imagens baseado em descrições textuais com alta fidelidade e precisão.',
      category: 'Geração de Imagens',
      image: 'https://images.pexels.com/photos/924824/pexels-photo-924824.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      }
    },
    hover: {
      y: -10,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: {
        duration: 0.3,
      }
    }
  };

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
              Explore os mais avançados modelos de IA e tecnologias desenvolvidas pelo Google.
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
          <h2 className="text-3xl font-bold text-center mb-12 text-secondary">Nossos Modelos</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {models.map((model, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl overflow-hidden shadow-sm"
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                viewport={{ once: true, margin: "50px" }}
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={model.image} 
                    alt={model.name} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <span className="inline-block px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full mb-3">
                    {model.category}
                  </span>
                  <h3 className="text-xl font-semibold mb-2 text-secondary">{model.name}</h3>
                  <p className="text-secondary/80 mb-4">{model.description}</p>
                  <a href="#" className="text-primary font-medium hover:underline">Explorar →</a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="section bg-secondary text-white">
        <div className="container-custom">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-6">Vamos Colaborar</h2>
            <p className="text-xl text-white/90 mb-8">
              Interessado em saber como nossos modelos podem transformar seu negócio? Entre em contato para uma demonstração personalizada.
            </p>
            <a
              href="#"
              className="btn btn-primary text-lg px-8 py-4"
            >
              Agendar Demonstração
            </a>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Modelos;