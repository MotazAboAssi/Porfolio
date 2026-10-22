import { Certifications } from './components/Certifications';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { Hackathon } from './components/Hackathon';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Projects } from './components/Projects';
import { Services } from './components/Services';
import { Skills } from './components/Skills';
import { useLanguage } from './hooks/useLanguage';
import { useReveal } from './hooks/useReveal';
import { translations, type TranslationKey } from './i18n/translations';
import './styles/global.css';

function App() {
  const { language, setLanguage } = useLanguage();
  useReveal();
  const t = (key: TranslationKey) => translations[language][key];

  return (
    <div className="site-shell">
      <a className="sr-only" href="#main-content">
        {language === 'ar' ? 'انتقل إلى المحتوى' : 'Skip to content'}
      </a>
      <Header language={language} setLanguage={setLanguage} t={t} />
      <main id="main-content">
        <Hero language={language} t={t} />
        <Services language={language} t={t} />
        <Skills language={language} t={t} />
        <Projects language={language} t={t} />
        <Certifications t={t} />
        <Hackathon language={language} t={t} />
        <Contact t={t} />
      </main>
      <Footer language={language} t={t} />
    </div>
  );
}

export default App;
