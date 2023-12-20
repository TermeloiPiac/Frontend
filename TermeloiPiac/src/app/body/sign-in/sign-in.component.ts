import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { ErrorHandler } from '../errorHandler.component';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [FormsModule, NgClass],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent{

  loginErrorMessage: string = "";

  email: string = "";
  password: string = "";

  private errorHandler: ErrorHandler = new ErrorHandler();

  constructor(
    private http: HttpClient,
    private router: Router ) { }

  submitLogin() {
    const headers: HttpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')

    this.http.post<any>('http://localhost:8080/termeloiPiac/api/auth/login', JSON.stringify({
      email: this.email,
      password: this.password
      }), { headers: headers } )
        .subscribe({
          next: (successResponse) => {
            this.loginErrorMessage = "";
            localStorage.setItem('token', successResponse.accessToken);
          },
          error: (errorResponse) => {
            this.loginErrorMessage = this.errorHandler.handleError(errorResponse);
          },
          complete: () => {
            this.router.navigateByUrl("/");
          }
        }
      )
  }
}

