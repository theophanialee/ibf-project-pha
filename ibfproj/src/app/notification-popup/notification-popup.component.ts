import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-notification-popup',
  templateUrl: './notification-popup.component.html',
  styleUrl: './notification-popup.component.css',
})
export class NotificationPopupComponent {
  @Input() message: any;
  show: boolean = true;

  close() {
    this.show = false;
  }
}
