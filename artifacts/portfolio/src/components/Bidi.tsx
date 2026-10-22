import type { Language } from '../i18n/translations';

/** Wraps Latin/technical runs inside Arabic text in <bdi dir="ltr"> so they render in correct order. */
const LATIN_RUN = /(\(?[A-Za-z0-9][A-Za-z0-9.+#/&×()–\-_%@:]*(?:\s+[A-Za-z0-9.+#/&×()–\-_%@:]+)*)/g;

export function Bidi({ text, language }: { text: string; language: Language }) {
  if (language !== 'ar') return <>{text}</>;
  const parts = text.split(LATIN_RUN);
  return (
    <>
      {parts.map((part, i) => (i % 2 === 1 ? <bdi dir="ltr" key={i}>{part}</bdi> : part))}
    </>
  );
}

export function Ltr({ children }: { children: string }) {
  return <bdi dir="ltr">{children}</bdi>;
}
