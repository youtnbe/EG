import {Injectable, Inject, Optional} from '@angular/core';
import {AuthHttp} from 'angular2-jwt';
import {Response, Headers} from '@angular/http';
import {URLSearchParams, QueryEncoder} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import * as _ from 'lodash';

import {AppSettings} from '../appSettings';

import {AuthService} from './auth.service';
import {PageableSortableCollection} from './pageable-sortable-collection.service';
import {Application} from "../models/application";

@Injectable()
export class ApplicationsService extends PageableSortableCollection<Application> {

    constructor(protected http: AuthHttp) {
        super(http);
        this.url = AppSettings.API_ENDPOINT + 'applications';
        this.idAttribute = 'applicationId';
    }

    create(item: any) {
        return new Application(item);
    }
}
