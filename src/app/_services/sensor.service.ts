import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable({providedIn: 'root'})
export class SensorService {
  constructor(private http: HttpClient) { }


    private request(method: 'get'|'post', uri, body?): Observable<any> {      
      if (method === 'post') {
        return this.http.post(environment.apiUrl + uri, body);
      } else if (method === 'get') {
        return this.http.get(environment.apiUrl + uri);
      }
    }
    /**
     * Realiza la consulta GET y obtiene los sensores de
     * una estructura junto a sus alertas.
     * @param structure_id - identificador de la estructura.
     */
    public getSensorsOfStructure(structure_id: number): Observable<any> {      
      return this.request('get', '/structure/' + structure_id + '/sensor');
    }

    /**
     * Realiza la consulta GET y obtiene los datos de un 
     * sensor identificado con 'sensor_id'.
     * @param sensor_id - identificador del sensor. 
     */
    public getSensor(structure_id: number, sensor_id: number): Observable<any> {
      return this.request('get', '/structure/' + structure_id + '/sensor/' + sensor_id);
    }
}
