import { Component, inject } from '@angular/core';
import {CharactersService } from '../characters-service';

@Component({
  selector: 'app-characters-table',
  imports: [],
  templateUrl: './characters-table.html',
  styleUrl: './characters-table.css',
})
export class CharactersTable {
  service = inject(CharactersService);
}
