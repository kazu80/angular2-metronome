import {Injectable} from '@angular/core';

export class Sound {
    id: number;
    file: string;
}

const SOUNDS: Sound[] = [
    { id: 1, file: '../../src/assets/sound/s_01.mp3'},
    { id: 2, file: '../../src/assets/sound/s_02.mp3'},
    { id: 3, file: '../../src/assets/sound/s_03.mp3'},
    { id: 4, file: '../../src/assets/sound/s_04.mp3'}
];

@Injectable()
export class SoundService {
    selectedValue : any;
    
    public getValues() : Sound[] {
        return SOUNDS;
    }
    
    public getSelected() : any {
        return this.selectedValue;
    }
    
    public setSelected(value : any ) : void {
        this.selectedValue = value;
    }
}