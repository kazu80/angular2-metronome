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
    sound             : Sound;
    tempo             : number;
    button            : string;

    gainVolume        : GainNode;

    contextTempo      : AudioContext;
    contextBeat       : AudioContext;

    sourceBeat        : MediaElementAudioSourceNode;
    sourceTempo       : MediaElementAudioSourceNode;

    audioBeat         : HTMLAudioElement;
    audioTempo        : HTMLAudioElement;

    constructor (
        private volumeService: VolumeService,
        private beatService: BeatService,
        private soundService: SoundService,
        private tempoService: TempoService
    ){}

    ngOnInit():void {
        this.isDuringExecution = false;
        this.button            = "inactive";

        this.contextTempo = new AudioContext();
        this.contextBeat  = new AudioContext();

        this.gainVolume   = this.contextTempo.createGain();

        this.sound        = this.soundService.getSelected;

        this.audioBeat   = MetronomeRunComponent.getAudio('../../src/assets/sound/s_02.mp3');
        this.sourceBeat  = this.contextBeat.createMediaElementSource(this.audioBeat);

        this.audioTempo  = MetronomeRunComponent.getAudio(this.sound.file);
        this.sourceTempo = this.contextTempo.createMediaElementSource(this.audioTempo);
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
        this.isDuringExecution = this.isDuringExecution  ? false      : true;
        this.button            = this.button == "active" ? "inactive" : "active";

        if (!this.isDuringExecution) {
            clearInterval(this.interval);
            return;
        }

        var count : number = 0;

        this.beat   = this.beatService.getSelected();
        this.tempo  = this.tempoService.tempo;

        var beatCount : number = this.beat.beat;

        this.interval = setInterval(() => {
            count++;

            if ( count % beatCount == 0) {
                this.playAudio(this.audioBeat, this.contextBeat, this.sourceBeat);
                this.tempoService.animation = "play";
            } else {
                this.playAudio(this.audioTempo, this.contextTempo, this.sourceTempo);
                this.tempoService.animation = "play";
            }
        }, 60 * 1000 / this.tempo);
    }
}
