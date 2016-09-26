import {Component, OnInit} from '@angular/core';

import {MetronomeCommon} from './share/metronome.common';
import {BeatService, Beat} from './service/beat.service';

@Component({
    selector: 'metronome-beat',
    templateUrl: './metronome.beat.html',
    styleUrls: ['./metronome.beat.scss']
})
export class MetronomeBeatComponent implements OnInit {

    beats: Beat[];
    selectedBeat: Beat;

    constructor (
        private common: MetronomeCommon,
        private service: BeatService
    ){}

    ngOnInit():void {
        this.beats = this.service.getValues();
        this.selectedBeat = this.beats[3];
        this.service.setSelected(this.selectedBeat);
    }

    private onClick(type : string) {
        switch (type) {
            case "prev": this.selectedBeat = this.common.prev(this.beats, this.selectedBeat); break;
            case "next": this.selectedBeat = this.common.next(this.beats, this.selectedBeat); break;
        }
        
        this.service.setSelected(this.selectedBeat);
    }
}
