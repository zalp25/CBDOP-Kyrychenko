import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule, FormsModule],
  template: `
    <h2>Product List</h2>
    <input [(ngModel)]="newName" placeholder="Product name">
    <input type="number" [(ngModel)]="newPrice" placeholder="Price">
    <button (click)="addProduct()">Add</button>

    <ul>
      <li *ngFor="let p of products; let i = index">
        {{ p.name }} - {{ p.price | currency }}
        <button (click)="removeProduct(i)">Delete</button>
      </li>
    </ul>
  `
})
export class ProductList {
  newName = '';
  newPrice = 0;
  products = inject(ProductService).products; // масив із сервісу, а не свій

  addProduct() {
    if (this.newName.trim() && this.newPrice > 0) {
      this.products.push({ name: this.newName, price: this.newPrice });
      this.newName = '';
      this.newPrice = 0;
    }
  }

  removeProduct(i: number) {
    this.products.splice(i, 1);
  }
}
