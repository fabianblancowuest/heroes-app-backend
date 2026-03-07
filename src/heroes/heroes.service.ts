import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateHeroDto } from './dto/create-hero.dto';
import { UpdateHeroDto } from './dto/update-hero.dto';
import { Hero } from './entities/hero.entity';
import { heroesData } from 'src/data/heroes.data';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { AdvancedSearchDto } from './dto/advande-search.dto';

@Injectable()
export class HeroesService {
  private heroes: Hero[] = structuredClone(heroesData);

  create(createHeroDto: CreateHeroDto) {
    const hero = {
      ...createHeroDto,
      id: `${this.heroes.length + 1}`,
      slug: createHeroDto.name.toLowerCase().replace(/ /g, '-'),
    };

    this.heroes.push(hero);

    return hero;
  }

  findAll(paginationDto: PaginationDto) {
    const { limit = 6, offset = 0, category = 'all' } = paginationDto;

    let heroes = [...this.heroes];
    let heroCount = heroes.length;

    if (category !== 'all') {
      heroes = heroes.filter(
        (hero) => hero.category.toLowerCase() === category.toLowerCase(),
      );
      heroCount = heroes.length;
    }

    heroes = heroes.slice(offset, offset + limit);

    return {
      total: heroCount,
      pages: Math.ceil(heroCount / limit),
      heroes,
    };
  }

  findOne(idOrSlug: string) {
    const hero = this.heroes.find(
      (hero) => hero.id === idOrSlug || hero.slug === idOrSlug,
    );

    if (!hero) {
      throw new NotFoundException('Hero not found');
    }

    return hero;
  }

  update(id: string, updateHeroDto: UpdateHeroDto) {
    const hero = this.findOne(id);

    return {
      ...hero,
      ...updateHeroDto,
    };
  }

  remove(id: string) {
    const hero = this.findOne(id);

    this.heroes = this.heroes.filter((hero) => hero.id !== id);

    return hero;
  }

  getHeroSummary() {
    const heroes = this.heroes;
    const totalHeroes = heroes.length;
    const strongestHero = heroes.reduce((max, hero) =>
      hero.strength > max.strength ? hero : max,
    );
    const smartestHero = heroes.reduce((max, hero) =>
      hero.intelligence > max.intelligence ? hero : max,
    );

    const heroCount = heroes.reduce((acc, hero) => {
      if (hero.category === 'Hero') {
        return acc + 1;
      }

      return acc;
    }, 0);

    const villainCount = heroes.reduce((acc, hero) => {
      if (hero.category === 'Villain') {
        return acc + 1;
      }

      return acc;
    }, 0);

    const antiheroCount = heroes.reduce((acc, hero) => {
      if (hero.category === 'Antihero') {
        return acc + 1;
      }

      return acc;
    }, 0);

    const civilianCount = heroes.reduce((acc, hero) => {
      if (hero.category === 'Civilian') {
        return acc + 1;
      }

      return acc;
    }, 0);

    return {
      totalHeroes,
      strongestHero,
      smartestHero,
      heroCount,
      villainCount,
      antiheroCount,
      civilianCount,
    };
  }

  findByAdvancedSearch(advancedSearchDto: AdvancedSearchDto) {
    const {
      name,
      team,
      category,
      universe,
      status,
      strength,
      speed,
      durability,
      intelligence,
    } = advancedSearchDto;

    let filteredHeroes = [...this.heroes];

    if (name) {
      filteredHeroes = filteredHeroes.filter(
        (hero) =>
          hero.name.toLowerCase().includes(name.toLowerCase()) ||
          hero.alias.toLowerCase().includes(name.toLowerCase()),
      );
    }

    if (team && team !== 'all') {
      filteredHeroes = filteredHeroes.filter(
        (hero) => hero.team.toLowerCase() === team.toLowerCase(),
      );
    }

    if (category && category !== 'all') {
      filteredHeroes = filteredHeroes.filter(
        (hero) => hero.category.toLowerCase() === category.toLowerCase(),
      );
    }

    if (universe && universe !== 'all') {
      filteredHeroes = filteredHeroes.filter(
        (hero) => hero.universe.toLowerCase() === universe.toLowerCase(),
      );
    }

    if (status && status !== 'all') {
      filteredHeroes = filteredHeroes.filter(
        (hero) => hero.status.toLowerCase() === status.toLowerCase(),
      );
    }

    if (strength) {
      filteredHeroes = filteredHeroes.filter(
        (hero) => hero.strength >= strength,
      );
    }

    if (speed) {
      filteredHeroes = filteredHeroes.filter((hero) => hero.speed >= speed);
    }

    if (durability) {
      filteredHeroes = filteredHeroes.filter(
        (hero) => hero.durability >= durability,
      );
    }

    if (intelligence) {
      filteredHeroes = filteredHeroes.filter(
        (hero) => hero.intelligence >= intelligence,
      );
    }

    return filteredHeroes.sort((a, b) => a.name.localeCompare(b.name));
  }
}
