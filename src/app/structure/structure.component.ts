import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { StructureService, SensorService } from '../_services'

import { Structure, Sensor } from '../_models';

@Component({
  selector: 'app-structure',
  templateUrl: './structure.component.html',
  styleUrls: ['./structure.component.css']
})
export class StructureComponent implements OnInit {
  structure = new Structure();
  sensors: Sensor[] = [];

  constructor(
    private route: ActivatedRoute,
    private structureService: StructureService,
    private sensorService: SensorService
  ) { }

  ngOnInit() {
    this.getStructure();
    this.getSensors();    
  }

  getStructure(): void {
    const id = +this.route.snapshot.paramMap.get('structure_id');
    this.structureService.getStructure(id)
      .subscribe(structure => this.structure = structure.response);
  }

  getSensors(): void {
    const id = +this.route.snapshot.paramMap.get('structure_id');
    this.sensorService.getSensorsOfStructure(id)
      .subscribe(sensors => {
        if (sensors.error) {
          console.log("Error: ", sensors.error);
        } else {          
          this.sensors = sensors.response;
        }
      },
      error => {
        console.log("Error: ", error);
      }
    );    
  }
}
