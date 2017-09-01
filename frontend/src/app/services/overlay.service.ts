import {ComponentRef, Injectable, Type, EventEmitter} from "@angular/core";
import {Observable} from "rxjs";
import {SimpleMessageComponent} from '../components/simple-message/simple-message.component';
import {ConfirmComponent} from '../components/confirm/confirm.component';

export interface IOverlayHost {
    openComponentInPopup<T>(componentType: Type<T>): Observable<ComponentRef<T>>;
}

export interface Message {
    close: EventEmitter<any>;
}

@Injectable()
export class OverlayService {
    private static host: IOverlayHost;

    static registerHost(hostComponent: IOverlayHost): void {
        this.host = hostComponent;
    }

    static openComponentInPopup<T>(componentType: Type<T>): Observable<ComponentRef<T>> {
        if (!this.host) {
            throw new Error("Host is not registered");
        }

        return this.host.openComponentInPopup(componentType);
    }

    static customMessage(options: any) {
        return Observable.create(observer => {
            this.openComponentInPopup(SimpleMessageComponent).subscribe(component => {
                if (!component) return;
                const popup: SimpleMessageComponent = component.instance;
                popup.body = options['body'] || '';
                popup.button = options['button'] || 'OK';
                popup.close.subscribe(answer => {
                    component.destroy();
                    observer.next(answer);
                    observer.complete();
                });
            });
        }).toPromise();
    }

    static customConfirm(options: any) {
        return Observable.create(observer => {
            this.openComponentInPopup(ConfirmComponent).subscribe(component => {
                if (!component) return;
                const popup: ConfirmComponent = component.instance;
                popup.body = options['body'] || popup.body;
                popup.buttonYes = options['buttonYes'] || popup.buttonYes;
                popup.buttonNo = options['buttonNo'] || popup.buttonNo;
                popup.close.subscribe(answer => {
                    component.destroy();
                    observer.next(answer);
                    observer.complete();
                });
            });
        }).toPromise();
    }

    static message(body: string, button?: string) {
        return this.customMessage({
            body: body,
            button: button
        });
    }

    static error(body: string, button?: string) {
        return this.customMessage({
            body: body,
            button: button
        });
    }

    static confirm(body?: string, buttonYes?: string, buttonNo?: string) {
        return this.customConfirm({
            body: body,
            buttonYes: buttonYes,
            buttonNo: buttonNo
        });
    }
}
