export type PokemonType =
  | 'normal' | 'fighting' | 'flying' | 'poison' | 'ground' | 'rock'
  | 'bug' | 'ghost' | 'steel' | 'fire' | 'water' | 'grass'
  | 'electric' | 'psychic' | 'ice' | 'dragon' | 'dark' | 'fairy';

export const TYPE_COLORS: Record<PokemonType, string> = {
  normal:   '#A8A878',
  fighting: '#C03028',
  flying:   '#A890F0',
  poison:   '#A040A0',
  ground:   '#E0C068',
  rock:     '#B8A038',
  bug:      '#A8B820',
  ghost:    '#705898',
  steel:    '#B8B8D0',
  fire:     '#F08030',
  water:    '#6890F0',
  grass:    '#78C850',
  electric: '#F8D030',
  psychic:  '#F85888',
  ice:      '#98D8D8',
  dragon:   '#7038F8',
  dark:     '#705848',
  fairy:    '#EE99AC',
};

export const TYPE_TEXT_COLORS: Record<PokemonType, string> = {
  normal:   '#fff',
  fighting: '#fff',
  flying:   '#fff',
  poison:   '#fff',
  ground:   '#000',
  rock:     '#fff',
  bug:      '#fff',
  ghost:    '#fff',
  steel:    '#000',
  fire:     '#fff',
  water:    '#fff',
  grass:    '#fff',
  electric: '#000',
  psychic:  '#fff',
  ice:      '#000',
  dragon:   '#fff',
  dark:     '#fff',
  fairy:    '#000',
};

export function getTypeColor(type: PokemonType): string {
  return TYPE_COLORS[type] ?? '#A8A878';
}

export function getTypeTextColor(type: PokemonType): string {
  return TYPE_TEXT_COLORS[type] ?? '#fff';
}
