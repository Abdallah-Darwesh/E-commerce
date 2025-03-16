import { Component, Input, OnInit, Signal, WritableSignal, computed, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../Services/auth/auth.service';
import { CartService } from '../../Services/cart/cart.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  
})
export class NavbarComponent  implements  OnInit  {


  navLinks = [
    { path: 'home', label: 'Home' },
    { path: 'products', label: 'Products' },
    { path: 'categories', label: 'Categories' },
    { path: 'brands', label: 'Brands' }
  ];
  
  socialLinks = [
    { icon: 'fab fa-facebook', url: '#' },
    { icon: 'fab fa-instagram', url: '#' },
    { icon: 'fab fa-linkedin', url: '#' },
    { icon: 'fab fa-twitter', url: '#' },
    { icon: 'fab fa-youtube', url: '#' },
    { icon: 'fab fa-tiktok', url: '#' }
  ];
  
  authLinks = [
    { path: 'signin', label: 'Sign In' },
    { path: 'signup', label: 'Sign Up' }
  ];
  
  isMobileMenuOpen = false;
  @Input() isLogin: boolean = false;

  readonly authService = inject(AuthService);
  private readonly cartService =inject(CartService)

  countCard:Signal<number>=computed(() =>
  this.cartService.cartNumber()
  );

  ngOnInit(): void {
  //  this.cartService.cartNumber.subscribe({
  //   next: (value) =>{
  //     this.countCard = value;
  //   }
  //  })

   this.cartService.getLoggedUserCart ( ).subscribe({
    next: (res) =>{
      this.cartService.cartNumber.set(res.numOfCartItems)
    }
   })
  }
  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
}
