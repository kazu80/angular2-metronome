import {Component, Input, trigger, state, style, transition, animate, keyframes} from '@angular/core';

@Component({
    selector: 'metronome-tempo',
    templateUrl: './metronome.tempo.html',
    styles: [`
.name {
font-size: 20px;
text-align: left;
}
`],
    animations: [
        trigger("displayTempo", [
            state('play', style({transform:"scale(1,1)"}) ),
            state('stop', style({transform:"scale(1,1)"}) ),
            transition('stop => play', [
                animate(100, keyframes([
                    //style({transform:"scale(1,1)", offset: 0}),
                    //style({transform:"scale(.9,1.1)", offset: 0.25}),
                    style({transform:"scale(1.1, 1.1)", offset: 0.5}),
                    //style({transform:"scale(.95,1.05)", offset: 0.75}),
                    //style({transform:"scale(1,1)", offset: 1})
                ]))
            ]),
            transition('play => stop', [
                animate(100, keyframes([
                    //style({transform:"scale(1,1)", offset: 0}),
                    //style({transform:"scale(.9,1.1)", offset: 0.25}),
                    //style({transform:"scale(1.1, 1.1)", offset: 0.5}),
                    //style({transform:"scale(.95,1.05)", offset: 0.75}),
                    style({transform:"scale(1,1)", offset: 1})
                ]))
            ])
        ])
    ],
    providers : [
    ]
})
export class MetronomeTempoComponent {
    @Input() tempo : number;
    @Input() runStatus : string;
}
