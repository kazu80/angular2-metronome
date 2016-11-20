import {Component, OnInit, trigger, animate, keyframes, style} from "@angular/core";
import Timer = NodeJS.Timer;
import {Router, NavigationStart, NavigationEnd} from "@angular/router";
@Component({
    selector: "stop-watch",
    templateUrl: './stop-watch.component.html',
    styleUrls: ['./stop-watch.component.scss'],
})
export class StopWatchComponent implements OnInit {
    interval_id: Timer;
    audio: HTMLAudioElement;

    time: string = "00:00 000";
    isWarning: boolean = false;
    //start_time:  number  = 1000 * 60 * 5;
    start_time: number = 1000 * 31;
    isStart: boolean = false;

    constructor(router: Router) {
        router.events.subscribe((val) => {
            // Navigation Start
            if (val instanceof NavigationStart) {
                if (this.interval_id) {
                    clearInterval(this.interval_id);
                    if (this.audio) {
                        this.audio.pause();
                    }
                }
            }
        });
    }

    ngOnInit(): void {
        this.time = StopWatchComponent.createTime(this.start_time);
    }

    private startWatch() {
        if (this.isStart) {
            clearInterval(this.interval_id);
            this.time = StopWatchComponent.createTime(this.start_time);
        } else {
            this.start(this.start_time);
        }

        this.isStart = !this.isStart;
    }

    private static createTime(time: number) {
        const hour: number = Math.floor(time / (60 * 60 * 1000));
        time = time - (hour * 60 * 60 * 1000);

        const min: number = Math.floor(time / (60 * 1000));
        time = time - (min * 60 * 1000);

        const sec: number = Math.floor(time / 1000);

        const msec: number = time % 1000;

        const hour_s: string = ('00' + hour).slice(-2);
        const min_s: string = ('00' + min).slice(-2);
        const sec_s: string = ('00' + sec).slice(-2);
        const msec_s: string = ('000' + msec).slice(-3);

        return min_s + ":" + sec_s + " " + msec_s;
    }

    private start(time: number) {
        this.interval_id = setInterval(() => {
            time = time - 10;

            if (time == 1000 * 27) {
                this.heartSound("../../src/assets/sound/heart-sound.mp3");
            }

            if (time < 1000 * 60) {
                this.isWarning = true;
            }

            if (time < 0) {
                this.isWarning = false;
                clearInterval(this.interval_id);
                this.heartSound("../../src/assets/sound/siren.mp3");
                this.time = "00:00 000";
                return;
            }

            this.time = StopWatchComponent.createTime(time);
        }, 10);
    }


    private heartSound(path: string) {
        this.audio = new Audio(path);
        this.audio.play();
    }

}
