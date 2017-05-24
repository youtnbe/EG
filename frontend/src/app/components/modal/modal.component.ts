import {Component} from '@angular/core';


@Component({
  selector: 'app-modal',
  template: `
  <div (click)="onContainerClicked($event)" class="modal" tabindex="-1" [ngClass]="{'in': visibleAnimate}"
       [ngStyle]="{'display': visible ? 'block' : 'none', 'opacity': visibleAnimate ? 1 : 0}">

          <ng-content select="[body]"></ng-content>
  </div>
  `
})
export class ModalComponent {

  public visible = false;
  private visibleAnimate = false;

  constructor() {
  }

  public show():void {
    this.visible = true;
    setTimeout(() => this.visibleAnimate = true, 100);
  }

  public hide():void {
    this.visibleAnimate = false;
    setTimeout(() => this.visible = false, 300);
  }

  public onContainerClicked(event:MouseEvent):void {
    if ((<HTMLElement>event.target).classList.contains('modal')) {
      //this.hide();
    }
  }

}
