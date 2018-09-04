import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User, Structure } from '../_models';
import { UserService } from '../_services';
import { StructureService } from '../_services';

@Component({templateUrl: 'home.component.html'})

export class HomeComponent implements OnInit {

    currentUser: User;
    users: User[] = [];
    structures: Structure[] = [];

    constructor(
        //private userService: UserService,
        private structureService: StructureService) {
            //this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        }   

    ngOnInit() {
        this.loadAllStructures();
    }

    /**
    deleteUser(id: number) {
        this.userService.delete(id).pipe(first()).subscribe(() => { 
            this.loadAllStructures() 
        });
    }
     */

    private loadAllStructures() {
        this.structureService.getAll().pipe(first()).subscribe(structures => { 
            this.structures = structures; 
            console.log(structures);
        });
    }
}