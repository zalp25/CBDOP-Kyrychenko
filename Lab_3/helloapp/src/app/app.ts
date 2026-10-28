import { Component, signal } from '@angular/core';
import { ProductCalculator } from './product-calculator/product-calculator'
import { ProductList } from './product-list/product-list';
import { PriceStatistics } from './price-statistics/price-statistics';
import { ImagePreview } from './image-preview/image-preview';
import { DashboardOverview } from './dashboard-overview/dashboard-overview';
import { RightTriangle } from './right-triangle/right-triangle'

@Component({
  selector: 'app-root',
  imports: [ProductCalculator, ProductList, PriceStatistics, ImagePreview, DashboardOverview, RightTriangle],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('helloapp');
}
