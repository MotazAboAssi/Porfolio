import type { Localized } from '../i18n/translations';

export type SkillGroup = { id: string; label: Localized; skills: string[] };

export const skillGroups: SkillGroup[] = [
  { id: 'frontend', label: { en: 'Frontend', ar: 'الواجهات الأمامية' }, skills: ['React.js', 'TypeScript', 'Tailwind CSS', 'Vite', 'HTML5', 'CSS3', 'JavaScript ES6+'] },
  { id: 'mobile', label: { en: 'Mobile', ar: 'الموبايل' }, skills: ['Flutter', 'Dart', 'Cubit'] },
  { id: 'backend', label: { en: 'Backend', ar: 'الخلفيات البرمجية' }, skills: ['Node.js', 'Express.js', 'RESTful APIs', 'JWT Auth', 'MVC Pattern', 'Handlebars'] },
  { id: 'data-tools', label: { en: 'Database & tools', ar: 'قواعد البيانات والأدوات' }, skills: ['MongoDB', 'SQL', 'Git', 'GitHub Actions', 'Linux (Kubuntu)', 'CI/CD'] },
  { id: 'foundations', label: { en: 'CS foundations & architecture', ar: 'أساسيات الحوسبة والبنية' }, skills: ['OOP', 'Data Structures', 'Algorithms', 'Multithreading', 'BST/AVL Trees', 'Java', 'C++', 'JavaFX', 'Swing', 'MERN Stack', 'Modular Architecture', 'Zustand', 'shadcn/ui', 'Three.js/WebGL'] },
];
