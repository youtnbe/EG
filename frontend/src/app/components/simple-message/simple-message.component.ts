import {Component, EventEmitter, Input, Output} from "@angular/core";
import {Message} from '../../services/overlay.service';

@Component({
    selector: 'simple-message',
    templateUrl: 'simple-message.component.html'
})
export class SimpleMessageComponent implements Message {
    @Input() body: string;
    @Input() button: string;
    @Output() close: EventEmitter<any> = new EventEmitter<any>();
}
