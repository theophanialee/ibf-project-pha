import { EventEmitter, Injectable } from '@angular/core';

import { Client, Message, StompSubscription } from '@stomp/stompjs';
import { ChatMessage } from '../models';
import { environment } from '../../environments/environment.prod';

export type ListenerCallBack = (message: ChatMessage) => void;

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private client: Client;
  private subscription: StompSubscription | undefined;
  public messageReceived = new EventEmitter<Message>();

  private webSocketURL = environment.webSocketUrl;

  constructor() {
    this.client = new Client({
      brokerURL: this.webSocketURL,
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
      const messageWithUserDetails = {
        message: message,
        userId: localStorage.getItem('userId'),
        username: localStorage.getItem('username'),
        householdId: localStorage.getItem('selectedHouseholdId'),
      };

      this.client.publish({
        destination: '/app/chat',
        body: JSON.stringify(messageWithUserDetails),
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
          console.log(message);
          const chatMessage = this.mapToChatMessage(message);
          const currentHouseholdId = localStorage.getItem(
            'selectedHouseholdId'
          );
          if (chatMessage.householdId === currentHouseholdId) {
            this.messageReceived.emit(message);
            fun(chatMessage);
          }
        }
      );
    } else {
      this.client.onConnect = () => {
        this.subscription = this.client.subscribe(
          '/topic/household',
          (message: Message) => {
            const chatMessage = this.mapToChatMessage(message);
            const currentHouseholdId = localStorage.getItem(
              'selectedHouseholdId'
            );
            if (chatMessage.householdId === currentHouseholdId) {
              this.messageReceived.emit(message);
              fun(chatMessage);
            }
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
    const body = JSON.parse(message.body);
    return {
      username: body.username,
      content: body.message,
      userId: body.userId,
      householdId: body.householdId,
    };
  }
}
