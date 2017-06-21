import { Component, Input, OnChanges, SimpleChange, ChangeDetectionStrategy, NgZone, ViewChild } from '@angular/core';
import { ApplicationsService } from '../../services/applications.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ModalComponent } from '../modal/modal.component';
import { PageableTableComponent } from '../pageable-table/pageable-table.component';
import { Utilities, Dictionaries } from '../../utilities/utilities';
import { AuthService } from '../../services/auth.service';
import * as _ from 'lodash';

@Component({
  selector: 'admin-applications-list',
  templateUrl: './admin-applications-list.component.html',
  styleUrls: ['./admin-applications-list.component.scss'],
  providers: [ApplicationsService]
})
export class AdminApplicationsListComponent {

  @ViewChild('confirm')
  private confirmModal:ModalComponent;
  @ViewChild(PageableTableComponent)
  private table:PageableTableComponent;

  private deletedApplicationId:string = null;

  private tableFormat = [{
    name: 'number',
    header: '#',
    type: 'number'
  }, {
    name: 'date_create',
    header: 'Дата подачи заявки',
    type: 'date',
    format: function (raw) {
      raw = new Date(raw);
      return raw.toLocaleString("ru", {
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
      });
    }
  }, {
    name: 'customer.fio',
    header: 'Заказчик',
    type: 'string'
  }, {
    name: 'task.name',
    header: 'Краткое описание',
    type: 'string'

  }, {
    name: 'task.date',
    header: 'Дата исполнения',
    type: 'date',
    format: function (raw) {
      raw = new Date(raw);
      return raw.toLocaleString("ru", {
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
      });
    }
  }, {
    name: 'status',
    header: 'Статус',
    type: 'string',
    format: function (raw) {
      let status = Dictionaries.getApplicationStatusById(raw);
      return '<span class="app-status-table ' + status.class + '">' + status.name + '</span>';
    }
  }, {
    name: 'workman',
    header: 'Исполнитель',
    type: 'string',
    format: function (raw) {
      return raw ? raw.firstName + ' ' + raw.lastName : 'Не назначен';
    }
  }];

  constructor(private applicationsService:ApplicationsService,
              private route:ActivatedRoute,
              private router:Router,
              private authenticationService:AuthService) {
  }

  onError(error) {
    if (error.status == 401 || error.status == 403) {
      this.authenticationService.emitError(error);
    }
  }

  onDeleteRow(id) {
    this.deletedApplicationId = id;
    this.confirmModal.show();
    console.log(this.deletedApplicationId);
  }

  openEditPage(application) {
    console.log(application);
    this.router.navigate(['./edit', application._id], {relativeTo: this.route});
  }

  onDeleteConfirm(answer:boolean) {
    this.confirmModal.hide();
    this.table.loadOn();
    if (answer) {
      if (this.deletedApplicationId) {
        this.applicationsService.remove(this.deletedApplicationId).subscribe((data) => {
          this.table.refresh();
          this.deletedApplicationId = null;
        }, (error) => {
          this.table.loadOff();
          this.deletedApplicationId = null;
          if (error.status == 401 || error.status == 403) {
            this.authenticationService.emitError(error);
          }
        });
      }
    } else {
      this.table.loadOff();
      this.deletedApplicationId = null;
    }
  }
}
