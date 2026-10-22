export type InnovationEntry = { id: string; title: string; kind: 'hackathon' | 'workshop'; date: string; detail: string; credential: string };

export const hackathons: InnovationEntry[] = [
  { id: 'environmental-hackathon', title: 'بيئة تبتكر', kind: 'hackathon', date: 'Jul 2026', detail: '3 days · AI/IoT prototype for Syrian environmental challenges', credential: 'CRT-2026-5WQBWK' },
  { id: 'iot-workshop', title: 'IoT Systems & Smart Environmental Networks', kind: 'workshop', date: 'Jun 2026', detail: 'IBTKRGO × RECO', credential: 'CRT-2026-XCD5T7' },
  { id: 'environmental-ai-workshop', title: 'AI for Environmental Applications', kind: 'workshop', date: 'Jun 2026', detail: 'IBTKRGO × RECO', credential: 'CRT-2026-B676SW' },
];
