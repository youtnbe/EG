import {Component, Input, OnChanges, SimpleChange, ChangeDetectionStrategy, NgZone, ViewChild} from '@angular/core';
import {EmployeeService} from '../../services/employee.service';
//import {ModalComponent} from '../modal/modal.component';
import {PageableTableComponent} from '../pageable-table/pageable-table.component';
import {Utilities, Dictionaries} from '../../utilities/utilities';
import {AuthService} from '../../services/auth.service';
import {Router, ActivatedRoute} from "@angular/router";
import {OverlayService} from "../../services/overlay.service";

@Component({
    selector: 'admin-employees-list',
    templateUrl: './admin-employees-list.component.html',
    styleUrls: ['./admin-employees-list.component.scss'],
    providers: [EmployeeService]
})
export class AdminEmployeesListComponent {

    @ViewChild(PageableTableComponent)
    table: PageableTableComponent;

    tableFormat = [{
        name: 'employeeId',
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

    tableControls = [
        {
            text: '<i class="material-icons">edit</i>',
            action: (employee) => {
                this.router.navigate(['./edit', employee.employeeId], {relativeTo: this.route});
            }
        },
        {
            text: '<i class="material-icons">delete_forever</i>',
            action: (employee) => {
                OverlayService.confirm().then(data => {
                    if (data == true) {
                        this.table.loadOn();
                        this.employeeService.remove(employee)
                            .finally(() => this.table.loadOff())
                            .subscribe(data => {
                                this.table.refresh();
                                console.log(data);
                            }, error => {
                                console.log(error);
                            });
                    }
                });
            }
        }];


    constructor(private employeeService: EmployeeService,
                private route: ActivatedRoute,
                private router: Router) {
    }
}
