import { PokemonType } from '@/lib/type-colors';

export interface Project {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  longDescription: string;
  type: PokemonType;
  secondaryType?: PokemonType;
  hp: number;
  techStack: string[];
  achievements: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  pokemonSprite: string;
  pokemonName: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'holo-rare';
  featured?: boolean;
}
