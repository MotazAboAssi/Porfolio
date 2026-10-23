import type { Localized } from '../i18n/translations';

export type Project = {
  id: string;
  name: Localized;
  tools: string[];
  type: Localized | null;
  role: { en: string; ar: string | null };
  description: string | null;
  architecture: null;
  repo: string | null;
  demo?: string;
};

export const projects: Project[] = [
  {
    id: 'apartment-rental',
    name: { en: 'Apartment Rental Platform', ar: 'منصة تأجير الشقق' },
    tools: ['Flutter', 'Dart', 'Cubit', 'REST API'],
    type: { en: 'University · Team of 4–5', ar: 'جامعي · فريق من 4–5' },
    role: { en: 'Built the mobile app with Flutter, and built the API integration. A teammate built the backend and the admin dashboard (web).', ar: 'نفّذت تطبيق الهاتف باستخدام Flutter، وطوّرت تكامل التطبيق مع واجهة برمجة التطبيقات (API). تولّى أحد أعضاء الفريق تطوير الواجهة الخلفية ولوحة الإدارة على الويب.' },
    description: null,
    architecture: null,
    repo: 'https://github.com/MotazAboAssi/booking_mobile',
  },
  {
    id: 'supply-chain',
    name: { en: 'Supply Chain Management System', ar: 'نظام إدارة سلسلة التوريد' },
    tools: ['Java', 'JavaFX', 'BST', 'AVL Tree', 'Priority Queue (Heap)'],
    type: { en: 'University · Algorithms course · No backend', ar: 'جامعي · مقرر الخوارزميات · بلا خلفية برمجية' },
    role: { en: 'Built the UI and the logic.', ar: 'نفّذت واجهة المستخدم والمنطق البرمجي للنظام.' },
    description: null,
    architecture: null,
    repo: 'https://github.com/MotazAboAssi/Algorithms-and-Data-Structures-2-Project',
  },
  {
    id: 'weather',
    name: { en: 'Dynamic Weather Web App', ar: 'تطبيق الطقس الديناميكي' },
    tools: ['Node.js', 'Express.js', 'Handlebars', 'HTML', 'CSS', 'REST APIs'],
    type: { en: 'University · Full-stack', ar: 'جامعي · تطوير متكامل' },
    role: { en: 'Built the backend and the UI.', ar: 'طوّرت الواجهة الخلفية وواجهة المستخدم للتطبيق.' },
    description: null,
    architecture: null,
    repo: 'https://github.com/MotazAboAssi/express_country_weather_app',
  },
  {
    id: 'billiards',
    name: { en: '3D Billiard Physics Simulator', ar: 'محاكي فيزياء البلياردو ثلاثي الأبعاد' },
    tools: ['JavaScript (ES6+)', 'Three.js', 'WebGL', 'HTML5 Canvas'],
    type: { en: 'University · Scientific computing course (2026) · Team', ar: 'جامعي · مقرر الحوسبة العلمية (2026) · فريق' },
    role: { en: 'Built the UI and the animation. Researched the physics concept. Teammates built the 3D model, animation models, and the presentation.', ar: 'نفّذت واجهة المستخدم والرسوم المتحركة، وبحثت في المفاهيم الفيزيائية للمحاكاة. تولّى زملائي إعداد النموذج ثلاثي الأبعاد ونماذج الحركة والعرض التقديمي.' },
    description: null,
    architecture: null,
    repo: 'https://github.com/MotazAboAssi/Billiard_Ball_Physics',
    demo: 'https://motazaboassi.github.io/Billiard_Ball_Physics/',
  },
  {
    id: 'clinic',
    name: { en: 'Clinic Management System', ar: 'نظام إدارة العيادات' },
    tools: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Zustand', 'shadcn/ui'],
    type: { en: 'Team project · Market research to MVP', ar: 'مشروع جماعي · من دراسة السوق إلى النسخة الأولية' },
    role: { en: 'Built the secretary dashboard assistant, several engineering requirements, and the API. Teammates built the backend and the mobile app. I also helped complete the engineering requirements.', ar: 'طوّرت مساعد لوحة تحكم السكرتارية، وأسهمت في إعداد عدد من المتطلبات الهندسية وواجهة برمجة التطبيقات (API). تولّى زملائي تطوير الواجهة الخلفية وتطبيق الهاتف، كما ساعدت في استكمال المتطلبات الهندسية.' },
    description: null,
    architecture: null,
    repo: 'https://github.com/MotazAboAssi/CMS_Project',
    demo: 'https://motazaboassi.github.io/CMS_Project/',
  },
  {
    id: 'communication-skills',
    name: { en: 'Communication Skills Course Platform', ar: 'منصة دورة مهارات التواصل' },
    tools: [],
    type: null,
    role: { en: 'I only built the UI, logic, and animation.', ar: 'نفّذت واجهة المستخدم والمنطق البرمجي والرسوم المتحركة.' },
    description: 'I only built the UI, logic, and animation.',
    architecture: null,
    repo: 'https://github.com/MotazAboAssi/communication-skills-course',
    demo: 'https://motazaboassi.github.io/communication-skills-course/',
  },
];
