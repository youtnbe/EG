import {Injectable} from '@angular/core';
import {AuthHttp} from 'angular2-jwt';
import {AuthService} from './auth.service';
import * as _ from 'lodash';

import {Response, Headers} from '@angular/http';
import {URLSearchParams, QueryEncoder} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class Collection<T> {

    public items: T[] = [];
    public length: number = 0;
    protected url: string = '';
    protected idAttribute: string = 'applicationId';

    constructor(protected http: AuthHttp) {
    }

    create(item?: any) {
        return item;
    }

    fetch(options?: any): Observable<T[]> {
        let searchParams: URLSearchParams = new URLSearchParams();
        for (var key in options) {
            searchParams.set(key, options[key]);
        }

        return this.http.get(this.url, {search: searchParams})
            .map((resp: Response)=> {
                this.length = resp.json()['length'];
                let data = resp.json()['data'];
                let list: T[] = data.map(item => this.create(item));
                list.sort((a, b) => a[this.idAttribute] > b[this.idAttribute] ? 1 : -1);
                this.items = list;
                return list;
            })
            .catch((error: any) => {
                return Observable.throw(error);
            });
    }


    item(id): Observable<T> {
        return this.http.get(`${this.url}/${id}`)
            .map((resp: Response)=> this.create(resp.json()))
            .catch((error: any) => {
                return Observable.throw(error);
            });
    }

    push(item: T): Observable<any> {
        const body = JSON.stringify(item);
        let headers = new Headers({'Content-Type': 'application/json;charset=utf-8'});

        return this.http.post(this.url, body, {headers: headers})
            .map((resp: Response) => resp.json())
            .catch((error: any) => {
                return Observable.throw(error);
            });
    }

    save(item: T): Observable<any> {
        console.log(item);
        console.log(this.idAttribute);
        let body = JSON.stringify(item);
        let headers = new Headers({'Content-Type': 'application/json;charset=utf-8'});

        return this.http.put(`${this.url}/${item[this.idAttribute]}`, body, {headers: headers})
            .map((resp: Response) => resp.json())
            .catch((error: any) => {
                return Observable.throw(error);
            });
    }

    remove(item: T): Observable<any> {
        let requestUrl = `${this.url}/${item[this.idAttribute]}`;
        let headers = new Headers({'Content-Type': 'application/json;charset=utf-8'});

        return this.http.delete(requestUrl, {headers: headers})
            .map((resp: Response) => resp.json())
            .catch((error: any) => {
                return Observable.throw(error);
            });
    }

}
