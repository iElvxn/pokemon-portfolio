import { Project } from '@/types/project';

export const projects: Project[] = [
  {
    id: 'proj-1',
    name: 'Study Kitty',
    subtitle: 'Gamified Mobile Productivity App',
    description:
      'Full-stack mobile productivity app with gamified focus sessions — 1000+ users. Built cloud-native microservice architecture on AWS API Gateway, Lambda, and DynamoDB. Local caching cut infrastructure costs by 30% and accelerated responsiveness. Secured with Clerk + AWS Lambda and REST API Gateway authorizers for JWT verification.',
    longDescription:
      'Developed a fullstack mobile productivity app with gamified focus sessions using React Native with 1000+ users. Built a cloud-native microservice architecture using AWS API Gateway, Lambda, and DynamoDB. Utilized local caching for efficient dataflow, reducing infrastructure costs by 30% and accelerating responsiveness. Implemented secure authentication by integrating Clerk with AWS Lambda and REST API Gateway authorizers, securely verifying JWTs, resulting in protected user data and securing mobile API endpoints.',
    type: 'ghost',
    secondaryType: 'poison',
    hp: 420,
    techStack: ['TypeScript', 'React Native', 'AWS API Gateway', 'Lambda', 'DynamoDB', 'S3', 'Clerk'],
    achievements: [
      'Developed a fullstack mobile productivity app with gamified focus sessions using React Native with 1000+ users',
      'Built a cloud-native microservice architecture using AWS API Gateway, Lambda, and DynamoDB.',
      'Utilized local caching for efficient dataflow, reducing infrastructure costs by 30% and accelerating responsiveness.',
      'Implemented secure authentication by integrating Clerk with AWS Lambda and REST API Gateway authorizers, securely verifying JWTs, resulting in protected user data and securing mobile API endpoints.',
    ],
    liveUrl: 'https://apps.apple.com/us/app/study-kitty/id6749342191',
    liveLabel: 'APP STORE',
    imageUrl: '/screenshots/studykitty.webp',
    imagePortrait: true,
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
      'Hybrid RAG pipeline for automated job-to-candidate matching across 123K+ postings — BM25 sparse retrieval + dense embeddings with Cohere reranking, doubling BERTScore F1 and increasing RAGAS faithfulness by 35% via a 12-condition ablation study. Redis response caching via Docker cut repeat-query latency by 97%. Eliminated LLM hallucinations via skill extraction and evidence-span citations, achieving 85% skill recall.',
    longDescription:
      'Architected a hybrid RAG pipeline using BM25, dense embeddings, and Cohere reranking across 123K+ postings, doubling BERTScore F1 and increasing RAGAS faithfulness by 35% via a 12-condition ablation study. Reduced repeat-query latency by 97% by implementing Redis response caching via Docker keyed on resume SHA-256 hash, eliminating redundant Pinecone vector database queries, Cohere reranking, and GPT-4 calls. Eliminated LLM hallucinations of skills via skill extraction and evidence-span citations, achieving 85% skill recall.',
    type: 'electric',
    secondaryType: 'dragon',
    hp: 460,
    techStack: ['Python', 'FastAPI', 'Docker', 'Redis', 'Next.js', 'Pinecone', 'GPT-4', 'Cohere'],
    achievements: [
      'Architected a hybrid RAG pipeline using BM25, dense embeddings, and Cohere reranking across 123K+ postings, doubling BERTScore F1 and increasing RAGAS faithfulness by 35% via 12-condition ablation study',
      'Reduced repeat-query latency by 97% by implementing Redis response caching via Docker keyed on resume SHA-256 hash, eliminating redundant Pinecone vector database queries, Cohere reranking, and GPT-4 calls',
      'Eliminated LLM hallucinations of skills via skill extraction and evidence-span citations, achieving 85% skill recall',
    ],
    githubUrl: 'https://github.com/iElvxn/job-match-rag',
    imageUrl: '/screenshots/jobmatchrag.jpg',
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
      'Deep learning CNN for real-time driver drowsiness detection — MobileNetV2 architecture trained with TensorFlow achieved 98% accuracy via data augmentation and regularization. Utilized OpenCV to monitor a user\'s eye movements, providing real-time alerts for potential drowsiness.',
    longDescription:
      'Developed and trained a deep learning CNN for real-time driver drowsiness detection using TensorFlow and a MobileNetV2 architecture, achieving an accuracy of 98% via data augmentation and regularization. Utilized OpenCV to monitor a user\'s eye movements, providing real-time alerts for potential drowsiness.',
    type: 'normal',
    secondaryType: undefined,
    hp: 380,
    techStack: ['Python', 'TensorFlow', 'MobileNetV2', 'OpenCV', 'NumPy', 'Matplotlib', 'Scikit-learn'],
    achievements: [
      'Developed and trained a deep learning CNN for real-time driver drowsiness detection using TensorFlow and a MobileNetV2 architecture, achieving an accuracy of 98% via data augmentation and regularization.',
      'Utilized OpenCV to monitor a user\'s eye movements, providing real-time alerts for potential drowsiness.',
    ],
    githubUrl: 'https://github.com/iElvxn/drowsiness-detection',
    imageUrl: undefined,
    pokemonSprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/143.png',
    pokemonName: 'Snorlax',
    rarity: 'rare',
    featured: false,
  },
];
