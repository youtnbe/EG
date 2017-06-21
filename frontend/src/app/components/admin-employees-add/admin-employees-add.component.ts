import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { Router } from "@angular/router";

@Component({
  selector: 'admin-employees-add',
  templateUrl: './admin-employees-add.component.html',
  styleUrls: ['./admin-employees-add.component.scss'],
  providers: [EmployeeService]
})
export class AdminEmployeesAddComponent {

  phoneMask = ['+', '7', ' ', '(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, ' ', /\d/, /\d/];

  loading = false;

  private employeeFormGroup:FormGroup = new FormGroup({
    "username": new FormControl('', [Validators.required, this.lengthValidator]),
    "email": new FormControl('', Validators.required),
    "password": new FormControl('', [Validators.required, this.lengthValidator]),
    "passwordRepeat": new FormControl('', [Validators.required]),
    "firstName": new FormControl('', Validators.required),
    "lastName": new FormControl('', Validators.required),
    "telegram": new FormControl(''),
    "telephone": new FormControl('', Validators.required)
  }, this.passwordRepeatValidator);

  constructor(private router:Router, private employeeService:EmployeeService) {
  }


  lengthValidator(control:FormControl):{[s:string]:boolean} {
    if (control.value.length < 4) {
      return {"length": true};
    }
    return null;
  }

  passwordRepeatValidator(control:FormGroup):{[s:string]:boolean} {
    if (control.value.password != control.value.passwordRepeat) {
      return {"passwordRepeat": true};
    }
    return null;
  }


  submit() {
    this.loading = true;
    this.employeeService.push(<JSON>this.employeeFormGroup.value)
      .finally(() => this.loading = false)
      .subscribe((data) => {
        console.log(data);
        this.router.navigate(['admin/employees']);
      }, (error) => {
        console.log(error);
      });
  }
}
