import {Employee} from './employee';
import {Utilities} from "../utilities/utilities";

export class Application {

    constructor(item?: Object);
    constructor(p1?) {
        if (p1 instanceof Object) {
            Utilities.copyProperties(p1, this);
        }
    }

    _id: number;
    task: {
        name: string,
        description: string,
        date: Date,
        address: string
    };
    customer: {
        fio: string,
        email: string,
        telephone: string
    };
    workman: Employee;
    date_create: Date;
    status: number;
    comment: string;
    applicationId: number;
}
