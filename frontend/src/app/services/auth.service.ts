import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Router} from "@angular/router";
import {Response, Headers, RequestOptions} from '@angular/http';
import {URLSearchParams, QueryEncoder} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import * as _ from 'lodash';
import {JwtHelper, tokenNotExpired} from "angular2-jwt";

import {AppSettings} from '../appSettings';

@Injectable()
export class AuthService {

    baseUrl: string;

    public token: string;
    username: string;
    employeeId: number;
    jwtHelper: JwtHelper = new JwtHelper();

    constructor(protected http: Http,
                protected router: Router) {
        this.token = localStorage.getItem('token');
        if (this.token) {
            this.username = this.decodeToken(this.token)['username'];
            this.employeeId = this.decodeToken(this.token)['employeeId'];
        }
        this.baseUrl = AppSettings.API_ENDPOINT + 'auth';
    }

    login(username: string, password: string) {
        let headers = new Headers({'Content-Type': 'application/json;charset=utf-8'});
        let body = JSON.stringify({username: username, password: password});
        let options = new RequestOptions({headers: headers, body: body});

        return this.http.post(`${this.baseUrl}/login`, body, options)
            .map((resp: Response)=> {
                let token = resp.json() && resp.json()['token'];
                let employeeId = resp.json() && resp.json()['employeeId'];
                if (token) {
                    this.token = token;
                    localStorage.setItem('token', token);
                    this.username = this.decodeToken(this.token)['username'];
                    this.employeeId = this.decodeToken(this.token)['employeeId'];
                    return true;
                } else {
                    return false;
                }
            }).catch((error: any) => {
                return Observable.throw(error);
            });
    }

    isLoggedIn() {
        return tokenNotExpired();
    }

    logout(): void {
        this.token = null;
        localStorage.removeItem('currentUser');
    }

    /*
     private emitErrorSource = new Subject<any>();
     errorEmitted$ = this.emitErrorSource.asObservable();

     emitError(error) {
     this.emitErrorSource.next(error);
     }
     */
    decodeToken(token: string): any {
        return this.jwtHelper.decodeToken(token);
    }
}
