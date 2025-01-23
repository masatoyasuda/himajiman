import Bonas from './bonas.js';

export default class Fever extends Bonas
{
    constructor()
    {
        super();
        this.fever_interval;
    }

    /**
     * 現在日時を基に次のフィーバー日時を計算して返す
     * @returns datetime
     */
    calkFeverNextAt()
    {
        const current_time = window.common.getDatetimeFormat(new Date(), 'YYYY-MM-DD hh:mm:ss');
        const datetime = new Date(current_time);
        datetime.setMinutes(0);
        datetime.setSeconds(0);
        const hour = Number(datetime.getHours());
        if (hour <= 0 && hour < 8) {
            datetime.setHours(8);
        } else if (hour <= 8 && hour < 12) {
            datetime.setHours(12);
        } else if (hour <= 12 && hour < 18) {
            datetime.setHours(18);
        } else {
            datetime.setHours(24);
        }
        return window.common.getDatetimeFormat(datetime, 'YYYY-MM-DD hh:mm:ss');
    }

    setFeverEvent()
    {
        document.getElementById('fever').addEventListener('click', e => {
            if (!e.target.classList.contains('bonas-disable')) {
                if (window.storage.more_free_fever > 0) {
                    this.startFever();
                    window.storage.more_free_fever -= 1;
                    window.storage.setGameStorage();
                    document.getElementById('fever').classList.add('bonas-disable');
                } else if (window.storage.more_movie_fever > 0) {
                    window.unity.rewardAds(this.rewardComplete());
                } else {
                    return;
                }
                // this.checkFeverSkipFree_todayCount();
            }
        });
    }

    rewardComplete()
    {
        window.storage.more_movie_fever -= 1;
        window.storage.setGameStorage();
        document.getElementById('fever').classList.add('bonas-disable');
    }

    startFever()
    {
        console.log('feverスタート');
    }

    himaFever()
    {
        window.storage.fever_start_at = window.common.getDatetimeFormat(new Date(), 'YYYY-MM-DD hh:mm:ss');
        this.feverView(true);
        // this.fever_interval = setInterval(() => {
        //     const fever_limit_time = this.checkFeverTime();
        // }, 1000);
    }

    feverView(bool)
    {
        if (bool) {
            window.common.$fever_flakes.classList.add('fever_active');
        } else {
            window.common.$fever_flakes.classList.remove('fever_active');
        }
    }

    checkFeverTime()
    {
        if (!window.storage.fever_start_at) {
            return null;
        }
        const fever_start_at = new Date(window.storage.fever_start_at);
        const current_time = new Date();
        const limit_time = current_time.getTime() - fever_start_at.getTime();
        console.log(limit_time);
    }
}
