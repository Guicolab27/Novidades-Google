import React from 'react';
import { Edit, Save } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { motion, AnimatePresence } from 'framer-motion';

const EditModeToggle: React.FC = () => {
  const { isEditing, setIsEditing } = useContent();

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  const buttonVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        type: 'spring',
        stiffness: 260,
        damping: 20 
      } 
    },
    exit: { 
      scale: 0, 
      opacity: 0,
      transition: { duration: 0.2 } 
    },
    hover: { scale: 1.1 }
  };

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <AnimatePresence mode="wait">
        <motion.button
          key={isEditing ? 'save' : 'edit'}
          onClick={toggleEditing}
          className={`p-3 rounded-full shadow-lg flex items-center justify-center ${
            isEditing 
              ? 'bg-success text-white' 
              : 'bg-primary text-white'
          }`}
          variants={buttonVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          whileHover="hover"
          whileTap={{ scale: 0.9 }}
          aria-label={isEditing ? 'Salvar alterações' : 'Editar conteúdo'}
        >
          {isEditing ? <Save size={24} /> : <Edit size={24} />}
        </motion.button>
      </AnimatePresence>
    </div>
  );
};

export default EditModeToggle;