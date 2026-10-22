import { useEffect, useRef, useState } from 'react';
import { contactLinks, EMAIL, resolveResumeUrl, type ContactKind } from '../config/site';
import type { Language, T, TranslationKey } from '../i18n/translations';
import { Bidi } from './Bidi';
import { ArrowIcon, ContactIcon, CopyIcon, DownloadIcon } from './Icons';

type Props = { language: Language; t: T };
const labelKey: Record<ContactKind, TranslationKey> = { email: 'emailLabel', github: 'githubLabel', linkedin: 'linkedinLabel' };

async function copyText(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // fall through to legacy path
  }
  const area = document.createElement('textarea');
  const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
  try {
    area.value = text;
    area.setAttribute('readonly', '');
    area.style.position = 'fixed';
    area.style.opacity = '0';
    document.body.appendChild(area);
    area.focus({ preventScroll: true });
    area.select();
    const ok = document.execCommand('copy');
    return ok;
  } catch {
    return false;
  } finally {
    area.remove();
    previousFocus?.focus({ preventScroll: true });
  }
}

export function Contact({ language, t }: Props) {
  const [status, setStatus] = useState<'idle' | 'copied' | 'failed'>('idle');
  const timer = useRef<number | undefined>(undefined);
  const resumeUrl = resolveResumeUrl();

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const onCopy = async () => {
    const ok = await copyText(EMAIL);
    setStatus(ok ? 'copied' : 'failed');
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setStatus('idle'), 4000);
  };

  return (
    <section className="section contact" id="contact" aria-labelledby="contact-title">
      <div className="container reveal contact-grid">
        <header className="contact-head">
          <span className="section-num" dir="ltr">06</span>
          <h2 id="contact-title">{t('contactTitle')}</h2>
          <p><Bidi text={t('contactNote')} language={language} /></p>
          {resumeUrl ? (
            <a className="button" href={resumeUrl} download><DownloadIcon /> {t('downloadResume')}</a>
          ) : (
            <p className="resume-note"><Bidi text={t('resumePending')} language={language} /></p>
          )}
        </header>
        <ul className="contact-list">
          {contactLinks.map((link) => (
            <li className="contact-item" key={link.kind}>
              <a
                className="contact-link"
                href={link.href}
                {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                <span className="contact-icon"><ContactIcon kind={link.kind} /></span>
                <span className="contact-text">
                  <span className="contact-name">{t(labelKey[link.kind])}</span>
                  <span className="contact-value"><bdi dir="ltr">{link.display}</bdi></span>
                </span>
                <ArrowIcon className="contact-arrow flip-rtl" />
                {link.external && <span className="sr-only"> {t('opensNewTab')}</span>}
              </a>
              {link.kind === 'email' && (
                <button type="button" className="copy-button" onClick={onCopy}>
                  <CopyIcon /> {t('copyEmail')}
                </button>
              )}
            </li>
          ))}
        </ul>
        <p className={`copy-status ${status}`} role="status" aria-live="polite">
          {status === 'copied' ? t('copied') : status === 'failed' ? t('copyFailed') : ''}
        </p>
      </div>
    </section>
  );
}
