import {Injectable} from '@angular/core';
import {AuthHttp} from 'angular2-jwt';
import {AuthService} from './auth.service';
import {Collection} from './collection';
import * as _ from 'lodash';


import {Response, Headers} from '@angular/http';
import {URLSearchParams, QueryEncoder} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class PageableSortableCollection<T> extends Collection<T> {

    public pageSize: number = 10;

    constructor(protected http: AuthHttp) {
        super(http);

    }

    page(page: number, sortKey?: string, order?: number, filter?: any): Observable<any[]> {
        return this.fetch({
            page: page,
            pageSize: this.pageSize,
            sortKey: sortKey || null,
            order: order || null,
            filter: filter ? JSON.stringify(filter) : null
        });
    }

}
