/**
 * Resume download configuration.
 *
 * Owner-supplied PDF: artifacts/portfolio/public/resume.pdf.
 * The path is relative to Vite's public directory, with no leading slash.
 * Setting it to null hides the download buttons and shows a pending note.
 */
export const RESUME_PATH: string | null = 'resume.pdf';

export function resolveResumeUrl(): string | null {
  if (!RESUME_PATH) return null;
  const base = import.meta.env.BASE_URL || '/';
  return `${base.endsWith('/') ? base : `${base}/`}${RESUME_PATH.replace(/^\/+/, '')}`;
}

export type ContactKind = 'email' | 'github' | 'linkedin' | 'phone' | 'whatsapp' | 'instagram';
export type ContactLink = { kind: ContactKind; href: string; display: string; external: boolean };

export const contactLinks: ContactLink[] = [
  { kind: 'email', href: 'mailto:motazaboassi@gmail.com', display: 'motazaboassi@gmail.com', external: false },
  { kind: 'github', href: 'https://github.com/MotazAboAssi', display: 'github.com/MotazAboAssi', external: true },
  { kind: 'linkedin', href: 'https://www.linkedin.com/in/motaz-aboassi-bbaab6319/', display: 'linkedin.com/in/motaz-aboassi-bbaab6319', external: true },
  { kind: 'phone', href: 'tel:+963998548589', display: '+963998548589', external: false },
  { kind: 'whatsapp', href: 'https://wa.me/963998548589', display: '+963998548589', external: true },
  { kind: 'instagram', href: 'https://www.instagram.com/motaz_abo_assi/', display: 'instagram.com/motaz_abo_assi', external: true },
];

export const EMAIL = 'motazaboassi@gmail.com';
