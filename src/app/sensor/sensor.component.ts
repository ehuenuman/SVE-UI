import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { SensorService } from '../_services';

import { Sensor } from '../_models';

@Component({
  selector: 'app-sensor',
  templateUrl: './sensor.component.html',
  styleUrls: ['./sensor.component.css']
})
export class SensorComponent implements OnInit {
  sensor = new Sensor();
  measures_data = [];

  constructor(
    private route: ActivatedRoute,
    private sensorService: SensorService,
    private location: Location
  ) { }

  ngOnInit(): void {    
    this.getSensor();
    this.getDataPlot()  
  }

  getSensor(): void {
    const structure_id = +this.route.snapshot.paramMap.get('structure_id');
    const sensor_id = +this.route.snapshot.paramMap.get('sensor_id');    
    this.sensorService.getSensor(structure_id, sensor_id)
      .subscribe(
        sensor => this.sensor = sensor.response,
        error => {
          if (error === "Not Found") {
            this.location.back();
          }
        }
      );    
  }

  getDataPlot(): void {
    const sensor_id = +this.route.snapshot.paramMap.get('sensor_id');
    this.sensorService.getDataSensor(sensor_id, 500)
      .subscribe(
        response => this.measures_data = response.data,
        error => {
          console.log(error);
        }
      );
  }
}
