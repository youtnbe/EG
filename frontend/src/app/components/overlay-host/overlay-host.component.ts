import {
    Component,
    ComponentRef,
    ComponentFactoryResolver,
    OnInit,
    Type,
    ViewChild,
    ViewContainerRef
} from "@angular/core";

import {OverlayComponent} from "../overlay/overlay.component";
import {IOverlayHost, OverlayService} from "../../services/overlay.service";
import {Observable} from "rxjs";

@Component({
    selector: "overlay-host",
    template: "<template #container></template>"
})
export class OverlayHostComponent implements IOverlayHost, OnInit {

    @ViewChild("container", {read: ViewContainerRef}) container: ViewContainerRef;

    constructor(private componentFactoryResolver: ComponentFactoryResolver) {
    }

    openComponentInPopup<T>(componentType: Type<T>): Observable<ComponentRef<T>> {
        return Observable.create(observer => {
            let factory = this.componentFactoryResolver.resolveComponentFactory(OverlayComponent);
            let overlayRef = this.container.createComponent(factory);
            overlayRef.instance.addComponent(componentType).subscribe(result => {
                result.onDestroy(() => {
                    overlayRef.destroy();
                });
                observer.next(result);
            });
        });
    }

    ngOnInit(): void {
        OverlayService.registerHost(this);
    }
}
