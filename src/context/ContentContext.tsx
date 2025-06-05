import React, { createContext, useState, useEffect, useContext } from 'react';

interface ContentItem {
  id: string;
  title: string;
  content: string;
  lastUpdated: Date;
}

interface PageContent {
  [key: string]: {
    title: string;
    sections: ContentItem[];
  };
}

// Initial content structure
const initialContent: PageContent = {
  home: {
    title: 'Novidades Google',
    sections: [
      {
        id: 'hero',
        title: 'Inovação que transforma o mundo',
        content: 'Descubra as mais recentes tecnologias e atualizações do Google que estão moldando o futuro digital.',
        lastUpdated: new Date(),
      },
      {
        id: 'about',
        title: 'Sobre o Google',
        content: 'O Google é uma empresa global de tecnologia focada em serviços e produtos relacionados à Internet, incluindo tecnologias de publicidade online, mecanismos de busca, computação em nuvem, software e hardware.',
        lastUpdated: new Date(),
      },
    ],
  },
  q1: {
    title: 'Q1 - Primeiro Trimestre',
    sections: [
      {
        id: 'q1-summary',
        title: 'Resumo do Primeiro Trimestre',
        content: 'No primeiro trimestre de 2023, o Google apresentou várias inovações em inteligência artificial e melhorias nos produtos existentes.',
        lastUpdated: new Date(),
      },
    ],
  },
  q2: {
    title: 'Q2 - Segundo Trimestre',
    sections: [
      {
        id: 'q2-summary',
        title: 'Resumo do Segundo Trimestre',
        content: 'No segundo trimestre de 2023, o Google expandiu suas iniciativas de sustentabilidade e lançou novas ferramentas para desenvolvedores.',
        lastUpdated: new Date(),
      },
    ],
  },
  modelos: {
    title: 'Modelos e Tecnologias',
    sections: [
      {
        id: 'models-intro',
        title: 'Nossas Tecnologias',
        content: 'Explore os mais recentes modelos de IA e tecnologias desenvolvidas pelo Google para transformar a maneira como interagimos com o mundo digital.',
        lastUpdated: new Date(),
      },
    ],
  },
};

interface ContentContextType {
  content: PageContent;
  updateContent: (page: string, sectionId: string, newContent: string) => void;
  updateTitle: (page: string, sectionId: string, newTitle: string) => void;
  addSection: (page: string, title: string, content: string) => void;
  removeSection: (page: string, sectionId: string) => void;
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<PageContent>(() => {
    const saved = localStorage.getItem('pageContent');
    return saved ? JSON.parse(saved) : initialContent;
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    localStorage.setItem('pageContent', JSON.stringify(content));
  }, [content]);

  const updateContent = (page: string, sectionId: string, newContent: string) => {
    setContent(prevContent => {
      const updatedSections = prevContent[page].sections.map(section => 
        section.id === sectionId 
          ? { ...section, content: newContent, lastUpdated: new Date() } 
          : section
      );
      
      return {
        ...prevContent,
        [page]: {
          ...prevContent[page],
          sections: updatedSections,
        },
      };
    });
  };

  const updateTitle = (page: string, sectionId: string, newTitle: string) => {
    setContent(prevContent => {
      const updatedSections = prevContent[page].sections.map(section => 
        section.id === sectionId 
          ? { ...section, title: newTitle, lastUpdated: new Date() } 
          : section
      );
      
      return {
        ...prevContent,
        [page]: {
          ...prevContent[page],
          sections: updatedSections,
        },
      };
    });
  };

  const addSection = (page: string, title: string, content: string) => {
    const newId = `section-${Date.now()}`;
    
    setContent(prevContent => ({
      ...prevContent,
      [page]: {
        ...prevContent[page],
        sections: [
          ...prevContent[page].sections,
          {
            id: newId,
            title,
            content,
            lastUpdated: new Date(),
          },
        ],
      },
    }));
  };

  const removeSection = (page: string, sectionId: string) => {
    setContent(prevContent => ({
      ...prevContent,
      [page]: {
        ...prevContent[page],
        sections: prevContent[page].sections.filter(section => section.id !== sectionId),
      },
    }));
  };

  return (
    <ContentContext.Provider value={{ 
      content, 
      updateContent, 
      updateTitle, 
      addSection, 
      removeSection, 
      isEditing, 
      setIsEditing 
    }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};