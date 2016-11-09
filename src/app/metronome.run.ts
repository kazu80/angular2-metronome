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
    volume            : Volume;
    beat              : Beat;
    sound             : Sound;
    tempo             : number;
    button            : string;
    tempoContext      : AudioContext;
    beatContext       : AudioContext;
    buffer            : any;
    bufferBeat        : any;
    src               : any;
    gainVolume        : any;

    constructor (
        private volumeService: VolumeService,
        private beatService: BeatService,
        private soundService: SoundService,
        private tempoService: TempoService
    ){}

    ngOnInit():void {
        this.isDuringExecution = false;
        this.button            = "inactive";

        this.tempoContext = new AudioContext();
        this.beatContext  = new AudioContext();

        this.gainVolume   = this.tempoContext.createGain();
        this.sound        = this.soundService.getSelected();

        this.LoadSample(this.tempoContext, this.sound.file);
        this.LoadSampleBeat(this.beatContext, '../../src/assets/sound/s_02.mp3');
    }

    private LoadSample (ctx: any, url: string) {
        var req = new XMLHttpRequest();
        req.open("GET", url, true);
        req.responseType = "arraybuffer";
        req.onload = () => {
            if(req.response) {
                ctx.decodeAudioData(req.response, (b: any) => { this.buffer = b; }, () => {});
            }
        };
        req.send();
    }

    private LoadSampleBeat (ctx: any, url: string) {
        var req = new XMLHttpRequest();
        req.open("GET", url, true);
        req.responseType = "arraybuffer";
        req.onload = () => {
            if(req.response) {
                ctx.decodeAudioData(req.response, (b: any) => { this.bufferBeat = b; }, () => {});
            }
        };
        req.send();
    }

    private PlayBeat () {
        var src = this.tempoContext.createBufferSource();

        this.volume = this.volumeService.getSelected();

        src.connect(this.gainVolume);
        this.gainVolume.gain.value = this.volume.volume * 0.1;

        src.buffer = this.bufferBeat;
        this.gainVolume.connect(this.tempoContext.destination);
        src.start(0);
    }

    private Play () {
        var src = this.tempoContext.createBufferSource();

        this.volume = this.volumeService.getSelected();

        src.connect(this.gainVolume);
        this.gainVolume.gain.value = this.volume.volume * 0.1;

        src.buffer = this.buffer;
        src.connect(this.tempoContext.destination);
        src.start(0);
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
                this.PlayBeat();
                this.tempoService.animation = "play";
            } else {
                this.Play();
                this.tempoService.animation = "play";
            }
        }, 60 * 1000 / this.tempo);
    }
}
