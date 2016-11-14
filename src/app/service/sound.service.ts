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
    private _selectedValue  : Sound;
    private _audio : HTMLAudioElement;

    get audio(): HTMLAudioElement {
        return this._audio;
    }

    public getValues() : Sound[] {
        return SOUNDS;
    }
    
    get getSelected() : Sound {
        return this._selectedValue;
    }
    
    public setSelected( value : Sound ) : void {
        this._selectedValue = value;
    }

    public createAudioInstance ( path : string ) : void {
        this._audio = new Audio(path);
    }

}