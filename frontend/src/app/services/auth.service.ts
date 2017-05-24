import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Response, Headers } from '@angular/http';
import { URLSearchParams, QueryEncoder } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import * as _ from 'lodash';

import { AppSettings } from '../appSettings';

@Injectable()
export class AuthService {

  public token:string;
  public username:string;
  public employeeId:number;

  constructor(private http:Http) {
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
    this.username = currentUser && currentUser.username;
    this.employeeId = currentUser && currentUser.employeeId;
  }

  baseUrl:string = AppSettings.API_ENDPOINT + 'auth';

  login(username:string, password:string) {
    let headers = new Headers({'Content-Type': 'application/json;charset=utf-8'});

    return this.http.post(this.baseUrl + '/login', {
      username: username,
      password: password
    }, {headers: headers}).map((resp:Response)=> {
      let token = resp.json() && resp.json()['token'];
      let employeeId = resp.json() && resp.json()['employeeId'];
      if (token) {
        this.token = token;
        this.username = username;
        localStorage.setItem('currentUser', JSON.stringify({
          username: username,
          employeeId: employeeId,
          token: token
        }));
        return true;
      } else {
        return false;
      }
    }).catch((error:any) => {
      return Observable.throw(error);
    });
  }

  isLoggedIn() {
    let params:URLSearchParams = new URLSearchParams();

    params.set('token', this.token);

    return this.http.get(this.baseUrl + '/check', {
      search: params
    }).map((resp:Response)=> {
      return resp.json()['success'];
    }).catch((error:any) => {
      return Observable.throw(error);
    });
  }

  logout():void {
    this.token = null;
    localStorage.removeItem('currentUser');
  }

  private emitErrorSource = new Subject<any>();
  errorEmitted$ = this.emitErrorSource.asObservable();

  emitError(error) {
    this.emitErrorSource.next(error);
  }
}
