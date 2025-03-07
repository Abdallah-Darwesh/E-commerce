import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../Core/Services/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { trigger, style, animate, transition } from '@angular/animations';
@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-10px)' }),
        animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class SignUpComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly formBuilder = inject(FormBuilder);

  isLoading: boolean = false;
  MsgError: string = '';
  IsSuccess: string = '';
  submitted = false;

  // Initialize the reactive form with validation and custom group validator
  submitForm: FormGroup = new FormGroup({
    name: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20)
    ]),
    email: new FormControl(null, [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[A-Z]\w{7,}$/)
    ]),
    rePassword: new FormControl(null, [Validators.required]),
    phone: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^01[0125][0-9]{8}$/)
    ])
  }, this.passwordMissMatch);

  onSubmitForm(): void {
    this.submitted = true;
    if (this.submitForm.valid) {
      this.isLoading = true;
      this.authService.sendRegisterForm(this.submitForm.value).subscribe({
        next: (response) => {
          console.log(response);
          // Check for "success" (ensure the backend returns the same string)
          if (response.message === 'success') {
            this.IsSuccess = response.message;
            // Navigate to signin after a short delay
            setTimeout(() => {
              this.router.navigate(['/signin']);
            }, 1000);
          }
          this.isLoading = false;
        },
        error: (err: HttpErrorResponse) => {
          console.error(err);
          this.MsgError = err.error.message;
          this.isLoading = false;
        }
      });
      this.submitForm.markAllAsTouched();
      console.log(this.submitForm.value);
    }
  }

  // Custom validator to check if password and rePassword match
  passwordMissMatch(group: AbstractControl) {
    const password = group.get('password')?.value;
    const rePassword = group.get('rePassword')?.value;
    return password === rePassword ? null : { missMatch: true };
  }
}
