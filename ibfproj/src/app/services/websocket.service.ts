import { Injectable } from '@angular/core';

import { Client, Message, StompSubscription } from '@stomp/stompjs';
import { ChatMessage } from '../models';

export type ListenerCallBack = (message: ChatMessage) => void;

@Injectable({
  providedIn: 'root',
})
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

  public sendMessage(message: Message): void {
    if (this.client && this.client.connected) {
      this.client.publish({
        destination: '/app/chat',
        body: JSON.stringify(message),
      });
    } else {
      console.error('STOMP client is not connected.');
    }
  }

  public listen(fun: ListenerCallBack): void {
    if (this.client.connected) {
      this.subscription = this.client.subscribe(
        '/topic/household',
        (message: Message) => {
          const chatMessage = this.mapToChatMessage(message);
          fun(chatMessage);
        }
      );
    } else {
      this.client.onConnect = () => {
        this.subscription = this.client.subscribe(
          '/topic/household',
          (message: Message) => {
            const chatMessage = this.mapToChatMessage(message);
            fun(chatMessage);
          }
        );
      };
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.client) {
      this.client.deactivate();
    }
  }

  private mapToChatMessage(message: Message): ChatMessage {
    return {
      username: message.headers['username'],
      content: message.body,
    };
  }
}