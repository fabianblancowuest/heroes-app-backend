import { Hero } from 'src/heroes/entities/hero.entity';
import { charactersOne } from './characters_one.data';
import { charactersTwo } from './characters_two.data';

export const heroesData: Hero[] = [...charactersOne, ...charactersTwo];
