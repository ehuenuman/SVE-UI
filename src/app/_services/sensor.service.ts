import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { AuthenticationService } from './authentication.service';

var httpOptions;

@Injectable({providedIn: 'root'})
export class SensorService {
  constructor(
    private http: HttpClient,
    private auth: AuthenticationService) { }


    private request(method: 'get'|'post', resource, body?): Observable<any> {
      httpOptions = {
        headers: new HttpHeaders({
          'Authorization': 'Bearer '+ this.auth.getToken()
        })
      };
      
      if (method === 'post') {
        return this.http.post(environment.apiUrl + resource, body, httpOptions);
      } else if (method === 'get') {
        return this.http.get(environment.apiUrl + resource, httpOptions);
      }
    }

    public getSensors(id: number): Observable<any> {
      var body = {
        "structure_id": id
      }
      return this.request('post', '/sensor', body);
    }
}
