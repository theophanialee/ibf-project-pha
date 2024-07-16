import { Injectable } from '@angular/core';
import { RxStomp } from '@stomp/rx-stomp';
import { myRxStompConfig } from './rx-stomp.config';

@Injectable({
  providedIn: 'root',
})
export class RxStompService extends RxStomp {
  constructor() {
    super();
    this.configure(myRxStompConfig);
    this.activate();

    this.connectionState$.subscribe((state) => {
      console.log('Connection state:', state);
    });
  }
}
