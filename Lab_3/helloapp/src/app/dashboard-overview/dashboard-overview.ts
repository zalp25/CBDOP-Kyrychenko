import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-dashboard-overview',
  imports: [CommonModule],
  template: `
    <h2>Dashboard Overview</h2>
    <p>Кількість продуктів: {{ products.length }}</p>
    <p>Загальна сума: {{ total() | currency }}</p>
  `
})
export class DashboardOverview {
  products = inject(ProductService).products;

  total() {
    let sum = 0;
    for (const p of this.products) {
      sum += p.price;
    }
    return sum;
  }
}
