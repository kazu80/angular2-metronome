import {Component} from '@angular/core';
import {Router, NavigationEnd, NavigationStart} from "@angular/router";

@Component({
    selector: 'metronome',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    constructor(router: Router) {


    }
}
