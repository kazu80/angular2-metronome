import {RouterModule} from "@angular/router";
import {ModuleWithProviders} from "@angular/core";
import {StopWatchComponent} from "./stop-watch.component";
import {MetronomeTop} from "./metronome.top";

export const routing: ModuleWithProviders = RouterModule.forRoot([
    {path: '', component: MetronomeTop},
    {path: 'stop-watch', component: StopWatchComponent},
]);


