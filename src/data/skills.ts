import { PokemonType } from '@/lib/type-colors';

export interface SkillCategory {
  type: PokemonType;
  label: string;
  description: string;
  skills: Skill[];
}

export interface Skill {
  name: string;
  /** Battle-tested: used in an internship or shipped project */
  core?: boolean;
}

export const skillCategories: SkillCategory[] = [
  {
    type: 'dragon',
    label: 'Languages',
    description: 'Rare, powerful, the foundation of everything',
    skills: [
      { name: 'Python', core: true },
      { name: 'TypeScript', core: true },
      { name: 'JavaScript', core: true },
      { name: 'Java', core: true },
      { name: 'SQL', core: true },
      { name: 'HTML/CSS' },
      { name: 'C' },
    ],
  },
  {
    type: 'electric',
    label: 'Frontend',
    description: 'Fast, flashy, powers the UI',
    skills: [
      { name: 'React.js', core: true },
      { name: 'Next.js', core: true },
      { name: 'React Native', core: true },
    ],
  },
  {
    type: 'water',
    label: 'Backend',
    description: 'Deep, reliable, flows under pressure',
    skills: [
      { name: 'Flask', core: true },
      { name: 'FastAPI', core: true },
      { name: 'Node.js' },
      { name: 'Express.js' },
    ],
  },
  {
    type: 'fire',
    label: 'Databases',
    description: 'Hot data, blazing queries',
    skills: [
      { name: 'PostgreSQL', core: true },
      { name: 'DynamoDB', core: true },
      { name: 'Firebase', core: true },
      { name: 'Pinecone', core: true },
      { name: 'MongoDB' },
    ],
  },
  {
    type: 'steel',
    label: 'DevOps / Cloud',
    description: 'Tough, structured, battle-hardened',
    skills: [
      { name: 'AWS', core: true },
      { name: 'GCP', core: true },
      { name: 'Git', core: true },
      { name: 'CI/CD', core: true },
      { name: 'Postman' },
      { name: 'Jira' },
      { name: 'Jenkins' },
      { name: 'Claude Code' },
    ],
  },
  {
    type: 'psychic',
    label: 'AI / ML',
    description: 'Powerful mind, predictive insight',
    skills: [
      { name: 'RAG Pipelines', core: true },
      { name: 'TensorFlow', core: true },
      { name: 'OpenCV', core: true },
      { name: 'NumPy', core: true },
      { name: 'scikit-learn', core: true },
      { name: 'pandas' },
    ],
  },
];
