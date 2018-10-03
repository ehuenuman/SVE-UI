import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { SensorService } from '../_services';

import { Sensor } from '../_models';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Component({
  selector: 'app-sensor',
  templateUrl: './sensor.component.html',
  styleUrls: ['./sensor.component.css']
})
export class SensorComponent implements OnInit {
  sensor = new Sensor();
  measures_data;
  graph;

  constructor(
    private route: ActivatedRoute,
    private sensorService: SensorService,
    private location: Location
  ) { }

  ngOnInit(): void {    
    this.getSensor();
    this.renderPlot()  
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

  renderPlot(): void {
    const sensor_id = +this.route.snapshot.paramMap.get('sensor_id');
    this.sensorService.getDataSensor(sensor_id, 500)
      .subscribe(
        response => {
          this.measures_data = response.response;
          
          if (this.measures_data.length > 0 ) {
            var trace1 = {
              type: "scatter",
              mode: "lines+markers",
              name: this.sensor.name,         
              x: this.measures_data.xAxis,
              y: this.measures_data.yAxis,
              line: { color: '#7f7f7f'}
            }

            this.graph = {
              data: [trace1],
              layout: {               
                title: "Valores obtenidos por " + this.sensor.name,
                showlegend: true,
                legend: { 
                  "x": 0,
                  "y": 1.15,
                  "orientation": "h" },
                yaxis: { title: this.sensor.type_sensor_unit },
                shapes: [
                  {
                    type: 'rect',
                    xref: 'paper',
                    yref: 'y',
                    x0: 0,
                    y0: this.measures_data.thresholds.adv1.value,
                    x1: 1,
                    y1: this.measures_data.thresholds.ale1.value,
                    fillcolor: this.measures_data.thresholds.adv1.type_threshold_color,
                    opacity: 0.5,
                    line: {
                      width: 0
                    }
                  },
                  {
                    type: 'rect',
                    xref: 'paper',
                    yref: 'y',
                    x0: 0,
                    y0: this.measures_data.thresholds.adv2.value,
                    x1: 1,
                    y1: this.measures_data.thresholds.ale2.value,
                    fillcolor: this.measures_data.thresholds.adv2.type_threshold_color,
                    opacity: 0.5,
                    line: {
                      width: 0
                    }
                  },
                  {
                    type: 'rect',
                    xref: 'paper',
                    yref: 'y',
                    x0: 0,
                    y0: this.measures_data.historical.minValue.value,
                    x1: 1,
                    y1: this.measures_data.thresholds.ale1.value,
                    fillcolor: this.measures_data.thresholds.ale1.type_threshold_color,
                    opacity: 0.5,
                    line: {
                      width: 0
                    }
                  },
                  {
                    type: 'rect',
                    xref: 'paper',
                    yref: 'y',
                    x0: 0,
                    y0: this.measures_data.thresholds.ale2.value,
                    x1: 1,
                    y1: this.measures_data.historical.maxValue.value,
                    fillcolor: this.measures_data.thresholds.ale1.type_threshold_color,
                    opacity: 0.5,
                    line: {
                      width: 0
                    }
                  },
                  {
                    type: 'rect',
                    xref: 'paper',
                    yref: 'y',
                    x0: 0,
                    y0: this.measures_data.thresholds.adv1.value,
                    x1: 1,
                    y1: this.measures_data.thresholds.adv2.value,
                    fillcolor: '#0f8e0f',
                    opacity: 0.5,
                    line: {
                      width: 0
                    }
                  }
                ]
              }
            };
          }
        },
        error => {
          console.log(error);
        }
      );
  }
}
