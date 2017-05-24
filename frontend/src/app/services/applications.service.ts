import {Injectable, Inject, Optional} from '@angular/core';
import {Http} from '@angular/http';
import {Response, Headers} from '@angular/http';
import {URLSearchParams, QueryEncoder} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import * as _ from 'lodash';

import { AppSettings } from '../appSettings';

import { Application } from '../models/application';
import { PageableSortableService } from './pageable-sortable.service';
import { AuthService } from './auth.service';

@Injectable()
export class ApplicationsService implements PageableSortableService {

  rowsCount:number = 0;
  baseUrl:string = AppSettings.API_ENDPOINT + 'applications';

  constructor(private http:Http,
              private authService:AuthService) {
    this.baseUrl += '/';
  }


  //api
  getApplications(parameters?):Observable<Application[]> {
    let params:URLSearchParams = new URLSearchParams();

    params.set('token', JSON.parse(localStorage.getItem('currentUser')).token);
    _.forIn(parameters, function (value, key) {
      params.set(key, value);
    });

    return this.http.get(this.baseUrl, {
      search: params
    }).map((resp:Response, err)=> {
      let applicationsList = resp.json()['data'];
      this.rowsCount = resp.json()['length'];
      let applications:Application[] = [];
      _.forEach(applicationsList, function (application) {
        application.date_create = new Date(application.date_create);
        application.task.date = new Date(application.task.date);
        applications.push(application);
      });
      return applications;
    }).catch((error:any) => {
      return Observable.throw(error);
    });
  }

  getApplicationById(id):Observable<Application> {
    let params:URLSearchParams = new URLSearchParams();

    params.set('token', JSON.parse(localStorage.getItem('currentUser')).token);

    return this.http.get(this.baseUrl + id, {
      search: params
    }).map((resp:Response, err)=> {
      let application = resp.json()['data'];
      application.date_create = new Date(application.date_create);
      application.task.date = new Date(application.task.date);
      return application;
    }).catch((error:any) => {
      return Observable.throw(error);
    });
  }


  deleteAllApplications() {
    let params:URLSearchParams = new URLSearchParams();
    params.set('token', JSON.parse(localStorage.getItem('currentUser')).token);
    return this.http.delete(this.baseUrl, {
      search: params
    }).catch((error:any) => {
      return Observable.throw(error);
    });
  }

  deleteApplication(id:string) {
    let params:URLSearchParams = new URLSearchParams();
    params.set('token', JSON.parse(localStorage.getItem('currentUser')).token);
    return this.http.delete(this.baseUrl + id, {
      search: params
    }).map((resp:Response) => resp.json()).catch((error:any) => {
      return Observable.throw(error);
    });
  }

  createApplication(application) {
    const body = JSON.stringify(application);
    let headers = new Headers({'Content-Type': 'application/json;charset=utf-8'});
    headers.set('token', this.authService.token);
    return this.http.post(this.baseUrl, body, {headers: headers})
      .map((resp:Response) => resp.json())
      .catch((error:any) => {
        return Observable.throw(error);
      });
  }

  updateApplication(application) {
    const body = JSON.stringify(application);
    let headers = new Headers({'Content-Type': 'application/json;charset=utf-8'});
    headers.set('token', this.authService.token);
    return this.http.put(this.baseUrl, body, {headers: headers})
      .map((resp:Response) => resp.json())
      .catch((error:any) => {
        return Observable.throw(error);
      });
  }

  getApplicationsCount() {
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

  //pageable api
  getPage(page:number, pageSize:number, sortKey?:string, order?:number, filter?:any):Observable<Application[]> {
    return this.getApplications({
      page: page,
      pageSize: pageSize,
      sortKey: sortKey || null,
      order: order || null,
      filter: filter ? JSON.stringify(filter) : null
    });
  }

  getRowCount():number {
    return this.rowsCount;
  }
}
