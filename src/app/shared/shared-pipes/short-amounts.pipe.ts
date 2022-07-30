import { Pipe, PipeTransform } from '@angular/core';
import BigNumber from 'bignumber.js';

@Pipe({
  name: 'shortAmounts'
})
export class ShortAmountsPipe implements PipeTransform {

  transform(data: number | string, args?: any): string {
    const num = new BigNumber(data);
    if (num.isNaN()) {
      return '0';
    }
    // @ts-ignore
    const formatter = new Intl.NumberFormat('en', {  notation: 'compact', minimumFractionDigits: 2, maximumFractionDigits: 2 });
    return formatter.format(num.toNumber());
  }

}
