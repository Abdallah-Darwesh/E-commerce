import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../Core/Services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  imports: [ReactiveFormsModule],
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  step: number = 1;

  verifyEmail: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email])
  });
    
  verifyCode: FormGroup = new FormGroup({
    resetCode: new FormControl(null, [Validators.required, Validators.pattern(/^\d{6}$/)])
  });

  resetPassword: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    newPassword: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z]\w{7,}$/)])
  });

  verifyEmailSubmit(): void {
    const emailValue = this.verifyEmail.get('email')?.value;
    this.resetPassword.get('email')?.patchValue(emailValue);
    this.authService.setEmailVerify(this.verifyEmail.value).subscribe({
      next: (res) => {
        if (res.statusMsg === "success") {
          this.step = 2;
        }
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  verifyCodeSubmit(): void {
    // Trim the input value and ensure it's exactly 6 digits.
    const codeControl = this.verifyCode.get('resetCode');
    if (codeControl) {
      const trimmedCode = codeControl.value?.toString().trim();
      codeControl.patchValue(trimmedCode);
      if (!trimmedCode || trimmedCode.length !== 6) {
        console.error('Verification code must be exactly 6 digits.');
        return;
      }
    }

    this.authService.setCodeVerify(this.verifyCode.value).subscribe({
      next: (res) => {
        // Adjust the success condition as per your API response.
        if (res.status === "Success" || res.status === "success") {
          this.step = 3;
        }
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  resetPasswordSubmit(): void {
    this.authService.setResetPassword(this.resetPassword.value).subscribe({
      next: (res) => {
        localStorage.setItem('userToken', res.token);
        this.authService.saveUserData();
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}
