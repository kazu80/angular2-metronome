import {Injectable} from '@angular/core';

const Tempo     : number = 80;
const Animation : string = "stop";

@Injectable()
export class TempoService {
    private _tempo     : number = Tempo;
    private _animation : string = Animation;

    get tempo():number {
        return this._tempo;
    }

    set tempo(value:number) {
        this._tempo = value;
    }

    public inclementTempo () : void {
        this._tempo = this._tempo + 1;
    }
    
    public declementTempo () : void {
        this._tempo = this._tempo - 1;
    }

    get animation():string {
        return this._animation;
    }

    set animation(value:string) {
        this._animation = value;
    }
}
