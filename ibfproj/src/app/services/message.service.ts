// import { Injectable } from '@angular/core';
// import { RxStompService } from '@stomp/ng2-stompjs';
// import { map, tap } from 'rxjs';

// @Injectable({
//   providedIn: 'root',
// })
// export class MessageService {
//   constructor(private rxStompSvc: RxStompService) {}

//   subscribe(topic: string) {
//     return this.rxStompSvc.watch(`/topic/${topic}`).pipe(
//       map((message) => {
//         const headers = message.headers;
//         const body = message.body;
//         return { headers, body };
//       }),
//       tap(({ headers, body }) => {
//         console.log('Incoming message: ', body);
//       })
//     );
//   }

//   publish(topic: string, message: string, type: string) {
//     const headers = { type: type.toString() };
//     this.rxStompSvc.publish({
//       destination: `/app/${topic}`,
//       headers: headers,
//       body: message,
//     });
//   }
// }
