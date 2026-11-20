import { Component, inject, signal, computed } from '@angular/core';
import { CharactersService } from '../characters-service';
import { SORT_STRATEGIES } from '../sorting/sort-strategies';

@Component({
  selector: 'app-characters-table',
  imports: [],
  templateUrl: './characters-table.html',
  styleUrl: './characters-table.css',
})
export class CharactersTable {
  service = inject(CharactersService);
  strategies = SORT_STRATEGIES;
  strategy = signal(SORT_STRATEGIES[0]);
  rows = computed(() => this.strategy().sort(this.service.characters()));

  changeSort(i: string): void {
    this.strategy.set(this.strategies[Number(i)]);
  }
}
