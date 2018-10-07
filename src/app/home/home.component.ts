import { Component, OnInit } from '@angular/core';

import { User, Structure } from '../_models';
import { StructureService, AuthenticationService } from '../_services';



@Component({templateUrl: 'home.component.html'})
export class HomeComponent implements OnInit {

  structures: Structure[] = [];
  currentUser: User;

  constructor(
    private auth: AuthenticationService,
    private structureService: StructureService) {
      this.currentUser = this.auth.getUserDetails();
    }

  ngOnInit() {
    this.loadAllStructures();    
  }

  private loadAllStructures() {
    this.structureService.getAll().subscribe(
      structures => {
        if (structures.error) {
          console.log("Error: ", structures.error);
        } else {
          structures.response[0].forEach(structure => {
            if (this.structures.length == 0) {
              this.structures.push(structure);
            } else {
              var id = structure.id;
              var adv_count = structure.adv_count;
              var ale_count = structure.ale_count;
              var temp_structure = this.structures[this.structures.length-1];
              //console.log(temp_structure);
              if (temp_structure.id == id) {
                //console.log("is same element");
                if (temp_structure.adv_count > 0 && temp_structure.ale_count == 0) {
                  this.structures[this.structures.length-1].ale_count = ale_count;
                } 
                if (temp_structure.adv_count == 0 && temp_structure.ale_count > 0) {
                  this.structures[this.structures.length-1].adv_count = adv_count;
                }
              } else {
                this.structures.push(structure);
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