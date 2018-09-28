import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SensorService } from '../_services';

import { Sensor } from '../_models';

@Component({
  selector: 'app-sensor',
  templateUrl: './sensor.component.html',
  styleUrls: ['./sensor.component.css']
})
export class SensorComponent implements OnInit {
  sensor: Sensor;

  constructor(
    private route: ActivatedRoute,
    private sensorService: SensorService
  ) { }

  ngOnInit() {
    this.getSensor();
  }

  getSensor(): void {
    const structure_id = +this.route.snapshot.paramMap.get('structure_id');
    const sensor_id = +this.route.snapshot.paramMap.get('sensor_id');    
    this.sensorService.getSensor(structure_id, sensor_id)
      .subscribe(sensor => this.sensor = sensor.response)
  }
}
