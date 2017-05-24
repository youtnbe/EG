import { Employee } from './employee';

export class Application {
  constructor() {
  }

  _id:number;
  task:{
    name: string,
    description: string,
    date: Date,
    address: string
  };
  customer:{
    fio: string,
    email: string,
    telephone: string
  };
  workman:Employee;
  date_create:Date;
  status:number;
  comment:string;
  number:number;
}
