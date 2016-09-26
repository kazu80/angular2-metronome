import {Component} from '@angular/core';

import {TempoService} from './service/tempo.service';
import {MetronomeCommon} from "./share/metronome.common";
import {BeatService} from "./service/beat.service";
import {SoundService} from "./service/sound.service";
import {VolumeService} from "./service/volume.service";

@Component({
    selector: 'metronome',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: [
        MetronomeCommon,
        BeatService,
        TempoService,
        SoundService,
        VolumeService
    ]
})
export class AppComponent {
    constructor(
        private tempoService: TempoService
    ){}
}
