import {Component, OnInit} from "@angular/core";

import {MetronomeCommon} from "./share/metronome.common";
import {VolumeService, Volume} from "./service/volume.service";

@Component({
    selector: 'metronome-volume',
    templateUrl: './metronome.volume.html',
    styleUrls: ['./metronome.volume.scss']
})
export class MetronomeVolumeComponent implements OnInit {
    volumes: Volume[];
    selectedVolume: Volume;

    constructor (
        private common: MetronomeCommon,
        private service: VolumeService
    ){}
    
    ngOnInit(): void {
        this.volumes = this.service.getValues();
        this.selectedVolume = this.volumes[5];
        this.service.setSelected(this.selectedVolume);
    }

    private onClick(type : string) {
        switch (type) {
            case "prev": this.selectedVolume = this.common.prev(this.volumes, this.selectedVolume); break;
            case "next": this.selectedVolume = this.common.next(this.volumes, this.selectedVolume); break;
        }
        
        this.service.setSelected(this.selectedVolume);
    }
}