import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { ErrorHandler } from '../../core/errors/errorHandler.component';
import { RouterModule, RouterOutlet } from '@angular/router';


import { SessionService } from '../../service/session.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    FormsModule,
    RouterModule,
    RouterOutlet,
    NgClass
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {

  private errorHandler: ErrorHandler = new ErrorHandler();

  loginErrorMessage: string = "";

  email: string = "";
  password: string = "";

  constructor(
    private http: HttpClient,
    private router: Router,
    private sessionService: SessionService) { }

  async submitLogin() {
    const headers: HttpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')

    this.http.post<any>('http://localhost:8080/termeloiPiac/api/auth/login', JSON.stringify({
      email: this.email,
      password: this.password
      }), { headers: headers, withCredentials: true } )
        .subscribe({
          next: async () => {
            this.loginErrorMessage = "";
            this.sessionService.setLoggedStatus(true);
            await this.sessionService.loadUserData();
            this.sessionService.sendUpdate(true, this.sessionService.getUsername());
            window.location.reload();
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

