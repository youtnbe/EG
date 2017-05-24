import { Component, Input, OnChanges, SimpleChange, ChangeDetectionStrategy, NgZone, ViewChild } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { ModalComponent } from '../modal/modal.component';
import { PageableTableComponent } from '../pageable-table/pageable-table.component';
import { Utilities, Dictionaries } from '../../utilities/utilities';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'admin-employees-list',
  templateUrl: './admin-employees-list.component.html',
  styleUrls: ['./admin-employees-list.component.scss'],
  providers: [EmployeeService]
})
export class AdminEmployeesListComponent {

  @ViewChild('confirm')
  private confirmModal:ModalComponent;
  @ViewChild(PageableTableComponent)
  private table:PageableTableComponent;


  private deletedEmployeeId:string = null;

  private tableFormat = [{
    name: 'id',
    header: '№'
  }, {
    name: 'username',
    header: 'Имя пользователя'
  }, {
    name: 'firstName',
    header: 'Имя'
  }, {
    name: 'lastName',
    header: 'Фамилия'
  }, {
    name: 'email',
    header: 'E-mail'
  }, {
    name: 'telephone',
    header: 'Телефон'
  }, {
    name: 'telegram',
    header: 'Telegram'
  }];

  constructor(private employeeService:EmployeeService, private authenticationService:AuthService) {
  }

  onError(error) {
    if (error.status == 401 || error.status == 403) {
      this.authenticationService.emitError(error);
    }
  }

  onDeleteRow(id) {
    this.deletedEmployeeId = id;
    this.confirmModal.show();
  }

  onDeleteConfirm(answer:boolean) {
    this.confirmModal.hide();
    this.table.loadOn();
    if (answer) {
      if (this.deletedEmployeeId) {
        this.employeeService.deleteEmployee(this.deletedEmployeeId).subscribe((data) => {
          this.table.refresh();
          this.deletedEmployeeId = null;
        }, (error) => {
          this.table.loadOff();
          this.deletedEmployeeId = null;
          if (error.status == 401 || error.status == 403) {
            this.authenticationService.emitError(error);
          }
        });
      }
    } else {
      this.table.loadOff();
      this.deletedEmployeeId = null;
    }
  }

}
