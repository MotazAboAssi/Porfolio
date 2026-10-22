import type { Localized } from '../i18n/translations';

export type Project = {
  id: string;
  name: Localized;
  tools: string[];
  type: Localized;
  role: { en: string; ar: null };
  description: null;
  architecture: null;
  repo: null;
};

export const projects: Project[] = [
  {
    id: 'apartment-rental',
    name: { en: 'Apartment Rental Platform', ar: 'منصة تأجير الشقق' },
    tools: ['Flutter', 'Dart', 'Cubit', 'REST API'],
    type: { en: 'University · Team of 4–5', ar: 'جامعي · فريق من 4–5' },
    role: { en: 'Built the mobile app with Flutter, and built the API integration. A teammate built the backend and the admin dashboard (web).', ar: null },
    description: null,
    architecture: null,
    repo: null,
  },
  {
    id: 'supply-chain',
    name: { en: 'Supply Chain Management System', ar: 'نظام إدارة سلسلة التوريد' },
    tools: ['Java', 'JavaFX', 'BST', 'AVL Tree', 'Priority Queue (Heap)'],
    type: { en: 'University · Algorithms course · No backend', ar: 'جامعي · مقرر الخوارزميات · بلا خلفية برمجية' },
    role: { en: 'Built the UI and the logic.', ar: null },
    description: null,
    architecture: null,
    repo: null,
  },
  {
    id: 'weather',
    name: { en: 'Dynamic Weather Web App', ar: 'تطبيق الطقس الديناميكي' },
    tools: ['Node.js', 'Express.js', 'Handlebars', 'HTML', 'CSS', 'REST APIs'],
    type: { en: 'University · Full-stack', ar: 'جامعي · تطوير متكامل' },
    role: { en: 'Built the backend and the UI.', ar: null },
    description: null,
    architecture: null,
    repo: null,
  },
  {
    id: 'billiards',
    name: { en: '3D Billiard Physics Simulator', ar: 'محاكي فيزياء البلياردو ثلاثي الأبعاد' },
    tools: ['JavaScript (ES6+)', 'Three.js', 'WebGL', 'HTML5 Canvas'],
    type: { en: 'University · Scientific computing course (2026) · Team', ar: 'جامعي · مقرر الحوسبة العلمية (2026) · فريق' },
    role: { en: 'Built the UI and the animation. Researched the physics concept. Teammates built the 3D model, animation models, and the presentation.', ar: null },
    description: null,
    architecture: null,
    repo: null,
  },
  {
    id: 'clinic',
    name: { en: 'Clinic Management System', ar: 'نظام إدارة العيادات' },
    tools: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Zustand', 'shadcn/ui'],
    type: { en: 'Team project · Market research to MVP', ar: 'مشروع جماعي · من دراسة السوق إلى النسخة الأولية' },
    role: { en: 'Built the secretary dashboard assistant, several engineering requirements, and the API. Teammates built the backend and the mobile app. I also helped complete the engineering requirements.', ar: null },
    description: null,
    architecture: null,
    repo: null,
  },
  {
    id: 'restaurant',
    name: { en: 'Restaurant Order Management', ar: 'إدارة طلبات المطعم' },
    tools: ['Java', 'Swing', 'Multithreading', 'File I/O', 'OOP'],
    type: { en: 'University · Team of up to 3 · No backend', ar: 'جامعي · فريق حتى 3 أشخاص · بلا خلفية برمجية' },
    role: { en: 'Built the UI. A teammate improved the concept and built the logic.', ar: null },
    description: null,
    architecture: null,
    repo: null,
  },
];
