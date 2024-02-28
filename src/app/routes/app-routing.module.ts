import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { CreateComponent } from '../components/user/create/create.component';
import { LoginComponent } from '../components/login/login.component';
import { UploadComponent as DocumentHomeComponent } from '../components/document/upload/upload.component';
import { AuthGuard } from '../guards/authGuard';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'signup', component: CreateComponent },
  { path: 'login', component: LoginComponent },
  { path: 'documents', component: DocumentHomeComponent, canActivate: [AuthGuard] },
];


@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
