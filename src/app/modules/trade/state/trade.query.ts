import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { TradeStore, TradeState } from './trade.store';

@Injectable({ providedIn: 'root' })
export class TradeQuery extends Query<TradeState> {
  sendingPathPaymentStrictSend$ = this.select(state => state.sendingPathPaymentStrictSend);
  sendingPathPaymentStrictReceive$ = this.select(state => state.sendingPathPaymentStrictReceive);

  constructor(protected store: TradeStore) {
    super(store);
  }

}
