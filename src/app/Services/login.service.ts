import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login } from 'src/app/Models/login';
import { Subscriber } from '../models/subscriber';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(public http: HttpClient) { }

  URL: string = "api/Subscriber"
  email: string;
  password: string;


  checkUser(login: Login): Observable<Login> {
    return this.http.post<Login>(this.URL + "/login", login);
  }

  register(subscriber: Subscriber): Observable<string> {
    const res = this.http.post<string>(`${this.URL}`, subscriber);
    return res;
  }
}