import { Component } from '@angular/core';
import { Message, StompSubscription } from '@stomp/stompjs';
import { Subscription } from 'rxjs';
import { WebSocketService } from '../services/websocket.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChatMessage } from '../models';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent {
  messageForm: FormGroup;
  messages: ChatMessage[] = [];
  subs$!: Subscription;

  constructor(private fb: FormBuilder, private webSocketSvc: WebSocketService) {
    this.messageForm = this.fb.group({
      messageToSend: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.webSocketSvc.listen((message) => {
      this.messages.push(message);
    });
  }

  sendMessage(): void {
    if (this.messageForm && this.messageForm.get('messageToSend')) {
      const messageToSend = this.messageForm.get('messageToSend')!.value;
      if (messageToSend.trim()) {
        this.webSocketSvc.sendMessage(messageToSend);
        this.messageForm.reset();
      }
    }
  }

  ngOnDestroy(): void {
    if (this.subs$) {
      this.subs$.unsubscribe();
    }
  }
}