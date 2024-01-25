import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigationComponent } from './navigation/navigation.component';
import { UserDetailComponent } from './pages/user-detail/user-detail.component';
import { UsersComponent } from './pages/users/users.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthenticationGuard } from './services/guards/authentication.guard';
import { HiddenUsersComponent } from './pages/hidden-users/hidden-users.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path:'',
    component: NavigationComponent,
    canActivate: [AuthenticationGuard],
    children: [
      {
        path: '',
        component: UsersComponent,
    }, {
      path: 'user/:id',
      component: UserDetailComponent
    } , {
      path: 'hidden-users',
      component: HiddenUsersComponent,
  }, {
    path: 'hidden-user/:id',
    component: UserDetailComponent
  }
  ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
