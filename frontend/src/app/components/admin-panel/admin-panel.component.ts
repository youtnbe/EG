import { Component, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from "@angular/router";
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss'],
  providers: [AuthService]
})
export class AdminPanelComponent {

  username:string;

  @ViewChild('login')
  private loginModal:ModalComponent;

  constructor(private router:Router, private authenticationService:AuthService) {
    authenticationService.errorEmitted$.subscribe((error) => {
      //тут будет выдаваться сообщение в зависимости от ошибки
      if (error.status == 401 || error.status == 403) {
        this.loginModal.show();
      }
    });
  }

  ngOnInit() {
    this.username = this.authenticationService.username;
  }

  logOut() {
    this.authenticationService.logout();
    this.router.navigate(['adminauth']);
  }

}
