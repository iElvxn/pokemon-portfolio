import { Project } from '@/types/project';

export const projects: Project[] = [
  {
    id: 'proj-1',
    name: 'Study Kitty',
    subtitle: '1,000+ Users · Live on the App Store',
    description:
      'A gamified focus-timer app that 1,000+ people use to study — live on the App Store. Runs on a serverless AWS backend (API Gateway, Lambda, DynamoDB) with JWT-secured endpoints; local caching cut infrastructure costs by 30%.',
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
    pokemonSprite: '/sprites/94.png',
    pokemonName: 'Gengar',
    rarity: 'uncommon',
    featured: false,
  },
  {
    id: 'proj-2',
    name: 'Job Match RAG',
    subtitle: 'Resume → Matched Jobs, With Cited Evidence',
    description:
      'Paste a resume, get matched jobs with evidence-span citations — no hallucinated skills. Hybrid retrieval (BM25 + dense embeddings + Cohere reranking) over 123K+ postings, validated with a 12-condition ablation study; Redis caching makes repeat queries 97% faster.',
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
    pokemonSprite: '/sprites/644.png',
    pokemonName: 'Zekrom',
    rarity: 'holo-rare',
    featured: true,
  },
  {
    id: 'proj-3',
    name: 'Driver Drowsiness Detection',
    subtitle: 'Real-time Driver Safety CNN',
    description:
      'Watches a driver\'s eyes through a webcam and alerts them in real time when they start nodding off. MobileNetV2 CNN trained with TensorFlow to 98% accuracy; OpenCV handles live eye tracking.',
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
    pokemonSprite: '/sprites/143.png',
    pokemonName: 'Snorlax',
    rarity: 'rare',
    featured: false,
  },
];
