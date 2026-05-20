import { PokemonType } from '@/lib/type-colors';

export interface Experience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string | 'Present';
  location: string;
  description: string;
  achievements: string[];
  techStack: PokemonType[];
  techLabels: string[];
  levelGained: string;
  badgeColor: string;
}
