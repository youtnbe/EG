import {Component, Input, Output, EventEmitter, OnChanges, ViewChild, ContentChild} from '@angular/core';
import {PageableSortableCollection} from '../../services/pageable-sortable-collection.service';
import {Utilities, Dictionaries} from '../../utilities/utilities';
import {Filter} from '../../interfaces/filter.interface';
import {OverlayService} from "../../services/overlay.service";

@Component({
    selector: 'pageable-table',
    templateUrl: './pageable-table.component.html',
    styleUrls: ['./pageable-table.component.scss']
})
export class PageableTableComponent {

    rows: Array<any>;
    @Input() service: PageableSortableCollection<any>;
    @Input() columns: Array<any>;
    @Input() controls: Array<any>;

    @ContentChild("filter") filterComponent: Filter;
    filter: any;

    loading: boolean = false;
    empty: boolean = true;
    filterVisible: boolean = false;

    rowsCount: number;
    pageCount: number;
    currentPage: number = 1;

    utilities = {
        pathResolve: Utilities.pathResolve,
        isFunction: Utilities.isFunction,
        callOrGetValue: Utilities.callOrGetValue
    };

    constructor() {
    }

    ngOnInit() {
        if (this.filterComponent) {
            this.filterComponent.onChangeFilter.subscribe((data) => {
                this.filter = data;
                this.currentPage = 1;
                this.refresh();
            })
        }
    }

    ngOnChanges() {
        this.refresh();
    }

    fetch() {
        this.loadOn();
        return this.service.page(this.currentPage, null, null, this.filter)
            .finally(() => {
                this.loadOff();
            });
    }

    loadPage(pageNumber) {
        if (pageNumber <= this.pageCount && pageNumber >= 1) {
            this.currentPage = pageNumber;
            this.refresh();
        }
    }

    public loadOn() {
        this.loading = true;
    }

    public loadOff() {
        this.loading = false;
    }

    public refresh() {
        this.fetch().subscribe((data) => {
            this.rowsCount = this.service.length;
            this.rows = data;
            this.pageCount = Math.ceil(this.rowsCount / this.service.pageSize);
            if (this.pageCount == 0)
                this.currentPage = 0;
            this.empty = (this.rowsCount == 0);
        }, (error) => {
            OverlayService.error('Не удалось загрузить данные');
        });
    }

    toggleFilter() {
        this.filterVisible = !this.filterVisible;
    }

    setPageSize(n) {
        this.currentPage = 1;
        this.service.pageSize = n;
        this.refresh();
    }
}



