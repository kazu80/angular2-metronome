import {
    Component, OnInit, trigger, state, style, transition, animate, Output, EventEmitter,
    keyframes
} from '@angular/core'

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
                })),
            state('active', style(
                {
                    "background-image": 'url("../../src/assets/images/stop.svg")',
                    "background-color": '#ea5550',
                    transform: 'scale(1.1, 1.1)'
                })),
            //transition('inactive => active',   animate('100ms ease-in')),
            transition('inactive => active', [
                animate(200, keyframes([
                    style({transform:"scale(.95, .95)", offset: .7}),
                    style({transform:"scale(1.2, 1.2)", offset: .8}),
                    style({transform:"scale(1.1, 1.1)", offset: 1})
                ]))
            ]),
            transition('active   => inactive', animate('100ms ease-out'))
        ]),
    ]
})
export class MetronomeRunComponent implements OnInit{

    isDuringExecution : boolean;
    interval          : any;

    beat              : Beat;
    tempo             : number;
    button            : string;

    contextTempo      : AudioContext;
    contextBeat       : AudioContext;

    constructor (
        private volumeService: VolumeService,
        private beatService:   BeatService,
        private soundService:  SoundService,
        private tempoService:  TempoService
    ){}

    ngOnInit():void {
        this.isDuringExecution = false;
        this.button            = "inactive";

        this.contextTempo = new AudioContext();
        this.contextBeat  = new AudioContext();
    }

    private static getAudio (path: string) : HTMLAudioElement {
        const audio : HTMLAudioElement = new Audio(path);

        audio.controls = true;

        return audio;
    }

    private playAudio ( audio: HTMLAudioElement, context: AudioContext, source: MediaElementAudioSourceNode ) {
        const volumeSelected : Volume   = this.volumeService.getSelected();
        const volumeGain     : GainNode = context.createGain();

        volumeGain.gain.value = volumeSelected.volume * 0.1;

        source.connect(volumeGain);
        volumeGain.connect(context.destination);

        audio.play();
    }

    private onClick() {
        const sound        : Sound = this.soundService.getSelected;

        const audioTempo   : HTMLAudioElement             = MetronomeRunComponent.getAudio(sound.file);
        const audioBeat    : HTMLAudioElement             = MetronomeRunComponent.getAudio('../../src/assets/sound/s_02.mp3');

        const sourceTempo  : MediaElementAudioSourceNode  = this.contextTempo.createMediaElementSource(audioTempo);
        const sourceBeat   : MediaElementAudioSourceNode  = this.contextBeat.createMediaElementSource(audioBeat);

        this.isDuringExecution = !this.isDuringExecution;
        this.button            = this.button == "active" ? "inactive" : "active";

        // 停止
        if (!this.isDuringExecution) {
            clearInterval(this.interval);
            return;
        }

        // ビート
        this.beat   = this.beatService.getSelected();
        const beatCount : number = this.beat.beat;

        // テンポ
        this.tempo    = this.tempoService.tempo;

        // Run
        let count : number = 0;
        this.interval = setInterval(() => {
            count++;

            if ( count % beatCount == 0) {
                this.playAudio(audioBeat, this.contextBeat, sourceBeat);
                this.tempoService.animation = "play";
            } else {
                this.playAudio(audioTempo, this.contextTempo, sourceTempo);
                this.tempoService.animation = "play";
            }
        }, 60 * 1000 / this.tempo);
    }
}
