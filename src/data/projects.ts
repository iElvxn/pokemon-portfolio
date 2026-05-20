import { Project } from '@/types/project';

export const projects: Project[] = [
  {
    id: 'proj-1',
    name: 'Job Match RAG',
    subtitle: 'Hybrid RAG Pipeline for Job Matching',
    description:
      'Hybrid RAG pipeline for automated job-to-candidate matching — BM25 + dense embeddings with Reciprocal Rank Fusion, improving RAGAS faithfulness by 35%.',
    longDescription:
      'Architected a hybrid RAG pipeline combining BM25 sparse retrieval and dense embeddings with Reciprocal Rank Fusion and Cohere reranking. Prevented LLM hallucinations via skill extraction and evidence-span citations, achieving 85% skill recall. Conducted a 12-condition ablation study achieving 2x BERTScore F1 (79% vs. 39%) over a no-RAG baseline. Deployed with FastAPI, Next.js, and Pinecone.',
    type: 'psychic',
    secondaryType: 'ghost',
    hp: 460,
    techStack: ['Python', 'FastAPI', 'Pinecone', 'Next.js', 'GPT-4', 'Cohere', 'RAGAS'],
    githubUrl: 'https://github.com/iElvxn',
    pokemonSprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/65.png',
    pokemonName: 'Alakazam',
    rarity: 'holo-rare',
    featured: true,
  },
  {
    id: 'proj-2',
    name: 'Study Kitty',
    subtitle: 'Gamified Mobile Productivity App',
    description:
      'Full-stack mobile productivity app with gamified focus sessions using React Native — 1000+ users. Cloud-native architecture on AWS Lambda, API Gateway, and DynamoDB.',
    longDescription:
      'Developed a fullstack mobile productivity app with gamified focus sessions using React Native with 1000+ users. Built cloud-native microservice architecture using AWS API Gateway, Lambda, and DynamoDB. Utilized local caching for efficient dataflow, reducing infrastructure costs by 30%. Implemented secure auth integrating Clerk with AWS Lambda and REST API Gateway authorizers for JWT verification.',
    type: 'electric',
    secondaryType: 'water',
    hp: 420,
    techStack: ['TypeScript', 'React Native', 'AWS Lambda', 'DynamoDB', 'Clerk', 'Expo'],
    githubUrl: 'https://github.com/iElvxn',
    pokemonSprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/52.png',
    pokemonName: 'Meowth',
    rarity: 'rare',
    featured: false,
  },
  {
    id: 'proj-3',
    name: 'Drowsiness CNN',
    subtitle: 'Real-time Driver Safety Detection',
    description:
      'Deep learning CNN for real-time driver drowsiness detection using TensorFlow and MobileNetV2, achieving 98% accuracy with OpenCV eye movement monitoring.',
    longDescription:
      'Developed and trained a deep learning CNN using TensorFlow with MobileNetV2 architecture, achieving 98% accuracy via data augmentation and regularization. Utilized OpenCV to monitor eye movements in real time and trigger safety alerts for detected drowsiness.',
    type: 'psychic',
    secondaryType: 'fire',
    hp: 380,
    techStack: ['Python', 'TensorFlow', 'OpenCV', 'MobileNetV2', 'NumPy', 'Scikit-learn'],
    githubUrl: 'https://github.com/iElvxn',
    pokemonSprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/97.png',
    pokemonName: 'Hypno',
    rarity: 'rare',
    featured: false,
  },
  {
    id: 'proj-4',
    name: 'This Portfolio',
    subtitle: 'Pokemon-Themed SWE Portfolio',
    description:
      'A full Pokemon FireRed/LeafGreen GBA emulator aesthetic built with Next.js 15, TypeScript, Tailwind v4, and Framer Motion. Scroll-snap sections, pixel UI, and the works.',
    longDescription:
      'Designed and built from scratch with a strict GBA game emulator aesthetic. Features scroll-snap sections, animated HP bars, typewriter dialogue boxes, a START menu overlay, battle transitions, and a full pixel font system using Press Start 2P + VT323.',
    type: 'ghost',
    secondaryType: 'electric',
    hp: 350,
    techStack: ['Next.js 15', 'TypeScript', 'Tailwind v4', 'Framer Motion', 'PokeAPI'],
    githubUrl: 'https://github.com/iElvxn',
    pokemonSprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/94.png',
    pokemonName: 'Gengar',
    rarity: 'uncommon',
    featured: false,
  },
];
