import {Component, OnInit} from '@angular/core';
import {TempoService} from "./service/tempo.service";

@Component({
    selector: 'metronome-tempo-slider',
    templateUrl: './metronome.tempo-slider.html',
    styles: ['']
})
export class MetronomeTempoSlider implements OnInit {

    constructor(private service: TempoService) {}

    ngOnInit(): void {
        
    }

    public onChange (e: any) {
        this.service.tempo = e.target.value;
    }
}
