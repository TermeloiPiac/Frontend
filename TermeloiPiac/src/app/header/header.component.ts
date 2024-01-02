import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { SessionService } from '../service/session.service';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy{

  loggedIn: any = false;
  username:string;
  data: Promise<any>;
  private headerSubscription: Subscription;
  constructor(private sessionService: SessionService,
    private cookieService: CookieService){
    this.headerSubscription = this.sessionService.getUpdate().subscribe(
      (response) => {
        this.loggedIn = response.logFlag;
        this.username = response.logUsername;
      });
  }

  ngOnInit() {
    this.username = this.sessionService.getUsername();
    this.loggedIn = this.sessionService.getLoggedStatus();
  }

  async signOut(){
    // await this.sessionService.removeSessionCookies()
    window.location.reload();
  }


  ngOnDestroy() {
    this.headerSubscription.unsubscribe();
  }
}