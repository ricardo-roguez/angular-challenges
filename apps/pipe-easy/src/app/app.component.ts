import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { SimplePipe } from './simple-pipe.pipe';

@Component({
  standalone: true,
  imports: [NgFor, SimplePipe],
  selector: 'app-root',
  template: `
    <div *ngFor="let person of persons; let index = index">
      {{ person | simplePipe : index }}
    </div>
  `,
})
export class AppComponent {
  persons = ['toto', 'jack'];
}
