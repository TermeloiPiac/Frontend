import { Routes } from '@angular/router';
import { BodyComponent } from './body/body.component';
import { SignInComponent } from './body/sign-in/sign-in.component';
import { RegisterComponent } from './body/register/register.component';

export const routes: Routes = [
  {path: '', component: BodyComponent},
  {path: 'belepes', component: SignInComponent},
  {path: 'regisztracio', component: RegisterComponent}
];
