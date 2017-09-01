import {Component, Input} from '@angular/core';

const types = {
    'black-xs': {
        hideContent: true,
        loaderClass: 'black-xs-loader',
        blur: false
    },
    'white-sm': {
        hideContent: true,
        loaderClass: 'white-sm-loader',
        blur: false
    },
    'white-md' : {
        hideContent: false,
        loaderClass: 'white-md-loader',
        blur: true
    },
    'black-md' : {
        hideContent: false,
        loaderClass: 'black-md-loader',
        blur: true,
        backgroundColor: 'rgba(255, 255, 255, 0.4)'
    }
};

@Component({
    selector: 'loadable',
    templateUrl: './loadable.component.html',
    styleUrls: ['./loadable.component.scss']
})
export class LoadableComponent {

    @Input() loading: boolean = false;

    @Input() hideContent: boolean = true;
    @Input() displayContent: boolean = true;
    @Input() loaderClass: string = 'black-xs-loader';
    @Input() backgroundColor: string = 'rgba(0, 0, 0, 0.4)';
    @Input() blur: boolean = false;
    @Input() text: string = 'Загрузка';

    @Input()
    set type(type: string) {
        if (types.hasOwnProperty(type)) {
            for (let key in types[type]){
                if (this.hasOwnProperty(key)) {
                    this[key] = types[type][key];
                }
            }
        }
    }

    constructor() {
    }

}
