import { Component, Input, OnChanges, SimpleChange, ChangeDetectionStrategy, NgZone, ViewChild, Output, EventEmitter } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
@Component({
  selector: 'confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class Confirm {

  @Output() onConfirm = new EventEmitter<boolean>();

  constructor() {
  }

  confirm(answer:boolean) {
    this.onConfirm.emit(answer);
  }
}
