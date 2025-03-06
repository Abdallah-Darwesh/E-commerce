import { Component } from '@angular/core';
import { NavbarComponent } from "./Core/Components/navbar/navbar.component";
import { FooterComponent } from "./Core/Components/footer/footer.component";
import { NgxSpinnerComponent } from 'ngx-spinner';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent,NgxSpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'e-commerce';
}
