import { Component } from '@angular/core';
import { NgbDateStruct, NgbCalendar, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { OrderFormGroup } from '../order-form-group';

const month = {
  1: 'января',
  2: 'февраля',
  3: 'марта',
  4: 'апреля',
  5: 'мая',
  6: 'июня',
  7: 'июля',
  8: 'августа',
  9: 'сентября',
  10: 'октября',
  11: 'ноября',
  12: 'декабря'
};

export class Task {
  name:string;
  desc:string;
  date:string;
  time:string;
  adrs:string;
}

@Component({
  selector: 'task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent {

  timeMask = [/\d/, /\d/, ':', /\d/, /\d/];
  today = new Date();
  minDate:NgbDateStruct = {
    year: this.today.getFullYear(),
    month: this.today.getMonth() + 1,
    day: this.today.getDate()
  };

  private stepName:string = 'task';
  private taskForm;

  constructor() {
    this.taskForm = OrderFormGroup.form.controls[this.stepName];

    this.taskForm.controls['adrSwitch'].valueChanges.subscribe(function (data) {
      this.taskForm.controls['adrs'].setValidators(!data ? [] : [Validators.required]);
      this.taskForm.controls['adrs'].reset({value: '', disabled: !data});
    }.bind(this));
    this.taskForm.controls['date'].valueChanges.subscribe(function (data) {
      this.taskForm.controls['dateRus'].reset(data.day + ' ' + month[data.month]);
    }.bind(this));

  }
}
