import {Component, OnInit, DoCheck} from '@angular/core';

import {MetronomeCommon} from './share/metronome.common';
import {SoundService, Sound} from './service/sound.service';

@Component({
    selector: 'metronome-sound',
    templateUrl: './metronome.sound.html',
    styleUrls: ['./metronome.sound.scss']
})
export class MetronomeSoundComponent implements OnInit, DoCheck {
    sounds : Sound[];
    selectedSound: Sound;

    constructor (
        private common: MetronomeCommon,
        private service: SoundService
    ){}

    ngOnInit():void {
        this.sounds = this.service.getValues();
        this.selectedSound = this.sounds[0];
        this.service.setSelected(this.selectedSound);
        this.service.createAudioInstance(this.selectedSound['file']);
    }

    ngDoCheck(): void {
        console.log('do check');

        this.service.setSelected(this.selectedSound);
    }

    private onClick(type : string) {
        switch (type) {
            case "prev": this.selectedSound = this.common.prev(this.sounds, this.selectedSound); break;
            case "next": this.selectedSound = this.common.next(this.sounds, this.selectedSound); break;
        }
        
        this.service.setSelected(this.selectedSound);
    }
}
