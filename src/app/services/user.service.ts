import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})


export class UserService {
  private userPath = environment.apiRoutes.user;
  private token = localStorage.getItem('token');
  private headers = new HttpHeaders()
    .set('Authorization', `Bearer ${this.token}`)
    .set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  async createUser(user: User): Promise<Observable<User>> {
    return this.http.post<User>(this.userPath.createUser, user);
  }


  async updateUser(user: User): Promise<Observable<User>> {
    return this.http.put<User>(this.userPath.updateUser + user.id, user, { headers: this.headers });
  }

  async deleteUser(id: number): Promise<Observable<boolean>> {
    return this.http.delete<boolean>(this.userPath.deleteUser + id, { headers: this.headers });
  }

  async getUserById(id: number): Promise<Observable<User>> {
    return this.http.get<User>(this.userPath.getUserById + id, { headers: this.headers });
  }


  async getUsers(): Promise<Observable<User[]>> {
    return this.http.get<User[]>(this.userPath.all, { headers: this.headers, withCredentials: true });
  }
}
