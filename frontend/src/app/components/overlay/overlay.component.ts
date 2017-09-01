import {
    Component,
    ComponentRef,
    ComponentFactoryResolver,
    Type,
    ViewChild,
    ViewContainerRef
} from "@angular/core";
import {Observable} from "rxjs";


@Component({
    selector: 'overlay',
    templateUrl: './overlay.component.html',
    styleUrls: ['./overlay.component.scss']
})
export class OverlayComponent {
    cmpRef: ComponentRef<Component>;

    @ViewChild("container", {read: ViewContainerRef}) container: ViewContainerRef;

    constructor(private componentFactoryResolver: ComponentFactoryResolver) {
    }

    addComponent<T>(componentType: Type<T>): Observable<ComponentRef<T>> {
        return Observable.create(observer => {
            if (this.cmpRef) {
                this.cmpRef.destroy();
            }
            let factory = this.componentFactoryResolver.resolveComponentFactory(componentType);
            this.cmpRef = this.container.createComponent(factory);
            observer.next(this.cmpRef);
        });
    }
}
