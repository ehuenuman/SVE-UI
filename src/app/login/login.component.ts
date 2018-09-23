import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService, TokenPayload } from '../_services';

@Component({
  templateUrl: 'login.component.html'
})

export class LoginComponent  {
  credentials: TokenPayload = {
    username: '',
    password: ''
  };

  constructor(
    private router: Router,
    private auth: AuthenticationService) {}

  login() {
    this.auth.login(this.credentials).subscribe(() => {
      this.router.navigateByUrl('/home');
    }, (err) => {
      console.error(err);
    });
  }
}
