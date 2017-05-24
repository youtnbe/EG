import { FormGroup, FormControl, Validators} from '@angular/forms';

class OrderFormGroupClass {
  public form:FormGroup;

  constructor () {
    this.reset();
  }

  public reset() {
    this.form = new FormGroup({
      task: new FormGroup({
        "name": new FormControl('', Validators.required),
        "desc": new FormControl('', Validators.required),
        "dateRus": new FormControl('', Validators.required),
        "time": new FormControl('', Validators.required),
        "adrs": new FormControl({value: '', disabled: true}),
        "adrSwitch": new FormControl(''),
        "date": new FormControl({value: ''})
      }),
      contact: new FormGroup({
        "fio": new FormControl('', Validators.required),
        "email": new FormControl('', Validators.required),
        "telephone": new FormControl('', Validators.required)
      }),
    });
    return this;
  }
}

export const OrderFormGroup = new OrderFormGroupClass();
