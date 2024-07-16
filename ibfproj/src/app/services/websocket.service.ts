import { Injectable } from '@angular/core';

import { Client, Message, StompSubscription } from '@stomp/stompjs';
import { Observable, Subject } from 'rxjs';
import { RxStompService } from './rx-stomp/rx-stomp.service';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private client: Client;
  private isConnected: boolean = false;

  private messageSubject: Subject<Message> = new Subject<Message>();

  constructor(private rxStompSvc: RxStompService) {
    this.client = new Client();
    this.client.brokerURL = 'ws://localhost:8080/ws';

    this.client.onConnect = () => {
      console.log('Connected');
      this.isConnected = true;
    };

    this.client.onDisconnect = () => {
      console.log('Disconnected');
      this.isConnected = false;
    };

    this.client.onStompError = (frame) => {
      console.error('Broker reported error: ' + frame.headers['message']);
      console.error('Additional details: ' + frame.body);
    };

    this.client.activate();
  }

  sendMessage(destination: string, message: string) {
    this.rxStompSvc.publish({
      destination: destination,
      body: message,
    });

    console.log(
      '[ws service] message published to rxStomp: ',
      message,
      destination
    );
  }

  subscribeToTopic(topic: string) {
    return this.rxStompSvc
      .watch(`/topic/${topic}`)
      .subscribe((message: Message) => {
        this.messageSubject.next(message);
      });
  }

  private handleIncomingMessage(message: Message) {
    this.messageSubject.next(message); // Emit the received message to subscribers
  }

  getMessageSubject(): Observable<Message> {
    return this.messageSubject.asObservable();
  }
}