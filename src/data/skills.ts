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
    type: 'dragon',
    label: 'Languages',
    description: 'Rare, powerful, the foundation of everything',
    skills: [
      { name: 'Python', value: 92 },
      { name: 'TypeScript', value: 80 },
      { name: 'JavaScript', value: 85 },
      { name: 'Java', value: 64 },
      { name: 'SQL', value: 65 },
      { name: 'HTML', value: 80 },
      { name: 'CSS', value: 74 },
      { name: 'C', value: 58 },
    ],
  },
  {
    type: 'electric',
    label: 'Frontend',
    description: 'Fast, flashy, powers the UI',
    skills: [
      { name: 'React.js', value: 72 },
      { name: 'Next.js', value: 64 },
      { name: 'React Native', value: 63 },
    ],
  },
  {
    type: 'water',
    label: 'Backend',
    description: 'Deep, reliable, flows under pressure',
    skills: [
      { name: 'Flask', value: 76 },
      { name: 'FastAPI', value: 80 },
      { name: 'Node.js', value: 65 },
      { name: 'Express.js', value: 73 },
      { name: 'Springboot', value: 57 },
    ],
  },
  {
    type: 'fire',
    label: 'Databases',
    description: 'Hot data, blazing queries',
    skills: [
      { name: 'Firebase', value: 84 },
      { name: 'PostgreSQL', value: 51 },
      { name: 'MongoDB', value: 82 },
      { name: 'DynamoDB', value: 73 },
      { name: 'Pinecone', value: 52 },
    ],
  },
  {
    type: 'steel',
    label: 'DevOps / Cloud',
    description: 'Tough, structured, battle-hardened',
    skills: [
      { name: 'AWS', value: 75 },
      { name: 'GCP', value: 68 },
      { name: 'Git', value: 82 },
      { name: 'Postman', value: 67 },
    ],
  },
  {
    type: 'psychic',
    label: 'AI / ML',
    description: 'Powerful mind, predictive insight',
    skills: [
      { name: 'TensorFlow', value: 62 },
      { name: 'pandas', value: 64 },
      { name: 'NumPy', value: 80 },
      { name: 'RAG Pipelines', value: 75 },
      { name: 'OpenCV', value: 61 },
      { name: 'scikit-learn', value: 61 },
    ],
  },
];
