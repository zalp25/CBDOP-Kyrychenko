import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-image-preview',
  imports: [CommonModule],
  template: `
    <h2>Image Preview</h2>
    <input type="file" accept="image/*" (change)="onFileSelected($event)">
    <div *ngIf="imageUrl">
      <img [src]="imageUrl">
    </div>
  `,
  styles: [`img { width: 1000px; max-width: 100%; }`]
})
export class ImagePreview {
  imageUrl = '';

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.imageUrl = URL.createObjectURL(input.files[0]);
    }
  }
}
