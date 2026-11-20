import { Injectable, inject } from '@angular/core';
import axios from 'axios';
import { Character } from '../interfaces/character';
import { CharacterAdapter } from '../adapters/character-adapter';
import { ApiError } from './api-error';

const API_URL = 'https://potterapi-fedeperin.vercel.app/en/characters';

@Injectable({
  providedIn: 'root',
})
export class CharactersApi {
  private readonly adapter = inject(CharacterAdapter);

  async getAll(): Promise<Character[]> {
    try {
      const res = await axios.get(API_URL, { timeout: 10000 });
      return this.adapter.adaptList(res.data);
    } catch (e) {
      throw this.toApiError(e);
    }
  }

  private toApiError(e: unknown): ApiError {
    if (e instanceof ApiError) {
      return e;
    }
    if (axios.isAxiosError(e)) {
      if (e.code === 'ECONNABORTED') {
        return new ApiError('Сервер не відповідає. Спробуйте пізніше');
      }
      if (!e.response) {
        return new ApiError("Немає з'єднання з сервером. Перевірте інтернет");
      }
      const status = e.response.status;
      if (status === 404) {
        return new ApiError('Дані не знайдено (404)', status);
      }
      if (status >= 500) {
        return new ApiError(`Помилка на сервері (${status}). Спробуйте пізніше`, status);
      }
      return new ApiError(`Помилка запиту (${status})`, status);
    }
    return new ApiError('Невідома помилка під час завантаження даних');
  }
}
