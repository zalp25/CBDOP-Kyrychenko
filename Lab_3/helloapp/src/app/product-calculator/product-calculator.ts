import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-calculator',
  imports: [CommonModule, FormsModule],
  template: `
    <h2>Product Calculator</h2>
    <input type="number" [(ngModel)]="price" placeholder="Price">
    <input type="number" [(ngModel)]="quantity" placeholder="Quantity">
    <p>Total: {{ total() | currency }}</p>
  `
})

export class ProductCalculator {
  price: number = 0;
  quantity:number = 1;

  total() {
    return this.price * this.quantity;
  }
}
