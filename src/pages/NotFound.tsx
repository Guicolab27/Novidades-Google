import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-light">
      <div className="container-custom">
        <motion.div 
          className="text-center max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h1 
            className="text-9xl font-bold text-primary"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            404
          </motion.h1>
          <h2 className="text-3xl font-bold text-secondary mt-4 mb-6">Página Não Encontrada</h2>
          <p className="text-lg text-secondary/80 mb-8">
            A página que você está procurando não existe ou foi removida.
          </p>
          <Link 
            to="/"
            className="btn btn-primary inline-flex items-center"
          >
            <Home className="mr-2 h-5 w-5" />
            Voltar para a Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;