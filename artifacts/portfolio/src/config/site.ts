/**
 * Resume download configuration.
 *
 * No resume PDF exists yet. To enable the "Download Resume" buttons:
 *   1. Place the owner-supplied file at  artifacts/portfolio/public/resume.pdf
 *   2. Set RESUME_PATH below to 'resume.pdf' (relative, no leading slash).
 * While null, no download button is rendered and a "pending" note is shown.
 */
export const RESUME_PATH: string | null = null;

export function resolveResumeUrl(): string | null {
  if (!RESUME_PATH) return null;
  const base = import.meta.env.BASE_URL || '/';
  return `${base.endsWith('/') ? base : `${base}/`}${RESUME_PATH.replace(/^\/+/, '')}`;
}

export type ContactKind = 'email' | 'github' | 'linkedin';
export type ContactLink = { kind: ContactKind; href: string; display: string; external: boolean };

export const contactLinks: ContactLink[] = [
  { kind: 'email', href: 'mailto:motazaboassi@gmail.com', display: 'motazaboassi@gmail.com', external: false },
  { kind: 'github', href: 'https://github.com/MotazAboAssi', display: 'github.com/MotazAboAssi', external: true },
  { kind: 'linkedin', href: 'https://www.linkedin.com/in/motaz-aboassi-bbaab6319/', display: 'linkedin.com/in/motaz-aboassi-bbaab6319', external: true },
];

export const EMAIL = 'motazaboassi@gmail.com';
