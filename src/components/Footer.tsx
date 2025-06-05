import React from 'react';
import { Link } from 'react-router-dom';
import { SquarePen, Mail, PhoneCall, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = [
    { to: '/', label: 'Home' },
    { to: '/q1', label: 'Q1' },
    { to: '/q2', label: 'Q2' },
    { to: '/modelos', label: 'Modelos' },
  ];

  return (
    <footer className="bg-secondary text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & About */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <SquarePen className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold">Novidades Google</span>
            </div>
            <p className="text-white/80 text-sm">
              Acompanhe as mais recentes inovações e tecnologias do Google que estão transformando o mundo digital.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Links Rápidos</h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-white/80 hover:text-primary transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Contato</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-primary mt-0.5" />
                <span className="text-white/80">contato@novidadesgoogle.com</span>
              </li>
              <li className="flex items-start space-x-3">
                <PhoneCall className="h-5 w-5 text-primary mt-0.5" />
                <span className="text-white/80">+55 (11) 3456-7890</span>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5" />
                <span className="text-white/80">
                  Av. Brigadeiro Faria Lima, 3477 - São Paulo, SP
                </span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Newsletter</h3>
            <p className="text-white/80 text-sm mb-4">
              Inscreva-se para receber as últimas atualizações e novidades.
            </p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Seu e-mail"
                className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:border-primary"
                required
              />
              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300"
              >
                Inscrever-se
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/70 text-sm">
            &copy; {currentYear} Novidades Google. Todos os direitos reservados.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a
              href="#"
              className="text-white/70 hover:text-primary transition-colors duration-300"
              aria-label="Termos de Uso"
            >
              Termos de Uso
            </a>
            <a
              href="#"
              className="text-white/70 hover:text-primary transition-colors duration-300"
              aria-label="Política de Privacidade"
            >
              Política de Privacidade
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;