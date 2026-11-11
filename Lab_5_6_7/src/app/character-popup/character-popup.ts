import { Component, inject } from '@angular/core';
import { CharactersService } from '../characters-service';

@Component({
  selector: 'app-character-popup',
  imports: [],
  templateUrl: './character-popup.html',
  styleUrl: './character-popup.css',
})
export class CharacterPopup {
  service = inject(CharactersService);
}