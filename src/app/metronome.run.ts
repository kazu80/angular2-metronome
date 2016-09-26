import {Component, OnInit, trigger, state, style, transition, animate, Output, EventEmitter} from '@angular/core'

import {VolumeService, Volume} from "./service/volume.service";
import {BeatService, Beat} from "./service/beat.service";
import {SoundService, Sound} from "./service/sound.service";
import {TempoService} from "./service/tempo.service";


@Component({
    selector: 'metronome-run',
    templateUrl: './metronome.run.html',
    styleUrls: ['./metronome.run.scss'],
    animations: [
        trigger("metronomeRun", [
            state('inactive', style(
                {
                    "background-image": 'url("../../src/assets/images/play.svg")',
                    "background-color": '#ea5550',
                    transform: 'scale(1)'
                })),
            state('active', style(
                {
                    "background-image": 'url("../../src/assets/images/stop.svg")',
                    "background-color": '#ff7f7f',
                    transform: 'scale(1.01)'
                })),
            transition('inactive => active',   animate('100ms ease-in')),
            transition('active   => inactive', animate('100ms ease-out'))
        ]),
    ]
})
export class MetronomeRunComponent implements OnInit{

    isDuringExecution : boolean;
    interval          : any;
    volume            : Volume;
    beat              : Beat;
    sound             : Sound;
    tempo             : number;
    button            : string;

    constructor (
        private volumeService: VolumeService,
        private beatService: BeatService,
        private soundService: SoundService,
        private tempoService: TempoService
    ){}

    ngOnInit():void {
        this.isDuringExecution = false;
        this.button            = "inactive";
    }

    private onClick() {
        this.isDuringExecution = this.isDuringExecution  ? false      : true;
        this.button            = this.button == "active" ? "inactive" : "active";

        if (!this.isDuringExecution) {
            clearInterval(this.interval);
            return;
        }

        var count : number = 0;

        this.volume = this.volumeService.getSelected();
        this.beat   = this.beatService.getSelected();
        this.sound  = this.soundService.getSelected();
        this.tempo  = this.tempoService.tempo;

        var audio     : HTMLMediaElement = new Audio();
        var audioBeat : HTMLMediaElement = new Audio();

        audio.src     = this.sound.file;
        audioBeat.src = '../../src/assets/sound/s_02.mp3';

        audio.volume     = this.volume.volume * 0.1;
        audioBeat.volume = this.volume.volume * 0.1;

        audio.addEventListener("ended", () => {
            this.tempoService.animation = "stop";
        });

        audioBeat.addEventListener("ended", () => {
            this.tempoService.animation = "stop";
        });

        var beatCount : number = this.beat.beat;

        this.interval = setInterval(() => {
            count++;

            if ( count % beatCount == 0) {
                audioBeat.play();
                this.tempoService.animation = "play";
            } else {
                audio.play();
                this.tempoService.animation = "play";
            }
        }, 60 * 1000 / this.tempo);
    }
}
