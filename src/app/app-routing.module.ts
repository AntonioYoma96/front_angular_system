import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from 'src/app/components/home/home.component';
import { AuthGuard } from 'src/app/helpers/auth.guard';
import { LoginComponent } from 'src/app/components/auth/login/login.component';
import { TicketsComponent } from 'src/app/components/tickets/tickets.component';
import { RecoveryComponent } from 'src/app/components/auth/recovery/recovery.component';
import { NewPasswordComponent } from 'src/app/components/auth/new-password/new-password.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'tickets', component: TicketsComponent, canActivate: [AuthGuard] },
  { path: 'recovery', component: RecoveryComponent },
  { path: 'new-password', component: NewPasswordComponent },

  // Everything else
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
