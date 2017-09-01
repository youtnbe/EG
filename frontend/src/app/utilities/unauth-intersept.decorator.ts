import {Observable} from "rxjs";
import {Response} from "@angular/http";
//import {OverlayService} from "../../services/overlay/overlay.service";

function isUnauthorized(status: number): boolean {
    return status === 0 || status === 401 || status === 403 || status === 500; //Убрать 500
}

export function interceptUnauthorize(observable: Observable<Response>): Observable<Response> {
    return observable.catch((err) => {
        if (isUnauthorized(err.status)) {
            //OverlayService.login();
            console.log('isUnauthorized');
            return Observable.empty();
        } else {
            return Observable.throw(err);
        }
    });
}

export function InterceptUnauthorize() {
    return (target: Object, key: string, descriptor: TypedPropertyDescriptor<any>) => {
        if (descriptor === undefined) {
            descriptor = Object.getOwnPropertyDescriptor(target, key);
        }
        var originalMethod = descriptor.value;

        descriptor.value = function () {
            return interceptUnauthorize(originalMethod.apply(this, arguments));
        };
        return descriptor;
    };
}
