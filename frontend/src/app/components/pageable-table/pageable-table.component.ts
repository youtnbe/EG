import { Component, Input, Output, EventEmitter, OnChanges, ViewChild, ContentChild } from '@angular/core';
import { Application } from '../../models/application';
import { PageableSortableService } from '../../services/pageable-sortable.service';
import { ModalComponent } from '../modal/modal.component';
import { Utilities, Dictionaries } from '../../utilities/utilities';
import { Filter } from '../../interfaces/filter.interface';

@Component({
  selector: 'pageable-table',
  templateUrl: './pageable-table.component.html',
  styleUrls: ['./pageable-table.component.scss']
})
export class PageableTableComponent {

  rows:Array<any>;
  @Input() service:PageableSortableService;
  @Input() columns:Array<any>;
  @Input() pageSize:number = 50;

  @Output() onDeleteRow = new EventEmitter<boolean>();
  @Output() onEditRow = new EventEmitter<boolean>();
  @Output() onError = new EventEmitter<boolean>();

  @ContentChild("filter") filterComponent:Filter;
  filter:any;

  loading:boolean = false;
  empty:boolean = true;
  filterVisible:boolean = false;

  rowsCount:number;
  pageCount:number;
  currentPage:number = 1;

  utilities = {
    pathResolve: Utilities.pathResolve,
    isFunction: Utilities.isFunction
  };

  constructor() {
  }

  ngOnInit() {
    this.refresh();
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
    return this.service.getPage(this.currentPage, this.pageSize, null, null, this.filter)
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

  deleteRow(id) {
    this.onDeleteRow.emit(id);
  }

  editRow(row) {
    this.onEditRow.emit(row);
  }

  public loadOn() {
    this.loading = true;
  }

  public loadOff() {
    this.loading = false;
  }

  public refresh() {
    this.fetch().subscribe((data) => {
      this.rowsCount = this.service.getRowCount();
      this.rows = data;
      this.pageCount = Math.ceil(this.rowsCount / this.pageSize);
      if (this.pageCount == 0)
        this.currentPage = 0;
      this.empty = (this.rowsCount == 0);
    }, (error) => {
      this.onError.emit(error);
    });
  }

  toggleFilter() {
    this.filterVisible = !this.filterVisible;
  }

  setPageSize(n) {
    this.pageSize = n;
    this.refresh();
  }
}



