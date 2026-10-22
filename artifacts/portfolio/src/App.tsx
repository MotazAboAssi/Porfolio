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
      <a
        className="skip-link"
        href="#main-content"
        onClick={(event) => {
          event.preventDefault();
          const main = document.getElementById('main-content');
          if (!main) return;
          main.focus({ preventScroll: true });
          window.history.replaceState(window.history.state, '', '#main-content');
          // Native anchor scrolling can keep a tall focused main near the current
          // viewport. This single-page main starts immediately after the header.
          window.scrollTo({ top: 0, behavior: 'instant' });
        }}
      >
        {t('skipLink')}
      </a>
      <Header language={language} setLanguage={setLanguage} t={t} />
      <main id="main-content" tabIndex={-1}>
        <Hero language={language} t={t} />
        <Services language={language} t={t} />
        <Skills language={language} t={t} />
        <Projects language={language} t={t} />
        <Certifications language={language} t={t} />
        <Hackathon language={language} t={t} />
        <Contact language={language} t={t} />
      </main>
      <Footer t={t} />
    </div>
  );
}

export default App;
