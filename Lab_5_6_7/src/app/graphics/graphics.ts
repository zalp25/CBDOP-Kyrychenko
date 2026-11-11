import { Component, inject, ElementRef, afterNextRender, viewChild, effect } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { CharactersService } from '../characters-service';

Chart.register(...registerables);

@Component({
  selector: 'app-graphics',
  imports: [],
  templateUrl: './graphics.html',
  styleUrl: './graphics.css',
})

export class Graphics {
  canvas = viewChild.required<ElementRef<HTMLCanvasElement>>('chart');
  service = inject(CharactersService);
  private labels = ['Gryffindor', 'Ravenclaw', 'Slytherin', 'Hufflepuff'];
  private chart: Chart | null = null;

  private houses(): Record<string, number> {
    const result: Record<string, number> = {};
    for (const character of this.service.characters()) {
      const house = character.hogwartsHouse || 'Без факультету';
      result[house] = (result[house] ?? 0) + 1;
    }
    return result;
  }

  private count(): number[]{
    const houses = this.houses();
    return this.labels.map(label => houses[label] ?? 0);
  }
  

  constructor() {
    afterNextRender(() => {
      this.chart = new Chart(this.canvas().nativeElement, {
        type: 'pie',
        data: {
          labels: ['Gryffindor', 'Ravenclaw', 'Slytherin', 'Hufflepuff'],
          datasets: [{ label: 'Графік по факультетах', data: this.count() }],
        },
      });
    });
   effect(() => {
     const data = this.count();
     if (!this.chart) {
       return;
     }
     this.chart.data.datasets[0].data = data;
     this.chart.update();
   });
  }
}