import { CharacterAdapter } from './character-adapter';

// Тести адаптера: дані з API повинні перетворюватись у наш інтерфейс Character.
describe('CharacterAdapter', () => {
  const adapter = new CharacterAdapter();

  it('повинен перетворити персонажа з API', () => {
    const result = adapter.adapt(
      {
        fullName: 'Harry James Potter',
        nickname: 'Harry',
        hogwartsHouse: 'Gryffindor',
        interpretedBy: 'Daniel Radcliffe',
        children: ['James Sirius Potter'],
        image: 'harry.png',
        birthdate: 'Jul 31, 1980',
        index: 0,
      },
      0,
    );

    expect(result.fullName).toBe('Harry James Potter');
    expect(result.birthdate).toBe('31.07.1980');
    expect(result.children).toEqual(['James Sirius Potter']);
  });

  it('порожні поля повинні замінюватись на значення за замовчуванням', () => {
    const result = adapter.adapt({ fullName: 'Charlie Weasley', interpretedBy: '' }, 7);

    expect(result.interpretedBy).toBe('Невідомо');
    expect(result.hogwartsHouse).toBe('Без факультету');
    expect(result.birthdate).toBe('Невідомо');
    expect(result.children).toEqual([]);
    expect(result.index).toBe(7);
  });
});
