import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable({providedIn: 'root'})
export class SensorService {
  constructor(private http: HttpClient) { }


    private request(method: 'get'|'post', resource, body?): Observable<any> {      
      if (method === 'post') {
        return this.http.post(environment.apiUrl + resource, body);
      } else if (method === 'get') {
        return this.http.get(environment.apiUrl + resource);
      }
    }

    public getSensors(id: number): Observable<any> {
      var body = {
        "structure_id": id
      }
      return this.request('post', '/sensor', body);
    }
}
