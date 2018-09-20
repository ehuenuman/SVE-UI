import { Component, OnInit } from '@angular/core';

import { StructureService } from '../_services/structure.service'
import { Structure } from '../_models';

@Component({
  selector: 'app-structure',
  templateUrl: './structure.component.html',
  styleUrls: ['./structure.component.css']
})
export class StructureComponent implements OnInit {

  constructor(
    private _structureService: StructureService
  ) { }

  ngOnInit() {
  }

  structure: Structure;
  structures: Structure[];

  /*getStructures() {
    this._structureService.getStructures()
      .subscribe(data => this.structures = data)
  }*/

}
