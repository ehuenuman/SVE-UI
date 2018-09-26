﻿import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable({providedIn: 'root'})
export class StructureService {
  constructor(private http: HttpClient) { }

    private request(method: 'get'|'post', resource): Observable<any> {
      if (method === 'post') {        
        return this.http.post(environment.apiUrl + resource, "");
      } else if (method === 'get') {
        return this.http.get(environment.apiUrl + resource);
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
