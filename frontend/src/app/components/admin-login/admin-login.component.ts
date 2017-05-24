import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorHandlers } from '../../utilities/error-handlers';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent {
  model:any = {};
  loading = false;
  error = '';

  constructor(private router:Router,
              private authenticationService:AuthService) {
  }

  login() {
    this.loading = true;
    this.error = '';
    this.authenticationService.login(this.model.username, this.model.password)
      .finally(() => this.loading = false)
      .subscribe((result) => {
        if (this.router.url == '/adminauth') {
          this.router.navigate(['/admin']);
        } else {
          location.reload();
        }
      }, (error) => {
        this.error = ErrorHandlers.getServerErrorMessage(error, 'Аутентификация не выполнена.');
      });
  }
}
