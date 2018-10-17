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
    const structure_id = +this.route.snapshot.paramMap.get('structure_id');
    this.sensorService.getDataSensor(sensor_id, 600, structure_id)
      .subscribe(
        response => {
          this.measures_data = response.response;
          
          var data = [];

          if ( this.measures_data.xAxis && this.measures_data.yAxis ) {
            var trace1 = {
              type: "scatter",
              mode: "lines+markers",
              name: this.sensor.name,         
              x: this.measures_data.xAxis,
              y: this.measures_data.yAxis,
              line: { color: '#7f7f7f'}
            }

            data.push(trace1);
          }

          // Si no existen historicos se remplazan por el límite de la alerta.
          if ( !this.measures_data.historical ) {
            var minValue = this.measures_data.thresholds.ale1.value;
            var maxValue = this.measures_data.thresholds.ale2.value;
          } else {
            var minValue = this.measures_data.historical.minValue;
            var maxValue = this.measures_data.historical.maxValue;
          }

          this.graph = {
            data: data,
            layout: {               
              title: "Valores obtenidos por " + this.sensor.name,
              showlegend: true,
              legend: { 
                "x": 0,
                "y": 1.15,
                "orientation": "h" },
              yaxis: { 
                title: this.sensor.type_sensor_unit                
              },
              shapes: [
                { // Advertencia superior
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
                { // Advertencia inferior
                  type: 'rect',
                  xref: 'paper',
                  yref: 'y',
                  x0: 0,
                  y0: this.measures_data.thresholds.ale2.value,
                  x1: 1,
                  y1: this.measures_data.thresholds.adv2.value,
                  fillcolor: this.measures_data.thresholds.adv2.type_threshold_color,
                  opacity: 0.5,
                  line: {
                    width: 0
                  }
                },
                { // Alerta inferior
                  type: 'rect',
                  xref: 'paper',
                  yref: 'y',
                  x0: 0,
                  y0: (minValue < this.measures_data.thresholds.ale1.value) ? minValue - 3 : this.measures_data.thresholds.ale1.value - 3,
                  x1: 1,
                  y1: this.measures_data.thresholds.ale1.value,
                  fillcolor: this.measures_data.thresholds.ale1.type_threshold_color,
                  opacity: 0.5,
                  line: {
                    width: 0
                  }
                },
                { // Alerta superior
                  type: 'rect',
                  xref: 'paper',
                  yref: 'y',
                  x0: 0,
                  y0: this.measures_data.thresholds.ale2.value,
                  x1: 1,
                  y1: (maxValue > this.measures_data.thresholds.ale2.value) ? maxValue + 3 : this.measures_data.thresholds.ale2.value + 3,
                  fillcolor: this.measures_data.thresholds.ale2.type_threshold_color,
                  opacity: 0.5,
                  line: {
                    width: 0
                  }
                },
                { // Zona segura
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
        },
        error => {
          console.log(error);
        }
      );
  }
}
