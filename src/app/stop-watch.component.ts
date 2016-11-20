import {Component, OnInit} from "@angular/core";
import Timer = NodeJS.Timer;
import {Router, NavigationStart, NavigationEnd} from "@angular/router";
@Component({
    selector: "stop-watch",
    templateUrl: './stop-watch.component.html',
    styleUrls: ['./stop-watch.component.scss'],
})
export class StopWatchComponent implements OnInit {
    time: string = "00:00:00 000";
    interval_id: Timer;

    constructor(router: Router) {
        router.events.subscribe((val) => {
            // Navigation Start
            if (val instanceof NavigationStart) {
                if (this.interval_id) {
                    clearInterval(this.interval_id);
                }
            }
        });
    }

    ngOnInit(): void {
        // 5分
        const start: number = 1000 * 5 * 60;
        this.time = StopWatchComponent.createTime(start);

        this.start(start);
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

        return hour_s + ":" + min_s + ":" + sec_s + " " + msec_s;
    }

    private start(time: number) {
        this.interval_id = setInterval(() => {
            time = time - 10;

            if (time < 0) {
                clearInterval(this.interval_id);
            }

            this.time = StopWatchComponent.createTime(time);
        }, 10);
    }
}
