import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RestrictedComponent } from './restricted/restricted.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { UnrestrictedComponent } from './unrestricted/unrestricted.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/unrestricted', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'restricted', component: RestrictedComponent, canActivate: [AuthGuard]
  },
  { path: 'unrestricted', component: UnrestrictedComponent },
  { path: '**', component: PagenotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
