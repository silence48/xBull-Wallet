import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class GlobalsService {

  constructor() { }

  // We do it this way so in the future we can inject different types of window objects in case we want to
  get window(): Window {
    return window;
  }

  openWindowMode(url = '/index.html#/wallet/assets/'): void {
    new Promise(r => setTimeout(r, 200))
      .then(() => this.window.open(url, 'xBull_Wallet'));
  }
}
