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
  structure: Structure;
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
          sensors.response.forEach(sensor => {            
            if (this.sensors.length == 0) {
              this.sensors.push(sensor);
            } else {
              let id = sensor.id;
              let adv_count = sensor.adv_count;
              let ale_count = sensor.ale_count;
              let temp_sensor = this.sensors[this.sensors.length-1];              
              if (temp_sensor.id == id) {
                if (temp_sensor['adv_count'] > 0 && temp_sensor['ale_count'] == 0) {
                  this.sensors[this.sensors.length-1]['ale_count'] = ale_count;
                } 
                if (temp_sensor['adv_count'] == 0 && temp_sensor['ale_count'] > 0) {
                  this.sensors[this.sensors.length-1]['adv_count'] = adv_count;
                }
              } else {
                this.sensors.push(sensor);
              }
            }
          });
        }
      },
      error => {
        console.log("Error: ", error);
      }
    );    
  }
}
