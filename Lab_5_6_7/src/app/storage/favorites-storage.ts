import { Injectable, inject } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Character } from '../interfaces/character';
import { CharacterAdapter } from '../adapters/character-adapter';

const KEY = 'favorites';

@Injectable({
  providedIn: 'root',
})
export class FavoritesStorage {
  private readonly storage = inject(Storage);
  private readonly adapter = inject(CharacterAdapter);
  private ready: Promise<unknown> | null = null;

  private init(): Promise<unknown> {
    if (!this.ready) {
      this.ready = this.storage.create();
    }
    return this.ready;
  }

  async load(): Promise<Character[]> {
    await this.init();
    const saved = await this.storage.get(KEY);
    return Array.isArray(saved) ? saved.map((c, i) => this.adapter.adapt(c, i)) : [];
  }

  async save(list: Character[]): Promise<void> {
    await this.init();
    await this.storage.set(KEY, list);
  }
}
