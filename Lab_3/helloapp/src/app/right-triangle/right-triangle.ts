import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-right-triangle',
  imports: [CommonModule, FormsModule],
  template: ` <h2>Прямокутний трикутник</h2>
  <input type="number" [(ngModel)]="a" placeholder="Катет a">
  <input type="number" [(ngModel)]="b" placeholder="Катет b">

  <div *ngIf="a > 0 && b > 0">
    <p>Гіпотенуза: {{ hypotenuse() }}</p>
    <p>Периметр: {{ perimeter() }}</p>
    <p>Площа: {{ area() }}</p>
  </div>

  <p *ngIf="a <= 0 || b <= 0">Введіть додатні катети</p>
  `
})

export class RightTriangle {
  a: number = 0;
  b: number = 0;

  hypotenuse() {
    return Math.sqrt(this.a * this.a + this.b * this.b);
  }

  perimeter() {
    return this.a + this.b + this.hypotenuse();
  }

  area() {
    return (this.a * this.b) / 2;
  }
}