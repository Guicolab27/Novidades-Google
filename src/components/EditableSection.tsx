import React, { useState, useRef, useEffect } from 'react';
import { useContent } from '../context/ContentContext';
import { motion } from 'framer-motion';
import { Trash2, Plus } from 'lucide-react';

interface EditableSectionProps {
  id: string;
  pageName: string;
  className?: string;
}

const EditableSection: React.FC<EditableSectionProps> = ({ id, pageName, className = '' }) => {
  const { content, updateContent, updateTitle, removeSection, isEditing } = useContent();
  const section = content[pageName]?.sections.find(s => s.id === id);
  
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingContent, setIsEditingContent] = useState(false);
  const [editedTitle, setEditedTitle] = useState(section?.title || '');
  const [editedContent, setEditedContent] = useState(section?.content || '');
  
  const titleRef = useRef<HTMLTextAreaElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  
  useEffect(() => {
    if (isEditingTitle && titleRef.current) {
      titleRef.current.focus();
      titleRef.current.style.height = 'auto';
      titleRef.current.style.height = `${titleRef.current.scrollHeight}px`;
    }
  }, [isEditingTitle]);
  
  useEffect(() => {
    if (isEditingContent && contentRef.current) {
      contentRef.current.focus();
      contentRef.current.style.height = 'auto';
      contentRef.current.style.height = `${contentRef.current.scrollHeight}px`;
    }
  }, [isEditingContent]);
  
  if (!section) return null;
  
  const handleTitleClick = () => {
    if (isEditing) {
      setIsEditingTitle(true);
      setEditedTitle(section.title);
    }
  };
  
  const handleContentClick = () => {
    if (isEditing) {
      setIsEditingContent(true);
      setEditedContent(section.content);
    }
  };
  
  const handleTitleBlur = () => {
    setIsEditingTitle(false);
    if (editedTitle.trim() !== section.title) {
      updateTitle(pageName, id, editedTitle);
    }
  };
  
  const handleContentBlur = () => {
    setIsEditingContent(false);
    if (editedContent.trim() !== section.content) {
      updateContent(pageName, id, editedContent);
    }
  };
  
  const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedTitle(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;
  };
  
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedContent(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;
  };
  
  const handleTitleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleTitleBlur();
    }
  };
  
  const handleContentKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      e.preventDefault();
      handleContentBlur();
    }
  };
  
  const handleRemoveSection = () => {
    if (window.confirm('Tem certeza que deseja remover esta seção?')) {
      removeSection(pageName, id);
    }
  };
  
  return (
    <div className={`relative group ${className}`}>
      {isEditing && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={handleRemoveSection}
          className="absolute -right-10 top-0 p-2 text-error hover:bg-error/10 rounded-full transition-colors"
          aria-label="Remover seção"
        >
          <Trash2 size={18} />
        </motion.button>
      )}
      
      <div className="mb-4">
        {isEditingTitle ? (
          <textarea
            ref={titleRef}
            value={editedTitle}
            onChange={handleTitleChange}
            onBlur={handleTitleBlur}
            onKeyDown={handleTitleKeyDown}
            className="w-full text-3xl font-bold p-2 border-2 border-primary/50 rounded-md bg-white/50 focus:outline-none focus:border-primary resize-none overflow-hidden"
            rows={1}
          />
        ) : (
          <h2 
            onClick={handleTitleClick} 
            className={`text-3xl font-bold ${isEditing ? 'cursor-text hover:bg-primary/10 p-2 -m-2 rounded-md transition-colors' : ''}`}
          >
            {section.title}
          </h2>
        )}
      </div>
      
      <div>
        {isEditingContent ? (
          <textarea
            ref={contentRef}
            value={editedContent}
            onChange={handleContentChange}
            onBlur={handleContentBlur}
            onKeyDown={handleContentKeyDown}
            className="w-full p-2 border-2 border-primary/50 rounded-md bg-white/50 focus:outline-none focus:border-primary resize-none overflow-hidden min-h-[100px]"
            rows={5}
          />
        ) : (
          <div 
            onClick={handleContentClick} 
            className={`prose max-w-none ${isEditing ? 'cursor-text hover:bg-primary/10 p-2 -m-2 rounded-md transition-colors' : ''}`}
          >
            {section.content.split('\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EditableSection;