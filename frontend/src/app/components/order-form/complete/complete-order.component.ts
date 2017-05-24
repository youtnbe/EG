import { Component } from '@angular/core';
import { NgbDateStruct, NgbCalendar, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { OrderFormGroup } from '../order-form-group';

@Component({
  selector: 'complete-order',
  templateUrl: './complete-order.component.html',
  styleUrls: ['./complete-order.component.scss']
})
export class CompleteOrderComponent {

  private form;

  constructor() {
    this.form = OrderFormGroup;

    console.log(this.form);

  }
}
