import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../Core/Services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  imports: [ReactiveFormsModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css'
})
export class ForgetPasswordComponent {
  private readonly authService=inject(AuthService);
  private readonly router=inject(Router)


  step:number =1

  verifyEmail:FormGroup =new FormGroup({
    email :new FormControl(null,[Validators.required,Validators.email])
  });
    
    verifyCode:FormGroup =new FormGroup({
    resetCode :new FormControl(null,[Validators.required,Validators.pattern(/^(0-9){6}$/)])
   
  })

    resetPassword:FormGroup =new FormGroup({
    email :new FormControl(null,[Validators.required,Validators.email]),
    newpassword :new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z]\w{7,}$/)])
  })

    verifyEmailSubmit():void{
      let emailValue =this.verifyEmail.get('email')?.value;
      this.resetPassword.get('email')?.patchValue(emailValue);
      this.authService.setEmailVerify(this.verifyEmail.value).subscribe({
        next:(res)=>{
          if(res.statusMsg =="success"){
            this.step=2;
          }

        }
        ,error(){

        }
      });
    }

        verifyCodeSubmit():void{
      this.authService.setCodeVerify(this.verifyCode.value).subscribe({
        next:(res)=>{
          if(res.status =="Success"){
            this.step=3;
          }

        }
        ,error(){

        }
      });
    }
        resetPasswordSubmit():void{
      this.authService.setResetPassword(this.resetPassword.value).subscribe({
        next:(res)=>{
          localStorage.setItem('userToken',res.token)
          this.authService.saveUserData();
          this.router.navigate(['/home']);
        }
        ,error(){

        }
      });
    }    

}
