import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { map, Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  apiURL = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiURL}users`);
  }
  createUser(userData: User): Observable<User> {
    return this.http.post<User>(`${this.apiURL}users/`, userData);
  }
  getUserById(userId: String): Observable<User> {
    return this.http.get<User>(`${this.apiURL}users/${userId}`);
  }
  updateUser(userId: String, userData: User): Observable<User> {
    return this.http.put<User>(`${this.apiURL}users/${userId}`, userData);
  }
  deleteUser(userId: String): Observable<User> {
    return this.http.delete<User>(`${this.apiURL}users/${userId}`);
  }
  getUsersCount(): Observable<number> {
    return this.http
      .get<number>(`${this.apiURL}users/get/count`)
      .pipe(map((objectValue: any) => objectValue.count));
  }
}
