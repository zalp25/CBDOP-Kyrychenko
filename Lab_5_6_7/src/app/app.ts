import { Component, signal, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CharactersService } from './characters-service';
import { CharactersTable } from './characters-table/characters-table';
import { Favorites } from './favorites/favorites';
import { CharacterPopup } from './character-popup/character-popup';
import { Graphics } from './graphics/graphics'
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CharactersTable, Favorites, CharacterPopup, Graphics],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  service = inject(CharactersService);
  
  ngOnInit(): void {
    this.service.load();
  }
}