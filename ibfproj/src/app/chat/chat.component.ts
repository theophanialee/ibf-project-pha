import { Component } from '@angular/core';
import { Message, StompSubscription } from '@stomp/stompjs';
import { Subscription } from 'rxjs';
import { WebSocketService } from '../services/websocket.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChatMessage, ExistingUser } from '../models';
import { HouseholdService } from '../services/household.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent {
  messageForm: FormGroup;
  messages: ChatMessage[] = [];
  subs$!: Subscription;
  householdMembers: ExistingUser[] = [];
  constructor(
    private fb: FormBuilder,
    private webSocketSvc: WebSocketService,
    private householdSvc: HouseholdService
  ) {
    this.messageForm = this.fb.group({
      messageToSend: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.webSocketSvc.listen((message) => {
      this.messages.push(message);
    });

    // this.getAllMembers();
  }

  // getAllMembers(): void {
  //   const householdId = localStorage.getItem('selectedHouseholdId');

  //   if (householdId != null)
  //     this.householdSvc.getAllMembersByHHId(householdId).subscribe(
  //       (users: ExistingUser[]) => {
  //         this.householdMembers = users;
  //       },
  //       (error) => {
  //         console.error('Error fetching existing users:', error);
  //       }
  //     );
  // }

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