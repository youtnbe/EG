import {Utilities} from "../utilities/utilities";
export class Employee {

    constructor(item?: Object);
    constructor(p1?) {
        if (p1 instanceof Object) {
            Utilities.copyProperties(p1, this);
        }
    }

    _id: number;
    employeeId: number;
    username: string;
    password: string;
    email: string;
    telegram: string;
    telephone: string;
    firstName: string;
    lastName: string;
}
