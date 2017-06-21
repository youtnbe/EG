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

import { AuthService } from './auth.service';
import { PageableSortableCollection } from './pageable-sortable-collection.service';

@Injectable()
export class EmployeeService extends PageableSortableCollection {

  url:string = AppSettings.API_ENDPOINT + 'employees';

  constructor(protected http:Http, protected authService:AuthService) {
    super(http, authService);
  }
}
