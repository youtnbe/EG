import {Observable} from 'rxjs/Observable';

export interface PageableSortableService {

    getPage(page:number, pageSize:number, sortKey?:string, order?:number, filter?:any):Observable<any>;
    getRowCount():number;

}
