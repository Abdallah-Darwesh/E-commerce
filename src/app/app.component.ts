import { Component } from '@angular/core';
import { FooterComponent } from "./Core/Components/footer/footer.component";
import { NgxSpinnerComponent } from 'ngx-spinner';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FooterComponent,NgxSpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'e-commerce';
}
