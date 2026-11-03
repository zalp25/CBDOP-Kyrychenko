import { Injectable, signal, WritableSignal, inject } from '@angular/core';
import axios from 'axios';
import { Character } from './interfaces/character';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})


export class CharactersService {
  characters = signal<Character[]>([]);
  selected = signal<Character | null>(null);
  favorites = signal<Character[]>([]);

  private storage = inject(Storage);

  async load(): Promise<void> {
    await this.storage.create();
    const saved = await this.storage.get('favorites');
    this.favorites.set(saved ?? []);
    // console.log(favorites)

    const res = await axios.get('https://potterapi-fedeperin.vercel.app/en/characters');
    // console.log(res);
    this.characters.set(res.data);
  }



  isFavorite(c: Character): boolean {
    return this.favorites().some(f => f.index === c.index);
  }

  async toggleFavorite(c: Character): Promise<void> {
    if (this.isFavorite(c)) {
      this.favorites.update(list => list.filter(f => f.index !== c.index));
    } else {
      this.favorites.update(list => [...list, c]);
    }
    await this.storage.set('favorites', this.favorites());
  }
}
