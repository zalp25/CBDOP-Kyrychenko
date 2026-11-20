import { SortByBirthdate, SortByName } from './sort-strategies';
import { Character } from '../interfaces/character';

// Тести стратегій сортування.
describe('SortStrategies', () => {
  const make = (fullName: string, hogwartsHouse: string, birthdate: string, index: number) =>
    ({ fullName, hogwartsHouse, birthdate, index }) as Character;

  const list = [
    make('Severus Snape', 'Slytherin', '09.01.1960', 0),
    make('Albus Dumbledore', 'Gryffindor', '29.08.1881', 1),
    make('Harry Potter', 'Gryffindor', '31.07.1980', 2),
    make('Charlie', 'Gryffindor', 'Невідомо', 3),
  ];

  it("SortByName повинен сортувати за ім'ям", () => {
    expect(new SortByName().sort(list)[0].fullName).toBe('Albus Dumbledore');
  });

  it('SortByBirthdate повинен ставити невідомі дати в кінець', () => {
    expect(new SortByBirthdate().sort(list).map((c) => c.index)).toEqual([1, 0, 2, 3]);
  });
});
