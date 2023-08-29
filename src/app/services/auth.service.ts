import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router : Router, private http: HttpClient) { }

  //dummy API Url : https://dummyjson.com/docs/auth username: 'kminchelle', password: '0lelplR',
  loginUrl: string = 'https://dummyjson.com/auth/login';
  
  setToken(token : string) : void {
    localStorage.setItem('token', token);
  }

  getToken() : string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn() {
    return this.getToken();
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }

  login({username, password} : any)  {
    return this.loginFromApi( { username: username, password: password});
  }

  loginFromApi(person: {username: string, password: string}) : Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(person);
    return this.http.post(this.loginUrl, body,{'headers':headers})
  }

}

