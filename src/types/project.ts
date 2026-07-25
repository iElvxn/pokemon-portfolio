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
  /** Button label for liveUrl, e.g. 'APP STORE' — defaults to 'LIVE DEMO' */
  liveLabel?: string;
  imageUrl?: string;
  imagePortrait?: boolean;
  pokemonSprite: string;
  pokemonName: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'holo-rare';
  featured?: boolean;
}
