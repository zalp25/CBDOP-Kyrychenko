import { TestBed } from '@angular/core/testing';
import { Storage } from '@ionic/storage-angular';
import axios from 'axios';
import { CharactersService } from './characters-service';
import { Character } from './interfaces/character';

// Тести сервісу. Storage і axios замінені моками, щоб не ходити в інтернет і не писати на диск.
describe('CharactersService', () => {
  let service: CharactersService;
  let storageMock: any;

  const harry: Character = {
    fullName: 'Harry Potter',
    nickname: 'Harry',
    hogwartsHouse: 'Gryffindor',
    interpretedBy: 'Daniel Radcliffe',
    children: [],
    image: '',
    birthdate: '31-07-1980',
    index: 0,
  };

  beforeEach(() => {
    storageMock = {
      create: vi.fn().mockResolvedValue(undefined),
      get: vi.fn().mockResolvedValue(null),
      set: vi.fn().mockResolvedValue(undefined),
    };

    TestBed.configureTestingModule({
      providers: [{ provide: Storage, useValue: storageMock }],
    });

    service = TestBed.inject(CharactersService);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('load повинен створити сховище і прочитати вибране', async () => {
    vi.spyOn(axios, 'get').mockResolvedValue({ data: [] });

    await service.load();

    expect(storageMock.create).toHaveBeenCalled();
    expect(storageMock.get).toHaveBeenCalledWith('favorites');
  });

  it('load повинен взяти вибране зі сховища', async () => {
    storageMock.get.mockResolvedValue([harry]);
    vi.spyOn(axios, 'get').mockResolvedValue({ data: [] });

    await service.load();

    expect(service.favorites()).toEqual([harry]);
  });

  it('load повинен завантажити персонажів з API', async () => {
    vi.spyOn(axios, 'get').mockResolvedValue({ data: [harry] });

    await service.load();

    expect(service.characters()).toHaveLength(1);
  });

  it('load повинен кинути помилку, якщо API недоступне', async () => {
    vi.spyOn(axios, 'get').mockRejectedValue(new Error('Network Error'));

    await expect(service.load()).rejects.toThrow('Network Error');
  });

  it('isFavorite повинен повернути true, якщо персонаж у вибраному', () => {
    service.favorites.set([harry]);

    expect(service.isFavorite(harry)).toBe(true);
  });

  it('isFavorite повинен повернути false, якщо персонажа немає у вибраному', () => {
    expect(service.isFavorite(harry)).toBe(false);
  });

  it('toggleFavorite повинен додати персонажа і зберегти список', async () => {
    await service.toggleFavorite(harry);

    expect(service.favorites()).toContain(harry);
    expect(storageMock.set).toHaveBeenCalled();
  });

  it('toggleFavorite повинен прибрати персонажа, якщо він уже у вибраному', async () => {
    service.favorites.set([harry]);

    await service.toggleFavorite(harry);

    expect(service.favorites()).not.toContain(harry);
  });
});
