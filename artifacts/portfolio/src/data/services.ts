import type { Localized } from '../i18n/translations';

export type Service = { id: string; title: Localized; description: Localized };

export const services: Service[] = [
  {
    id: 'business-web',
    title: { en: 'Business web applications', ar: 'تطبيقات ويب للأعمال' },
    description: { en: 'MERN applications for booking, inventory, and client management.', ar: 'تطبيقات MERN للحجوزات والمخزون وإدارة العملاء.' },
  },
  {
    id: 'dashboards',
    title: { en: 'Admin dashboards', ar: 'لوحات تحكم إدارية' },
    description: { en: 'React and TypeScript interfaces with type-safe state and clear data views.', ar: 'واجهات React وTypeScript بحالة آمنة الأنواع وعرض واضح للبيانات.' },
  },
  {
    id: 'apis',
    title: { en: 'REST APIs and backends', ar: 'واجهات REST والخلفيات البرمجية' },
    description: { en: 'Node.js and Express with JWT authentication, MVC structure, and MongoDB or SQL.', ar: 'Node.js وExpress مع مصادقة JWT وبنية MVC وMongoDB أو SQL.' },
  },
  {
    id: 'mobile',
    title: { en: 'Mobile applications', ar: 'تطبيقات الموبايل' },
    description: { en: 'Flutter and Dart apps using Cubit, connected to REST APIs.', ar: 'تطبيقات Flutter وDart باستخدام Cubit ومتّصلة بواجهات REST API.' },
  },
  {
    id: 'interactive',
    title: { en: 'Interactive web experiences', ar: 'تجارب ويب تفاعلية' },
    description: { en: 'Canvas and Three.js experiences for real-time simulations and visual tools.', ar: 'تجارب Canvas وThree.js للمحاكاة الفورية والأدوات المرئية.' },
  },
  {
    id: 'algorithms',
    title: { en: 'Algorithm and data-structure tools', ar: 'أدوات الخوارزميات وهياكل البيانات' },
    description: { en: 'Java and C++ tools for scheduling, ranking, and inventory logic.', ar: 'أدوات Java وC++ لمنطق الجدولة والترتيب وإدارة المخزون.' },
  },
];
