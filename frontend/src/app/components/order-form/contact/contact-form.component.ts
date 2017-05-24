import { Component } from '@angular/core';
import { NgbDateStruct, NgbCalendar, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { OrderFormGroup } from '../order-form-group';
import { PublicApplicationsService } from '../../../services/publicApplications.service';
import { Router } from "@angular/router";
import { ErrorHandlers } from '../../../utilities/error-handlers';

export class Contact {
  fio:string;
  email:string;
  telephone:string;
}

@Component({
  selector: 'contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
  providers: [PublicApplicationsService]
})
export class ContactFormComponent {

  timeMask = [/\d/, /\d/, ':', /\d/, /\d/];
  phoneMask = ['+', '7', ' ', '(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, ' ', /\d/, /\d/];

  loading = false;
  error = '';

  private stepName:string = 'contact';
  private contactForm;

  constructor(private router:Router, private publicApplicationsService:PublicApplicationsService) {
    this.contactForm = OrderFormGroup.form.controls[this.stepName];
  }

  submit() {
    this.loading = true;
    this.publicApplicationsService.createApplication(<JSON>OrderFormGroup.form.value)
      .finally(() => this.loading = false)
      .subscribe((data) => {
        OrderFormGroup.reset();
        this.router.navigate(['site/order/complete']);
      }, (error) => {
        this.error = ErrorHandlers.getServerErrorMessage(error, 'Аутентификация не выполнена.');
      });
  }

}
