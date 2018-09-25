﻿import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Structure } from '../_models';
import { AuthenticationService, TokenPayload } from './authentication.service';

var httpOptions;

@Injectable({providedIn: 'root'})
export class StructureService {
  constructor(
    private http: HttpClient,
    private auth: AuthenticationService) { }


    private request(method: 'get'|'post', resource): Observable<any> {
      httpOptions = {
        headers: new HttpHeaders({
          'Authorization': 'Bearer '+ this.auth.getToken()
        })
      };
      if (method === 'post') {
        console.log(httpOptions.headers);
        return this.http.post(environment.apiUrl + resource, "", httpOptions);
      } else if (method === 'get') {
        return this.http.get(environment.apiUrl + resource, httpOptions);
      }
    }

    public getAll(): Observable<any> {
      return this.request('post', '/structure');
    }

    public getStructure(id: number): Observable<any> {
      return this.request('get', '/structure/'+id);
    }

    /**
    getById(id: number) {
        return this.http.get(`${environment.apiUrl}/users/` + id);
    }

    register(user: User) {
        return this.http.post(`${environment.apiUrl}/users/register`, user);
    }

    update(user: User) {
        return this.http.put(`${environment.apiUrl}/users/` + user.id, user);
    }

    delete(id: number) {
        return this.http.delete(`${environment.apiUrl}/users/` + id);
    }
     */
}
