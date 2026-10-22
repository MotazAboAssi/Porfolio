import { useEffect, useState } from 'react';

export function useTypewriter(roles: readonly string[]) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [visibleText, setVisibleText] = useState(roles[0] ?? '');

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || roles.length < 2) {
      setVisibleText(roles[0] ?? '');
      return;
    }
    let index = 0;
    let cursor = roles[0] ?? '';
    let deleting = true;
    setVisibleText(cursor);
    const timer = window.setInterval(() => {
      const nextRole = roles[index] ?? '';
      cursor = deleting ? cursor.slice(0, -1) : nextRole.slice(0, cursor.length + 1);
      setVisibleText(cursor);
      if (deleting && cursor.length === 0) {
        index = (index + 1) % roles.length;
        setRoleIndex(index);
        deleting = false;
      } else if (!deleting && cursor === (roles[index] ?? '')) {
        deleting = true;
      }
    }, 90);
    return () => window.clearInterval(timer);
  }, [roles]);

  return { visibleText, roleIndex };
}
