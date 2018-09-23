import { Component, OnInit } from '@angular/core';

import { User, Structure } from '../_models';
import { StructureService, AuthenticationService } from '../_services';



@Component({templateUrl: 'home.component.html'})
export class HomeComponent implements OnInit {

  private structures: Structure[] = [];
  private currentUser: User;

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
          console.log("Error: ", structures.error )
        } else {
          this.structures = structures.response[0];
          console.log(this.structures);
        }
      },
      error => {
        console.log("Error", error);
      }
    );
  }
}