import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import { Plus, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AddSectionProps {
  pageName: string;
}

const AddSection: React.FC<AddSectionProps> = ({ pageName }) => {
  const { addSection, isEditing } = useContent();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && content.trim()) {
      addSection(pageName, title, content);
      setTitle('');
      setContent('');
      setIsFormOpen(false);
    }
  };

  if (!isEditing) return null;

  return (
    <div className="my-8">
      <AnimatePresence>
        {!isFormOpen ? (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsFormOpen(true)}
            className="flex items-center justify-center space-x-2 px-4 py-3 bg-primary/10 border-2 border-dashed border-primary/30 text-primary rounded-lg w-full hover:bg-primary/20 transition-colors"
          >
            <Plus size={20} />
            <span>Adicionar nova seção</span>
          </motion.button>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white rounded-lg shadow-lg p-6 border border-primary/20"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-secondary">Nova Seção</h3>
              <button
                onClick={() => setIsFormOpen(false)}
                className="text-secondary/70 hover:text-secondary transition-colors"
                aria-label="Fechar formulário"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="section-title" className="block text-sm font-medium text-secondary mb-1">
                  Título
                </label>
                <input
                  id="section-title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="Digite o título da seção"
                  required
                />
              </div>

              <div>
                <label htmlFor="section-content" className="block text-sm font-medium text-secondary mb-1">
                  Conteúdo
                </label>
                <textarea
                  id="section-content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 min-h-[150px]"
                  placeholder="Digite o conteúdo da seção"
                  required
                />
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-secondary hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Adicionar Seção
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AddSection;