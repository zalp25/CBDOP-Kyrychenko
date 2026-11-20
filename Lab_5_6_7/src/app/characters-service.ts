import { Injectable, signal, inject } from '@angular/core';
import { Character } from './interfaces/character';
import { CharactersApi } from './api/characters-api';
import { FavoritesStorage } from './storage/favorites-storage';

@Injectable({
  providedIn: 'root',
})
export class CharactersService {
  readonly characters = signal<Character[]>([]);
  readonly selected = signal<Character | null>(null);
  readonly favorites = signal<Character[]>([]);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  private readonly api = inject(CharactersApi);
  private readonly storage = inject(FavoritesStorage);

  async load(): Promise<void> {
    this.loading.set(true);
    this.error.set(null);

    try {
      this.favorites.set(await this.storage.load());
    } catch {
      this.favorites.set([]);
      this.error.set('Не вдалося прочитати вибране зі сховища');
    }

    try {
      const list = await this.api.getAll();
      this.characters.set(list);
      this.favorites.update((fav) => fav.map((f) => list.find((c) => c.index === f.index) ?? f));
    } catch (e) {
      this.characters.set([]);
      this.error.set(e instanceof Error ? e.message : 'Невідома помилка');
    } finally {
      this.loading.set(false);
    }
  }

  isFavorite(c: Character): boolean {
    return this.favorites().some((f) => f.index === c.index);
  }

  async toggleFavorite(c: Character): Promise<void> {
    const old = this.favorites();
    if (this.isFavorite(c)) {
      this.favorites.update((list) => list.filter((f) => f.index !== c.index));
    } else {
      this.favorites.update((list) => [...list, c]);
    }

    try {
      await this.storage.save(this.favorites());
    } catch {
      this.favorites.set(old);
      this.error.set('Не вдалося зберегти вибране. Спробуйте ще раз');
    }
  }

  closeError(): void {
    this.error.set(null);
  }
}
