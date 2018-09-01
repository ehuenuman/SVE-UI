import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Structure } from '../_models/structure';

@Injectable({
  providedIn: 'root'
})
export class StructureService {

  constructor(
    private _http: HttpClient
  ) { }

  getStructure(structure: Structure) {
    return this._http.get('/structure/' + structure.id)
  }

  getStructures()  {
    return this._http.get('/structure')
  }


}
