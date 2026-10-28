import { Injectable } from '@angular/core';

export interface Product {
  name: string;
  price: number;
}

// Спільне сховище: один масив продуктів для всіх компонентів
@Injectable({ providedIn: 'root' })
export class ProductService {
  products: Product[] = [];
}
