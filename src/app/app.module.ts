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


@NgModule({
    imports: [
        BrowserModule
    ],
    declarations: [
        AppComponent,
        MetronomeTempoComponent,
        MetronomeBeatComponent,
        MetronomeSoundComponent,
        MetronomeTempoSlider,
        MetronomeTempoControllerComponent,
        MetronomeVolumeComponent,
        MetronomeRunComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
