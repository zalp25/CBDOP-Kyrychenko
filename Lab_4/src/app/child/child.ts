import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-child',
  imports: [],
  templateUrl: './child.html',
  styleUrl: './child.css',
})
export class Child {
  @Input() text = '';

  result() {
    const reversed = this.text.split('').reverse().join('');
    return reversed.replace(/[аАaA]/g, '!');
  }
}
