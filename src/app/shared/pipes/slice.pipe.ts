import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'slice',
  standalone: true
})
export class SlicePipe implements PipeTransform
{
  transform(value: string, maxCharCount = 5): unknown
  {
    // If the characters count is bigger than the default 5, or the set argument amount, then we add `...`
    const addedDots = value.length > maxCharCount ? `...` : ``;
    return `${value.substring(0, maxCharCount)}${addedDots}`;
  }
}
