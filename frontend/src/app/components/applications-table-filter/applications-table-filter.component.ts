import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder} from '@angular/forms';
import { Filter } from '../../interfaces/filter.interface';
import * as _ from 'lodash';


import { AuthService } from '../../services/auth.service';
import { Employee } from '../../models/employee';
import { EmployeeService } from '../../services/employee.service';

/* import { OrderFormGroup } from './order-form-group';
 import { NgbDateStruct, NgbCalendar, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
 import { NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';
 import { ActivatedRoute } from '@angular/router';
 import { PublicApplicationsService } from '../../services/publicApplications.service';
 import { Router } from "@angular/router";
 */

import { Dictionaries } from '../../utilities/utilities';

@Component({
  selector: 'applications-table-filter',
  templateUrl: './applications-table-filter.component.html',
  styleUrls: ['./applications-table-filter.component.scss'],
  providers: [EmployeeService]
})
export class ApplicationsTableFilterComponent implements Filter {

  public onChangeFilter = new EventEmitter<any>();
  private employees:Employee[];
  private applicationStatuses = Dictionaries.applicationStatuses;

  filterForm:FormGroup;

  constructor(private employeeService:EmployeeService,
              private authenticationService:AuthService) {

    this.employeeService.fetch().subscribe((data) => {
      this.employees = data;
    }, (error) => {
      console.log(error);
    });

    this.buildFilterForm();
  }

  changeFilter(filterValue) {
    let filter:any = {};

    _.forIn(filterValue.statuses, function (value, key) {
      if (value) {
        !filter.status ? filter.status = {} : '';
        !filter.status.$in ? filter.status.$in = [] : '';
        filter.status.$in.push(+key);
      }
    });

    filter['search'] = filterValue.search;
    if (filterValue.workman != -1)
      filter['workman.id'] = filterValue.workman;

    this.onChangeFilter.emit(filter);
  }

  buildFilterForm() {
    this.filterForm = new FormGroup({
      'statuses': this.buildStatusesFormGroup(),
      'search': new FormControl(''),
      'workman': new FormControl(-1)
    });

    this.filterForm.valueChanges.subscribe((data) => {
      this.changeFilter(this.filterForm.value);
    });
  }

  buildStatusesFormGroup() {
    var statuses = {};

    _.forEach(this.applicationStatuses, function (status) {
      statuses[status.id] = new FormControl(false);
    });

    return new FormGroup(statuses);
  }

  selectAllStatuses() {
    let statusesGroup:FormGroup = <FormGroup>this.filterForm.controls['statuses'];
    _.forEach(statusesGroup.controls, (statusControl) => {
      statusControl.setValue(true);
    })
  }

  setWorkman(value) {
    this.filterForm.controls['workman'].setValue(value);
  }

  setWorkmanMe() {
    this.filterForm.controls['workman'].setValue(_.find(this.employees, {id: this.authenticationService.employeeId}).id);
  }

  resetFilter() {
    this.buildFilterForm();
    this.changeFilter(this.filterForm.value);
  }

}

