import React from 'react';
import { motion } from 'framer-motion';
import { Server, Database, Lightbulb } from 'lucide-react';
import InteractiveBanner from '../components/InteractiveBanner';
import EditableSection from '../components/EditableSection';
import AddSection from '../components/AddSection';
import PageMenu from '../components/PageMenu';
import { useContent } from '../context/ContentContext';

const Home: React.FC = () => {
  const { content } = useContent();
  const pageName = 'home';
  const pageData = content[pageName];

  if (!pageData) return null;

  const features = [
    {
      icon: <Server className="h-10 w-10 text-primary" />,
      title: 'Infraestrutura de Ponta',
      description: 'Infraestrutura de nuvem avançada para suportar aplicações de alto desempenho e escala global.',
    },
    {
      icon: <Database className="h-10 w-10 text-primary" />,
      title: 'Armazenamento Inteligente',
      description: 'Soluções de armazenamento que se adaptam automaticamente às suas necessidades com segurança de nível empresarial.',
    },
    {
      icon: <Lightbulb className="h-10 w-10 text-primary" />,
      title: 'IA Revolucionária',
      description: 'Tecnologias de inteligência artificial que transformam dados em insights acionáveis para seu negócio.',
    },
  ];

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
      <InteractiveBanner />
      
      <PageMenu />
      
      <div id="content" className="section bg-white">
        <div className="container-custom">
          <motion.div
            className="mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-secondary mb-4">
              Transformando o Futuro
            </h2>
            <p className="text-lg text-secondary/80 max-w-3xl mx-auto">
              Conheça as mais recentes tecnologias e inovações que estão moldando o futuro digital.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                custom={index}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="bg-light p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-secondary">{feature.title}</h3>
                <p className="text-secondary/80">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="section bg-light">
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
    </>
  );
};

export default Home;