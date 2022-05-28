import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../_services/authentication.service';
import { User } from '../../_models/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  currentUser: User;

  constructor(
    public auth: AuthenticationService
  ) { 
    this.currentUser = this.auth.getUserDetails();
  }

  ngOnInit() {
  }

}
