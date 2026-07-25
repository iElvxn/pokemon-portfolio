/** Canonical production URL — used by metadataBase, sitemap, and robots */
export const siteUrl = 'https://elvinly.dev';

export const personal = {
  name: 'Elvin Ly',
  title: ['Software Engineer', 'Full Stack Developer', 'ML Engineer'],
  bio: 'I build cloud-native backend systems and applied AI infrastructure, with a focus on distributed architecture, retrieval-augmented pipelines, and clean system design.',
  pokedexNumber: '#0001',
  species: 'Full-Stack Engineer',
  types: ['ghost', 'electric'] as const,
  region: 'New York',
  level: 100,
  yearsExp: 2,
  projectsShipped: 5,
  commits: 1800,
  abilities: [
    {
      name: 'Systems Architect',
      description: 'Designs scalable cloud-native microservices on AWS and GCP with 60% efficiency gains.',
    },
    {
      name: 'RAG Specialist',
      description: 'Constructs hybrid retrieval pipelines that silence LLM hallucinations with 85% skill recall.',
    },
  ],
  flavorText:
    'This engineer lurks in late-night debugging sessions, fueled by cold brew and TensorFlow logs. Known to summon scalable microservices from thin air and architect RAG pipelines with surgical precision. Emits a faint glow of Lambda cold starts when pushed past its limit.',
  github: 'https://github.com/iElvxn',
  linkedin: 'https://linkedin.com/in/elvin-ly',
  email: 'elvin.ly3@gmail.com',
  resume: '/resume.pdf',
};
