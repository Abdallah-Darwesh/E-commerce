import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly router = inject(Router);

  constructor(private httpClient: HttpClient) { }

  sendRegisterForm(data: object): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/signup`, data);
  }

  sendLoginForm(data: object): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/signin`, data);
  }

  // Save token and navigate to home
  storeToken(token: string): void {
    localStorage.setItem('userToken', token);
    this.router.navigate(['/home']);
  }

  saveUserData(): void {
    if (localStorage.getItem('userToken') !== null) {
      // Optionally decode and use the token here.
    }
  }

  // Logout: Remove token and navigate to sign in
  logOut(): void {
    localStorage.removeItem('userToken');
    this.router.navigate(['/signin']);
  }

  setEmailVerify(data: object): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/forgotPasswords`, data);
  }

  setCodeVerify(data: object): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/verifyResetCode`, data);
  }

  setResetPassword(data: object): Observable<any> {
    return this.httpClient.put(`${environment.baseUrl}/api/v1/auth/resetPassword`, data);
  }
}
