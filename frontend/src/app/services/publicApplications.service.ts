import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import * as _ from 'lodash';

import {AppSettings} from '../appSettings';
import {Application} from '../models/application';

@Injectable()
export class PublicApplicationsService {

    constructor(private http: Http) {
    }

    baseUrl: string = AppSettings.API_ENDPOINT + 'public/applications';

    createApplication(application) {
        const body = JSON.stringify(application);
        let headers = new Headers({'Content-Type': 'application/json;charset=utf-8'});

        return this.http.post(this.baseUrl, body, {headers: headers})
            .map((resp: Response) => resp.json())
            .catch((error: any) => {
                return Observable.throw(error);
            });
    }
}
