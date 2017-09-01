import {Component, Input, OnChanges, SimpleChange, ChangeDetectionStrategy, NgZone, ViewChild} from '@angular/core';
import {ApplicationsService} from '../../services/applications.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
//import {ModalComponent} from '../modal/modal.component';
import {PageableTableComponent} from '../pageable-table/pageable-table.component';
import {Utilities, Dictionaries} from '../../utilities/utilities';
import {AuthService} from '../../services/auth.service';
import * as _ from 'lodash';
import {OverlayService} from "../../services/overlay.service";

@Component({
    selector: 'admin-applications-list',
    templateUrl: './admin-applications-list.component.html',
    styleUrls: ['./admin-applications-list.component.scss'],
    providers: [ApplicationsService]
})
export class AdminApplicationsListComponent {

    @ViewChild(PageableTableComponent)
    table: PageableTableComponent;

    deletedApplicationId: string = null;

    tableFormat = [
        {
            name: 'applicationId',
            header: '#',
            type: 'number'
        },
        {
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
        },
        {
            name: 'customer.fio',
            header: 'Заказчик',
            type: 'string'
        },
        {
            name: 'task.name',
            header: 'Краткое описание',
            type: 'string'

        },
        {
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
        },
        {
            name: 'status',
            header: 'Статус',
            type: 'string',
            format: function (raw) {
                let status = Dictionaries.getApplicationStatusById(raw);
                return '<span class="app-status-table ' + status.class + '">' + status.name + '</span>';
            }
        },
        {
            name: 'workman',
            header: 'Исполнитель',
            type: 'string',
            format: function (raw) {
                return raw ? raw.firstName + ' ' + raw.lastName : 'Не назначен';
            }
        }];

    tableControls = [
        {
            text: '<i class="material-icons">edit</i>',
            action: (application) => {
                this.router.navigate(['./edit', application.applicationId], {relativeTo: this.route});
            }
        },
        {
            text: '<i class="material-icons">delete_forever</i>',
            action: (application) => {
                OverlayService.confirm().then(data => {
                    if (data == true) {
                        this.table.loadOn();
                        this.applicationsService.remove(application)
                            .finally(() => this.table.loadOff())
                            .subscribe(data => {
                                this.table.refresh();
                                console.log(data);
                            }, error => {
                                console.log(error);
                            });
                    }
                });
            }
        }];

    constructor(private applicationsService: ApplicationsService,
                private route: ActivatedRoute,
                private router: Router) {
    }
}
