import { Injectable } from '@angular/core';
import { ApiCharacter } from '../interfaces/api-character';
import { Character } from '../interfaces/character';
import { ApiError } from '../api/api-error';

@Injectable({
  providedIn: 'root',
})
export class CharacterAdapter {
  adapt(raw: ApiCharacter, i: number): Character {
    return {
      fullName: raw.fullName?.trim() || 'Без імені',
      nickname: raw.nickname?.trim() || '-',
      hogwartsHouse: raw.hogwartsHouse?.trim() || 'Без факультету',
      interpretedBy: raw.interpretedBy?.trim() || 'Невідомо',
      children: Array.isArray(raw.children) ? raw.children : [],
      image: raw.image ?? '',
      birthdate: this.formatDate(raw.birthdate),
      index: raw.index ?? i,
    };
  }

  adaptList(data: unknown): Character[] {
    if (!Array.isArray(data)) {
      throw new ApiError('Сервер повернув дані в неочікуваному форматі');
    }
    return data.map((raw, i) => this.adapt(raw, i));
  }

  private formatDate(value?: string): string {
    if (!value) {
      return 'Невідомо';
    }
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
      return value;
    }
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    return `${day}.${month}.${date.getFullYear()}`;
  }
}
