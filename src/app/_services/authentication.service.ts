import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


export interface UserDetails {
  id: number;
  username: string;
  password: string;
  salt: string;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  date_joined: string;
  last_login: string;
  enterprise_id: number;
  enterprise_name: string;
  profile_id: number;
  profile_name: string;
  profile_description: string;
  exp: number;
  iat: number;
}

interface TokenResponse {
  token: string;
}

export interface TokenPayload {
  username: string;
  password: string;
  name?: string;
}

@Injectable()
export class AuthenticationService {
  private token: string;

  constructor(private http: HttpClient, private router: Router) {}

  private saveToken(token: string): void {
    localStorage.setItem('mean-token', token);
    this.token = token;
  }

  public getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('mean-token');
    } 
    return this.token;
  }

  public getUserDetails(): UserDetails {
    const token = this.getToken();
    let payload;
    if (token) {
      payload = token.split('.')[1];
      payload = this.b64DecodeUnicode(payload);
      //console.log(JSON.parse(payload));
      return JSON.parse(payload);
    } else {
      return null;
    }
  }

  public isLoggedIn(): boolean {
    const user = this.getUserDetails();
    if (user) {
      return user.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }
  
  private request(method: 'post'|'get', type: 'login'|'register', user?: TokenPayload): Observable<any> {
    let base;
  
    if (method === 'post') {
      base = this.http.post(`/api/auth/${type}`, user);
    } else {
      base = this.http.get(`/api/auth/${type}`, { headers: { Authorization: `Bearer ${this.getToken()}` }});
    }
  
    const request = base.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token);
        }
        return data;
      })
    );
  
    return request;
  }

  public register(user: TokenPayload): Observable<any> {
    return this.request('post', 'register', user);
  }
  
  public login(user: TokenPayload): Observable<any> {
    return this.request('post', 'login', user);
  }

  public logout(): void {
    this.token = '';
    window.localStorage.removeItem('mean-token');
    this.router.navigateByUrl('/');
  }
  
  /**
   * Codifica UTF-8 a Base64.
   * @param str - cadena en utf-8 a codificar.
   */
  private b64EncodeUnicode(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
        return String.fromCharCode(parseInt(p1, 16))
    }))
  }

  /**
   * Decodificador de Base64 a UTF-8.
   * @param str - cadena en base64 a decodificar.
   */
  private b64DecodeUnicode(str) {
    return decodeURIComponent(Array.prototype.map.call(atob(str), function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    }).join(''))
  }

}

