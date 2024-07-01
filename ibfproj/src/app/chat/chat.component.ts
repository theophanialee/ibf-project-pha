import { Component } from '@angular/core';
import { WebSocketService } from '../websocket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {

  constructor (private webSocketService: WebSocketService){
    this.webSocketService.connect('ws://example.com/socket')
    .subscribe({
      next: (message) => console.log('New message:', message),
      error: (error) => console.error('WebSocket error:', error),
      complete: () => console.log('WebSocket connection closed')
    });
  }




}
