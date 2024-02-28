import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthRequest } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})


export class AuthService {
  private userPath = environment.apiRoutes.auth;

  constructor(private http: HttpClient) { }

  async login(auth: AuthRequest): Promise<Observable<AuthRequest>> {
    return this.http.post<AuthRequest>(this.userPath.login, auth);
  }

  async isAuthenticatedUser(): Promise<boolean> {
    return localStorage.getItem('token') !== null;
  }
}
