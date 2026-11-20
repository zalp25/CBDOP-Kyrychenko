import { TestBed } from '@angular/core/testing';
import axios, { AxiosError, AxiosHeaders } from 'axios';
import { CharactersApi } from './characters-api';

// Тести роботи з API. axios замінений моком, перевіряємо обробку різних помилок.
describe('CharactersApi', () => {
  let api: CharactersApi;

  const httpError = (status: number) =>
    new AxiosError('error', 'ERR_BAD_RESPONSE', undefined, undefined, {
      status,
      statusText: '',
      data: null,
      headers: {},
      config: { headers: new AxiosHeaders() },
    });

  beforeEach(() => {
    TestBed.configureTestingModule({});
    api = TestBed.inject(CharactersApi);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('getAll повинен повернути адаптованих персонажів', async () => {
    vi.spyOn(axios, 'get').mockResolvedValue({
      data: [{ fullName: 'Harry Potter', birthdate: 'Jul 31, 1980', index: 0 }],
    });

    const list = await api.getAll();

    expect(list[0].birthdate).toBe('31.07.1980');
  });

  it("немає інтернету -> повідомлення про з'єднання", async () => {
    vi.spyOn(axios, 'get').mockRejectedValue(new AxiosError('Network Error', 'ERR_NETWORK'));

    await expect(api.getAll()).rejects.toThrow("Немає з'єднання з сервером");
  });

  it('404 -> дані не знайдено', async () => {
    vi.spyOn(axios, 'get').mockRejectedValue(httpError(404));

    await expect(api.getAll()).rejects.toThrow('Дані не знайдено (404)');
  });
});
