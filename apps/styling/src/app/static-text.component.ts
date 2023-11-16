/* eslint-disable @angular-eslint/component-selector */
import { Component } from '@angular/core';
import { TextComponent } from './text.component';

@Component({
  selector: 'static-text',
  standalone: true,
  imports: [TextComponent],
  styles: [
    `
      text {
        --text-font-size: 10px;
        --text-color: black;
      }

      :host-context(.error) {
        & text {
          --text-font-size: 30px;
          --text-color: red;
        }
      }
      :host-context(.warning) {
        & text {
          --text-font-size: 25px;
          --text-color: orange;
        }
      }
    `,
  ],
  template: ` <text>This is a static text</text> `,
})
export class TextStaticComponent {}
