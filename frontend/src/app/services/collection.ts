import {Injectable} from '@angular/core';
import { Http } from '@angular/http';
import { AuthService } from './auth.service';
import * as _ from 'lodash';


import {Response, Headers} from '@angular/http';
import {URLSearchParams, QueryEncoder} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class Collection {

  public items:any[] = [];
  public length:number = 0;
  url:string = '';

  constructor(protected http:Http, protected authService:AuthService) {
  }

  fetch(parameters?):Observable<any[]> {
    let params:URLSearchParams = new URLSearchParams();
    params.set('token', this.authService.token);
    _.forIn(parameters, function (value, key) {
      params.set(key, value);
    });

    return this.http.get(this.url, {
      search: params
    }).map((resp:Response)=> {
      this.length = resp.json()['length'];
      this.items = resp.json()['data'];
      return resp.json()['data'];
    }).catch((error:any) => {
      return Observable.throw(error);
    });
  }



  item(id):Observable<any> {
    let params:URLSearchParams = new URLSearchParams();

    params.set('token', this.authService.token);

    return this.http.get(this.url + '/' + id, {
      search: params
    }).map((resp:Response, err)=> {
      let item = resp.json()['data'];
      return item;
    }).catch((error:any) => {
      return Observable.throw(error);
    });
  }

  push(item):Observable<any> {
    const body = JSON.stringify(item);
    let headers = new Headers({'Content-Type': 'application/json;charset=utf-8'});
    headers.set('token', this.authService.token);

    return this.http.post(this.url, body, {headers: headers})
      .map((resp:Response) => resp.json())
      .catch((error:any) => {
        return Observable.throw(error);
      });
  }

  save(item):Observable<any> {
    const body = JSON.stringify(item);
    let headers = new Headers({'Content-Type': 'application/json;charset=utf-8'});
    headers.set('token', this.authService.token);

    return this.http.put(this.url, body, {headers: headers})
      .map((resp:Response) => resp.json())
      .catch((error:any) => {
        return Observable.throw(error);
      });
  }

  remove(id?:any) {
    let params:URLSearchParams = new URLSearchParams();
    params.set('token', JSON.parse(localStorage.getItem('currentUser')).token);
    id ? params.set('id', id) : '';

    return this.http.delete(this.url, {
      search: params
    }).map((resp:Response) => resp.json())
      .catch((error:any) => {
        return Observable.throw(error);
      });
  }

}
