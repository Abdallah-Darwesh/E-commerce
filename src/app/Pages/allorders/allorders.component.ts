import { Component } from '@angular/core';
import { trigger, style, animate, transition, keyframes } from '@angular/animations';
@Component({
  selector: 'app-allorders',
  imports: [],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.css',
  animations: [
    trigger('paymentAnimation', [
      transition(':enter', [
        animate('1s ease-out', keyframes([
          style({ opacity: 0, transform: 'scale(0.5)', offset: 0 }),
          style({ opacity: 1, transform: 'scale(1.2)', offset: 0.5 }),
          style({ opacity: 1, transform: 'scale(1)', offset: 1 })
        ]))
      ])
    ])
  ]
})
export class AllordersComponent {

}
