import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../Core/Services/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { trigger, style, animate, transition } from '@angular/animations';
@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-20px)' }),
        animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class SignInComponent {
  private readonly authService = inject(AuthService);

  isLoading: boolean = false;
  MsgError: string = '';
  IsSuccess: string = '';
  submitted = false;

  // Create a reactive form with email and password fields.
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      // Password must start with an uppercase letter and have at least 8 characters.
      Validators.pattern(/^[A-Z]\w{7,}$/)
    ])
  });

  onloginForm(): void {
    this.submitted = true;
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.authService.sendLoginForm(this.loginForm.value).subscribe({
        next: (response) => {
          console.log(response);
          // Check for successful login
          if (response.message === 'success') {
            this.IsSuccess = response.message;
            // Save token and navigate to home via AuthService method.
            this.authService.storeToken(response.token);
          }
          this.isLoading = false;
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
          this.MsgError = err.error.message;
          this.isLoading = false;
        }
      });
      this.loginForm.markAllAsTouched();
      console.log(this.loginForm.value);
    }
  }
}
