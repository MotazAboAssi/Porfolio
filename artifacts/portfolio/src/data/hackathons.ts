import type { Localized } from '../i18n/translations';

export type InnovationEntry = {
  id: string;
  title: Localized;
  kind: 'hackathon' | 'workshop';
  date: Localized;
  isoDate: string;
  detail: Localized;
  credential: string;
  image?: string;
  imageSize?: [number, number];
  certificateFiles?: string[];
  credentialUrl?: string;
};

export const hackathons: InnovationEntry[] = [
  {
    id: 'environmental-hackathon',
    title: { en: 'بيئة تبتكر', ar: 'بيئة تبتكر' },
    kind: 'hackathon',
    date: { en: 'Jul 2026', ar: 'تموز 2026' },
    isoDate: '2026-07',
    detail: { en: '3 days · AI/IoT prototype for Syrian environmental challenges', ar: '3 أيام · نموذج أولي AI/IoT لتحديات البيئة في سوريا' },
    credential: 'CRT-2026-5WQBWK',
    image: 'hackathons/هاكاثون بيئة تبتكر للإبتكار البيئي.jpg',
    imageSize: [1200, 870],
    certificateFiles: ['hackathons/هاكاثون بيئة تبتكر.pdf'],
    credentialUrl: 'https://limvix.com/verify/CRT-2026-5WQBWK',
  },
  {
    id: 'iot-workshop',
    title: { en: 'IoT Systems & Smart Environmental Networks', ar: 'أنظمة IoT والشبكات البيئية الذكية' },
    kind: 'workshop',
    date: { en: 'Jun 2026', ar: 'حزيران 2026' },
    isoDate: '2026-06',
    detail: { en: 'IBTKRGO × RECO', ar: 'IBTKRGO × RECO' },
    credential: 'CRT-2026-XCD5T7',
    image: 'hackathons/IOT.jpg',
    imageSize: [1007, 758],
    certificateFiles: ['hackathons/IOT Certificate.pdf'],
    credentialUrl: 'https://limvix.com/verify/CRT-2026-XCD5T7',
  },
  {
    id: 'environmental-ai-workshop',
    title: { en: 'AI for Environmental Applications', ar: 'الذكاء الاصطناعي للتطبيقات البيئية' },
    kind: 'workshop',
    date: { en: 'Jun 2026', ar: 'حزيران 2026' },
    isoDate: '2026-06',
    detail: { en: 'IBTKRGO × RECO', ar: 'IBTKRGO × RECO' },
    credential: 'CRT-2026-B676SW',
    image: 'hackathons/الذكاء الإصطناعي و تطبيقاته البيئيه.jpg',
    imageSize: [1007, 758],
    certificateFiles: ['hackathons/ورشة ذكاء إصطناعي.pdf'],
    credentialUrl: 'https://limvix.com/verify/CRT-2026-B676SW',
  },
];
