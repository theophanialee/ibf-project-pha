import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket$!: WebSocket;

  connect(url: string): Observable<any> {
    return new Observable(observer => {
      this.socket$ = new WebSocket(url);

      this.socket$.onmessage = (event) => {
        observer.next(event.data);
      };

      this.socket$.onerror = (event) => {
        observer.error(event);
      };

      this.socket$.onclose = () => {
        observer.complete();
      };

      // Return the cleanup function, called when the observable is unsubscribed
      return () => this.socket$.close();
    });
  }
}
