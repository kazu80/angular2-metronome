import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'metronome-tempo-slider',
    templateUrl: './metronome.tempo-slider.html',
    styles: ['']
})
export class MetronomeTempoSlider implements OnInit {
    ngOnInit(): void {
        
    }
    
    public onChange (e) {
        console.log(e.value);
    }
}
