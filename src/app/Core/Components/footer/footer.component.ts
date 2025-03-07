// footer.component.ts
import { Component } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

interface PaymentPartner {
  id: number;
  name: string;
  url: string;
}

interface SocialLink {
  id: number;
  name: string;
  url: string;
  icon: string;
}

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('300ms ease-out', 
          style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class FooterComponent {
  paymentPartners: PaymentPartner[] = [
    { id: 1, name: 'Amazon Pay', url: './images/amazon-pay.png' },
    { id: 2, name: 'American Express', url: './images/American-Express-Color.png' },
    { id: 3, name: 'Mastercard', url: './images/mastercard.webp' },
    { id: 4, name: 'PayPal', url: './images/paypal.png' }
  ];

  socialLinks: SocialLink[] = [
    { id: 1, name: 'Facebook', url: '#', icon: 'fab fa-facebook' },
    { id: 2, name: 'Instagram', url: '#', icon: 'fab fa-instagram' },
    { id: 3, name: 'LinkedIn', url: '#', icon: 'fab fa-linkedin' },
    { id: 4, name: 'Twitter', url: '#', icon: 'fab fa-twitter' },
    { id: 5, name: 'YouTube', url: '#', icon: 'fab fa-youtube' },
    { id: 6, name: 'TikTok', url: '#', icon: 'fab fa-tiktok' }
  ];
}