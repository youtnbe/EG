import {Component, EventEmitter, Input, Output} from "@angular/core";
import {Message} from "../../services/overlay.service";

@Component({
    selector: 'confirm',
    templateUrl: './confirm.component.html',
    styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements Message {
    @Input() body: string = 'Вы уверены?';
    @Input() buttonYes: string = 'Да';
    @Input() buttonNo: string = 'Нет';
    @Output() close: EventEmitter<boolean> = new EventEmitter<boolean>();

}
