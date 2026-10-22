import type { Localized } from '../i18n/translations';

export type Certification = {
  title: Localized;
  issuer: Localized;
  date: Localized;
  isoDate: string;
  score?: string;
  credentialId?: string;
};

export const certifications: Certification[] = [
  { title: { en: 'Full Stack Web Development (MERN)', ar: 'تطوير الويب المتكامل (MERN)' }, issuer: { en: 'SEF Academy', ar: 'أكاديمية SEF' }, date: { en: 'Feb 2026', ar: 'شباط 2026' }, isoDate: '2026-02', score: '97.05%', credentialId: '284222000616' },
  { title: { en: 'Front-End Web Development (React.js)', ar: 'تطوير واجهات الويب الأمامية (React.js)' }, issuer: { en: 'SEF Academy', ar: 'أكاديمية SEF' }, date: { en: 'Dec 2024', ar: 'كانون الأول 2024' }, isoDate: '2024-12', score: '96.73%' },
  { title: { en: 'Back-End Web Development (Node.js)', ar: 'تطوير الواجهات الخلفية للويب (Node.js)' }, issuer: { en: 'SEF Academy', ar: 'أكاديمية SEF' }, date: { en: 'Feb 2026', ar: 'شباط 2026' }, isoDate: '2026-02', score: '97.37%' },
  { title: { en: 'HTML, CSS & JavaScript for Web Developers', ar: 'HTML وCSS وJavaScript لمطوّري الويب' }, issuer: { en: 'Johns Hopkins University / Coursera', ar: 'جامعة جونز هوبكنز / Coursera' }, date: { en: 'Feb 2026', ar: 'شباط 2026' }, isoDate: '2026-02', credentialId: 'BDA2I089H4BV' },
  { title: { en: 'Python Data Structures', ar: 'هياكل البيانات بلغة Python' }, issuer: { en: 'University of Michigan / Coursera', ar: 'جامعة ميشيغان / Coursera' }, date: { en: 'Jul 2026', ar: 'تموز 2026' }, isoDate: '2026-07', credentialId: 'KN3KU599845D' },
  { title: { en: 'Programming for Everybody (Python)', ar: 'البرمجة للجميع (Python)' }, issuer: { en: 'University of Michigan / Coursera', ar: 'جامعة ميشيغان / Coursera' }, date: { en: 'Jul 2026', ar: 'تموز 2026' }, isoDate: '2026-07', credentialId: 'CTTVPXASYWNN' },
];
