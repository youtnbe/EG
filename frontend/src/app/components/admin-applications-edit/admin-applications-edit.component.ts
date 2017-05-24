import { Component, OnDestroy} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { AuthService } from '../../services/auth.service';
import { NgbDateStruct, NgbCalendar, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import * as _ from 'lodash';

import { Utilities, Dictionaries } from '../../utilities/utilities';

import { Application } from '../../models/application';
import { Employee } from '../../models/employee';

import { ApplicationsService } from '../../services/applications.service';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'admin-applications-edit',
  templateUrl: './admin-applications-edit.component.html',
  styleUrls: ['./admin-applications-edit.component.scss'],
  providers: [ApplicationsService, EmployeeService]
})
export class AdminApplicationsEditComponent {

  private application:Application = new Application();
  private employees:Employee[];
  private statuses = Dictionaries.applicationStatuses;
  private nextStatusButtonText:string = '';
  private idSubscription:Subscription;

  timeMask = [/\d/, /\d/, ':', /\d/, /\d/];
  phoneMask = ['+', '7', ' ', '(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, ' ', /\d/, /\d/];

  loading = false;
  dateHeader = '';

  utilities = {
    getStatusById: Dictionaries.getApplicationStatusById
  };

  private applicationEditFormGroup:FormGroup = new FormGroup({
    _id: new FormControl(''),
    task: new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl(''),
      date: new FormControl({value: ''}),
      time: new FormControl(''),
      address: new FormControl({value: ''})
    }),
    customer: new FormGroup({
      fio: new FormControl(''),
      email: new FormControl(''),
      telephone: new FormControl('')
    }),
    workman: new FormControl(''),
    status: new FormControl(''),
    comment: new FormControl(''),
    date: new FormControl(''),
    date_create: new FormControl('')
  });

  constructor(private route:ActivatedRoute,
              private router:Router,
              private applicationsService:ApplicationsService,
              private employeeService:EmployeeService,
              private authenticationService:AuthService) {

    this.employeeService.getEmployees().subscribe((data) => {
      this.employees = data;
      this.idSubscription = this.route.params.subscribe((params) => {
        this.applicationsService.getApplicationById(params['id']).subscribe((data) => {
          this.application = data;
          this.setFormFromModel();
        }, (error) => {
          console.log(error);
        });
      });
    }, (error) => {
      console.log(error);
    });

    this.applicationEditFormGroup.controls['status'].valueChanges.subscribe(function (id) {
      this.nextStatusButtonText = Dictionaries.getApplicationStatusById(id).nextButtonText;
    }.bind(this));

    this.applicationEditFormGroup.valueChanges.subscribe((data) => {
      console.log(this.applicationEditFormGroup);
    });
  }

  setFormFromModel() {
    this.applicationEditFormGroup.patchValue({
      _id: this.application._id,
      task: {
        name: this.application.task.name,
        description: this.application.task.description,
        date: {
          day: this.application.task.date.getDate(),
          month: this.application.task.date.getMonth() + 1,
          year: this.application.task.date.getFullYear(),
        },
        time: this.application.task.date.toLocaleString("ru", {
          hour: 'numeric',
          minute: 'numeric'
        }),
        address: this.application.task.address
      },
      customer: {
        fio: this.application.customer.fio,
        email: this.application.customer.email,
        telephone: this.application.customer.telephone
      },
      workman: this.application.workman,
      status: this.application.status,
      comment: this.application.comment
    });
  }

  saveApplication() {
    this.loading = true;
    return this.applicationsService.updateApplication(<JSON>this.applicationEditFormGroup.value)
      .finally(() => this.loading = false)
  }

  incStatus() {
    let newStatus = this.applicationEditFormGroup.controls['status'].value + 1;
    this.applicationEditFormGroup.controls['status'].setValue(newStatus);
    this.saveApplication()
      .subscribe((data) => {
        console.log('saved');
      }, (error) => {
        console.log(error);
        //this.error = ErrorHandlers.getServerErrorMessage(error, 'Аутентификация не выполнена.');
      });
  }

  appointToMe() {
    this.applicationEditFormGroup.controls['workman']
      .setValue(_.find(this.employees, {id: this.authenticationService.employeeId}));
    this.saveApplication()
      .subscribe((data) => {
        console.log('saved');
      }, (error) => {
        console.log(error);
        //this.error = ErrorHandlers.getServerErrorMessage(error, 'Аутентификация не выполнена.');
      });
  }

  submit() {
    this.saveApplication()
      .subscribe((data) => {
        console.log('saved');
        this.router.navigate(['../../'], {relativeTo: this.route});
      }, (error) => {
        console.log(error);
        //this.error = ErrorHandlers.getServerErrorMessage(error, 'Аутентификация не выполнена.');
      });
  }

  ngOnDestroy() {
    this.idSubscription.unsubscribe();
  }


}
