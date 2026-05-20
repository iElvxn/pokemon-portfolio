import { PokemonType } from '@/lib/type-colors';

export interface SkillCategory {
  type: PokemonType;
  label: string;
  description: string;
  skills: Skill[];
}

export interface Skill {
  name: string;
  value: number;
}

export const skillCategories: SkillCategory[] = [
  {
    type: 'electric',
    label: 'Frontend',
    description: 'Fast, flashy, powers the UI',
    skills: [
      { name: 'React / Next.js', value: 92 },
      { name: 'TypeScript', value: 90 },
      { name: 'React Native', value: 82 },
      { name: 'HTML / CSS', value: 88 },
      { name: 'Tailwind CSS', value: 85 },
    ],
  },
  {
    type: 'water',
    label: 'Backend',
    description: 'Deep, reliable, flows under pressure',
    skills: [
      { name: 'Python / Flask', value: 90 },
      { name: 'FastAPI', value: 85 },
      { name: 'Node.js / Express', value: 80 },
      { name: 'REST APIs', value: 92 },
      { name: 'Microservices', value: 82 },
    ],
  },
  {
    type: 'fire',
    label: 'Databases',
    description: 'Hot data, blazing queries',
    skills: [
      { name: 'DynamoDB', value: 82 },
      { name: 'Firebase', value: 80 },
      { name: 'PostgreSQL', value: 78 },
      { name: 'MongoDB', value: 75 },
      { name: 'SQL', value: 82 },
    ],
  },
  {
    type: 'steel',
    label: 'DevOps / Cloud',
    description: 'Tough, structured, battle-hardened',
    skills: [
      { name: 'AWS (Lambda / S3)', value: 85 },
      { name: 'GCP', value: 78 },
      { name: 'CI/CD', value: 82 },
      { name: 'Git', value: 92 },
      { name: 'Docker', value: 70 },
    ],
  },
  {
    type: 'ghost',
    label: 'CS Fundamentals',
    description: 'Mysterious depth, invisible power',
    skills: [
      { name: 'Data Structures', value: 94 },
      { name: 'Algorithms', value: 92 },
      { name: 'System Design', value: 82 },
      { name: 'OOP / Patterns', value: 80 },
    ],
  },
  {
    type: 'psychic',
    label: 'AI / ML',
    description: 'Powerful mind, predictive insight',
    skills: [
      { name: 'RAG Pipelines', value: 85 },
      { name: 'TensorFlow / CNN', value: 82 },
      { name: 'NLP / LLMs', value: 80 },
      { name: 'scikit-learn', value: 78 },
      { name: 'OpenCV', value: 75 },
    ],
  },
];
