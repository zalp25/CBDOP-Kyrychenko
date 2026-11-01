import { Injectable, signal, WritableSignal } from '@angular/core';
import axios from 'axios';
import { Character } from './character';

@Injectable({
  providedIn: 'root',
})


export class CharactersService {
  characters = signal<Character[]>([]);
  selected = signal<Character | null>(null);
  favorites = signal<Character[]>([]);

  async load(): Promise<void> {
    const res = await axios.get('https://potterapi-fedeperin.vercel.app/en/characters');
    // console.log(res);
    this.characters.set(res.data);
  }

  isFavorite(c: Character): boolean {
    return this.favorites().some(f => f.index === c.index);
  }

  toggleFavorite(c: Character): void {
    if (this.isFavorite(c)) {
      this.favorites.update(list => list.filter(f => f.index !== c.index));
    } else {
      this.favorites.update(list => [...list, c]);
    }
  }
}
