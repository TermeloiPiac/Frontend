import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http'
import { User } from "../shared/DTO/User";
import { Observable, Subject, firstValueFrom} from "rxjs";
import { error } from "console";


@Injectable({
  providedIn: 'root'
})
export class SessionService{
  userData: User = new User();
  private headerSubject = new Subject<any>();
  private loggedStatus: boolean = false;

  constructor(private http: HttpClient){}

  async getSession(): Promise<any>{
    const session$ = this.http.get<boolean>('http://localhost:8080/termeloiPiac/api/auth/session', { withCredentials: true })
    return await firstValueFrom(session$).catch(
      (error) => {console.error(error.error)}
    );
  }

  async loadSession(): Promise<boolean>{
    const session = await this.getSession();
    return session;
  }

  async getUserData(){
    const data$: Observable<any> = this.http.get<any>('http://localhost:8080/termeloiPiac/api/account/getUserData', { withCredentials: true })
    return firstValueFrom(data$);
  }

  async loadUserData() {
    if (this.getLoggedStatus()){
      const data = await this.getUserData();
      this.userData = data;
    }
  }

  getUsername(){
    return this.userData.username;
  }

  setUsername(username: string){
    this.userData.username = username;
  }

  getLoggedStatus(){
    return this.loggedStatus;
  }

  setLoggedStatus(flag: boolean){
    this.loggedStatus = flag;
  }

  getUpdate(){
    return this.headerSubject.asObservable();
  }

  sendUpdate(logged: boolean, username: string){
    this.headerSubject.next({logFlag: logged, logUsername: username});
  }

  async checkSession(){
    const isSession = (await this.loadSession())
    if (isSession) {
      await this.reloadViaCookie();
    }
    return isSession;
  }

  async reloadViaCookie() {
    this.loggedStatus = true;
    await this.loadUserData()
  }
}