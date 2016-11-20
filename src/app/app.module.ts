import {NgModule} from '@angular/core';
import {BrowserModule}  from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {MetronomeTempoComponent} from "./metronome.tempo";
import {MetronomeBeatComponent} from "./metronome.beat";
import {MetronomeSoundComponent} from "./metronome.sound";
import {MetronomeTempoSlider} from "./metronome.tempo-slider";
import {MetronomeTempoControllerComponent} from "./metronome.tempo-control";
import {MetronomeVolumeComponent} from "./metronome.volume";
import {MetronomeRunComponent} from "./metronome.run";
import {routing} from "./app.routing";
import {StopWatchComponent} from "./stop-watch.component";
import {MetronomeTop} from "./metronome.top";


@NgModule({
    imports: [
        BrowserModule,
        routing
    ],
    declarations: [
        AppComponent,
        MetronomeTop,
        MetronomeTempoComponent,
        MetronomeBeatComponent,
        MetronomeSoundComponent,
        MetronomeTempoSlider,
        MetronomeTempoControllerComponent,
        MetronomeVolumeComponent,
        MetronomeRunComponent,
        StopWatchComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
