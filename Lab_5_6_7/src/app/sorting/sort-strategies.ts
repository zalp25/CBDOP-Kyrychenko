import { Character } from '../interfaces/character';

export interface SortStrategy {
  title: string;
  sort(list: Character[]): Character[];
}

export class NoSort implements SortStrategy {
  title = 'Як в API';

  sort(list: Character[]): Character[] {
    return [...list];
  }
}

export class SortByName implements SortStrategy {
  title = "За ім'ям";

  sort(list: Character[]): Character[] {
    return [...list].sort((a, b) => a.fullName.localeCompare(b.fullName));
  }
}

export class SortByHouse implements SortStrategy {
  title = 'За факультетом';

  sort(list: Character[]): Character[] {
    return [...list].sort(
      (a, b) =>
        a.hogwartsHouse.localeCompare(b.hogwartsHouse) || a.fullName.localeCompare(b.fullName),
    );
  }
}

export class SortByBirthdate implements SortStrategy {
  title = 'За датою народження';

  sort(list: Character[]): Character[] {
    return [...list].sort((a, b) => this.toNumber(a.birthdate) - this.toNumber(b.birthdate));
  }

  private toNumber(date: string): number {
    const [day, month, year] = date.split('.').map(Number);
    if (!day || !month || !year) {
      return Number.MAX_SAFE_INTEGER;
    }
    return year * 10000 + month * 100 + day;
  }
}

export const SORT_STRATEGIES: SortStrategy[] = [
  new NoSort(),
  new SortByName(),
  new SortByHouse(),
  new SortByBirthdate(),
];
