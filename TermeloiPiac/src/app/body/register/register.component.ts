import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { CommonModule, NgClass } from '@angular/common';
import { ErrorHandler } from '../errorHandler.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgClass, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {

  private errorHandler: ErrorHandler = new ErrorHandler();
  
  constructor(private http: HttpClient, private formBuilder: FormBuilder) {}

  successRegistration: boolean = false;
  emailRegExp: RegExp = new RegExp('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')

  form: FormGroup;
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      firstNameControl: new FormControl(null, [Validators.required]),
      lastNameControl: new FormControl(null, [Validators.required]),
      emailControl: new FormControl(null, [
        Validators.required,
        Validators.pattern(this.emailRegExp)
      ]),
      passwordControl: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
      passwordAgainControl: new FormControl(null, [
        Validators.required,
      ]),
      phoneNumberControl: new FormControl(null, [Validators.required]),
    });
    
  }

  passwordMatch = false;
  private passwordNoMatch(): boolean {
    if (this.form.get('passwordControl')?.value !== (this.form.get('passwordAgainControl')?.value)) {
      this.passwordMatch = false;
      return  true;
    } else {
      this.passwordMatch = true;
      return false;
    }
  }

  private emailFormatError(): boolean{
    if (!this.form.get('emailControl')?.value.match(this.emailRegExp)){
      return true;
    } else {
      return false;
    }
  }  

  private hasRegistryError(): boolean {
    return this.form.invalid;
  }

  registerErrorMessage = "";
  submitted = false;
  submitRegistration() {
    this.registerErrorMessage = "";
    this.submitted = true;
    const validationError: boolean = this.passwordNoMatch() || this.hasRegistryError() || this.emailFormatError();

    if (!validationError) {
      const headers: HttpHeaders = new HttpHeaders().set(
        'Content-Type',
        'application/json'
      );

      this.http
        .post<any>(
          'http://localhost:8080/termeloiPiac/api/auth/register',
          JSON.stringify({
            firstName: this.form.get('firstNameControl')?.value,
            lastName: this.form.get('lastNameControl')?.value,
            email: this.form.get('emailControl')?.value,
            password: this.form.get('passwordControl')?.value,
            phoneNumber: this.form.get('phoneNumberControl')?.value,
            role: [this.form.get('emailControl')?.value, 'user'],
          }),
          { headers: headers } )
            .subscribe({
              next: () => {
                this.successRegistration = true;
              },
              error: (errorResponse) => {
                this.registerErrorMessage = this.errorHandler.handleError(errorResponse);
              }
            } )
    }
  }
}