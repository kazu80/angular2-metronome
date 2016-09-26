import {Component, Output, EventEmitter} from '@angular/core';

import {TempoService} from './service/tempo.service';

@Component({
    selector: 'metronome-tempo-control',
    templateUrl: './metronome.tempo-control.html',
    styleUrls: ['./metronome.tempo-control.scss']
})
export class MetronomeTempoControllerComponent {

    constructor (private service: TempoService) {}

    public onClick(type : string) {
        switch (type) {
            case 'prev':
                this.service.declementTempo();
                break;
            case 'next':
                this.service.inclementTempo();
                break;
        }
    }
}
