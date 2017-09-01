import {Injectable} from '@angular/core';
import {AuthHttp} from 'angular2-jwt';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import {AppSettings} from '../appSettings';

import {PageableSortableCollection} from './pageable-sortable-collection.service';
import {Employee} from "../models/employee";

@Injectable()
export class EmployeeService extends PageableSortableCollection<Employee> {

    constructor(protected http: AuthHttp) {
        super(http);
        this.url = AppSettings.API_ENDPOINT + 'employees';
        this.idAttribute = 'employeeId';
    }
}
