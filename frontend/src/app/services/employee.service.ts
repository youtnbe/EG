import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Response, Headers} from '@angular/http';
import {URLSearchParams, QueryEncoder} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import * as _ from 'lodash';

import { AppSettings } from '../appSettings';

import { Employee } from '../models/employee';
import { PageableSortableService } from './pageable-sortable.service';
import { AuthService } from './auth.service';

@Injectable()
export class EmployeeService implements PageableSortableService {

  rowsCount:number = 0;
  baseUrl:string = AppSettings.API_ENDPOINT + 'employees';

  constructor(private http:Http, private authService:AuthService) {
  }


  getEmployees(parameters?):Observable<Employee[]> {
    let params:URLSearchParams = new URLSearchParams();

    params.set('token', this.authService.token);
    _.forIn(parameters, function (value, key) {
      params.set(key, value);
    });

    return this.http.get(this.baseUrl, {
      search: params
    }).map((resp:Response)=> {
      let employeesList = resp.json()['data'];
      this.rowsCount = resp.json()['length'];
      let employees:Employee[] = [];

      _.forEach(employeesList, function (application) {
        employees.push(application);
      });
      return employees;
    }).catch((error:any) => {
      return Observable.throw(error);
    });
  }


  getPage(page:number, pageSize:number, sortKey?:string, order?:number):Observable<Employee[]> {
    return this.getEmployees({
      page: page,
      pageSize: pageSize,
      sortKey: sortKey || null,
      order: order || null
    });
  }

  getRowCount():number {
    return this.rowsCount;
  }

  deleteAllEmployees() {
    let params:URLSearchParams = new URLSearchParams();

    params.set('token', JSON.parse(localStorage.getItem('currentUser')).token);
    return this.http.delete(this.baseUrl, {
      search: params
    }).catch((error:any) => {
      return Observable.throw(error);
    });
  }

  deleteEmployee(id:string) {
    let params:URLSearchParams = new URLSearchParams();

    params.set('token', JSON.parse(localStorage.getItem('currentUser')).token);
    params.set('id', id);
    return this.http.delete(this.baseUrl, {
      search: params
    }).map((resp:Response) => resp.json()).catch((error:any) => {
      return Observable.throw(error);
    });
  }

  createEmployee(application) {
    const body = JSON.stringify(application);
    let headers = new Headers({'Content-Type': 'application/json;charset=utf-8'});
    headers.set('token', this.authService.token);
    return this.http.post(this.baseUrl, body, {headers: headers})
      .map((resp:Response) => resp.json())
      .catch((error:any) => {
        return Observable.throw(error);
      });
  }

  getEmployeesCount() {
    let params:URLSearchParams = new URLSearchParams();
    params.set('token', this.authService.token);
    return this.http.get(this.baseUrl + '/length', {
      search: params
    }).map((resp:Response)=> {
      return resp.json()['length'];
    }).catch((error:any) => {
      return Observable.throw(error);
    });
  }
}
