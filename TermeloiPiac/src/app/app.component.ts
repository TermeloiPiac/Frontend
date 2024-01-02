import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { BodyComponent } from './body/body.component';
import { SignInComponent } from './body/sign-in/sign-in.component';
import { RegisterComponent } from './body/register/register.component';
import { SessionService } from './service/session.service';

import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    FormsModule,
    HeaderComponent,
    BodyComponent,
    SignInComponent,
    RegisterComponent,
    HttpClientModule
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent implements OnInit{


  constructor(private sessionService: SessionService){}
  initLoaded: boolean = false;

  async ngOnInit() {
    console.log("application started")
    await this.sessionService.checkSession();
    this.initLoaded = true;
  }
}
