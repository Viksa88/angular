import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { User } from '../model/user';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token = localStorage.getItem('crm_token') ?? "";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: 'Bearer '+this.token
    })
  };

  constructor(private router:Router,private http:HttpClient) { }

  isAuthenticated():boolean{
    if (localStorage.getItem('crm_token')!==null) {
        return true;
    }
    return false;
  }
 
  canAccess(){
    if (!this.isAuthenticated()) {
        //redirect to login
        this.router.navigate(['/login']);
    }
  }
  canAuthenticate(){
    if (this.isAuthenticated()) {
      //redirect to dashboard
      this.router.navigate(['/dashboard']);
    }
  }

  register(data:any){
    return this.http
    .post(`${environment.baseUrl}/v1/auth/register/`,data);
  }

  login(data:any){
      return this.http
      .post(`${environment.baseUrl}/v1/auth/login/`,data);
  }

 detail(){
    let token = localStorage.getItem('crm_token');
    return this.http.post<{users:Array<{localId:string,displayName:string}>}>(
        'https://',
        {idToken:token}
    );
  } 

  getUsers(): Observable<User[]> {
    return this.http
      .get(`${environment.baseUrl}/v1/customers`, this.httpOptions)
      .pipe<User[]>(map((data: any) => data));
  }

  updateUser(user: User): Observable<User> {
    const data = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone
    }
    return this.http.patch<User>(`${environment.baseUrl}/v1/customers/${user.id}`, data, this.httpOptions);
  }

  addUser(user: User): Observable<User> {
    const data = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone
    }
    return this.http.post<User>(`${environment.baseUrl}/v1/customers`, data, this.httpOptions);
  }

  deleteUser(id: number): Observable<User> {
    return this.http.delete<User>(`${environment.baseUrl}/v1/customers/${id}`, this.httpOptions);
  }

  deleteUsers(users: User[]): Observable<User[]> {
    return forkJoin(
      users.map((user) =>
        this.http.delete<User>(`${environment.baseUrl}/v1/customers/${user.id}`, this.httpOptions)
      )
    );
  }

  storeToken(token:string){
    localStorage.setItem('crm_token',token);
  }

  getToken() {
    return localStorage.getItem('crm_token');
  }

  removeToken(){
    localStorage.removeItem('crm_token');
  }

}
