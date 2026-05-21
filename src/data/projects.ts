import { Project } from '@/types/project';

export const projects: Project[] = [
  {
    id: 'proj-1',
    name: 'Study Kitty',
    subtitle: 'Gamified Mobile Productivity App',
    description:
      'Full-stack mobile productivity app with gamified focus sessions — 1000+ active users. Built cloud-native microservice architecture on AWS API Gateway, Lambda, DynamoDB, and S3. Local caching strategy cut infrastructure costs by 30% and accelerated API response times. Secured all endpoints with Clerk + AWS Lambda authorizers for JWT verification.',
    longDescription:
      'Built a gamified productivity app in React Native with 1000+ active users. Designed cloud-native microservice architecture on AWS API Gateway, Lambda, DynamoDB, and S3. Local caching strategy reduced infrastructure costs by 30% and accelerated API response times. Secured all endpoints by integrating Clerk with AWS Lambda authorizers for JWT verification.',
    type: 'ghost',
    secondaryType: 'poison',
    hp: 420,
    techStack: ['TypeScript', 'React Native', 'AWS Lambda', 'API Gateway', 'DynamoDB', 'S3', 'Clerk', 'Expo'],
    achievements: [
      'Developed full-stack mobile app with gamified focus sessions — 1000+ active users on React Native.',
      'Built cloud-native microservice architecture on AWS API Gateway, Lambda, DynamoDB, and S3.',
      'Reduced infrastructure costs by 30% via local caching strategy, accelerating API response times.',
      'Secured all endpoints integrating Clerk with AWS Lambda authorizers for JWT verification.',
    ],
    githubUrl: 'https://github.com/iElvxn',
    pokemonSprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/94.png',
    pokemonName: 'Gengar',
    rarity: 'uncommon',
    featured: false,
  },
  {
    id: 'proj-2',
    name: 'Job Match RAG',
    subtitle: 'Hybrid RAG Pipeline for Job Matching',
    description:
      'Hybrid RAG pipeline for automated job-to-candidate matching — BM25 sparse retrieval + dense embeddings fused with Reciprocal Rank Fusion and Cohere reranking, improving RAGAS faithfulness by 35%. Eliminated LLM hallucinations via skill extraction and evidence-span citations, achieving 85% skill recall. 12-condition ablation study confirmed 2× BERTScore F1 (79% vs. 39% over no-RAG baseline). Deployed end-to-end with FastAPI, Next.js, and Pinecone.',
    longDescription:
      'Architected a hybrid retrieval pipeline combining BM25 sparse retrieval, dense embeddings, Reciprocal Rank Fusion, and Cohere reranking for automated job-to-candidate matching. Eliminated LLM hallucinations via evidence-span citations and structured skill extraction, achieving 85% skill recall. A rigorous 12-condition ablation study confirmed a 2× BERTScore F1 improvement (79% vs. 39% over no-RAG baseline). Deployed end-to-end with FastAPI, Next.js, TypeScript, and Pinecone.',
    type: 'electric',
    secondaryType: 'dragon',
    hp: 460,
    techStack: ['Python', 'FastAPI', 'Pinecone', 'Next.js', 'TypeScript', 'GPT-4', 'Cohere', 'RAGAS'],
    achievements: [
      'Architected hybrid RAG pipeline combining BM25 + dense embeddings with Reciprocal Rank Fusion and Cohere reranking, improving RAGAS faithfulness by 35%.',
      'Eliminated LLM hallucinations via skill extraction and evidence-span citations, achieving 85% skill recall.',
      'Conducted 12-condition ablation study — 2× BERTScore F1 (79% vs. 39%) over no-RAG baseline.',
      'Deployed full pipeline end-to-end with FastAPI, Next.js, and Pinecone.',
    ],
    githubUrl: 'https://github.com/iElvxn',
    pokemonSprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/644.png',
    pokemonName: 'Zekrom',
    rarity: 'holo-rare',
    featured: true,
  },
  {
    id: 'proj-3',
    name: 'Driver Drowsiness Detection',
    subtitle: 'Real-time Driver Safety CNN',
    description:
      'Deep learning CNN for real-time driver drowsiness detection — MobileNetV2 architecture trained with TensorFlow achieved 98% accuracy via data augmentation and regularization. Integrated OpenCV for live eye-movement tracking with instant safety alerts on detected drowsiness.',
    longDescription:
      'Trained a MobileNetV2-based CNN in TensorFlow for real-time driver drowsiness detection, achieving 98% accuracy through systematic data augmentation and regularization techniques. Integrated OpenCV for live eye-movement tracking with sub-second alert latency. Evaluated model performance with Scikit-learn and visualized training curves with Matplotlib.',
    type: 'normal',
    secondaryType: undefined,
    hp: 380,
    techStack: ['Python', 'TensorFlow', 'MobileNetV2', 'OpenCV', 'NumPy', 'Matplotlib', 'Scikit-learn'],
    achievements: [
      'Trained MobileNetV2 CNN in TensorFlow for real-time drowsiness detection — 98% accuracy via data augmentation and regularization.',
      'Integrated OpenCV for live eye-movement tracking with instant safety alerts on detected drowsiness.',
    ],
    githubUrl: 'https://github.com/iElvxn',
    pokemonSprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/143.png',
    pokemonName: 'Snorlax',
    rarity: 'rare',
    featured: false,
  },
];
