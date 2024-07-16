import { Injectable } from '@angular/core';

import { Client, Message, StompSubscription } from '@stomp/stompjs';
import { Observable, Subject } from 'rxjs';
import { RxStompService } from './rx-stomp/rx-stomp.service';

@Injectable({
  providedIn: 'root',
})
// export class WebSocketService {
//   // private client: Client;
//   // private isConnected: boolean = false;

//   private messageSubject: Subject<Message> = new Subject<Message>();

//   constructor(private rxStompSvc: RxStompService) {
//     // this.client = new Client();
//     // this.client.brokerURL = 'ws://localhost:8080/ws';
//     // this.client.onConnect = () => {
//     //   console.log('Connected');
//     //   this.isConnected = true;
//     // };
//     // this.client.onDisconnect = () => {
//     //   console.log('Disconnected');
//     //   this.isConnected = false;
//     // };
//     // this.client.onStompError = (frame) => {
//     //   console.error('Broker reported error: ' + frame.headers['message']);
//     //   console.error('Additional details: ' + frame.body);
//     // };
//     // this.client.activate();
//   }

//   isConnected(): boolean {
//     return this.rxStompSvc.connected();
//   }

//   sendMessage(destination: string, message: string) {
//     this.rxStompSvc.publish({
//       destination: destination,
//       body: message,
//     });

//     console.log(
//       '[ws service] message published to rxStomp: ',
//       message,
//       destination
//     );
//   }

//   subscribeToTopic(topic: string) {
//     return this.rxStompSvc
//       .watch(`/topic/${topic}`)
//       .subscribe((message: Message) => {
//         this.messageSubject.next(message);
//       });
//   }

//   private handleIncomingMessage(message: Message) {
//     this.messageSubject.next(message); // Emit the received message to subscribers
//   }

//   getMessageSubject(): Observable<Message> {
//     return this.messageSubject.asObservable();
//   }
// }
export class WebSocketService {
  private client: Client;
  private subscription: StompSubscription | undefined;

  constructor() {
    this.client = new Client({
      brokerURL: 'ws://localhost:8080/ws/websocket',
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      debug: (str) => {
        console.log(str);
      },
    });

    this.client.onConnect = () => {
      console.log('Connected to WebSocket');
    };

    this.client.onStompError = (frame) => {
      console.error(`Broker reported error: ${frame.headers['message']}`);
      console.error(`Additional details: ${frame.body}`);
    };

    this.client.activate();
  }

  public sendMessage(task: Message): void {
    if (this.client && this.client.connected) {
      this.client.publish({
        destination: '/app/chat',
        body: JSON.stringify(task),
      });
    } else {
      console.error('STOMP client is not connected.');
    }
  }

  // public listen(fun: ListenerCallBack): void {
  //   if (this.client.connected) {
  //     this.subscription = this.client.subscribe('/topic/household', (message: StompMessage) => {
  //       fun(JSON.parse(message.body));
  //     });
  //   } else {
  //     this.client.onConnect = () => {
  //       this.subscription = this.client.subscribe('/topic/household', (message: StompMessage) => {
  //         fun(JSON.parse(message.body));
  //       });
  //     };
  //   }
  // }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.client) {
      this.client.deactivate();
    }
  }
}