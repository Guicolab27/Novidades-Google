import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X, SquarePen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const headerClasses = `fixed w-full z-50 transition-all duration-300 ${
    scrolled
      ? 'bg-white/95 backdrop-blur-sm shadow-md py-3'
      : 'bg-transparent py-5'
  }`;

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/q1', label: 'Q1' },
    { to: '/q2', label: 'Q2' },
    { to: '/modelos', label: 'Modelos' },
  ];

  const menuVariants = {
    closed: {
      opacity: 0,
      x: '100%',
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
      },
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <header className={headerClasses}>
      <div className="container-custom flex justify-between items-center">
        <Link
          to="/"
          className="flex items-center space-x-2 text-xl font-bold"
          onClick={closeMenu}
        >
          <SquarePen className="h-8 w-8 text-primary" />
          <span className={`${scrolled ? 'text-secondary' : 'text-white'}`}>
            Novidades Google
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `font-medium transition-colors duration-300 ${
                  scrolled
                    ? 'text-secondary hover:text-primary'
                    : 'text-white/90 hover:text-white'
                } ${isActive ? 'text-primary font-semibold' : ''}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl z-50"
          onClick={toggleMenu}
          aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
        >
          {isOpen ? (
            <X className={`h-6 w-6 ${scrolled ? 'text-secondary' : 'text-white'}`} />
          ) : (
            <Menu className={`h-6 w-6 ${scrolled ? 'text-secondary' : 'text-white'}`} />
          )}
        </button>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="fixed inset-0 bg-secondary/95 flex flex-col items-center justify-center z-40 md:hidden"
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
            >
              <nav className="flex flex-col items-center space-y-8 text-xl">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    className={({ isActive }) =>
                      `font-medium text-white/90 hover:text-white transition-colors duration-300 ${
                        isActive ? 'text-primary font-semibold' : ''
                      }`
                    }
                    onClick={closeMenu}
                  >
                    {link.label}
                  </NavLink>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;