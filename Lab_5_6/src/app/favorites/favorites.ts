import { Component, inject } from '@angular/core';
import { CharactersService } from '../characters-service';

@Component({
  selector: 'app-favorites',
  imports: [],
  templateUrl: './favorites.html',
  styleUrl: './favorites.css',
})
export class Favorites {
  service = inject(CharactersService);
}
