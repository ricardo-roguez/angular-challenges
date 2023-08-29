import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'simplePipe',
  standalone: true,
})
export class SimplePipe implements PipeTransform {
  transform(name: string, index: number): string {
    return `${name} - ${index}`;
  }
}
