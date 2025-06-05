import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Box, Lightbulb } from 'lucide-react';

const PageMenu: React.FC = () => {
  const menuItems = [
    {
      title: 'Q1 - Primeiro Trimestre',
      description: 'Acompanhe as novidades do primeiro trimestre',
      icon: <Calendar className="h-8 w-8 text-primary" />,
      link: '/q1'
    },
    {
      title: 'Q2 - Segundo Trimestre',
      description: 'Descubra as atualizações do segundo trimestre',
      icon: <Box className="h-8 w-8 text-primary" />,
      link: '/q2'
    },
    {
      title: 'Modelos',
      description: 'Explore nossos modelos e tecnologias',
      icon: <Lightbulb className="h-8 w-8 text-primary" />,
      link: '/modelos'
    }
  ];

  return (
    <div id="menu" className="section bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">Menu de Páginas</h2>
          <p className="text-lg text-secondary/80 max-w-2xl mx-auto">
            Cada página traz as novidades e atualizações mais recentes, facilitando o acompanhamento de tudo que foi lançado em cada período. 📚✨
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {menuItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
            >
              <Link
                to={item.link}
                className="block bg-light rounded-xl p-6 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-secondary">
                  {item.title}
                </h3>
                <p className="text-secondary/80">
                  {item.description}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PageMenu;