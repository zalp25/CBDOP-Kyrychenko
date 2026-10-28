import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-price-statistics',
  imports: [CommonModule],
  template: `
    <h2>Price Statistics</h2>
    <p *ngIf="products.length === 0">Немає продуктів</p>
    <div *ngIf="products.length > 0">
      <p>Мінімальна ціна: {{ min() | currency }}</p>
      <p>Максимальна ціна: {{ max() | currency }}</p>
      <p>Середня ціна: {{ average() | currency }}</p>
    </div>
  `
})
export class PriceStatistics {
  products = inject(ProductService).products;

  min() {
    let result = this.products[0].price;
    for (const p of this.products) {
      if (p.price < result) result = p.price;
    }
    return result;
  }

  max() {
    let result = this.products[0].price;
    for (const p of this.products) {
      if (p.price > result) result = p.price;
    }
    return result;
  }

  average() {
    let sum = 0;
    for (const p of this.products) {
      sum += p.price;
    }
    return sum / this.products.length;
  }
}
