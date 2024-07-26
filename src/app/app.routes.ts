import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { UserListComponent } from './user-list/user-list.component';
import { RoleListComponent } from './role-list/role-list.component';
import {AuthorityListComponent} from "./authority-list/authority-list.component";

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'user-list', component: UserListComponent },
  { path: 'role-list', component: RoleListComponent},
  { path:'authority-list', component :AuthorityListComponent}
];
